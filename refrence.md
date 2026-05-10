# Dark Timeline Visualizer — Reference

This document captures a conceptual exploration of the topology of the show *Dark* (Netflix, 2017–2020) and the design of a small declarative tool for diagramming it. Use it to bootstrap further work in an IDE.

## Project goal

Build a small, declarative authoring tool that takes a JSON spec describing the timelines, wormholes, and intersections in *Dark* and renders a clean 2D timeline-graph diagram from it. The diagram should be:

- Easy to author (edit JSON, see diagram)
- Easy to extend (new spec fields → new render passes)
- Suitable for documenting alternative interpretations of the show's metaphysics

A working prototype exists as a single self-contained HTML+JS widget. This document records the conceptual model the tool is meant to express, the schema it currently supports, and the directions it could grow.

---

## Part 1 — The conceptual model

### The problem the tool is solving

*Dark* depicts a multi-world time-travel structure that resists clean description in normal physics terms. The show invokes both "block universe" (set in stone) and "many worlds" framings, but neither alone is consistent with what's depicted. Diagrams in the show's own promotional material are causally suggestive but geometrically vague.

The conceptual goal is to settle on a single coherent topological model and visualize it. Several attempts at higher-fidelity 3D-manifold renderings (Three.js with parametric tubes, wormhole throats, etc.) were tried and discarded — they were either visually misleading or required visualizing 4D in 3D in ways that obscured rather than clarified.

The chosen approach: treat each timeline as a **1D worldline** drawn as a horizontal line, with **wormholes** as arcs/links connecting points on those lines, and **intersections** as convergence points where multiple worldlines meet. This is honest about what's being depicted (causal/topological structure) without pretending to render a manifold.

### The model the tool encodes

Four worldlines, drawn as horizontal tracks:

1. **Adam's world** — one of two paradox-loop worlds. Internal closed timelike curves (CTCs) form a cave-handle wormhole system anchored at 1986.
2. **Eva's world** — the other paradox-loop world. Mirror structure with its own cave-handle anchored at 1986.
3. **Origin world** — the "real" timeline where Tannhaus builds his time machine. Globally hyperbolic, no CTCs.
4. **Paradise** — the post-resolution timeline that emerges after Jonas and Martha intervene in the Origin world. Branches off from Origin at 1971 (the year of the car crash that motivates Tannhaus).

Geometric features:

- **Cave-star wormhole** at 1986 in each paradox-world. The 1986 prototype experiment in Tannhaus's bunker creates a localized wormhole structure. Jumps radiate from this anchor in 33-year multiples: in Adam's world the cave connects 1986 ↔ 1953, 1986 ↔ 2019. In Eva's world it adds 1986 ↔ 2052 (and possibly 1986 ↔ 1920). These are *intra-world* — they do not bridge to any other world.

- **Apocalypse weld** at 2020 connecting Adam's world to Eva's world. This is a separate geometric feature from the cave-star — same family of physics (God Particle / wormhole), but at a different scale. It's the *cross-world* bridge and the place where the two paradox-worlds are causally connected.

- **Tannhaus intersection** at 1986. The three worlds (Adam, Eva, Origin) converge at a single coordinate corresponding to Tannhaus's machine activation in the Origin world (and the simultaneous prototype-experiment events in the paradox-worlds). The three timelines bend toward each other at this point and diverge again.

- **Paradise branch** at 1971 (Origin world). The new timeline diverges from the Origin trunk before the Tannhaus event, representing the corrected history after Jonas and Martha prevent Tannhaus's grief-driven invention.

### Why this model resolves the show's confusing mechanics

A few specific puzzles that the model handles cleanly:

**Why is the apocalypse special?**
Because it's the *only* moment when a worldline can leave the paradox-bud. The cave-star at 1986 is internal — its handles only connect points within one lobe. The apocalypse weld at 2020 is the only feature that bridges between worlds, and it's also the only place where the contingency thread to the Origin terminates. Crossing back to Origin is only possible at the apocalypse because that's where the bud's geometry actually touches the parent manifold.

