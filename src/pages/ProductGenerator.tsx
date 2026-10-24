import { useState } from 'react';
import {
  BarChart3, RefreshCw, Download, Copy, Check,
  Trash2, FlaskConical, CheckCircle,
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { generateProducts, exportToCSV, downloadCSV, downloadJSON } from '../utils/productGenerator';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../types/Product';

const COUNTS = [10, 25, 50, 100];
const CATEGORIES = ['All', 'Electrical', 'Electrical Appliance', 'Food', 'Kitchen Appliance', 'Consumer Product', 'Textiles', 'Construction', 'Electronics'];
const STATUSES = ['Random', 'VERIFIED', 'SUSPICIOUS', 'PENDING', 'POSSIBLE_COUNTERFEIT'];

export default function ProductGenerator() {
  const { bulkAdd, clearGenerated, generatedProducts } = useProducts();
  const [count, setCount] = useState(10);
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('Random');
  const [generated, setGenerated] = useState<Product[]>([]);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleGenerate = () => {
    const products = generateProducts(count, category, status);
    setGenerated(products);
    setSaved(false);
  };

  const handleSaveToDb = () => {
    bulkAdd(generated);
    setSaved(true);
  };

  const handleClear = () => {
    setGenerated([]);
    clearGenerated();
    setSaved(false);
  };

  const handleExportCSV = () => {
    if (generated.length === 0) return;
    downloadCSV(exportToCSV(generated), `bis-nidaan-products-${Date.now()}.csv`);
  };

  const handleExportJSON = () => {
    if (generated.length === 0) return;
    downloadJSON(generated, `bis-nidaan-products-${Date.now()}.json`);
  };

  const handleCopyJSON = async () => {
    if (generated.length === 0) return;
    await navigator.clipboard.writeText(JSON.stringify(generated, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Sample Product Matrix Generator</h1>
          <p className="text-sm text-gray-500 mt-1">Generate realistic mock product datasets for demonstrating BIS NIDAAN.</p>
        </div>
        <span className="demo-badge">
          <FlaskConical size={12} />
          Developer Tool
        </span>
      </div>

      {/* Controls */}
      <div className="card p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {/* Count */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Number of Products</label>
            <div className="flex gap-2">
              {COUNTS.map(c => (
                <button
                  key={c}
                  onClick={() => setCount(c)}
                  className={`flex-1 py-1.5 text-sm font-semibold rounded-lg border transition-all ${
                    count === c ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="select-field">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Status Filter</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="select-field">
              {STATUSES.map(s => <option key={s} value={s}>{s === 'POSSIBLE_COUNTERFEIT' ? 'Possible Counterfeit' : s}</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={handleGenerate} className="btn-primary">
            <BarChart3 size={15} />
            Generate Dataset
          </button>
          <button onClick={handleGenerate} className="btn-secondary" disabled={generated.length === 0}>
            <RefreshCw size={15} />
            Regenerate
          </button>
          {generated.length > 0 && !saved && (
            <button onClick={handleSaveToDb} className="btn-secondary">
              <CheckCircle size={15} className="text-green-600" />
              Save to Product DB
            </button>
          )}
          {saved && (
            <span className="flex items-center gap-2 text-sm text-green-600 font-medium">
              <Check size={14} /> Saved to database!
            </span>
          )}
          <div className="flex-1" />
          <button onClick={handleExportCSV} className="btn-secondary text-sm" disabled={generated.length === 0}>
            <Download size={14} /> Export CSV
          </button>
          <button onClick={handleExportJSON} className="btn-secondary text-sm" disabled={generated.length === 0}>
            <Download size={14} /> Export JSON
          </button>
          <button onClick={handleCopyJSON} className="btn-secondary text-sm" disabled={generated.length === 0}>
            <Copy size={14} /> {copied ? 'Copied!' : 'Copy JSON'}
          </button>
          <button onClick={handleClear} className="btn-danger text-sm" disabled={generated.length === 0}>
            <Trash2 size={14} /> Clear
          </button>
        </div>
      </div>

      {/* Status summary */}
      {generated.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {(['VERIFIED', 'SUSPICIOUS', 'PENDING', 'POSSIBLE_COUNTERFEIT'] as const).map(s => {
            const count = generated.filter(p => p.status === s).length;
            if (count === 0) return null;
            return (
              <div key={s} className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-3 py-1.5">
                <StatusBadge status={s} showIcon={false} size="sm" />
                <span className="text-sm font-bold text-gray-700">{count}</span>
              </div>
            );
          })}
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-1.5">
            <span className="text-xs text-blue-600 font-semibold">Total: {generated.length}</span>
          </div>
          {generatedProducts.length > 0 && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-lg px-3 py-1.5">
              <span className="text-xs text-green-600 font-semibold">{generatedProducts.length} saved in DB</span>
            </div>
          )}
        </div>
      )}

      {/* Table */}
      {generated.length > 0 ? (
        <div className="card overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-50 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Generated Dataset — {generated.length} products</span>
            <span className="text-xs text-amber-600 bg-amber-50 border border-amber-100 px-2 py-1 rounded">DEMO DATA</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80 border-b border-gray-100">
                <tr>
                  {['Product ID', 'Product Name', 'Manufacturer', 'Category', 'Batch', 'Standard', 'Cert #', 'Status', 'Trust', 'Mfg Date', 'Expiry'].map(col => (
                    <th key={col} className="table-header whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {generated.map(product => (
                  <tr key={product.id} className="table-row">
                    <td className="table-cell"><span className="font-mono text-xs text-blue-700 font-semibold">{product.id}</span></td>
                    <td className="table-cell text-xs font-medium max-w-32">{product.name}</td>
                    <td className="table-cell text-xs text-gray-500 max-w-32">{product.manufacturer}</td>
                    <td className="table-cell text-xs text-gray-500">{product.category}</td>
                    <td className="table-cell"><span className="font-mono text-xs">{product.batchNumber}</span></td>
                    <td className="table-cell"><span className="font-mono text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{product.standard}</span></td>
                    <td className="table-cell"><span className="font-mono text-xs text-gray-500">{product.certificationNumber.slice(0, 12)}…</span></td>
                    <td className="table-cell"><StatusBadge status={product.status} size="sm" showIcon={false} /></td>
                    <td className="table-cell">
                      <span
                        className="text-xs font-bold"
                        style={{ color: product.trustScore >= 80 ? '#16a34a' : product.trustScore >= 60 ? '#d97706' : '#dc2626' }}
                      >
                        {product.trustScore}
                      </span>
                    </td>
                    <td className="table-cell text-xs text-gray-500">{product.manufacturingDate}</td>
                    <td className="table-cell text-xs text-gray-500">{product.expiryDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center mx-auto mb-4">
            <BarChart3 size={28} className="text-gray-300" />
          </div>
          <p className="text-gray-400 text-sm">Click "Generate Dataset" to create sample product data</p>
          <p className="text-xs text-gray-300 mt-1">Generated data can be exported as CSV or JSON</p>
        </div>
      )}
    </div>
  );
}
