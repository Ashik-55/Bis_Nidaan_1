import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Package, MapPin, Calendar, Hash, Award,
  ShieldCheck, CheckCircle, Clock, XCircle, AlertTriangle,
  ScanLine, BookOpen, ClipboardCheck, ExternalLink,
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import TrustScore from '../components/common/TrustScore';
import { EmptyState } from '../components/common/EmptyState';
import { useProducts } from '../hooks/useProducts';
import { getTrustBreakdown } from '../utils/trustScore';

const eventIcons: Record<string, React.ComponentType<{ size: number; className?: string }>> = {
  completed: CheckCircle,
  pending: Clock,
  failed: XCircle,
};

const eventColors: Record<string, string> = {
  completed: 'text-green-600 bg-green-50',
  pending: 'text-amber-600 bg-amber-50',
  failed: 'text-red-600 bg-red-50',
};

const verifyChecks = [
  { key: 'IDENTITY', label: 'Identity', statusKey: 'identity' },
  { key: 'CERTIFICATION', label: 'Certification', statusKey: 'certification' },
  { key: 'BATCH', label: 'Batch', statusKey: 'batch' },
  { key: 'EXPIRY', label: 'Expiry', statusKey: 'sourceEvidence' },
  { key: 'RECALL', label: 'Recall Check', statusKey: 'traceability' },
];

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="btn-secondary text-sm mb-6">
          <ArrowLeft size={14} /> Back
        </button>
        <EmptyState
          icon={<Package size={28} />}
          title="Product not found"
          description={`No product found with ID "${id}". Try one of the demo products below.`}
          action={
            <div className="flex flex-wrap gap-2 justify-center">
              {['BIS-PROD-10001', 'BIS-PROD-10002', 'BIS-PROD-10003'].map(demoId => (
                <Link key={demoId} to={`/products/${demoId}`} className="btn-secondary text-xs">
                  {demoId}
                </Link>
              ))}
            </div>
          }
        />
      </div>
    );
  }

  const breakdown = getTrustBreakdown(product);

  const verifiedColor = product.status === 'VERIFIED'
    ? 'bg-green-50 border-green-200'
    : product.status === 'SUSPICIOUS'
    ? 'bg-amber-50 border-amber-200'
    : product.status === 'POSSIBLE_COUNTERFEIT'
    ? 'bg-red-50 border-red-200'
    : 'bg-gray-50 border-gray-200';

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Back + header */}
      <div>
        <button onClick={() => navigate(-1)} className="btn-secondary text-sm mb-4">
          <ArrowLeft size={14} /> Back to Products
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="page-title">{product.name}</h1>
              <StatusBadge status={product.status} size="lg" />
            </div>
            <p className="text-sm text-gray-500 font-mono">{product.id}</p>
          </div>
          <div className="flex gap-2">
            <Link to={`/verify?q=${product.id}`} className="btn-primary text-sm">
              <ScanLine size={14} /> Verify
            </Link>
            <Link to={`/standards?q=${product.category}`} className="btn-secondary text-sm">
              <BookOpen size={14} /> Standards
            </Link>
            <Link to={`/compliance?standard=${product.standard}`} className="btn-secondary text-sm">
              <ClipboardCheck size={14} /> Compliance
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left col — Product Info */}
        <div className="lg:col-span-2 space-y-5">
          {/* Basic info card */}
          <div className="card p-5">
            <div className="flex gap-5">
              {/* Product image placeholder */}
              <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 flex items-center justify-center">
                <Package size={32} className="text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-gray-900 mb-3">{product.name}</h2>
                {product.description && (
                  <p className="text-sm text-gray-500 mb-3 leading-relaxed">{product.description}</p>
                )}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {[
                    { icon: Hash, label: 'Digital Product ID', value: product.id },
                    { icon: Package, label: 'Category', value: product.category },
                    { icon: Award, label: 'Indian Standard', value: product.standard },
                    { icon: ShieldCheck, label: 'Certification', value: product.certificationStatus },
                    { icon: MapPin, label: 'Manufacturer State', value: product.manufacturerState || '—' },
                    { icon: Hash, label: 'Batch Number', value: product.batchNumber },
                    { icon: Calendar, label: 'Manufacturing Date', value: product.manufacturingDate },
                    { icon: Calendar, label: 'Expiry Date', value: product.expiryDate },
                  ].map(row => {
                    const Icon = row.icon;
                    return (
                      <div key={row.label} className="flex items-start gap-2">
                        <Icon size={13} className="text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-gray-400">{row.label}</div>
                          <div className="text-xs font-semibold text-gray-700 font-mono">{row.value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Manufacturer */}
            <div className="mt-4 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Package size={14} className="text-gray-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Manufacturer</div>
                  <div className="text-sm font-semibold text-gray-800">{product.manufacturer}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recall status */}
          <div className={`rounded-xl border p-4 ${verifiedColor}`}>
            <div className="flex items-center gap-2">
              {product.recallStatus?.startsWith('RECALLED') ? (
                <AlertTriangle size={18} className="text-red-600" />
              ) : (
                <CheckCircle size={18} className="text-green-600" />
              )}
              <span className="font-semibold text-sm text-gray-800">Recall Status:</span>
              <span className="text-sm font-bold">{product.recallStatus || 'No active recall'}</span>
            </div>
          </div>

          {/* Verification checks */}
          <div className="card p-5">
            <h3 className="font-bold text-gray-900 mb-4">Verification Checks</h3>
            <div className="flex flex-wrap gap-3">
              {verifyChecks.map(check => {
                const score = breakdown[check.statusKey as keyof typeof breakdown];
                const ok = score >= 70;
                return (
                  <div key={check.key} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold ${ok ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                    {ok ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    {check.label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Verification Timeline */}
          {product.verificationHistory && product.verificationHistory.length > 0 && (
            <div className="card p-5">
              <h3 className="font-bold text-gray-900 mb-4">Verification Timeline</h3>
              <div className="space-y-0">
                {product.verificationHistory.map((event, idx) => {
                  const Icon = eventIcons[event.status];
                  const colorClass = eventColors[event.status];
                  return (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                          <Icon size={14} className={colorClass.split(' ')[0]} />
                        </div>
                        {idx < product.verificationHistory!.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-100 my-1" />
                        )}
                      </div>
                      <div className="pb-4 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-800">{event.event}</span>
                          {event.date && <span className="text-xs text-gray-400">{event.date}</span>}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{event.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right col — Trust Score + Standard */}
        <div className="space-y-5">
          {/* Trust Score */}
          <div className="card p-5 flex flex-col items-center">
            <h3 className="font-bold text-gray-900 mb-5 self-start">Trust Score</h3>
            <TrustScore
              score={product.trustScore}
              size="lg"
              showBreakdown
              breakdown={breakdown}
            />
          </div>

          {/* Standard info */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">Applicable Standard</h3>
              <Link to={`/standards?q=${product.category}`} className="text-blue-600 hover:text-blue-800">
                <ExternalLink size={14} />
              </Link>
            </div>
            <div className="bg-blue-50 rounded-lg px-4 py-3 border border-blue-100 mb-3">
              <div className="text-xl font-bold text-blue-800">{product.standard}</div>
              <div className="text-xs text-blue-600 mt-0.5">Mandatory Certification Required</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Certification Number</span>
                <span className="font-mono font-semibold text-gray-700">{product.certificationNumber}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Status</span>
                <span className={`font-semibold ${product.certificationStatus === 'Certified' ? 'text-green-600' : 'text-amber-600'}`}>
                  {product.certificationStatus}
                </span>
              </div>
            </div>
            <Link
              to={`/compliance?standard=${product.standard}`}
              className="btn-secondary text-xs w-full mt-4 justify-center"
            >
              <ClipboardCheck size={13} />
              Compliance Guidance
            </Link>
          </div>

          {/* Certification badge */}
          <div className="card p-4 bg-blue-900 text-white">
            <div className="text-center">
              <div className="text-xs text-blue-300 mb-1">BIS NIDAAN DEMO</div>
              <div className="text-2xl font-bold">{product.trustScore}/100</div>
              <div className="text-blue-200 text-sm mt-0.5">Trust Score</div>
              <div className="mt-3 pt-3 border-t border-blue-700 text-xs text-blue-300">
                Not an official BIS certificate
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
