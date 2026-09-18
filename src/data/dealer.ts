export type SubDealerStatus = "active" | "suspended" | "pending";

export type TransactionType = "dispatch" | "return" | "payment" | "adjustment";

export type TransactionStatus = "completed" | "pending" | "inTransit" | "cancelled";

export type ApplicationType = "stock" | "credit";

export type ApplicationStatus = "pending" | "approved" | "rejected";

export type PaymentStatus = "received" | "due" | "overdue";

export type RestockStatus = "pending" | "approved" | "rejected" | "fulfilled";

export type RestockSource = "network" | "subDealer";

export interface VirtualStock {
  id: string;
  network: string;
  credit: number;
  used: number;
  available: number;
  threshold: number;
}

export interface RestockOrder {
  id: string;
  reference: string;
  source: RestockSource;
  origin: string;
  product: string;
  units: number;
  amount: number;
  date: string;
  status: RestockStatus;
}

export interface SubDealer {
  id: string;
  name: string;
  initials: string;
  contact: string;
  email: string;
  region: string;
  status: SubDealerStatus;
  stockAllocated: number;
  stockSold: number;
  stockInHand: number;
  outstanding: number;
  creditLimit: number;
  joinedOn: string;
}

export interface StockItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  available: number;
  allocated: number;
  inTransit: number;
  reserved: number;
  threshold: number;
}

export interface DealerTransaction {
  id: string;
  reference: string;
  subDealer: string;
  type: TransactionType;
  units: number;
  amount: number;
  date: string;
  status: TransactionStatus;
}

export interface Application {
  id: string;
  reference: string;
  subDealer: string;
  type: ApplicationType;
  units: number | null;
  amount: number | null;
  date: string;
  status: ApplicationStatus;
}

export interface Payment {
  id: string;
  reference: string;
  subDealer: string;
  method: "cash" | "bank" | "upi";
  amount: number;
  dueDate: string;
  status: PaymentStatus;
}

export interface MonthlyDistribution {
  month: string;
  distributed: number;
  restocked: number;
}

export type TraceAction =
  | "login"
  | "logout"
  | "allocation"
  | "dispatch"
  | "receive"
  | "sale"
  | "return"
  | "approval"
  | "rejection";

export interface TraceEvent {
  id: string;
  timestamp: string;
  actor: string;
  role: "dealer" | "subDealer";
  subDealer: string;
  action: TraceAction;
  product: string;
  units: number;
  reference: string;
  channel: "web" | "mobile" | "ussd";
  session: string;
}

export interface TraceTreeBranch {
  id: string;
  reference: string;
  product: string;
  units: number;
  allocatedAt: string;
  subDealer: string;
  status: "inTransit" | "received" | "partiallySold" | "soldOut";
  events: TraceEvent[];
}

export const subDealers: SubDealer[] = [
  {
    id: "sd-001",
    name: "Bright Retail & Co",
    initials: "BR",
    contact: "Rahul Sharma",
    email: "rahul@brightretail.com",
    region: "North Zone",
    status: "active",
    stockAllocated: 12500,
    stockSold: 10980,
    stockInHand: 1520,
    outstanding: 128500,
    creditLimit: 200000,
    joinedOn: "2024-03-12",
  },
  {
    id: "sd-002",
    name: "Metro Telecom Hub",
    initials: "MT",
    contact: "Sneha Patel",
    email: "sneha@metrotelecom.in",
    region: "West Zone",
    status: "active",
    stockAllocated: 9800,
    stockSold: 9120,
    stockInHand: 680,
    outstanding: 74000,
    creditLimit: 150000,
    joinedOn: "2024-06-02",
  },
  {
    id: "sd-003",
    name: "Eastern Digital Store",
    initials: "ED",
    contact: "Arun Verma",
    email: "arun@easterndigital.com",
    region: "East Zone",
    status: "suspended",
    stockAllocated: 5400,
    stockSold: 2980,
    stockInHand: 2420,
    outstanding: 186000,
    creditLimit: 120000,
    joinedOn: "2024-09-18",
  },
  {
    id: "sd-004",
    name: "South City Network",
    initials: "SC",
    contact: "Priya Nair",
    email: "priya@southcitynet.in",
    region: "South Zone",
    status: "active",
    stockAllocated: 11100,
    stockSold: 10050,
    stockInHand: 1050,
    outstanding: 96500,
    creditLimit: 180000,
    joinedOn: "2025-01-25",
  },
  {
    id: "sd-005",
    name: "Central Comms Ltd",
    initials: "CC",
    contact: "Karan Mehta",
    email: "karan@centralcomms.com",
    region: "Central Zone",
    status: "pending",
    stockAllocated: 0,
    stockSold: 0,
    stockInHand: 0,
    outstanding: 0,
    creditLimit: 100000,
    joinedOn: "2026-09-01",
  },
  {
    id: "sd-006",
    name: "Quick Mobile Point",
    initials: "QM",
    contact: "Alia Khan",
    email: "alia@quickmobile.in",
    region: "West Zone",
    status: "active",
    stockAllocated: 7300,
    stockSold: 6900,
    stockInHand: 400,
    outstanding: 42000,
    creditLimit: 90000,
    joinedOn: "2025-04-14",
  },
];

