import type { Product } from '../types/Product';

export interface TrustBreakdown {
  identity: number;
  certification: number;
  batch: number;
  sourceEvidence: number;
  traceability: number;
}

export function calculateTrustScore(breakdown: TrustBreakdown): number {
  const weights = {
    identity: 0.25,
    certification: 0.30,
    batch: 0.20,
    sourceEvidence: 0.15,
    traceability: 0.10,
  };

  return Math.round(
    breakdown.identity * weights.identity +
    breakdown.certification * weights.certification +
    breakdown.batch * weights.batch +
    breakdown.sourceEvidence * weights.sourceEvidence +
    breakdown.traceability * weights.traceability
  );
}

export function getTrustLevel(score: number): {
  level: string;
  color: string;
  bgColor: string;
  textColor: string;
} {
  if (score >= 90) return { level: 'HIGH TRUST', color: '#16a34a', bgColor: '#dcfce7', textColor: '#15803d' };
  if (score >= 70) return { level: 'MODERATE TRUST', color: '#d97706', bgColor: '#fef3c7', textColor: '#b45309' };
  if (score >= 40) return { level: 'LOW TRUST', color: '#dc2626', bgColor: '#fee2e2', textColor: '#b91c1c' };
  return { level: 'CRITICAL RISK', color: '#7f1d1d', bgColor: '#fecaca', textColor: '#7f1d1d' };
}

export function getTrustBreakdown(product: Product): TrustBreakdown {
  if (product.trustBreakdown) return product.trustBreakdown;

  // Compute from status if not provided
  const base = product.trustScore;
  return {
    identity: Math.min(100, base + 5),
    certification: Math.min(100, base - 5),
    batch: Math.min(100, base + 2),
    sourceEvidence: Math.min(100, base - 8),
    traceability: Math.min(100, base - 3),
  };
}
