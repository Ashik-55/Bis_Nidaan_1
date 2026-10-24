import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package, CheckCircle, Clock, AlertTriangle,
  ArrowRight, TrendingUp, BarChart2, Eye,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import { products } from '../data/products';

const monthlyData = [
  { month: 'Apr', verifications: 620, certified: 540 },
  { month: 'May', verifications: 780, certified: 710 },
  { month: 'Jun', verifications: 890, certified: 820 },
  { month: 'Jul', verifications: 1040, certified: 950 },
  { month: 'Aug', verifications: 1120, certified: 1020 },
  { month: 'Sep', verifications: 980, certified: 890 },
  { month: 'Oct', verifications: 1250, certified: 1180 },
];

const categoryData = [
  { name: 'Electrical', value: 28, color: '#1d4ed8' },
  { name: 'Food', value: 22, color: '#16a34a' },
  { name: 'Construction', value: 18, color: '#d97706' },
  { name: 'Textiles', value: 14, color: '#7c3aed' },
  { name: 'Electronics', value: 11, color: '#0891b2' },
  { name: 'Safety', value: 7, color: '#dc2626' },
];

const statusData = [
  { name: 'Verified', value: 68, color: '#16a34a' },
  { name: 'Pending', value: 18, color: '#6b7280' },
  { name: 'Suspicious', value: 10, color: '#d97706' },
  { name: 'Counterfeit', value: 4, color: '#dc2626' },
];

const recentVerifications = products.slice(0, 6);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'activity' | 'categories'>('activity');

  const verified = products.filter(p => p.status === 'VERIFIED').length;
  const pending = products.filter(p => p.status === 'PENDING').length;
  const alerts = products.filter(p => p.status === 'SUSPICIOUS' || p.status === 'POSSIBLE_COUNTERFEIT').length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">BIS NIDAAN — Product Standards & Verification Platform</p>
        </div>
        <Link to="/data-matrix" className="btn-orange text-sm">
          Generate Product ID
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={products.length.toLocaleString()}
          subtitle="In database"
          icon={<Package size={18} />}
          color="blue"
          trend={{ value: '12%', positive: true }}
        />
        <StatCard
          title="Verified Products"
          value={verified}
          subtitle={`${Math.round((verified / products.length) * 100)}% of total`}
          icon={<CheckCircle size={18} />}
          color="green"
          trend={{ value: '8%', positive: true }}
        />
        <StatCard
          title="Pending Verification"
          value={pending}
          subtitle="Awaiting review"
          icon={<Clock size={18} />}
          color="gray"
          trend={{ value: '3%', positive: false }}
        />
        <StatCard
          title="Compliance Alerts"
          value={alerts}
          subtitle="Suspicious or flagged"
          icon={<AlertTriangle size={18} />}
          color="red"
          trend={{ value: '5%', positive: false }}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Activity chart */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="section-title">Verification Activity</h2>
              <p className="text-xs text-gray-400 mt-0.5">Monthly verifications —</p>
            </div>
            <div className="flex gap-1">
              {(['activity', 'categories'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${activeTab === tab ? 'bg-blue-700 text-white' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  {tab === 'activity' ? 'Activity' : 'Categories'}
                </button>
              ))}
            </div>
          </div>
          {activeTab === 'activity' ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="verGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="verifications" name="Total Verifications" stroke="#1d4ed8" fill="url(#verGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="certified" name="Certified" stroke="#16a34a" fill="none" strokeWidth={2} strokeDasharray="4 2" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categoryData}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="value" name="Standards Count" radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Status pie */}
        <div className="card p-5">
          <h2 className="section-title mb-1">Verification Status</h2>
          <p className="text-xs text-gray-400 mb-4">Distribution across all products</p>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={2}>
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {statusData.map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-gray-600">{item.name}</span>
                </div>
                <span className="text-xs font-semibold text-gray-700">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent verifications table */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <div>
            <h2 className="section-title">Recent Verifications</h2>
            <p className="text-xs text-gray-400 mt-0.5">Latest product verification events</p>
          </div>
          <Link to="/products" className="btn-secondary text-xs">
            View All
            <ArrowRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/80 border-b border-gray-100">
              <tr>
                <th className="table-header">Product ID</th>
                <th className="table-header">Product Name</th>
                <th className="table-header hidden md:table-cell">Manufacturer</th>
                <th className="table-header hidden lg:table-cell">Standard</th>
                <th className="table-header">Status</th>
                <th className="table-header hidden md:table-cell">Trust Score</th>
                <th className="table-header hidden lg:table-cell">Date</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentVerifications.map(product => (
                <tr key={product.id} className="table-row">
                  <td className="table-cell">
                    <span className="font-mono text-xs text-blue-700 font-semibold">{product.id}</span>
                  </td>
                  <td className="table-cell font-medium text-gray-800">{product.name}</td>
                  <td className="table-cell hidden md:table-cell text-gray-500">{product.manufacturer}</td>
                  <td className="table-cell hidden lg:table-cell">
                    <span className="font-mono text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{product.standard}</span>
                  </td>
                  <td className="table-cell">
                    <StatusBadge status={product.status} size="sm" />
                  </td>
                  <td className="table-cell hidden md:table-cell">
                    <div className="flex items-center gap-1.5">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full w-16">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${product.trustScore}%`,
                            backgroundColor: product.trustScore >= 80 ? '#16a34a' : product.trustScore >= 60 ? '#d97706' : '#dc2626',
                          }}
                        />
                      </div>
                      <span className="text-xs font-semibold">{product.trustScore}</span>
                    </div>
                  </td>
                  <td className="table-cell hidden lg:table-cell text-gray-400 text-xs">{product.manufacturingDate}</td>
                  <td className="table-cell">
                    <Link
                      to={`/products/${product.id}`}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors inline-flex"
                      title="View product"
                    >
                      <Eye size={15} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { to: '/verify', label: 'Verify a Product', icon: CheckCircle, color: 'bg-green-600 hover:bg-green-700' },
          { to: '/data-matrix', label: 'Generate DataMatrix', icon: BarChart2, color: 'bg-blue-700 hover:bg-blue-800' },
          { to: '/standards', label: 'Map a Standard', icon: Package, color: 'bg-indigo-700 hover:bg-indigo-800' },
          { to: '/assistant', label: 'Ask AI Assistant', icon: TrendingUp, color: 'bg-orange-600 hover:bg-orange-700' },
        ].map(action => {
          const Icon = action.icon;
          return (
            <Link key={action.to} to={action.to} className={`${action.color} text-white rounded-xl p-4 flex items-center gap-3 transition-colors`}>
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Icon size={16} />
              </div>
              <span className="text-sm font-semibold">{action.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Demo notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex items-start gap-3">
        <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div>


        </div>
      </div>
    </div>
  );
}
