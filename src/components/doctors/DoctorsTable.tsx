import React, { useState } from 'react';

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
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');

  const pendingDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Jenkins',
      email: 's.jenkins@medical-hub.fr',
      specialty: 'General Medicine',
      status: 'pending',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
    },
    {
      id: '2',
      name: 'Dr. Marc Lefebvre',
      email: 'm.lefebvre@clinique.fr',
      specialty: 'Cardiology',
      status: 'pending',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg'
    }
  ];

  const approvedDoctors: Doctor[] = [
    {
      id: '3',
      name: 'Dr. Robert Chen',
      specialty: 'Neurology',
      status: 'active',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
      rpps: 'RPPS: 10100234567'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
            <i className="fa-solid fa-circle text-[6px] mr-1.5"></i>
            Pending
          </span>
        );
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
            <i className="fa-solid fa-circle text-[6px] mr-1.5"></i>
            Active
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Table Filters */}
      <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-slate-50/50">
        <div className="flex gap-2">
          <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium outline-none focus:ring-2 focus:ring-primary/10">
            <option>All Specialties</option>
            <option>General Medicine</option>
            <option>Cardiology</option>
            <option>Pediatrics</option>
          </select>
          <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">
            <i className="fa-solid fa-filter mr-1"></i> More Filters
          </button>
        </div>
        <div className="text-xs text-slate-500">
          Showing 1-10 of 128 doctors
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-6 py-3 text-sm font-medium transition-all ${
            activeTab === 'pending' 
              ? 'tab-active border-b-2 border-primary text-primary font-bold' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Pending Approvals 
          <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs">2</span>
        </button>
        <button
          onClick={() => setActiveTab('approved')}
          className={`px-6 py-3 text-sm font-medium transition-all ${
            activeTab === 'approved' 
              ? 'tab-active border-b-2 border-primary text-primary font-bold' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Approved Doctors
        </button>
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
              {pendingDoctors.map((doctor) => (
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
                        onClick={() => onView(doctor)}
                        title="View"
                        className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <i className="fa-solid fa-ellipsis-vertical"></i>
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
              {approvedDoctors.map((doctor) => (
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
                        onClick={() => onView(doctor)}
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
      <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white">
        <div className="flex gap-1">
          <button disabled className="px-3 py-1 border border-slate-200 rounded-lg text-xs font-bold text-slate-400">
            Previous
          </button>
          <button className="px-3 py-1 bg-primary text-white rounded-lg text-xs font-bold">1</button>
          <button className="px-3 py-1 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">
            2
          </button>
          <button className="px-3 py-1 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">
            3
          </button>
          <button className="px-3 py-1 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">
            Next
          </button>
        </div>
        <select className="text-xs border border-slate-200 rounded-lg px-2 py-1 outline-none">
          <option>10 per page</option>
          <option>20 per page</option>
          <option>50 per page</option>
        </select>
      </div>
    </div>
  );
};

export default DoctorsTable;
