import React, { useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import { ServicesTable } from '../../components/services/ServicesTable';
import { AddServiceModal } from '../../components/services/AddServiceModal';
import { DeleteConfirmModal } from '../../components/services/DeleteConfirmModal';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  formMapped: boolean;
  providers: number;
  icon: string;
  iconColor: string;
}

export const Services: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      id: '1',
      name: 'Blood Test (Comprehensive)',
      description: 'Full metabolic panel and lipid profile blood analysis.',
      category: 'Diagnostics',
      formMapped: true,
      providers: 14,
      icon: 'fa-droplet',
      iconColor: 'blue'
    },
    {
      id: '2',
      name: 'Physical Therapy',
      description: 'In-home physical rehabilitation sessions.',
      category: 'Rehabilitation',
      formMapped: false,
      providers: 5,
      icon: 'fa-person-walking-with-cane',
      iconColor: 'purple'
    },
    {
      id: '3',
      name: 'Post-Op Nursing Care',
      description: 'Skilled nursing for patients recovering from surgery.',
      category: 'Nursing',
      formMapped: true,
      providers: 10,
      icon: 'fa-house-medical',
      iconColor: 'emerald'
    }
  ];

  const stats = {
    totalServices: 24,
    mappedForms: 18,
    unmappedServices: 6,
    activeProviders: 142
  };

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setIsAddModalOpen(true);
  };

  const handleDeleteService = (service: Service) => {
    setSelectedService(service);
    setIsDeleteModalOpen(true);
  };

  const handleSaveService = () => {
    setIsAddModalOpen(false);
    setSelectedService(null);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="flex h-[1024px] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-y-auto">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20 pt-10 pb-10">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg font-bold text-slate-900">Services Management</h1>
              <p className="text-[11px] text-slate-500 font-medium">Configure and manage healthcare services offered to patients.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input
                type="text"
                placeholder="Search services..."
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 w-64 transition-all"
              />
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md shadow-primary/10 flex items-center gap-2"
            >
              <i className="fa-solid fa-plus"></i>
              Add Service
            </button>
          </div>
        </header>

        <div className="p-8 space-y-6">
          {/* Stats Section */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 tradingview-shadow">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Services</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold text-slate-800">{stats.totalServices}</h3>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded">+2 this month</span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 tradingview-shadow">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Mapped Forms</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold text-slate-800">{stats.mappedForms}</h3>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">75% coverage</span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 tradingview-shadow">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Unmapped Services</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold text-slate-800">{stats.unmappedServices}</h3>
                <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded">Action required</span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 tradingview-shadow">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Providers</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold text-slate-800">{stats.activeProviders}</h3>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded">Across all services</span>
              </div>
            </div>
          </section>

          {/* Services Table */}
          <ServicesTable
            services={services}
            onEdit={handleEditService}
            onDelete={handleDeleteService}
          />
        </div>
      </main>

      {/* Modals */}
      <AddServiceModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedService(null);
        }}
        onSave={handleSaveService}
        service={selectedService}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedService(null);
        }}
        onConfirm={handleConfirmDelete}
        serviceName={selectedService?.name || ''}
      />
    </div>
  );
};
