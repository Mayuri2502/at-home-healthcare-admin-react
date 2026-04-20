import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RequestDetailModal } from './RequestDetailModal';
import { RequestData } from './RequestTypes';
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

const Requests: React.FC = () => {
  const { t } = useTranslation();
  const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedRequestForReset, setSelectedRequestForReset] = useState<RequestData | null>(null);
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

  const [requestsData, setRequestsData] = useState<RequestData[]>([
    {
      id: 'REQ-9421',
      doctor: {
        name: t('requestsData.dr1.name'),
        specialty: t('requestsData.dr1.specialty'),
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg'
      },
      patient: t('requestsData.dr1.patient'),
      serviceType: t('requestsData.dr1.serviceType'),
      status: 'inprogress',
      dateCreated: 'Oct 26, 2023 14:20',
      lastUpdated: 'Oct 26, 2023 16:30',
      serviceColor: 'blue',
      formStatus: 'AWAITING SIGNATURE'
    },
    {
      id: 'REQ-9418',
      doctor: {
        name: t('requestsData.dr2.name'),
        specialty: t('requestsData.dr2.specialty'),
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg'
      },
      patient: t('requestsData.dr2.patient'),
      serviceType: t('requestsData.dr2.serviceType'),
      status: 'completed',
      dateCreated: 'Oct 25, 2023 09:15',
      lastUpdated: 'Oct 25, 2023 17:45',
      serviceColor: 'emerald',
      formStatus: 'SIGNED'
    },
    {
      id: 'REQ-9415',
      doctor: {
        name: t('requestsData.dr3.name'),
        specialty: t('requestsData.dr3.specialty'),
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg'
      },
      patient: t('requestsData.dr3.patient'),
      serviceType: t('requestsData.dr3.serviceType'),
      status: 'pending',
      dateCreated: 'Oct 25, 2023 16:45',
      lastUpdated: 'Oct 25, 2023 18:20',
      serviceColor: 'amber',
      formStatus: 'SUBMITTED'
    },
    {
      id: 'REQ-9412',
      doctor: {
        name: t('requestsData.dr4.name'),
        specialty: t('requestsData.dr4.specialty'),
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg'
      },
      patient: t('requestsData.dr4.patient'),
      serviceType: t('requestsData.dr4.serviceType'),
      status: 'returned',
      dateCreated: 'Oct 24, 2023 11:30',
      lastUpdated: 'Oct 24, 2023 14:15',
      serviceColor: 'red',
      formStatus: 'RETURNED'
    },
    {
      id: 'REQ-9410',
      doctor: {
        name: t('requestsData.dr1.name'),
        specialty: t('requestsData.dr1.specialty'),
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
      },
      patient: 'John Smith',
      serviceType: t('servicesData.bloodTest.name'),
      status: 'draft',
      dateCreated: 'Oct 23, 2023 10:15',
      lastUpdated: 'Oct 23, 2023 10:15',
      serviceColor: 'gray',
      formStatus: 'NOT STARTED'
    }
  ]);

  const getStatusChipClass = (status: string): string => {
    const statusClasses = {
      pending: 'status-chip status-pending',
      completed: 'status-chip status-completed',
      inprogress: 'status-chip status-inprogress',
      returned: 'status-chip status-returned',
      draft: 'status-chip status-draft'
    };
    return statusClasses[status as keyof typeof statusClasses] || 'status-chip';
  };

  const getStatusText = (status: string): string => {
    const statusTexts = {
      pending: t('requests.submitted'),
      completed: t('requests.completed'),
      inprogress: t('requests.inProgress'),
      returned: t('requests.returned'),
      draft: t('requests.draft')
    };
    return statusTexts[status as keyof typeof statusTexts] || status;
  };

  const handleRowClick = (request: RequestData) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleResetRequest = (request: RequestData) => {
    setSelectedRequestForReset(request);
    setShowResetModal(true);
  };

  const handleCancelRequest = (request: RequestData) => {
    // Update the request status to cancelled (using returned status for now)
    setRequestsData(prevData => 
      prevData.map(req => 
        req.id === request.id 
          ? { ...req, status: 'returned', serviceColor: 'red', formStatus: 'CANCELLED' }
          : req
      )
    );
    setToastMessage('Request cancelled successfully');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleResetStatus = () => {
    // Update the request status from inprogress to submitted
    if (selectedRequestForReset) {
      setRequestsData(prevData => 
        prevData.map(req => 
          req.id === selectedRequestForReset.id 
            ? { ...req, status: 'pending', serviceColor: 'amber' } // 'pending' corresponds to 'submitted' status
            : req
        )
      );
    }
    
    setToastMessage('Request status reset successfully');
    setShowToast(true);
    setShowResetModal(false);
    setSelectedRequestForReset(null);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex h-[1024px] overflow-hidden">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-hidden gap-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-20 pt-10 pb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-slate-900">{t('requests.title')}</h1>
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[11px] font-bold text-slate-600">{t('requests.newToday')}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-100 rounded-xl px-3 py-2 border border-slate-200">
              <i className="fa-solid fa-magnifying-glass text-slate-400 text-xs mr-2"></i>
              <input
                type="text"
                placeholder={t('requests.searchPlaceholder')}
                className="bg-transparent border-none outline-none text-xs w-64 text-slate-700"
              />
            </div>
            <NotificationDropdown
              notifications={notifications}
              onNotificationAction={handleNotificationAction}
              onMarkAllAsRead={markAllAsRead}
            />
            <div className="h-8 w-[1px] bg-slate-200"></div>
            {/* <button className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-all relative">
              <i className="fa-solid fa-filter text-sm"></i>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] flex items-center justify-center rounded-full font-bold">2</span>
            </button> */}
            <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
              <i className="fa-solid fa-download"></i> {t('common.export')}
            </button>
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
          </div>
        </header>

        {/* Main Workspace */}
        <div className="p-8 flex flex-col gap-6 h-full overflow-y-auto">
          {/* Filters & Views Section */}
          <section className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-primary shadow-sm outline-none focus:ring-2 focus:ring-primary/20">
                <option>{t('requests.allRequests')}</option>
                <option>{t('requests.submitted')}</option>
                <option>{t('requests.inProgress')}</option>
                <option>{t('requests.completed')}</option>
                <option>{t('requests.returned')}</option>
                <option>{t('requests.draft')}</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
                <i className="fa-solid fa-calendar text-slate-400 text-xs"></i>
                <span className="text-xs font-medium text-slate-600">{t('requests.dateRange')}</span>
                <i className="fa-solid fa-chevron-down text-slate-400 text-[10px] ml-2"></i>
              </div>
              <select className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/20 pr-3 items-start text-left">
                <option>{t('requests.allServices')}</option>
                <option>Generic</option>
                <option>Wound Care</option>
                <option>IV Therapy</option>
                <option>Medical Oxygen</option>
                <option>Artificial Nutrition</option>
                <option>Personal Hygiene care</option>
                <option>PCA(Pain management)</option>
                <option>Pregnancy related care</option>
                <option>Parenteral nutrition (central line)</option>
                <option>CNO</option>
                <option>Hydration Infusion</option>
                <option>Antibiothérapy infusion</option>
              </select>
            </div>
          </section>

          {/* Requests Table Section */}
          <section className="bg-white rounded-2xl border border-slate-200 tradingview-shadow overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <div className="flex items-center gap-2 cursor-pointer hover:text-slate-600">
                        {t('requests.requestId')} <i className="fa-solid fa-sort"></i>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('requests.doctor')}</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('requests.patient')}</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('requests.serviceType')}</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('requests.status')}</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('requests.formStatus')}</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('requests.dateCreated')}</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('requests.lastUpdated')}</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">{t('requests.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {requestsData.map((request) => (
                    <tr
                      key={request.id}
                      onClick={() => handleRowClick(request)}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono font-bold text-slate-500">#{request.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line jsx-a11y/alt-text */}
                          <img src={request.doctor.avatar} alt={`${request.doctor.name} - Doctor Avatar`} className="w-8 h-8 rounded-lg object-cover" />
                          <div>
                            <p className="text-xs font-bold text-slate-800">{request.doctor.name}</p>
                            <p className="text-[10px] text-slate-500">{request.doctor.specialty}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-700">{request.patient}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full bg-${request.serviceColor}-400`}></span>
                          <span className="text-xs text-slate-600">{request.serviceType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={getStatusChipClass(request.status)}>
                          {getStatusText(request.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {request.formStatus || 'No form'}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">{request.dateCreated}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">{request.lastUpdated}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {request.status === 'inprogress' && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleResetRequest(request);
                              }}
                              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all"
                              title={t('requests.resetRequest')}
                            >
                              <i className="fa-solid fa-undo text-sm"></i>
                            </button>
                          )}
                          {request.status !== 'completed' && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCancelRequest(request);
                              }}
                              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all"
                              title={t('requests.cancelRequest')}
                            >
                              <i className="fa-solid fa-times text-sm"></i>
                            </button>
                          )}
                          <button 
                            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-all"
                            title={t('requests.viewDetail')}
                          >
                            <i className="fa-solid fa-eye text-sm"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white">
              <p className="text-xs text-slate-500 font-medium">
                {t('requests.showingResults', { start: 1, end: 10, total: 124 })}
              </p>
              <div className="flex items-center m-0 gap-1.5 justify-between p-0.5">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all">
                  <i className="fa-solid fa-chevron-left text-[10px]"></i>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">3</button>
                <span className="mx-1 text-slate-300">...</span>
                <button className="flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 h-8 w-8">13</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all">
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Request Detail Modal */}
      <RequestDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        request={selectedRequest}
      />

      {/* Reset Status Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 modal-overlay backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden tradingview-shadow">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Reset Request Status</h3>
              <button onClick={() => setShowResetModal(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
                <i className="fa-solid fa-exclamation-triangle text-amber-600 mt-0.5"></i>
                <p className="text-sm text-amber-800">
                  This action will reset the request status to "Submitted". All progress after that point will be lost.
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Reason for Reset *</label>
                <input 
                  type="text"
                  placeholder="" 
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox"
                  id="understand-checkbox"
                  className="w-4 h-4 text-primary border-slate-300 rounded mt-0.5 focus:ring-primary"
                />
                <label htmlFor="understand-checkbox" className="text-sm text-slate-600">
                  I understand this action cannot be undone
                </label>
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex gap-3">
              <button 
                onClick={() => setShowResetModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleResetStatus}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
              >
                Reset Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-8 right-8 z-[70] bg-white border-l-4 border-success rounded-xl shadow-2xl p-4 min-w-[300px] tradingview-shadow">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
              <i className="fa-solid fa-circle-check text-success"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">Success</p>
              <p className="text-xs text-slate-500 mt-1">{toastMessage}</p>
            </div>
            <button onClick={() => setShowToast(false)} className="text-slate-400 hover:text-slate-600">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
