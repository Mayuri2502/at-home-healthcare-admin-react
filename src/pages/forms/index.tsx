import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceListPanel } from './ServiceListPanel';
import { FormStructureViewer } from './FormStructureViewer';
import { UnmapModal } from './UnmapModal';
import { Service } from './FormTypes';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const Forms: React.FC = () => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isUnmapModalOpen, setIsUnmapModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState(false);

  const services = useMemo((): Service[] => [
    {
      id: '1',
      name: t('servicesData.bloodTest.name'),
      formName: 'Diagnostic_Intake_V2',
      status: 'mapped'
    },
    {
      id: '2',
      name: t('servicesData.physicalTherapy.name'),
      status: 'unmapped'
    },
    {
      id: '3',
      name: t('servicesData.postOpNursing.name'),
      formName: 'Nursing_Care_Standard',
      status: 'mapped'
    },
    {
      id: '4',
      name: t('servicesData.elderlyHomeCheckup.name'),
      status: 'unmapped'
    },
    {
      id: '5',
      name: t('servicesData.woundCareManagement.name'),
      formName: 'Wound_Care_Form_V1',
      status: 'mapped'
    }
  ], [t]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  const handleMapService = () => {
    // Logic to open mapping modal would go here
    showNotification(t('forms.mappingFunctionality'));
  };

  const handleExport = () => {
    showNotification(t('forms.exportSuccess'));
  };

  
  const confirmUnmap = () => {
    setIsUnmapModalOpen(false);
    showNotification(t('forms.unmapSuccess'));
    // Update the service status
    if (selectedService) {
      setSelectedService({
        ...selectedService,
        formName: undefined,
        status: 'unmapped'
      });
    }
  };

  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="flex h-[1024px] overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <div className="static top-0">
              <i className="fa-solid fa-atom text-primary text-xs animate-pulse"></i>
            </div>
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">At-Home</span>
        </div>
        <nav className="flex-1 mt-4 overflow-y-auto px-4 space-y-1">
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors w-full text-left">
            <i className="fa-solid fa-chart-pie w-5"></i> {t('navigation.dashboard')}
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors w-full text-left">
            <i className="fa-solid fa-user-doctor w-5"></i> {t('navigation.doctors')}
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors w-full text-left">
            <i className="fa-solid fa-hospital w-5"></i> {t('navigation.providers')}
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors w-full text-left">
            <i className="fa-solid fa-hand-holding-medical w-5"></i> {t('navigation.services')}
          </button>
          <button className="sidebar-item-active flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors w-full text-left">
            <i className="fa-solid fa-file-lines w-5"></i> {t('navigation.forms')}
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors w-full text-left">
            <i className="fa-solid fa-clipboard-list w-5"></i> {t('navigation.requests')}
          </button>
          <div className="pt-4 pb-2">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('navigation.system')}</p>
          </div>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors w-full text-left">
            <i className="fa-solid fa-shield-halved w-5"></i> {t('navigation.auditLogs')}
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors w-full text-left">
            <i className="fa-solid fa-gear w-5"></i> {t('navigation.settings')}
          </button>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl">
            <img
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
              alt="Admin"
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">{t('navigation.adminName')}</p>
              <p className="text-[10px] text-slate-500 truncate">{t('navigation.adminRole')}</p>
            </div>
            <button className="text-slate-400 hover:text-danger p-1">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-y-auto">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20 pt-10 pb-10">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg font-bold text-slate-900">{t('forms.title')}</h1>
              <p className="text-[11px] text-slate-500 font-medium">{t('forms.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
              <i className="fa-regular fa-bell text-lg"></i>
              <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200"></div>
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="p-8 h-[calc(1024px-64px)] flex gap-6 overflow-hidden">
          {/* Left: Services List */}
          <ServiceListPanel
            services={services}
            selectedService={selectedService}
            onServiceSelect={handleServiceSelect}
          />

          {/* Right: Form Structure Viewer */}
          <FormStructureViewer
            selectedService={selectedService}
            onMapService={handleMapService}
            onExport={handleExport}
          />
        </div>
      </main>

      {/* Unmap Confirmation Modal */}
      <UnmapModal
        isOpen={isUnmapModalOpen}
        onClose={() => setIsUnmapModalOpen(false)}
        onConfirm={confirmUnmap}
        formName={selectedService?.formName || ''}
        serviceName={selectedService?.name || ''}
      />

      {/* Toast Notification */}
      <div
        className={`fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl transition-all duration-300 z-[100] flex items-center gap-3 ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <i className="fa-solid fa-circle-check text-emerald-400"></i>
        <span className="text-sm font-medium">{toastMessage}</span>
      </div>
    </div>
  );
};

export default Forms;
