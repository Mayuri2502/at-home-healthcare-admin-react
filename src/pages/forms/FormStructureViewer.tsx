import React from 'react';
import { useTranslation } from 'react-i18next';
import { Service } from './FormTypes';

interface FormStructureViewerProps {
  selectedService: Service | null;
  onMapService: () => void;
}

export const FormStructureViewer: React.FC<FormStructureViewerProps> = ({
  selectedService,
  onMapService
}) => {
  const { t } = useTranslation();
  
  // Debug: Check if translation is working
  console.log('Current language:', useTranslation().i18n.language);
  console.log('Translation test:', t('forms.firstName'));
  
  if (!selectedService) {
    return (
      <section className="flex-1 bg-white rounded-2xl border border-slate-200 tradingview-shadow flex flex-col overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50/50 to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <i className="fa-solid fa-file-signature text-lg"></i>
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">No Form Assigned</h2>
              <p className="text-[11px] text-slate-500">{t('forms.structuredFieldPreview')}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onMapService}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-sm border border-blue-700"
              style={{minWidth: '100px'}}
            >
              <i className="fa-solid fa-link mr-1.5"></i> Assign Form
            </button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center text-slate-400">
          <div className="text-center">
            <i className="fa-solid fa-file-circle-question text-4xl mb-4"></i>
            <p className="text-sm font-medium">No form mapped for this service</p>
            <p className="text-xs text-slate-500 mt-2">This service cannot be used until a form is assigned</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 bg-white rounded-2xl border border-slate-200 tradingview-shadow flex flex-col overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50/50 to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <i className="fa-solid fa-file-signature text-lg"></i>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">
              {selectedService.formName || 'No Form Assigned'}
            </h2>
            <p className="text-[11px] text-slate-500">{t('forms.structuredFieldPreview')}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onMapService}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-sm border border-blue-700"
            style={{minWidth: '100px'}}
          >
            <i className="fa-solid fa-link mr-1.5"></i> {selectedService.formName ? 'Change Form' : 'Assign Form'}
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 bg-slate-50/30">
        {selectedService.formName ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Read-only banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-3">
              <i className="fa-solid fa-lock text-amber-600"></i>
              <p className="text-sm font-medium text-amber-800">This is read-only preview</p>
            </div>
            
            {/* Section: Patient Demographics */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
                {t('forms.patientDemographics')}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500">{t('forms.firstName')}</label>
                  <div className="w-full h-9 bg-slate-100 border border-slate-200 rounded-lg"></div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500">{t('forms.lastName')}</label>
                  <div className="w-full h-9 bg-slate-100 border border-slate-200 rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Section: Clinical Information */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
                {t('forms.clinicalInformation')}
              </h4>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500">{t('forms.currentMedications')}</label>
                  <div className="w-full bg-slate-100 border border-slate-200 rounded-lg h-[94px] relative"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border border-slate-300 rounded bg-slate-100"></div>
                  <label className="text-xs text-slate-600">{t('forms.hasKnownAllergies')}</label>
                </div>
              </div>
            </div>

            {/* Section: End of Form Preview */}
            <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 gap-2">
              <i className="fa-solid fa-plus-circle text-xl"></i>
              <p className="text-xs font-medium">{t('forms.endOfFormPreview')}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-slate-400">
              <i className="fa-solid fa-file-circle-question text-4xl mb-4"></i>
              <p className="text-sm font-medium">No form mapped for this service</p>
              <p className="text-xs text-slate-500 mt-2">This service cannot be used until a form is assigned</p>
              <button
                onClick={onMapService}
                className="mt-4 px-4 py-2 text-xs font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-all shadow-sm"
              >
                <i className="fa-solid fa-link mr-1.5"></i> Assign Form
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
