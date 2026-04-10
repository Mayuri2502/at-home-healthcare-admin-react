import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'approve' | 'reject';
  onConfirm: (status?: string) => void;
  doctorName: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, type, onConfirm, doctorName }) => {
  if (!isOpen) return null;

  if (type === 'reject') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)' }}>
        <div className="bg-white w-full max-w-md rounded-2xl tradingview-shadow overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Reject Application</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm text-slate-600">
              Please provide a reason for rejecting {doctorName}'s application. This will be sent via email.
            </p>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Rejection Reason
              </label>
              <textarea
                rows={4}
                placeholder="e.g. Missing RPPS certification document..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-danger/10 focus:border-danger outline-none"
              />
            </div>
          </div>
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm('Rejected')}
              className="px-4 py-2 text-sm font-bold text-white bg-danger rounded-lg hover:bg-red-700"
            >
              Confirm Rejection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white w-full max-w-md rounded-2xl tradingview-shadow p-8 text-center">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fa-solid fa-user-check text-2xl"></i>
        </div>
        <h3 className="text-xl font-bold text-slate-900">Approve Application?</h3>
        <p className="text-slate-500 text-sm mt-2">
          {doctorName} will be granted full access to the platform and can start accepting patient requests immediately.
        </p>
        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
          >
            Review Again
          </button>
          <button
            onClick={() => onConfirm('Approved')}
            className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-primary hover:bg-slate-800 rounded-xl"
          >
            Approve Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
