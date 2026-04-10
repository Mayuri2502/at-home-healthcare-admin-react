import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import Modal from '../../components/doctors/Modal';
import Toast from '../../components/doctors/Toast';

interface DoctorDetailProps {}

const DoctorDetail: React.FC<DoctorDetailProps> = () => {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'approve' as 'approve' | 'reject',
    doctorName: 'Dr. Sarah Jenkins'
  });

  const [toast, setToast] = useState({
    show: false,
    message: ''
  });

  const [rejectReason, setRejectReason] = useState('');
  const [rejectComment, setRejectComment] = useState('');
  const [showRejectError, setShowRejectError] = useState(false);

  const showModal = (type: 'approve' | 'reject') => {
    setModalState({
      isOpen: true,
      type,
      doctorName: 'Dr. Sarah Jenkins'
    });
  };

  const hideModal = () => {
    setModalState({
      ...modalState,
      isOpen: false
    });
    setRejectReason('');
    setRejectComment('');
    setShowRejectError(false);
  };

  const validateReject = () => {
    if (!rejectReason) {
      setShowRejectError(true);
      return;
    }
    setShowRejectError(false);
    handleAction('Rejected');
  };

  const handleAction = (status?: string) => {
    hideModal();
    setToast({
      show: true,
      message: `Doctor application has been successfully ${status?.toLowerCase()}.`
    });
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
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20 pt-10 pb-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/doctors')}
              className="text-slate-400 hover:text-primary transition-colors"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <h1 className="text-lg font-bold text-slate-900">Doctor Profile Detail</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-xs font-bold">
              <i className="fa-solid fa-clock"></i> Pending Approval
            </div>
          </div>
        </header>

        <div className="p-8 flex flex-col lg:flex-row gap-8">
          {/* Left Column: Profile Details */}
          <section className="lg:w-2/3 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 tradingview-shadow overflow-hidden h-full">
              <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                      className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md"
                      alt="Dr. Sarah Jenkins"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success text-white rounded-full flex items-center justify-center border-4 border-white">
                      <i className="fa-solid fa-check text-[10px]"></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-900">Dr. Sarah Jenkins</h2>
                    <p className="text-primary font-medium">Specialist in General Medicine & Geriatrics</p>
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <i className="fa-solid fa-envelope opacity-60"></i>
                        s.jenkins@medical-hub.fr
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <i className="fa-solid fa-phone opacity-60"></i>
                        +33 6 12 34 56 78
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <i className="fa-solid fa-location-dot opacity-60"></i>
                        Paris, France
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                      Professional Identifiers
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">RPPS Number</p>
                        <p className="text-sm font-mono font-bold text-slate-900">10100234567</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">FINESS Number</p>
                        <p className="text-sm font-mono font-bold text-slate-900">750012345</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                      Submitted Documents
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <i className="fa-solid fa-file-pdf text-danger"></i>
                          <span className="text-sm font-medium text-slate-700">Identity Document.pdf</span>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md text-[10px] font-bold border border-emerald-100">VERIFIED</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <i className="fa-solid fa-file-pdf text-danger"></i>
                          <span className="text-sm font-medium text-slate-700">Medical Diploma.pdf</span>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md text-[10px] font-bold border border-emerald-100">VERIFIED</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <i className="fa-solid fa-file-pdf text-danger"></i>
                          <span className="text-sm font-medium text-slate-700">Liability Insurance.pdf</span>
                        </div>
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md text-[10px] font-bold border border-amber-100">REVIEWING</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                      Biography
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Experienced General Practitioner with over 12 years of practice in urban healthcare centers. 
                      Specialized in geriatric care and home-based medical monitoring. Fluent in French, English, and Spanish.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                      Office Information
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Address</span>
                        <span className="font-medium text-slate-900 text-right">12 Rue de la Paix, 75002 Paris</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Availability</span>
                        <span className="font-medium text-slate-900">Mon - Fri, 08:00 - 19:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: Approval Panel */}
          <section className="lg:w-1/3 space-y-6">
            {/* Action Card */}
            <div className="bg-white rounded-2xl border border-slate-200 tradingview-shadow p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Verification Status</h3>
              
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <i className="fa-solid fa-magnifying-glass-chart text-primary"></i>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Audit Snippet</span>
                  </div>
                  <p className="text-sm text-slate-600 italic">
                    "RPPS database check confirmed identity. Professional address matches public records. 
                    Documents uploaded are high quality and legible."
                  </p>
                </div>

                <div className="space-y-4 block">
                  <div className="relative step-line pb-2.5 pl-11">
                    <div className="absolute left-0 top-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center z-10 justify-between m-0 p-2.5 gap-1.5">
                      <i className="fa-solid fa-check text-xs"></i>
                    </div>
                    <p className="text-xs font-bold text-slate-900">Registration Submitted</p>
                    <p className="text-[10px] text-slate-500">Oct 12, 2024 &bull; 09:45 AM</p>
                  </div>

                  <div className="relative step-line pb-2.5 pl-11">
                    <div className="absolute left-0 top-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center z-10 justify-between p-2.5 gap-1.5">
                      <i className="fa-solid fa-check text-xs"></i>
                    </div>
                    <p className="text-xs font-bold text-slate-900">Email Verified</p>
                    <p className="text-[10px] text-slate-500">Oct 12, 2024 &bull; 09:50 AM</p>
                  </div>

                  <div className="relative pl-11">
                    <div className="absolute left-0 top-0 w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center z-10 p-2.5 m-0 gap-1.5">
                      <i className="fa-solid fa-clock text-xs"></i>
                    </div>
                    <p className="text-xs font-bold text-slate-900">Admin Review</p>
                    <p className="text-[10px] text-slate-500">In Progress &bull; Assigned to Alexander W.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => showModal('approve')}
                  className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  <i className="fa-solid fa-user-check"></i> Approve Application
                </button>
                <button
                  onClick={() => showModal('reject')}
                  className="w-full py-3 bg-white text-danger border border-danger/20 rounded-xl font-bold text-sm hover:bg-danger/5 transition-all flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-user-xmark"></i> Reject & Notify
                </button>
              </div>
            </div>

            {/* Internal Notes */}
            <div className="bg-white rounded-2xl border border-slate-200 tradingview-shadow p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Internal Notes</h3>
              <div className="space-y-4">
                <textarea
                  placeholder="Add a private note about this doctor..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/10 outline-none min-h-[100px]"
                />
                <div className="flex justify-end">
                  <button className="text-xs font-bold text-primary hover:underline">Save Note</button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Modals */}
        {modalState.type === 'approve' && (
          <Modal
            isOpen={modalState.isOpen}
            onClose={hideModal}
            type={modalState.type}
            onConfirm={handleAction}
            doctorName={modalState.doctorName}
          />
        )}

        {modalState.type === 'reject' && (
          <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${modalState.isOpen ? '' : 'hidden'}`} style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)' }}>
            <div className="bg-white w-full max-w-md rounded-2xl tradingview-shadow overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">Reject Application</h3>
                <button onClick={hideModal} className="text-slate-400 hover:text-slate-600">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-slate-600">Please select a reason for rejection. This will be shared with the doctor.</p>
                <select
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-danger/10 outline-none"
                >
                  <option value="">Select a reason...</option>
                  <option value="invalid_rpps">Invalid RPPS Number</option>
                  <option value="missing_docs">Missing Required Documents</option>
                  <option value="expired_insurance">Expired Liability Insurance</option>
                  <option value="other">Other Reason</option>
                </select>
                <textarea
                  value={rejectComment}
                  onChange={(e) => setRejectComment(e.target.value)}
                  rows={3}
                  placeholder="Additional comments..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-danger/10 outline-none"
                />
                {showRejectError && (
                  <p className="text-xs text-danger">Please select a reason for rejection.</p>
                )}
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <button onClick={hideModal} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg">
                  Cancel
                </button>
                <button onClick={validateReject} className="px-4 py-2 text-sm font-bold text-white bg-danger rounded-lg hover:bg-red-700">
                  Confirm Reject
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        <Toast
          message={toast.message}
          show={toast.show}
          onClose={hideToast}
        />
      </main>
    </div>
  );
};

export default DoctorDetail;
