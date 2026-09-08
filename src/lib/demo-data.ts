export type Market = {
  id: string;
  name: string;
  price: number;
  change: number;
  demand: number;
  distanceKm: number;
  transport: number;
  risk: "Low" | "Medium" | "High";
  net: number;
  angle: number; // position on the network ring
};

export type Buyer = {
  id: string;
  name: string;
  type: string;
  price: number;
  qty: number;
  reliability: number;
  net: number;
  available: boolean;
};

export const HARVEST = {
  crop: "Tomato",
  emoji: "🍅",
  quantity: 1000,
  location: "Udupi, Karnataka",
  grades: { A: 600, B: 300, C: 100 },
  storageDays: 2,
};

export const MARKETS: Market[] = [
  {
    id: "bengaluru",
    name: "Bengaluru",
    price: 32,
    change: 5.2,
    demand: 76,
    distanceKm: 355,
    transport: 6.4,
    risk: "High",
    net: 24.1,
    angle: -35,
  },
  {
    id: "mangaluru",
    name: "Mangaluru",
    price: 30,
    change: 6.2,
    demand: 84,
    distanceKm: 55,
    transport: 3.2,
    risk: "Low",
    net: 25.8,
    angle: 205,
  },
  {
    id: "udupi",
    name: "Udupi",
    price: 28,
    change: 2.1,
    demand: 61,
    distanceKm: 12,
    transport: 1.1,
    risk: "Low",
    net: 25.2,
    angle: 145,
  },
];

export const BUYERS: Buyer[] = [
  {
    id: "a",
    name: "Buyer A",
    type: "Wholesale · Hubballi",
    price: 29.5,
    qty: 250,
    reliability: 74,
    net: 24.6,
    available: true,
  },
  {
    id: "b",
    name: "Buyer B",
    type: "Premium retail chain",
    price: 34,
    qty: 300,
    reliability: 91,
    net: 30.4,
    available: true,
  },
  {
    id: "c",
    name: "Buyer C",
    type: "Processing unit",
    price: 31.5,
    qty: 300,
    reliability: 86,
    net: 28.2,
    available: true,
  },
  {
    id: "local",
    name: "Local Buyer",
    type: "Udupi mandi pickup",
    price: 26,
    qty: 200,
    reliability: 95,
    net: 25.1,
    available: true,
  },
];

export type Allocation = {
  id: string;
  qty: number;
  destination: string;
  when: string;
  net: number;
  tone: "primary" | "gold" | "teal" | "muted";
};

export const STRATEGIES = {
  safe: {
    id: "safe",
    label: "Safe",
    icon: "🛡️",
    earnings: 27900,
    risk: "Low",
    confidence: 91,
    spoilage: 2.4,
    blurb: "Keep everything close. Predictable money, minimal exposure.",
    allocations: [
      { id: "s1", qty: 400, destination: "Udupi", when: "Today", net: 25.2, tone: "primary" },
      { id: "s2", qty: 300, destination: "Local Buyer", when: "Today", net: 25.1, tone: "teal" },
      { id: "s3", qty: 300, destination: "Mangaluru", when: "Today", net: 25.8, tone: "gold" },
    ] as Allocation[],
  },
  balanced: {
    id: "balanced",
    label: "Balanced",
    icon: "⚖️",
    earnings: 29700,
    risk: "Medium",
    confidence: 82,
    spoilage: 3.8,
    blurb: "Split across price, buyer and proximity. Best overall outcome.",
    allocations: [
      { id: "b1", qty: 450, destination: "Mangaluru", when: "Today", net: 25.8, tone: "primary" },
      { id: "b2", qty: 300, destination: "Buyer B", when: "Today", net: 30.4, tone: "gold" },
      { id: "b3", qty: 150, destination: "Local Buyer", when: "Tomorrow", net: 25.1, tone: "teal" },
      { id: "b4", qty: 100, destination: "Hold", when: "Day 2", net: 27.5, tone: "muted" },
    ] as Allocation[],
  },
  aggressive: {
    id: "aggressive",
    label: "High Return",
    icon: "🚀",
    earnings: 30900,
    risk: "High",
    confidence: 64,
    spoilage: 5.6,
    blurb: "Chase the Bengaluru spread. Bigger upside, thinner safety net.",
    allocations: [
      { id: "a1", qty: 600, destination: "Bengaluru", when: "Today", net: 24.1, tone: "gold" },
      { id: "a2", qty: 300, destination: "Buyer B", when: "Today", net: 30.4, tone: "primary" },
      { id: "a3", qty: 100, destination: "Local Buyer", when: "Tomorrow", net: 25.1, tone: "teal" },
    ] as Allocation[],
  },
} as const;

export type StrategyKey = keyof typeof STRATEGIES;

