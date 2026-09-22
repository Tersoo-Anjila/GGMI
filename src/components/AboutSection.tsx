import React from 'react';
import { 
  Globe2, 
  Target, 
  Heart, 
  BookOpen, 
  Stethoscope, 
  Flame, 
  CheckCircle2, 
  Users, 
  Film,
  GraduationCap,
  Briefcase,
  Smile,
  Sprout,
  HandHeart,
  Pencil,
  Sparkles
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: BookOpen,
      title: 'Multimedia Gospel Publishing',
      description: 'Creating, printing, and distributing gospel tracts (including "Msen Sha Ci u Myom" in Tiv), journals, books, articles, audio sermons, and video documentaries across Nigeria and international frontiers.'
    },
    {
      icon: Stethoscope,
      title: 'Rural Medical & Compassion Outreach',
      description: 'Combining mobile surgical operations, free consultations, and medical welfare with rural open-air crusades to care for the whole person.'
    },
    {
      icon: Flame,
      title: 'Discipleship & Conference Training',
      description: 'Hosting annual global conferences with dual Tiv and English study classes, equipping believers, youth, and ministers for unshakeable kingdom living.'
    },
    {
      icon: Globe2,
      title: 'Pioneer World Church Planting',
      description: 'Deploying missionary teams into unreached territories, planting self-sustaining assemblies, and ordaining local field leaders.'
    }
  ];

  const activities = [
    {
      icon: Users,
      title: 'One-on-One Evangelism',
      description: 'Personal soul-winning, house-to-house visitations, and direct gospel witness.'
    },
    {
      icon: Film,
      title: 'Film Shows at Night',
      description: 'Open-air gospel film screenings in rural villages to draw crowds and preach Christ.'
    },
    {
      icon: GraduationCap,
      title: 'Discipleship & Follow-up Classes',
      description: 'Nurturing new converts in foundational Bible study, prayer, and Christian growth.'
    },
    {
      icon: Briefcase,
      title: 'Entrepreneur & Skill Training',
      description: 'Practical vocational empowerment, craft mastery, and financial self-reliance.'
    },
    {
      icon: Smile,
      title: 'Child Evangelism',
      description: 'Dedicated children Bible clubs, vacation Bible schools, and youth outreach.'
    },
    {
      icon: Stethoscope,
      title: 'Free Medical Services',
      description: 'Free consultations, mobile surgeries, diagnostic checks, and essential drugs.'
    },
    {
      icon: Sprout,
      title: 'Agriculture & Economic Empowerment',
      description: 'Sustainable farming support, seeds, modern techniques, and cooperative community growth.'
    },
    {
      icon: Pencil,
      title: 'Adult Literacy Program',
      description: 'Teaching adult converts to read and write in native Tiv and English languages to read Scripture.'
    },
    {
      icon: HandHeart,
      title: 'Charity & Welfare Works',
      description: 'Providing food relief, clothing, school materials, and emergency aid to rural families.'
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-[#F8F5F2] text-[#2D2D2D] border-b border-[#E6E2DE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F1ECE7] text-[#5A5A40] border border-[#DED4C7] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#A68B67]" />
            <span>About GGMI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#2D2D2D] tracking-tight">
            Our Mission, Vision, and Identity
          </h2>
          <p className="text-[#6B635B] text-base leading-relaxed">
            Global Gospel Missions Initiative (GGMI) is a spirit-led, non-profit, interdenominational missionary ministry founded to proclaim the total gospel of Jesus Christ to all nations.
          </p>
        </div>

        {/* Mission & Vision Twin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="bg-white p-8 rounded-2xl border border-[#E6E2DE] shadow-xs relative overflow-hidden group">
            <div className="p-3 rounded-xl bg-[#5A5A40] text-white w-fit mb-6 shadow-xs">
              <Globe2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#2D2D2D] mb-3">Our Vision</h3>
            <p className="text-[#6B635B] text-sm sm:text-base leading-relaxed">
              To see every unreached community, tribe, and tongue saturated with the saving knowledge of Jesus Christ, established in biblical holiness, and empowered to make disciples until Christ returns.
            </p>
            <div className="mt-6 pt-6 border-t border-[#E6E2DE] flex items-center gap-2 text-xs font-bold text-[#5A5A40] uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-[#A68B67]" />
              <span>Uncompromised Gospel Saturation</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white p-8 rounded-2xl border border-[#E6E2DE] shadow-xs relative overflow-hidden group">
            <div className="p-3 rounded-xl bg-[#A68B67] text-white w-fit mb-6 shadow-xs">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#2D2D2D] mb-3">Our Mission</h3>
            <p className="text-[#6B635B] text-sm sm:text-base leading-relaxed">
              To aggressively preach the gospel through open-air crusades, publish and distribute free multimedia gospel materials, execute medical-humanitarian outreaches, and train laborers for frontier missions.
            </p>
            <div className="mt-6 pt-6 border-t border-[#E6E2DE] flex items-center gap-2 text-xs font-bold text-[#5A5A40] uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-[#A68B67]" />
              <span>Evangelism • Discipleship • Compassion</span>
            </div>
          </div>
        </div>

        {/* 4 Core Ministry Pillars */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-serif font-bold text-[#2D2D2D]">Core Strategic Pillars</h3>
            <p className="text-[#8C8279] text-sm mt-1">How GGMI executes the Great Commission day by day</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E6E2DE] hover:border-[#A68B67] transition-all space-y-3 shadow-xs">
                  <div className="p-2.5 rounded-xl bg-[#F1ECE7] text-[#5A5A40] border border-[#DED4C7] w-fit">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-serif font-bold text-[#2D2D2D]">{pillar.title}</h4>
                  <p className="text-[#6B635B] text-xs leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 9 Core Outreach Activities & Methods */}
        <div className="space-y-8 pt-6 border-t border-[#E6E2DE]">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#EAE4DC] text-[#5A5A40] text-[11px] font-bold uppercase tracking-wider">
              <span>Evangelism & Empowerment Operations</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2D2D]">
              Key Outreach Activities & Services
            </h3>
            <p className="text-[#6B635B] text-xs sm:text-sm">
              Comprehensive holistic ministry touching souls, minds, health, and livelihoods across rural fields
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activities.map((act, idx) => {
              const Icon = act.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white p-5 rounded-2xl border border-[#E6E2DE] hover:border-[#5A5A40] hover:shadow-sm transition-all flex items-start gap-4 group"
                >
                  <div className="p-2.5 rounded-xl bg-[#5A5A40]/10 text-[#5A5A40] group-hover:bg-[#5A5A40] group-hover:text-white transition-colors shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-[#2D2D2D] text-sm group-hover:text-[#5A5A40] transition-colors">
                      {act.title}
                    </h4>
                    <p className="text-[#6B635B] text-xs leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

