import React, { useState } from 'react';
import { OutreachReport } from '../types';
import { 
  Users, 
  Heart, 
  Stethoscope, 
  BookOpen, 
  MapPin, 
  Calendar, 
  Quote, 
  Image as ImageIcon, 
  FileText, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

interface OutreachReportsProps {
  reports: OutreachReport[];
}

export const OutreachReports: React.FC<OutreachReportsProps> = ({ reports }) => {
  const [selectedReport, setSelectedReport] = useState<OutreachReport | null>(reports[0] || null);

  if (reports.length === 0) return null;

  // Calculate totals
  const totalSouls = reports.reduce((acc, r) => acc + (r.soulsReached || 0), 0);
  const totalConversions = reports.reduce((acc, r) => acc + (r.conversions || 0), 0);
  const totalMedical = reports.reduce((acc, r) => acc + (r.medicalSupportProvided || 0), 0);
  const totalBibles = reports.reduce((acc, r) => acc + (r.biblesDistributed || 0), 0);

  return (
    <section id="reports" className="py-16 md:py-24 bg-[#F1ECE7] text-[#2D2D2D] border-b border-[#E6E2DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#5A5A40] border border-[#DED4C7] text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-[#A68B67]" />
            <span>Mission Impact & Field Reports</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#2D2D2D]">
            Field Outreach Impact Statistics
          </h2>
          <p className="text-[#6B635B] text-sm sm:text-base">
            Detailed reports of souls won, medical surgeries executed, Bibles distributed, and rural communities transformed.
          </p>
        </div>

        {/* Impact Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E6E2DE] text-center space-y-2 shadow-xs">
            <div className="p-3 rounded-xl bg-[#F1ECE7] text-[#5A5A40] border border-[#DED4C7] w-fit mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-extrabold text-[#5A5A40]">
              {totalSouls.toLocaleString()}+
            </div>
            <div className="text-xs text-[#6B635B] font-bold uppercase tracking-wider">Souls Reached</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6E2DE] text-center space-y-2 shadow-xs">
            <div className="p-3 rounded-xl bg-[#F1ECE7] text-[#5A5A40] border border-[#DED4C7] w-fit mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-extrabold text-[#5A5A40]">
              {totalConversions.toLocaleString()}+
            </div>
            <div className="text-xs text-[#6B635B] font-bold uppercase tracking-wider">Conversions & Decisions</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6E2DE] text-center space-y-2 shadow-xs">
            <div className="p-3 rounded-xl bg-[#F1ECE7] text-[#5A5A40] border border-[#DED4C7] w-fit mx-auto">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-extrabold text-[#5A5A40]">
              {totalMedical.toLocaleString()}+
            </div>
            <div className="text-xs text-[#6B635B] font-bold uppercase tracking-wider">Medical Care Patients</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6E2DE] text-center space-y-2 shadow-xs">
            <div className="p-3 rounded-xl bg-[#F1ECE7] text-[#5A5A40] border border-[#DED4C7] w-fit mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-extrabold text-[#5A5A40]">
              {totalBibles.toLocaleString()}+
            </div>
            <div className="text-xs text-[#6B635B] font-bold uppercase tracking-wider">Bibles & Tracts Given</div>
          </div>
        </div>

        {/* Selected Detailed Report Section */}
        {selectedReport && (
          <div className="bg-white rounded-3xl border border-[#E6E2DE] overflow-hidden shadow-xl">
            {/* Report Header */}
            <div className="bg-[#5A5A40] p-6 sm:p-8 text-white border-b border-[#484833]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-[#F1ECE7] font-bold">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#A68B67]" /> {selectedReport.location}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#A68B67]" /> {selectedReport.period}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">{selectedReport.title}</h3>
                  <div className="text-xs text-[#DED4C7]">Coverage Area: <span className="font-bold text-white">{selectedReport.coverageArea}</span></div>
                </div>

                {/* Report Tabs Selector */}
                <div className="flex flex-wrap gap-2">
                  {reports.map((rep) => (
                    <button
                      key={rep.id}
                      onClick={() => setSelectedReport(rep)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedReport.id === rep.id
                          ? 'bg-[#A68B67] text-white'
                          : 'bg-[#484833] text-[#F1ECE7] hover:bg-[#383827]'
                      }`}
                    >
                      {rep.title.split(' ')[0]} Crusade
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Report Body & Field Testimonials */}
            <div className="p-6 sm:p-8 space-y-8">
              <div className="space-y-3">
                <h4 className="text-lg font-serif font-bold text-[#5A5A40]">Outreach Summary</h4>
                <p className="text-[#6B635B] text-sm leading-relaxed">{selectedReport.summary}</p>
              </div>

              {/* Specific Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#F8F5F2] p-4 rounded-2xl border border-[#E6E2DE] text-center text-xs">
                <div>
                  <span className="text-[#8C8279] block">Souls Reached</span>
                  <span className="text-lg font-serif font-bold text-[#2D2D2D]">{selectedReport.soulsReached}</span>
                </div>
                <div>
                  <span className="text-[#8C8279] block">Conversions</span>
                  <span className="text-lg font-serif font-bold text-[#5A5A40]">{selectedReport.conversions}</span>
                </div>
                <div>
                  <span className="text-[#8C8279] block">Medical Patients</span>
                  <span className="text-lg font-serif font-bold text-[#A68B67]">{selectedReport.medicalSupportProvided}</span>
                </div>
                <div>
                  <span className="text-[#8C8279] block">Water Baptisms</span>
                  <span className="text-lg font-serif font-bold text-[#5A5A40]">{selectedReport.baptisms}</span>
                </div>
              </div>

              {/* Field Testimonials */}
              {selectedReport.fieldTestimonials && selectedReport.fieldTestimonials.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-serif font-bold text-[#5A5A40] uppercase tracking-wider">Field Testimonials</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedReport.fieldTestimonials.map((t, i) => (
                      <div key={i} className="bg-[#F8F5F2] p-5 rounded-2xl border border-[#E6E2DE] space-y-2">
                        <Quote className="w-5 h-5 text-[#A68B67]" />
                        <p className="text-xs text-[#6B635B] italic">"{t.testimony}"</p>
                        <div className="text-[11px] font-bold text-[#5A5A40] pt-2 border-t border-[#E6E2DE]">
                          — {t.author}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Photo Gallery */}
              {selectedReport.galleryImages && selectedReport.galleryImages.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-serif font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#A68B67]" /> Field Photo Gallery
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {selectedReport.galleryImages.map((imgUrl, idx) => (
                      <div key={idx} className="rounded-2xl overflow-hidden border border-[#E6E2DE] h-48 group">
                        <img
                          src={imgUrl}
                          alt={`Field photo ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