export const PRICE_SERIES = [
  26.4, 25.9, 27.1, 27.8, 27.2, 28.4, 29.1, 28.6, 29.4, 30.2, 29.8, 30.6, 31.2, 30.4, 30.0,
];

export const FORECAST_SERIES = [30.0, 31.0, 31.6, 30.8, 32.1];

export const DEMAND_FACTORS = [
  { label: "Price momentum", value: 88 },
  { label: "Supply stability", value: 74 },
  { label: "Seasonality", value: 66 },
  { label: "Buyer enquiries", value: 81 },
];

export const RISK_FACTORS = [
  { label: "Price", value: 62 },
  { label: "Weather", value: 48 },
  { label: "Transport", value: 78 },
  { label: "Buyer", value: 34 },
  { label: "Spoilage", value: 55 },
];

export const SPOILAGE = [
  { day: "Today", loss: 1.0, freshness: 100 },
  { day: "Day 1", loss: 2.0, freshness: 88 },
  { day: "Day 2", loss: 3.8, freshness: 72 },
  { day: "Day 3", loss: 7.9, freshness: 51 },
];

export const COST_BREAKDOWN = [
  { label: "Mangaluru mandi price", value: 30, kind: "base" as const },
  { label: "Transport (55 km)", value: -3.2, kind: "cost" as const },
  { label: "Packaging & crates", value: -0.8, kind: "cost" as const },
  { label: "Mandi commission", value: -0.7, kind: "cost" as const },
  { label: "Spoilage & handling", value: -1.0, kind: "cost" as const },
];

export const LEDGER = [
  {
    title: "Harvest profile checked",
    detail: "1,000 kg tomato from Udupi. Grade A 600 kg, B 300 kg, C 100 kg. Storage window 2 days.",
  },
  {
    title: "Market prices analysed",
    detail: "3 mandis polled. Bengaluru ₹32, Mangaluru ₹30, Udupi ₹28 per kg (demo feed).",
  },
  {
    title: "Historical trends analysed",
    detail: "14-day trend rising 6.2% in Mangaluru; Bengaluru momentum slowing after a 5.2% spike.",
  },
  {
    title: "Buyers evaluated",
    detail: "4 buyers scored on price, reliability and pickup terms. Buyer B leads on net realisation.",
  },
  {
    title: "Logistics calculated",
    detail: "Route costs from ₹1.10/kg (Udupi) to ₹6.40/kg (Bengaluru), including return-load risk.",
  },
  {
    title: "Spoilage estimated",
    detail: "Loss curve 1.0% → 7.9% across 3 days at current humidity. Grade C degrades fastest.",
  },
  {
    title: "Risk calculated",
    detail: "Composite risk MEDIUM. Transport reliability is the dominant factor at 78/100.",
  },
  {
    title: "Possible plans evaluated",
    detail: "24 allocation combinations simulated across 8 market and 12 buyer opportunities.",
  },
  {
    title: "Best plan selected",
    detail: "Balanced split returns ₹29,700 expected — ₹1,800 above single-market dispatch.",
    best: true,
  },
];

export const WHY_POINTS = [
  "Mangaluru price is rising 6.2% with steady arrivals",
  "Buyer B offers a stronger net realisation of ₹30.4/kg",
  "Local selling removes ₹3.20/kg of transport cost",
  "Grade A qualifies for the premium buyer window",
  "Holding beyond day 2 pushes spoilage past 3.8%",
  "Long-distance Bengaluru transport adds reliability risk",
];

export const AI_QA: { q: string; a: string }[] = [
  {
    q: "Why Mangaluru?",
    a: "Mangaluru currently offers a stronger overall outcome because its 6.2% price momentum and 84/100 demand outweigh the ₹3.20/kg transport cost. Net realisation lands at ₹25.80/kg — the best of the three mandis after costs.",
  },
  {
    q: "Why not Bengaluru?",
    a: "Bengaluru shows the highest sticker price at ₹32/kg, but 355 km of transport costs ₹6.40/kg and adds reliability risk. Expected net drops to ₹24.10/kg, below Mangaluru.",
  },
  {
    q: "What if I wait 2 days?",
    a: "Prices are forecast to reach about ₹31.6/kg on day 2, but spoilage climbs to 3.8% and Grade C degrades fastest. Waiting is only worth it for the 100 kg hold parcel, not the full lot.",
  },
  {
    q: "Why Grade A here?",
    a: "Buyer B pays a premium only for Grade A with tight uniformity. Sending 300 kg of your 600 kg Grade A there captures ₹4.60/kg above mandi rate without exceeding their intake limit.",
  },
  {
    q: "Show Plan B",
    a: "If Buyer B goes unavailable, 300 kg reroutes to Buyer C at ₹28.20/kg net. Expected earnings adjust to ₹29,040 — a ₹660 difference, with reliability up at 86/100.",
  },
];

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
