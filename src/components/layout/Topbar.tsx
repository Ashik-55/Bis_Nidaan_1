import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, User, ChevronDown, FlaskConical } from 'lucide-react';

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/verify?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6 gap-4">
      {/* Left */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="text-gray-500 hover:text-gray-900 lg:hidden"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder="Search by Product ID or name..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>
        </form>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Demo badge */}
        <span className="demo-badge hidden sm:inline-flex">
          <FlaskConical size={12} />
          PROTOTYPE • DEMO DATA
        </span>

        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="w-7 h-7 bg-blue-700 rounded-full flex items-center justify-center">
            <User size={14} className="text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">Demo User</span>
          <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
