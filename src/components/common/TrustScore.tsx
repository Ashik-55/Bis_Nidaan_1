import { getTrustLevel } from '../../utils/trustScore';

interface TrustScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showBreakdown?: boolean;
  breakdown?: {
    identity: number;
    certification: number;
    batch: number;
    sourceEvidence: number;
    traceability: number;
  };
}

const sizeConfig = {
  sm: { radius: 28, strokeWidth: 5, fontSize: 'text-lg', labelSize: 'text-xs' },
  md: { radius: 42, strokeWidth: 7, fontSize: 'text-2xl', labelSize: 'text-xs' },
  lg: { radius: 56, strokeWidth: 8, fontSize: 'text-3xl', labelSize: 'text-sm' },
};

export default function TrustScore({ score, size = 'md', showBreakdown = false, breakdown }: TrustScoreProps) {
  const config = sizeConfig[size];
  const { level, color } = getTrustLevel(score);
  const circumference = 2 * Math.PI * config.radius;
  const dashOffset = circumference - (score / 100) * circumference;
  const viewBoxSize = (config.radius + config.strokeWidth + 4) * 2;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Ring */}
      <div className="relative">
        <svg
          width={viewBoxSize}
          height={viewBoxSize}
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        >
          {/* Background ring */}
          <circle
            cx={viewBoxSize / 2}
            cy={viewBoxSize / 2}
            r={config.radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={config.strokeWidth}
          />
          {/* Score ring */}
          <circle
            cx={viewBoxSize / 2}
            cy={viewBoxSize / 2}
            r={config.radius}
            fill="none"
            stroke={color}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="trust-ring transition-all duration-700"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${config.fontSize} font-bold`} style={{ color }}>
            {score}
          </span>
          <span className={`${config.labelSize} text-gray-400 font-medium`}>/100</span>
        </div>
      </div>

      {/* Level label */}
      <span
        className="text-xs font-bold px-3 py-1 rounded-full"
        style={{ color, backgroundColor: getTrustLevel(score).bgColor }}
      >
        {level}
      </span>

      {/* Breakdown */}
      {showBreakdown && breakdown && (
        <div className="w-full space-y-2 mt-2">
          {[
            { label: 'Identity', value: breakdown.identity },
            { label: 'Certification', value: breakdown.certification },
            { label: 'Batch', value: breakdown.batch },
            { label: 'Source Evidence', value: breakdown.sourceEvidence },
            { label: 'Traceability', value: breakdown.traceability },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-28 flex-shrink-0">{item.label}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.value}%`,
                    backgroundColor: getTrustLevel(item.value).color,
                  }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-600 w-8 text-right">{item.value}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