**Why does "the loop has happened infinite times" feel both true and false?**
True in the sense that the bootstrap structure is genuinely closed and self-consistent — events cause themselves around the loop. False in the sense that there's no temporal repetition; the loop happens *once* as a static topological feature. The "infinite times" phrasing is a narrative device for what's actually a single closed causal curve embedded in a normal-time manifold. (Time inside each paradox-world is open ℝ, extending to infinity in both directions; the closure is in the *causal* structure via the wormhole handles, not in the time dimension itself.)

**Why doesn't preventing the machine paradoxically erase Jonas and Martha's act of preventing it?**
Because they perform the act in the Origin world, which is globally hyperbolic — a normal Lorentzian manifold with standard forward causality. Their act is causally ordinary in that frame. What it does is sever the contingency between Origin and bud: the paradox-worlds were budded off from the Origin by Tannhaus's act, and removing that act removes the bud. The bud "was never instantiated" rather than "was retroactively unmade." Jonas and Martha simply fade because they were echoes from a structure that no longer exists, but the Origin world's history continues normally.

**What does "macroscopic superposition at the apocalypse" mean?**
This is the show's hand-wave for how Jonas can simultaneously stay in the bunker (one branch) and be rescued by Alt-Martha to her world (other branch). In topological terms, the apocalypse weld and the contingency-thread terminus are co-located, so a worldline reaching this point genuinely has two valid continuations. The "superposition" framing gives both continuations equal ontological status. The tool doesn't need to model this directly — it's enough to draw the weld and the contingency thread; the bifurcation is implicit.

### Honest caveats

- The apocalypse year is ambiguous: the show shows the apocalypse occurring on June 27, 2020, but the run-up events (the "Stranger Things"-style buildup, the failed shutdown attempts) span late 2019 through early 2020. The diagram puts the weld at 2020 by convention.
- The cave-star is shown as multi-handled (one anchor, multiple targets). Strictly, this is unusual topology — multiple handles sharing one mouth. A cleaner alternative is a single thicker handle with internal branching, but the visual effect is similar.
- Eva's world shows additional jumps to 2052 (and the show implies further multiples of 33 years). The 33-year period is the natural periodicity of whatever physics governs the wormhole.
- The contingency thread between Origin and the apocalypse weld is conceptual rather than a literal worldline — no character travels along it. It represents the dependency relation: the bud exists *because of* the Tannhaus event in Origin.

---

## Part 2 — The tool

### Architecture

A single self-contained HTML widget. JSON spec on the input side, SVG diagram on the output side. No build step, no dependencies — just inline JS that reads the spec and emits SVG.