export const stockItems: StockItem[] = [
  {
    id: "sk-001",
    name: "Orange Airtime",
    sku: "AIR-ORN",
    category: "orange",
    available: 12800,
    allocated: 4200,
    inTransit: 1500,
    reserved: 300,
    threshold: 2000,
  },
  {
    id: "sk-002",
    name: "Smega Airtime",
    sku: "AIR-SMG",
    category: "mascom",
    available: 8600,
    allocated: 3100,
    inTransit: 900,
    reserved: 200,
    threshold: 1500,
  },
  {
    id: "sk-003",
    name: "MyZaka Wallet",
    sku: "WAL-MZ",
    category: "btc",
    available: 1450,
    allocated: 1200,
    inTransit: 0,
    reserved: 150,
    threshold: 1800,
  },
  {
    id: "sk-004",
    name: "BTC Airtime (Motlhakase)",
    sku: "AIR-BTC",
    category: "btc",
    available: 320,
    allocated: 410,
    inTransit: 120,
    reserved: 60,
    threshold: 250,
  },
  {
    id: "sk-005",
    name: "Prange Money",
    sku: "MNY-PRG",
    category: "prange",
    available: 95,
    allocated: 140,
    inTransit: 40,
    reserved: 25,
    threshold: 150,
  },
  {
    id: "sk-006",
    name: "CashPlus",
    sku: "MNY-CSH",
    category: "cashplus",
    available: 5200,
    allocated: 1900,
    inTransit: 600,
    reserved: 400,
    threshold: 1200,
  },
];

export const transactions: DealerTransaction[] = [
  {
    id: "tr-001",
    reference: "DSP-2026-0841",
    subDealer: "Bright Retail & Co",
    type: "dispatch",
    units: 1500,
    amount: 225000,
    date: "2026-09-16",
    status: "completed",
  },
  {
    id: "tr-002",
    reference: "PAY-2026-0190",
    subDealer: "Metro Telecom Hub",
    type: "payment",
    units: 0,
    amount: 74000,
    date: "2026-09-15",
    status: "completed",
  },
  {
    id: "tr-003",
    reference: "DSP-2026-0840",
    subDealer: "South City Network",
    type: "dispatch",
    units: 950,
    amount: 142500,
    date: "2026-09-15",
    status: "inTransit",
  },
  {
    id: "tr-004",
    reference: "RET-2026-0032",
    subDealer: "Eastern Digital Store",
    type: "return",
    units: 120,
    amount: 18000,
    date: "2026-09-14",
    status: "pending",
  },
  {
    id: "tr-005",
    reference: "DSP-2026-0839",
    subDealer: "Quick Mobile Point",
    type: "dispatch",
    units: 600,
    amount: 90000,
    date: "2026-09-13",
    status: "completed",
  },
  {
    id: "tr-006",
    reference: "PAY-2026-0189",
    subDealer: "Bright Retail & Co",
    type: "payment",
    units: 0,
    amount: 128500,
    date: "2026-09-12",
    status: "completed",
  },
  {
    id: "tr-007",
    reference: "ADJ-2026-0011",
    subDealer: "Central Comms Ltd",
    type: "adjustment",
    units: 40,
    amount: 6000,
    date: "2026-09-10",
    status: "completed",
  },
  {
    id: "tr-008",
    reference: "DSP-2026-0838",
    subDealer: "Metro Telecom Hub",
    type: "dispatch",
    units: 1300,
    amount: 195000,
    date: "2026-09-09",
    status: "cancelled",
  },
  {
    id: "tr-009",
    reference: "DSP-2026-0837",
    subDealer: "Eastern Digital Store",
    type: "dispatch",
    units: 400,
    amount: 60000,
    date: "2026-09-08",
    status: "pending",
  },
  {
    id: "tr-010",
    reference: "PAY-2026-0188",
    subDealer: "South City Network",
    type: "payment",
    units: 0,
    amount: 96500,
    date: "2026-09-07",
    status: "inTransit",
  },
];

