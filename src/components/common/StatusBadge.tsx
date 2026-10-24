import type { ProductStatus } from '../../types/Product';
import { CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';

interface StatusBadgeProps {
  status: ProductStatus;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<ProductStatus, {
  label: string;
  className: string;
  icon: React.ComponentType<{ size: number }>;
}> = {
  VERIFIED: { label: 'VERIFIED', className: 'badge-verified', icon: CheckCircle },
  SUSPICIOUS: { label: 'SUSPICIOUS', className: 'badge-suspicious', icon: AlertTriangle },
  POSSIBLE_COUNTERFEIT: { label: 'COUNTERFEIT', className: 'badge-counterfeit', icon: XCircle },
  PENDING: { label: 'PENDING', className: 'badge-pending', icon: Clock },
};

const sizeMap = {
  sm: 12,
  md: 13,
  lg: 14,
};

export default function StatusBadge({ status, showIcon = true, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const iconSize = sizeMap[size];

  return (
    <span className={config.className}>
      {showIcon && <Icon size={iconSize} />}
      {config.label}
    </span>
  );
}
