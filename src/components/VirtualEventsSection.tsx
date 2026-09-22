import React, { useState, useEffect } from 'react';
import { EventItem } from '../types';
import { 
  Video, 
  Calendar, 
  Clock, 
  MapPin, 
  ExternalLink, 
  Sparkles, 
  Tv, 
  CheckCircle2, 
  Users 
} from 'lucide-react';

interface VirtualEventsSectionProps {
  events: EventItem[];
  zoomLink: string;
  teamsLink: string;
  youtubeLive: string;
  facebookLive: string;
  onOpenConferenceModal: () => void;
}

export const VirtualEventsSection: React.FC<VirtualEventsSectionProps> = ({
  events,
  zoomLink,
  teamsLink,
  youtubeLive,
  facebookLive,
  onOpenConferenceModal,
}) => {
  const [activeStreamTab, setActiveStreamTab] = useState<'YouTube' | 'Facebook'>('YouTube');

  // Next upcoming event
  const upcomingEvent = events[0];

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!upcomingEvent?.date) return;

    const targetDate = new Date(upcomingEvent.date).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [upcomingEvent]);

  return (
    <section id="events" className="py-16 md:py-24 bg-[#F8F5F2] text-[#2D2D2D] border-b border-[#E6E2DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F1ECE7] text-[#5A5A40] border border-[#DED4C7] text-xs font-bold uppercase tracking-wider">
            <Video className="w-3.5 h-3.5 text-[#A68B67]" />
            <span>Virtual Events & Live Broadcasts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#2D2D2D]">
            Connect Live with GGMI
          </h2>
          <p className="text-[#6B635B] text-sm sm:text-base">
            Participate in live streams, virtual prayer vigils, and upcoming global conferences via Zoom, Microsoft Teams, YouTube, and Facebook.
          </p>
        </div>

        {/* Live Stream & Quick Virtual Meeting Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Virtual Links & Countdown Card (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Countdown Timer */}
            {upcomingEvent && (
              <div className="bg-[#5A5A40] text-white p-6 rounded-3xl border border-[#484833] shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#484833]">
                  <span className="text-xs font-bold uppercase text-[#F1ECE7] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#A68B67]" /> Upcoming Event
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#A68B67] text-white">
                    LIVE COUNTDOWN
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-white">{upcomingEvent.title}</h3>
                  <p className="text-xs text-[#F1ECE7] mt-1">Theme: "{upcomingEvent.theme}"</p>
                </div>

                {/* Countdown Grid */}
                <div className="grid grid-cols-4 gap-2 text-center py-2">
                  <div className="bg-[#484833] p-2.5 rounded-xl border border-[#383827]">
                    <div className="text-2xl font-serif font-extrabold text-[#A68B67]">{timeLeft.days}</div>
                    <div className="text-[10px] text-[#DED4C7] font-bold uppercase">Days</div>
                  </div>
                  <div className="bg-[#484833] p-2.5 rounded-xl border border-[#383827]">
                    <div className="text-2xl font-serif font-extrabold text-[#A68B67]">{timeLeft.hours}</div>
                    <div className="text-[10px] text-[#DED4C7] font-bold uppercase">Hours</div>
                  </div>
                  <div className="bg-[#484833] p-2.5 rounded-xl border border-[#383827]">
                    <div className="text-2xl font-serif font-extrabold text-[#A68B67]">{timeLeft.minutes}</div>
                    <div className="text-[10px] text-[#DED4C7] font-bold uppercase">Mins</div>
                  </div>
                  <div className="bg-[#484833] p-2.5 rounded-xl border border-[#383827]">
                    <div className="text-2xl font-serif font-extrabold text-[#A68B67]">{timeLeft.seconds}</div>
                    <div className="text-[10px] text-[#DED4C7] font-bold uppercase">Secs</div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenConferenceModal}
                    className="w-full py-3 rounded-xl bg-[#A68B67] hover:bg-[#8E7657] text-white font-bold text-xs shadow-md transition-all"
                  >
                    Register for This Conference Now
                  </button>
                </div>
              </div>
            )}

            {/* Quick Virtual Meeting Buttons */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6E2DE] shadow-xs space-y-4">
              <h4 className="text-sm font-serif font-bold text-[#5A5A40] uppercase tracking-wider">
                Virtual Event Links
              </h4>
              <p className="text-xs text-[#6B635B]">
                Join our ongoing virtual prayer vigils and Bible study meetings directly:
              </p>

              <div className="space-y-3">
                {/* Zoom Button */}
                <a
                  href={zoomLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full p-3.5 rounded-xl bg-[#F8F5F2] hover:bg-[#F1ECE7] text-[#5A5A40] border border-[#E6E2DE] font-bold text-xs flex items-center justify-between transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#A68B67]" /> Join Zoom Meeting
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#8C8279]" />
                </a>

                {/* Teams Button */}
                <a
                  href={teamsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full p-3.5 rounded-xl bg-[#F8F5F2] hover:bg-[#F1ECE7] text-[#5A5A40] border border-[#E6E2DE] font-bold text-xs flex items-center justify-between transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#A68B67]" /> Join Microsoft Teams
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#8C8279]" />
                </a>
              </div>
            </div>

          </div>

          {/* Embedded Live Stream Player (Right 7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#E6E2DE] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tv className="w-5 h-5 text-[#A68B67]" />
                <h4 className="text-base font-serif font-bold text-[#2D2D2D]">Live Broadcast Player</h4>
              </div>

              {/* Toggle Youtube vs Facebook */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveStreamTab('YouTube')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeStreamTab === 'YouTube'
                      ? 'bg-[#5A5A40] text-white'
                      : 'bg-[#F1ECE7] text-[#6B635B] hover:text-[#2D2D2D]'
                  }`}
                >
                  YouTube Live
                </button>
                <button
                  onClick={() => setActiveStreamTab('Facebook')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeStreamTab === 'Facebook'
                      ? 'bg-[#5A5A40] text-white'
                      : 'bg-[#F1ECE7] text-[#6B635B] hover:text-[#2D2D2D]'
                  }`}
                >
                  Facebook Live
                </button>
              </div>
            </div>

            {/* Embedded Player Frame */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#2D2D2D] border border-[#E6E2DE] flex items-center justify-center">
              {activeStreamTab === 'YouTube' ? (
                <iframe
                  src={youtubeLive}
                  title="GGMI YouTube Live Stream"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <iframe
                  src={facebookLive}
                  title="GGMI Facebook Live Stream"
                  className="w-full h-full"
                  allowFullScreen
                />
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-[#6B635B] pt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A68B67] animate-ping inline-block" />
                Official GGMI Broadcast Stream
              </span>
              <a
                href={activeStreamTab === 'YouTube' ? "https://www.youtube.com/@globalgospelmission1" : "https://facebook.com/GGMI.Missions"}
                target="_blank"
                rel="noreferrer"
                className="text-[#5A5A40] font-bold hover:underline flex items-center gap-1"
              >
                Watch on {activeStreamTab} <ExternalLink className="w-3 h-3 text-[#A68B67]" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
