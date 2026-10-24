import type { Product, ProductStatus } from '../types/Product';
import { categoryManufacturers } from '../data/manufacturers';

const productNamesByCategory: Record<string, string[]> = {
  Electrical: ['Smart Electric Iron', 'Portable Room Heater', 'Electric Fan Regulator', 'Ceiling Fan', 'Electric Drill', 'Water Heater 25L'],
  'Electrical Appliance': ['Electric Kettle 1.5L', 'Pop-up Toaster', 'Electric Food Mixer', 'Hand Blender', 'Electric Rice Cooker', 'Induction Cooktop'],
  'Kitchen Appliance': ['Pressure Cooker 5L', 'Stainless Steel Pressure Cooker', 'Domestic Gas Stove', 'Non-Stick Cookware Set', 'Stainless Tiffin Box'],
  'Consumer Product': ['BPA-Free Water Bottle', 'Stainless Steel Water Bottle', 'Plastic Storage Container', 'Reusable Food Bag', 'Plastic Chair'],
  Food: ['Basmati Rice 5kg', 'Whole Wheat Atta', 'Refined Sunflower Oil', 'Iodised Table Salt', 'Packaged Drinking Water 1L', 'Fortified Milk'],
  Textiles: ['Polyester-Cotton Shirt Fabric', 'Pure Cotton Kurta Fabric', 'Woollen Blanket', 'Nylon Safety Rope', 'Jute Bag'],
  Construction: ['OPC 53 Grade Cement', 'TMT Steel Bar 12mm', 'Concrete Hollow Block', 'Ceramic Floor Tile', 'UPVC Water Pipe'],
  Electronics: ['LED Strip Light 5m', 'Smart Wi-Fi Plug', 'USB-C Power Adapter', 'Bluetooth Speaker', 'Digital Multimeter'],
  Safety: ['ISI Helmet Full Face', 'Safety Shoes Steel Toe', 'Industrial Safety Gloves', 'Fire Extinguisher 4kg', 'Reflective Safety Jacket'],
};

const standardsByCategory: Record<string, string[]> = {
  Electrical: ['IS 302', 'IS 16102', 'IS 1293'],
  'Electrical Appliance': ['IS 302', 'IS 4250', 'IS 5516'],
  'Kitchen Appliance': ['IS 2347', 'IS 11606', 'IS 14892'],
  'Consumer Product': ['IS 17803', 'IS 4581', 'IS 7328'],
  Food: ['IS 1155', 'IS 1432', 'IS 13428', 'IS 1217'],
  Textiles: ['IS 1964', 'IS 1058', 'IS 9556'],
  Construction: ['IS 269', 'IS 1786', 'IS 4031'],
  Electronics: ['IS 16102', 'IS 13252', 'IS 15885'],
  Safety: ['IS 9844', 'IS 15298', 'IS 2151'],
};

const batchPrefixes: Record<string, string> = {
  Electrical: 'EL',
  'Electrical Appliance': 'EA',
  'Kitchen Appliance': 'KA',
  'Consumer Product': 'CP',
  Food: 'FD',
  Textiles: 'TX',
  Construction: 'CN',
  Electronics: 'EC',
  Safety: 'SF',
};

function randomInt(min: number, max: number, seed: number): number {
  const x = Math.sin(seed) * 10000;
  return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
}

function pickFromArray<T>(arr: T[], seed: number): T {
  return arr[randomInt(0, arr.length - 1, seed)];
}

function generateDate(daysOffset: number, baseDate = new Date()): string {
  const d = new Date(baseDate);
  d.setDate(d.getDate() - daysOffset);
  return d.toISOString().split('T')[0];
}

function generateCertNumber(seed: number): string {
  const num = String(Math.abs(Math.floor(Math.sin(seed * 7) * 9999999999))).padStart(10, '0');
  return `CM/L-${num}`;
}

function generateTrustScore(status: ProductStatus): number {
  switch (status) {
    case 'VERIFIED': return randomInt(85, 99, Math.random() * 1000);
    case 'SUSPICIOUS': return randomInt(45, 70, Math.random() * 1000);
    case 'POSSIBLE_COUNTERFEIT': return randomInt(5, 30, Math.random() * 1000);
    case 'PENDING': return randomInt(55, 75, Math.random() * 1000);
  }
}

