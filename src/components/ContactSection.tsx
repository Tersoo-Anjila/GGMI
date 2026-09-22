import React, { useState } from 'react';
import { submitContactMessage } from '../lib/api';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Globe2, 
  Sparkles,
  Loader2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    try {
      await submitContactMessage(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Error submitting contact message:", err);
      alert("Failed to submit message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F1ECE7] text-[#2D2D2D] border-b border-[#E6E2DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#5A5A40] border border-[#DED4C7] text-xs font-bold uppercase tracking-wider">
            <PhoneCall className="w-3.5 h-3.5 text-[#A68B67]" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#2D2D2D]">
            Connect with GGMI Headquarters
          </h2>
          <p className="text-[#6B635B] text-sm sm:text-base">
            Have questions about mission partnerships, conference attendance, or requesting gospel tracts? Send us a message today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Cards (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E2DE] space-y-2 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#F1ECE7] text-[#5A5A40] border border-[#DED4C7]">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#A68B67]">Official Phone Lines</span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <a href="tel:+2348066246499" className="text-base sm:text-lg font-extrabold text-[#2D2D2D] hover:text-[#5A5A40] font-serif">
                      +234 806 624 6499
                    </a>
                    <span className="hidden sm:inline text-stone-300">|</span>
                    <a href="tel:+2348060899922" className="text-base sm:text-lg font-extrabold text-[#2D2D2D] hover:text-[#5A5A40] font-serif">
                      +234 806 089 9922
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#6B635B] pt-1">Call or SMS for immediate prayer, conference inquiries, and counseling.</p>
            </div>

            {/* Email Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E2DE] space-y-2 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#F1ECE7] text-[#5A5A40] border border-[#DED4C7]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#A68B67]">Official Email</span>
                  <a href="mailto:globalgospelmissionsinitiative@gmail.com" className="text-sm font-bold text-[#2D2D2D] hover:text-[#5A5A40] block break-all">
                    globalgospelmissionsinitiative@gmail.com
                  </a>
                </div>
              </div>
              <p className="text-xs text-[#6B635B] pt-1">Official correspondence, partnership pledges, and international affairs.</p>
            </div>

            {/* Direct WhatsApp Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href="https://wa.me/2348066246499?text=Hello%20GGMI,%20I%20would%20like%20to%20inquire%20about..."
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-xs flex items-center justify-between shadow-xs transition-all"
              >
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-[#A68B67]" /> WhatsApp 1 (+2348066246499)
                </span>
                <span>→</span>
              </a>

              <a
                href="https://wa.me/2348060899922?text=Hello%20GGMI,%20I%20would%20like%20to%20inquire%20about..."
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-xs flex items-center justify-between shadow-xs transition-all"
              >
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-[#A68B67]" /> WhatsApp 2 (+2348060899922)
                </span>
                <span>→</span>
              </a>
            </div>

            {/* Address */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E2DE] space-y-2 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#F1ECE7] text-[#5A5A40] border border-[#DED4C7]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#A68B67]">Headquarters Location</span>
                  <div className="text-xs font-bold text-[#2D2D2D]">
                    GGMI International Camp Ground & Missions Secretariat,<br />
                    Makurdi, Benue State, Nigeria.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Message Form (Right 7 Cols) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-[#E6E2DE] space-y-6 shadow-xs">
            <h3 className="text-xl font-serif font-bold text-[#2D2D2D]">Send Us a Direct Message</h3>

            {submitted ? (
              <div className="p-6 bg-[#F1ECE7] border border-[#DED4C7] rounded-xl text-center space-y-2 text-[#5A5A40]">
                <CheckCircle2 className="w-8 h-8 text-[#A68B67] mx-auto" />
                <h4 className="font-bold text-base font-serif">Message Sent Successfully!</h4>
                <p className="text-xs text-[#6B635B]">Thank you for reaching out to GGMI. Our secretariat will respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#6B635B] font-bold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Moses Ter"
                      className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-xl p-3 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6B635B] font-bold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="myemail@gmail.com"
                      className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-xl p-3 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#6B635B] font-bold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234..."
                      className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-xl p-3 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6B635B] font-bold mb-1">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-xl p-3 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Conference Registration">Conference Registration</option>
                      <option value="Gospel Tracts Request">Request Gospel Literature (Tiv/English)</option>
                      <option value="Missions Partnership">Missions Partnership / Donation</option>
                      <option value="Prayer Request">Prayer Request</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#6B635B] font-bold mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-xl p-3 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#A68B67] hover:bg-[#8E7657] text-white font-bold text-xs shadow-md flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
