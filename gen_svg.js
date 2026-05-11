#!/usr/bin/env node
// Usage: node gen_svg.js [input.json] [output.svg]
//   input        — timeline spec file (defaults to dark-timeline.js; also accepts .json)
//   output.svg  — where to write (defaults to dark-timeline.svg)
// Examples:
//   node gen_svg.js                                 # regenerate from dark-timeline.js
//   node gen_svg.js my-spec.json                    # render a custom spec
//   node gen_svg.js my-spec.json my-diagram.svg     # render to a specific output

import { readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const fs = { readFileSync, writeFileSync };

const [,, inputArg, outputArg] = process.argv;
const outputFile = outputArg || 'dark-timeline.svg';

const specFile = inputArg || `${__dirname}/dark-timeline.js`;
let spec;
try {
  const src = fs.readFileSync(specFile, 'utf8');
  // Support both plain JSON and the browser-loadable `var DEFAULT_SPEC = {...};` format
  const jsonStr = src.replace(/^\s*var\s+\w+\s*=\s*/, '').replace(/\s*;\s*$/, '');
  spec = JSON.parse(jsonStr);
} catch (e) {
  console.error(`Failed to load spec from ${specFile}:`, e.message);
  process.exit(1);
}

const VIEW_W = 760;
const ROW_HEIGHT = 95;
const TOP_MARGIN = 50;
const LEFT_MARGIN = 70;
const RIGHT_MARGIN = 50;
const PLOT_W = VIEW_W - LEFT_MARGIN - RIGHT_MARGIN;
const INTERSECTION_RADIUS = 20;
const NODE_RADIUS = 12;
const BEND_WIDTH = 53;

function yearToX(year, yearRange) {
  const [start, end] = yearRange;
  const t = (year - start) / (end - start);
  return LEFT_MARGIN + t * PLOT_W;
}

function rowToY(row) {
  return TOP_MARGIN + row * ROW_HEIGHT;
}

function findIntersectionForWorldYear(spec, worldId, year) {
  for (const inter of (spec.intersections || [])) {
    if (inter.year === year && inter.worlds.includes(worldId)) return inter;
  }
  return null;
}

function getIntersectionY(spec, inter) {
  const rows = inter.worlds.map(wid => {
    const w = spec.worlds.find(w => w.id === wid);
    return w ? w.row : 0;
  });
  return rowToY((Math.min(...rows) + Math.max(...rows)) / 2);
}

function worldTerminatesAtIntersection(spec, world) {
  const endYear = world.endYear;
  if (endYear === undefined) return false;
  return (spec.intersections || []).some(i => i.year === endYear && i.worlds.includes(world.id));
}

function buildWorldPath(spec, world) {
  const yearRange = spec.yearRange;
  const intersections = (spec.intersections || [])
    .filter(i => i.worlds.includes(world.id))
    .sort((a, b) => a.year - b.year);

  const startYear = world.startYear !== undefined ? world.startYear
    : world.divergeFrom ? world.divergeFrom.year
    : yearRange[0];
  const endYear = world.endYear !== undefined ? world.endYear : yearRange[1];
  const terminal = worldTerminatesAtIntersection(spec, world);
  const baseY = rowToY(world.row);
  const parts = [];
  let cursorX = yearToX(startYear, yearRange);

  if (world.divergeFrom) {
    const srcWorld = spec.worlds.find(w => w.id === world.divergeFrom.world);
    const fromY = srcWorld ? rowToY(srcWorld.row) : baseY;
    parts.push(`M ${cursorX.toFixed(1)} ${fromY.toFixed(1)}`);
    const endDivX = cursorX + BEND_WIDTH;
    const cp1x = cursorX + BEND_WIDTH * 0.1;
    const cp2x = cursorX + BEND_WIDTH * 0.65;
    parts.push(`C ${cp1x.toFixed(1)} ${fromY.toFixed(1)}, ${cp2x.toFixed(1)} ${baseY.toFixed(1)}, ${endDivX.toFixed(1)} ${baseY.toFixed(1)}`);
    cursorX = endDivX;
  } else {
    parts.push(`M ${cursorX.toFixed(1)} ${baseY.toFixed(1)}`);
  }

  for (let i = 0; i < intersections.length; i++) {
    const inter = intersections[i];
    const ix = yearToX(inter.year, yearRange);
    const iy = getIntersectionY(spec, inter);
    const bendStart = ix - BEND_WIDTH;
    const bendEnd = ix + BEND_WIDTH;
    const isTerminalHere = terminal && i === intersections.length - 1;
    const approachStartX = Math.max(cursorX, bendStart);
    if (approachStartX > cursorX) {
      parts.push(`L ${approachStartX.toFixed(1)} ${baseY.toFixed(1)}`);
    }
    const dx = ix - approachStartX;
    if (dx > 1) {
      const cp1x = approachStartX + dx * 0.65;
      const cp2x = ix - dx * 0.1;
      parts.push(`C ${cp1x.toFixed(1)} ${baseY.toFixed(1)}, ${cp2x.toFixed(1)} ${iy.toFixed(1)}, ${ix.toFixed(1)} ${iy.toFixed(1)}`);
    } else {
      parts.push(`L ${ix.toFixed(1)} ${iy.toFixed(1)}`);
    }
    if (isTerminalHere) break;
    const dx2 = bendEnd - ix;
    const cp3x = ix + dx2 * 0.1;
    const cp4x = bendEnd - dx2 * 0.65;
    parts.push(`C ${cp3x.toFixed(1)} ${iy.toFixed(1)}, ${cp4x.toFixed(1)} ${baseY.toFixed(1)}, ${bendEnd.toFixed(1)} ${baseY.toFixed(1)}`);
    cursorX = bendEnd;
  }

  const endX = yearToX(endYear, yearRange);
  if (!terminal && cursorX < endX) {
    parts.push(`L ${endX.toFixed(1)} ${baseY.toFixed(1)}`);
  }
  return parts.join(' ');
}

function evalCubicBezier(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  return mt*mt*mt*p0 + 3*mt*mt*t*p1 + 3*mt*t*t*p2 + t*t*t*p3;
}

function solveCubicBezierT(p0x, p1x, p2x, p3x, targetX) {
  let lo = 0, hi = 1;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    evalCubicBezier(p0x, p1x, p2x, p3x, mid) < targetX ? (lo = mid) : (hi = mid);
  }
  return (lo + hi) / 2;
}

