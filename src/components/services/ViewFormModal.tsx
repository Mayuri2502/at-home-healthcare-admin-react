import React from 'react';
import { useTranslation } from 'react-i18next';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  formMapped: boolean;
  providers: number;
  icon: string;
  iconColor: string;
}

interface ViewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

export const ViewFormModal: React.FC<ViewFormModalProps> = ({
  isOpen,
  onClose,
  service
}) => {
  const { t } = useTranslation();

  if (!isOpen || !service) return null;

  const getIconColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-50 text-blue-600',
      purple: 'bg-purple-50 text-purple-600',
      emerald: 'bg-emerald-50 text-emerald-600',
      red: 'bg-red-50 text-red-600',
      amber: 'bg-amber-50 text-amber-600'
    };
    return colorMap[color] || 'bg-slate-50 text-slate-600';
  };

  // Mock form data - in real app this would come from API
  const formData = {
    formName: `${service.name} Form`,
    formType: 'Medical',
    fields: [
      'Patient Name',
      'Date of Birth',
      'Medical History',
      'Symptoms',
      'Diagnosis',
      'Treatment Plan'
    ],
    createdAt: '2024-01-15',
    lastUpdated: '2024-03-20'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className="bg-white w-full max-w-2xl rounded-2xl tradingview-shadow overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-slate-900">Form Details</h3>
            <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold border border-emerald-100">
              Active
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Service Info */}
          <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
            <div className={`w-10 h-10 ${getIconColorClass(service.iconColor)} rounded-lg flex items-center justify-center`}>
              <i className={`fa-solid ${service.icon} text-sm`}></i>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{service.name}</h4>
              <p className="text-xs text-slate-500">{service.category}</p>
            </div>
          </div>

          {/* Form Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Form Name
              </label>
              <div className="px-4 py-3 bg-slate-50 rounded-xl">
                <p className="text-sm font-medium text-slate-700">{formData.formName}</p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Form Type
              </label>
              <div className="px-4 py-3 bg-slate-50 rounded-xl">
                <p className="text-sm font-medium text-slate-700">{formData.formType}</p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Form Fields ({formData.fields.length})
            </label>
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-3">
                {formData.fields.map((field, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-[10px] font-bold text-primary">{index + 1}</span>
                    </div>
                    <span className="text-sm text-slate-700">{field}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Created</p>
              <p className="text-sm font-bold text-slate-700">{formData.createdAt}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last Updated</p>
              <p className="text-sm font-bold text-slate-700">{formData.lastUpdated}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Usage</p>
              <p className="text-sm font-bold text-slate-700">127 submissions</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <i className="fa-solid fa-circle-info text-blue-500"></i>
            <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
              This form is currently active and being used by {service.providers} providers for this service.
            </p>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between">
          <div className="flex gap-3">
            <button className="px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all border border-slate-200">
              <i className="fa-solid fa-download mr-2"></i>
              Export
            </button>
            <button className="px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all border border-slate-200">
              <i className="fa-solid fa-pen mr-2"></i>
              Edit Form
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
