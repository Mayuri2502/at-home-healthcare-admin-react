import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className="bg-white w-full max-w-md rounded-2xl tradingview-shadow overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">{t('forms.unmapForm')}</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            {t('forms.unmapConfirmMessage', { formName, serviceName })}
          </p>
        </div>
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-danger text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-all shadow-md"
          >
            {t('forms.confirmUnmap')}
          </button>
        </div>
      </div>
    </div>
  );
};
