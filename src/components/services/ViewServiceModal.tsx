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

interface ViewServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

export const ViewServiceModal: React.FC<ViewServiceModalProps> = ({
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className="bg-white w-full max-w-lg rounded-2xl tradingview-shadow overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Service Details</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Service Header */}
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${getIconColorClass(service.iconColor)} rounded-xl flex items-center justify-center`}>
              <i className={`fa-solid ${service.icon} text-lg`}></i>
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">{service.name}</h4>
              <p className="text-sm text-slate-500">{service.category}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Description
            </label>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl">
              {service.description}
            </p>
          </div>

          {/* Service Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Form Status</p>
              <div className="flex items-center gap-2">
                {service.formMapped ? (
                  <>
                    <i className="fa-solid fa-circle-check text-emerald-500 text-sm"></i>
                    <span className="text-sm font-bold text-emerald-700">Mapped</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-circle-exclamation text-amber-500 text-sm"></i>
                    <span className="text-sm font-bold text-amber-700">Not Mapped</span>
                  </>
                )}
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Providers</p>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-users text-slate-500 text-sm"></i>
                <span className="text-sm font-bold text-slate-700">{service.providers}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
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