function determineStatus(
  forcedStatus: 'Random' | ProductStatus | 'PENDING',
  seed: number
): ProductStatus {
  if (forcedStatus !== 'Random') return forcedStatus as ProductStatus;
  const r = randomInt(0, 9, seed);
  if (r <= 5) return 'VERIFIED';
  if (r <= 7) return 'SUSPICIOUS';
  if (r === 8) return 'PENDING';
  return 'POSSIBLE_COUNTERFEIT';
}

export function generateProducts(
  count: number,
  category: string,
  statusFilter: string
): Product[] {
  const categories = category === 'All'
    ? Object.keys(productNamesByCategory)
    : [category];

  const products: Product[] = [];
  const baseId = 20000;

  for (let i = 0; i < count; i++) {
    const seed = i * 137 + 42;
    const cat = pickFromArray(categories, seed);
    const names = productNamesByCategory[cat] || productNamesByCategory['Electronics'];
    const standards = standardsByCategory[cat] || ['IS 302'];
    const mfgList = categoryManufacturers[cat] || ['Generic Manufacturer Pvt Ltd'];

    const status = determineStatus(statusFilter as 'Random' | ProductStatus, seed + i);
    const trustScore = generateTrustScore(status);
    const mfgDaysAgo = randomInt(30, 365, seed + 10);
    const expiryYears = randomInt(1, 5, seed + 20);

    const mfgDate = generateDate(mfgDaysAgo);
    const expDate = new Date(mfgDate);
    expDate.setFullYear(expDate.getFullYear() + expiryYears);

    const batchPrefix = batchPrefixes[cat] || 'XX';
    const batchNum = String(randomInt(10000, 99999, seed + 30));

    products.push({
      id: `BIS-PROD-${baseId + i}`,
      name: pickFromArray(names, seed + 1),
      manufacturer: pickFromArray(mfgList, seed + 2),
      category: cat,
      batchNumber: `${batchPrefix}${batchNum.slice(0, 5)}`,
      standard: pickFromArray(standards, seed + 3),
      certificationNumber: status === 'VERIFIED' ? generateCertNumber(seed) : status === 'POSSIBLE_COUNTERFEIT' ? 'INVALID-' + batchNum.slice(0, 4) : 'PENDING-' + batchNum.slice(0, 4),
      certificationStatus: status === 'VERIFIED' ? 'Certified' : status === 'POSSIBLE_COUNTERFEIT' ? 'Expired' : 'Pending',
      status,
      trustScore,
      manufacturingDate: mfgDate,
      expiryDate: expDate.toISOString().split('T')[0],
      isGenerated: true,
      recallStatus: status === 'POSSIBLE_COUNTERFEIT' ? 'RECALLED — DO NOT USE' : 'No active recall',
      trustBreakdown: {
        identity: Math.min(100, trustScore + randomInt(-5, 5, seed + 40)),
        certification: Math.min(100, Math.max(0, trustScore + randomInt(-10, 10, seed + 41))),
        batch: Math.min(100, trustScore + randomInt(-3, 7, seed + 42)),
        sourceEvidence: Math.min(100, Math.max(0, trustScore + randomInt(-8, 5, seed + 43))),
        traceability: Math.min(100, Math.max(0, trustScore + randomInt(-6, 6, seed + 44))),
      },
      verificationHistory: [],
    });
  }

  return products;
}

export function exportToCSV(products: Product[]): string {
  const headers = [
    'Product ID', 'Product Name', 'Manufacturer', 'Category', 'Batch Number',
    'Indian Standard', 'Certification Number', 'Certification Status', 'Status',
    'Trust Score', 'Manufacturing Date', 'Expiry Date',
  ];

  const rows = products.map(p => [
    p.id, p.name, p.manufacturer, p.category, p.batchNumber,
    p.standard, p.certificationNumber, p.certificationStatus, p.status,
    p.trustScore, p.manufacturingDate, p.expiryDate,
  ].map(v => `"${v}"`).join(','));

  return [headers.join(','), ...rows].join('\n');
}

export function downloadCSV(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function downloadJSON(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
