import React, { useState } from 'react';
import { Testimonial } from '../types';
import { Quote, Play, Video, MessageSquare, Image as ImageIcon, Sparkles } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const [filterType, setFilterType] = useState<'all' | 'text' | 'photo' | 'video'>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<Testimonial | null>(null);

  const filtered = filterType === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.type === filterType);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[#F1ECE7] text-[#2D2D2D] border-b border-[#E6E2DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#5A5A40] border border-[#DED4C7] text-xs font-bold uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5 text-[#A68B67]" />
            <span>Testimonies of Transformation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#2D2D2D]">
            Lives Transformed by the Gospel
          </h2>
          <p className="text-[#6B635B] text-sm sm:text-base">
            Read and watch real stories of salvation, divine healing during medical outreach, and spiritual growth from GGMI mission fields.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-xl transition-all ${
              filterType === 'all' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#6B635B] border border-[#E6E2DE] hover:text-[#2D2D2D]'
            }`}
          >
            All Testimonies
          </button>
          <button
            onClick={() => setFilterType('text')}
            className={`px-4 py-2 rounded-xl transition-all ${
              filterType === 'text' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#6B635B] border border-[#E6E2DE] hover:text-[#2D2D2D]'
            }`}
          >
            Text Testimonies
          </button>
          <button
            onClick={() => setFilterType('photo')}
            className={`px-4 py-2 rounded-xl transition-all ${
              filterType === 'photo' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#6B635B] border border-[#E6E2DE] hover:text-[#2D2D2D]'
            }`}
          >
            Photo Stories
          </button>
          <button
            onClick={() => setFilterType('video')}
            className={`px-4 py-2 rounded-xl transition-all ${
              filterType === 'video' ? 'bg-[#5A5A40] text-white shadow-xs' : 'bg-white text-[#6B635B] border border-[#E6E2DE] hover:text-[#2D2D2D]'
            }`}
          >
            Video Testimonials
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-2xl border border-[#E6E2DE] hover:border-[#A68B67] transition-all flex flex-col justify-between space-y-4 group shadow-xs"
            >
              <div className="space-y-3">
                {/* Photo / Video Thumbnail */}
                {t.imageUrl && (
                  <div className="h-44 rounded-xl overflow-hidden relative mb-2 border border-[#E6E2DE]">
                    <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}

                {t.type === 'video' && (
                  <div className="bg-[#F8F5F2] p-4 rounded-xl border border-[#E6E2DE] text-center space-y-2 cursor-pointer hover:border-[#A68B67] transition-colors" onClick={() => setActiveVideoModal(t)}>
                    <div className="w-10 h-10 rounded-full bg-[#A68B67] text-white flex items-center justify-center mx-auto shadow-xs">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                    <span className="text-xs font-bold text-[#5A5A40] block">Watch Video Testimony</span>
                  </div>
                )}

                <Quote className="w-6 h-6 text-[#A68B67]" />
                <p className="text-xs text-[#6B635B] leading-relaxed italic">"{t.content}"</p>
              </div>

              <div className="pt-4 border-t border-[#E6E2DE] space-y-0.5">
                <h4 className="text-sm font-bold text-[#2D2D2D] font-serif">{t.name}</h4>
                <span className="text-[11px] text-[#A68B67] font-medium block">{t.roleLocation}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2D2D]/80 backdrop-blur-xs">
            <div className="bg-white border border-[#E6E2DE] rounded-2xl max-w-2xl w-full p-5 space-y-4 shadow-2xl">
              <div className="flex justify-between items-center pb-3 border-b border-[#E6E2DE]">
                <h4 className="text-base font-serif font-bold text-[#2D2D2D]">{activeVideoModal.name} - Video Testimony</h4>
                <button onClick={() => setActiveVideoModal(null)} className="text-[#8C8279] hover:text-[#2D2D2D] font-bold">✕</button>
              </div>
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-[#2D2D2D]">
                <iframe src={activeVideoModal.videoUrl} title="Video Testimony" className="w-full h-full" allowFullScreen />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
