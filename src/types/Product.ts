export type ProductStatus = 'VERIFIED' | 'SUSPICIOUS' | 'POSSIBLE_COUNTERFEIT' | 'PENDING';

export interface Product {
  id: string;
  name: string;
  manufacturer: string;
  category: string;
  batchNumber: string;
  standard: string;
  certificationNumber: string;
  certificationStatus: 'Certified' | 'Pending' | 'Expired' | 'Not Required';
  status: ProductStatus;
  trustScore: number;
  manufacturingDate: string;
  expiryDate: string;
  description?: string;
  manufacturerState?: string;
  recallStatus?: string;
  trustBreakdown?: {
    identity: number;
    certification: number;
    batch: number;
    sourceEvidence: number;
    traceability: number;
  };
  verificationHistory?: VerificationEvent[];
  isGenerated?: boolean;
}

export interface VerificationEvent {
  id: string;
  event: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

export interface VerificationResult {
  found: boolean;
  product?: Product;
  verifiedAt?: string;
  method?: 'manual' | 'scan';
}
