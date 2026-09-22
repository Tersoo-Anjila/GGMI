import React from 'react';
import { motion } from 'motion/react';
import { Devotional } from '../types';
import { 
  Globe2, 
  BookOpen, 
  UserPlus, 
  CalendarCheck, 
  Download, 
  Sparkles, 
  ArrowRight, 
  Heart, 
  MapPin, 
  Award,
  Play,
  Users,
  Compass,
  FolderArchive,
  FileText,
  Video,
  PhoneCall
} from 'lucide-react';

interface HeroSectionProps {
  todayDevotional?: Devotional;
  onReadDevotional: (dev: Devotional) => void;
  onOpenMemberModal: () => void;
  onOpenConferenceModal: () => void;
  onOpenRepository: () => void;
  onOpenDonationModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  todayDevotional,
  onReadDevotional,
  onOpenMemberModal,
  onOpenConferenceModal,
  onOpenRepository,
  onOpenDonationModal,
}) => {
  return (
    <section id="hero" className="relative bg-[#2A2925] text-[#F8F5F2] overflow-hidden border-b border-[#383827]">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#5A5A40]/30 via-[#2A2925]/90 to-[#1A1916] pointer-events-none" />

      {/* Decorative Natural Tones Pattern Accent */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#A68B67]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#5A5A40]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content (Left 7 Cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5A5A40]/50 border border-[#A68B67]/40 text-[#F5EEE4] text-xs font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#A68B67]" />
              <span>Global Gospel Missions Initiative (GGMI)</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-[1.18]">
              Preaching Christ, <br />
              <span className="text-[#A68B67] font-black">
                Transforming Lives
              </span>, <br />
              Reaching Frontier Nations.
            </h1>

            {/* Sub-headline / Mission & Vision */}
            <p className="text-[#DED4C7] text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              GGMI is an interdenominational missionary ministry dedicated to total world evangelization through pioneer rural crusades, medical relief, multimedia gospel publication in Tiv & English, and discipling believers for kingdom harvest.
            </p>

            {/* Quick Stats Pill Row */}
            <div className="grid grid-cols-3 gap-3 pt-2 pb-4 border-y border-[#383827] max-w-xl">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#A68B67] font-serif">15,000+</div>
                <div className="text-[11px] sm:text-xs text-[#8C8279] font-medium">Souls Reached</div>
              </div>
              <div className="border-l border-[#383827] pl-3">
                <div className="text-xl sm:text-2xl font-extrabold text-[#A68B67] font-serif">40+</div>
                <div className="text-[11px] sm:text-xs text-[#8C8279] font-medium">Rural Villages Covered</div>
              </div>
              <div className="border-l border-[#383827] pl-3">
                <div className="text-xl sm:text-2xl font-extrabold text-[#A68B67] font-serif">100% Free</div>
                <div className="text-[11px] sm:text-xs text-[#8C8279] font-medium">Gospel Literature & Care</div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenConferenceModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#A68B67] hover:bg-[#8E7657] text-white shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <CalendarCheck className="w-4 h-4" />
                Register for Conference
              </button>

              <button
                onClick={onOpenMemberModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#5A5A40] hover:bg-[#484833] text-white border border-[#A68B67]/30 shadow-xs transition-all transform hover:-translate-y-0.5"
              >
                <UserPlus className="w-4 h-4 text-[#A68B67]" />
                Become a Member
              </button>

              <button
                onClick={onOpenDonationModal}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-[#383827] hover:bg-[#484833] text-[#F5EEE4] border border-[#5A5A40] transition-all"
              >
                <Heart className="w-4 h-4 text-[#A68B67]" />
                Support Missions
              </button>
            </div>

            {/* Quick Hero Navigation Menu */}
            <div className="pt-3 border-t border-[#383827]/80 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#A68B67] uppercase tracking-wider flex items-center gap-1.5 mr-1">
                <Compass className="w-3.5 h-3.5" /> Quick Menu:
              </span>
              <button
                onClick={() => {
                  const el = document.getElementById('about');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#34322C] hover:bg-[#484833] text-[#F8F5F2] hover:text-white text-xs font-semibold border border-[#5A5A40]/70 hover:border-[#A68B67] transition-all shadow-xs"
              >
                <Globe2 className="w-3.5 h-3.5 text-[#A68B67]" />
                About Us
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('devotionals');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#34322C] hover:bg-[#484833] text-[#F8F5F2] hover:text-white text-xs font-semibold border border-[#5A5A40]/70 hover:border-[#A68B67] transition-all shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#A68B67]" />
                Devotional
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('reports');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#34322C] hover:bg-[#484833] text-[#F8F5F2] hover:text-white text-xs font-semibold border border-[#5A5A40]/70 hover:border-[#A68B67] transition-all shadow-xs"
              >
                <FileText className="w-3.5 h-3.5 text-[#A68B67]" />
                Outreach Reports
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('repository');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#34322C] hover:bg-[#484833] text-[#F8F5F2] hover:text-white text-xs font-semibold border border-[#5A5A40]/70 hover:border-[#A68B67] transition-all shadow-xs"
              >
                <FolderArchive className="w-3.5 h-3.5 text-[#A68B67]" />
                Gospel Repository
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('leadership');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#34322C] hover:bg-[#484833] text-[#F8F5F2] hover:text-white text-xs font-semibold border border-[#5A5A40]/70 hover:border-[#A68B67] transition-all shadow-xs"
              >
                <Users className="w-3.5 h-3.5 text-[#A68B67]" />
                Leadership
              </button>
            </div>
          </motion.div>

          {/* Featured Right Column: Devotional & Quick Portal Card (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Daily Devotional Card */}
            {todayDevotional && (
              <div className="bg-[#34322C] p-6 rounded-2xl border border-[#5A5A40]/50 hover:border-[#A68B67] shadow-2xl relative overflow-hidden group transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_10px_30px_rgba(166,139,103,0.18)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#A68B67]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#A68B67]/20 transition-all duration-500" />

                <div className="flex items-center justify-between pb-3 border-b border-[#484833] mb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-[#5A5A40]/60 text-[#A68B67] border border-[#A68B67]/30 group-hover:border-[#A68B67]/60 group-hover:bg-[#5A5A40]/80 transition-all duration-300">
                      <BookOpen className="w-4 h-4" />
                    </span>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#A68B67]">Daily Devotional</h3>
                      <p className="text-[11px] text-[#8C8279]">{todayDevotional.date}</p>
                    </div>
                  </div>
                  {todayDevotional.audioUrl && (
                    <span className="px-2 py-1 rounded bg-[#A68B67]/20 text-[#F5EEE4] text-[10px] font-bold flex items-center gap-1 border border-[#A68B67]/30">
                      <Play className="w-3 h-3 fill-current text-[#A68B67]" /> Audio Included
                    </span>
                  )}
                </div>

                <h4 className="text-lg font-serif font-bold text-[#F8F5F2] mb-2 line-clamp-2 leading-snug group-hover:text-white transition-colors">
                  "{todayDevotional.title}"
                </h4>

                <div className="bg-[#2A2925] p-3 rounded-xl border border-[#484833] group-hover:border-[#5A5A40] mb-3 text-xs italic text-[#F1ECE7] transition-colors">
                  <span className="font-bold non-italic text-[#A68B67] mr-1.5">[{todayDevotional.scriptureRef}]:</span>
                  "{todayDevotional.scriptureText}"
                </div>

                <p className="text-[#DED4C7] text-xs leading-relaxed line-clamp-3 mb-4">
                  {todayDevotional.bodyText}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-[#A68B67] font-medium truncate max-w-[180px]">
                    By: {todayDevotional.author}
                  </span>
                  <button
                    onClick={() => onReadDevotional(todayDevotional)}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#A68B67] hover:bg-[#8E7657] text-white text-xs font-bold shadow-xs transition-all transform hover:translate-x-0.5"
                  >
                    Read Full Word <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Quick Gospel Repository Access Banner */}
            <div className="bg-[#34322C] p-5 rounded-2xl border border-[#484833] hover:border-[#A68B67] flex items-center justify-between gap-4 shadow-lg hover:shadow-[0_10px_30px_rgba(166,139,103,0.15)] transition-all duration-300 hover:scale-[1.015] group">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-[#5A5A40]/50 text-[#A68B67] border border-[#A68B67]/30 group-hover:border-[#A68B67]/60 group-hover:bg-[#5A5A40]/80 transition-all duration-300 shrink-0">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#F8F5F2] transition-colors">Gospel Literature & Media</h4>
                  <p className="text-xs text-[#8C8279]">Download Tiv & English Tracts, Books, Sermons</p>
                </div>
              </div>
              <button
                onClick={onOpenRepository}
                className="shrink-0 px-3.5 py-2 rounded-xl bg-[#5A5A40] hover:bg-[#484833] text-[#F5EEE4] text-xs font-bold border border-[#A68B67]/30 transition-all transform hover:-translate-y-0.5 shadow-xs"
              >
                Browse Hub
              </button>
            </div>
          </div>

        </div>

        {/* Hero Bottom Navigation Bar */}
        <div className="mt-12 pt-6 border-t border-[#383827]/80 flex flex-col lg:flex-row items-center justify-between gap-4 bg-[#23221E]/60 p-4 rounded-2xl border border-[#484833]/40">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#A68B67]">
            <Compass className="w-4 h-4" />
            <span className="uppercase tracking-wider">Landing Page Navigation:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            <button
              onClick={() => {
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#34322C] hover:bg-[#5A5A40] text-[#F8F5F2] hover:text-white text-xs font-bold border border-[#484833] hover:border-[#A68B67] transition-all shadow-xs"
            >
              <Globe2 className="w-3.5 h-3.5 text-[#A68B67]" />
              About Us
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('devotionals');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#34322C] hover:bg-[#5A5A40] text-[#F8F5F2] hover:text-white text-xs font-bold border border-[#484833] hover:border-[#A68B67] transition-all shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#A68B67]" />
              Devotional
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('reports');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#34322C] hover:bg-[#5A5A40] text-[#F8F5F2] hover:text-white text-xs font-bold border border-[#484833] hover:border-[#A68B67] transition-all shadow-xs"
            >
              <FileText className="w-3.5 h-3.5 text-[#A68B67]" />
              Outreach Reports
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('repository');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#34322C] hover:bg-[#5A5A40] text-[#F8F5F2] hover:text-white text-xs font-bold border border-[#484833] hover:border-[#A68B67] transition-all shadow-xs"
            >
              <FolderArchive className="w-3.5 h-3.5 text-[#A68B67]" />
              Gospel Repository
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('leadership');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#34322C] hover:bg-[#5A5A40] text-[#F8F5F2] hover:text-white text-xs font-bold border border-[#484833] hover:border-[#A68B67] transition-all shadow-xs"
            >
              <Users className="w-3.5 h-3.5 text-[#A68B67]" />
              Leadership
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('events');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#34322C] hover:bg-[#5A5A40] text-[#F8F5F2] hover:text-white text-xs font-bold border border-[#484833] hover:border-[#A68B67] transition-all shadow-xs"
            >
              <Video className="w-3.5 h-3.5 text-[#A68B67]" />
              Virtual Events
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#34322C] hover:bg-[#5A5A40] text-[#F8F5F2] hover:text-white text-xs font-bold border border-[#484833] hover:border-[#A68B67] transition-all shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#A68B67]" />
              Contact
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
