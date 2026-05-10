worlds: array of timelines. Each has id, label, color, row (vertical slot, 0=top).

yearRange: [startYear, endYear] defines the x-axis time span.

intersections: array of convergence points. Each has year and worlds (list of world ids that meet there). Worlds bend toward a shared y at this year.

caveStars: array of intra-world wormholes. Each has world, anchor (year), jumps (list of years).

welds: array of cross-world bridges. Each has from: {world, year}, to: {world, year}, optional label.

branches: array of new timelines that emerge from another. Each has fromWorld, fromYear, newWorld (id of the resulting world, must exist in worlds), and the new world's first year is set by its branch point.

markers: array of named events. Each has world, year, label, optional color.