import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../components/dashboard/Sidebar';
import LanguageSwitcher from '../../components/LanguageSwitcher';

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

interface AuditLog {
  id: string;
  timestamp: string;
  user: {
    name: string;
    role: string;
    avatar?: string;
  };
  action: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE' | 'SYSTEM' | 'SECURITY';
  ipAddress: string;
  details?: any;
}

type TabType = 'notifications' | 'audit-logs';

const Notifications: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>('notifications');
  
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

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: '1',
      timestamp: '2024-04-03 14:22:10',
      user: {
        name: 'A. Wright',
        role: 'Senior Admin',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
      },
      action: 'Approved Doctor #DR-442',
      type: 'UPDATE',
      ipAddress: '192.168.1.12',
      details: {
        doctor_id: 'DR-442',
        previous_status: 'PENDING',
        new_status: 'APPROVED',
        compliance_verified: true,
        rpps_check: 'SUCCESS',
        approved_by: 'A.Wright',
        timestamp: '2024-04-03T14:22:10Z'
      }
    },
    {
      id: '2',
      timestamp: '2024-04-03 13:05:44',
      user: {
        name: 'M. Dubois',
        role: 'Admin',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
      },
      action: 'Created Provider #PRV-09',
      type: 'CREATE',
      ipAddress: '10.0.0.84'
    },
    {
      id: '3',
      timestamp: '2024-04-03 11:15:20',
      user: {
        name: 'System Core',
        role: 'System'
      },
      action: 'Automated SLA Reset #REQ-112',
      type: 'SYSTEM',
      ipAddress: 'Internal'
    },
    {
      id: '4',
      timestamp: '2024-04-03 09:42:12',
      user: {
        name: 'A. Wright',
        role: 'Senior Admin',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
      },
      action: 'Deleted Form Mapping #FM-88',
      type: 'DELETE',
      ipAddress: '192.168.1.12'
    }
  ]);

  const [showAuditModal, setShowAuditModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('All Action Types');
  const [dateFilter, setDateFilter] = useState('');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleNotificationAction = (notificationId: string, action: string) => {
    if (action === t('notifications.viewProfile')) {
      // Handle view profile action
      console.log('View profile for notification:', notificationId);
    } else if (action === t('notifications.dismiss')) {
      setNotifications(notifications.filter(n => n.id !== notificationId));
    }
  };

  const openAuditModal = (log: AuditLog) => {
    setSelectedLog(log);
    setShowAuditModal(true);
  };

  const closeAuditModal = () => {
    setShowAuditModal(false);
    setSelectedLog(null);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'CREATE':
        return 'bg-blue-50 text-blue-600 border border-blue-100';
      case 'UPDATE':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
      case 'DELETE':
        return 'bg-red-50 text-red-600 border border-red-100';
      case 'SYSTEM':
        return 'bg-slate-100 text-slate-600 border border-slate-200';
      case 'SECURITY':
        return 'bg-amber-50 text-amber-600 border border-amber-100';
      default:
        return 'bg-slate-100 text-slate-600 border border-slate-200';
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'All Action Types' || log.type === actionFilter;
    const matchesDate = !dateFilter || log.timestamp.startsWith(dateFilter);
    return matchesSearch && matchesAction && matchesDate;
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-20">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              {(activeTab as TabType) === 'notifications' ? t('notifications.title') : t('notifications.auditLogs')}
            </h1>
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
        
        {/* Notification Actions */}
        {(activeTab as TabType) === 'notifications' && (
          <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab('notifications')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  (activeTab as TabType) === 'notifications'
                    ? 'bg-white shadow-sm text-primary'
                    : 'text-slate-500'
                }`}
              >
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('audit-logs')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  (activeTab as TabType) === 'audit-logs'
                    ? 'bg-white shadow-sm text-primary'
                    : 'text-slate-500'
                }`}
              >
                Audit Logs
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 flex items-center justify-center bg-primary border border-primary rounded-xl text-white hover:bg-primary/90 transition-all relative">
                <i className="fa-solid fa-bell text-sm"></i>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger text-white text-[9px] flex items-center justify-center rounded-full font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={markAllAsRead}
                className="text-xs font-bold text-slate-500 hover:text-primary px-3 py-2"
              >
                {t('notifications.markAllRead')}
              </button>
            </div>
          </div>
        )}

        {/* Audit Logs Header */}
        {(activeTab as TabType) === 'audit-logs' && (
          <div className="bg-white border-b border-slate-200 px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab('notifications')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  (activeTab as TabType) === 'notifications'
                    ? 'bg-white shadow-sm text-primary'
                    : 'text-slate-500'
                }`}
              >
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('audit-logs')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  (activeTab as TabType) === 'audit-logs'
                    ? 'bg-white shadow-sm text-primary'
                    : 'text-slate-500'
                }`}
              >
                Audit Logs
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Notifications Section */}
          {(activeTab as TabType) === 'notifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  {t('notifications.recentNotification')}
                </h2>
                <span className="px-2 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-full">
                  {unreadCount} {t('notifications.unread')}
                </span>
              </div>
              
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`bg-white p-4 rounded-2xl border-l-4 border border-slate-200 tradingview-shadow flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer ${
                      !notification.isRead ? 'border-l-accent' : 'border-l-slate-300 opacity-75 grayscale-[0.5]'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${
                      !notification.isRead ? 'bg-blue-50' : 'bg-slate-100'
                    } flex items-center justify-center ${notification.iconColor} flex-shrink-0`}>
                      <i className={`fa-solid ${notification.icon}`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-900">{notification.title}</p>
                        <span className="text-[10px] text-slate-400 font-medium">{notification.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{notification.message}</p>
                      {notification.actions && (
                        <div className="mt-3 flex gap-2">
                          {notification.actions.map((action, index) => (
                            <button
                              key={index}
                              onClick={() => handleNotificationAction(notification.id, action.label)}
                              className={`px-3 py-1 text-[10px] font-bold rounded-lg ${
                                action.variant === 'primary'
                                  ? 'bg-primary text-white'
                                  : 'border border-slate-200 text-slate-500 hover:bg-white'
                              }`}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {!notification.isRead && (
                      <div className="unread-indicator mt-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audit Logs Section */}
          {(activeTab as TabType) === 'audit-logs' && (
            <div className="space-y-6">
              {/* Log Filters */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 tradingview-shadow flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative flex-1 max-w-xs">
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                    <input
                      type="text"
                      placeholder={t('audit.searchLogs')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-primary/10 outline-none"
                    />
                  </div>
                  <select
                    value={actionFilter}
                    onChange={(e) => setActionFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-medium text-slate-600 outline-none"
                  >
                    <option>{t('audit.allActionTypes')}</option>
                    <option>CREATE</option>
                    <option>UPDATE</option>
                    <option>DELETE</option>
                    <option>SECURITY</option>
                  </select>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-medium text-slate-600 outline-none"
                  />
                </div>
                <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-200 transition-all">
                  <i className="fa-solid fa-file-csv"></i>
                  {t('common.export')} CSV
                </button>
              </div>

              {/* Audit Table */}
              <div className="bg-white rounded-2xl border border-slate-200 tradingview-shadow overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {t('audit.timestamp')}
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {t('audit.user')}
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {t('audit.action')}
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {t('audit.type')}
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {t('audit.ipAddress')}
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {t('common.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-xs font-medium text-slate-500">
                          {log.timestamp}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {log.user.avatar ? (
                              <img
                                src={log.user.avatar}
                                alt={log.user.name}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                SYS
                              </div>
                            )}
                            <span className="text-xs font-bold text-slate-700">{log.user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-600">
                          {log.action}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`status-chip ${getTypeColor(log.type)}`}>
                            {log.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[10px] font-mono text-slate-400">
                          {log.ipAddress}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => openAuditModal(log)}
                            className="text-primary hover:underline text-xs font-bold"
                          >
                            {t('common.details')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">
                    {t('audit.showingLogs', { start: 1, end: 10, total: 1422 })}
                  </span>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white">
                      <i className="fa-solid fa-chevron-left text-[10px]"></i>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-white text-xs font-bold">
                      1
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-white text-xs font-bold">
                      2
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-white text-xs font-bold">
                      3
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white">
                      <i className="fa-solid fa-chevron-right text-[10px]"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Audit Detail Modal */}
        {showAuditModal && selectedLog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              onClick={closeAuditModal}
              className="modal-backdrop absolute inset-0"
            ></div>
            <div className="bg-white w-[600px] rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{t('audit.auditDetail')}</h3>
                  <p className="text-xs text-slate-500">{t('audit.logId')}: #{selectedLog.id}</p>
                </div>
                <button
                  onClick={closeAuditModal}
                  className="text-slate-400 hover:text-slate-600 p-2"
                >
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>
              <div className="p-8 space-y-6 overflow-y-auto max-h-[600px]">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      {t('audit.actor')}
                    </p>
                    <div className="flex items-center gap-2">
                      {selectedLog.user.avatar ? (
                        <img
                          src={selectedLog.user.avatar}
                          alt={selectedLog.user.name}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                          SYS
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          {selectedLog.user.name}
                        </p>
                        <p className="text-[10px] text-slate-500">{selectedLog.user.role}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      {t('audit.eventType')}
                    </p>
                    <span className={`status-chip ${getTypeColor(selectedLog.type)} inline-block`}>
                      {selectedLog.type} ACTION
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      {t('audit.timestamp')}
                    </p>
                    <p className="text-xs font-semibold text-slate-700">
                      {new Date(selectedLog.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} - {selectedLog.timestamp.split(' ')[1]} UTC
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      {t('audit.ipAddress')}
                    </p>
                    <p className="text-xs font-mono text-slate-700">{selectedLog.ipAddress}</p>
                  </div>
                </div>

                {selectedLog.details && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                      {t('audit.dataPayload')}
                    </p>
                    <pre className="text-[11px] font-mono text-slate-700 overflow-x-auto">
                      {JSON.stringify(selectedLog.details, null, 2)}
                    </pre>
                  </div>
                )}

                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                    {t('audit.affectedResources')}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-user-doctor text-primary"></i>
                        <span className="text-xs font-bold text-slate-700">
                          {t('audit.doctorRecord')}
                        </span>
                      </div>
                      <button className="text-[10px] font-bold text-primary hover:underline">
                        {t('common.view')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
                <button
                  onClick={closeAuditModal}
                  className="px-6 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  {t('common.close')}
                </button>
                <button className="px-6 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-download"></i>
                  {t('audit.exportLog')}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Notifications;
