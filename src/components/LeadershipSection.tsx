import React from 'react';
import { LeaderProfile } from '../types';
import { Users, Award, ShieldCheck, Sparkles } from 'lucide-react';

interface LeadershipSectionProps {
  leaders: LeaderProfile[];
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({ leaders }) => {
  if (leaders.length === 0) return null;

  const sortedLeaders = [...leaders].sort((a, b) => a.order - b.order);

  return (
    <section id="leadership" className="py-16 md:py-24 bg-[#F8F5F2] text-[#2D2D2D] border-b border-[#E6E2DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F1ECE7] text-[#5A5A40] border border-[#DED4C7] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#A68B67]" />
            <span>GGMI Executive Board & Trustees</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#2D2D2D]">
            Leadership & Board of Trustees
          </h2>
          <p className="text-[#6B635B] text-sm sm:text-base">
            God-fearing ministers, apostolic leaders, and trustees guiding Global Gospel Missions Initiative in truth, vision, and integrity.
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sortedLeaders.map((leader) => (
            <div
              key={leader.id}
              className="bg-white rounded-2xl border border-[#E6E2DE] hover:border-[#A68B67] transition-all overflow-hidden space-y-4 group flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Photo */}
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={leader.imageUrl}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/40 via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#F5F0EB] text-[#5A5A40] border border-[#A68B67]/50 text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                    {leader.role}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#2D2D2D] group-hover:text-[#A68B67] transition-colors">
                    {leader.name}
                  </h3>
                  <p className="text-xs text-[#6B635B] leading-relaxed line-clamp-4 pt-1">
                    {leader.bio}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#E6E2DE] mt-auto">
                <span className="text-[11px] font-bold text-[#A68B67] flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> GGMI Trustee
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
