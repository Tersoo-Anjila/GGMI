import React from 'react';
import { NewsItem, Language } from '../types';
import { X, AlertCircle, Radio } from 'lucide-react';
import { SocialShareButtons } from './SocialShareButtons';

interface NewsModalProps {
  news: NewsItem | null;
  currentLanguage?: Language;
  onClose: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({
  news,
  currentLanguage = 'English',
  onClose,
}) => {
  if (!news) return null;

  const isTiv = currentLanguage === 'Tiv';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2D2D]/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-[#E6E2DE] rounded-2xl max-w-xl w-full text-[#2D2D2D] shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#F1ECE7] px-6 py-4 border-b border-[#E6E2DE] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#5A5A40] text-white font-bold">
              {news.category === 'Urgent Prayer' ? (
                <AlertCircle className="w-5 h-5 text-amber-300" />
              ) : (
                <Radio className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                  news.category === 'Urgent Prayer' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                  news.category === 'Outreach' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                  news.category === 'Conference' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                  'bg-[#E6E2DE] text-[#5A5A40]'
                }`}>
                  {news.category}
                </span>
                <span className="text-[10px] text-[#8C8279] font-mono">{news.date}</span>
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#2D2D2D] line-clamp-1 mt-0.5">
                {news.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8C8279] hover:text-[#2D2D2D] hover:bg-[#E6E2DE] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {news.imageUrl && (
            <div className="rounded-xl overflow-hidden border border-[#E6E2DE] bg-stone-100 aspect-video max-h-60">
              <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover" />
            </div>
          )}

          {news.snippet && (
            <div className="bg-[#F8F5F2] p-3.5 rounded-xl border-l-4 border-[#A68B67] text-xs text-[#5A5A40] font-medium italic">
              "{news.snippet}"
            </div>
          )}

          <div className="text-sm text-[#2D2D2D] leading-relaxed whitespace-pre-line font-sans">
            {news.content}
          </div>

          {/* Social Share Section */}
          <SocialShareButtons
            title={news.title}
            summary={news.snippet || news.content.slice(0, 180)}
            category={`GGMI ${news.category} News`}
            currentLanguage={currentLanguage}
          />
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F1ECE7] px-6 py-4 border-t border-[#E6E2DE] flex items-center justify-between shrink-0">
          <span className="text-[11px] text-[#6B635B]">
            Global Gospel Missions Initiative
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold shadow-xs"
          >
            {isTiv ? 'Cir' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
