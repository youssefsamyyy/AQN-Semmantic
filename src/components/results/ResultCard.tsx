/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Play, Calendar, ExternalLink, Hash, Clock, Youtube } from 'lucide-react';
import { motion } from 'motion/react';
import { SearchResult } from '../../services/searchService';
import { cn } from '../../lib/utils';

interface ResultCardProps {
  result: SearchResult;
  index: number;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, index }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const scorePercent = Math.round(result.score * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-red-300 transition-all cursor-pointer group"
      onClick={() => window.open(result.video_url, '_blank')}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-56 h-32 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 group-hover:shadow-lg transition-all">
          <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-all flex items-center justify-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all z-10">
              <Play size={24} fill="currentColor" />
            </div>
          </div>
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 text-white text-[10px] font-bold rounded backdrop-blur-sm z-10">
            {formatTime(result.end_time - result.start_time)}
          </div>
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded z-10">
            AI SCORE: {scorePercent}%
          </div>
          {/* Fallback pattern if no thumbnail */}
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
             <Youtube className="text-slate-300" size={40} />
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-700 transition-colors line-clamp-1">{result.video_name}</h3>
            <ExternalLink size={16} className="text-slate-400 group-hover:text-red-500" />
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-slate-500 font-medium pt-1 border-t border-slate-50 border-dashed">
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
              <Clock size={12} className="text-red-500" />
              <span>{formatTime(result.start_time)} — {formatTime(result.end_time)}</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
              <Calendar size={12} className="text-blue-500" />
              <span>{new Date(result.date).toLocaleDateString('ar-EG')}</span>
            </div>
            {result.category && (
              <div className="flex items-center gap-1 bg-red-50 text-red-700 px-2 py-1 rounded">
                <Hash size={12} />
                <span>{result.category}</span>
              </div>
            )}
          </div>

          <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
            {result.text}
          </p>

          <div className="pt-2">
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${scorePercent}%` }}
                 className="bg-red-600 h-full rounded-full" 
               />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
