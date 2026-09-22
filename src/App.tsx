import React, { useState, useEffect, useMemo } from 'react';
import { AppStateData, Devotional, NewsItem, Member, ConferenceRegistration, DonationRecord, Language } from './types';
import { initialAppData } from './data/initialData';
import { fetchAppState } from './lib/api';
import { getLocalizedDevotional, getLocalizedDevotionalList, getLocalizedNews, getLocalizedNewsList } from './lib/localize';

// Components
import { Navbar } from './components/Navbar';
import { NewsTicker } from './components/NewsTicker';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { DevotionalSection } from './components/DevotionalSection';
import { DevotionalModal } from './components/DevotionalModal';
import { NewsModal } from './components/NewsModal';
import { RepositorySection } from './components/RepositorySection';
import { OutreachReports } from './components/OutreachReports';
import { LeadershipSection } from './components/LeadershipSection';
import { VirtualEventsSection } from './components/VirtualEventsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Modals
import { MembershipModal } from './components/MembershipModal';
import { ConferenceModal } from './components/ConferenceModal';
import { DonationModal } from './components/DonationModal';
import { AdminPortal } from './components/admin/AdminPortal';

export default function App() {
  const [appState, setAppState] = useState<AppStateData>(initialAppData);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('ggmi_language');
    return (saved === 'Tiv' || saved === 'English') ? saved : 'English';
  });

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('ggmi_language', lang);
  };

  // Detail view modals
  const [selectedDevotional, setSelectedDevotional] = useState<Devotional | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Localized lists based on active language selection
  const localizedDevotionals = useMemo(() => {
    return getLocalizedDevotionalList(appState.devotionals, currentLanguage);
  }, [appState.devotionals, currentLanguage]);

  const localizedNewsItems = useMemo(() => {
    return getLocalizedNewsList(appState.newsItems, currentLanguage);
  }, [appState.newsItems, currentLanguage]);

  const localizedSelectedDevotional = useMemo(() => {
    return getLocalizedDevotional(selectedDevotional, currentLanguage);
  }, [selectedDevotional, currentLanguage]);

  const localizedSelectedNews = useMemo(() => {
    return getLocalizedNews(selectedNews, currentLanguage);
  }, [selectedNews, currentLanguage]);

  // Modals state
  const [isMemberModalOpen, setIsMemberModalOpen] = useState<boolean>(false);
  const [isConferenceModalOpen, setIsConferenceModalOpen] = useState<boolean>(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Fetch initial app state from API on mount
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchAppState();
        if (data) {
          setAppState(data);
        }
      } catch (err) {
        console.log('Using local seed data for GGMI');
      }
    }
    loadData();
  }, []);

  // Handlers for state updates
  const handleMemberAdded = (newMember: Member) => {
    setAppState((prev) => ({
      ...prev,
      members: [newMember, ...prev.members]
    }));
  };

  const handleConferenceRegistrationAdded = (newReg: ConferenceRegistration) => {
    setAppState((prev) => ({
      ...prev,
      conferenceRegistrations: [newReg, ...prev.conferenceRegistrations]
    }));
  };

  const handleDonationAdded = (newDonation: DonationRecord) => {
    setAppState((prev) => ({
      ...prev,
      donations: [newDonation, ...prev.donations]
    }));
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950">
      
      {/* News & Urgent Prayer Ticker */}
      <NewsTicker
        newsItems={localizedNewsItems}
        onSelectNews={(item) => setSelectedNews(item)}
      />

      {/* Primary Sticky Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onOpenMemberModal={() => setIsMemberModalOpen(true)}
        onOpenConferenceModal={() => setIsConferenceModalOpen(true)}
        onOpenDonationModal={() => setIsDonationModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Main Page Layout Sections */}
      <main>
        {/* Hero Section */}
        <HeroSection
          todayDevotional={localizedDevotionals[0]}
          onReadDevotional={(dev) => setSelectedDevotional(dev)}
          onOpenMemberModal={() => setIsMemberModalOpen(true)}
          onOpenConferenceModal={() => setIsConferenceModalOpen(true)}
          onOpenRepository={() => {
            const el = document.getElementById('repository');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenDonationModal={() => setIsDonationModalOpen(true)}
        />

        {/* About Section */}
        <AboutSection />

        {/* Daily Devotionals Section */}
        <DevotionalSection
          devotionals={localizedDevotionals}
          currentLanguage={currentLanguage}
          onSelectDevotional={(dev) => setSelectedDevotional(dev)}
        />

        {/* Gospel Materials & Documents Repository */}
        <RepositorySection
          materials={appState.materials}
        />

        {/* Outreach & Mission Impact Reports */}
        <OutreachReports
          reports={appState.outreachReports}
        />

        {/* Executive Board & Leadership Section */}
        <LeadershipSection
          leaders={appState.leaders}
        />

        {/* Virtual Events & Live Stream Section */}
        <VirtualEventsSection
          events={appState.events}
          zoomLink={appState.zoomLink}
          teamsLink={appState.teamsLink}
          youtubeLive={appState.youtubeLive}
          facebookLive={appState.facebookLive}
          onOpenConferenceModal={() => setIsConferenceModalOpen(true)}
        />

        {/* Testimonials Section */}
        <TestimonialsSection
          testimonials={appState.testimonials}
        />

        {/* FAQ Section */}
        <FAQSection
          faqs={appState.faqs}
        />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenDonationModal={() => setIsDonationModalOpen(true)}
        onOpenMemberModal={() => setIsMemberModalOpen(true)}
        onOpenConferenceModal={() => setIsConferenceModalOpen(true)}
      />

      {/* MODALS */}
      <MembershipModal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
        onMemberAdded={handleMemberAdded}
      />

      <ConferenceModal
        isOpen={isConferenceModalOpen}
        onClose={() => setIsConferenceModalOpen(false)}
        onRegistrationAdded={handleConferenceRegistrationAdded}
      />

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        onDonationAdded={handleDonationAdded}
      />

      <DevotionalModal
        devotional={localizedSelectedDevotional}
        currentLanguage={currentLanguage}
        onClose={() => setSelectedDevotional(null)}
      />

      {/* News Modal */}
      <NewsModal
        news={localizedSelectedNews}
        currentLanguage={currentLanguage}
        onClose={() => setSelectedNews(null)}
      />

      <AdminPortal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        appState={appState}
        onStateUpdated={(newState) => setAppState(newState)}
      />

    </div>
  );
}
