/**
 * Mega-Lo-Mania Complete Codex: Epochs, Islands, Passwords, Tech Tree & Tactics
 */

export const GAME_CODEX = {
  epochs: [
    {
      id: 1,
      era: "28,000 BC",
      name: "The Stone Age",
      description: "Primitive beginnings. Rocks, sticks, and bare bone survival.",
      inventions: [
        { name: "Stick / Club", type: "Offense", men: 1, desc: "Basic melee weapon for your tribesmen" },
        { name: "Rock / Stone", type: "Defense", men: 2, desc: "Thrown from the tower parapets at attackers" },
        { name: "Wooden Shield", type: "Defense", men: 2, desc: "Reduces incoming projectile damage" }
      ],
      islands: [
        { name: "Aloha", password: "JOE", sectors: 2, difficulty: "Easy", desc: "Tutorial island. Perfect to learn resource gathering." },
        { name: "Bazook", password: "LIZ", sectors: 3, difficulty: "Easy", desc: "Two opposing islands separated by a small gorge." },
        { name: "Crapht", password: "JON", sectors: 3, difficulty: "Medium", desc: "Abundant wood resources. Build defenses early." }
      ]
    },
    {
      id: 2,
      era: "9,500 BC",
      name: "The Prehistoric Age",
      description: "Spears and slings emerge. Fortifications begin to matter.",
      inventions: [
        { name: "Spear", type: "Offense", men: 3, desc: "Piercing melee weapon with medium range" },
        { name: "Slingshot", type: "Offense", men: 4, desc: "Light ranged attack unit" },
        { name: "Stone Wall", type: "Defense", men: 4, desc: "Strengthens sector sector defenses" }
      ],
      islands: [
        { name: "Diemo", password: "MAX", sectors: 3, difficulty: "Easy", desc: "Plentiful stone deposits to fortify your perimeter." },
        { name: "Ercan", password: "GUY", sectors: 4, difficulty: "Medium", desc: "Multi-sector map requiring early expansion." },
        { name: "Falsh", password: "ZOO", sectors: 4, difficulty: "Hard", desc: "Aggressive CPU gods quickly contest central sector." }
      ]
    },
    {
      id: 3,
      era: "3,000 BC",
      name: "The Bronze Age",
      description: "Archery, shields, and organized military tactics.",
      inventions: [
        { name: "Bow & Arrow", type: "Offense", men: 5, desc: "Fast ranged infantry effective from towers" },
        { name: "Chariot", type: "Offense", men: 6, desc: "Fast moving assault platform" },
        { name: "Bronze Shield", type: "Defense", men: 5, desc: "Upgraded shield against arrows and stones" }
      ],
      islands: [
        { name: "Gyges", password: "BOB", sectors: 3, difficulty: "Medium", desc: "Island rich in copper and tin." },
        { name: "Helat", password: "RAY", sectors: 4, difficulty: "Medium", desc: "Narrow passes make defensive archers deadly." },
        { name: "Igloo", password: "IAN", sectors: 4, difficulty: "Hard", desc: "Harsh terrain with scarce initial minerals." }
      ]
    },
    {
      id: 4,
      era: "100 BC",
      name: "The Classical Iron Age",
      description: "Crossbows, early siege weaponry, and boiling oil defenses.",
      inventions: [
        { name: "Crossbow", type: "Offense", men: 6, desc: "High-damage armor-piercing projectile unit" },
        { name: "Knight", type: "Offense", men: 8, desc: "Heavy armored cavalry" },
        { name: "Boiling Oil", type: "Defense", men: 6, desc: "Poured on enemy armies breaching your gates" }
      ],
      islands: [
        { name: "Jupit", password: "DAN", sectors: 3, difficulty: "Medium", desc: "Classic Roman theater of war." },
        { name: "Kafir", password: "RON", sectors: 4, difficulty: "Hard", desc: "Enemy mounts early cavalry raids." },
        { name: "Loria", password: "SAM", sectors: 4, difficulty: "Hard", desc: "Treacherous mountain sector." }
      ]
    },
    {
      id: 5,
      era: "900 AD",
      name: "The Middle Ages",
      description: "Massive castles, pikes, and powerful trebuchets.",
      inventions: [
        { name: "Pike", type: "Offense", men: 8, desc: "Long spears devastating against cavalry" },
        { name: "Catapult", type: "Siege", men: 10, desc: "Siege engine designed to level enemy towers" },
        { name: "Castle Keep", type: "Defense", men: 8, desc: "Reinforced stone stronghold" }
      ],
      islands: [
        { name: "Moron", password: "BEN", sectors: 3, difficulty: "Medium", desc: "Rich minerals allow rapid weapon research." },
        { name: "Nicos", password: "TIM", sectors: 4, difficulty: "Hard", desc: "Heavy fortifications on all sides." },
        { name: "Oman", password: "NED", sectors: 4, difficulty: "Hard", desc: "Strategic choke points between sectors." }
      ]
    },
    {
      id: 6,
      era: "1400 AD",
      name: "The Renaissance",
      description: "Gunpowder arrives. Cannons, muskets, and longbowmen.",
      inventions: [
        { name: "Musket", type: "Offense", men: 10, desc: "Deadly early firearm infantry" },
        { name: "Cannon", type: "Siege", men: 12, desc: "Heavy gunpowder artillery capable of obliterating walls" },
        { name: "Longbow", type: "Offense", men: 9, desc: "Mass volley weapon with extreme range" }
      ],
      islands: [
        { name: "Paris", password: "KEN", sectors: 3, difficulty: "Hard", desc: "Aggressive gunpowder arms race." },
        { name: "Q-Dos", password: "DON", sectors: 4, difficulty: "Hard", desc: "Expansive sectors with hidden mineral deposits." },
        { name: "Rapan", password: "JIM", sectors: 4, difficulty: "Very Hard", desc: "All 3 enemy gods spawn in close proximity." }
      ]
    },
    {
      id: 7,
      era: "1850 AD",
      name: "The Industrial Revolution",
      description: "Rifles, ironclads, machine guns, and aerial biplanes.",
      inventions: [
        { name: "Rifle", type: "Offense", men: 12, desc: "Rapid fire rifled infantry" },
        { name: "Biplane", type: "Air", men: 14, desc: "First combat aircraft for bombing enemy sectors" },
        { name: "Machine Gun", type: "Defense", men: 12, desc: "Mows down ground assaults in seconds" }
      ],
      islands: [
        { name: "Sinus", password: "TOM", sectors: 3, difficulty: "Hard", desc: "Industrial center with heavy coal and iron." },
        { name: "Taran", password: "TED", sectors: 4, difficulty: "Very Hard", desc: "Air supremacy dictates the victor." },
        { name: "Umber", password: "LEE", sectors: 4, difficulty: "Very Hard", desc: "Continuous artillery and air strikes." }
      ]
    },
    {
      id: 8,
      era: "1915 AD",
      name: "The Modern Warfare Era",
      description: "Heavy tanks, monoplanes, and deadly long-range howitzers.",
      inventions: [
        { name: "Tank", type: "Offense", men: 15, desc: "Armored behemoth crushing ground troops" },
        { name: "Monoplane", type: "Air", men: 16, desc: "Advanced bomber plane with heavy payload" },
        { name: "Howitzer", type: "Siege", men: 14, desc: "Long range explosive shell artillery" }
      ],
      islands: [
        { name: "Vesta", password: "HAL", sectors: 3, difficulty: "Very Hard", desc: "Tanks dominate the open battlefield." },
        { name: "Wotan", password: "KIM", sectors: 4, difficulty: "Very Hard", desc: "Heavily defended industrial fortress." },
        { name: "Xyphi", password: "JAX", sectors: 4, difficulty: "Nightmare", desc: "Brutal multi-front warfare." }
      ]
    },
    {
      id: 9,
      era: "1980 AD",
      name: "The Jet & Missile Age",
      description: "Jet fighters, cruise missiles, and radar defense grids.",
      inventions: [
        { name: "Jet Fighter", type: "Air", men: 18, desc: "Supersonic combat aircraft" },
        { name: "Cruise Missile", type: "Offense", men: 20, desc: "Targeted precision missile strike" },
        { name: "SAM Battery", type: "Defense", men: 16, desc: "Anti-aircraft surface-to-air missile shield" }
      ],
      islands: [
        { name: "Y-Gha", password: "SID", sectors: 3, difficulty: "Nightmare", desc: "High tech war where seconds decide victory." },
        { name: "Z-Gog", password: "PIP", sectors: 4, difficulty: "Nightmare", desc: "Final test before the Mother Island." }
      ]
    },
    {
      id: 10,
      era: "2001+ AD",
      name: "The Space Age: Final Conflict",
      description: "Laser defense, nuclear warheads, and interstellar dominance.",
      inventions: [
        { name: "Nuclear Warhead", type: "Superweapon", men: 25, desc: "Obliterates entire enemy sector in an atomic fireball" },
        { name: "Laser Cannon", type: "Defense", men: 22, desc: "Instantly vaporizes incoming missiles and jets" },
        { name: "Spaceship", type: "Final", men: 30, desc: "The ultimate victory vessel of the cosmos" }
      ],
      islands: [
        { name: "The Mother Island", password: "WAR", sectors: 4, difficulty: "Ultimate God Battle", desc: "All 4 gods battle for supreme rule of the universe!" }
      ]
    }
  ],

  gods: [
    { name: "Scarlet", color: "#ef4444", icon: "🔴", style: "Aggressive", quote: "Blood will run red across every island!" },
    { name: "Caesar", color: "#10b981", icon: "🟢", style: "Balanced", quote: "Veni, vidi, vici. Order shall prevail." },
    { name: "Oberon", color: "#f59e0b", icon: "🟡", style: "Defensive", quote: "Impatience breeds defeat. We fortify first." },
    { name: "Madcap", color: "#3b82f6", icon: "🔵", style: "Chaos", quote: "Ergonomically terrific! Let the fireworks begin!" }
  ],

  tips: [
    "Always leave at least 1 person in your tower to reproduce and maintain population growth.",
    "Assign 4-5 people to Design early to quickly discover weapons and shields for your era.",
    "Place shields on your tower! Without shields, an enemy catapult can tear down your base in seconds.",
    "When you conquer an enemy sector, their remaining population joins your empire.",
    "In Mega-Lo-Mania, surplus men carry over to subsequent islands in the same epoch. Save troops!",
    "Nuclear bombs in Epoch 10 can vaporize any rival sector, but be careful not to trigger mutual destruction!"
  ]
};
