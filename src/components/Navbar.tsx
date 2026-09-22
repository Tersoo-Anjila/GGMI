import React, { useState } from 'react';
import { GGMILogo } from './GGMILogo';
import { Language } from '../types';
import { uiTranslations } from '../lib/localize';
import { 
  UserPlus, 
  CalendarCheck, 
  HeartHandshake, 
  ShieldCheck, 
  Menu, 
  X, 
  BookOpen, 
  FolderArchive, 
  PhoneCall, 
  Globe2, 
  Video, 
  Users,
  Languages,
  FileText
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenMemberModal: () => void;
  onOpenConferenceModal: () => void;
  onOpenDonationModal: () => void;
  onOpenAdminModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  currentLanguage,
  onLanguageChange,
  onOpenMemberModal,
  onOpenConferenceModal,
  onOpenDonationModal,
  onOpenAdminModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = uiTranslations[currentLanguage];

  const navLinks = [
    { id: 'about', label: t.aboutUs, icon: Globe2 },
    { id: 'devotionals', label: t.devotionals, icon: BookOpen },
    { id: 'repository', label: t.gospelRepository, icon: FolderArchive },
    { id: 'reports', label: t.reports, icon: Users },
    { id: 'leadership', label: t.leadership, icon: Users },
    { id: 'events', label: t.events, icon: Video },
    { id: 'faq', label: t.faq, icon: ShieldCheck },
    { id: 'contact', label: t.contactUs, icon: PhoneCall },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F5F2]/95 backdrop-blur-md border-b border-[#E6E2DE] text-[#2D2D2D] shadow-xs">
      {/* Top Contact Bar & Language Toggle */}
      <div className="bg-[#2A2925] text-[#F1ECE7] text-xs py-1.5 px-4 border-b border-[#383827]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="tel:+2348066246499" className="hover:text-amber-200 flex items-center gap-1.5 transition-colors text-[11px] sm:text-xs">
              <PhoneCall className="w-3.5 h-3.5 text-[#A68B67]" />
              <span>+234 806 624 6499</span>
            </a>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <a href="tel:+2348060899922" className="hover:text-amber-200 flex items-center gap-1.5 transition-colors text-[11px] sm:text-xs">
              <span>+234 806 089 9922</span>
            </a>
            <span className="text-stone-600 hidden md:inline">|</span>
            <a href="mailto:globalgospelmissionsinitiative@gmail.com" className="hover:text-amber-200 transition-colors text-[11px] sm:text-xs hidden lg:inline">
              globalgospelmissionsinitiative@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-medium tracking-wide">
            {/* Language Switcher Pill */}
            <div className="flex items-center gap-1.5 bg-stone-900/90 border border-stone-700/70 rounded-full p-0.5 shadow-inner">
              <Languages className="w-3.5 h-3.5 text-[#A68B67] ml-2 shrink-0" />
              <button
                type="button"
                onClick={() => onLanguageChange('English')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider transition-all ${
                  currentLanguage === 'English'
                    ? 'bg-[#A68B67] text-white shadow-xs'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('Tiv')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider transition-all ${
                  currentLanguage === 'Tiv'
                    ? 'bg-[#A68B67] text-white shadow-xs'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                Tiv
              </button>
            </div>

            <span className="text-[#A68B67] hidden lg:inline">Benue State • Nigeria</span>
            
            <button
              onClick={onOpenAdminModal}
              className="hover:text-white flex items-center gap-1 text-[#A68B67] font-semibold underline underline-offset-2 ml-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Signature - Top Left */}
          <div className="cursor-pointer" onClick={() => handleNavClick('hero')}>
            <GGMILogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#5A5A40] text-white font-semibold shadow-xs'
                      : 'text-[#555555] hover:text-[#2D2D2D] hover:bg-[#F1ECE7]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs - Desktop */}
          <div className="hidden xl:flex items-center gap-2.5">
            <button
              onClick={onOpenMemberModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#F1ECE7] hover:bg-[#E6E2DE] text-[#2D2D2D] border border-[#DED4C7] shadow-xs transition-all"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#5A5A40]" />
              {t.joinGGMI}
            </button>

            <button
              onClick={onOpenConferenceModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#A68B67] hover:bg-[#8E7657] text-white shadow-xs transition-all"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              {t.conferenceReg}
            </button>

            <button
              onClick={onOpenDonationModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#5A5A40] hover:bg-[#484833] text-white shadow-md transition-all"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              {t.donatePartner}
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile Language Switcher button */}
            <div className="flex items-center bg-[#E6E2DE] rounded-lg p-0.5 text-xs font-bold border border-[#D5CFC9]">
              <button
                onClick={() => onLanguageChange('English')}
                className={`px-2 py-1 rounded-md transition-all ${currentLanguage === 'English' ? 'bg-[#5A5A40] text-white' : 'text-stone-700'}`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('Tiv')}
                className={`px-2 py-1 rounded-md transition-all ${currentLanguage === 'Tiv' ? 'bg-[#5A5A40] text-white' : 'text-stone-700'}`}
              >
                TIV
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#5A5A40] hover:text-[#2D2D2D] hover:bg-[#F1ECE7] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Nav Strip on Mobile / Tablet */}
      <div className="lg:hidden bg-[#EFEBE4] border-t border-[#E6E2DE] px-3 py-1.5 flex items-center justify-start gap-1 overflow-x-auto text-xs font-semibold text-[#5A5A40] no-scrollbar">
        <button
          onClick={() => handleNavClick('about')}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-white transition-all text-[#2D2D2D] font-medium shrink-0"
        >
          <Globe2 className="w-3.5 h-3.5 text-[#A68B67]" />
          {t.aboutUs}
        </button>
        <button
          onClick={() => handleNavClick('devotionals')}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-white transition-all text-[#2D2D2D] font-medium shrink-0"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#A68B67]" />
          {t.devotionals}
        </button>
        <button
          onClick={() => handleNavClick('reports')}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-white transition-all text-[#2D2D2D] font-medium shrink-0"
        >
          <FileText className="w-3.5 h-3.5 text-[#A68B67]" />
          {t.reports}
        </button>
        <button
          onClick={() => handleNavClick('repository')}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-white transition-all text-[#2D2D2D] font-medium shrink-0"
        >
          <FolderArchive className="w-3.5 h-3.5 text-[#A68B67]" />
          {t.gospelRepository}
        </button>
        <button
          onClick={() => handleNavClick('leadership')}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-white transition-all text-[#2D2D2D] font-medium shrink-0"
        >
          <Users className="w-3.5 h-3.5 text-[#A68B67]" />
          {t.leadership}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F5F2] border-b border-[#E6E2DE] px-4 pt-3 pb-6 space-y-3">
          {/* Mobile Language selector prominent banner */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#EFEBE4] border border-[#DED4C7]">
            <span className="text-xs font-bold text-[#5A5A40] flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-[#A68B67]" />
              {t.languageSwitcherLabel}
            </span>
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-[#D5CFC9]">
              <button
                onClick={() => onLanguageChange('English')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  currentLanguage === 'English' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-stone-600'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange('Tiv')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  currentLanguage === 'Tiv' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-stone-600'
                }`}
              >
                Tiv
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#E6E2DE]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMemberModal();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold bg-[#F1ECE7] text-[#2D2D2D] border border-[#DED4C7]"
            >
              <UserPlus className="w-4 h-4 text-[#5A5A40]" /> {t.joinGGMI}
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConferenceModal();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold bg-[#A68B67] text-white"
            >
              <CalendarCheck className="w-4 h-4" /> {t.conferenceReg}
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDonationModal();
              }}
              className="col-span-2 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold bg-[#5A5A40] text-white shadow-md"
            >
              <HeartHandshake className="w-4 h-4" /> {t.donatePartner}
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#2D2D2D] hover:bg-[#F1ECE7] hover:text-[#5A5A40] text-left transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#A68B67]" />
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E6E2DE] flex items-center justify-between text-xs text-[#6B635B]">
            <a href="tel:+2348066246499" className="flex items-center gap-1.5 text-[#5A5A40] font-medium">
              <PhoneCall className="w-3.5 h-3.5" /> +234 806 624 6499
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminModal();
              }}
              className="text-[#5A5A40] font-bold underline flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

