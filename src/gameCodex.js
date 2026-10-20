/**
 * Mega-Lo-Mania Complete Codex: Epochs, Real Sega Genesis Passwords, Tech Tree & Tactics
 * Verified for Sega Mega Drive / Genesis (Options -> Load screen, 11-letter codes).
 */

export const GAME_CODEX = {
  // Hidden arcade easter egg
  secretCodes: [
    {
      code: "JOOLS",
      title: "Secret Asteroids / Sinistar Arcade Game",
      desc: "Enter 'JOOLS' in Options -> Load to unlock a hidden 16-bit arcade space shooter mini-game!"
    }
  ],

  epochs: [
    {
      id: 1,
      era: "9,500 BC",
      name: "The Stone Age",
      milestone: "🪨 Surface Gathering",
      password: "SIZCSVLOPNL",
      passwordDesc: "Starts Epoch 1 with 200 Men",
      description: "Primitive survival. Weapons are crafted by hand from gathered stones and sticks.",
      proTip: "Keep at least 1–2 tribesmen idle in the tower! Population breeds only when idle men are present.",
      inventions: {
        offense: { name: "Rock", role: "Offense (Army)", desc: "Hurled by primitive assault warbands to raid sectors" },
        defense: { name: "Stick / Club", role: "Defense (Tower)", desc: "Stationed in tower parapets to beat back invaders" },
        shield: { name: "Wooden Shield", role: "Shield (Repair)", desc: "Manoeuvred to instantly repair damaged tower integrity" }
      },
      islands: [
        { name: "Aloha", sectors: 2, difficulty: "Easy", desc: "Tutorial island. Perfect to learn resource gathering." },
        { name: "Bazook", sectors: 3, difficulty: "Easy", desc: "Two opposing islands separated by a small gorge." },
        { name: "Crapht", sectors: 3, difficulty: "Medium", desc: "Abundant wood resources. Build defenses early." }
      ]
    },
    {
      id: 2,
      era: "3,000 BC",
      name: "Early Antiquity",
      milestone: "🎯 Early Siege Craft",
      password: "SMLCUQKDKHH",
      passwordDesc: "Starts Epoch 2 with 999 Men",
      altPassword: "ABDQCYXXSL",
      description: "Spears and small catapults emerge. Defensive walls begin to matter.",
      proTip: "Catapults tear down undefended towers fast. Design and craft shields early to survive raids!",
      inventions: {
        offense: { name: "Small Catapult", role: "Offense (Army)", desc: "First siege engine capable of breaking down enemy towers" },
        defense: { name: "Spear", role: "Defense (Tower)", desc: "Piercing defensive weapon deployed on tower parapets" },
        shield: { name: "Hard Wood Shield", role: "Shield (Repair)", desc: "Reinforced wooden shield for rapid building repairs" }
      },
      islands: [
        { name: "Diemo", sectors: 3, difficulty: "Easy", desc: "Plentiful stone deposits to fortify your perimeter." },
        { name: "Ercan", sectors: 4, difficulty: "Medium", desc: "Multi-sector map requiring early expansion." },
        { name: "Falsh", sectors: 4, difficulty: "Hard", desc: "Aggressive CPU gods quickly contest central sector." }
      ]
    },
    {
      id: 3,
      era: "100 BC",
      name: "Classical Iron Age",
      milestone: "⚔️ Formed Regiments",
      password: "WQICAUWQIBN",
      passwordDesc: "Starts Epoch 3 with 999 Men",
      description: "Pikes and shortbows form organized military tactics.",
      proTip: "Tower shortbows pick off attackers before they reach the gate. Surplus troops carry over to the next island!",
      inventions: {
        offense: { name: "Pike", role: "Offense (Army)", desc: "Heavy melee vanguard devastating against enemy infantry" },
        defense: { name: "Shortbow", role: "Defense (Tower)", desc: "Rapid archer volleys from parapets to shred advancing armies" },
        shield: { name: "Bronze Shield", role: "Shield (Repair)", desc: "Durable metallic shield to restore battered fortresses" }
      },
      islands: [
        { name: "Gyges", sectors: 3, difficulty: "Medium", desc: "Island rich in copper and tin." },
        { name: "Helat", sectors: 4, difficulty: "Medium", desc: "Narrow passes make defensive archers deadly." },
        { name: "Igloo", sectors: 4, difficulty: "Hard", desc: "Harsh terrain with scarce initial minerals." }
      ]
    },
    {
      id: 4,
      era: "900 AD",
      name: "The Middle Ages",
      milestone: "🏭 Factories Unlocked",
      password: "UVICOPEQIBJ",
      passwordDesc: "Starts Epoch 4 with 999 Men",
      altPassword: "UKBDIFXXSH",
      description: "Longbows, boiling oil, and the introduction of industrial manufacturing.",
      proTip: "FACTORIES UNLOCKED! You must construct a Factory to mass-produce weapons before armies can march.",
      inventions: {
        offense: { name: "Longbow", role: "Offense (Army)", desc: "Long-range massed archers that strike enemies from afar" },
        defense: { name: "Boiling Oil", role: "Defense (Tower)", desc: "Poured over doorways to incinerate breaching assault squads" },
        shield: { name: "Iron Shield", role: "Shield (Repair)", desc: "Forged iron plating providing high-yield tower repairs" }
      },
      islands: [
        { name: "Jupit", sectors: 3, difficulty: "Medium", desc: "Classic Roman theater of war." },
        { name: "Kafir", sectors: 4, difficulty: "Hard", desc: "Enemy mounts early cavalry raids." },
        { name: "Loria", sectors: 4, difficulty: "Hard", desc: "Treacherous mountain sector." }
      ]
    },
    {
      id: 5,
      era: "1400 AD",
      name: "The Renaissance",
      milestone: "🏰 Heavy Siege Era",
      password: "SAJCSPEFKHV",
      passwordDesc: "Starts Epoch 5 with 999 Men",
      description: "Giant siege engines and armor-piercing crossbow garrisons.",
      proTip: "Giant Catapults can level towers across long distances. Keep defensive crossbows fully manned.",
      inventions: {
        offense: { name: "Giant Catapult", role: "Offense (Army)", desc: "Colossal trebuchet capable of annihilating enemy towers" },
        defense: { name: "Crossbow", role: "Defense (Tower)", desc: "Armor-piercing mechanical bows targeting heavily armored units" },
        shield: { name: "Heavy Iron Shield", role: "Shield (Repair)", desc: "Massive iron bulwark to withstand heavy siege bombardment" }
      },
      islands: [
        { name: "Moron", sectors: 3, difficulty: "Medium", desc: "Rich minerals allow rapid weapon research." },
        { name: "Nicos", sectors: 4, difficulty: "Hard", desc: "Heavy fortifications on all sides." },
        { name: "Oman", sectors: 4, difficulty: "Hard", desc: "Strategic choke points between sectors." }
      ]
    },
    {
      id: 6,
      era: "1850 AD",
      name: "The Industrial Era",
      milestone: "💥 Gunpowder & Deep Mining",
      password: "QFJCKRKFKHR",
      passwordDesc: "Starts Epoch 6 with 999 Men",
      altPassword: "QUBDQYFJTAV",
      description: "Gunpowder arrives. Cannons, muskets, and deep mineral extraction.",
      proTip: "Deep mines are required to extract sulfur and iron. Stockpile cannons before launching assaults.",
      inventions: {
        offense: { name: "Cannon", role: "Offense (Army)", desc: "Heavy artillery that demolishes fortresses in quick volleys" },
        defense: { name: "Musket", role: "Defense (Tower)", desc: "Garrison riflemen firing lethal synchronized gunpowder volleys" },
        shield: { name: "Steel Shield", role: "Shield (Repair)", desc: "Heavy industrial steel sheets for rapid structural recovery" }
      },
      islands: [
        { name: "Paris", sectors: 3, difficulty: "Hard", desc: "Aggressive gunpowder arms race." },
        { name: "Q-Dos", sectors: 4, difficulty: "Hard", desc: "Expansive sectors with hidden mineral deposits." },
        { name: "Rapan", sectors: 4, difficulty: "Very Hard", desc: "All 3 enemy gods spawn in close proximity." }
      ]
    },
    {
      id: 7,
      era: "1915 AD",
      name: "World War I Era",
      milestone: "🔬 Laboratories & Aviation",
      password: "OKJCAQEGKHX",
      passwordDesc: "Starts Epoch 7 with 999 Men",
      description: "Laboratories, bi-planes, trench warfare, and devastating machine guns.",
      proTip: "LABORATORIES UNLOCKED! Build Bi-planes to bypass ground chokepoints and bomb enemy towers directly.",
      inventions: {
        offense: { name: "Bi-Plane", role: "Offense (Army)", desc: "Combat aircraft that flies over terrain to bomb enemy strongholds" },
        defense: { name: "Machine Gun", role: "Defense (Tower)", desc: "High-cadence turret that mows down infantry squads in seconds" },
        shield: { name: "Armored Steel Shield", role: "Shield (Repair)", desc: "Riveted armor plate for repairing bomb-damaged bases" }
      },
      islands: [
        { name: "Sinus", sectors: 3, difficulty: "Hard", desc: "Industrial center with heavy coal and iron." },
        { name: "Taran", sectors: 4, difficulty: "Very Hard", desc: "Air supremacy dictates the victor." },
        { name: "Umber", sectors: 4, difficulty: "Very Hard", desc: "Continuous artillery and air strikes." }
      ]
    },
    {
      id: 8,
      era: "1945 AD",
      name: "World War II Era",
      milestone: "🚀 Rocketry & Jets",
      password: "MPJCDWEGKHK",
      passwordDesc: "Starts Epoch 8 with 999 Men",
      altPassword: "MECDMAMYXCQ",
      description: "Jet fighters, anti-tank bazookas, and motorized mechanized warfare.",
      proTip: "Bazookas counter incoming siege artillery, while Jet Fighters dominate the battlefield skies.",
      inventions: {
        offense: { name: "Jet Fighter", role: "Offense (Army)", desc: "Supersonic strike aircraft with devastating aerial bombing payload" },
        defense: { name: "Bazooka", role: "Defense (Tower)", desc: "Rocket artillery station that obliterates heavy siege units" },
        shield: { name: "Reinforced Alloy Shield", role: "Shield (Repair)", desc: "Advanced metallurgical plating for rapid building restoration" }
      },
      islands: [
        { name: "Vesta", sectors: 3, difficulty: "Very Hard", desc: "Tanks dominate the open battlefield." },
        { name: "Wotan", sectors: 4, difficulty: "Very Hard", desc: "Heavily defended industrial fortress." },
        { name: "Xyphi", sectors: 4, difficulty: "Nightmare", desc: "Brutal multi-front warfare." }
      ]
    },
    {
      id: 9,
      era: "1980 AD",
      name: "The Cold War",
      milestone: "❄️ Cryo Bunkers & WMDs",
      password: "KUJCTYQVLNW",
      passwordDesc: "Starts Epoch 9 with 999 Men",
      altPassword: "EKFDECSBYS",
      description: "Nuclear missiles, early warning deterrent grids, and cryogenic freeze chambers.",
      proTip: "CRITICAL PRO TIP: Build Cryogenic Bunkers to freeze soldiers! Frozen men carry over to Epoch 10!",
      inventions: {
        offense: { name: "Nuclear Missile", role: "Offense (Army)", desc: "Obliterates an entire enemy sector in a catastrophic atomic blast" },
        defense: { name: "Nuclear Deterrent", role: "Defense (Tower)", desc: "Antimissile interceptor shield that neutralizes incoming warheads" },
        shield: { name: "Composite Shield", role: "Shield (Repair)", desc: "High-tech composite barrier for instant structural repair" }
      },
      islands: [
        { name: "Y-Gha", sectors: 3, difficulty: "Nightmare", desc: "High tech war where seconds decide victory." },
        { name: "Z-Gog", sectors: 4, difficulty: "Nightmare", desc: "Final test before the Mother Island." }
      ]
    },
    {
      id: 10,
      era: "2001+ AD",
      name: "Mother of All Battles",
      milestone: "👑 Supreme God Showdown",
      password: "IZJCJKXGKHD",
      passwordDesc: "Starts Final Battle with 999 Men",
      altPassword: "JJDDVBVJONH",
      description: "The final showdown! Star Wars lasers, flying saucers, and laser pistols.",
      proTip: "Standard building is disabled! Troops fight with Laser Pistols — your frozen troop pool determines victory!",
      inventions: {
        offense: { name: "Flying Saucer", role: "Offense (Army)", desc: "Futuristic UFO assault gunship armed with plasma cannons" },
        defense: { name: "Star Wars Lasers", role: "Defense (Tower)", desc: "Orbital SDI laser beam grid that vaporizes aerial intruders" },
        shield: { name: "Energy Shield", role: "Shield (Repair)", desc: "Pure plasma forcefield providing total structural regeneration" }
      },
      islands: [
        { name: "The Mother Island", sectors: 4, difficulty: "Ultimate God Battle", desc: "All 4 gods battle for supreme rule of the universe!" }
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
    "Always leave at least 1–2 people idle in your tower: population only breeds when idle people are present!",
    "Assign men to Design to invent weapons & shields. More men only increases research speed, it is NOT a required cost.",
    "Manufacture Shields: Whenever enemies attack your tower, manufactured shields immediately repair tower HP.",
    "From Epoch 4 (900 AD) onwards, you must build Factories to mass-produce weapons before equipping armies.",
    "In Epoch 9 (1980 AD), build Cryogenic Bunkers to freeze men — they will be thawed for the final Epoch 10 battle!",
    "Surplus men carry over between islands in the same epoch. Save manpower on early islands for harder ones!"
  ]
};
