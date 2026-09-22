import React, { useState } from 'react';
import { FAQItem } from '../types';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';

interface FAQSectionProps {
  faqs: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'General', 'Membership', 'Conference', 'Outreach & Giving'];

  const filtered = faqs.filter((f) => {
    const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSearch = f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#F8F5F2] text-[#2D2D2D] border-b border-[#E6E2DE]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F1ECE7] text-[#5A5A40] border border-[#DED4C7] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#A68B67]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#2D2D2D]">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-[#6B635B] text-sm sm:text-base">
            Find quick details regarding GGMI membership, conference registration, study classes, and donations.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white p-5 rounded-2xl border border-[#E6E2DE] shadow-xs space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8C8279] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g., conference Tiv class, accommodation, tracts download)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#5A5A40] text-white shadow-xs'
                    : 'bg-[#F1ECE7] text-[#6B635B] hover:text-[#2D2D2D] hover:bg-[#E6E2DE]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filtered.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#E6E2DE] shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#2D2D2D] hover:text-[#A68B67] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-[#F1ECE7] text-[#5A5A40] font-mono text-[10px] uppercase border border-[#DED4C7]">
                      {faq.category}
                    </span>
                    {faq.question}
                  </span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-[#A68B67] shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#8C8279] shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#6B635B] leading-relaxed border-t border-[#E6E2DE] font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
