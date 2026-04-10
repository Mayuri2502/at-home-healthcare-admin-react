import React from 'react';

interface UnmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formName: string;
  serviceName: string;
}

export const UnmapModal: React.FC<UnmapModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  formName,
  serviceName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className="bg-white w-full max-w-md rounded-2xl tradingview-shadow overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Unmap Form?</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This will disconnect <span className="font-bold">{formName}</span> from the{' '}
            <span className="font-bold">{serviceName}</span> service. Future requests for this service will require a new mapping.
          </p>
        </div>
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-danger text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-all shadow-md"
          >
            Confirm Unmap
          </button>
        </div>
      </div>
    </div>
  );
};
