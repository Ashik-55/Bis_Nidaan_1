import { CheckCircle, AlertTriangle, Database } from 'lucide-react';
import type { EvidenceItem } from '../../types/Assistant';

interface EvidenceCardProps {
  evidence: EvidenceItem;
}

export default function EvidenceCard({ evidence }: EvidenceCardProps) {
  return (
    <div className="border border-gray-100 rounded-lg p-3 bg-blue-50/40 hover:bg-blue-50/70 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {evidence.verified ? (
            <CheckCircle size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
          )}
          <span className="text-xs font-bold text-blue-800">
            {evidence.standardCode}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: evidence.confidence >= 80 ? '#dcfce7' : evidence.confidence >= 60 ? '#fef3c7' : '#fee2e2',
              color: evidence.confidence >= 80 ? '#16a34a' : evidence.confidence >= 60 ? '#d97706' : '#dc2626',
            }}
          >
            {evidence.confidence}% match
          </div>
        </div>
      </div>

      {/* Title */}
      <p className="text-xs font-semibold text-gray-800 mb-1">{evidence.title}</p>

      {/* Description */}
      <p className="text-xs text-gray-600 mb-2">{evidence.description}</p>

      {/* Source */}
      <div className="flex items-center gap-1.5 pt-2 border-t border-blue-100">
        <Database size={11} className="text-blue-400" />
        <span className="text-xs text-blue-600 font-medium">{evidence.source}</span>
        {evidence.clause && (
          <>
            <span className="text-blue-200">·</span>
            <span className="text-xs text-blue-500">{evidence.clause}</span>
          </>
        )}
      </div>

      {/* Demo label */}
      <div className="mt-2">
        <span className="text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-medium">
          DEMO SOURCE — NOT OFFICIAL
        </span>
      </div>
    </div>
  );
}
