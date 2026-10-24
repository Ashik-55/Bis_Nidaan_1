import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  color?: 'blue' | 'green' | 'amber' | 'red' | 'gray';
  trend?: { value: string; positive: boolean };
}

const colorMap = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100' },
  green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100' },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-600', border: 'border-amber-100' },
  red: { bg: 'bg-red-50', icon: 'text-red-600', border: 'border-red-100' },
  gray: { bg: 'bg-gray-50', icon: 'text-gray-600', border: 'border-gray-100' },
};

export default function StatCard({ title, value, subtitle, icon, color = 'blue', trend }: StatCardProps) {
  const colors = colorMap[color];

  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.bg} border ${colors.border}`}>
          <span className={colors.icon}>{icon}</span>
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-50">
          <span className={`text-xs font-semibold ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
          <span className="text-xs text-gray-400">vs last month</span>
        </div>
      )}
    </div>
  );
}
