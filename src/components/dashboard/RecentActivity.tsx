import React from 'react';

interface ActivityItem {
  id: number;
  type: 'completed' | 'returned' | 'registration';
  title: string;
  description: string;
  time: string;
}

const RecentActivity: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      id: 1,
      type: 'completed',
      title: 'Service Completed',
      description: 'Home visit request #8942 was marked as completed.',
      time: '2 minutes ago'
    },
    {
      id: 2,
      type: 'returned',
      title: 'Form Returned',
      description: 'Dr. Sarah Jenkins returned Patient Intake Form for correction.',
      time: '15 minutes ago'
    },
    {
      id: 3,
      type: 'registration',
      title: 'New Doctor Registration',
      description: 'Dr. Michael Chen submitted registration for approval.',
      time: '1 hour ago'
    }
  ];

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'completed':
        return {
          icon: 'fa-check',
          bg: 'bg-emerald-50',
          color: 'text-emerald-600'
        };
      case 'returned':
        return {
          icon: 'fa-rotate-left',
          bg: 'bg-amber-50',
          color: 'text-amber-600'
        };
      case 'registration':
        return {
          icon: 'fa-user-plus',
          bg: 'bg-blue-50',
          color: 'text-blue-600'
        };
      default:
        return {
          icon: 'fa-circle',
          bg: 'bg-slate-50',
          color: 'text-slate-600'
        };
    }
  };

  return (
    <div id="ijax57" className="bg-white p-6 rounded-2xl border border-slate-100 tradingview-shadow w-full">
      <div id="i6lfll" className="flex justify-between items-center mb-6 w-full">
        <h4 className="font-bold text-slate-800">Recent Activity</h4>
        <button className="text-primary text-xs font-bold hover:underline">View All</button>
      </div>
      <div className="space-y-6">
        {activities.map((activity) => {
          const iconConfig = getActivityIcon(activity.type);
          return (
            <div key={activity.id} className="flex gap-4">
              <div className={`w-10 h-10 rounded-full ${iconConfig.bg} flex items-center justify-center flex-shrink-0`}>
                <i className={`fa-solid ${iconConfig.icon} ${iconConfig.color} text-sm`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800">{activity.title}</p>
                <p className="text-xs text-slate-500">{activity.description}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">{activity.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
