import React, { useState } from 'react';
import { NewsItem } from '../types';
import { Bell, AlertCircle, ChevronRight, Volume2 } from 'lucide-react';

interface NewsTickerProps {
  newsItems: NewsItem[];
  onSelectNews: (item: NewsItem) => void;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ newsItems, onSelectNews }) => {
  const tickerItems = newsItems.filter(n => n.isTicker);
  const itemsToDisplay = tickerItems.length > 0 ? tickerItems : newsItems;
  const [currentIndex, setCurrentIndex] = useState(0);

  if (itemsToDisplay.length === 0) return null;

  const currentItem = itemsToDisplay[currentIndex % itemsToDisplay.length];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % itemsToDisplay.length);
  };

  return (
    <div className="bg-[#5A5A40] text-white py-2.5 px-4 text-sm border-b border-[#484833] shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Ticker Label Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#A68B67] text-white border border-[#F1ECE7]/20 animate-pulse">
            <Bell className="w-3.5 h-3.5 text-white" />
            GGMI Updates
          </span>
          <span className="text-[#A68B67] hidden sm:inline">|</span>
        </div>

        {/* Ticker Item Content */}
        <div className="flex-1 min-w-0 flex items-center gap-2 w-full sm:w-auto">
          {currentItem.category === 'Urgent Prayer' ? (
            <AlertCircle className="w-4 h-4 text-amber-200 shrink-0" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#A68B67] shrink-0" />
          )}

          <div 
            onClick={() => onSelectNews(currentItem)}
            className="truncate text-xs sm:text-sm font-medium hover:text-[#F1ECE7] cursor-pointer transition-colors flex-1 text-[#F8F5F2]"
          >
            <span className="font-bold text-[#A68B67] mr-2">[{currentItem.category}]:</span>
            {currentItem.title}
          </div>

          <button
            onClick={() => onSelectNews(currentItem)}
            className="shrink-0 text-xs font-semibold text-[#F1ECE7] hover:text-white underline underline-offset-2 flex items-center gap-0.5"
          >
            Read <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Navigation Dots */}
        {itemsToDisplay.length > 1 && (
          <div className="flex items-center gap-1.5 shrink-0 hidden md:flex">
            {itemsToDisplay.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === (currentIndex % itemsToDisplay.length)
                    ? 'w-5 bg-[#A68B67]'
                    : 'bg-[#484833] hover:bg-[#8E7657]'
                }`}
                title={`Go to item ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
