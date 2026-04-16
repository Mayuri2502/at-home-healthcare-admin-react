import React from 'react';
import { useTranslation } from 'react-i18next';
import { RequestData } from './RequestTypes';

interface RequestDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: RequestData | null;
}

export const RequestDetailModal: React.FC<RequestDetailModalProps> = ({
  isOpen,
  onClose,
  request
}) => {
  const { t } = useTranslation();
  if (!isOpen || !request) return null;

  const getStatusChipClass = (status: string): string => {
    const statusClasses = {
      pending: 'status-chip status-pending',
      completed: 'status-chip status-completed',
      inprogress: 'status-chip status-inprogress',
      returned: 'status-chip status-returned'
    };
    return statusClasses[status as keyof typeof statusClasses] || 'status-chip';
  };

  const getStatusText = (status: string): string => {
    const statusTexts = {
      pending: t('requests.submitted'),
      completed: t('requests.completed'),
      inprogress: t('requests.inProgress'),
      returned: t('requests.returned')
    };
    return statusTexts[status as keyof typeof statusTexts] || status;
  };

  const getTimelineEvents = () => {
    return [
      {
        status: t('requests.requestSubmitted'),
        date: 'Oct 26, 2023 at 14:20',
        icon: 'fa-check',
        color: 'emerald'
      },
      {
        status: t('requests.inProgress'),
        date: 'Oct 26, 2023 at 15:45',
        icon: 'fa-spinner',
        color: 'blue'
      }
    ];
  };

  const timelineEvents = getTimelineEvents();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl tradingview-shadow overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <i className="fa-solid fa-clipboard-check text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{t('requests.request')} #{request.id}</h3>
              <p className="text-xs text-slate-500">{t('requests.submittedOn')} {request.dateCreated}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                {t('requests.doctorInformation')}
              </p>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={request.doctor.avatar}
                  alt={`${request.doctor.name} - Doctor Avatar`}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-slate-800">{request.doctor.name}</p>
                  <p className="text-xs text-slate-500">{request.doctor.specialty} {t('requests.specialist')}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">{t('requests.rppsNumber')}:</span>
                  <span className="font-bold text-slate-700">10009876543</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">{t('requests.contact')}:</span>
                  <span className="font-bold text-slate-700">+33 6 12 34 56 78</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                {t('requests.patientInformation')}
              </p>
              <div className="mb-3">
                <p className="text-sm font-bold text-slate-800">{request.patient}</p>
                <p className="text-xs text-slate-500">Male, 58 years old</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">{t('requests.address')}:</span>
                  <span className="font-bold text-slate-700">14 Rue de la Paix, Paris</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">{t('requests.contact')}:</span>
                  <span className="font-bold text-slate-700">+33 6 98 76 54 32</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-slate-700">{t('requests.serviceRequested')}</p>
              <span className={getStatusChipClass(request.status)}>
                {getStatusText(request.status)}
              </span>
            </div>
            <p className="text-sm font-bold text-slate-900">{request.serviceType}</p>
            <p className="text-xs text-slate-600 mt-1">
              Full metabolic panel including lipid profile, glucose, and kidney function tests
            </p>
          </div>
          
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-700">{t('requests.statusTimeline')}</p>
            <div className="space-y-2">
              {timelineEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-8 h-8 bg-${event.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <i className={`fa-solid ${event.icon} text-${event.color}-600 text-xs`}></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-800">{event.status}</p>
                    <p className="text-[10px] text-slate-500">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
          >
            {t('common.close')}
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
            {t('requests.reassignProvider')}
          </button>
        </div>
      </div>
    </div>
  );
};
