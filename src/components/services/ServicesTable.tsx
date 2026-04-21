import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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

interface ServicesTableProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onView: (service: Service) => void;
  onMapForm: (service: Service) => void;
  onViewForm: (service: Service) => void;
}

export const ServicesTable: React.FC<ServicesTableProps> = ({
  services,
  onEdit,
  onView,
  onMapForm,
  onViewForm
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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

  const getProviderAvatars = (count: number) => {
    const avatarUrls = [
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg'
    ];

    const visibleCount = Math.min(count, 2);
    const remainingCount = count - visibleCount;

    return (
      <div className="flex -space-x-2">
        {Array.from({ length: visibleCount }).map((_, index) => (
          <img
            key={index}
            src={avatarUrls[index % avatarUrls.length]}
            alt=""
            className="w-6 h-6 rounded-full border-2 border-white"
          />
        ))}
        {remainingCount > 0 && (
          <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">
            +{remainingCount}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 tradingview-shadow overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-bold text-slate-800">{t('services.allServices')}</h2>
          <div className="flex gap-2">
            <select className="text-xs font-bold text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none">
              <option>{t('services.allStatus')}</option>
              <option>{t('services.mappedOnly')}</option>
              <option>{t('services.unmappedOnly')}</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200">
            <i className="fa-solid fa-rotate"></i>
          </button>
          <button className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200">
            <i className="fa-solid fa-download"></i>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {t('services.serviceName')}
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {t('services.description')}
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {t('services.formMapped')}
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {t('services.assignedProviders')}
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                {t('services.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${getIconColorClass(service.iconColor)} rounded-lg flex items-center justify-center`}>
                      <i className={`fa-solid ${service.icon} text-xs`}></i>
                    </div>
                    <span className="text-sm font-bold text-slate-700">{service.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs text-slate-500 max-w-xs truncate">{service.description}</p>
                </td>
                <td className="px-6 py-4">
                  {service.formMapped ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold border border-emerald-100 uppercase tracking-wider">
                      <i className="fa-solid fa-circle-check text-[8px]"></i>
                      {t('common.yes')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold border border-amber-100 uppercase tracking-wider">
                      <i className="fa-solid fa-circle-exclamation text-[8px]"></i>
                      {t('common.no')}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {getProviderAvatars(service.providers)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => {
                        // Navigate to forms page with the specific service
                        navigate(`/forms?serviceId=${service.id}&serviceName=${encodeURIComponent(service.name)}&formMapped=${service.formMapped}`);
                      }}
                      className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200"
                      title={service.formMapped ? "Change Form" : "Assign Form"}
                    >
                      <i className={`fa-solid ${service.formMapped ? 'fa-file-lines' : 'fa-link'}`}></i>
                    </button>
                    <div className="w-px h-4 bg-slate-200"></div>
                    <button
                      onClick={() => onView(service)}
                      className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200"
                      title="View"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    <button
                      onClick={() => onEdit(service)}
                      className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200"
                      title="Edit"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-white">
        <p className="text-xs text-slate-400 font-medium">{t('services.showingResults', { start: 1, end: services.length, total: 24 })}</p>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 transition-all border border-slate-200">
            <i className="fa-solid fa-chevron-left text-[10px]"></i>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold">3</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 transition-all border border-slate-200">
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
          </button>
        </div>
      </div>
    </section>
  );
};
