import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, ScanLine, QrCode, BookOpen,
  ClipboardCheck, Bot, BarChart3, Settings, ChevronRight,
  Layers, X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/products', label: 'Products', icon: Package },
  { path: '/verify', label: 'Verify Product', icon: ScanLine },
  { path: '/data-matrix', label: 'Data Matrix Generator', icon: QrCode },
  { path: '/standards', label: 'Indian Standards', icon: BookOpen },
  { path: '/compliance', label: 'Compliance Navigator', icon: ClipboardCheck },
  { path: '/assistant', label: 'AI Assistant', icon: Bot },
  { path: '/product-generator', label: 'Sample Generator', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 sidebar z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="" alt="" />
            <div>
              <div className="text-white font-bold text-base leading-tight">BIS NIDAAN</div>
              <div className="text-blue-300 text-xs">Standards Platform</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight size={14} className="opacity-60" />}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-2 px-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400 font-medium">PROTOTYPE v0.3</span>
          </div>
          <p className="text-xs text-gray-500 px-2 mt-1">SIH 26107 · Team 404 minds</p>
        </div>
      </aside>
    </>
  );
}
