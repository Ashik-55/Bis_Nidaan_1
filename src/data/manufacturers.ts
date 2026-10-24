export interface Manufacturer {
  id: string;
  name: string;
  state: string;
  city: string;
  gstin: string;
  bisLicenseCount: number;
  category: string;
  registeredYear: number;
  status: 'Active' | 'Suspended' | 'Cancelled';
}

export const manufacturers: Manufacturer[] = [
  { id: 'MFG-001', name: 'Nova Appliances Pvt Ltd', state: 'Maharashtra', city: 'Pune', gstin: '27AAAPL1234A1Z5', bisLicenseCount: 12, category: 'Electrical Appliance', registeredYear: 2010, status: 'Active' },
  { id: 'MFG-002', name: 'SafeHome Industries', state: 'Gujarat', city: 'Ahmedabad', gstin: '24BBBSH5678B1Z3', bisLicenseCount: 8, category: 'Kitchen Appliance', registeredYear: 2005, status: 'Active' },
  { id: 'MFG-003', name: 'PureFlow India', state: 'Tamil Nadu', city: 'Chennai', gstin: '33CCCPF9012C1Z1', bisLicenseCount: 2, category: 'Consumer Product', registeredYear: 2020, status: 'Active' },
  { id: 'MFG-004', name: 'BrightLite India Pvt Ltd', state: 'Karnataka', city: 'Bangalore', gstin: '29DDDBL3456D1Z7', bisLicenseCount: 15, category: 'Electrical', registeredYear: 2012, status: 'Active' },
  { id: 'MFG-005', name: 'Agro Heritage Foods Pvt Ltd', state: 'Punjab', city: 'Amritsar', gstin: '03EEEAH7890E1Z5', bisLicenseCount: 3, category: 'Food', registeredYear: 2008, status: 'Active' },
  { id: 'MFG-006', name: 'Bharat Textiles Ltd', state: 'West Bengal', city: 'Kolkata', gstin: '19FFFBT1234F1Z9', bisLicenseCount: 5, category: 'Textiles', registeredYear: 2001, status: 'Active' },
  { id: 'MFG-007', name: 'Deccan Cements Ltd', state: 'Andhra Pradesh', city: 'Hyderabad', gstin: '37GGGDC5678G1Z6', bisLicenseCount: 4, category: 'Construction', registeredYear: 1998, status: 'Active' },
  { id: 'MFG-008', name: 'TechStar Electronics', state: 'Delhi', city: 'New Delhi', gstin: '07HHHTE9012H1Z4', bisLicenseCount: 20, category: 'Electronics', registeredYear: 2015, status: 'Active' },
  { id: 'MFG-009', name: 'HiTech Polymers Pvt Ltd', state: 'Rajasthan', city: 'Jaipur', gstin: '08IIIHP3456I1Z2', bisLicenseCount: 7, category: 'Consumer Product', registeredYear: 2018, status: 'Active' },
  { id: 'MFG-010', name: 'Surya Steel & Alloys', state: 'Chhattisgarh', city: 'Bhilai', gstin: '22JJJSS7890J1Z8', bisLicenseCount: 9, category: 'Construction', registeredYear: 2003, status: 'Active' },
  { id: 'MFG-011', name: 'Amar Safety Products Ltd', state: 'Haryana', city: 'Faridabad', gstin: '06KKKAM1234K1Z6', bisLicenseCount: 11, category: 'Safety', registeredYear: 2007, status: 'Active' },
  { id: 'MFG-012', name: 'IndoFresh Beverages Pvt Ltd', state: 'Uttar Pradesh', city: 'Lucknow', gstin: '09LLLIF5678L1Z4', bisLicenseCount: 6, category: 'Food', registeredYear: 2016, status: 'Active' },
];

export const manufacturerNames = manufacturers.map(m => m.name);

export const categoryManufacturers: Record<string, string[]> = {
  'Electrical': ['Nova Appliances Pvt Ltd', 'BrightLite India Pvt Ltd', 'TechStar Electronics'],
  'Electrical Appliance': ['Nova Appliances Pvt Ltd', 'TechStar Electronics'],
  'Kitchen Appliance': ['SafeHome Industries', 'Nova Appliances Pvt Ltd'],
  'Consumer Product': ['PureFlow India', 'HiTech Polymers Pvt Ltd'],
  'Food': ['Agro Heritage Foods Pvt Ltd', 'IndoFresh Beverages Pvt Ltd'],
  'Textiles': ['Bharat Textiles Ltd'],
  'Construction': ['Deccan Cements Ltd', 'Surya Steel & Alloys'],
  'Electronics': ['TechStar Electronics', 'BrightLite India Pvt Ltd'],
  'Safety': ['Amar Safety Products Ltd'],
};
