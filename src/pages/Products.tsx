import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Eye, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { EmptyState } from '../components/common/EmptyState';
import { useProducts } from '../hooks/useProducts';

const CATEGORIES = ['All', 'Electrical Appliance', 'Electrical', 'Kitchen Appliance', 'Consumer Product', 'Food', 'Textiles', 'Construction', 'Electronics', 'Safety'];
const STATUSES: { label: string; value: string }[] = [
  { label: 'All Status', value: 'All' },
  { label: 'Verified', value: 'VERIFIED' },
  { label: 'Suspicious', value: 'SUSPICIOUS' },
  { label: 'Counterfeit', value: 'POSSIBLE_COUNTERFEIT' },
  { label: 'Pending', value: 'PENDING' },
];
const PAGE_SIZE = 10;

export default function Products() {
  const { allProducts } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return allProducts.filter(p => {
      const q = search.toLowerCase();
      const matchSearch = !q || p.id.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) || p.manufacturer.toLowerCase().includes(q);
      const matchCat = category === 'All' || p.category === category;
      const matchStatus = status === 'All' || p.status === status;
      return matchSearch && matchCat && matchStatus;
    });
  }, [allProducts, search, category, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (setter: (v: string) => void) => (v: string) => {
    setter(v);
    setPage(1);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Product Database</h1>
          <p className="text-sm text-gray-500 mt-1">{allProducts.length} products · {filtered.length} matching filters</p>
        </div>
        <Link to="/data-matrix" className="btn-primary text-sm">
          <Package size={14} />
          Register Product
        </Link>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, product name, or manufacturer..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="input-field pl-9"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={15} className="text-gray-400 flex-shrink-0" />
            <select value={category} onChange={e => handleFilter(setCategory)(e.target.value)} className="select-field w-auto">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={status} onChange={e => handleFilter(setStatus)(e.target.value)} className="select-field w-auto">
              {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/80 border-b border-gray-100">
              <tr>
                <th className="table-header">Product ID</th>
                <th className="table-header">Product</th>
                <th className="table-header hidden md:table-cell">Category</th>
                <th className="table-header hidden lg:table-cell">Manufacturer</th>
                <th className="table-header hidden xl:table-cell">Batch</th>
                <th className="table-header hidden lg:table-cell">Standard</th>
                <th className="table-header hidden xl:table-cell">Certification</th>
                <th className="table-header">Status</th>
                <th className="table-header hidden md:table-cell">Trust</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={10}>
                    <EmptyState
                      title="No products found"
                      description="Try adjusting your search or filter criteria."
                    />
                  </td>
                </tr>
              ) : (
                paginated.map(product => (
                  <tr key={product.id} className="table-row">
                    <td className="table-cell">
                      <span className="font-mono text-xs text-blue-700 font-semibold">{product.id}</span>
                    </td>
                    <td className="table-cell">
                      <div className="font-medium text-gray-800 text-sm">{product.name}</div>
                    </td>
                    <td className="table-cell hidden md:table-cell text-gray-500 text-xs">{product.category}</td>
                    <td className="table-cell hidden lg:table-cell text-gray-500 text-xs">{product.manufacturer}</td>
                    <td className="table-cell hidden xl:table-cell">
                      <span className="font-mono text-xs">{product.batchNumber}</span>
                    </td>
                    <td className="table-cell hidden lg:table-cell">
                      <span className="font-mono text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{product.standard}</span>
                    </td>
                    <td className="table-cell hidden xl:table-cell text-xs text-gray-500">{product.certificationStatus}</td>
                    <td className="table-cell">
                      <StatusBadge status={product.status} size="sm" />
                    </td>
                    <td className="table-cell hidden md:table-cell">
                      <div className="flex items-center gap-1.5">
                        <div className="w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${product.trustScore}%`,
                              backgroundColor: product.trustScore >= 80 ? '#16a34a' : product.trustScore >= 60 ? '#d97706' : '#dc2626',
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{product.trustScore}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <Link
                        to={`/products/${product.id}`}
                        className="text-blue-600 hover:text-blue-800 p-1.5 rounded hover:bg-blue-50 transition-colors inline-flex"
                        title="View details"
                      >
                        <Eye size={15} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-50">
            <span className="text-xs text-gray-500">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-7 h-7 text-xs rounded font-medium ${page === p ? 'bg-blue-700 text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
