import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import DoctorsTable from '../../components/doctors/DoctorsTable';
import Modal from '../../components/doctors/Modal';
import Toast from '../../components/doctors/Toast';

const Doctors: React.FC = () => {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'approve' | 'reject' | null;
    doctorName: string;
  }>({
    isOpen: false,
    type: null,
    doctorName: ''
  });
  
  const [toast, setToast] = useState({
    show: false,
    message: ''
  });

  const handleApprove = (doctor: any) => {
    setModalState({
      isOpen: true,
      type: 'approve',
      doctorName: doctor.name
    });
  };

  const handleReject = (doctor: any) => {
    setModalState({
      isOpen: true,
      type: 'reject',
      doctorName: doctor.name
    });
  };

  const handleView = (doctor: any) => {
    navigate(`/doctors/${doctor.id}`);
  };

  const hideModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      doctorName: ''
    });
  };

  const confirmAction = () => {
    const status = modalState.type === 'approve' ? 'Approved' : 'Rejected';
    setToast({
      show: true,
      message: `Doctor successfully ${status}`
    });
    hideModal();
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
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 pt-10 pb-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
              <input
                type="text"
                placeholder="Search by name, email or specialty..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
              <i className="fa-regular fa-bell text-lg"></i>
              <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">FR - Paris</span>
              <i className="fa-solid fa-circle text-[8px] text-success"></i>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-6">
          {/* Page Title & Header */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Doctor Management
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Review registrations and manage active medical professionals.
                </p>
              </div>
              {/* <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2">
                <i className="fa-solid fa-plus"></i>
                Add Doctor
              </button> */}
            </div>
          </div>

          {/* Doctors Table */}
          <DoctorsTable 
            onApprove={handleApprove}
            onReject={handleReject}
            onView={handleView}
          />
        </div>
      </main>

      {/* Modals */}
      {modalState.type && (
        <Modal
          isOpen={modalState.isOpen}
          onClose={hideModal}
          type={modalState.type}
          onConfirm={confirmAction}
          doctorName={modalState.doctorName}
        />
      )}

      {/* Toast */}
      <Toast
        message={toast.message}
        show={toast.show}
        onClose={hideToast}
      />
    </div>
  );
};

export default Doctors;