export const applications: Application[] = [
  {
    id: "ap-001",
    reference: "APP-2026-0441",
    subDealer: "Bright Retail & Co",
    type: "stock",
    units: 2000,
    amount: null,
    date: "2026-09-16",
    status: "pending",
  },
  {
    id: "ap-002",
    reference: "APP-2026-0440",
    subDealer: "Quick Mobile Point",
    type: "credit",
    units: null,
    amount: 50000,
    date: "2026-09-15",
    status: "pending",
  },
  {
    id: "ap-003",
    reference: "APP-2026-0439",
    subDealer: "South City Network",
    type: "stock",
    units: 1100,
    amount: null,
    date: "2026-09-14",
    status: "pending",
  },
  {
    id: "ap-004",
    reference: "APP-2026-0438",
    subDealer: "Metro Telecom Hub",
    type: "credit",
    units: null,
    amount: 75000,
    date: "2026-09-11",
    status: "approved",
  },
  {
    id: "ap-005",
    reference: "APP-2026-0429",
    subDealer: "Eastern Digital Store",
    type: "stock",
    units: 300,
    amount: null,
    date: "2026-09-05",
    status: "rejected",
  },
  {
    id: "ap-006",
    reference: "APP-2026-0418",
    subDealer: "Central Comms Ltd",
    type: "stock",
    units: 1500,
    amount: null,
    date: "2026-09-02",
    status: "approved",
  },
];

export const payments: Payment[] = [
  {
    id: "pm-001",
    reference: "PAY-2026-0190",
    subDealer: "Metro Telecom Hub",
    method: "bank",
    amount: 74000,
    dueDate: "2026-09-15",
    status: "received",
  },
  {
    id: "pm-002",
    reference: "PAY-2026-0189",
    subDealer: "Bright Retail & Co",
    method: "bank",
    amount: 128500,
    dueDate: "2026-09-12",
    status: "received",
  },
  {
    id: "pm-003",
    reference: "PAY-2026-0188",
    subDealer: "South City Network",
    method: "upi",
    amount: 96500,
    dueDate: "2026-09-10",
    status: "due",
  },
  {
    id: "pm-004",
    reference: "PAY-2026-0187",
    subDealer: "Quick Mobile Point",
    method: "cash",
    amount: 42000,
    dueDate: "2026-09-05",
    status: "received",
  },
  {
    id: "pm-005",
    reference: "PAY-2026-0186",
    subDealer: "Eastern Digital Store",
    method: "bank",
    amount: 96000,
    dueDate: "2026-08-28",
    status: "overdue",
  },
  {
    id: "pm-006",
    reference: "PAY-2026-0185",
    subDealer: "Eastern Digital Store",
    method: "bank",
    amount: 90000,
    dueDate: "2026-08-15",
    status: "overdue",
  },
];

export const monthlyDistribution: MonthlyDistribution[] = [
  { month: "jan", distributed: 8200, restocked: 9600 },
  { month: "feb", distributed: 9100, restocked: 8800 },
  { month: "mar", distributed: 10400, restocked: 11200 },
  { month: "apr", distributed: 9800, restocked: 9400 },
  { month: "may", distributed: 11200, restocked: 12000 },
  { month: "jun", distributed: 12600, restocked: 11000 },
  { month: "jul", distributed: 11900, restocked: 13200 },
  { month: "aug", distributed: 13800, restocked: 12500 },
  { month: "sep", distributed: 12100, restocked: 11600 },
];

