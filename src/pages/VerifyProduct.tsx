import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ScanLine, Keyboard, Search, CheckCircle, AlertTriangle,
  XCircle, Shield, Hash, ExternalLink, RefreshCw, BookOpen, ClipboardCheck, Bot,
} from 'lucide-react';
import TrustScore from '../components/common/TrustScore';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../types/Product';

type Method = 'scan' | 'manual';
type Stage = 'idle' | 'loading' | 'result' | 'notfound';

const DEMO_IDS = ['BIS-PROD-10001', 'BIS-PROD-10002', 'BIS-PROD-10003', 'BIS-PROD-10008'];

const statusConfig = {
  VERIFIED: {
    bg: 'bg-green-50 border-green-200',
    header: 'bg-green-600',
    icon: CheckCircle,
    label: '✓ PRODUCT VERIFIED',
    textColor: 'text-green-700',
  },
  SUSPICIOUS: {
    bg: 'bg-amber-50 border-amber-200',
    header: 'bg-amber-600',
    icon: AlertTriangle,
    label: '⚠ SUSPICIOUS PRODUCT',
    textColor: 'text-amber-700',
  },
  POSSIBLE_COUNTERFEIT: {
    bg: 'bg-red-50 border-red-200',
    header: 'bg-red-600',
    icon: XCircle,
    label: '✗ POSSIBLE COUNTERFEIT',
    textColor: 'text-red-700',
  },
  PENDING: {
    bg: 'bg-gray-50 border-gray-200',
    header: 'bg-gray-500',
    icon: Shield,
    label: '⏳ VERIFICATION PENDING',
    textColor: 'text-gray-700',
  },
};