function getWorldYAtYear(spec, world, year) {
  const yearRange = spec.yearRange;
  const baseY = rowToY(world.row);
  const pxPerYear = PLOT_W / (yearRange[1] - yearRange[0]);
  const bendWidthYears = BEND_WIDTH / pxPerYear;
  const intersections = (spec.intersections || [])
    .filter(i => i.worlds.includes(world.id))
    .sort((a, b) => a.year - b.year);

  for (const inter of intersections) {
    const iy = getIntersectionY(spec, inter);
    const approachStartYear = inter.year - bendWidthYears;
    const departureEndYear = inter.year + bendWidthYears;

    if (year >= approachStartYear && year <= inter.year) {
      const approachStartX = yearToX(approachStartYear, yearRange);
      const ix = yearToX(inter.year, yearRange);
      const dx = ix - approachStartX;
      if (dx <= 1) return iy;
      const cp1x = approachStartX + dx * 0.65;
      const cp2x = ix - dx * 0.1;
      const t = solveCubicBezierT(approachStartX, cp1x, cp2x, ix, yearToX(year, yearRange));
      return evalCubicBezier(baseY, baseY, iy, iy, t);
    }
    if (year > inter.year && year <= departureEndYear) {
      const ix = yearToX(inter.year, yearRange);
      const bendEndX = ix + BEND_WIDTH;
      const dx2 = BEND_WIDTH;
      const cp3x = ix + dx2 * 0.1;
      const cp4x = bendEndX - dx2 * 0.65;
      const t = solveCubicBezierT(ix, cp3x, cp4x, bendEndX, yearToX(year, yearRange));
      return evalCubicBezier(iy, iy, baseY, baseY, t);
    }
  }

  if (world.divergeFrom) {
    const srcWorld = spec.worlds.find(w => w.id === world.divergeFrom.world);
    const fromY = srcWorld ? rowToY(srcWorld.row) : baseY;
    const divStartYear = world.divergeFrom.year;
    const divEndYear = divStartYear + bendWidthYears;
    if (year >= divStartYear && year <= divEndYear) {
      const startX = yearToX(divStartYear, yearRange);
      const cp1x = startX + BEND_WIDTH * 0.1;
      const cp2x = startX + BEND_WIDTH * 0.65;
      const endDivX = startX + BEND_WIDTH;
      const t = solveCubicBezierT(startX, cp1x, cp2x, endDivX, yearToX(year, yearRange));
      return evalCubicBezier(fromY, fromY, baseY, baseY, t);
    }
  }

  return baseY;
}

