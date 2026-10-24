export interface ComplianceStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending' | 'optional';
  estimatedDays: string;
  documents: string[];
  notes?: string;
}

export interface ComplianceGuide {
  standardCode: string;
  standardTitle: string;
  productCategory: string;
  mandatory: boolean;
  certificationBody: string;
  totalEstimatedDays: string;
  steps: ComplianceStep[];
  requiredDocuments: string[];
  approvedLabs: ApprovedLab[];
  fees?: string;
}

export interface ApprovedLab {
  name: string;
  location: string;
  accreditation: string;
  contact?: string;
}