export default function VerifyProduct() {
  const [searchParams] = useSearchParams();
  const { getProductById } = useProducts();

  const [method, setMethod] = useState<Method>('manual');
  const [productId, setProductId] = useState(searchParams.get('q') || '');
  const [stage, setStage] = useState<Stage>('idle');
  const [result, setResult] = useState<Product | null>(null);
  const [scanSim, setScanSim] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setProductId(q);
      doVerify(q);
    }
  }, []);

  const doVerify = (id: string) => {
    const trimmed = id.trim().toUpperCase();
    if (!trimmed) return;
    setStage('loading');
    setResult(null);

    setTimeout(() => {
      const found = getProductById(trimmed);
      if (found) {
        setResult(found);
        setStage('result');
      } else {
        setStage('notfound');
      }
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doVerify(productId);
  };

  const simulateScan = () => {
    setScanSim(true);
    setTimeout(() => {
      setScanSim(false);
      const demoId = DEMO_IDS[Math.floor(Math.random() * DEMO_IDS.length)];
      setProductId(demoId);
      doVerify(demoId);
    }, 2000);
  };

  const reset = () => {
    setStage('idle');
    setResult(null);
    setProductId('');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="page-title">Verify a Product</h1>
        <p className="text-sm text-gray-500 mt-1">
          Scan a DataMatrix code or enter a Digital Product ID to verify authenticity and BIS certification.
        </p>
      </div>

      {/* Method selector */}
      <div className="flex gap-2">
        {([
          { value: 'scan', label: 'Scan DataMatrix', icon: ScanLine },
          { value: 'manual', label: 'Enter Product ID', icon: Keyboard },
        ] as const).map(m => {
          const Icon = m.icon;
          return (
            <button
              key={m.value}
              onClick={() => { setMethod(m.value); reset(); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                method === m.value
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
              }`}
            >
              <Icon size={15} />
              {m.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input panel */}
        <div className="space-y-4">
          {method === 'scan' ? (
            <div className="card p-6 text-center">
              <div
                onClick={simulateScan}
                className={`relative w-48 h-48 mx-auto border-2 ${scanSim ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300 hover:border-blue-400'} rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all mb-4`}
              >
                {scanSim ? (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 animate-[scanline_1.5s_ease-in-out_infinite]" style={{ animationName: 'scanPulse' }} />
                    <ScanLine size={40} className="text-blue-500 animate-pulse" />
                    <p className="text-sm text-blue-600 font-medium mt-2">Scanning...</p>
                  </>
                ) : (
                  <>
                    <ScanLine size={40} className="text-gray-300" />
                    <p className="text-sm text-gray-400 mt-2">Click to simulate scan</p>
                    <p className="text-xs text-gray-300 mt-1">Demo mode</p>
                  </>
                )}
              </div>
              <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                DEMO: Camera scanning simulated with random demo product
              </p>
            </div>
          ) : (
            <div className="card p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Digital Product ID
                  </label>
                  <div className="relative">
                    <Hash size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={productId}
                      onChange={e => setProductId(e.target.value.toUpperCase())}
                      placeholder="BIS-PROD-10001"
                      className="input-field pl-9 font-mono"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Format: BIS-PROD-XXXXX</p>
                </div>
                <button
                  type="submit"
                  disabled={!productId.trim() || stage === 'loading'}
                  className="btn-primary w-full justify-center py-3"
                >
                  {stage === 'loading' ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Verifying...</>
                  ) : (
                    <><Search size={15} /> Verify Product</>
                  )}
                </button>
              </form>

              {/* Demo IDs */}
              <div className="mt-4 pt-4 border-t border-gray-50">
                <p className="text-xs text-gray-400 mb-2">Try demo products:</p>
                <div className="flex flex-wrap gap-2">
                  {DEMO_IDS.map(id => (
                    <button
                      key={id}
                      onClick={() => { setProductId(id); doVerify(id); }}
                      className="text-xs font-mono px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Result panel */}
        <div>
          {stage === 'idle' && (
            <div className="card p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                <Shield size={28} className="text-blue-400" />
              </div>
              <p className="text-gray-500 text-sm">Enter a Product ID or scan a DataMatrix code to verify</p>
            </div>
          )}

          {stage === 'loading' && (
            <div className="card p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-2 border-blue-700 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-500 text-sm">Verifying product identity...</p>
              <p className="text-xs text-gray-400 mt-1">Checking BIS certification records</p>
            </div>
          )}

          {stage === 'notfound' && (
            <div className="card p-6">
              <div className="text-center">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <XCircle size={28} className="text-red-500" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Product Not Found</h3>
                <p className="text-sm text-gray-500 mb-4">No product with ID <span className="font-mono font-semibold">{productId}</span> found in the database.</p>
                <button onClick={reset} className="btn-secondary text-sm mx-auto">
                  <RefreshCw size={13} /> Try Another ID
                </button>
                <div className="mt-4 pt-4 border-t border-gray-50">
                  <p className="text-xs text-gray-400 mb-2">Try demo products:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['BIS-PROD-10001', 'BIS-PROD-10002', 'BIS-PROD-10003'].map(id => (
                      <button key={id} onClick={() => { setProductId(id); doVerify(id); }} className="text-xs font-mono px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded">
                        {id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {stage === 'result' && result && (() => {
            const cfg = statusConfig[result.status];
            const Icon = cfg.icon;
            return (
              <div className={`card border-2 ${cfg.bg} animate-fade-in-up overflow-hidden`}>
                {/* Status header */}
                <div className={`${cfg.header} px-5 py-3 flex items-center gap-2`}>
                  <Icon size={18} className="text-white" />
                  <span className="text-white font-bold text-sm">{cfg.label}</span>
                </div>

                <div className="p-5 space-y-4">
                  {/* Product info */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Product', value: result.name },
                      { label: 'Manufacturer', value: result.manufacturer },
                      { label: 'Standard', value: result.standard },
                      { label: 'Batch Number', value: result.batchNumber },
                      { label: 'Expiry Date', value: result.expiryDate },
                      { label: 'Recall Status', value: result.recallStatus || 'No active recall' },
                    ].map(item => (
                      <div key={item.label}>
                        <div className="text-xs text-gray-500">{item.label}</div>
                        <div className="text-sm font-semibold text-gray-800">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Trust score */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500">Trust Score</div>
                      <div className="text-2xl font-bold text-gray-900">{result.trustScore}<span className="text-sm text-gray-400 font-normal">/100</span></div>
                    </div>
                    <TrustScore score={result.trustScore} size="sm" />
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                    <Link to={`/products/${result.id}`} className="btn-secondary text-xs flex-1 justify-center">
                      <ExternalLink size={12} /> Full Details
                    </Link>
                    <Link to={`/standards?q=${result.category}`} className="btn-secondary text-xs flex-1 justify-center">
                      <BookOpen size={12} /> View Standard
                    </Link>
                    <Link to={`/compliance?standard=${result.standard}`} className="btn-secondary text-xs flex-1 justify-center">
                      <ClipboardCheck size={12} /> Compliance
                    </Link>
                  </div>

                  {/* AI Assistant CTA */}
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bot size={14} className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Ask AI Assistant</p>
                        <p className="text-xs text-gray-500">Get answers about this product's standards &amp; compliance</p>
                      </div>
                    </div>
                    <div className="space-y-1.5 mb-3">
                      {[
                        `What standard applies to ${result.name}?`,
                        `What certification is required for ${result.standard}?`,
                        `Is ${result.name} safe to use?`,
                      ].map(q => (
                        <Link
                          key={q}
                          to={`/assistant?product=${encodeURIComponent(result.name)}&standard=${encodeURIComponent(result.standard)}&q=${encodeURIComponent(q)}`}
                          className="flex items-center gap-2 text-xs text-blue-700 bg-white border border-blue-100 rounded-lg px-3 py-2 hover:bg-blue-100 hover:border-blue-300 transition-all w-full text-left"
                        >
                          <Bot size={11} className="flex-shrink-0 text-blue-400" />
                          {q}
                        </Link>
                      ))}
                    </div>
                    <Link
                      to={`/assistant?product=${encodeURIComponent(result.name)}&standard=${encodeURIComponent(result.standard)}&productId=${encodeURIComponent(result.id)}`}
                      className="btn-primary text-xs w-full justify-center py-2"
                    >
                      <Bot size={13} /> Open AI Assistant with this product
                    </Link>
                  </div>

                  <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-600 w-full text-center">
                    Verify another product
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