export const traceBranches: TraceTreeBranch[] = [
  {
    id: "tb-001",
    reference: "DSP-2026-0841",
    product: "Smega Airtime",
    units: 1500,
    allocatedAt: "2026-09-14 08:42",
    subDealer: "Bright Retail & Co",
    status: "partiallySold",
    events: [
      {
        id: "ev-011",
        timestamp: "2026-09-14 09:02",
        actor: "Rahul Sharma",
        role: "subDealer",
        subDealer: "Bright Retail & Co",
        action: "login",
        product: "Smega Airtime",
        units: 0,
        reference: "DSP-2026-0841",
        channel: "web",
        session: "sess-4f81c2",
      },
      {
        id: "ev-012",
        timestamp: "2026-09-14 09:05",
        actor: "Rahul Sharma",
        role: "subDealer",
        subDealer: "Bright Retail & Co",
        action: "receive",
        product: "Smega Airtime",
        units: 1500,
        reference: "DSP-2026-0841",
        channel: "web",
        session: "sess-4f81c2",
      },
      {
        id: "ev-013",
        timestamp: "2026-09-14 09:11",
        actor: "Neo Kgosi",
        role: "subDealer",
        subDealer: "Bright Retail & Co",
        action: "login",
        product: "Smega Airtime",
        units: 0,
        reference: "DSP-2026-0841",
        channel: "mobile",
        session: "sess-19a3bd",
      },
      {
        id: "ev-014",
        timestamp: "2026-09-14 10:20",
        actor: "Neo Kgosi",
        role: "subDealer",
        subDealer: "Bright Retail & Co",
        action: "sale",
        product: "Smega Airtime",
        units: 850,
        reference: "DSP-2026-0841",
        channel: "mobile",
        session: "sess-19a3bd",
      },
      {
        id: "ev-015",
        timestamp: "2026-09-15 08:15",
        actor: "Rahul Sharma",
        role: "subDealer",
        subDealer: "Bright Retail & Co",
        action: "login",
        product: "Smega Airtime",
        units: 0,
        reference: "DSP-2026-0841",
        channel: "web",
        session: "sess-77cae0",
      },
      {
        id: "ev-016",
        timestamp: "2026-09-15 08:22",
        actor: "Rahul Sharma",
        role: "subDealer",
        subDealer: "Bright Retail & Co",
        action: "sale",
        product: "Smega Airtime",
        units: 210,
        reference: "DSP-2026-0841",
        channel: "web",
        session: "sess-77cae0",
      },
      {
        id: "ev-017",
        timestamp: "2026-09-15 09:40",
        actor: "Neo Kgosi",
        role: "subDealer",
        subDealer: "Bright Retail & Co",
        action: "login",
        product: "Smega Airtime",
        units: 0,
        reference: "DSP-2026-0841",
        channel: "ussd",
        session: "sess-2bd01e",
      },
      {
        id: "ev-018",
        timestamp: "2026-09-15 10:05",
        actor: "Neo Kgosi",
        role: "subDealer",
        subDealer: "Bright Retail & Co",
        action: "sale",
        product: "Smega Airtime",
        units: 120,
        reference: "DSP-2026-0841",
        channel: "ussd",
        session: "sess-2bd01e",
      },
    ],
  },
  {
    id: "tb-002",
    reference: "DSP-2026-0838",
    product: "Orange Airtime",
    units: 900,
    allocatedAt: "2026-09-13 14:20",
    subDealer: "Metro Telecom Hub",
    status: "soldOut",
    events: [
      {
        id: "ev-021",
        timestamp: "2026-09-13 14:35",
        actor: "Lerato Moalosi",
        role: "subDealer",
        subDealer: "Metro Telecom Hub",
        action: "login",
        product: "Orange Airtime",
        units: 0,
        reference: "DSP-2026-0838",
        channel: "web",
        session: "sess-31d8e2",
      },
      {
        id: "ev-022",
        timestamp: "2026-09-13 14:38",
        actor: "Lerato Moalosi",
        role: "subDealer",
        subDealer: "Metro Telecom Hub",
        action: "receive",
        product: "Orange Airtime",
        units: 900,
        reference: "DSP-2026-0838",
        channel: "web",
        session: "sess-31d8e2",
      },
      {
        id: "ev-023",
        timestamp: "2026-09-13 16:02",
        actor: "Lerato Moalosi",
        role: "subDealer",
        subDealer: "Metro Telecom Hub",
        action: "sale",
        product: "Orange Airtime",
        units: 900,
        reference: "DSP-2026-0838",
        channel: "web",
        session: "sess-31d8e2",
      },
    ],
  },
  {
    id: "tb-003",
    reference: "DSP-2026-0831",
    product: "MyZaka Wallet",
    units: 4200,
    allocatedAt: "2026-09-11 10:05",
    subDealer: "Quick Mobile Point",
    status: "inTransit",
    events: [
      {
        id: "ev-031",
        timestamp: "2026-09-11 10:12",
        actor: "Katlego Dube",
        role: "subDealer",
        subDealer: "Quick Mobile Point",
        action: "login",
        product: "MyZaka Wallet",
        units: 0,
        reference: "DSP-2026-0831",
        channel: "mobile",
        session: "sess-8ab3f1",
      },
    ],
  },
  {
    id: "tb-004",
    reference: "DSP-2026-0829",
    product: "BTC Airtime (Motlhakase)",
    units: 600,
    allocatedAt: "2026-09-10 09:30",
    subDealer: "South City Network",
    status: "received",
    events: [
      {
        id: "ev-041",
        timestamp: "2026-09-10 09:44",
        actor: "Palesa Chibele",
        role: "subDealer",
        subDealer: "South City Network",
        action: "login",
        product: "BTC Airtime (Motlhakase)",
        units: 0,
        reference: "DSP-2026-0829",
        channel: "web",
        session: "sess-04ee17",
      },
      {
        id: "ev-042",
        timestamp: "2026-09-10 09:47",
        actor: "Palesa Chibele",
        role: "subDealer",
        subDealer: "South City Network",
        action: "receive",
        product: "BTC Airtime (Motlhakase)",
        units: 600,
        reference: "DSP-2026-0829",
        channel: "web",
        session: "sess-04ee17",
      },
      {
        id: "ev-043",
        timestamp: "2026-09-10 11:03",
        actor: "Bame Kele",
        role: "subDealer",
        subDealer: "South City Network",
        action: "login",
        product: "BTC Airtime (Motlhakase)",
        units: 0,
        reference: "DSP-2026-0829",
        channel: "ussd",
        session: "sess-17f9aa",
      },
    ],
  },
  {
    id: "tb-005",
    reference: "DSP-2026-0824",
    product: "Prange Money",
    units: 300,
    allocatedAt: "2026-09-09 11:15",
    subDealer: "Eastern Digital Store",
    status: "soldOut",
    events: [
      {
        id: "ev-051",
        timestamp: "2026-09-09 11:26",
        actor: "Goabaone Ramogapi",
        role: "subDealer",
        subDealer: "Eastern Digital Store",
        action: "login",
        product: "Prange Money",
        units: 0,
        reference: "DSP-2026-0824",
        channel: "mobile",
        session: "sess-55c02b",
      },
      {
        id: "ev-052",
        timestamp: "2026-09-09 11:28",
        actor: "Goabaone Ramogapi",
        role: "subDealer",
        subDealer: "Eastern Digital Store",
        action: "receive",
        product: "Prange Money",
        units: 300,
        reference: "DSP-2026-0824",
        channel: "mobile",
        session: "sess-55c02b",
      },
      {
        id: "ev-053",
        timestamp: "2026-09-09 13:41",
        actor: "Goabaone Ramogapi",
        role: "subDealer",
        subDealer: "Eastern Digital Store",
        action: "sale",
        product: "Prange Money",
        units: 300,
        reference: "DSP-2026-0824",
        channel: "mobile",
        session: "sess-55c02b",
      },
    ],
  },
  {
    id: "tb-006",
    reference: "DSP-2026-0820",
    product: "CashPlus",
    units: 1800,
    allocatedAt: "2026-09-08 13:50",
    subDealer: "Central Comms Ltd",
    status: "partiallySold",
    events: [
      {
        id: "ev-061",
        timestamp: "2026-09-08 14:02",
        actor: "Tumelo Seth",
        role: "subDealer",
        subDealer: "Central Comms Ltd",
        action: "login",
        product: "CashPlus",
        units: 0,
        reference: "DSP-2026-0820",
        channel: "web",
        session: "sess-f044a8",
      },
      {
        id: "ev-062",
        timestamp: "2026-09-08 14:05",
        actor: "Tumelo Seth",
        role: "subDealer",
        subDealer: "Central Comms Ltd",
        action: "receive",
        product: "CashPlus",
        units: 1800,
        reference: "DSP-2026-0820",
        channel: "web",
        session: "sess-f044a8",
      },
      {
        id: "ev-063",
        timestamp: "2026-09-09 08:30",
        actor: "Oreeditse Kgosana",
        role: "subDealer",
        subDealer: "Central Comms Ltd",
        action: "login",
        product: "CashPlus",
        units: 0,
        reference: "DSP-2026-0820",
        channel: "mobile",
        session: "sess-ca19d4",
      },
      {
        id: "ev-064",
        timestamp: "2026-09-09 09:10",
        actor: "Oreeditse Kgosana",
        role: "subDealer",
        subDealer: "Central Comms Ltd",
        action: "sale",
        product: "CashPlus",
        units: 1150,
        reference: "DSP-2026-0820",
        channel: "mobile",
        session: "sess-ca19d4",
      },
    ],
  },
];

