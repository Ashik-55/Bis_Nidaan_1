import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  QrCode, Download, Copy, ScanLine, CheckCircle,
  AlertTriangle, RefreshCw, FlaskConical,
} from 'lucide-react';
import { generateProductId, buildPayload, encodePayload, renderDataMatrix, downloadCanvas } from '../utils/dataMatrix';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../types/Product';

const CATEGORIES = ['Electrical Appliance', 'Electrical', 'Kitchen Appliance', 'Consumer Product', 'Food', 'Textiles', 'Construction', 'Electronics', 'Safety'];

interface FormData {
  productName: string;
  manufacturer: string;
  category: string;
  batchNumber: string;
  manufacturingDate: string;
  expiryDate: string;
  certificationNumber: string;
  standard: string;
}

const initialForm: FormData = {
  productName: 'ABC Smart Electric Kettle',
  manufacturer: 'Nova Appliances Pvt Ltd',
  category: 'Electrical Appliance',
  batchNumber: 'B24091',
  manufacturingDate: '2024-09-01',
  expiryDate: '2028-09-30',
  certificationNumber: 'CM/L-1234567890',
  standard: 'IS 302',
};

export default function DataMatrixGenerator() {
  const navigate = useNavigate();
  const { allProducts, addProduct } = useProducts();
  const [form, setForm] = useState<FormData>(initialForm);
  const [generated, setGenerated] = useState<{ productId: string; payload: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleGenerate = async () => {
    if (!form.productName || !form.manufacturer || !form.batchNumber || !form.standard) {
      setError('Please fill in Product Name, Manufacturer, Batch Number, and Standard.');
      return;
    }
    setError('');
    setLoading(true);

    const newId = generateProductId(allProducts.filter(p => p.isGenerated).length);
    const payload = buildPayload({
      productId: newId,
      productName: form.productName,
      manufacturer: form.manufacturer,
      batch: form.batchNumber,
      standard: form.standard,
      certification: form.certificationNumber,
      manufacturingDate: form.manufacturingDate,
      expiryDate: form.expiryDate,
    });

    const payloadStr = encodePayload(payload);
    setGenerated({ productId: newId, payload: payloadStr });

    // Save to products
    const newProduct: Product = {
      id: newId,
      name: form.productName,
      manufacturer: form.manufacturer,
      category: form.category,
      batchNumber: form.batchNumber,
      standard: form.standard,
      certificationNumber: form.certificationNumber,
      certificationStatus: form.certificationNumber ? 'Certified' : 'Pending',
      status: 'VERIFIED',
      trustScore: 94,
      manufacturingDate: form.manufacturingDate,
      expiryDate: form.expiryDate,
      isGenerated: true,
      recallStatus: 'No active recall',
      trustBreakdown: {
        identity: 100,
        certification: 95,
        batch: 100,
        sourceEvidence: 92,
        traceability: 90,
      },
      verificationHistory: [
        { id: 'v1', event: 'Product Created', date: new Date().toISOString().split('T')[0], status: 'completed', description: 'Generated via BIS NIDAAN DataMatrix Generator' },
        { id: 'v2', event: 'Manufacturer Registered', date: new Date().toISOString().split('T')[0], status: 'completed', description: `${form.manufacturer} registered` },
        { id: 'v3', event: 'Certification Added', date: new Date().toISOString().split('T')[0], status: 'completed', description: `${form.standard} certification added` },
        { id: 'v4', event: 'Batch Verified', date: new Date().toISOString().split('T')[0], status: 'completed', description: `Batch ${form.batchNumber} verified` },
      ],
    };
    addProduct(newProduct);

    setLoading(false);
  };

  useEffect(() => {
    if (generated && canvasRef.current) {
      // Render DataMatrix into canvas
      const shortPayload = JSON.stringify({
        id: generated.productId,
        batch: form.batchNumber,
        std: form.standard,
        cert: form.certificationNumber.slice(0, 15),
      });
      renderDataMatrix(canvasRef.current, shortPayload).catch(e => {
        console.warn('DataMatrix render failed, using fallback', e);
      });
    }
  }, [generated]);

  const handleCopy = async () => {
    if (generated) {
      await navigator.clipboard.writeText(generated.productId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (canvasRef.current && generated) {
      downloadCanvas(canvasRef.current, `${generated.productId}-datamatrix.png`);
    }
  };

  const handleVerify = () => {
    if (generated) navigate(`/verify?q=${generated.productId}`);
  };

  const handleReset = () => {
    setGenerated(null);
    setForm(initialForm);
    setError('');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Digital Product ID Generator</h1>
          <p className="text-sm text-gray-500 mt-1">Generate a sample product identity and DataMatrix code for demonstration.</p>
        </div>
        <span className="demo-badge">
          <FlaskConical size={12} />
          DEMO DATA
        </span>
      </div>

      {/* Demo notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-center gap-3">
        <AlertTriangle size={16} className="text-amber-600 flex-shrink-0" />
        <p className="text-xs text-amber-700">
          <strong>DEMO ONLY:</strong> This tool generates sample product identities for prototype demonstration. Generated IDs are not official BIS registrations or GS1-issued identifiers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="card p-6">
          <h2 className="font-bold text-gray-900 mb-5">Product Information</h2>
          <div className="space-y-4">
            {[
              { field: 'productName' as const, label: 'Product Name *', placeholder: 'ABC Smart Electric Kettle', type: 'text' },
              { field: 'manufacturer' as const, label: 'Manufacturer *', placeholder: 'Nova Appliances Pvt Ltd', type: 'text' },
              { field: 'batchNumber' as const, label: 'Batch Number *', placeholder: 'B24091', type: 'text' },
              { field: 'standard' as const, label: 'Applicable Standard *', placeholder: 'IS 302', type: 'text' },
              { field: 'certificationNumber' as const, label: 'Certification Number', placeholder: 'CM/L-1234567890', type: 'text' },
              { field: 'manufacturingDate' as const, label: 'Manufacturing Date', placeholder: '', type: 'date' },
              { field: 'expiryDate' as const, label: 'Expiry Date', placeholder: '', type: 'date' },
            ].map(({ field, label, placeholder, type }) => (
              <div key={field}>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
                <input
                  type={type}
                  value={form[field]}
                  onChange={handleChange(field)}
                  placeholder={placeholder}
                  className="input-field"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category</label>
              <select value={form.category} onChange={handleChange('category')} className="select-field">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-xs text-red-700">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="btn-orange w-full justify-center py-3"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Generating...</>
              ) : (
                <><QrCode size={16} /> Generate Product ID</>
              )}
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="space-y-4">
          {!generated ? (
            <div className="card p-8 text-center flex flex-col items-center justify-center min-h-80">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center mb-4">
                <QrCode size={36} className="text-gray-300" />
              </div>
              <p className="text-gray-400 text-sm">Fill in the form and click "Generate Product ID"</p>
            </div>
          ) : (
            <>
              {/* Generated ID */}
              <div className="card p-5 bg-blue-900 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-sm font-semibold text-green-300">Digital Product ID Generated</span>
                  </div>
                  <span className="text-xs bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded font-medium">DEMO</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white mb-1">{generated.productId}</div>
                <div className="text-blue-300 text-xs">BIS NIDAAN Demo Identifier — Not an official BIS registration</div>
              </div>

              {/* DataMatrix */}
              <div className="card p-5 text-center">
                <h3 className="font-bold text-gray-900 mb-1 text-sm">DataMatrix Code</h3>
                <p className="text-xs text-gray-400 mb-4">GS1 DataMatrix-style (Demo)</p>
                <div className="flex justify-center mb-4">
                  <div className="border-2 border-gray-200 rounded-xl p-3 bg-white inline-block">
                    <canvas ref={canvasRef} />
                  </div>
                </div>
                <p className="text-xs text-amber-600 mb-4">DEMO CODE — Not a production GS1-issued DataMatrix</p>
                <div className="flex gap-2">
                  <button onClick={handleDownload} className="btn-secondary text-xs flex-1 justify-center">
                    <Download size={13} /> Download PNG
                  </button>
                  <button onClick={handleCopy} className="btn-secondary text-xs flex-1 justify-center">
                    <Copy size={13} /> {copied ? 'Copied!' : 'Copy ID'}
                  </button>
                  <button onClick={handleVerify} className="btn-primary text-xs flex-1 justify-center">
                    <ScanLine size={13} /> Verify
                  </button>
                </div>
              </div>

              {/* Encoded payload */}
              <div className="card p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-3">Encoded Payload</h3>
                <pre className="text-xs bg-gray-50 border border-gray-100 rounded-lg p-3 overflow-x-auto text-gray-700 max-h-48">
                  {generated.payload}
                </pre>
              </div>

              <button onClick={handleReset} className="btn-secondary text-sm w-full justify-center">
                <RefreshCw size={13} /> Generate Another
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
