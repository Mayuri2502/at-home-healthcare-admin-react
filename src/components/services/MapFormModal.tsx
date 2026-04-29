import React, { useState } from 'react';
import { Service } from '../../services/servicesApi';

interface MapFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMap: (service: Service, formData: MapFormData) => void;
  service: Service | null;
}

interface MapFormData {
  formName: string;
  formType: string;
  fields: string[];
}

export const MapFormModal: React.FC<MapFormModalProps> = ({
  isOpen,
  onClose,
  onMap,
  service
}) => {
  const [formData, setFormData] = useState<MapFormData>({
    formName: '',
    formType: 'Medical',
    fields: []
  });

  if (!isOpen || !service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onMap(service, formData);
  };

  const handleFieldToggle = (field: string) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.includes(field)
        ? prev.fields.filter(f => f !== field)
        : [...prev.fields, field]
    }));
  };

  const availableFields = [
    'Patient Name',
    'Date of Birth',
    'Medical History',
    'Symptoms',
    'Diagnosis',
    'Treatment Plan',
    'Medications',
    'Allergies',
    'Vital Signs',
    'Test Results'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className="bg-white w-full max-w-2xl rounded-2xl tradingview-shadow overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Map Form to Service</h3>
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
            <div className={`w-10 h-10 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center`}>
              <i className={`fa-solid fa-kit-medical text-sm`}></i>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{service.serviceName}</h4>
              <p className="text-xs text-slate-500">{service.category || 'No category'}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Name */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Form Name
              </label>
              <input
                type="text"
                value={formData.formName}
                onChange={(e) => setFormData(prev => ({ ...prev, formName: e.target.value }))}
                placeholder="e.g. Blood Test Form"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>

            {/* Form Type */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Form Type
              </label>
              <select
                value={formData.formType}
                onChange={(e) => setFormData(prev => ({ ...prev, formType: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="Medical">Medical</option>
                <option value="Diagnostic">Diagnostic</option>
                <option value="Treatment">Treatment</option>
                <option value="Assessment">Assessment</option>
              </select>
            </div>

            {/* Form Fields */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Form Fields
              </label>
              <div className="grid grid-cols-2 gap-3">
                {availableFields.map((field) => (
                  <label
                    key={field}
                    className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={formData.fields.includes(field)}
                      onChange={() => handleFieldToggle(field)}
                      className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary/20"
                    />
                    <span className="text-sm text-slate-700">{field}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <i className="fa-solid fa-circle-info text-blue-500"></i>
              <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                Select the fields that should be included in the form for this service. The form will be available for providers when they deliver this service.
              </p>
            </div>
          </form>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md"
          >
            Map Form
          </button>
        </div>
      </div>
    </div>
  );
};