export const dealerEvents: TraceEvent[] = traceBranches.flatMap((branch) =>
  branch.events.map((ev) => ({ ...ev, product: branch.product })),
);

export const dealerVirtualStock: VirtualStock[] = [
  {
    id: "vs-001",
    network: "Orange",
    credit: 150000,
    used: 94000,
    available: 56000,
    threshold: 30000,
  },
  {
    id: "vs-002",
    network: "Mascom",
    credit: 120000,
    used: 82000,
    available: 38000,
    threshold: 25000,
  },
  {
    id: "vs-003",
    network: "BTC",
    credit: 90000,
    used: 61000,
    available: 29000,
    threshold: 20000,
  },
  {
    id: "vs-004",
    network: "Prange",
    credit: 50000,
    used: 21000,
    available: 29000,
    threshold: 12000,
  },
  {
    id: "vs-005",
    network: "CashPlus",
    credit: 70000,
    used: 48000,
    available: 22000,
    threshold: 15000,
  },
];

export const subDealerVirtualStock: VirtualStock[] = [
  {
    id: "svs-001",
    network: "Orange",
    credit: 40000,
    used: 28600,
    available: 11400,
    threshold: 8000,
  },
  {
    id: "svs-002",
    network: "Mascom",
    credit: 32000,
    used: 19400,
    available: 12600,
    threshold: 6000,
  },
  {
    id: "svs-003",
    network: "BTC",
    credit: 24000,
    used: 15800,
    available: 8200,
    threshold: 5000,
  },
  {
    id: "svs-004",
    network: "Prange",
    credit: 12000,
    used: 4100,
    available: 7900,
    threshold: 3000,
  },
  {
    id: "svs-005",
    network: "CashPlus",
    credit: 18000,
    used: 12300,
    available: 5700,
    threshold: 4000,
  },
];