Key files (in the form the prototype was built as a single widget; in the IDE you'll likely split these):

- **Spec schema** (currently informal, defined by what the renderer reads — see schema below).
- **Renderer** — pure function `(spec) → svgString`. Reads the spec, computes coordinates, emits SVG elements.
- **UI shell** — textarea editor, render button, download buttons, status line.

The renderer follows a strict pipeline: world tracks first (with arrowheads), intersections (as convergence circles), cave-stars (as dashed arcs above/below their world), welds (as solid colored bridges), branches (as dashed curves diverging to a new track), markers (as labeled dots).

### Schema (current)

```json
{
  "yearRange": [1880, 2060],
  "worlds": [
    {
      "id": "adam",
      "label": "Adam",
      "color": "#378ADD",
      "row": 0,
      "weight": 1.5,
      "startYear": 1880,
      "endYear": 2060
    }
  ],
  "intersections": [
    {
      "year": 1986,
      "worlds": ["adam", "eva", "origin"],
      "label": "Tannhaus event"
    }
  ],
  "caveStars": [
    {
      "world": "adam",
      "anchor": 1986,
      "jumps": [1953, 2019],
      "side": "above"
    }
  ],
  "welds": [
    {
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "eva", "year": 2020 },
      "label": "apocalypse"
    }
  ],
  "branches": [
    {
      "fromWorld": "origin",
      "fromYear": 1971,
      "newWorld": "paradise"
    }
  ],
  "markers": [
    {
      "world": "adam",
      "year": 2020,
      "label": "rescue point",
      "color": "#D85A30"
    }
  ]
}
```

Field semantics:

- **`yearRange`**: `[start, end]` in years. Defines the x-axis. All x-coordinates are computed by linear interpolation: `x = LEFT_MARGIN + ((year - start) / (end - start)) * PLOT_WIDTH`.

- **`worlds[]`**: Each world is a horizontal track at `row` slot (0 = topmost). `color` is used for the line and the label. `weight` is stroke-width (default 1.5, use 2 for emphasis like Origin). `startYear`/`endYear` default to `yearRange` but can be overridden — Paradise has `startYear: 1971` so its track only begins from the branch point.

- **`intersections[]`**: A list of worlds bend toward a shared y at the given year. The shared y is the *average row* of participating worlds, converted to pixels. The bend width on either side of the intersection is fixed at 50px. The intersection is rendered as a dashed amber circle (radius 20px) plus a solid amber dot.

- **`caveStars[]`**: An anchor year on a single world, plus a list of jump-target years. The anchor gets a larger filled dot; each jump gets a smaller dot connected to the anchor by a dashed quadratic Bézier arc. `side: "above"` arcs upward (for top worlds), `"below"` arcs downward.

- **`welds[]`**: A solid orange line (stroke-width 2.5) connecting one world+year point to another. Both endpoints get filled dots. Labels appear inline next to the midpoint.

- **`branches[]`**: A new worldline diverges from an existing world at `fromYear`. The new world (`newWorld` id) must exist in the `worlds[]` array — its color, row, and label come from there. The branch is rendered as a dashed quadratic Bézier curve from the source point to the new world's row.

- **`markers[]`**: Named events highlighted on a specific world+year. Useful for labeling key moments without affecting the worldline geometry. Color defaults to the world's color but can override (e.g., apocalypse-orange dots).

### Rendering details

- viewBox: `0 0 760 H` where `H = 50 + numRows * 70 + 80`.
- Left margin: 70px (room for world labels).
- Right margin: 50px.
- Row height: 70px (centers spaced this far apart).
- Time axis: drawn as a thin gray line at y=32 with year tick labels every 25 years.
- Dark mode: detected via `matchMedia('(prefers-color-scheme: dark)')` and used for label text colors.
- All numeric coordinates rounded to one decimal place in the output SVG to keep the markup readable.

### Color conventions

- Adam: blue `#378ADD` (mid blue ramp)
- Eva: pink `#D4537E` (mid pink ramp)
- Origin: gray `#888780` (mid gray ramp)
- Paradise: green `#1D9E75` (mid teal ramp)
- Apocalypse weld: orange `#D85A30` (mid coral ramp)
- Intersection: amber `#EF9F27` (mid amber ramp)

These follow a 7-stop ramp system. The mid stop (~600) reads well on both light and dark backgrounds. Avoid pure red/green to leave them available for status semantics.

---

## Part 3 — Where to take it next

The current prototype handles the static topology but stops short of several things that would make it a richer documentation tool. In rough priority order:

### 1. Character worldlines

Thread individual character lines through the wormholes. A character spec might look like:

```json
{
  "characters": [
    {
      "id": "jonas",
      "label": "Jonas",
      "color": "#185FA5",
      "segments": [
        { "world": "adam", "from": 2019, "to": 2019 },
        { "via": "caveStar", "world": "adam", "fromYear": 2019, "toYear": 1986 },
        { "world": "adam", "from": 1986, "to": 1986 },
        { "via": "caveStar", "world": "adam", "fromYear": 1986, "toYear": 1953 },
        { "world": "adam", "from": 1953, "to": 1986 },
        { "via": "weld", "world": "eva" },
        { "world": "eva", "from": 2020, "to": 2020 }
      ]
    }
  ]
}
```

Render as a thin colored line tracking through the diagram, dipping into wormholes (drawn following the dashed arc) and emerging at the target. This is probably the highest-value extension because it lets the tool actually depict *journeys*, not just structure.

### 2. Multiple cave-stars per world

The current schema allows one anchor per `caveStars` entry, but you can declare multiple entries for the same world. Worth verifying this renders cleanly when overlapping.

### 3. Alternate scenarios

A `scenarios` key at the top level, where each scenario is a partial spec that overrides parts of a base spec. Useful for showing "before resolution" vs "after resolution" or alternative readings. The UI would gain a dropdown to pick the active scenario.

### 4. Annotations on segments

Right now, markers attach to single year points. Sometimes you want to annotate a *range* — e.g., "Adam's reign as leader: 2019–2053" as a highlighted segment of the Adam line. Schema:

```json
{
  "segments": [
    {
      "world": "adam",
      "from": 2019,
      "to": 2053,
      "label": "Adam's reign",
      "style": "thick"
    }
  ]
}
```

### 5. Time scale options

Currently linear. For a show that spans 1880–2060, sometimes you want logarithmic-around-1986 to give the wormhole region more visual room. A `xScale` config field on `yearRange` would handle this.

### 6. Export to TikZ / standalone SVG

The Download SVG button works. A TikZ exporter would make the diagram embeddable in LaTeX papers. The TikZ output is a straightforward translation of the same coordinate computations.

### 7. Validation

The renderer currently silently skips malformed entries (e.g., a weld pointing to a world that doesn't exist). A real `validate(spec)` pass that reports errors before rendering would help when authoring complex specs.

### 8. Schema-driven editor

Replace the raw JSON textarea with a structured form (add world, add weld, edit intersection). Less powerful but lower friction. Could coexist with the JSON view via a tab.

---

## Part 4 — Notes on conceptual commitments

A few choices in the model that someone extending this should know about, because they're judgment calls rather than show-canon:

- **Treating Origin as the "real" timeline.** The show suggests this but never quite confirms it; some viewers read the Origin world as just another loop, with the resolution being a loop that's slightly less paradoxical rather than truly paradox-free. The current model commits to the cleaner reading.

- **Apocalypse weld at 2020 rather than 2019/2020 boundary.** The show stages the actual crossing at the moment of the apocalypse explosion, which is on June 27, 2020. The diagram puts the weld at year 2020 as a single coordinate. A more careful version might use 2019.5 or a small range.

- **33-year periodicity.** The cave-star jumps are in multiples of 33 from the 1986 anchor. This isn't strictly required by the topology — you could draw the cave-star with arbitrary jump targets — but it's a load-bearing detail in the show.

- **Paradise's branch year.** The show is ambiguous about whether Paradise diverges *at* the Tannhaus event or *before* it. The car crash in 1971 is the proximal cause Tannhaus is trying to undo, so branching at 1971 (the moment the new history starts working differently) is defensible. Branching at 1986 (the moment the new history first diverges from the loop's expectation) is also defensible. Pick whichever the diagram is meant to communicate.

- **Cave-star side (above vs below).** Purely a layout choice to avoid visual collision. Topologically Adam's and Eva's caves are the same kind of object.

---

## Part 5 — Files to create when starting in IDE

A reasonable structure for porting this out of the single-file prototype:

```
dark-timeline/
├── README.md            # User-facing docs
├── reference.md         # This file
├── index.html           # Shell page
├── src/
│   ├── render.js        # Pure renderer: spec → svgString
│   ├── ui.js            # Editor, buttons, status, event wiring
│   ├── scenarios/
│   │   ├── default.json # The canonical Dark spec
│   │   ├── adam-only.json
│   │   └── ...
│   └── styles.css
└── tests/
    └── render.test.js   # Unit tests for the renderer
```

The renderer is pure, so it's straightforward to test. Sample test:

```js
test('two-world intersection bends both worlds toward shared y', () => {
  const spec = {
    yearRange: [2000, 2020],
    worlds: [
      { id: 'a', row: 0, color: '#000', label: 'A' },
      { id: 'b', row: 2, color: '#000', label: 'B' }
    ],
    intersections: [{ year: 2010, worlds: ['a', 'b'] }]
  };
  const svg = render(spec);
  // Both worlds should have a path with a bend at the intersection year
  expect(svg).toContain('row=0 bend');
  // Or test parsed paths against expected coordinates
});
```

---

## Part 6 — Prompt for resuming with Claude in IDE

If you want to bootstrap a fresh Claude session quickly, here's a prompt that captures the working context:

> I'm building a declarative timeline-graph tool to visualize the topology of the show *Dark*. We've already worked through the conceptual model (see reference.md) and built a single-file HTML prototype. The prototype takes a JSON spec describing worldlines, intersections, cave-star wormholes, apocalypse welds, branches, and markers, and renders an SVG timeline diagram from it. I want to extract this into a proper project structure, add character-worldline support (showing how individual characters' paths thread through the wormholes), and write tests for the renderer. Please read reference.md and then propose a project layout and a plan for the next iteration.

That should be enough for Claude to pick up the work without re-litigating the metaphysics.