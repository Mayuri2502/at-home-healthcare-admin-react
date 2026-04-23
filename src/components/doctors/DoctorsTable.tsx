import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../ui/PaginationComponent';

interface Doctor {
  id: string;
  name: string;
  email?: string;
  specialty: string;
  status: 'pending' | 'active';
  avatar?: string;
  rpps?: string;
}

interface DoctorsTableProps {
  onApprove: (doctor: Doctor) => void;
  onReject: (doctor: Doctor) => void;
  onView: (doctor: Doctor) => void;
}

const DoctorsTable = ({ onApprove, onReject, onView }: DoctorsTableProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const pendingDoctors: Doctor[] = [
    {
      id: '1',
      name: t('doctorsData.dr1.name'),
      email: t('doctorsData.dr1.email'),
      specialty: t('doctorsData.dr1.specialty'),
      status: 'pending',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
    },
    {
      id: '2',
      name: t('doctorsData.dr2.name'),
      email: t('doctorsData.dr2.email'),
      specialty: t('doctorsData.dr2.specialty'),
      status: 'pending',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg'
    },
    {
      id: '3',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@hospital.com',
      specialty: 'Neurology',
      status: 'pending',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
    },
    {
      id: '4',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@hospital.com',
      specialty: 'Pediatrics',
      status: 'pending',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg'
    },
    {
      id: '5',
      name: 'Dr. Robert Williams',
      email: 'robert.williams@hospital.com',
      specialty: 'Orthopedics',
      status: 'pending',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg'
    },
    {
      id: '6',
      name: 'Dr. Emily Davis',
      email: 'emily.davis@hospital.com',
      specialty: 'Dermatology',
      status: 'pending',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg'
    },
    {
      id: '7',
      name: 'Dr. James Wilson',
      email: 'james.wilson@hospital.com',
      specialty: 'Gastroenterology',
      status: 'pending',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-10.jpg'
    },
    {
      id: '8',
      name: 'Dr. Lisa Anderson',
      email: 'lisa.anderson@hospital.com',
      specialty: 'Endocrinology',
      status: 'pending',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-11.jpg'
    }
  ];

  const approvedDoctors: Doctor[] = [
    {
      id: '3',
      name: t('doctorsData.dr3.name'),
      specialty: t('doctorsData.dr3.specialty'),
      status: 'active',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
      rpps: `RPPS: ${t('doctorsData.dr3.rpps')}`
    },
    {
      id: '4',
      name: t('doctorsData.dr4.name'),
      specialty: t('doctorsData.dr4.specialty'),
      status: 'active',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
      rpps: `RPPS: ${t('doctorsData.dr4.rpps')}`
    },
    {
      id: '5',
      name: t('doctorsData.dr5.name'),
      specialty: t('doctorsData.dr5.specialty'),
      status: 'active',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg',
      rpps: `RPPS: ${t('doctorsData.dr5.rpps')}`
    },
    {
      id: '6',
      name: 'Dr. Patricia Brown',
      specialty: 'Cardiology',
      status: 'active',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-12.jpg',
      rpps: 'RPPS: 82915'
    },
    {
      id: '7',
      name: 'Dr. David Martinez',
      specialty: 'Radiology',
      status: 'active',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-13.jpg',
      rpps: 'RPPS: 82916'
    },
    {
      id: '8',
      name: 'Dr. Jennifer Taylor',
      specialty: 'Oncology',
      status: 'active',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-14.jpg',
      rpps: 'RPPS: 82917'
    },
    {
      id: '9',
      name: 'Dr. Christopher Lee',
      specialty: 'Psychiatry',
      status: 'active',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-15.jpg',
      rpps: 'RPPS: 82918'
    },
    {
      id: '10',
      name: 'Dr. Amanda White',
      specialty: 'Anesthesiology',
      status: 'active',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-16.jpg',
      rpps: 'RPPS: 82919'
    },
    {
      id: '11',
      name: 'Dr. Kevin Thompson',
      specialty: 'Urology',
      status: 'active',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-17.jpg',
      rpps: 'RPPS: 82920'
    },
    {
      id: '12',
      name: 'Dr. Michelle Garcia',
      specialty: 'Rheumatology',
      status: 'active',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-18.jpg',
      rpps: 'RPPS: 82921'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
            <i className="fa-solid fa-circle text-[6px] mr-1.5"></i>
            {t('status.pending') || 'Pending'}
          </span>
        );
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
            <i className="fa-solid fa-circle text-[6px] mr-1.5"></i>
            {t('status.active') || 'Active'}
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
        <div className="text-xs text-slate-500">
          {t('doctors.showingDoctors', { start: 1, end: 10, total: 128 })}
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
                        src={doctor.avatar!}
                        className="w-8 h-8 rounded-lg object-cover"
                        alt={doctor.name}
                      />
                      <span className="text-sm font-semibold text-slate-900">{doctor.name}</span>
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
                        onClick={() => navigate(`/doctors/${doctor.id}?approved=${doctor.status === 'active'}`)}
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
                        src={doctor.avatar!}
                        className="w-8 h-8 rounded-lg object-cover"
                        alt={doctor.name}
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{doctor.name}</p>
                        <p className="text-[10px] text-slate-400">{doctor.rpps}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{doctor.specialty}</td>
                  <td className="px-6 py-4">{getStatusBadge(doctor.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => navigate(`/doctors/${doctor.id}?approved=${doctor.status === 'active'}`)}
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
