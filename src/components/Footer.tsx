import React from 'react';
import { GGMILogo } from './GGMILogo';
import { PhoneCall, Mail, MapPin, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAdminModal: () => void;
  onOpenDonationModal: () => void;
  onOpenMemberModal: () => void;
  onOpenConferenceModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdminModal,
  onOpenDonationModal,
  onOpenMemberModal,
  onOpenConferenceModal,
}) => {
  return (
    <footer className="bg-[#2D2D2D] text-[#F1ECE7] pt-16 pb-8 border-t border-[#484833]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Col 1: Brand & Identity (Left 4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <GGMILogo size="lg" variant="light" />
            <p className="text-xs text-[#DED4C7] leading-relaxed font-sans">
              Global Gospel Missions Initiative (GGMI) is an interdenominational missionary ministry dedicated to total world evangelization, publishing gospel literature in Tiv & English, rural medical relief, and training laborers for the end-time harvest.
            </p>
            <div className="pt-2 text-xs italic text-[#A68B67] font-serif">
              "Go into all the world and preach the gospel to every creature." — Mark 16:15
            </div>
          </div>

          {/* Col 2: Quick Links (Right 2 Cols) */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-white text-sm">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-[#A68B67] transition-colors">About GGMI</a></li>
              <li><a href="#devotionals" className="hover:text-[#A68B67] transition-colors">Daily Devotionals</a></li>
              <li><a href="#repository" className="hover:text-[#A68B67] transition-colors">Gospel Materials Repository</a></li>
              <li><a href="#reports" className="hover:text-[#A68B67] transition-colors">Outreach Field Reports</a></li>
              <li><a href="#leadership" className="hover:text-[#A68B67] transition-colors">Trustees & Leadership</a></li>
              <li><a href="#events" className="hover:text-[#A68B67] transition-colors">Virtual Events & Streams</a></li>
            </ul>
          </div>

          {/* Col 3: Quick Portals (Right 3 Cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-white text-sm">Portals & Actions</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenMemberModal} className="text-[#A68B67] hover:underline font-bold flex items-center gap-1">
                  • Membership Registration
                </button>
              </li>
              <li>
                <button onClick={onOpenConferenceModal} className="text-[#A68B67] hover:underline font-bold flex items-center gap-1">
                  • Annual Conference Registration
                </button>
              </li>
              <li>
                <button onClick={onOpenDonationModal} className="text-[#A68B67] hover:underline font-bold flex items-center gap-1">
                  • Partner & Donate to GGMI
                </button>
              </li>
              <li>
                <button onClick={onOpenAdminModal} className="text-[#DED4C7] hover:underline font-bold flex items-center gap-1">
                  • Admin & Content Portal Login
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Social Media & Contact (Right 3 Cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-white text-sm">Connect & Social Media</h4>
            <div className="space-y-1.5 text-[#F1ECE7]">
              <a href="tel:+2348066246499" className="flex items-center gap-2 hover:text-[#A68B67]">
                <PhoneCall className="w-3.5 h-3.5 text-[#A68B67]" /> +234 806 624 6499
              </a>
              <a href="tel:+2348060899922" className="flex items-center gap-2 hover:text-[#A68B67]">
                <PhoneCall className="w-3.5 h-3.5 text-[#A68B67]" /> +234 806 089 9922
              </a>
              <a href="mailto:globalgospelmissionsinitiative@gmail.com" className="flex items-center gap-2 hover:text-[#A68B67] break-all pt-1">
                <Mail className="w-3.5 h-3.5 text-[#A68B67] shrink-0" /> globalgospelmissionsinitiative@gmail.com
              </a>
            </div>

            {/* Social Media Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <a
                href="https://facebook.com/GGMI.Missions"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-[#383827] hover:bg-[#A68B67] hover:text-white text-[#F1ECE7] border border-[#484833] transition-all font-bold text-xs"
                title="GGMI Facebook Page"
              >
                Facebook
              </a>
              <a
                href="https://www.youtube.com/@globalgospelmission1"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-[#383827] hover:bg-[#A68B67] hover:text-white text-[#F1ECE7] border border-[#484833] transition-all font-bold text-xs"
                title="GGMI YouTube Channel (@globalgospelmission1)"
              >
                YouTube
              </a>
              <a
                href="https://instagram.com/GGMI_Missions"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-[#383827] hover:bg-[#A68B67] hover:text-white text-[#F1ECE7] border border-[#484833] transition-all font-bold text-xs"
                title="GGMI Instagram"
              >
                Instagram
              </a>
              <a
                href="https://wa.me/2348066246499"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-[#5A5A40] hover:bg-[#484833] text-white border border-[#484833] transition-all font-bold text-xs"
                title="GGMI WhatsApp Hotline"
              >
                WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-[#383827] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C8279] gap-4">
          <div>
            © {new Date().getFullYear()} Global Gospel Missions Initiative (GGMI). All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenAdminModal} className="hover:text-[#A68B67] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Staff Admin Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
