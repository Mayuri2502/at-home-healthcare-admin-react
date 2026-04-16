import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../components/dashboard/Sidebar';
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

interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
  services: string[];
  status: 'active' | 'inactive';
  initials: string;
  activeRequests: number;
}

const Providers: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedService, setSelectedService] = useState('all');
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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

  const providers: Provider[] = [
    {
      id: 'PRV-9021',
      name: t('providersData.bioHealth.name'),
      email: t('providersData.bioHealth.email'),
      phone: t('providersData.bioHealth.phone'),
      services: [t('servicesData.diagnostics'), t('servicesData.bloodTest.name')],
      status: 'active',
      initials: 'BH',
      activeRequests: 12
    },
    {
      id: 'PRV-4432',
      name: t('providersData.swiftCare.name'),
      email: t('providersData.swiftCare.email'),
      phone: t('providersData.swiftCare.phone'),
      services: [t('servicesData.homeNursing'), t('servicesData.postOpCare'), t('servicesData.medicationManagement')],
      status: 'active',
      initials: 'SC',
      activeRequests: 8
    },
    {
      id: 'PRV-1108',
      name: t('providersData.medipack.name'),
      email: t('providersData.medipack.email'),
      phone: t('providersData.medipack.phone'),
      services: [t('servicesData.pharmacyDelivery')],
      status: 'inactive',
      initials: 'MP',
      activeRequests: 0
    }
  ];

  const handleDeactivate = (providerName: string) => {
    setSelectedProvider(providerName);
    setShowDeactivateModal(true);
  };

  const confirmDeactivate = () => {
    setShowDeactivateModal(false);
    setToastMessage(t('providers.deactivatedSuccessfully'));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold border border-emerald-100">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          {t('common.active')}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold border border-slate-200">
          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
          {t('common.inactive')}
        </span>
      );
    }
  };

  const getInitialsBadge = (initials: string, status: string) => {
    const baseClasses = "w-10 h-10 rounded-xl flex items-center justify-center font-bold";
    const statusClasses = status === 'active' 
      ? "bg-primary/5 text-primary" 
      : "bg-slate-100 text-slate-400";
    
    return (
      <div className={`${baseClasses} ${statusClasses}`}>
        {initials}
      </div>
    );
  };

  return (
    <div className="flex h-[1024px] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-y-auto">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20 pt-10 pb-10">
          <div className="flex items-center flex-1 max-w-xl">
            <div className="relative w-full">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
              <input
                type="text"
                placeholder="Search providers by name, email or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-8">
            <Link to="/providers/create" className="inline-block">
              <button 
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md shadow-primary/10"
              >
                <i className="fa-solid fa-plus"></i> {t('providers.createProvider')}
              </button>
            </Link>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
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
          {/* Filters Bar */}
          <section className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg ${
                    filterStatus === 'all' 
                      ? 'bg-primary text-white' 
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {t('providers.allProviders')}
                </button>
                <button
                  onClick={() => setFilterStatus('active')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg ${
                    filterStatus === 'active' 
                      ? 'bg-primary text-white' 
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {t('common.active')}
                </button>
                <button
                  onClick={() => setFilterStatus('inactive')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg ${
                    filterStatus === 'inactive' 
                      ? 'bg-primary text-white' 
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {t('common.inactive')}
                </button>
              </div>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 focus:outline-none shadow-sm"
              >
                <option value="all">{t('services.allServices')}</option>
                <option value="home-care">{t('services.homeCare')}</option>
                <option value="diagnostics">{t('services.diagnostics')}</option>
                <option value="pharmacy">{t('services.pharmacy')}</option>
              </select>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span>{t('common.showing', { start: 1, end: providers.length, total: providers.length, type: t('providers.title') })}</span>
              <div className="flex gap-1 ml-2">
                <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-lg bg-white hover:bg-slate-50">
                  <i className="fa-solid fa-chevron-left text-[10px]"></i>
                </button>
                <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-lg bg-white hover:bg-slate-50">
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </button>
              </div>
            </div>
          </section>

          {/* Providers Table */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {t('providers.providerName')}
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {t('common.contact')}
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Eligible services
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Active requests
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {t('common.status')}
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                    {t('common.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {providers.map((provider) => (
                  <tr key={provider.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getInitialsBadge(provider.initials, provider.status)}
                        <div>
                          <p className="text-sm font-bold text-slate-900">{provider.name}</p>
                          <p className="text-[11px] text-slate-500">ID: {provider.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-700">{provider.email}</p>
                      <p className="text-[11px] text-slate-500">{provider.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {provider.services.slice(0, 2).map((service, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold border border-slate-200"
                          >
                            {service}
                          </span>
                        ))}
                        {provider.services.length > 2 && (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold border border-slate-200">
                            +{provider.services.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{provider.activeRequests}</span>
                        <span className="text-sm text-slate-500">requests</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(provider.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all"
                        >
                          <i className="fa-solid fa-eye"></i>
                        </button>
                        <Link to={`/providers/edit/${provider.id}`} className="inline-block">
                          <button 
                            className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </Link>
                        {provider.status === 'active' ? (
                          <button
                            onClick={() => handleDeactivate(provider.name)}
                            className="p-2 text-slate-400 hover:text-danger hover:bg-white rounded-lg transition-all"
                          >
                            <i className="fa-solid fa-ban"></i>
                          </button>
                        ) : (
                          <button className="p-2 text-emerald-500 hover:bg-white rounded-lg transition-all">
                            <i className="fa-solid fa-circle-check"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-6 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
                  {t('common.bulkDeactivate')}
                </button>
                <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
                  {t('common.export')} CSV
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-xs font-bold text-slate-400 cursor-not-allowed">
                  {t('common.previous')}
                </button>
                <div className="flex gap-1">
                  <button className="w-8 h-8 text-xs font-bold text-slate-600 hover:bg-white rounded-lg">1</button>
                  <button className="w-8 h-8 text-xs font-bold text-slate-600 hover:bg-white rounded-lg">2</button>
                  <button className="w-8 h-8 text-xs font-bold text-slate-600 hover:bg-white rounded-lg">3</button>
                </div>
                <button className="px-3 py-1 text-xs font-bold text-primary hover:underline">
                  {t('common.next')}
                </button>
              </div>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <i className="fa-solid fa-building-circle-check text-xl"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {t('providers.activeProviders')}
                  </p>
                  <p className="text-2xl font-bold text-slate-900">112</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                  <i className="fa-solid fa-building-circle-xmark text-xl"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Inactive providers
                  </p>
                  <p className="text-2xl font-bold text-slate-900">8</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Deactivate Confirmation Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{t('providers.deactivateProvider')}?</h3>
            <p className="text-slate-500 text-sm mt-2">
              {t('providers.deactivateConfirm', { providerName: selectedProvider })}
            </p>
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setShowDeactivateModal(false)}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={confirmDeactivate}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-danger hover:bg-red-700 rounded-xl"
              >
                {t('common.deactivate')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 transform transition-all duration-300 z-[60]">
          <div className="bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
            <i className="fa-solid fa-circle-check text-emerald-400"></i>
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Providers;