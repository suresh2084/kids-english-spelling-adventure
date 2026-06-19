import { LucideIcon } from "lucide-react";

export const LEVELS = [
  { id: 1, title: "Level 1: Tiny Island", req: 3, age: "4-5" },
  { id: 2, title: "Level 2: Forest Path", req: 4, age: "5-6" },
  { id: 3, title: "Level 3: Magic Castle", req: 5, age: "6-7" },
  { id: 4, title: "Level 4: Dragon Peak", req: 6, age: "7-8" },
  { id: 5, title: "Level 5: Starry Space", req: 7, age: "8+" },
];

export const WORD_LISTS: Record<number, string[]> = {
  1: ["cat", "dog", "sun", "bus", "hat", "red", "run", "big", "sit", "hot", "cup", "map", "bag", "pan", "fan", "bed", "leg", "hen", "fly", "sky", "ant", "egg", "ice", "owl", "arm", "ear", "eye", "lip", "rib", "toe", "oak", "sea", "sky", "ink", "fin", "log", "mud", "net", "pea", "pod", "ram", "tin", "urn", "van", "web", "yam", "zip", "axe", "bay", "bun", "cob", "dam", "den", "dig", "dip", "dug", "fad", "fog", "fun", "gab", "gem", "get", "got", "gum", "gut", "hem", "hip", "hub", "hug", "hum", "hut", "ivy", "jab", "jag", "jam", "jot", "jug", "ken", "keg", "kid", "kin", "kit", "lad", "lap", "lid", "lip", "lot", "low", "lug", "mob", "mom", "mop", "nap", "nip", "nob", "nod", "nun", "nut"],
  2: ["fish", "tree", "milk", "book", "bird", "cake", "boat", "ball", "bell", "city", "coin", "cook", "corn", "dark", "dawn", "deer", "desk", "door", "draw", "drop", "drum", "duck", "dusk", "dust", "face", "farm", "flag", "frog", "game", "gate", "gift", "girl", "glad", "glow", "goat", "gold", "good", "gray", "grid", "grow", "gust", "hall", "hand", "hard", "harp", "hawk", "head", "heat", "heel", "high", "hill", "hint", "hole", "home", "hood", "hook", "hope", "horn", "hose", "hour", "huge", "hunt", "husk", "idle", "into", "iris", "isle", "jade", "jail", "jake", "jump", "keep", "kite", "knot", "lack", "lake", "lamb", "lamp", "land", "lane", "lark", "lash", "last", "late", "lawn", "lead", "lean", "leaf", "left", "lend", "lick", "lift"],
  3: ["apple", "tiger", "chair", "bread", "angel", "arrow", "beach", "berry", "black", "blade", "bland", "blank", "blast", "blaze", "blend", "bless", "blind", "block", "blood", "bloom", "blown", "board", "brave", "break", "brick", "bride", "brief", "brisk", "brook", "brown", "brush", "buddy", "build", "built", "burnt", "burst", "cabin", "candy", "carry", "catch", "cause", "cedar", "chain", "chalk", "charm", "chase", "cheap", "check", "cheek", "cheer", "chess", "chest", "chill", "china", "chimp", "choir", "chose", "chunk", "cider", "cinch", "clamp", "clang", "clash", "class", "clean", "clear", "cleft", "clerk", "click", "cliff", "climb", "cling", "clip", "clock", "close", "cloth", "cloud", "clown", "coast", "cobra", "cough", "count", "court", "cover", "crack", "craft", "crash", "cream", "creek", "crest", "crisp", "cross", "crowd", "crown", "crust", "curve"],
  4: ["banana", "castle", "dragon", "flower", "ground", "animal", "bamboo", "battle", "beauty", "before", "behind", "belong", "beside", "better", "blight", "bottle", "bounce", "bridge", "bright", "broken", "bronze", "bubble", "budget", "button", "cactus", "candle", "cannot", "carbon", "carpet", "carrot", "caught", "center", "chance", "change", "charge", "cheese", "cherry", "clever", "closet", "clouds", "cobalt", "coking", "collar", "combat", "coming", "copper", "corner", "cotton", "couple", "cousin", "create", "crispy", "crumbs", "cuddle", "dangle", "danger", "darken", "darted", "dazzle", "debate", "decent", "dental", "depend", "desert", "detail", "device", "dinner", "doctor", "donkey", "double", "doting", "duster", "eating", "effort", "elbow", "eldest", "empire", "engine", "engage", "entire", "escape"],
  5: ["amazing", "billion", "captain", "dancing", "diamond", "educate", "finding", "giraffe", "holiday", "imagine", "journey", "kitchen", "landing", "morning", "nightly", "october", "painting", "qualify", "reading", "singing", "tonight", "unusual", "village", "walking", "younger", "brought", "catches", "changed", "chapter", "chicken", "choices", "climber", "comfort", "company", "compare", "connect", "control", "cooking", "country", "covered", "crosses", "darkness", "daylight", "drawing", "dreamer", "driving", "dropped", "dynamic", "excited", "express", "factory", "falling", "fearful", "feeling", "fighter", "finally", "fishing", "foreign", "forever", "fortune", "founded", "freedom", "freshen", "friends", "frosted", "goodbye", "grandma", "greatly", "grocery", "growing", "halfway", "happens", "harvest"]
};

export const BADGES = [
  { id: "first_word", title: "First Word", desc: "Spelled your first word!" },
  { id: "10_correct", title: "10 Correct", desc: "Spelled 10 words correctly!" },
  { id: "50_correct", title: "50 Correct", desc: "Spelled 50 words correctly!" },
  { id: "level_master", title: "Level Master", desc: "Completed a full level!" },
  { id: "super_speller", title: "Super Speller", desc: "Completed all levels!" },
  { id: "daily_champion", title: "Daily Champion", desc: "Completed a Daily Challenge!" },
];

export const SHOP_ITEMS = [
  { id: "hat_crown", type: "hat", name: "Gold Crown", cost: 100 },
  { id: "hat_pirate", type: "hat", name: "Pirate Hat", cost: 150 },
  { id: "hat_wizard", type: "hat", name: "Wizard Hat", cost: 200 },
  { id: "hat_party", type: "hat", name: "Party Hat", cost: 50 },
  { id: "hat_space", type: "hat", name: "Space Helmet", cost: 250 },
  { id: "bg_space", type: "background", name: "Space Theme", cost: 300 },
  { id: "bg_ocean", type: "background", name: "Ocean Theme", cost: 300 },
  { id: "bg_jungle", type: "background", name: "Jungle Theme", cost: 300 },
  { id: "bg_candy", type: "background", name: "Candy Land", cost: 300 },
];
