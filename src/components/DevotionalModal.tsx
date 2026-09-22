import React, { useState } from 'react';
import { Devotional, Language } from '../types';
import { uiTranslations } from '../lib/localize';
import { X, Volume2, Copy, Check, BookOpen } from 'lucide-react';
import { SocialShareButtons } from './SocialShareButtons';

interface DevotionalModalProps {
  devotional: Devotional | null;
  currentLanguage?: Language;
  onClose: () => void;
}

export const DevotionalModal: React.FC<DevotionalModalProps> = ({
  devotional,
  currentLanguage = 'English',
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!devotional) return null;

  const t = uiTranslations[currentLanguage];

  const handleCopy = () => {
    const text = `${devotional.title}\nScripture: ${devotional.scriptureRef}\n"${devotional.scriptureText}"\n\n${devotional.bodyText}\n\nPrayer Point: ${devotional.prayerPoint}\n\nGlobal Gospel Missions Initiative (GGMI)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareSummary = `Scripture: ${devotional.scriptureRef}\n"${devotional.scriptureText}"\n\nPrayer Point: ${devotional.prayerPoint}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2D2D]/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-[#E6E2DE] rounded-2xl max-w-2xl w-full text-[#2D2D2D] shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#F1ECE7] px-6 py-4 border-b border-[#E6E2DE] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#5A5A40] text-white font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#A68B67] font-mono font-bold uppercase block">{devotional.date} • {devotional.theme}</span>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#2D2D2D] line-clamp-1">{devotional.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8C8279] hover:text-[#2D2D2D] hover:bg-[#E6E2DE] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Scripture Box */}
          <div className="bg-[#F8F5F2] p-4 rounded-xl border-l-4 border-[#5A5A40] space-y-1">
            <div className="font-bold text-[#5A5A40] font-serif text-sm">
              {devotional.scriptureRef}
            </div>
            <p className="text-xs text-[#6B635B] italic leading-relaxed">
              "{devotional.scriptureText}"
            </p>
          </div>

          {/* Audio Player if URL exists */}
          {devotional.audioUrl && (
            <div className="bg-[#F1ECE7] p-4 rounded-xl border border-[#DED4C7] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#5A5A40]">
                <Volume2 className="w-4 h-4 text-[#A68B67]" />
                <span>{t.audioPlayer}</span>
              </div>
              <audio controls className="w-full h-10 accent-[#5A5A40]">
                <source src={devotional.audioUrl} type="audio/mpeg" />
                Your browser does not support audio playback.
              </audio>
            </div>
          )}

          {/* Main Body */}
          <div className="text-[#2D2D2D] text-sm leading-relaxed space-y-4 font-sans whitespace-pre-line">
            {devotional.bodyText}
          </div>

          {/* Key Takeaway & Prayer Point */}
          <div className="bg-[#F8F5F2] p-5 rounded-2xl border border-[#E6E2DE] space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase text-[#A68B67] tracking-wider">{t.keyTakeawayLabel}</span>
              <p className="text-xs text-[#6B635B] italic mt-0.5">"{devotional.keyTakeaway}"</p>
            </div>

            <div className="pt-2 border-t border-[#E6E2DE]">
              <span className="text-[10px] font-bold uppercase text-[#A68B67] tracking-wider">{t.prayerPointLabel}</span>
              <p className="text-xs text-[#5A5A40] font-semibold mt-0.5 bg-[#F1ECE7] p-2.5 rounded-lg border border-[#DED4C7]">
                {devotional.prayerPoint}
              </p>
            </div>

            <div className="pt-2 text-[11px] text-[#6B635B] font-medium">
              {t.authorLabel}: <span className="text-[#5A5A40] font-semibold">{devotional.author}</span>
            </div>
          </div>

          {/* Social Media Share Buttons */}
          <SocialShareButtons
            title={devotional.title}
            summary={shareSummary}
            category={`GGMI Daily Devotional (${devotional.date})`}
            currentLanguage={currentLanguage}
          />

        </div>

        {/* Footer actions */}
        <div className="bg-[#F1ECE7] px-6 py-4 border-t border-[#E6E2DE] flex items-center justify-between shrink-0">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#F8F5F2] text-[#5A5A40] text-xs font-bold flex items-center gap-2 border border-[#E6E2DE]"
          >
            {copied ? <Check className="w-4 h-4 text-[#5A5A40]" /> : <Copy className="w-4 h-4" />}
            {copied ? (currentLanguage === 'Tiv' ? 'I Copy sha Clipboard' : 'Copied to Clipboard') : (currentLanguage === 'Tiv' ? 'Copy Aond Oron' : 'Copy Exhortation')}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold shadow-xs"
          >
            {currentLanguage === 'Tiv' ? 'Cir' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
