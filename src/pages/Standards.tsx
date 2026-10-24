import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, BookOpen, CheckCircle, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { standards } from '../data/standards';
import { EmptyState } from '../components/common/EmptyState';
import type { Standard } from '../types/Standard';

function matchStandards(query: string): Array<{ standard: Standard; matchPct: number; reasons: string[] }> {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return standards
    .map(std => {
      const kw = std.matchKeywords.filter(k => q.includes(k) || k.includes(q.split(' ')[0]));
      const titleMatch = std.title.toLowerCase().includes(q) || std.fullTitle.toLowerCase().includes(q);
      const catMatch = std.category.toLowerCase().includes(q);
      let score = 0;
      const reasons: string[] = [];
      if (kw.length > 0) { score += kw.length * 25; reasons.push(`Keyword match: ${kw.join(', ')}`); }
      if (titleMatch) { score += 20; reasons.push('Title match'); }
      if (catMatch) { score += 15; reasons.push('Category match'); }
      if (score > 0) reasons.push('Safety and performance requirements apply');
      return { standard: std, matchPct: Math.min(99, score), reasons };
    })
    .filter(r => r.matchPct > 0)
    .sort((a, b) => b.matchPct - a.matchPct);
}

function StandardCard({ result }: { result: { standard: Standard; matchPct: number; reasons: string[] } }) {
  const [expanded, setExpanded] = useState(false);
  const { standard: std, matchPct, reasons } = result;

  return (
    <div className="card p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xl font-bold text-blue-800 font-mono">{std.code}</span>
            <span className={`badge text-xs ${std.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              {std.status}
            </span>
            {std.certificationRequired && (
              <span className="badge bg-red-100 text-red-700 text-xs">Mandatory BIS Cert</span>
            )}
          </div>
          <p className="text-sm font-semibold text-gray-800">{std.title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{std.category} · {std.certificationBody}</p>
        </div>
        <div className="text-center flex-shrink-0">
          <div
            className="text-xl font-bold"
            style={{ color: matchPct >= 70 ? '#16a34a' : matchPct >= 40 ? '#d97706' : '#6b7280' }}
          >
            {matchPct}%
          </div>
          <div className="text-xs text-gray-400">match</div>
        </div>
      </div>

      {/* Match bar */}
      <div className="h-1.5 bg-gray-100 rounded-full mb-3">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${matchPct}%`,
            backgroundColor: matchPct >= 70 ? '#16a34a' : matchPct >= 40 ? '#d97706' : '#6b7280',
          }}
        />
      </div>

      <p className="text-xs text-gray-600 mb-3 leading-relaxed">{std.description}</p>

      {/* Why this standard */}
      <div className="bg-blue-50/60 rounded-lg px-3 py-2.5 mb-3">
        <p className="text-xs font-semibold text-blue-800 mb-1.5">Why this standard?</p>
        <ul className="space-y-0.5">
          {reasons.map((r, i) => (
            <li key={i} className="text-xs text-blue-700 flex items-center gap-1.5">
              <CheckCircle size={11} className="text-blue-500 flex-shrink-0" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Toggle details */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
      >
        {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        {expanded ? 'Hide' : 'Show'} details
      </button>

      {expanded && (
        <div className="mt-3 space-y-3 animate-fade-in">
          <div className="text-xs text-gray-600">
            <span className="font-semibold text-gray-700">Scope: </span>{std.scope}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1">Required Documents:</p>
            <ul className="space-y-0.5">
              {std.documents.slice(0, 4).map(d => (
                <li key={d} className="text-xs text-gray-500 flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1">Approved Testing Labs:</p>
            <div className="flex flex-wrap gap-1.5">
              {std.testingLabs.map(lab => (
                <span key={lab} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{lab}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded px-2 py-1.5">
            <AlertTriangle size={11} />
            DEMO DATA — For official information, consult BIS website
          </div>
        </div>
      )}
    </div>
  );
}

export default function Standards() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [submitted, setSubmitted] = useState(!!searchParams.get('q'));

  const results = submitted ? matchStandards(query) : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const suggestions = [
    'Electric kettle', 'Pressure cooker', 'LED bulb', 'Helmet', 'Cement', 'Water bottle', 'Basmati rice',
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="page-title">Indian Standard Mapper</h1>
        <p className="text-sm text-gray-500 mt-1">Find applicable Indian Standards based on your product description.</p>
      </div>

      {/* Search */}
      <div className="card p-5">
        <form onSubmit={handleSearch}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">What product do you want to check?</label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="e.g. Electric kettle, pressure cooker, LED bulb..."
                className="input-field pl-9"
              />
            </div>
            <button type="submit" className="btn-primary px-6">
              <Search size={15} /> Find Standard
            </button>
          </div>
        </form>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs text-gray-400">Try:</span>
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => { setQuery(s); setSubmitted(true); }}
              className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {submitted && (
        <div>
          {results.length === 0 ? (
            <EmptyState
              icon={<BookOpen size={28} />}
              title="No matching standards found"
              description="Try a different search term or browse suggestions above."
            />
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Found <strong>{results.length}</strong> matching standard{results.length !== 1 ? 's' : ''} for "{query}"
                </p>
                <span className="text-xs text-amber-600 bg-amber-50 border border-amber-100 px-2 py-1 rounded font-medium">DEMO RESULTS</span>
              </div>
              <div className="space-y-4">
                {results.map(r => (
                  <StandardCard key={r.standard.id} result={r} />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {!submitted && (
        <div className="card p-6">
          <h2 className="font-bold text-gray-900 mb-4">Browse All Standards ({standards.length} demo standards)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {standards.map(std => (
              <button
                key={std.id}
                onClick={() => { setQuery(std.matchKeywords[0]); setSubmitted(true); }}
                className="text-left border border-gray-100 rounded-lg p-3 hover:border-blue-300 hover:bg-blue-50/30 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-sm font-bold text-blue-700">{std.code}</span>
                  <span className={`badge text-xs ${std.certificationRequired ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                    {std.certificationRequired ? 'Mandatory' : 'Optional'}
                  </span>
                </div>
                <p className="text-xs text-gray-700 font-medium">{std.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{std.category}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
