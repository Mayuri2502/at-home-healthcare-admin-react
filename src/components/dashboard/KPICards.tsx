import React from 'react';
import { useTranslation } from 'react-i18next';

interface KPICard {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
  iconBg: string;
  iconColor: string;
  progress?: number;
  subtitle?: string;
  avatars?: string[];
  status?: string;
}

const KPICards: React.FC = () => {
  const { t } = useTranslation();
  
  const kpiData: KPICard[] = [
    {
      title: t('dashboard.kpi.totalDoctors'),
      value: '1,284',
      change: '12%',
      changeType: 'positive',
      icon: 'fa-user-doctor',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      progress: 75
    },
    {
      title: t('dashboard.kpi.pendingApprovals'),
      value: '42',
      change: t('dashboard.kpi.pending'),
      changeType: 'neutral',
      icon: 'fa-clock-rotate-left',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      subtitle: t('dashboard.kpi.urgentReview')
    },
    {
      title: t('dashboard.kpi.activeRequests'),
      value: '3,592',
      change: '5.4%',
      changeType: 'positive',
      icon: 'fa-heart-pulse',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      avatars: [
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg'
      ]
    },
    {
      title: t('dashboard.kpi.providers'),
      value: '156',
      change: t('dashboard.kpi.stable'),
      changeType: 'neutral',
      icon: 'fa-building-columns',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      subtitle: t('dashboard.kpi.serviceUptime')
    }
  ];

  const getChangeBadge = (kpi: KPICard) => {
    if (kpi.changeType === 'positive') {
      return (
        <span className="text-success text-xs font-bold flex items-center gap-1 bg-success/10 px-2 py-1 rounded-full">
          <i className="fa-solid fa-arrow-up"></i> {kpi.change}
        </span>
      );
    } else if (kpi.changeType === 'neutral') {
      return (
        <span className={`${kpi.iconColor} text-xs font-bold flex items-center gap-1 ${kpi.iconBg} px-2 py-1 rounded-full`}>
          {kpi.change}
        </span>
      );
    }
    return null;
  };

  return (
    <section id="kpi-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-2xl border border-slate-100 tradingview-shadow card-hover"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 ${kpi.iconBg} rounded-xl flex items-center justify-center`}>
              <i className={`fa-solid ${kpi.icon} ${kpi.iconColor} text-xl`}></i>
            </div>
            {kpi.change && getChangeBadge(kpi)}
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
            {kpi.title}
          </p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{kpi.value}</h3>
          
          {kpi.progress && (
            <div className="mt-4 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full" style={{ width: `${kpi.progress}%` }}></div>
            </div>
          )}
          
          {kpi.subtitle && (
            <p className="text-[10px] text-slate-400 mt-4 italic">{kpi.subtitle}</p>
          )}
          
          {kpi.avatars && (
            <div className="flex -space-x-2 mt-4">
              {kpi.avatars.slice(0, 3).map((avatar, avatarIndex) => (
                <img
                  key={avatarIndex}
                  src={avatar}
                  alt={`User ${avatarIndex + 1}`}
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
              ))}
              <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-600">
                +12
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default KPICards;