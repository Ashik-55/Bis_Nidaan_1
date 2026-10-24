import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="min-h-full">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-100 bg-white px-6 py-3">
          <p className="text-xs text-gray-400 text-center">
            BIS NIDAAN — Prototype by 404 minds &nbsp;|&nbsp; Demo data only. Not an official BIS service. &nbsp;|&nbsp; SIH Problem Statement 26107
          </p>
        </footer>
      </div>
    </div>
  );
}
