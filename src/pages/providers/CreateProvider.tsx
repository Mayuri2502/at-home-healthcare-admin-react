import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../components/dashboard/Sidebar';
import LanguageSwitcher from '../../components/LanguageSwitcher';

interface Service {
  id: string;
  name: string;
}

const CreateProvider: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<any>();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    providerName: '',
    email: '',
    contact: '',
    registrationId: '',
    status: true,
    services: ['Diagnostics', 'Home Care']
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');
  const [showAllServices, setShowAllServices] = useState(false);

  const availableServices: Service[] = [
    { id: '1', name: 'Generic' },
    { id: '2', name: 'Wound Care' },
    { id: '3', name: 'IV Therapy' },
    { id: '4', name: 'Medical Oxygen' },
    { id: '5', name: 'Artificial Nutrition' },
    { id: '6', name: 'Personal Hygiene care' },
    { id: '7', name: 'PCA(Pain management)' },
    { id: '8', name: 'Pregnancy related care' },
    { id: '9', name: 'Parenteral nutrition (central line)' },
    { id: '10', name: 'CNO' },
    { id: '11', name: 'Hydration Infusion' },
    { id: '12', name: 'Antibiothérapy infusion' }
  ];

  useEffect(() => {
    if (isEditMode) {
      // Simulate loading existing provider data
      setFormData({
        providerName: 'BioHealth Labs',
        email: 'contact@biohealth.fr',
        contact: '+33 1 45 67 89 00',
        registrationId: 'PRV-9021',
        status: true,
        services: ['Diagnostics', 'Blood Test']
      });
    }
  }, [isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusToggle = () => {
    setFormData(prev => ({
      ...prev,
      status: !prev.status
    }));
  };

  const handleAddService = (serviceName: string) => {
    if (formData.services.indexOf(serviceName) === -1) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, serviceName]
      }));
    }
  };

  const handleRemoveService = (serviceName: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(service => service !== serviceName)
    }));
  };

  const handleCancel = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmLeave = () => {
    setShowConfirmModal(false);
    window.location.href = '/providers';
  };

  const handleStay = () => {
    setShowConfirmModal(false);
  };

  const handleSubmit = () => {
    if (!formData.providerName) {
      showToastMessage(t('providers.validation.providerNameRequired'), 'error');
      return;
    }

    if (!formData.email) {
      showToastMessage(t('providers.validation.emailRequired'), 'error');
      return;
    }

    if (formData.services.length === 0) {
      showToastMessage('At least one service must be selected', 'error');
      return;
    }

    const action = isEditMode ? t('providers.validation.updated') : t('providers.validation.created');
    showToastMessage(t('providers.validation.success', { action }), 'success');

    // Redirect after delay
    setTimeout(() => {
      window.location.href = '/providers';
    }, 2000);
  };

  const showToastMessage = (message: string, type: 'success' | 'error' | 'info') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getToastIcon = () => {
    switch (toastType) {
      case 'success':
        return 'fa-solid fa-circle-check text-emerald-400';
      case 'error':
        return 'fa-solid fa-circle-xmark text-red-400';
      case 'info':
        return 'fa-solid fa-circle-info text-blue-400';
      default:
        return 'fa-solid fa-circle-check text-emerald-400';
    }
  };

  return (
    <div className="flex h-[1024px] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-y-auto">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20 pt-10 pb-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleCancel}
              className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-all"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                {isEditMode ? t('providers.editProvider') : t('providers.createProviderTitle')}
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">
                {isEditMode ? t('providers.updateProviderInfo') : t('providers.registerProviderInfo')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isEditMode && (
              <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold border border-amber-100 uppercase tracking-wider">
                {t('providers.editingMode')}
              </span>
            )}
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <button 
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            >
              Discard
            </button>
            <button 
              onClick={handleSubmit}
              className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md shadow-primary/10"
            >
              {isEditMode ? t('providers.saveChanges') : t('providers.createProvider')}
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
          {/* Section 1: Basic Information */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm">
                  <i className="fa-solid fa-id-card"></i>
                </div>
                <h2 className="text-sm font-semibold text-slate-800">Provider Details</h2>
              </div>
              {isEditMode && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-500">{t('providers.providerStatus')}:</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.status}
                      onChange={handleStatusToggle}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 peer-checked:after:translate-x-full"></div>
                  </label>
                  <span className={`text-xs font-bold ${formData.status ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {formData.status ? t('common.active') : t('common.inactive')}
                  </span>
                </div>
              )}
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{t('providers.providerName')}</label>
                <div className="relative">
                  <i className="fa-solid fa-building absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                  <input
                    type="text"
                    name="providerName"
                    value={formData.providerName}
                    onChange={handleInputChange}
                    placeholder="e.g. BioHealth Labs"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{t('providers.emailAddress')}</label>
                <div className="relative">
                  <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="contact@provider.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{t('providers.contactNumber')}</label>
                <div className="relative">
                  <i className="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="+33 X XX XX XX XX"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Registration ID (Optional)</label>
                <div className="relative">
                  <i className="fa-solid fa-fingerprint absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                  <input
                    type="text"
                    name="registrationId"
                    value={formData.registrationId}
                    onChange={handleInputChange}
                    placeholder="PRV-XXXX"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Service Assignment */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm">
                  <i className="fa-solid fa-briefcase-medical"></i>
                </div>
                <h2 className="text-sm font-semibold text-slate-800">Service Eligibility</h2>
              </div>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">MULTI-SELECT</span>
            </div>
            <div className="p-6 space-y-6">
              <div className="relative">
                <div className="absolute left-4 top-3.5 text-slate-400">
                  <i className="fa-solid fa-magnifying-glass text-sm"></i>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search and add services (e.g. Blood Test, Nursing...)"
                    className="flex-1 pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button 
                    onClick={() => setShowAllServices(!showAllServices)}
                    className="flex items-center justify-center px-4 py-2.5 border border-dashed border-slate-200 rounded-xl hover:bg-slate-50 transition-all group"
                  >
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-primary tracking-widest">
                      {showAllServices ? 'HIDE SERVICES' : 'VIEW ALL SERVICES'}
                    </span>
                  </button>
                </div>
                
                {/* Selected Services Chips */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {formData.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg text-xs font-bold"
                    >
                      {service}
                      <button 
                        onClick={() => handleRemoveService(service)}
                        className="hover:text-danger"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Suggestions */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableServices.slice(0, showAllServices ? availableServices.length : 5).map((service) => {
                  const isSelected = formData.services.includes(service.name);
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleAddService(service.name)}
                      className={`flex items-center justify-between p-3 border rounded-xl transition-all text-left ${
                        isSelected 
                          ? 'border-primary/30 bg-primary/5 text-primary' 
                          : 'border-slate-100 hover:border-primary/30 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`text-xs font-medium ${isSelected ? 'text-primary font-bold' : 'text-slate-600'}`}>
                        {service.name}
                      </span>
                      <i className="fa-solid fa-plus text-[10px] text-slate-300"></i>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Section 3: Notification Preferences
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 text-sm">
                  <i className="fa-solid fa-bell"></i>
                </div>
                <h2 className="text-sm font-semibold text-slate-800">Operational Alerts</h2>
              </div>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">AUTOMATED</span>
            </div>
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-700">Provider will receive automated request emails.</p>
                  <p className="text-[11px] text-slate-500 mt-1">Manage notification preferences and alert settings.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <i className="fa-solid fa-toggle-on text-emerald-500"></i>
                <span className="text-xs font-bold text-slate-600">Email Notifications Enabled</span>
              </div>
            </div>
          </section> */}
        </div>
      </main>

      {/* Unsaved Changes Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-circle-question text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Discard Changes</h3>
            <p className="text-slate-500 text-sm mt-2">
              Are you sure you want to discard your changes?
            </p>
            <div className="mt-8 flex gap-3">
              <button
                onClick={handleStay}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Stay
              </button>
              <button
                onClick={handleConfirmLeave}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-primary hover:bg-slate-800 rounded-xl"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 transform transition-all duration-300 z-[60]">
          <div className="bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
            <i className={getToastIcon()}></i>
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProvider;
