/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-4xl mx-auto mb-10" dir="rtl">
      <div className="relative group">
        <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none text-[#444] group-focus-within:text-[#E61919] transition-colors">
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
        </div>
        <input
          type="text"
          className="w-full h-14 pr-14 pl-4 bg-input-bg border border-border-med rounded-sm text-base focus:border-[#E61919] focus:outline-none transition-all font-medium placeholder:text-[#444] text-right text-[#E0E0E0]"
          placeholder="كلمات مفتاحية... مثال: الفيديو الافتتاحي لمؤتمر المناخ"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute left-1.5 top-1.5 bottom-1.5 px-6 bg-[#E61919] text-white font-bold text-sm rounded shadow-lg shadow-[#E61919]/10 hover:bg-[#cc1616] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          البحث الاستخباري
        </button>
      </div>
      
      <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide text-[10px] font-mono tracking-widest uppercase">
        {['الانتخابات', 'الاقتصاد العالمي', 'التطورات الميدانية', 'لقاءات حصرية', 'الشرق الأوسط'].map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => { setQuery(term); onSearch(term); }}
            className="whitespace-nowrap px-3 py-1.5 bg-card-bg border border-border-dim text-[#666] hover:border-[#E61919] hover:text-[#E61919] transition-all"
          >
            {term}
          </button>
        ))}
      </div>
    </form>
  );
};
