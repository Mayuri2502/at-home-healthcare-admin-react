import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../components/dashboard/Sidebar';
import DoctorsTable from '../../components/doctors/DoctorsTable';
import Modal from '../../components/doctors/Modal';
import Toast from '../../components/doctors/Toast';
import LanguageSwitcher from '../../components/LanguageSwitcher';
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

const Doctors: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
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
  
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'approve' | 'reject' | null;
    doctorName: string;
  }>({
    isOpen: false,
    type: null,
    doctorName: ''
  });
  
  const [toast, setToast] = useState({
    show: false,
    message: ''
  });

  const handleApprove = (doctor: any) => {
    setModalState({
      isOpen: true,
      type: 'approve',
      doctorName: doctor.name
    });
  };

  const handleReject = (doctor: any) => {
    setModalState({
      isOpen: true,
      type: 'reject',
      doctorName: doctor.name
    });
  };

  const handleView = (doctor: any) => {
    navigate(`/doctors/${doctor.id}?approved=${doctor.status === 'active'}`);
  };

  const hideModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      doctorName: ''
    });
  };

  const confirmAction = () => {
    const status = modalState.type === 'approve' ? 'Approved' : 'Rejected';
    setToast({
      show: true,
      message: t('doctors.statusUpdate', { status, doctorName: modalState.doctorName })
    });
    hideModal();
  };

  const hideToast = () => {
    setToast({
      show: false,
      message: ''
    });
  };

  return (
    <div className="flex h-[1024px] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-y-auto">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 pt-10 pb-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
              <input
                type="text"
                placeholder={t('doctors.searchDoctors')}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
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

        <div className="p-8 space-y-6">
          {/* Page Title & Header */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {t('doctors.title')}
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  {t('doctors.subtitle')}
                </p>
              </div>
              {/* <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2">
                <i className="fa-solid fa-plus"></i>
                Add Doctor
              </button> */}
            </div>
          </div>

          {/* Doctors Table */}
          <DoctorsTable 
            onApprove={handleApprove}
            onReject={handleReject}
            onView={handleView}
          />
        </div>
      </main>

      {/* Modals */}
      {modalState.type && (
        <Modal
          isOpen={modalState.isOpen}
          onClose={hideModal}
          type={modalState.type}
          onConfirm={confirmAction}
          doctorName={modalState.doctorName}
        />
      )}

      {/* Toast */}
      <Toast
        message={toast.message}
        show={toast.show}
        onClose={hideToast}
      />
    </div>
  );
};

export default Doctors;
