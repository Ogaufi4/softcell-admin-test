export type SubDealerStatus = "active" | "suspended" | "pending";

export type TransactionType = "dispatch" | "return" | "payment" | "adjustment";

export type TransactionStatus = "completed" | "pending" | "inTransit" | "cancelled";

export type ApplicationType = "stock" | "credit";

export type ApplicationStatus = "pending" | "approved" | "rejected";

export type PaymentStatus = "received" | "due" | "overdue";

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