import { Link } from 'react-router-dom';
import {
  ScanLine, BookOpen, Bot, ArrowRight, CheckCircle,
  Package, Shield, Layers, ChevronRight,
} from 'lucide-react';

const stats = [
  { label: 'Products Registered', value: '12,480' },
  { label: 'Indian Standards', value: '3,250' },
  { label: 'Verifications', value: '8,920' },
  { label: 'Trusted Records', value: '94.8%' },
];

const workflow = [
  { step: 'SCAN', desc: 'Scan product DataMatrix or enter Product ID', icon: ScanLine },
  { step: 'IDENTIFY', desc: 'System identifies product and manufacturer', icon: Package },
  { step: 'MATCH STANDARD', desc: 'AI maps product to applicable Indian Standard', icon: BookOpen },
  { step: 'CHECK COMPLIANCE', desc: 'Review certification and compliance status', icon: CheckCircle },
  { step: 'VERIFY TRUST', desc: 'Get trust score and verification result', icon: Shield },
];

const features = [
  {
    icon: ScanLine,
    title: 'Product Verification',
    desc: 'Scan a DataMatrix code or enter a product ID to instantly verify authenticity and check BIS certification status.',
    color: 'bg-blue-50 text-blue-700',
  },
  {
    icon: BookOpen,
    title: 'Indian Standard Mapper',
    desc: 'Describe your product and our AI identifies applicable Indian Standards with match confidence scores.',
    color: 'bg-indigo-50 text-indigo-700',
  },
  {
    icon: Layers,
    title: 'Digital Product ID',
    desc: 'Generate a unique Digital Product ID and DataMatrix code encoding all certification and compliance data.',
    color: 'bg-orange-50 text-orange-700',
  },
  {
    icon: CheckCircle,
    title: 'Compliance Navigator',
    desc: 'Step-by-step compliance guidance from standard identification to BIS license acquisition.',
    color: 'bg-green-50 text-green-700',
  },
  {
    icon: Bot,
    title: 'AI Assistant',
    desc: 'Ask any question about BIS standards, certification requirements, or product compliance in plain language.',
    color: 'bg-purple-50 text-purple-700',
  },
  {
    icon: Shield,
    title: 'Trust Score Engine',
    desc: 'Multi-dimensional trust scoring based on identity, certification, batch, source evidence, and traceability.',
    color: 'bg-teal-50 text-teal-700',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
              <Layers size={16} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-gray-900 text-base">BIS NIDAAN</span>
              <span className="ml-2 text-xs text-gray-400 hidden sm:inline">AI Standards Platform</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="demo-badge hidden sm:inline-flex">PROTOTYPE ·</span>
            <Link to="/dashboard" className="btn-primary text-sm">
              Open Dashboard
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            {/* Badge */}


            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
              BIS
              <span className="text-blue-400"> NIDAAN</span>
            </h1>
            <p className="text-xl text-blue-200 mb-3 font-medium">
              AI-powered Intelligent Assistant for Indian Standards and BIS Services
            </p>
            <p className="text-4xl md:text-5xl font-bold text-white/90 mb-6">
              Scan. Verify. Understand. Comply.
            </p>
            <p className="text-base text-slate-300 mb-10 max-w-2xl leading-relaxed">
              A unified platform for consumers, MSMEs and businesses to discover applicable Indian Standards,
              verify product information, generate Digital Product IDs, and navigate BIS compliance requirements.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/verify" className="btn-orange text-sm px-6 py-3">
                <ScanLine size={16} />
                Verify a Product
              </Link>
              <Link to="/standards" className="btn-secondary text-sm px-6 py-3 bg-white/10 border-white/20 text-white hover:bg-white/20">
                <BookOpen size={16} />
                Explore Standards
              </Link>
              <Link to="/assistant" className="btn-secondary text-sm px-6 py-3 bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Bot size={16} />
                Ask BIS Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-blue-800">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                <div className="text-xs text-amber-600 mt-0.5">DEMO VALUE</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How BIS NIDAAN Works</h2>
            <p className="text-gray-500">Five simple steps from product scan to verified trust</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0">
            {workflow.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="flex flex-col md:flex-row items-center">
                  <div className="flex flex-col items-center text-center max-w-36">
                    <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center mb-3">
                      <Icon size={20} className="text-white" />
                    </div>
                    <div className="text-xs font-bold text-blue-800 mb-1">{step.step}</div>
                    <div className="text-xs text-gray-500">{step.desc}</div>
                  </div>
                  {idx < workflow.length - 1 && (
                    <ChevronRight size={20} className="text-gray-300 mx-4 flex-shrink-0 hidden md:block rotate-0 md:rotate-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Platform Features</h2>
            <p className="text-gray-500">Everything you need to navigate BIS standards and compliance</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(feature => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="card p-5 hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to explore the prototype?</h2>
          <p className="text-blue-200 mb-8">
            Open the dashboard to explore all features — product database, verification, DataMatrix generator, standards mapper, and AI assistant.
          </p>
          <Link to="/dashboard" className="btn-orange px-8 py-3 text-sm">
            Open Dashboard
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            BIS NIDAAN — Prototype
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Smart India Hackathon 2024 · Problem Statement 26107
          </p>
        </div>
      </footer>
    </div>
  );
}
