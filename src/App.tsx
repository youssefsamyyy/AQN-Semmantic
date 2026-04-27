/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { StatsOverview } from './components/dashboard/StatsOverview';
import { SearchBar } from './components/search/SearchBar';
import { ResultCard } from './components/results/ResultCard';
import { ActivityChart } from './components/viz/ActivityChart';
import { searchService, SearchResult } from './services/searchService';
import { Bell, User, Calendar, TrendingUp, Info, AlertCircle, LayoutDashboard, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

export default function App() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTime, setSearchTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await searchService.search(query);
      setResults(response.results);
      setTotalResults(response.total_results);
      setSearchTime(response.search_time_ms);
      setHasSearched(true);
    } catch (err) {
      setError('حدث خطأ أثناء إجراء البحث. يرجى المحاولة مرة أخرى.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Live ticker animation
  const [tickerIndex, setTickerIndex] = useState(0);
  const tickerItems = [
    "عاجل: تغطية خاصة غداً لمؤتمر الأمن الغذائي في المنطقة",
    "تحديث AI: تم فهرست 400 ساعة فيديو إضافية اليوم بنجاح",
    "نظام البحث: تحسن بنسبة 15% في دقة التعرف على الوجوه",
    "اقتصاد: استقرار في الأسواق المالية والبورصة تترقب الافتتاح"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-brand-bg font-sans text-white overflow-hidden" dir="rtl">
      <Sidebar active="search" />

      <main className="flex-1 flex flex-col overflow-hidden bg-content-bg">
        {/* Header - Geometric Balance Style */}
        <header className="h-16 border-b border-border-dim flex items-center justify-between px-8 bg-card-bg shrink-0 z-40">
          <div className="flex items-center gap-6">
             <div className="h-6 w-[1.5px] bg-border-med"></div>
             <div className="flex flex-col">
                <div className="text-[10px] text-[#666] uppercase tracking-[0.25em] font-bold">بوابة الوصول الآمن</div>
                <div className="text-[12px] font-mono text-[#E61919] font-bold uppercase tracking-tight">V4.0.2 LIVE</div>
             </div>
             
             {/* Live Ticker in Header */}
             <div className="hidden lg:flex items-center gap-2 bg-input-bg border border-border-dim px-4 py-1.5 rounded-sm overflow-hidden max-w-[400px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E61919] animate-pulse shrink-0" />
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={tickerIndex}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 10, opacity: 0 }}
                    className="text-[11px] font-bold truncate text-[#888]"
                  >
                    {tickerItems[tickerIndex]}
                  </motion.p>
                </AnimatePresence>
             </div>
          </div>

          <div className="flex gap-8 items-center">
             <div className="flex flex-col items-end">
                <div className="text-[9px] text-[#444] uppercase tracking-widest font-bold">توقيت الخادم المحلي</div>
                <div className="text-[16px] font-mono text-[#E0E0E0] tabular-nums">
                  {new Date().toLocaleTimeString('en-GB', { hour12: false })}
                </div>
             </div>
             <div className="h-8 w-[1px] bg-border-med" />
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-input-bg border border-border-dim flex items-center justify-center text-[#E61919]">
                   <User size={14} />
                </div>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-8 lg:p-12 max-w-7xl mx-auto">
            {/* Page Title Section */}
            <div className="flex justify-between items-end mb-10">
               <div>
                  <h1 className="text-4xl font-light italic text-white tracking-tight mb-2">أرشيف القاهرة <span className="text-[#E61919]">NEWS</span></h1>
                  <p className="text-[#666] text-xs font-mono uppercase tracking-[0.3em]">AI VIDEO INTEL / SEARCH_CORE_V4</p>
               </div>
               <div className="flex gap-3">
                  <div className="px-4 py-2 bg-card-bg border border-border-dim text-[11px] font-bold text-[#888] rounded-sm uppercase tracking-widest cursor-default">
                    دقة الربط: %99.8
                  </div>
               </div>
            </div>

            <StatsOverview />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Search Column */}
              <div className="lg:col-span-2 space-y-8">
                <SearchBar onSearch={handleSearch} isLoading={isLoading} />

                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-24"
                    >
                      <div className="relative">
                         <div className="w-12 h-12 border border-[#333] border-t-[#E61919] rounded-sm animate-spin" />
                      </div>
                      <p className="mt-8 text-[11px] font-mono text-[#444] uppercase tracking-[0.4em] font-bold">System Scanning Infrastructure</p>
                    </motion.div>
                  ) : hasSearched ? (
                    <motion.div 
                      key="results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4 pb-20"
                    >
                      <div className="flex justify-between items-end mb-6">
                         <h2 className="text-2xl font-light italic text-white">نتائج البحث <span className="text-[#666] text-sm font-mono not-italic tracking-widest leading-none">/ {totalResults}</span></h2>
                         <div className="flex gap-2">
                            <div className="px-3 py-1 bg-input-bg border border-border-dim text-[10px] font-bold text-[#666] rounded-sm uppercase tracking-widest">فرز: المطابقة</div>
                            <button className="px-3 py-1 bg-[#E61919] text-white text-[10px] font-bold rounded-sm uppercase tracking-widest hover:bg-[#cc1616]">تصدير التقرير</button>
                         </div>
                      </div>

                      {results.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                          {results.map((result, idx) => (
                            <ResultCard key={result.id} result={result} index={idx} />
                          ))}
                        </div>
                      ) : (
                        <div className="bg-input-bg border border-border-dim p-12 text-center rounded-sm">
                          <p className="text-[#E61919] font-mono text-sm tracking-widest mb-2 uppercase">NO MATCHES_FOUND</p>
                          <p className="text-[#444] text-[11px] font-bold uppercase tracking-[0.2em]">فشل البحث في العثور على كيانات مطابقة ضمن الأرشيف المتاح</p>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-card-bg border border-border-dim border-dashed rounded-sm p-20 flex flex-col items-center justify-center text-center group transition-all hover:border-[#E61919]/20"
                    >
                      <div className="w-16 h-16 bg-content-bg border border-border-dim flex items-center justify-center mb-8 rounded-sm group-hover:bg-[#E61919]/5 transition-all">
                         <Search size={32} className="text-[#222] group-hover:text-[#E61919]" />
                      </div>
                      <h3 className="text-lg font-mono tracking-widest text-[#444] uppercase mb-3">Initiate System Core</h3>
                      <p className="text-[#333] text-[11px] font-bold uppercase tracking-[0.2em] max-w-sm">أدخل الكلمات المفتاحية لبدء عملية المسح الاستخباراتي للأرشيف الرقمي</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sidebar Visualizations Column */}
              <div className="space-y-8">
                <ActivityChart />

                {/* Insights Card */}
                <div className="bg-card-bg p-6 rounded-sm border border-border-dim">
                  <div className="flex items-center gap-2 mb-6">
                     <div className="w-2 h-2 bg-[#E61919]" />
                     <h3 className="text-[11px] font-bold text-[#E0E0E0] uppercase tracking-[0.2em]">رصد حي للبيانات</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="border-r border-[#E61919] pr-4 py-0.5">
                      <div className="text-[10px] text-[#E61919] font-mono font-bold tracking-widest">14:28:12</div>
                      <div className="text-[11px] font-bold text-white mt-1">طلب بحث جديد من قطاع الرصد الدولي</div>
                    </div>
                    
                    <div className="border-r border-[#333] pr-4 py-0.5 opacity-60">
                      <div className="text-[10px] text-[#444] font-mono tracking-widest">14:27:55</div>
                      <div className="text-[11px] text-[#888] mt-1 italic">أرشفة فيديو: موجز التاسعة والخبر الأهم</div>
                    </div>

                    <div className="border-r border-[#333] pr-4 py-0.5 opacity-60">
                      <div className="text-[10px] text-[#444] font-mono tracking-widest">14:27:01</div>
                      <div className="text-[11px] text-[#888] mt-1 italic">اكتشاف كيان جديد: وزير الخارجية المصري</div>
                    </div>

                    <div className="border-r border-[#E61919] pr-4 py-0.5 border-dashed">
                      <div className="text-[10px] text-[#E61919] font-mono font-bold tracking-widest">14:26:40</div>
                      <div className="text-[11px] font-bold text-white mt-1 uppercase tracking-tight">System Update: Data Sync Successful</div>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-border-dim">
                    <button className="w-full py-3 bg-[#E61919] text-white text-[10px] font-bold rounded-sm hover:bg-[#cc1616] transition-all uppercase tracking-[0.3em]">
                      نظام الإنذار: نشط
                    </button>
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="bg-card-bg p-6 rounded-sm border border-border-dim flex flex-col items-center justify-center gap-4 group hover:bg-input-bg transition-all">
                   <div className="text-[11px] text-[#666] uppercase tracking-[0.2em] font-bold">إجمالي المعالجة اليوم</div>
                   <div className="text-4xl font-mono text-white tracking-widest group-hover:scale-110 transition-transform">1.42<span className="text-[#E61919] text-xl">TB</span></div>
                   <div className="w-full bg-[#111] h-1.5 mt-2 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        className="bg-[#E61919] h-full shadow-[0_0_10px_rgba(230,25,25,0.4)]"
                      />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
