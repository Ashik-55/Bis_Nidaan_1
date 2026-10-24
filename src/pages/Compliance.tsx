import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CheckCircle, Clock, AlertCircle, ChevronDown, ChevronUp,
  FileText, Building2, FlaskConical, BookOpen,
} from 'lucide-react';
import { complianceGuides } from '../data/compliance';
import { EmptyState } from '../components/common/EmptyState';
import type { ComplianceStep as ComplianceStepType } from '../types/Compliance';

const stepStatusConfig = {
  completed: { icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-200', connector: 'bg-green-200' },
  'in-progress': { icon: Clock, color: 'text-blue-600 bg-blue-50 border-blue-200', connector: 'bg-blue-200' },
  pending: { icon: Clock, color: 'text-gray-400 bg-gray-50 border-gray-200', connector: 'bg-gray-100' },
  optional: { icon: AlertCircle, color: 'text-amber-600 bg-amber-50 border-amber-200', connector: 'bg-amber-100' },
};

function StepCard({ step, index }: { step: ComplianceStepType; index: number }) {
  const [expanded, setExpanded] = useState(index < 2);
  const cfg = stepStatusConfig[step.status];
  const Icon = cfg.icon;

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${cfg.color}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left"
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white" style={{ borderColor: 'currentColor' }}>
          <span className="text-sm font-bold">{step.id}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-bold text-gray-900">{step.title}</span>
            <span className={`badge text-xs ${step.status === 'completed' ? 'bg-green-100 text-green-700' : step.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
              {step.status === 'in-progress' ? 'In Progress' : step.status.charAt(0).toUpperCase() + step.status.slice(1)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">{step.estimatedDays}</span>
          </div>
        </div>
        <Icon size={16} className={step.status === 'completed' ? 'text-green-600' : step.status === 'in-progress' ? 'text-blue-600' : 'text-gray-400'} />
        {expanded ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
      </button>

      {expanded && (
        <div className="px-5 pb-4 space-y-3 border-t border-current/20 bg-white/60 animate-fade-in">
          <p className="text-sm text-gray-700 leading-relaxed pt-3">{step.description}</p>
          {step.notes && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5 text-xs text-blue-700">
              <strong>Note:</strong> {step.notes}
            </div>
          )}
          {step.documents.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1.5">Required Documents:</p>
              <div className="flex flex-wrap gap-1.5">
                {step.documents.map(doc => (
                  <span key={doc} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded flex items-center gap-1">
                    <FileText size={10} />
                    {doc}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Compliance() {
  const [searchParams] = useSearchParams();
  const defaultStd = searchParams.get('standard') || '';
  const [selected, setSelected] = useState(defaultStd);

  const guide = complianceGuides.find(g =>
    g.standardCode === selected || g.standardCode === defaultStd
  ) || (selected ? null : null);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="page-title">Compliance Navigator</h1>
        <p className="text-sm text-gray-500 mt-1">Step-by-step BIS certification guidance for Indian Standards.</p>
      </div>

      {/* Standard selector */}
      <div className="card p-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Select a Standard to Navigate</label>
        <div className="flex gap-3">
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            className="select-field flex-1"
          >
            <option value="">— Choose a standard —</option>
            {complianceGuides.map(g => (
              <option key={g.standardCode} value={g.standardCode}>
                {g.standardCode} — {g.standardTitle}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {complianceGuides.map(g => (
            <button
              key={g.standardCode}
              onClick={() => setSelected(g.standardCode)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                selected === g.standardCode
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
              }`}
            >
              {g.standardCode}
            </button>
          ))}
        </div>
      </div>

      {!selected && (
        <EmptyState
          icon={<BookOpen size={28} />}
          title="Select a standard to begin"
          description="Choose IS 302 or IS 2347 to see the complete compliance roadmap."
        />
      )}

      {selected && !guide && (
        <div className="card p-8 text-center">
          <p className="text-gray-500 text-sm">Compliance guide for <strong>{selected}</strong> is not available in this demo.</p>
          <p className="text-xs text-gray-400 mt-1">Try IS 302 or IS 2347.</p>
        </div>
      )}

      {guide && (
        <div className="space-y-5 animate-fade-in-up">
          {/* Guide header */}
          <div className="card p-5 bg-blue-900 text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-blue-300 mb-1">Compliance Guide</div>
                <div className="text-xl font-bold">{guide.standardCode}</div>
                <div className="text-blue-200 text-sm mt-0.5">{guide.standardTitle}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-blue-300">Est. Timeline</div>
                <div className="font-bold text-white">{guide.totalEstimatedDays}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-blue-700">
              <div>
                <div className="text-xs text-blue-300">Category</div>
                <div className="text-sm font-semibold">{guide.productCategory}</div>
              </div>
              <div>
                <div className="text-xs text-blue-300">Mandatory</div>
                <div className="text-sm font-semibold">{guide.mandatory ? 'Yes — BIS Required' : 'No'}</div>
              </div>
              <div>
                <div className="text-xs text-blue-300">Fees (approx.)</div>
                <div className="text-sm font-semibold">{guide.fees?.split('+')[0]}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Steps */}
            <div className="lg:col-span-2 space-y-3">
              <h2 className="font-bold text-gray-900">Certification Steps</h2>
              {guide.steps.map((step, i) => (
                <StepCard key={step.id} step={step} index={i} />
              ))}
            </div>

            {/* Sidebar info */}
            <div className="space-y-4">
              {/* Required docs */}
              <div className="card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={15} className="text-blue-600" />
                  <h3 className="font-bold text-gray-900 text-sm">Required Documents</h3>
                </div>
                <ul className="space-y-1.5">
                  {guide.requiredDocuments.map(doc => (
                    <li key={doc} className="text-xs text-gray-600 flex items-start gap-1.5">
                      <CheckCircle size={11} className="text-green-500 flex-shrink-0 mt-0.5" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Approved labs */}
              <div className="card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FlaskConical size={15} className="text-blue-600" />
                  <h3 className="font-bold text-gray-900 text-sm">Approved Testing Labs</h3>
                </div>
                <div className="space-y-2">
                  {guide.approvedLabs.map(lab => (
                    <div key={lab.name} className="border border-gray-100 rounded-lg p-2.5">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Building2 size={11} className="text-blue-500" />
                        <span className="text-xs font-semibold text-gray-800">{lab.name}</span>
                      </div>
                      <div className="text-xs text-gray-500">{lab.location}</div>
                      <div className="text-xs text-green-600 mt-0.5">{lab.accreditation}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demo notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-xs text-amber-700 font-semibold mb-1">DEMO GUIDANCE</p>
                <p className="text-xs text-amber-600">
                  This guidance is for prototype demonstration. For official information, visit bis.gov.in or contact BIS regional office.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
