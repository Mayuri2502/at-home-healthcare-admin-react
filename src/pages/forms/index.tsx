import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { ServiceListPanel } from './ServiceListPanel';
import { FormStructureViewer } from './FormStructureViewer';
import { UnmapModal } from './UnmapModal';
import { Service } from './FormTypes';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import Sidebar from '../../components/dashboard/Sidebar';
import NotificationDropdown from '../../components/common/NotificationDropdown';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  icon: string;
  iconColor: string;
  actions?: {
    label: string;
    variant: 'primary' | 'secondary';
  }[];
}

const Forms: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isUnmapModalOpen, setIsUnmapModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: t('notifications.newDoctorRegistration'),
      message: t('notifications.newDoctorMessage', { name: 'Dr. Sarah Jenkins', specialty: 'Cardiology', rpps: '#82910' }),
      time: '2 mins ago',
      isRead: false,
      icon: 'fa-user-plus',
      iconColor: 'text-blue-500',
      actions: [
        { label: t('notifications.viewProfile'), variant: 'primary' },
        { label: t('notifications.dismiss'), variant: 'secondary' }
      ]
    },
    {
      id: '2',
      title: t('notifications.monthlyAuditReport'),
      message: t('notifications.auditReportMessage'),
      time: '3 hours ago',
      isRead: true,
      icon: 'fa-file-export',
      iconColor: 'text-slate-500'
    }
  ]);

  const handleNotificationAction = (notificationId: string, action: string) => {
    if (action === t('notifications.viewProfile')) {
      console.log('View profile for notification:', notificationId);
    } else if (action === t('notifications.dismiss')) {
      setNotifications(notifications.filter(n => n.id !== notificationId));
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

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

  // Handle URL parameters for service selection from services page
  useEffect(() => {
    const serviceId = searchParams.get('serviceId');
    const serviceName = searchParams.get('serviceName');
    const formMapped = searchParams.get('formMapped') === 'true';
    
    if (serviceId && serviceName) {
      // Find the service in our services list or create a new one
      const existingService = services.find(s => s.id === serviceId);
      if (existingService) {
        setSelectedService(existingService);
      } else {
        // Create a temporary service object for the selected service
        const tempService: Service = {
          id: serviceId,
          name: decodeURIComponent(serviceName),
          status: formMapped ? 'mapped' : 'unmapped',
          formName: formMapped ? 'Temp_Form_Name' : undefined
        };
        setSelectedService(tempService);
      }
    }
  }, [searchParams, services]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  const handleMapService = () => {
    // Logic to open mapping modal would go here
    showNotification(t('forms.mappingFunctionality'));
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
      <Sidebar />

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
            <NotificationDropdown
              notifications={notifications}
              onNotificationAction={handleNotificationAction}
              onMarkAllAsRead={markAllAsRead}
            />
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
