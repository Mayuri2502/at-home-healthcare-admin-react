import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../ui/PaginationComponent';
import { Doctor } from '../../types/doctor';

interface DoctorsTableProps {
  doctors: Doctor[];
  loading?: boolean;
  onApprove: (doctor: Doctor) => void;
  onReject: (doctor: Doctor) => void;
  onView: (doctor: Doctor) => void;
}

const DoctorsTable = ({ doctors, loading = false, onApprove, onReject, onView }: DoctorsTableProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter doctors based on status
  const pendingDoctors = doctors.filter(doctor => doctor.status === 'pendingApproval');
  const approvedDoctors = doctors.filter(doctor => doctor.status === 'approved');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendingApproval':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
            <i className="fa-solid fa-circle text-[6px] mr-1.5"></i>
            {t('status.pending') || 'Pending'}
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
            <i className="fa-solid fa-circle text-[6px] mr-1.5"></i>
            {t('status.active') || 'Active'}
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
            <i className="fa-solid fa-circle text-[6px] mr-1.5"></i>
            {t('status.rejected') || 'Rejected'}
          </span>
        );
      default:
        return null;
    }
  };

  // Get current doctors based on active tab
  const getCurrentDoctors = () => {
    const doctors = activeTab === 'pending' ? pendingDoctors : approvedDoctors;
    return doctors;
  };

  // Pagination calculations
  const currentDoctors = getCurrentDoctors();
  const totalItems = currentDoctors.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedDoctors = currentDoctors.slice(startIndex, endIndex);

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Reset pagination when switching tabs
  const handleTabChange = (tab: 'pending' | 'approved') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Generate avatar URL based on doctor's name
  const getAvatarUrl = (doctor: Doctor) => {
    return `https://ui-avatars.com/api/?name=${doctor.fName}+${doctor.lName}&background=random&color=fff`;
  };

  // Get doctor's full name
  const getDoctorName = (doctor: Doctor) => {
    return `Dr. ${doctor.fName} ${doctor.lName}`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => handleTabChange('pending')}
          className={`px-6 py-3 text-sm font-medium transition-all ${
            activeTab === 'pending' 
              ? 'tab-active border-b-2 border-primary text-primary font-bold' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Pending Approvals 
          <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs">{pendingDoctors.length}</span>
        </button>
        <button
          onClick={() => handleTabChange('approved')}
          className={`px-6 py-3 text-sm font-medium transition-all ${
            activeTab === 'approved' 
              ? 'tab-active border-b-2 border-primary text-primary font-bold' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Approved Doctors
        </button>
      </div>

      {/* Table Filters */}
      <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-slate-50/50">
        <div className="flex gap-2">
          <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium outline-none focus:ring-2 focus:ring-primary/10">
            <option>{t('doctors.allSpecialties')}</option>
            <option>{t('doctors.generalMedicine')}</option>
            <option>{t('doctors.cardiology')}</option>
            <option>{t('doctors.pediatrics')}</option>
          </select>
          <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">
            <i className="fa-solid fa-filter mr-1"></i> {t('doctors.moreFilters')}
          </button>
        </div>
      </div>

      {/* Pending Table */}
      {activeTab === 'pending' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Doctor Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Email Address
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Specialty
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {displayedDoctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={getAvatarUrl(doctor)}
                        className="w-8 h-8 rounded-lg object-cover"
                        alt={getDoctorName(doctor)}
                      />
                      <span className="text-sm font-semibold text-slate-900">{getDoctorName(doctor)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{doctor.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{doctor.specialty}</td>
                  <td className="px-6 py-4">{getStatusBadge(doctor.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onApprove(doctor)}
                        title="Approve"
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <i className="fa-solid fa-check"></i>
                      </button>
                      <button
                        onClick={() => onReject(doctor)}
                        title="Reject"
                        className="p-2 text-danger hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                      <button
                        onClick={() => navigate(`/doctors/${doctor.id}?approved=${doctor.status === 'approved'}`)}
                        title="View Details"
                        className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Approved Table */}
      {activeTab === 'approved' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Doctor Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Specialty
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {displayedDoctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={getAvatarUrl(doctor)}
                        className="w-8 h-8 rounded-lg object-cover"
                        alt={getDoctorName(doctor)}
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{getDoctorName(doctor)}</p>
                        <p className="text-[10px] text-slate-400">RPPS: {doctor.rppsNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{doctor.specialty}</td>
                  <td className="px-6 py-4">{getStatusBadge(doctor.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => navigate(`/doctors/${doctor.id}?approved=${doctor.status === 'approved'}`)}
                        className="px-3 py-1.5 text-xs font-bold text-primary hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        View
                      </button>
                      <button className="px-3 py-1.5 text-xs font-bold text-danger hover:bg-red-50 rounded-lg transition-colors">Disable</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default DoctorsTable;
