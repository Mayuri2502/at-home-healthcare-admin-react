import React, { useState } from 'react';
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
  // const { t } = useTranslation(); // Commented out as it's not currently used
  const [showResetModal, setShowResetModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!isOpen || !request) return null;

  const getStatusChipClass = (status: string): string => {
    const statusClasses = {
      pending: 'status-chip bg-blue-50 text-blue-600 border-blue-200',
      completed: 'status-chip bg-emerald-50 text-emerald-600 border-emerald-200',
      inprogress: 'status-chip bg-blue-50 text-blue-600 border-blue-200',
      returned: 'status-chip bg-amber-50 text-amber-600 border-amber-200'
    };
    return statusClasses[status as keyof typeof statusClasses] || 'status-chip bg-slate-50 text-slate-600 border-slate-200';
  };

  const getStatusText = (status: string): string => {
    const statusTexts = {
      pending: 'Submitted',
      completed: 'Completed',
      inprogress: 'In Progress',
      returned: 'Returned'
    };
    return statusTexts[status as keyof typeof statusTexts] || status;
  };

  const handleResetStatus = () => {
    setToastMessage('Request status reset successfully');
    setShowToast(true);
    setShowResetModal(false);
    setTimeout(() => setShowToast(false), 3000);
  };

  const timelineEvents = [
    {
      status: 'Request Created',
      date: 'Oct 26, 14:20 by Dr. Moore',
      icon: 'fa-check',
      isActive: true,
      isCompleted: true
    },
    {
      status: 'In Progress',
      date: 'Waiting for sample collection',
      icon: 'fa-spinner',
      isActive: true,
      isCompleted: false
    },
    {
      status: 'Completed',
      date: 'Results pending upload',
      icon: 'fa-flag-checkered',
      isActive: false,
      isCompleted: false
    }
  ];

  const auditLogs = [
    {
      action: 'Status changed to "In Progress"',
      user: 'System Automation',
      date: 'Oct 26, 2023 at 14:45',
      icon: 'fa-user-gear',
      color: 'primary'
    },
    {
      action: 'Provider assigned: LabCorp Services',
      user: 'Alexander Wright (Admin)',
      date: 'Oct 26, 2023 at 14:45',
      icon: 'fa-hospital',
      color: 'success'
    },
    {
      action: 'Form validated and approved',
      user: 'System Validation',
      date: 'Oct 26, 2023 at 14:22',
      icon: 'fa-file-circle-check',
      color: 'accent'
    },
    {
      action: 'Request created',
      user: 'Dr. Julian Moore',
      date: 'Oct 26, 2023 at 14:20',
      icon: 'fa-plus',
      color: 'slate'
    }
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 bg-white overflow-hidden">
        <div className="h-full w-full flex flex-col">
          {/* Header */}
          <div className="h-24 bg-white border-b border-slate-200 flex flex-col justify-center px-8 flex-shrink-0 z-20 pt-10 pb-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold text-slate-900">Request #{request.id}</h1>
                    <span className={getStatusChipClass(request.status)}>
                      {getStatusText(request.status)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    <i className="fa-regular fa-clock mr-1"></i> Received: {request.dateCreated} • 
                    <i className="fa-regular fa-calendar-check ml-2 mr-1"></i> Last Update: 2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                  <i className="fa-solid fa-file-pdf text-danger"></i> Export PDF
                </button>
                <button 
                  onClick={() => setShowAuditModal(true)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                >
                  <i className="fa-solid fa-list-ul"></i> Audit Log
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50">
            {/* Entity Info Cards */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Doctor Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 tradingview-shadow">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Requesting Physician
                </h3>
                <div className="flex items-center gap-4">
                  <img
                    src={request.doctor?.avatar || "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"}
                    alt={`${request.doctor?.name || 'Unknown Doctor'} - Doctor Avatar`}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{request.doctor?.name || 'Unknown Doctor'}</p>
                    <p className="text-xs text-slate-500">{request.doctor?.specialty || 'Unknown Specialty'} • St. Mary's Hospital</p>
                    <p className="text-[11px] font-mono text-primary mt-1">RPPS: 10100239485</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                  <button className="text-xs font-bold text-primary hover:underline">View Full Profile</button>
                  <button className="text-slate-400 hover:text-primary">
                    <i className="fa-solid fa-envelope"></i>
                  </button>
                </div>
              </div>

              {/* Patient Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 tradingview-shadow">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Patient Information
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-xl font-bold">
                    RJ
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{request.patient}</p>
                    <p className="text-xs text-slate-500">64 years • Male • O+ Positive</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      <i className="fa-solid fa-location-dot mr-1"></i> 124 Park Avenue, NY
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-end items-center">
                  <button className="text-slate-400 hover:text-primary">
                    <i className="fa-solid fa-phone"></i>
                  </button>
                </div>
              </div>

              {/* Service Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 tradingview-shadow">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Service Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-500">Category</span>
                    <span className="text-xs font-bold text-slate-900">Laboratory</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-500">Service</span>
                    <span className="text-xs font-bold text-slate-900">{request.serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-500">Provider</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary">LabCorp Services</span>
                      <i className="fa-solid fa-circle-check text-[10px] text-emerald-500"></i>
                    </div>
                  </div>
                                  </div>
              </div>
            </section>

            {/* Form Preview & Timeline */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8">
              {/* Form Preview */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 tradingview-shadow flex flex-col overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <i className="fa-solid fa-file-waveform text-primary"></i>
                      <h3 className="text-sm font-bold text-slate-800">Form: Laboratory Prescription V2.1</h3>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 transition-all">
                        <i className="fa-solid fa-magnifying-glass-plus"></i>
                      </button>
                      <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 transition-all">
                        <i className="fa-solid fa-expand"></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Form Status:</span>
                      <span className={`px-2 py-1 text-[10px] font-bold rounded-lg ${
                        request.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                        request.status === 'inprogress' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                        request.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                        request.status === 'returned' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                        request.status === 'draft' ? 'bg-gray-50 text-gray-600 border border-gray-200' :
                        'bg-slate-50 text-slate-600 border border-slate-200'
                      }`}>
                        {request.status === 'completed' ? 'SIGNED' :
                         request.status === 'inprogress' ? 'AWAITING SIGNATURE' :
                         request.status === 'pending' ? 'SUBMITTED' :
                         request.status === 'returned' ? 'RETURNED' :
                         request.status === 'draft' ? 'NOT STARTED' : 'Unknown'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500">
                      <span><i className="fa-solid fa-calendar-check mr-1"></i>Updated: Oct 26, 14:20 by Dr. Moore</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 bg-slate-100/30 flex-1 min-h-[500px]">
                  <div className="max-w-2xl mx-auto bg-white border border-slate-200 p-10 shadow-sm space-y-8">
                    <div className="flex justify-between items-start border-b pb-6">
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">MEDICAL PRESCRIPTION</h2>
                        <p className="text-xs text-slate-500">ID: PRES-88210-LAB</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-800">At-Home Healthcare</p>
                        <p className="text-[10px] text-slate-500">Digital Health Network</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 text-xs">
                      <div>
                        <p className="font-bold text-slate-400 uppercase mb-2">Patient</p>
                        <p className="text-slate-900 font-medium">{request.patient}</p>
                        <p className="text-slate-500 mt-1">DOB: 12/05/1959</p>
                      </div>
                      <div>
                        <p className="font-bold text-slate-400 uppercase mb-2">Prescriber</p>
                        <p className="text-slate-900 font-medium">{request.doctor?.name || 'Unknown Doctor'}</p>
                        <p className="text-slate-500 mt-1">License: #NY-99201</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-xs font-bold text-slate-400 uppercase">Analysis Requested</p>
                      <div className="p-4 bg-slate-50 rounded-lg space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded border-2 border-primary flex items-center justify-center">
                            <i className="fa-solid fa-check text-[10px] text-primary"></i>
                          </div>
                          <span className="text-xs text-slate-800 font-medium">Complete Blood Count (CBC) with differential</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded border-2 border-primary flex items-center justify-center">
                            <i className="fa-solid fa-check text-[10px] text-primary"></i>
                          </div>
                          <span className="text-xs text-slate-800 font-medium">Lipid Panel (Total, LDL, HDL, Triglycerides)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded border-2 border-primary flex items-center justify-center">
                            <i className="fa-solid fa-check text-[10px] text-primary"></i>
                          </div>
                          <span className="text-xs text-slate-800 font-medium">Hemoglobin A1c (HbA1c)</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-8 flex justify-end">
                      <div className="text-center">
                        <div className="w-48 h-12 border-b-2 border-slate-200 flex items-center justify-center italic text-primary font-serif">
                          {request.doctor?.name || 'Unknown Doctor'}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2">Digitally Signed on 26/10/2023</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline & Actions */}
              <div className="lg:col-span-4 space-y-6">
                {/* Status Timeline */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 tradingview-shadow">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                    Request Lifecycle
                  </h3>
                  <div className="relative space-y-8 pl-4">
                    <div className="timeline-line"></div>
                    {timelineEvents.map((event, index) => (
                      <div key={index} className="flex gap-4 items-start relative">
                        <div className={`timeline-dot ${event.isActive ? (event.isCompleted ? 'active bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'active border-primary text-primary animate-pulse') : ''} pt-0.5 pb-0.5`}>
                          <i className={`fa-solid ${event.icon} text-xs`}></i>
                        </div>
                        <div className={`${!event.isActive ? 'opacity-40' : ''}`}>
                          <p className="text-sm font-bold text-slate-900">{event.status}</p>
                          <p className="text-xs text-slate-500">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Admin Controls */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 tradingview-shadow">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Admin Controls
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                      <i className="fa-solid fa-rotate-left"></i> Reset Status
                    </button>
                    <div className="h-px bg-slate-100 my-2"></div>
                    <button className="w-full px-4 py-3 bg-danger/5 text-danger rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-danger/10 transition-all">
                      <i className="fa-solid fa-ban"></i> Cancel Request
                    </button>
                  </div>
                </div>
                
                {/* Internal Notes */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 tradingview-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Internal Notes
                    </h3>
                    <button className="text-primary text-[10px] font-bold hover:underline">+ ADD NOTE</button>
                  </div>
                  <div className="space-y-4">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-700 leading-relaxed">
                        Patient requested collection after 4 PM only. Informed LabCorp driver.
                      </p>
                      <p className="text-[10px] text-slate-400 mt-2">By Sarah W. • 1 hour ago</p>
                    </div>
                  </div>
                </div>

                              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Reset Status Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 modal-overlay">
          <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden tradingview-shadow">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Reset Request Status</h3>
              <button onClick={() => setShowResetModal(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 bg-warning/5 border border-warning/20 rounded-xl flex gap-3">
                <i className="fa-solid fa-triangle-exclamation text-warning mt-0.5"></i>
                <p className="text-xs text-slate-700">
                  This action will reset the request to a previous status. All progress after that point will be lost.
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Reset To Status</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Select status...</option>
                  <option>Draft</option>
                  <option>Submitted</option>
                  <option>Provider Assigned</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Reason</label>
                <textarea 
                  placeholder="Explain the reason for reset..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 h-24"
                />
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
                className="flex-1 px-4 py-3 bg-danger text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-all"
              >
                Reset Request Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audit Log Modal */}
      {showAuditModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 modal-overlay">
          <div className="bg-white w-full max-w-3xl rounded-2xl overflow-hidden tradingview-shadow max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
              <h3 className="text-lg font-bold text-slate-900">Audit Log - Request #{request.id}</h3>
              <button onClick={() => setShowAuditModal(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {auditLogs.map((log, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b border-slate-100">
                    <div className={`w-10 h-10 rounded-xl bg-${log.color}/10 flex items-center justify-center flex-shrink-0`}>
                      <i className={`fa-solid ${log.icon} text-${log.color}`}></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">{log.action}</p>
                      <p className="text-xs text-slate-500 mt-1">By {log.user} • {log.date}</p>
                    </div>
                  </div>
                ))}
              </div>
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
    </>
  );
};
