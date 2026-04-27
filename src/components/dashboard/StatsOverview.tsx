/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Youtube, TrendingUp, BarChart3, Database } from 'lucide-react';

export const StatsOverview: React.FC = () => {
  const stats = [
    { label: 'إجمالي الفيديوهات', value: '12,450+', icon: Youtube, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'ساعات الأرشيف', value: '4,200', icon: Database, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'عمليات البحث اليوم', value: '892', icon: Search, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'دقة التعرف', value: '98.5%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-card-bg p-5 rounded-sm border border-border-dim flex items-center justify-between group transition-all hover:bg-input-bg">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-[#666] uppercase tracking-[0.2em]">{stat.label}</p>
            <p className="text-2xl font-mono text-white tracking-tighter">{stat.value}</p>
          </div>
          <div className={`p-2.5 rounded-sm ${stat.bg} ${stat.color} border border-white/5`}>
            <stat.icon size={18} />
          </div>
        </div>
      ))}
    </div>
  );
};
