/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { time: '08:00', intensity: 20 },
  { time: '10:00', intensity: 45 },
  { time: '12:00', intensity: 78 },
  { time: '14:00', intensity: 52 },
  { time: '16:00', intensity: 85 },
  { time: '18:00', intensity: 65 },
  { time: '20:00', intensity: 90 },
];

export const ActivityChart: React.FC = () => {
  return (
    <div className="h-64 w-full bg-card-bg p-5 rounded-sm border border-border-dim overflow-hidden">
      <h3 className="text-[10px] font-bold text-[#666] mb-5 uppercase tracking-[0.2em]">كثافة البحث والنشاط الاستخباري</h3>
      <ResponsiveContainer width="100%" height="75%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E61919" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#E61919" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="1 4" vertical={false} stroke="#1a1a1a" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 9, fill: '#444', fontWeight: 'bold', fontFamily: 'monospace' }} 
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ borderRadius: '2px', border: '1px solid #333', backgroundColor: '#0D0D0D', boxShadow: 'none' }}
            itemStyle={{ color: '#E61919', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
            labelStyle={{ display: 'none' }}
          />
          <Area 
            type="stepAfter" 
            dataKey="intensity" 
            stroke="#E61919" 
            strokeWidth={1}
            fillOpacity={1} 
            fill="url(#colorIntensity)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
