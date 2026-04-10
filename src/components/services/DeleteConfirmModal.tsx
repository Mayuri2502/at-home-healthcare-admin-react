import React from 'react';
import { useTranslation } from 'react-i18next';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  serviceName: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  serviceName
}) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className="bg-white w-full max-w-lg rounded-2xl tradingview-shadow overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-triangle-exclamation text-danger"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-900">{t('services.deleteService')}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="p-8 space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            {t('services.deleteConfirmMessage', { serviceName })}
          </p>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="text-xs text-red-700 font-medium">
              <i className="fa-solid fa-circle-exclamation mr-2"></i>
              {t('services.deleteWarningMessage')}
            </p>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-danger text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-all shadow-md"
          >
            {t('services.deleteService')}
          </button>
        </div>
      </div>
    </div>
  );
};
