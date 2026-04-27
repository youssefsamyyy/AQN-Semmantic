/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SearchResult {
  id: string;
  video_name: string;
  video_url: string;
  start_time: number;
  end_time: number;
  text: string;
  score: number;
  thumbnail?: string;
  category?: string;
  date: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total_results: number;
  search_time_ms: number;
}

const MOCK_RESULTS: SearchResult[] = [
  {
    id: "1",
    video_name: "تغطية مباشرة: الانتخابات الرئاسية",
    video_url: "https://www.youtube.com/watch?v=mock1",
    start_time: 120,
    end_time: 180,
    text: "مناقشة حول مستقبل السياسة الخارجية وتأثير النتائج المتوقعة على المنطقة العربية والشرق الأوسط بشكل عام.",
    score: 0.95,
    category: "سياسة",
    date: "2024-03-20T10:00:00Z"
  },
  {
    id: "2",
    video_name: "الموجز الاقتصادي المسائي",
    video_url: "https://www.youtube.com/watch?v=mock2",
    start_time: 450,
    end_time: 510,
    text: "تحليل شامل لأسعار الذهب والعملات وتوقعات الخبراء الاقتصاديين للأسبوع القادم في ظل التغيرات العالمية.",
    score: 0.88,
    category: "اقتصاد",
    date: "2024-03-20T18:30:00Z"
  },
  {
    id: "3",
    video_name: "لقاء خاص مع وزير الخارجية",
    video_url: "https://www.youtube.com/watch?v=mock3",
    start_time: 15,
    end_time: 125,
    text: "تصريحات حصرية حول العلاقات الثنائية والتعاون المشترك في مجالات الطاقة والأمن الغذائي.",
    score: 0.82,
    category: "دبلوماسية",
    date: "2024-03-19T14:15:00Z"
  },
  {
    id: "4",
    video_name: "نشرة أخبار الظهيرة",
    video_url: "https://www.youtube.com/watch?v=mock4",
    start_time: 900,
    end_time: 1020,
    text: "تطورات الأوضاع الميدانية والجهود الإنسانية المبذولة لدعم المتضررين في المناطق المنكوبة.",
    score: 0.75,
    category: "أخبار عالمية",
    date: "2024-03-20T12:00:00Z"
  }
];

export const searchService = {
  search: async (query: string): Promise<SearchResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In real app, this would be: 
    // const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}&top_k=10`);
    
    const results = MOCK_RESULTS.filter(r => 
      r.text.includes(query) || r.video_name.includes(query) || query === ""
    );

    return {
      results,
      total_results: results.length,
      search_time_ms: 124
    };
  }
};
