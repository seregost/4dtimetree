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
    { "id": "jonas", "label": "Jonas Kahnwald", "color": "#A9D47D" },
    { "id": "martha", "label": "Martha Nielsen", "color": "#A87DD4" }
  ],
  "travels": [
    {
      "character": "jonas", "clone": 0, "sequence": 0.1,
      "from": { "world": "adam", "year": 2003 },
      "to": { "world": "adam", "year": 2019 },
      "age": 16, "description": "Born and grows up in Winden",
      "type": "normal"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 1,
      "from": { "world": "adam", "year": 2019 },
      "to": { "world": "adam", "year": 1986 },
      "age": 16, "description": "Passes through the cave wormhole for the first time. Finds Mikkel — and discovers he is his own father",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 2,
      "from": { "world": "adam", "year": 1986 },
      "to": { "world": "adam", "year": 2019 },
      "age": 17, "description": "Returns home through the cave wormhole, shaken by what he has learned",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 3,
      "from": { "world": "adam", "year": 2019 },
      "to": { "world": "adam", "year": 1986 },
      "age": 17, "description": "Returns to 1986 to retrieve Mikkel. Is captured by Helge and placed in the bunker, where the Stranger reveals his true identity",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 4,
      "from": { "world": "adam", "year": 1986 },
      "to": { "world": "adam", "year": 2052 },
      "age": 17, "description": "Caught in the bunker as the Stranger activates Claudia's device to destroy the wormhole. The discharge blasts him 66 years into the future",
      "type": "bunker(1986)"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 4.1,
      "from": { "world": "adam", "year": 2052 },
      "to": { "world": "adam", "year": 2053 },
      "age": 17, "description": "Survives in the post-apocalyptic wasteland. Is captured by Elizabeth and nearly hanged before being cut down",
      "type": "normal"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 5,
      "from": { "world": "adam", "year": 2053 },
      "to": { "world": "adam", "year": 1921 },
      "age": 17, "description": "Stabilizes the God Particle at the ruined power plant and steps through, arriving in 1921 Sic Mundus",
      "type": "portal(2053)"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 6,
      "from": { "world": "adam", "year": 1921 },
      "to": { "world": "adam", "year": 2019 },
      "age": 17, "description": "Meets Adam — his aged future self. Sent back through the portal to November 4, 2019 to witness his father Michael's suicide, which he cannot prevent",
      "type": "portal(1921)"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 7,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "adam", "year": 1987 },
      "age": 18, "description": "Intercepted by old Claudia, who directs him to meet young Claudia in 1987 to obtain the portable time machine",
      "type": "portable(orb)"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 8,
      "from": { "world": "adam", "year": 1987 },
      "to": { "world": "adam", "year": 2020 },
      "age": 18, "description": "Helps young Claudia understand the device, re-activating the cave wormhole. Returns to the Apocalypse; witnesses Martha shot by Adam. Eva fractures him into three simultaneous versions",
      "type": "portable(clockwork)"
    },
    {
      "character": "jonas", "clone": 1, "sequence": 9,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "eva", "year": 2019 },
      "age": 18, "description": "Rescued from the Apocalypse by Mirror Martha, who uses her orb to bring him to Erit Lux. Meets Eva (old Martha) for the first time",
      "type": "portable(orb)"
    },
    {
      "character": "jonas", "clone": 1, "sequence": 10,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "eva", "year": 2052 },
      "age": 18, "description": "Travels through the cave wormhole with Mirror Martha to meet her aged future self (Eva) in 2052",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 1, "sequence": 11,
      "from": { "world": "eva", "year": 2052 },
      "to": { "world": "eva", "year": 2019 },
      "age": 18, "description": "Returns to 2019 with Mirror Martha. They conceive The Unknown (The Origin). Is then killed by a second clone of Mirror Martha",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 8.5,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "adam", "year": 2052 },
      "age": 18, "description": "Lives 33 years in the post-apocalyptic future, working with Claudia, Hanno, and Elizabeth to stabilize the God Particle",
      "type": "normal"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 9,
      "from": { "world": "adam", "year": 2052 },
      "to": { "world": "adam", "year": 2019 },
      "age": 49, "description": "Returns to November 5, 2019 via the God Particle portal. Delivers the lamp and cave map to young Jonas, seeding his first journey",
      "type": "portal(2053)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 10,
      "from": { "world": "adam", "year": 2019 },
      "to": { "world": "adam", "year": 1986 },
      "age": 49, "description": "Uses the cave wormhole to deliver Claudia's broken time machine to Tannhaus in 1986",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 11,
      "from": { "world": "adam", "year": 1986 },
      "to": { "world": "adam", "year": 2019 },
      "age": 49, "description": "Returns to 2019 and steals the cesium from the yellow barrels at the nuclear plant",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 12,
      "from": { "world": "adam", "year": 2019 },
      "to": { "world": "adam", "year": 1986 },
      "age": 49, "description": "Returns to 1986 to collect the completed time machine from Tannhaus. Attempts to destroy the wormhole with it in the bunker — and fails",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 13,
      "from": { "world": "adam", "year": 1986 },
      "to": { "world": "adam", "year": 2019 },
      "age": 49, "description": "Returns knowing he failed. Visits Hannah to say goodbye, then waits for the Apocalypse intending to stop Adam from shooting Martha",
      "type": "portable(clockwork)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 14,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "adam", "year": 1987 },
      "age": 49, "description": "Takes Hannah to June 26, 1987, showing her the moments she fell for young Mikkel — forcing her to face the truth about their relationship",
      "type": "portable(clockwork)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 15,
      "from": { "world": "adam", "year": 1987 },
      "to": { "world": "adam", "year": 2020 },
      "age": 49, "description": "Returns to the Apocalypse on June 27, 2020. Hannah takes the time machine to find the imprisoned Ulrich in 1954, leaving Jonas stranded",
      "type": "portable(clockwork)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 16,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "adam", "year": 1888 },
      "age": 49, "description": "Flees the Apocalypse with Bartosz, Magnus, and Franziska using Bartosz's time machine. Arrives June 27, 1888",
      "type": "portable(clockwork)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 16.5,
      "from": { "world": "adam", "year": 1888 },
      "to": { "world": "adam", "year": 1921 },
      "age": 49, "description": "With the time machine broken, lives 33 years in 19th-century Winden. Founds Sic Mundus, recruits Bartosz, and builds the 1921 portal",
      "type": "normal"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 17,
      "from": { "world": "adam", "year": 1921 },
      "to": { "world": "adam", "year": 2020 },
      "age": 82, "description": "As Adam, steps through the 1921 portal to June 27, 2020, and shoots Martha at the moment of the Apocalypse",
      "type": "portal(1921)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 18,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "adam", "year": 2053 },
      "age": 82, "description": "Travels to the ruined power plant in 2053 to oversee operations and finalize his plan",
      "type": "portable(orb)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 19,
      "from": { "world": "adam", "year": 2053 },
      "to": { "world": "eva", "year": 2052 },
      "age": 82, "description": "Upon learning his plan to destroy The Unknown has failed, crosses into Erit Lux and kills Eva",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 0, "sequence": 0.1,
      "from": { "world": "eva", "year": 2003 },
      "to": { "world": "eva", "year": 2019 },
      "age": 16, "description": "Born and grows up in Mirror Winden",
      "type": "normal"
    },
    {
      "character": "martha", "clone": 0, "sequence": 1,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "eva", "year": 2052 },
      "age": 16, "description": "Passes through the cave wormhole alongside Jonas to Eva's 2052. Meets her aged future self — Eva — for the first time",
      "type": "wormhole"
    },
    {
      "character": "martha", "clone": 0, "sequence": 2,
      "from": { "world": "eva", "year": 2052 },
      "to": { "world": "eva", "year": 2019 },
      "age": 16, "description": "Returns to 2019 with Jonas. They conceive The Unknown (The Origin child) before Eva dispatches her to Adam's world",
      "type": "wormhole"
    },
    {
      "character": "martha", "clone": 0, "sequence": 3,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "adam", "year": 2020 },
      "age": 16, "description": "Crosses to Adam's 2020 on Apocalypse day, sent by elderly Magnus and Franziska. Eva fractures her into two divergent versions at the moment of the Apocalypse",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 1, "sequence": 3,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "eva", "year": 2019 },
      "age": 16, "description": "Appears at the Apocalypse and rescues Jonas using her orb. Brings him to Erit Lux in 2019",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 1, "sequence": 4,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "adam", "year": 1888 },
      "age": 16, "description": "Under Eva's orders, crosses to Adam's 1888 and delivers the dark matter orb to the Stranger (middle-aged Jonas) — the material that will form the 1921 portal",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 1, "sequence": 5,
      "from": { "world": "adam", "year": 1888 },
      "to": { "world": "adam", "year": 2053 },
      "age": 16, "description": "Arrives at the Sic Mundus compound in 2053. Is captured by Adam and eventually executed",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 2, "sequence": 3,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "eva", "year": 2019 },
      "age": 16, "description": "Appears at the Apocalypse but is intercepted by Bartosz before completing her mission. Returns to Erit Lux where Eva slashes her face and convinces her to kill Clone 1 Jonas",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 2, "sequence": 4,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "eva", "year": 2052 },
      "age": 16, "description": "Travels to Eva's 2052. Meets middle-aged Martha and Eva. Writes a letter to Jonas. Later witnesses Eva's death and turns fully against the cycle",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 2, "sequence": 5,
      "from": { "world": "eva", "year": 2052 },
      "to": { "world": "eva", "year": 2020 },
      "age": 49, "description": "Returns to post-apocalyptic Erit Lux in 2020 as middle-aged Martha. Begins her long role maintaining Eva's order",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 2, "sequence": 5.5,
      "from": { "world": "eva", "year": 2020 },
      "to": { "world": "eva", "year": 2052 },
      "age": 49, "description": "Lives 33 years in post-apocalyptic Erit Lux. Helps build Eva's inner circle. Witnesses her younger self in the bunker and intercepts the letter Jonas wrote to her",
      "type": "normal"
    },
    {
      "character": "martha", "clone": 2, "sequence": 6,
      "from": { "world": "eva", "year": 2052 },
      "to": { "world": "adam", "year": 1888 },
      "age": 49, "description": "Crosses to Adam's 1888 and leaves the letter for Jonas at the Tannhaus factory",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 2, "sequence": 7,
      "from": { "world": "adam", "year": 1993 },
      "to": { "world": "adam", "year": 1911 },
      "age": 82, "description": "As old Eva, travels to Adam's 1993 to collect Hannah and Silja, then brings them back to 1911 at Sic Mundus",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 2, "sequence": 8,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "eva", "year": 2019 },
      "age": 82, "description": "As old Eva, holds court in Erit Lux 2019. Guides young Jonas on his arrival and orchestrates her younger self's decision to kill Clone 1 Jonas",
      "type": "normal"
    },
    {
      "character": "martha", "clone": 2, "sequence": 9,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "eva", "year": 2052 },
      "age": 82, "description": "Travels to 2052 to meet her younger self and explain quantum entanglement. Is found and shot by Adam — a fate she has long known is coming",
      "type": "portable(orb)"
    }
  ]
};
