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
    { "world": "eva", "from": 2020, "to": 2052, "label": "Erit Lux Era?" }
  ],
  "welds": [
    { "from": { "world": "adam", "year": 2020 }, "to": { "world": "eva", "year": 2020 }, "label": "Apocalypse" },
    { "from": { "world": "eva", "year": 1971 }, "to": { "world": "origin", "year": 1971 }, "label": "Car Crash" }
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
    { "world": "eva", "year": 2053, "label": "Portal" },
    { "world": "adam", "year": 2053, "label": "Portal" }
  ],
  "markers": [
    { "world": "adam", "year": 1888, "label": "Sic Mundus founded" },
    { "world": "adam", "year": 1890, "label": "Silja meets Bartosz" },
    { "world": "adam", "year": 1904, "label": "Hanno is born" },
    { "world": "eva", "year": 1904, "label": "Hanno is born" },
    { "world": "adam", "year": 1910, "label": "Agnes is born" },
    { "world": "eva", "year": 1910, "label": "Agnes is born" },
    { "world": "adam", "year": 1911, "label": "Jonas kills Hannah, becomes Adam" },
    { "world": "eva", "year": 1941, "label": "Tronte Nielsen is born to Agnes and The Origin" },
    { "world": "adam", "year": 1941, "label": "Tronte Nielsen is born to Agnes and The Origin" },
    { "world": "eva", "year": 1954, "label": "Elderly Egon delivers Hannah to conceive Silja" },
    { "world": "adam", "year": 1954, "label": "Hannah travels to 1954 to save Ulrich.  Instead conceives Silja" },
    { "world": "eva", "year": 1971, "label": "Charlotte is delivered to Tannhaus, Ulrich Nielsen is born" },
    { "world": "adam", "year": 1971, "label": "Charlotte is delivered to Tannhaus, Ulrich Nielsen is born" },
    { "world": "eva", "year": 1973, "label": "Mads Nielson is born" },
    { "world": "adam", "year": 1973, "label": "Mads Nielson is born" },
    { "world": "eva", "year": 2001, "label": "Magnus Nielson is born" },
    { "world": "adam", "year": 2001, "label": "Magnus Nielson is born" },
    { "world": "eva", "year": 2003, "label": "Martha, Bartosz and Franziska are born" },
    { "world": "adam", "year": 2003, "label": "Martha, Bartosz, Jonas and Franziska are born" },
    { "world": "eva", "year": 2008, "label": "Mikkel Nielson is born" },
    { "world": "adam", "year": 2008, "label": "Mikkel Nielson is born" },
    { "world": "eva", "year": 2011, "label": "Elisabeth Döppler is born" },
    { "world": "adam", "year": 2011, "label": "Elisabeth Döppler is born" },
    { "world": "origin", "year": 1974, "label": "Tannhaus begins machine" },
    { "world": "eva", "year": 2019, "label": "Eva guides young Jonas (Clone 1) on his arrival and orchestrates his eventual demise" },
    { "world": "adam", "year": 2040, "label": "Claudia stabilizes the god particle" },
    { "world": "adam", "year": 2041, "label": "Charlotte is born and kidnapped by herself" },
    { "world": "eva", "year": 2041, "label": "Charlotte is born and kidnapped by herself" },
    { "world": "adam", "year": 2052, "label": "(Bunker) Jonas arrives" },    
    { "world": "eva", "year": 2052, "label": "Eva assembles and prepares Erit Lux to 'fill the gaps' in the knot" },
    { "world": "adam", "year": 2053, "label": "Claudia tells Tronte to go kill Regina" },
    { "world": "paradise", "year": 2020, "label": "Paradise party" }
  ],
  "characters": [
    { "id": "jonas", "label": "Jonas Kahnwald", "color": "#7DA9D4" },
    { "id": "martha", "label": "Martha Nielsen", "color": "#D47DA9" },
    { "id": "claudia", "label": "Claudia Tiedemann", "color": "#A9D47D" }
  ],
  "travels": [
    /* JONAS - CLONE 0 */
    {
      "character": "jonas", "clone": 0, "sequence": 0.1,
      "from": { "world": "adam", "year": 2003 },
      "to": { "world": "adam", "year": 2019 },
      "age": 16, "description": "Born and raised in Winden within Adam's world.",
      "type": "normal"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 1,
      "from": { "world": "adam", "year": 2019 },
      "to": { "world": "adam", "year": 1986 },
      "age": 16, "description": "Travels via cave wormhole to 1986. Discovers Mikkel is his father.",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 2,
      "from": { "world": "adam", "year": 1986 },
      "to": { "world": "adam", "year": 2019 },
      "age": 17, "description": "Returns via cave wormhole to 2019, shaken by his discovery.",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 3,
      "from": { "world": "adam", "year": 2019 },
      "to": { "world": "adam", "year": 1986 },
      "age": 17, "description": "Travels via cave wormhole to 1986. Captured by Helge and Noah.",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 4,
      "from": { "world": "adam", "year": 1986 },
      "to": { "world": "adam", "year": 2052 },
      "age": 17, "description": "Propelled via bunker rift to 2052 after the Stranger activates the clockwork device.",
      "type": "bunker(1986)"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 4.1,
      "from": { "world": "adam", "year": 2052 },
      "to": { "world": "adam", "year": 2053 },
      "age": 17, "description": "Survives the post-apocalypse. Captured and nearly executed by Elisabeth's group.",
      "type": "normal"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 5,
      "from": { "world": "adam", "year": 2053 },
      "to": { "world": "adam", "year": 1921 },
      "age": 17, "description": "Travels via God Particle to 1921. Meets his older self, Adam, at Sic Mundus.",
      "type": "portal(2053)"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 6,
      "from": { "world": "adam", "year": 1921 },
      "to": { "world": "adam", "year": 2019 },
      "age": 17, "description": "Travels via God Particle to 2019. Attempts to prevent Michael's suicide but causes it.",
      "type": "portal(1921)"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 7,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "adam", "year": 1987 },
      "age": 18, "description": "Travels via gold orb to 1987. Meets young Claudia to obtain the clockwork device.",
      "type": "portable(orb)"
    },
    {
      "character": "jonas", "clone": 0, "sequence": 8,
      "from": { "world": "adam", "year": 1987 },
      "to": { "world": "adam", "year": 2020 },
      "age": 18, "description": "Travels via clockwork machine to 2020. Witnesses Martha's death as the world fractures.",
      "type": "portable(clockwork)"
    },

    /* JONAS - CLONE 1 */
    {
      "character": "jonas", "clone": 1, "sequence": 9,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "eva", "year": 2019 },
      "age": 18, "description": "Travels via gold orb to Eva's world. Rescued from the Apocalypse by Mirror Martha.",
      "type": "portable(orb)"
    },
    {
      "character": "jonas", "clone": 1, "sequence": 10,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "eva", "year": 2052 },
      "age": 18, "description": "Travels via cave wormhole to 2052. Meets Eva to learn the nature of her world.",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 1, "sequence": 11,
      "from": { "world": "eva", "year": 2052 },
      "to": { "world": "eva", "year": 2019 },
      "age": 18, "description": "Travels via cave wormhole to 2019. Conceives the Unknown and is killed by Mirror Martha.",
      "type": "wormhole"
    },

    /* JONAS - CLONE 2 (THE STRANGER / ADAM) */
    {
      "character": "jonas", "clone": 2, "sequence": 8.5,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "adam", "year": 2052 },
      "age": 18, "description": "Ages 33 years in the post-apocalypse, working with Claudia to stabilize the God Particle.",
      "type": "normal"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 9,
      "from": { "world": "adam", "year": 2052 },
      "to": { "world": "adam", "year": 2019 },
      "age": 49, "description": "Travels via God Particle to 2019. Delivers the lamp and map to his younger self.",
      "type": "portal(2053)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 10,
      "from": { "world": "adam", "year": 2019 },
      "to": { "world": "adam", "year": 1986 },
      "age": 49, "description": "Travels via cave wormhole to 1986. Delivers the broken time machine to Tannhaus.",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 11,
      "from": { "world": "adam", "year": 1986 },
      "to": { "world": "adam", "year": 2019 },
      "age": 49, "description": "Travels via cave wormhole to 2019. Obtains cesium from the nuclear power plant barrels.",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 12,
      "from": { "world": "adam", "year": 2019 },
      "to": { "world": "adam", "year": 1986 },
      "age": 49, "description": "Attempts to destroy the wormhole via clockwork machine in 1986. Fails to break the cycle.",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 13,
      "from": { "world": "adam", "year": 1986 },
      "to": { "world": "adam", "year": 2019 },
      "age": 49, "description": "Travels via clockwork machine to 2019. Visits Hannah before the Apocalypse.",
      "type": "portable(clockwork)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 14,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "adam", "year": 1987 },
      "age": 49, "description": "Travels via clockwork machine to 1987. Shows Hannah the truth about young Mikkel.",
      "type": "portable(clockwork)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 15,
      "from": { "world": "adam", "year": 1987 },
      "to": { "world": "adam", "year": 2020 },
      "age": 49, "description": "Travels via clockwork machine to 2020. Stranded after Hannah steals the device.",
      "type": "portable(clockwork)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 16,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "adam", "year": 1888 },
      "age": 49, "description": "Travels via clockwork machine to 1888. Escapes the Apocalypse with the teenagers.",
      "type": "portable(clockwork)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 16.5,
      "from": { "world": "adam", "year": 1888 },
      "to": { "world": "adam", "year": 1921 },
      "age": 49, "description": "Ages 33 years in the past. Founds Sic Mundus and builds the God Particle portal.",
      "type": "normal"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 17,
      "from": { "world": "adam", "year": 1921 },
      "to": { "world": "adam", "year": 2020 },
      "age": 82, "description": "Travels via God Particle to 2020. Shoots Martha to ensure the cycle continues.",
      "type": "portal(1921)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 18,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "adam", "year": 2053 },
      "age": 82, "description": "Travels via gold orb to 2053. Oversees the final stages of the Sic Mundus plan.",
      "type": "portable(orb)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 19,
      "from": { "world": "adam", "year": 2053 },
      "to": { "world": "adam", "year": 2019 },
      "age": 82, "description": "Travels via gold orb to 2019. Clones Jonas during the Apocalypse loophole.",
      "type": "portable(orb)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 19,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "eva", "year": 2019 },
      "age": 82, "description": "Travels via gold orb to Eva's world just before her Apocalypse.",
      "type": "portable(orb)"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 19,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "eva", "year": 2052 },
      "age": 82, "description": "Travels via cave wormhole to 2052. Destroys the Eva/Adam portrait at Erit Lux.",
      "type": "wormhole"
    },
    {
      "character": "jonas", "clone": 2, "sequence": 19,
      "from": { "world": "eva", "year": 2052 },
      "to": { "world": "eva", "year": 2053 },
      "age": 82, "description": "Travels via God Particle to 2053. Confronts Eva and reveals Claudia's loophole.",
      "type": "portal(2053)"
    },

    /* JONAS - CLONE 3 (THE LOOPHOLE) */
    {
      "character": "jonas", "clone": 3, "sequence": 0,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "eva", "year": 2019 },
      "age": 18, "description": "Travels via gold orb to Eva's world. Accompanies Adam to intercept Martha.",
      "type": "portable(orb)"
    },
    {
      "character": "jonas", "clone": 3, "sequence": 1,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "eva", "year": 1986 },
      "age": 18, "description": "Travels via gold orb to 1986. Prepares to cross into the Origin world.",
      "type": "portable(orb)"
    },
    {
      "character": "jonas", "clone": 3, "sequence": 2,
      "from": { "world": "eva", "year": 1986 },
      "to": { "world": "origin", "year": 1971 },
      "age": 18, "description": "Travels via gold orb to Origin 1971. Prevents the car crash, dissolving the Knot.",
      "type": "portable(orb)"
    },

    /* MARTHA - CLONE 0 */
    {
      "character": "martha", "clone": 0, "sequence": 0.1,
      "from": { "world": "eva", "year": 2003 },
      "to": { "world": "eva", "year": 2019 },
      "age": 16, "description": "Born and raised in the Mirror Winden within Eva's world.",
      "type": "normal"
    },
    {
      "character": "martha", "clone": 0, "sequence": 1,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "eva", "year": 2052 },
      "age": 16, "description": "Travels via cave wormhole to 2052. Meets her older self for the first time.",
      "type": "wormhole"
    },
    {
      "character": "martha", "clone": 0, "sequence": 2,
      "from": { "world": "eva", "year": 2052 },
      "to": { "world": "eva", "year": 2019 },
      "age": 16, "description": "Travels via cave wormhole to 2019. Conceives the Unknown and witnesses Jonas' death.",
      "type": "wormhole"
    },
    {
      "character": "martha", "clone": 0, "sequence": 3,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "adam", "year": 2020 },
      "age": 16, "description": "Travels via gold orb to Adam's world. Sent by Magnus and Franziska to rescue Jonas.",
      "type": "portable(orb)"
    },

    /* MARTHA - CLONE 1 */
    {
      "character": "martha", "clone": 1, "sequence": 3,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "eva", "year": 2019 },
      "age": 16, "description": "Travels via gold orb to Eva's world. Successfully rescues Jonas from the Apocalypse.",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 1, "sequence": 4,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "adam", "year": 1888 },
      "age": 16, "description": "Travels via gold orb to 1888. Delivers the dark matter orb to the Stranger.",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 1, "sequence": 5,
      "from": { "world": "adam", "year": 1888 },
      "to": { "world": "adam", "year": 2053 },
      "age": 16, "description": "Travels via gold orb to 2053. Captured and executed by Adam for his final goal.",
      "type": "portable(orb)"
    },

    /* MARTHA - CLONE 2 (MIDDLE / EVA) */
    {
      "character": "martha", "clone": 2, "sequence": 3,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "eva", "year": 2019 },
      "age": 16, "description": "Travels via gold orb to Eva's world. Intercepted by Bartosz and scarred by Eva.",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 2, "sequence": 4,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "eva", "year": 2052 },
      "age": 16, "description": "Travels via gold orb to 2052. Begins her transformation into the leader of Erit Lux.",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 2, "sequence": 5,
      "from": { "world": "eva", "year": 2020 },
      "to": { "world": "eva", "year": 2052 },
      "age": 49, "description": "Ages 33 years while raising the Unknown and maintaining the Mirror Knot.",
      "type": "normal"
    },
    {
      "character": "martha", "clone": 2, "sequence": 6,
      "from": { "world": "eva", "year": 2052 },
      "to": { "world": "adam", "year": 1888 },
      "age": 49, "description": "Travels via gold orb to 1888. Leaves the letter and stopwatch for Jonas.",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 2, "sequence": 7,
      "from": { "world": "adam", "year": 1993 },
      "to": { "world": "adam", "year": 1911 },
      "age": 82, "description": "Travels via gold orb to 1911 as Eva. Brings Hannah and Silja back to Sic Mundus.",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 2, "sequence": 9,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "eva", "year": 2052 },
      "age": 82, "description": "Travels via gold orb to 2052. Finalizes her plans before her meeting with Adam.",
      "type": "portable(orb)"
    },

    /* MARTHA - CLONE 3 (LOOPHOLE) */
    {
      "character": "martha", "clone": 3, "sequence": 0,
      "from": { "world": "eva", "year": 2019 },
      "to": { "world": "eva", "year": 1986 },
      "age": 16, "description": "Travels via gold orb to 1986. Cloned by Jonas to prevent the car crash.",
      "type": "portable(orb)"
    },
    {
      "character": "martha", "clone": 3, "sequence": 1,
      "from": { "world": "eva", "year": 1986 },
      "to": { "world": "origin", "year": 1971 },
      "age": 16, "description": "Travels via gold orb to Origin 1971. Saves Tannhaus' family to erase the Knot.",
      "type": "portable(orb)"
    },

    /* CLAUDIA */
    {
      "character": "claudia", "clone": 0, "sequence": 0,
      "from": { "world": "adam", "year": 1942 },
      "to": { "world": "adam", "year": 1987 },
      "age": 45, "description": "Ages naturally from 1942. Becomes the director of the power plant in 1986.",
      "type": "normal"
    },
    {
      "character": "claudia", "clone": 0, "sequence": 1,
      "from": { "world": "adam", "year": 1987 },
      "to": { "world": "adam", "year": 2020 },
      "age": 45, "description": "Travels via clockwork machine to 2020. Discovers Regina's illness and Egon's death.",
      "type": "portable(clockwork)"
    },
    {
      "character": "claudia", "clone": 0, "sequence": 2,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "adam", "year": 1987 },
      "age": 45, "description": "Travels via clockwork machine to 1987. Accidentally causes Egon's death while trying to save him.",
      "type": "portable(clockwork)"
    },
    {
      "character": "claudia", "clone": 0, "sequence": 2.5,
      "from": { "world": "adam", "year": 1987 },
      "to": { "world": "adam", "year": 2020 },
      "age": 45, "description": "Travels via clockwork machine to 2020. Accompanies Jonas to activate the wormhole.",
      "type": "portable(clockwork)"
    },
    {
      "character": "claudia", "clone": 0, "sequence": 3,
      "from": { "world": "adam", "year": 2020 },
      "to": { "world": "adam", "year": 2040 },
      "age": 45, "description": "Ages 20 years in the post-apocalypse. Works to stabilize the God Particle.",
      "type": "normal"
    },
    {
      "character": "claudia", "clone": 0, "sequence": 4,
      "from": { "world": "adam", "year": 2040 },
      "to": { "world": "eva", "year": 2040 },
      "age": 65, "description": "Travels via gold orb to Eva's world. Kills her alternate self to become a double agent.",
      "type": "portable(orb)"
    },
    {
      "character": "claudia", "clone": 0, "sequence": 5,
      "from": { "world": "adam", "year": 2040 },
      "to": { "world": "adam", "year": 2053 },
      "age": 45, "description": "Ages naturally to 2053. Manipulates Tronte and prepares for her meeting with Adam.",
      "type": "normal"
    },
    {
      "character": "claudia", "clone": 0, "sequence": 6,
      "from": { "world": "adam", "year": 2053 },
      "to": { "world": "adam", "year": 2019 },
      "age": 78, "description": "Travels via gold orb to 2019. Guides Jonas and orchestrates Mikkel's disappearance.",
      "type": "portable(orb)"
    },
    {
      "character": "claudia", "clone": 0, "sequence": 7,
      "from": { "world": "adam", "year": 2019 },
      "to": { "world": "adam", "year": 1953 },
      "age": 78, "description": "Travels via clockwork machine to 1953. Delivers blueprints to Tannhaus for the device.",
      "type": "portable(clockwork)"
    },
    {
      "character": "claudia", "clone": 0, "sequence": 8,
      "from": { "world": "adam", "year": 1953 },
      "to": { "world": "adam", "year": 1986 },
      "age": 78, "description": "Travels via clockwork machine to 1986. Initiates her younger self into the conspiracy.",
      "type": "portable(clockwork)"
    },
    {
      "character": "claudia", "clone": 0, "sequence": 9,
      "from": { "world": "adam", "year": 1987 },
      "to": { "world": "adam", "year": 1954 },
      "age": 78, "description": "Travels via clockwork machine to 1954. Buries the device for her younger self and accepts her death.",
      "type": "portable(clockwork)"
    }
  ]
};