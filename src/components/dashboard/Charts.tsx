import React from 'react';
import { useTranslation } from 'react-i18next';
import Plot from 'react-plotly.js';

const Charts: React.FC = () => {
  const { t } = useTranslation();
  
  const lineData = [
    {
      x: [t('dashboard.charts.mon'), t('dashboard.charts.tue'), t('dashboard.charts.wed'), t('dashboard.charts.thu'), t('dashboard.charts.fri'), t('dashboard.charts.sat'), t('dashboard.charts.sun')],
      y: [450, 520, 480, 610, 590, 400, 420],
      type: 'scatter' as const,
      mode: 'lines+markers' as const,
      name: t('dashboard.charts.requests'),
      line: {
        color: '#526674',
        width: 3,
        shape: 'spline' as const
      },
      fill: 'tozeroy' as const,
      fillcolor: 'rgba(82, 102, 116, 0.05)'
    }
  ];

  const lineLayout = {
    margin: {
      t: 10,
      r: 10,
      b: 40,
      l: 40
    },
    xaxis: {
      gridcolor: '#F1F5F9',
      zeroline: false
    },
    yaxis: {
      gridcolor: '#F1F5F9',
      zeroline: false
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    showlegend: false,
    hovermode: 'closest' as const,
    height: 300
  };

  const pieData = [
    {
      values: [1240, 850, 420],
      labels: [t('dashboard.charts.completed'), t('dashboard.charts.inProgress'), t('dashboard.charts.pending')],
      type: 'pie' as const,
      hole: 0.7,
      marker: {
        colors: ['#10B981', '#3B82F6', '#F59E0B']
      },
      textinfo: 'none' as const
    }
  ];

  const pieLayout = {
    margin: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    showlegend: false,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    height: 240
  };

  const config = {
    responsive: true,
    displayModeBar: false
  };

  return (
    <section id="charts-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Requests Over Time */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 tradingview-shadow">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-bold text-slate-800">{t('dashboard.charts.requestsOverTime')}</h4>
          <select className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2 py-1 outline-none">
            <option>{t('dashboard.charts.last7Days')}</option>
            <option>{t('dashboard.charts.last30Days')}</option>
          </select>
        </div>
        <div id="requests-line-chart">
          <Plot
            data={lineData}
            layout={lineLayout}
            config={config}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Requests by Status */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 tradingview-shadow">
        <h4 className="font-bold text-slate-800 mb-6">{t('dashboard.charts.requestsByStatus')}</h4>
        <div id="status-donut-chart">
          <Plot
            data={pieData}
            layout={pieLayout}
            config={config}
            style={{ width: '100%' }}
          />
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-circle text-emerald-500 text-[8px]"></i>
              {t('dashboard.charts.completed')}
            </span>
            <span className="font-bold">1,240</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-circle text-blue-500 text-[8px]"></i>
              {t('dashboard.charts.inProgress')}
            </span>
            <span className="font-bold">850</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-circle text-amber-500 text-[8px]"></i>
              {t('dashboard.charts.pending')}
            </span>
            <span className="font-bold">420</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Charts;