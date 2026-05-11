var DEFAULT_SPEC = {
  "yearRange": [1880, 2060],
  "worlds": [
    { "id": "eva", "label": "Eva", "color": "#D4537E", "row": 0 },
    { "id": "adam", "label": "Adam", "color": "#378ADD", "row": 1 },
    { "id": "origin", "label": "Origin", "color": "#888780", "row": 2, "weight": 2, "endYear": 1986 },
    { "id": "paradise", "label": "Paradise", "color": "#1D9E75", "row": 3, "divergeFrom": { "world": "origin", "year": 1971 } }
  ],
  "intersections": [
    { "year": 1986, "worlds": ["adam", "eva", "origin"], "label": "Tannhaus Event" }
  ],
  "wormholes": [
    {
      "world": "adam", "anchor": 1986, "jumps": [1953, 2019], "side": "below",
      "window": { "open": "1986-06-21", "close": "1986-11-12" }
    },
    {
      "world": "eva", "anchor": 1986, "jumps": [2019, 2052], "side": "below",
      "window": { "open": "1986-06-21", "close": "1986-11-08" }
    },
    { "world": "origin", "anchor": 1986, "jumps": [1971], "side": "above" }
  ],
  "segments": [
    { "world": "adam", "from": 1888, "to": 1921, "label": "Sic Mundus Era" },
    { "world": "adam", "from": 2020, "to": 2053, "label": "Post-Apocalypse Era" },
    { "world": "eva", "from": 2020, "to": 2052, "label": "Erit Lux Era" }
  ],
  "welds": [
    { "from": { "world": "adam", "year": 2020 }, "to": { "world": "eva", "year": 2020 }, "label": "Apocalypse" }
  ],
  "cycles": [
    { "year": 1888, "label": "-3" },
    { "year": 1921, "label": "-2" },
    { "year": 1953, "label": "-1" },
    { "year": 1986, "label": "0" },
    { "year": 2019, "label": "+1" },
    { "year": 2052, "label": "+2" }
  ],
  "nodes": [
    { "world": "adam", "year": 1921, "label": "Portal" },
    { "world": "adam", "year": 2053, "label": "Portal" }
  ],
  "markers": [
    { "world": "adam", "year": 1888, "label": "Sic Mundus founded" },
    { "world": "adam", "year": 1890, "label": "Silja meets Bartosz" },
    { "world": "adam", "year": 1904, "label": "Hanno is born" },
    { "world": "adam", "year": 1910, "label": "Agnes is born" },
    { "world": "adam", "year": 1911, "label": "Jonas becomes Adam" },
    { "world": "origin", "year": 1974, "label": "Tannhaus begins machine" },
    { "world": "adam", "year": 2040, "label": "Claudia stabilizes particle" },
    { "world": "adam", "year": 2052, "label": "(Bunker) Jonas arrives" },
    { "world": "paradise", "year": 2020, "label": "Paradise party" }
  ],
  "characters": [
    { "id": "jonas", "label": "Jonas", "color": "#A9D47D" },
    { "id": "martha", "label": "Mirror Martha", "color": "#A87DD4" }
  ],
  "travels": [
    {
      "character": "jonas", "clone": 0, "sequence": 0.1,
      "from": { "world": "adam", "year": 2003 },
      "to": { "world": "adam", "year": 2019 },
      "age": 16, "description": "Born and lives in Winden",
      "type": "normal"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 1,
      "from": { "world": "adam", "year": 2019 },
      "to": { "world": "adam", "year": 1986 },
      "age": 16, "description": "Follows clues through wormhole.  Discovers Mikkel",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 2,
      "from": { "world": "adam", "year": 1986 },
      "to": { "world": "adam", "year": 2019 },
      "age": 17, "description": "Returns home via the cave",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 3,
      "from": { "world": "adam", "year": 2019 },
      "to": { "world": "adam", "year": 1986 },
      "age": 17, "description": "Goes to save Mikkel",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 4,
      "from": { "world": "adam", "year": 1986 },
      "to": { "world": "adam", "year": 2052 },
      "age": 17, "description": "Gets sent through an unstable bunker portal when his older self tries to destroy the wormhole",
      "type": "bunker(1986)"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 4.1,
      "from": { "world": "adam", "year": 2052 },
      "to": { "world": "adam", "year": 2053 },
      "age": 17, "description": "Lives a few months in post-apocalypse and almost gets hanged by Elizabeth.",
      "type": "normal"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 5,
      "from": { "world": "adam", "year": 2053 },
      "to": { "world": "adam", "year": 1921 },
      "age": 17, "description": "Activates the future dark matter portal using stolen gas and enters",
      "type": "portal(2053)"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 6,
      "from": { "world": "adam", "year": 1921 },
      "to": { "world": "adam", "year": 2019 },
      "age": 17, "description": "Meets Adam in 1921.  As instructed, goes through portal to try and stop his father's suicide",
      "type": "portal(1921)"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 7,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "adam", "year": 1987 },
      "age": 18, "description": "Old Claudia stops him, and tells him he needs to meet young Claudia in her house in 1987",
      "type": "portable(clockwork)"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 8,
      "from": { "world": "adam", "year": 1987 },
      "to": { "world": "adam", "year": 2020 },
      "age": 18, "description": "With Claudia, uses the time machine to re-activate the wormhole. Later witnesses Martha killed by Adam, then gets cloned by Erit Lux",
      "type": "portable(clockwork)"
    },
    {
      "character": "jonas", "clone": 1, "sequence": 9,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "eva", "year": 2019 },
      "age": 18, "description": "Travels with Mirror Martha to Eva's world.  Meets Eva and learns about Erit Lux",
      "type": "portable(orb)"
    },
    {
      "character": "jonas", "clone": 1, "sequence": 10,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "eva", "year": 2052 },
      "age": 18, "description": "Uses wormhole to travel with Mirror Martha and meets her future self",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 1, "sequence": 11,
      "from": { "world": "eva", "year": 2052 },
      "to": { "world": "eva", "year": 2019 },
      "age": 18, "description": "Travels back, conceives The Origin and then is killed by Mirror Martha's clone",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 8.5,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "adam", "year": 2052 },
      "age": 49, "description": "Lives for 33 years, working with Claudia, Hanno and Elizabeth to open the portal.",
      "type": "normal"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 9,
      "from": { "world": "adam", "year": 2052 },
      "to": { "world": "adam", "year": 2019 },
      "age": 49, "description": "Now older, returns via the functioning portal to 2019 and bootstraps young Jonas' knowledge of the wormhole",
      "type": "portal(2053)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 10,
      "from": { "world": "adam", "year": 2019 },
      "to": { "world": "adam", "year": 1986 },
      "age": 49, "description": "Uses the wormhole to give Tannhaus Claudia's broken time machine",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 11,
      "from": { "world": "adam", "year": 1986 },
      "to": { "world": "adam", "year": 2019 },
      "age": 49, "description": "Travels back to 2019 and steals cesium from the barrels in the truck",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 12,
      "from": { "world": "adam", "year": 2019 },
      "to": { "world": "adam", "year": 1986 },
      "age": 49, "description": "Returns to get his time machine from Tannhaus. Tannhaus gives him the original, and he tries to destroy the wormhole",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 13,
      "from": { "world": "adam", "year": 1986 },
      "to": { "world": "adam", "year": 2019 },
      "age": 49, "description": "Realizing he failed, goes to visit Hannah and await The Apocalypse to save Martha from Adam",
      "type": "portable(clockwork)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 14,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "adam", "year": 1987 },
      "age": 49, "description": "Shows Hannah that she actually fell in love with Mikkel in 1987",
      "type": "portable(clockwork)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 15,
      "from": { "world": "adam", "year": 1987 },
      "to": { "world": "adam", "year": 2020 },
      "age": 49, "description": "After returning to 2020, Hannah steals the time machine to save Ulrich",
      "type": "portable(clockwork)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 16,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "adam", "year": 1888 },
      "age": 49, "description": "Using the Bartosz era time machine, flees The Apocalypse with Bartosz, Magnus and Franziska",
      "type": "portable(clockwork)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 16.5,
      "from": { "world": "adam", "year": 1888 },
      "to": { "world": "adam", "year": 1921 },
      "age": 82, "description": "With his time machine broken, lives for 33 years establishing Sic Mundus and building a new portal",
      "type": "normal"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 17,
      "from": { "world": "adam", "year": 1921 },
      "to": { "world": "adam", "year": 2020 },
      "age": 82, "description": "Now called Adam, he goes through his portal to shoot Martha during The Apocalypse",
      "type": "portal(1921)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 18,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "adam", "year": 2053 },
      "age": 82, "description": "After killing Martha, goes to orchestrate the cycle operations, likely with a portable orb?",
      "type": "portable(orb)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 19,
      "from": { "world": "adam", "year": 2053 },
      "to": { "world": "eva", "year": 2052 },
      "age": 82, "description": "Upon realizing his plan to kill The Origin failed, travels to Erit Lux and kills Eva.",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 0, "sequence": 0.1,
      "from": { "world": "eva", "year": 2003 },
      "to": { "world": "eva", "year": 2019 },
      "age": 16, "description": "Born and lives in Mirror Winden",
      "type": "normal"
    },
    {
      "character": "martha", "clone": 0, "sequence": 1,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "eva", "year": 2052 },
      "age": 16, "description": "Meets Jonas and goes through the wormhole, meeting future Martha",
      "type": "wormhole"
    },
    {
      "character": "martha", "clone": 0, "sequence": 2,
      "from": { "world": "eva", "year": 2052 },
      "to": { "world": "eva", "year": 2019 },
      "age": 16, "description": "Returns and conceives The Origin",
      "type": "wormhole"
    },
    {
      "character": "martha", "clone": 0, "sequence": 3,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "adam", "year": 2020 },
      "age": 16, "description": "Under orders from elderly Magnus and Fransicza, goes to save Jonas, but is secretly cloned by Eva in the Apocalypse",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 1, "sequence": 3,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "eva", "year": 2019 },
      "age": 16, "description": "Saves Jonas from The Apocalypse and takes him to her world",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 1, "sequence": 4,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "adam", "year": 1888 },
      "age": 16, "description": "Under orders from Sic Mundus, goes to the Tannhaus residence. Gives middle aged Jonas the dark matter that makes the future 1921 portal",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 1, "sequence": 5,
      "from": { "world": "adam", "year": 1888 },
      "to": { "world": "adam", "year": 2053 },
      "age": 16, "description": "Goes to the 2053 Sic Mundus base. Is captured and later killed by Adam",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 2, "sequence": 3,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "eva", "year": 2019 },
      "age": 16, "description": "Is interrupted by Bartosz. They return to Erit Lux and she gets slashed by Eva. Is convinced by Eva to kill the cloned Jonas",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 2, "sequence": 4,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "eva", "year": 2052 },
      "age": 16, "description": "Travels to 2052.  Talks with the middle aged Martha and Eva. Writes a letter to Jonas. Later witnesses Eva dead and turns fully against Adam",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 2, "sequence": 5,
      "from": { "world": "eva", "year": 2052 },
      "to": { "world": "eva", "year": 2020 },
      "age": 49, "description": "Likely returns to post-apocalypse Winden while pregnant.",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 2, "sequence": 5.5,
      "from": { "world": "eva", "year": 2020 },
      "to": { "world": "eva", "year": 2052 },
      "age": 49, "description": "Lives 33 years.  Helps establish (possibly with older self) Erit Lux.  Later visits her younger self in the bunker and also witnesses her younger self write the letter to Jonas. Takes it",
      "type": "normal"
    },
    {
      "character": "martha", "clone": 2, "sequence": 6,
      "from": { "world": "eva", "year": 2052 },
      "to": { "world": "adam", "year": 1888 },
      "age": 49, "description": "Travels to the Tannhaus factory and drops off the letter for Jonas",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 2, "sequence": 7,
      "from": { "world": "adam", "year": 1993 },
      "to": { "world": "adam", "year": 1911 },
      "age": 82, "description": "Now in her 80s, fetches and takes Hannah and Silja to Adam's factory",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 2, "sequence": 8,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "eva", "year": 2019 },
      "age": 82, "description": "Approaches young Jonas fresh into the mirror world and takes him to Erit Lux. Convinces her younger self to kill Jonas.  Likely also coordinates The Erit Lux Apocalypse plans.",
      "type": "normal"
    },
    {
      "character": "martha", "clone": 2, "sequence": 9,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "eva", "year": 2052 },
      "age": 82, "description": "Explains quantum entanglement to her younger self. Is later found by Adam and shot.  She expects this due to witnessing as her younger self.",
      "type": "portable(orb)"
    }
  ]
};