export const dealerRestockOrders: RestockOrder[] = [
  {
    id: "rr-001",
    reference: "RSK-2026-0201",
    source: "network",
    origin: "Orange",
    product: "Orange Airtime",
    units: 8000,
    amount: 1200000,
    date: "2026-09-16",
    status: "fulfilled",
  },
  {
    id: "rr-002",
    reference: "RSK-2026-0202",
    source: "network",
    origin: "Mascom",
    product: "Smega Airtime",
    units: 5000,
    amount: 750000,
    date: "2026-09-15",
    status: "fulfilled",
  },
  {
    id: "rr-003",
    reference: "RSK-2026-0203",
    source: "network",
    origin: "BTC",
    product: "MyZaka Wallet",
    units: 3000,
    amount: 450000,
    date: "2026-09-14",
    status: "pending",
  },
  {
    id: "rr-004",
    reference: "RSK-2026-0204",
    source: "subDealer",
    origin: "Bright Retail & Co",
    product: "Smega Airtime",
    units: 1500,
    amount: 225000,
    date: "2026-09-16",
    status: "pending",
  },
  {
    id: "rr-005",
    reference: "RSK-2026-0205",
    source: "subDealer",
    origin: "Metro Telecom Hub",
    product: "Orange Airtime",
    units: 2000,
    amount: 300000,
    date: "2026-09-15",
    status: "approved",
  },
  {
    id: "rr-006",
    reference: "RSK-2026-0206",
    source: "subDealer",
    origin: "South City Network",
    product: "CashPlus",
    units: 900,
    amount: 135000,
    date: "2026-09-13",
    status: "rejected",
  },
];