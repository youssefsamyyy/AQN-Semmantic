/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Radio, ChevronLeft, LayoutDashboard, Search, History, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Sidebar: React.FC<{ active: string }> = ({ active }) => {
  const menu = [
    { id: 'dashboard', label: 'لوحة القيادة', icon: LayoutDashboard },
    { id: 'search', label: 'البحث الذكي', icon: Search },
    { id: 'history', label: 'سجل البحث', icon: History },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <div className="hidden lg:flex flex-col w-64 bg-card-bg h-screen sticky top-0 text-[#888] p-6 z-50 border-l border-border-dim">
      <div className="flex items-center gap-4 mb-10">
        <div className="flex flex-col">
          <div className="text-[#E61919] font-bold text-xl tracking-tighter">القاهرة <span className="text-white">NEWS</span></div>
          <div className="text-[9px] text-[#666] uppercase tracking-[0.2em] font-bold mt-1">ARC-INTELLIGENCE</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menu.map((item) => (
          <button
            key={item.id}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-sm transition-all group border-r-2",
              active === item.id 
                ? "bg-input-bg text-white border-[#E61919]" 
                : "border-transparent hover:bg-input-bg/50 hover:text-[#E0E0E0]"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon size={18} className={active === item.id ? "text-[#E61919]" : "text-[#444] group-hover:text-[#666]"} />
              <span className="font-medium text-[13px]">{item.label}</span>
            </div>
            {active === item.id && <div className="w-1 h-1 rounded-full bg-[#E61919]" />}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-border-dim">
        <div className="bg-input-bg p-4 rounded border border-border-dim">
           <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              <span className="text-[10px] font-bold text-[#666] uppercase tracking-wider">الحالة: متصل الآن</span>
           </div>
           <div className="text-[10px] font-mono text-[#444] mb-1 uppercase tracking-widest leading-none">v4.0.2 LIVE</div>
           <p className="text-[10px] text-[#444] leading-tight">جاري معالجة 43 تيار فيديو مباشر عبر AI Engine</p>
        </div>
      </div>
    </div>
  );
};
