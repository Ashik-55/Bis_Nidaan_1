import { Info, GitBranch, Mail, Globe } from 'lucide-react';

export default function Settings() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="page-title">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Application settings and prototype information.</p>
      </div>

      {/* About */}
      <div className="card p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center">
            <Info size={18} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">BIS NIDAAN</h2>
            <p className="text-xs text-gray-500">Version 0.3 — 30% Prototype</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            { label: 'Project', value: 'BIS NIDAAN' },
            { label: 'Problem Statement', value: 'SIH 26107' },
            { label: 'Team', value: '404 minds' },
            { label: 'Phase', value: '30% Frontend Prototype' },
            { label: 'Tech Stack', value: 'React + TypeScript + Vite + Tailwind' },
            { label: 'Data', value: 'Mock / Demo Only' },
          ].map(item => (
            <div key={item.label} className="border-b border-gray-50 pb-2">
              <div className="text-xs text-gray-400">{item.label}</div>
              <div className="font-medium text-gray-800">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Implemented features */}
      <div className="card p-5">
        <h2 className="font-bold text-gray-900 mb-4">Implemented Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            '✓ Dashboard with charts',
            '✓ Product database with search/filter',
            '✓ Product details with trust score',
            '✓ Digital Product ID generation',
            '✓ DataMatrix barcode generator',
            '✓ Product verification flow',
            '✓ Indian Standard Mapper',
            '✓ Compliance Navigator',
            '✓ AI Assistant UI with evidence',
            '✓ Sample Product Matrix Generator',
            '✓ localStorage persistence',
            '✓ Responsive design',
            '✓ Trust Score engine',
            '✓ Evidence card system',
          ].map(f => (
            <div key={f} className="text-sm text-gray-700 flex items-center gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>{f.slice(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Not implemented */}
      <div className="card p-5 bg-gray-50">
        <h2 className="font-bold text-gray-900 mb-4">Not Implemented (Future Phases)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            '— Spring Boot REST API',
            '— PostgreSQL Database',
            '— Hyperledger Fabric Blockchain',
            '— Real BIS API Integration',
            '— LLM / RAG Backend',
            '— Real Authentication (OAuth)',
            '— Production GS1 DataMatrix',
            '— Real Government Integrations',
          ].map(f => (
            <div key={f} className="text-sm text-gray-400 flex items-center gap-2">
              <span>—</span>
              <span>{f.slice(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture plan */}
      <div className="card p-5">
        <h2 className="font-bold text-gray-900 mb-4">Planned Architecture</h2>
        <div className="space-y-2">
          {[
            { layer: 'Frontend', tech: 'React / Next.js + TypeScript + Tailwind CSS' },
            { layer: 'Backend API', tech: 'Spring Boot REST API' },
            { layer: 'Database', tech: 'PostgreSQL' },
            { layer: 'Blockchain', tech: 'Hyperledger Fabric' },
            { layer: 'AI Engine', tech: 'LLM + RAG on BIS Knowledge Sources' },
            { layer: 'Integrations', tech: 'BIS APIs + GS1 DataMatrix + FSSAI' },
          ].map((item, i) => (
            <div key={item.layer} className="flex items-center gap-4">
              <div className="w-24 text-xs font-semibold text-blue-700 flex-shrink-0">{item.layer}</div>
              <div className="flex-1 text-xs text-gray-600 bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5">{item.tech}</div>
              {i < 5 && <div className="text-gray-300 text-xs">↓</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="card p-5">
        <h2 className="font-bold text-gray-900 mb-4">Project Links</h2>
        <div className="space-y-3">
          {[
            { icon: GitBranch, label: 'GitHub Repository', value: 'github.com/404minds/bis-nidaan', href: '#' },
            { icon: Globe, label: 'BIS Official Website', value: 'bis.gov.in', href: 'https://www.bis.gov.in' },
            { icon: Mail, label: 'Team Contact', value: '404minds@sih.gov.in (demo)', href: '#' },
          ].map(link => {
            const Icon = link.icon;
            return (
              <a key={link.label} href={link.href} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                <Icon size={16} className="text-gray-400 group-hover:text-blue-600" />
                <div>
                  <div className="text-xs text-gray-400">{link.label}</div>
                  <div className="text-sm text-gray-700 font-medium">{link.value}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Footer notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
        <p className="text-xs text-amber-700 font-semibold">PROTOTYPE — DEMO DATA ONLY</p>
        <p className="text-xs text-amber-600 mt-1">
          This application is a prototype for Smart India Hackathon 2024 (Problem Statement 26107).
          All data is synthetic. This is NOT an official BIS service.
        </p>
      </div>
    </div>
  );
}
