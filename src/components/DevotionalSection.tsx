import React, { useState } from 'react';
import { Devotional, Language } from '../types';
import { uiTranslations } from '../lib/localize';
import { 
  BookOpen, 
  Calendar, 
  Play, 
  Share2, 
  Copy, 
  Check, 
  Volume2, 
  Sparkles, 
  Quote, 
  ChevronRight 
} from 'lucide-react';

interface DevotionalSectionProps {
  devotionals: Devotional[];
  currentLanguage: Language;
  onSelectDevotional: (dev: Devotional) => void;
}

export const DevotionalSection: React.FC<DevotionalSectionProps> = ({
  devotionals,
  currentLanguage,
  onSelectDevotional,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedPrayer, setCopiedPrayer] = useState<string | null>(null);

  if (devotionals.length === 0) return null;

  const t = uiTranslations[currentLanguage];
  const latestDevotional = devotionals[0];

  const handleCopyPrayer = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrayer(id);
    setTimeout(() => setCopiedPrayer(null), 2500);
  };

  return (
    <section id="devotionals" className="py-16 md:py-24 bg-[#F1ECE7] text-[#2D2D2D] border-b border-[#E6E2DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#5A5A40] border border-[#DED4C7] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#A68B67]" />
            <span>{t.todayDevotionalBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#2D2D2D]">
            {t.devotionalsHeading}
          </h2>
          <p className="text-[#6B635B] text-sm sm:text-base">
            {t.devotionalsSubheading}
          </p>
        </div>

        {/* Highlighted Today's Exhortation (Big Feature Card) */}
        {latestDevotional && (
          <div className="bg-[#5A5A40] text-white p-8 rounded-3xl border border-[#484833] shadow-xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#A68B67] text-white text-xs font-extrabold uppercase tracking-wide">
                  {t.todayDevotionalBadge}
                </span>
                <span className="text-xs text-[#F1ECE7] font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {latestDevotional.date}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#484833] text-[#F5EEE4] border border-[#383827]">
                  {latestDevotional.theme}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-snug">
                {latestDevotional.title}
              </h3>

              {/* Scripture Highlight Box */}
              <div className="bg-[#484833] p-4 rounded-xl border-l-4 border-[#A68B67] text-[#F5EEE4] text-xs sm:text-sm italic space-y-1">
                <div className="font-bold non-italic text-[#A68B67] font-serif">
                  {latestDevotional.scriptureRef}
                </div>
                <div>"{latestDevotional.scriptureText}"</div>
              </div>

              <p className="text-[#F1ECE7] text-sm leading-relaxed line-clamp-4">
                {latestDevotional.bodyText}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onSelectDevotional(latestDevotional)}
                  className="px-6 py-3 rounded-xl bg-[#A68B67] hover:bg-[#8E7657] text-white text-xs font-bold shadow-md flex items-center gap-2"
                >
                  {t.readFullDevotional} <ChevronRight className="w-4 h-4" />
                </button>

                {latestDevotional.audioUrl && (
                  <button
                    onClick={() => onSelectDevotional(latestDevotional)}
                    className="px-4 py-3 rounded-xl bg-[#484833] hover:bg-[#383827] text-[#F1ECE7] text-xs font-bold border border-[#A68B67]/30 flex items-center gap-2"
                  >
                    <Volume2 className="w-4 h-4 text-[#A68B67]" /> {t.audioPlayer}
                  </button>
                )}
              </div>
            </div>

            {/* Author & Prayer Point Side Panel */}
            <div className="lg:col-span-4 bg-[#484833] p-6 rounded-2xl border border-[#383827] space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#5A5A40]">
                <Quote className="w-8 h-8 text-[#A68B67] shrink-0 opacity-80" />
                <div>
                  <div className="text-[10px] text-[#A68B67] font-bold uppercase">{t.authorLabel}</div>
                  <div className="text-xs font-bold text-white leading-snug">{latestDevotional.author}</div>
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold text-[#A68B67] mb-1">{t.keyTakeawayLabel}</div>
                <p className="text-xs text-[#F1ECE7] leading-relaxed italic">
                  "{latestDevotional.keyTakeaway}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#5A5A40]">
                <div className="text-[10px] uppercase font-bold text-[#A68B67] mb-1 flex items-center justify-between">
                  <span>{t.prayerPointLabel}</span>
                  <button
                    onClick={() => handleCopyPrayer(latestDevotional.prayerPoint, latestDevotional.id)}
                    className="text-[#F1ECE7] hover:text-white flex items-center gap-1 text-[10px]"
                  >
                    {copiedPrayer === latestDevotional.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copiedPrayer === latestDevotional.id ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="text-xs text-[#F5EEE4] font-medium leading-relaxed bg-[#383827] p-2.5 rounded-xl border border-[#5A5A40]">
                  {latestDevotional.prayerPoint}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Previous Devotionals List */}
        {devotionals.length > 1 && (
          <div className="space-y-6 pt-6">
            <h3 className="text-xl font-serif font-bold text-[#2D2D2D]">
              {currentLanguage === 'Tiv' ? 'M-nger u Aond Oron Mbagenev' : 'Devotional Archive'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {devotionals.slice(1).map((dev) => (
                <div
                  key={dev.id}
                  onClick={() => onSelectDevotional(dev)}
                  className="bg-white p-6 rounded-2xl border border-[#E6E2DE] hover:border-[#A68B67] cursor-pointer transition-all space-y-3 group shadow-xs"
                >
                  <div className="flex items-center justify-between text-xs text-[#6B635B]">
                    <span className="font-mono text-[#5A5A40] font-bold">{dev.date}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#F1ECE7] text-[#5A5A40] font-medium">{dev.theme}</span>
                  </div>

                  <h4 className="text-base font-serif font-bold text-[#2D2D2D] group-hover:text-[#A68B67] transition-colors line-clamp-2">
                    {dev.title}
                  </h4>

                  <p className="text-xs text-[#6B635B] line-clamp-3 leading-relaxed">
                    {dev.bodyText}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#5A5A40]">
                    <span>{dev.scriptureRef}</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[#A68B67]">
                      {t.readMore} <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
