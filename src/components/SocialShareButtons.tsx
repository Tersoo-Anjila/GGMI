import React, { useState } from 'react';
import { Share2, Copy, Check, Send, Globe, MessageCircle } from 'lucide-react';
import { Language } from '../types';

interface SocialShareButtonsProps {
  title: string;
  summary: string;
  url?: string;
  category?: string;
  currentLanguage?: Language;
}

export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  title,
  summary,
  url = window.location.href,
  category = 'GGMI Content',
  currentLanguage = 'English',
}) => {
  const [copied, setCopied] = useState(false);

  // Clean formatted text for message body when sharing to messaging apps
  const shareText = `*${title}*\n${category ? `[${category}]` : ''}\n\n${summary}\n\nShared via Global Gospel Missions Initiative (GGMI)`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(url);

  // Social Links
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}\n\n${summary.slice(0, 200)}...\n\nRead more at: ${url}`)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodeURIComponent(title)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${title}" - ${summary.slice(0, 100)}...`)}&url=${encodedUrl}`;
  const telegramUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(`${title}\n\n${summary.slice(0, 150)}...`)}`;

  const handleCopy = () => {
    const fullContent = `${title}\n\n${summary}\n\nRead more: ${url}`;
    navigator.clipboard.writeText(fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `${title}\n${summary.slice(0, 150)}...`,
          url: url,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  const isTiv = currentLanguage === 'Tiv';

  return (
    <div className="bg-[#F8F5F2] p-4 rounded-xl border border-[#E6E2DE] space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#A68B67] flex items-center gap-1.5">
          <Share2 className="w-3.5 h-3.5 text-[#5A5A40]" />
          {isTiv ? 'Subusha a Vandem (Social Media)' : 'Share via Social Media'}
        </span>
        {copied && (
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Check className="w-3 h-3" /> {isTiv ? 'I Copy sha Clipboard!' : 'Copied!'}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold">
        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xs transition-transform active:scale-95"
          title="Share to WhatsApp"
        >
          {/* WhatsApp SVG Icon */}
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.999 1.596-1.036 3.785 3.78-1.014 1.054.671z"/>
          </svg>
          <span>WhatsApp</span>
        </a>

        {/* Facebook Button */}
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white shadow-xs transition-transform active:scale-95"
          title="Share to Facebook"
        >
          {/* Facebook SVG Icon */}
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span>Facebook</span>
        </a>

        {/* X / Twitter Button */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#0F1419] hover:bg-black text-white shadow-xs transition-transform active:scale-95"
          title="Share to X (Twitter)"
        >
          {/* X Logo */}
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span>X (Twitter)</span>
        </a>

        {/* Telegram Button */}
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#229ED9] hover:bg-[#1d8dc3] text-white shadow-xs transition-transform active:scale-95"
          title="Share to Telegram"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Telegram</span>
        </a>
      </div>

      <div className="flex items-center gap-2 pt-1 border-t border-[#E6E2DE]">
        <button
          type="button"
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#F1ECE7] text-[#5A5A40] text-xs font-bold border border-[#E6E2DE] transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? (isTiv ? 'I Copy!' : 'Copied!') : (isTiv ? 'Copy Oran' : 'Copy Text')}</span>
        </button>

        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{isTiv ? 'Msen Sha Apps' : 'Share App Sheet...'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