function escapeXml(s) {
  return String(s).replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c]));
}

function shadeColor(hex, clone) {
  if (!clone) return hex;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lighten = (clone % 2 === 1);
  const amount  = Math.ceil(clone / 2) * 0.28;
  const target  = lighten ? 255 : 0;
  const clamp   = v => Math.max(0, Math.min(255, Math.round(v)));
  return '#' + [r, g, b]
    .map(c => clamp(c + (target - c) * amount).toString(16).padStart(2, '0'))
    .join('');
}

function render(spec) {
  const yearRange = spec.yearRange;
  const numRows = Math.max(...spec.worlds.map(w => w.row)) + 1;
  const VIEW_H = TOP_MARGIN + numRows * ROW_HEIGHT + 80;

  const parts = [];
  parts.push(`<svg width="100%" viewBox="0 0 ${VIEW_W} ${VIEW_H}" xmlns="http://www.w3.org/2000/svg" role="img">`);
  parts.push(`<title>Dark timeline diagram</title>`);
  parts.push(`<desc>Timeline graph generated from JSON spec</desc>`);
  parts.push(`<rect x="0" y="0" width="${VIEW_W}" height="${VIEW_H}" fill="#141418"/>`);

  parts.push(`<defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
    <filter id="travel-glow" x="-120%" y="-120%" width="340%" height="340%" color-interpolation-filters="sRGB">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="wide"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="tight"/>
      <feMerge>
        <feMergeNode in="wide"/>
        <feMergeNode in="tight"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <marker id="arrow-mid" viewBox="-11 -6 13 12" refX="0" refY="0" markerWidth="16" markerHeight="16" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M 0 0 L -10 -5 L -6 0 L -10 5 Z" fill="context-stroke" stroke="none"/>
    </marker>
  </defs>`);

  const mutedColor = '#888780';

  parts.push(`<text x="${VIEW_W/2}" y="20" text-anchor="middle" font-family="sans-serif" font-size="10px" letter-spacing="1" fill="${mutedColor}" opacity="0.7">TIME →</text>`);
  parts.push(`<line x1="${LEFT_MARGIN - 20}" y1="28" x2="${VIEW_W - 20}" y2="28" stroke="${mutedColor}" stroke-width="0.5" opacity="0.3"/>`);

  const yearMarks = [];
  for (let y = Math.ceil(yearRange[0] / 25) * 25; y <= yearRange[1]; y += 25) yearMarks.push(y);
  for (const y of yearMarks) {
    const x = yearToX(y, yearRange);
    parts.push(`<line x1="${x}" y1="28" x2="${x}" y2="32" stroke="${mutedColor}" stroke-width="0.5" opacity="0.4"/>`);
    parts.push(`<text x="${x}" y="42" text-anchor="middle" font-family="sans-serif" font-size="9px" fill="${mutedColor}" opacity="0.7">${y}</text>`);
  }

  for (const inter of (spec.intersections || [])) {
    const ix = yearToX(inter.year, yearRange);
    const iy = getIntersectionY(spec, inter);
    parts.push(`<circle cx="${ix}" cy="${iy}" r="${INTERSECTION_RADIUS}" fill="none" stroke="#EF9F27" stroke-width="1.5" stroke-dasharray="3 2" opacity="0.7"/>`);
  }

  for (const node of (spec.nodes || [])) {
    const world = spec.worlds.find(w => w.id === node.world);
    if (!world) continue;
    const nx = yearToX(node.year, yearRange);
    const ny = getWorldYAtYear(spec, world, node.year);
    parts.push(`<circle cx="${nx}" cy="${ny}" r="${NODE_RADIUS}" fill="none" stroke="#EF9F27" stroke-width="1.5" stroke-dasharray="3 2" opacity="0.7"/>`);
  }

  for (const world of spec.worlds) {
    const path = buildWorldPath(spec, world);
    const weight = world.weight || 1.5;
    const terminated = worldTerminatesAtIntersection(spec, world);
    const arrowAttr = terminated ? '' : ' marker-end="url(#arrow)"';
    parts.push(`<path d="${path}" fill="none" stroke="${world.color}" stroke-width="${weight}" stroke-linejoin="round"${arrowAttr}/>`);
    const labelX = LEFT_MARGIN - 8;
    const labelY = rowToY(world.row);
    parts.push(`<text x="${labelX}" y="${labelY}" text-anchor="end" dominant-baseline="central" font-family="sans-serif" font-size="13px" font-weight="500" fill="${world.color}">${escapeXml(world.label)}</text>`);
  }

  for (const seg of (spec.segments || [])) {
    const world = spec.worlds.find(w => w.id === seg.world);
    if (!world) continue;
    const x1 = yearToX(seg.from, yearRange);
    const x2 = yearToX(seg.to, yearRange);
    const y1 = getWorldYAtYear(spec, world, seg.from);
    const y2 = getWorldYAtYear(spec, world, seg.to);
    parts.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${world.color}" stroke-width="5" stroke-linecap="round" opacity="0.35"/>`);
    if (seg.label) {
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const above = seg.labelSide === 'above';
      const labelY = above ? midY - 10 : midY + 14;
      parts.push(`<text x="${midX.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" font-family="sans-serif" font-size="8px" font-style="italic" letter-spacing="0.5" fill="${world.color}" opacity="0.75">${escapeXml(seg.label)}</text>`);
    }
  }

  function drawTick(cx, cy, color) {
    parts.push(`<line x1="${cx}" y1="${cy - 5}" x2="${cx}" y2="${cy + 5}" stroke="${color}" stroke-width="2" stroke-linecap="round"/>`);
  }
  function drawOpenRing(cx, cy, color) {
    parts.push(`<circle cx="${cx}" cy="${cy}" r="3.5" fill="none" stroke="${color}" stroke-width="1.5"/>`);
  }

  for (const wormhole of (spec.wormholes || [])) {
    const world = spec.worlds.find(w => w.id === wormhole.world);
    if (!world) continue;
    const anchorX = yearToX(wormhole.anchor, yearRange);
    const anchorY = getWorldYAtYear(spec, world, wormhole.anchor);
    const side = wormhole.side === 'below' ? 1 : -1;
    const isWindowed = !!wormhole.window;
    const anchorAtIntersection = findIntersectionForWorldYear(spec, world.id, wormhole.anchor);
    if (!anchorAtIntersection) {
      if (isWindowed) drawTick(anchorX, anchorY, world.color);
      else drawOpenRing(anchorX, anchorY, world.color);
      const anchorLabelY = side < 0 ? anchorY - 10 : anchorY + 15;
      parts.push(`<text x="${anchorX}" y="${anchorLabelY}" text-anchor="middle" font-family="sans-serif" font-size="9px" fill="${world.color}" opacity="0.9">${wormhole.anchor}</text>`);
    }
    for (const jumpYear of wormhole.jumps) {
      const jx = yearToX(jumpYear, yearRange);
      const jy = getWorldYAtYear(spec, world, jumpYear);
      const dx = jx - anchorX;
      const arcHeight = Math.min(36, Math.max(14, Math.abs(dx) * 0.35));
      const midX = (anchorX + jx) / 2;
      const midY = (anchorY + jy) / 2 + side * arcHeight;
      parts.push(`<path d="M ${anchorX} ${anchorY} Q ${midX} ${midY}, ${jx} ${jy}" fill="none" stroke="${world.color}" stroke-width="1.2" stroke-dasharray="3 2" opacity="0.85"/>`);
      const jumpAtNode = (spec.nodes || []).some(n => n.world === wormhole.world && n.year === jumpYear);
      if (!jumpAtNode) {
        if (isWindowed) drawTick(jx, jy, world.color);
        else drawOpenRing(jx, jy, world.color);
      }
      const labelY = side < 0 ? jy - 10 : jy + 15;
      parts.push(`<text x="${jx}" y="${labelY}" text-anchor="middle" font-family="sans-serif" font-size="9px" fill="${mutedColor}" opacity="0.85">${jumpYear}</text>`);
    }
  }

  // Travel arcs
  for (let i = 0; i < (spec.travels || []).length; i++) {
    const travel    = spec.travels[i];
    const char      = (spec.characters || []).find(c => c.id === travel.character);
    if (!char) continue;
    const fromWorld = spec.worlds.find(w => w.id === travel.from.world);
    const toWorld   = spec.worlds.find(w => w.id === travel.to.world);
    if (!fromWorld || !toWorld) continue;
    const color     = shadeColor(char.color, travel.clone || 0);
    const fromX     = yearToX(travel.from.year, yearRange);
    const fromY     = getWorldYAtYear(spec, fromWorld, travel.from.year);
    const toX       = yearToX(travel.to.year,   yearRange);
    const toY       = getWorldYAtYear(spec, toWorld,   travel.to.year);
    const rowDist   = Math.abs(fromWorld.row - toWorld.row);
    const pastward  = travel.to.year < travel.from.year;
    const side      = pastward ? -1 : 1;
    const arcHeight = rowDist > 0
      ? Math.max(rowDist * ROW_HEIGHT * 0.55, 28)
      : Math.max(20, Math.abs(toX - fromX) * 0.18);
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2 + side * arcHeight;
    const interWorld = rowDist > 0;
    let splitPathD;

    if (travel.type === 'normal') {
      const oy    = rowToY(fromWorld.row) + 3;
      const pathD = `M ${fromX.toFixed(1)} ${oy.toFixed(1)} L ${toX.toFixed(1)} ${oy.toFixed(1)}`;
      parts.push(`<path id="travel-arc-${i}" d="${pathD}" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="4 3" opacity="0.08"/>`);
    } else if (interWorld) {
      const yearDiff = travel.to.year - travel.from.year;
      const sweepDir = yearDiff >= 0 ? 1 : -1;
      const sweepAmt = Math.max(60, Math.min(90, Math.abs(toX - fromX) * 0.12 + 55));
      const sw       = (fromX + toX) / 2 + sweepDir * sweepAmt;
      const pathD    = `M ${fromX.toFixed(1)} ${fromY.toFixed(1)} C ${sw.toFixed(1)} ${fromY.toFixed(1)}, ${sw.toFixed(1)} ${toY.toFixed(1)}, ${toX.toFixed(1)} ${toY.toFixed(1)}`;
      parts.push(`<path id="travel-arc-${i}" d="${pathD}" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="5 4" opacity="0.18" filter="url(#travel-glow)"/>`);
      const c1ax = (fromX + sw) / 2,         c1ay = fromY;
      const c1bx = (fromX + 3*sw) / 4,       c1by = (3*fromY + toY) / 4;
      const Sx   = (fromX + 6*sw + toX) / 8, Sy   = (fromY + toY) / 2;
      const c2ax = (3*sw + toX) / 4,         c2ay = (fromY + 3*toY) / 4;
      const c2bx = (sw + toX) / 2,           c2by = toY;
      splitPathD = `M ${fromX.toFixed(1)} ${fromY.toFixed(1)} C ${c1ax.toFixed(1)} ${c1ay.toFixed(1)},${c1bx.toFixed(1)} ${c1by.toFixed(1)},${Sx.toFixed(1)} ${Sy.toFixed(1)} C ${c2ax.toFixed(1)} ${c2ay.toFixed(1)},${c2bx.toFixed(1)} ${c2by.toFixed(1)},${toX.toFixed(1)} ${toY.toFixed(1)}`;
      parts.push(`<path id="travel-arrow-${i}" d="${splitPathD}" fill="none" stroke="${color}" stroke-width="0.01" stroke-opacity="0" marker-mid="url(#arrow-mid)" display="none" filter="url(#travel-glow)"/>`);
    } else {
      const pathD = `M ${fromX.toFixed(1)} ${fromY.toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)}, ${toX.toFixed(1)} ${toY.toFixed(1)}`;
      parts.push(`<path id="travel-arc-${i}" d="${pathD}" fill="none" stroke="${color}" stroke-width="1" stroke-dasharray="4 3" opacity="0.08"/>`);
      const c1x = (fromX + midX) / 2, c1y = (fromY + midY) / 2;
      const c2x = (midX + toX) / 2,   c2y = (midY + toY) / 2;
      const Sx  = (c1x + c2x) / 2,    Sy  = (c1y + c2y) / 2;
      splitPathD = `M ${fromX.toFixed(1)} ${fromY.toFixed(1)} Q ${c1x.toFixed(1)} ${c1y.toFixed(1)},${Sx.toFixed(1)} ${Sy.toFixed(1)} Q ${c2x.toFixed(1)} ${c2y.toFixed(1)},${toX.toFixed(1)} ${toY.toFixed(1)}`;
      parts.push(`<path id="travel-arrow-${i}" d="${splitPathD}" fill="none" stroke="${color}" stroke-width="0.01" stroke-opacity="0" marker-mid="url(#arrow-mid)" display="none"/>`);
    }
  }

  for (const weld of (spec.welds || [])) {
    const fromWorld = spec.worlds.find(w => w.id === weld.from.world);
    const toWorld = spec.worlds.find(w => w.id === weld.to.world);
    if (!fromWorld || !toWorld) continue;
    const fx = yearToX(weld.from.year, yearRange);
    const tx = yearToX(weld.to.year, yearRange);
    const midX = ((fx + tx) / 2).toFixed(1);
    const allRows = spec.worlds.map(w => w.row);
    const topY = (rowToY(Math.min(...allRows)) - 12).toFixed(1);
    const botY = (rowToY(Math.max(...allRows)) + 12).toFixed(1);
    parts.push(`<line x1="${midX}" y1="${topY}" x2="${midX}" y2="${botY}" stroke="#D85A30" stroke-width="5" opacity="0.08"/>`);
    parts.push(`<line x1="${midX}" y1="${topY}" x2="${midX}" y2="${botY}" stroke="#D85A30" stroke-width="1" opacity="0.55"/>`);
    if (weld.label) {
      const labelY = ((parseFloat(topY) + parseFloat(botY)) / 2).toFixed(1);
      parts.push(`<text transform="rotate(-90,${parseFloat(midX) - 10},${labelY})" x="${parseFloat(midX) - 10}" y="${labelY}" text-anchor="middle" font-family="sans-serif" font-size="8px" font-style="italic" letter-spacing="0.5" fill="#D85A30" opacity="0.7">${escapeXml(weld.label)}</text>`);
    }
  }

  {
    const allRows = spec.worlds.map(w => w.row);
    const topY = (rowToY(Math.min(...allRows)) - 16).toFixed(1);
    const botY = (rowToY(Math.max(...allRows)) + 16).toFixed(1);
    for (const cycle of (spec.cycles || [])) {
      const cx = yearToX(cycle.year, yearRange).toFixed(1);
      const color = cycle.color || '#C8A951';
      parts.push(`<line x1="${cx}" y1="${topY}" x2="${cx}" y2="${botY}" stroke="${color}" stroke-width="0.75" stroke-dasharray="2 5" opacity="0.38"/>`);
      if (cycle.label) {
        parts.push(`<text x="${cx}" y="${(parseFloat(botY) + 11).toFixed(1)}" text-anchor="middle" font-family="sans-serif" font-size="7px" letter-spacing="0.5" fill="${color}" opacity="0.55">${escapeXml(cycle.label)}</text>`);
      }
    }
  }

  for (const inter of (spec.intersections || [])) {
    const ix = yearToX(inter.year, yearRange);
    const iy = getIntersectionY(spec, inter);
    parts.push(`<circle cx="${ix}" cy="${iy}" r="5" fill="#EF9F27"/>`);
    if (inter.label) {
      parts.push(`<text x="${ix}" y="${iy + INTERSECTION_RADIUS + 12}" text-anchor="middle" font-family="sans-serif" font-size="10px" font-weight="600" fill="#854F0B">${escapeXml(inter.label)}</text>`);
      parts.push(`<text x="${ix}" y="${iy + INTERSECTION_RADIUS + 23}" text-anchor="middle" font-family="sans-serif" font-size="8px" fill="#854F0B" opacity="0.7">${inter.year}</text>`);
    }
  }

  for (const node of (spec.nodes || [])) {
    const world = spec.worlds.find(w => w.id === node.world);
    if (!world) continue;
    const nx = yearToX(node.year, yearRange);
    const ny = getWorldYAtYear(spec, world, node.year);
    parts.push(`<circle cx="${nx}" cy="${ny}" r="3.5" fill="#EF9F27"/>`);
    if (node.label) {
      parts.push(`<text x="${nx}" y="${ny + NODE_RADIUS + 11}" text-anchor="middle" font-family="sans-serif" font-size="9px" fill="#854F0B">${escapeXml(node.label)}</text>`);
      parts.push(`<text x="${nx}" y="${ny + NODE_RADIUS + 21}" text-anchor="middle" font-family="sans-serif" font-size="8px" fill="#854F0B" opacity="0.7">${node.year}</text>`);
    }
  }

  for (const branch of (spec.branches || [])) {
    const fromWorld = spec.worlds.find(w => w.id === branch.fromWorld);
    const newWorld = spec.worlds.find(w => w.id === branch.newWorld);
    if (!fromWorld || !newWorld) continue;
    const bx = yearToX(branch.fromYear, yearRange);
    const by = rowToY(fromWorld.row);
    const causingInter = (spec.intersections || [])
      .filter(i => i.worlds.includes(branch.fromWorld) && i.year > branch.fromYear)
      .sort((a, b) => a.year - b.year)[0];
    if (causingInter) {
      const ix = yearToX(causingInter.year, yearRange);
      const iy = getIntersectionY(spec, causingInter);
      const below = newWorld.row > fromWorld.row;
      const midX = (ix + bx) / 2;
      const span = Math.abs(ix - bx);
      const arcHeight = Math.min(36, span * 0.45);
      const midY = Math.max(iy, by) + (below ? arcHeight : -arcHeight);
      parts.push(`<path d="M ${ix.toFixed(1)} ${iy.toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)}, ${bx.toFixed(1)} ${by.toFixed(1)}" fill="none" stroke="${newWorld.color}" stroke-width="1.2" stroke-dasharray="3 2" opacity="0.85"/>`);
    } else {
      const ty = rowToY(newWorld.row);
      parts.push(`<path d="M ${bx.toFixed(1)} ${by.toFixed(1)} Q ${bx.toFixed(1)} ${((by+ty)/2).toFixed(1)}, ${bx.toFixed(1)} ${ty.toFixed(1)}" fill="none" stroke="${newWorld.color}" stroke-width="1.5" stroke-dasharray="4 3"/>`);
    }
    parts.push(`<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="3.5" fill="${newWorld.color}"/>`);
    parts.push(`<text x="${bx.toFixed(1)}" y="${(by + 16).toFixed(1)}" text-anchor="middle" font-family="sans-serif" font-size="10px" fill="${mutedColor}">${branch.fromYear}</text>`);
  }

  const markerPositions = [];
  for (let i = 0; i < (spec.markers || []).length; i++) {
    const marker = spec.markers[i];
    const world = spec.worlds.find(w => w.id === marker.world);
    if (!world) continue;
    const mx = yearToX(marker.year, yearRange);
    const my = getWorldYAtYear(spec, world, marker.year);
    const color = marker.color || world.color;
    parts.push(`<circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="3" fill="${color}" stroke="white" stroke-width="1.5" stroke-opacity="0.35"/>`);
    if (marker.label) markerPositions.push({ i, marker, mx, my, color });
  }

  // Annotation callouts — hidden in static SVG; shown on click in the HTML editor
  for (const { i, marker, mx, my, color } of markerPositions) {
    const yearStr = String(marker.year);
    const boxW = Math.max(marker.label.length * 6.0, yearStr.length * 5.5) + 22;
    const boxH = 34;
    const above = my - boxH - 12 >= 8;
    const boxY = above ? my - boxH - 12 : my + 10;
    const arrowTipY = above ? my - 4 : my + 4;
    const arrowBaseY = above ? boxY + boxH : boxY;
    const boxX = Math.min(Math.max(mx - boxW / 2, LEFT_MARGIN - 6), VIEW_W - RIGHT_MARGIN - boxW + 6);
    const textCX = boxX + boxW / 2;
    const arrowBaseX = Math.min(Math.max(mx, boxX + 8), boxX + boxW - 8);
    parts.push(`<g id="annot-${i}" display="none">`);
    parts.push(`<rect x="${(boxX + 1).toFixed(1)}" y="${(boxY + 2).toFixed(1)}" width="${boxW.toFixed(1)}" height="${boxH}" rx="4" fill="black" opacity="0.2"/>`);
    parts.push(`<path d="M ${mx.toFixed(1)} ${arrowTipY} L ${(arrowBaseX - 5).toFixed(1)} ${arrowBaseY} L ${(arrowBaseX + 5).toFixed(1)} ${arrowBaseY} Z" fill="#1c1c1c"/>`);
    parts.push(`<rect x="${boxX.toFixed(1)}" y="${boxY.toFixed(1)}" width="${boxW.toFixed(1)}" height="${boxH}" rx="4" fill="#1c1c1c"/>`);
    parts.push(`<text x="${textCX.toFixed(1)}" y="${(boxY + 14).toFixed(1)}" text-anchor="middle" font-family="sans-serif" font-size="10px" font-weight="500" fill="${color}">${escapeXml(marker.label)}</text>`);
    parts.push(`<text x="${textCX.toFixed(1)}" y="${(boxY + 27).toFixed(1)}" text-anchor="middle" font-family="sans-serif" font-size="9px" fill="rgba(255,255,255,0.45)">${yearStr}</text>`);
    parts.push(`</g>`);
  }

  parts.push('</svg>');
  return parts.join('\n');
}

const svg = render(spec);
fs.writeFileSync(outputFile, svg);
console.log(`Written ${svg.split('\n').length} lines → ${outputFile}`);
