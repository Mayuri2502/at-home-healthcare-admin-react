import React, { useState } from 'react';
import { RequestDetailModal } from './RequestDetailModal';
import { RequestData } from './RequestTypes';

const Requests: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const requestsData: RequestData[] = [
    {
      id: 'REQ-9421',
      doctor: {
        name: 'Dr. Julian Moore',
        specialty: 'Cardiology',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg'
      },
      patient: 'Robert Jenkins',
      serviceType: 'Comprehensive Blood Panel',
      status: 'inprogress',
      dateCreated: 'Oct 26, 2023 14:20',
      serviceColor: 'blue'
    },
    {
      id: 'REQ-9418',
      doctor: {
        name: 'Dr. Sarah Chen',
        specialty: 'General Medicine',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg'
      },
      patient: 'Alice Thompson',
      serviceType: 'Elderly Home Checkup',
      status: 'completed',
      dateCreated: 'Oct 25, 2023 09:15',
      serviceColor: 'emerald'
    },
    {
      id: 'REQ-9415',
      doctor: {
        name: 'Dr. Marc Dupont',
        specialty: 'Orthopedics',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg'
      },
      patient: 'George Miller',
      serviceType: 'Physical Therapy',
      status: 'pending',
      dateCreated: 'Oct 25, 2023 16:45',
      serviceColor: 'amber'
    },
    {
      id: 'REQ-9412',
      doctor: {
        name: 'Dr. Lucas Vance',
        specialty: 'Neurology',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg'
      },
      patient: 'Emma Watson',
      serviceType: 'Post-Op Nursing Care',
      status: 'returned',
      dateCreated: 'Oct 24, 2023 11:30',
      serviceColor: 'red'
    }
  ];

  const getStatusChipClass = (status: string): string => {
    const statusClasses = {
      pending: 'status-chip status-pending',
      completed: 'status-chip status-completed',
      inprogress: 'status-chip status-inprogress',
      returned: 'status-chip status-returned'
    };
    return statusClasses[status as keyof typeof statusClasses] || 'status-chip';
  };

  const getStatusText = (status: string): string => {
    const statusTexts = {
      pending: 'Pending Approval',
      completed: 'Completed',
      inprogress: 'In Progress',
      returned: 'Returned'
    };
    return statusTexts[status as keyof typeof statusTexts] || status;
  };

  const handleRowClick = (request: RequestData) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div className="flex h-[1024px] overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <div className="static top-0">
              <i className="fa-solid fa-atom text-primary text-xs animate-pulse"></i>
            </div>
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">At-Home</span>
        </div>
        <nav className="flex-1 mt-4 overflow-y-auto px-4 space-y-1">
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors w-full text-left">
            <i className="fa-solid fa-chart-pie w-5"></i> Dashboard Overview
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors w-full text-left">
            <i className="fa-solid fa-user-doctor w-5"></i> Doctors
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors w-full text-left">
            <i className="fa-solid fa-hospital w-5"></i> Providers
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors w-full text-left">
            <i className="fa-solid fa-hand-holding-medical w-5"></i> Services
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors w-full text-left">
            <i className="fa-solid fa-file-lines w-5"></i> Forms
          </button>
          <button className="sidebar-item-active flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors w-full text-left">
            <i className="fa-solid fa-clipboard-list w-5"></i> Requests
          </button>
          <div className="pt-4 pb-2">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">System</p>
          </div>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors w-full text-left">
            <i className="fa-solid fa-shield-halved w-5"></i> Audit Logs
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors w-full text-left">
            <i className="fa-solid fa-gear w-5"></i> Settings
          </button>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl">
            <img
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
              alt="Admin"
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Alexander Wright</p>
              <p className="text-[10px] text-slate-500 truncate">Senior Admin</p>
            </div>
            <button className="text-slate-400 hover:text-danger p-1">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-hidden gap-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-20 pt-10 pb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-slate-900">All Service Requests</h1>
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[11px] font-bold text-slate-600">12 New Today</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-100 rounded-xl px-3 py-2 border border-slate-200">
              <i className="fa-solid fa-magnifying-glass text-slate-400 text-xs mr-2"></i>
              <input
                type="text"
                placeholder="Search Request ID, Patient or Doctor..."
                className="bg-transparent border-none outline-none text-xs w-64 text-slate-700"
              />
            </div>
            <button className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-all relative">
              <i className="fa-solid fa-bell text-sm"></i>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger text-white text-[9px] flex items-center justify-center rounded-full font-bold">5</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-all relative">
              <i className="fa-solid fa-filter text-sm"></i>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] flex items-center justify-center rounded-full font-bold">2</span>
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
              <i className="fa-solid fa-download"></i> Export
            </button>
          </div>
        </header>

        {/* Main Workspace */}
        <div className="p-8 flex flex-col gap-6 h-full overflow-y-auto">
          {/* Filters & Views Section */}
          <section className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-primary shadow-sm">All Requests</button>
              <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl">Pending Review</button>
              <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl">High Priority</button>
              <div className="h-6 w-px bg-slate-200 mx-2"></div>
              <button className="px-3 py-2 text-xs font-bold text-slate-400 hover:text-primary">
                <i className="fa-solid fa-plus mr-1"></i> Save View
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
                <i className="fa-solid fa-calendar text-slate-400 text-xs"></i>
                <span className="text-xs font-medium text-slate-600">Oct 20, 2023 - Oct 27, 2023</span>
                <i className="fa-solid fa-chevron-down text-slate-400 text-[10px] ml-2"></i>
              </div>
              <select className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/20 pr-3 items-start text-left">
                <option>All Services</option>
                <option>Blood Test</option>
                <option>Physical Therapy</option>
              </select>
            </div>
          </section>

          {/* Requests Table Section */}
          <section className="bg-white rounded-2xl border border-slate-200 tradingview-shadow overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <div className="flex items-center gap-2 cursor-pointer hover:text-slate-600">
                        Request ID <i className="fa-solid fa-sort"></i>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Doctor</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Patient</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Service Type</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date Created</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {requestsData.map((request) => (
                    <tr
                      key={request.id}
                      onClick={() => handleRowClick(request)}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono font-bold text-slate-500">#{request.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line jsx-a11y/alt-text */}
                          <img src={request.doctor.avatar} alt={`${request.doctor.name} - Doctor Avatar`} className="w-8 h-8 rounded-lg object-cover" />
                          <div>
                            <p className="text-xs font-bold text-slate-800">{request.doctor.name}</p>
                            <p className="text-[10px] text-slate-500">{request.doctor.specialty}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-700">{request.patient}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full bg-${request.serviceColor}-400`}></span>
                          <span className="text-xs text-slate-600">{request.serviceType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={getStatusChipClass(request.status)}>
                          {getStatusText(request.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">{request.dateCreated}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="px-3 py-1.5 text-[11px] font-bold text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-all">
                          View Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white">
              <p className="text-xs text-slate-500 font-medium">
                Showing <span className="text-slate-900 font-bold">1-10</span> of <span className="text-slate-900 font-bold">124</span> results
              </p>
              <div className="flex items-center m-0 gap-1.5 justify-between p-0.5">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all">
                  <i className="fa-solid fa-chevron-left text-[10px]"></i>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">3</button>
                <span className="mx-1 text-slate-300">...</span>
                <button className="flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 h-8 w-8">13</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all">
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Request Detail Modal */}
      <RequestDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        request={selectedRequest}
      />
    </div>
  );
};

export default Requests;
