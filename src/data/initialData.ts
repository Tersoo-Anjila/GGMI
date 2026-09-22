import { AppStateData } from '../types';

export const initialAppData: AppStateData = {
  zoomLink: "https://zoom.us/j/8066246499?pwd=GGMI2026Missions",
  teamsLink: "https://teams.microsoft.com/l/meetup-join/GGMI-Global-Vigil",
  youtubeLive: "https://www.youtube.com/embed/live_stream?channel=@globalgospelmission1",
  facebookLive: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FGGMI.Missions%2Fvideos%2F1015882910023%2F",

  members: [
    {
      id: "mbr-1",
      membershipId: "GGMI-MBR-2026-0101",
      firstName: "Terhemba",
      lastName: "Aondoaver",
      sex: "Male",
      age: 32,
      zone: "Makurdi Central Zone",
      phone: "+2348034567890",
      email: "terhemba.aondo@gmail.com",
      maritalStatus: "Married",
      occupation: "Civil Servant & Evangelist",
      bornAgainStatus: "Yes",
      bornAgainYear: 2012,
      baptized: true,
      skills: "Public speaking, Medical First Aid, Tiv Translation",
      notes: "Active member in rural soul-winning team",
      createdAt: "2026-01-15T09:30:00Z"
    },
    {
      id: "mbr-2",
      membershipId: "GGMI-MBR-2026-0102",
      firstName: "Dooshima",
      lastName: "Iorwuese",
      sex: "Female",
      age: 27,
      zone: "Abuja Chapter",
      phone: "+2348123456789",
      email: "dooshima.ior@gmail.com",
      maritalStatus: "Single",
      occupation: "Teacher",
      bornAgainStatus: "Yes",
      bornAgainYear: 2018,
      baptized: true,
      skills: "Youth Counseling, Choir, Graphic Design",
      notes: "Volunteer for Annual Conference Media",
      createdAt: "2026-02-10T14:15:00Z"
    }
  ],

  conferenceRegistrations: [
    {
      id: "conf-1",
      registrationCode: "GGMI-CONF-2026-7781",
      fullName: "Moses Terna Kpenksen",
      sex: "Male",
      age: 38,
      zone: "Gboko Zone",
      phone: "+2348066123456",
      address: "No 14 Commercial Day Road, Gboko, Benue State",
      email: "moses.kpen@yahoo.com",
      maritalStatus: "Married",
      accommodationNeeds: "Yes",
      specialAccommodationDetails: "Ground floor access preferred for elderly spouse",
      preferredStudyClass: "Tiv",
      emergencyContact: "Deborah Kpenksen (+2348033221100)",
      createdAt: "2026-03-01T10:00:00Z"
    },
    {
      id: "conf-2",
      registrationCode: "GGMI-CONF-2026-7782",
      fullName: "Dr. Grace Nkechi Okafor",
      sex: "Female",
      age: 44,
      zone: "Lagos Zone",
      phone: "+2348029988776",
      address: "Victoria Island, Lagos State",
      email: "dr.grace.okafor@gmail.com",
      maritalStatus: "Married",
      accommodationNeeds: "No",
      preferredStudyClass: "English",
      emergencyContact: "Engr. Chidi Okafor (+2348031112233)",
      createdAt: "2026-03-05T16:20:00Z"
    }
  ],

  devotionals: [
    {
      id: "dev-1",
      title: "The Unfailing Power of the Great Commission",
      date: "2026-08-04",
      theme: "Global Missions & World Harvest",
      scriptureRef: "Matthew 28:18-20",
      scriptureText: "And Jesus came and spoke to them, saying, 'All authority has been given to Me in heaven and on earth. Go therefore and make disciples of all the nations...'",
      bodyText: "The mandate of Global Gospel Missions Initiative (GGMI) rests upon the absolute authority of Jesus Christ. As we go into the highways, villages, and cities, we do not march in our own strength or eloquence, but in the divine power of the resurrected King. Every soul reached with the gospel tract, every patient treated in rural medical outreach, and every life transformed is proof that Christ remains with us even to the end of the age. Today, examine your heart: how are you actively participating in the harvest?",
      keyTakeaway: "You are either a full-time missionary where you are or a supporter of those on the field. Silence is not an option in the harvest era.",
      prayerPoint: "Lord Jesus, set my heart ablaze with passion for lost souls. Anoint GGMI and all mission fields across Benue, Nigeria, and the nations of the world with unusual harvest grace.",
      author: "Prof. Daniel Vershima Uza - President & Trustee, GGMI",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      tivTitle: "Tahav Mbu Uwandu U Loho u Dedoo Sha Ci u Wase Kwagh",
      tivTheme: "Tom u Pasen Loho u Dedoo Sha Tar Cii & Ter u Kwagharien",
      tivScriptureRef: "Mateu 28:18-20",
      tivScriptureText: "Tsô Yesu va gba oron a ve er: 'I na me tahav cii sha sha mnyam man sha tar kpaa. Sha nahan yô, za nen, za gema nen ior i ikur cii i lu mbahenen wam, eren ve batisema sha iti i Ter man a i Wan man a i Jijingi u Wanger...'",
      tivBodyText: "Mdue u tomar u Global Gospel Missions Initiative (GGMI) taji sha tahav mbu Ter Yesu Kristu. Shighe u se ze sha azen, ukaam, man agar yô, se zaan sha tahav avasase ze, kpa ka sha tahav mbu Aondo Mbu sha Uter Yesu u i nder un shin ku yô. Hanma imaagh ki i ne or loho u dedoo, hanma or u ubo mba dedoo u i sor un shin uiyange mba zendenvanger yô, ka ikyav i tesen er Yesu ngu a vese zan zan kuhe u tar. Nyian ne, hen sha mshima wuu: u ngu den nyi sha u sughun tom u kwagharien ne?",
      tivKeyTakeaway: "U lu or u pasen loho u dedoo he sha u u lu la shin u lu or sughun mba ve lu sha ma mission la. M-kera-zwa ka sha shighe u kwagharien ga.",
      tivPrayerPoint: "Ter Yesu, tondo mshima wam a gbashima sha ci u mba ve saa yô. Ha mkor Wou sha GGMI man sha ajiir cii a i lu pasen loho u dedoo he Benue, Naigeria man he ijiir iyua sha tar cii."
    },
    {
      id: "dev-2",
      title: "Living as an Unashamed Light in Darkness",
      date: "2026-08-03",
      theme: "Christian Identity & Holiness",
      scriptureRef: "Philippians 2:15-16",
      scriptureText: "...that you may become blameless and harmless, children of God without fault in the midst of a crooked and perverse generation, among whom you shine as lights in the world.",
      bodyText: "In a world fraught with compromise, the believer's life must be an unshakeable gospel tract. People around us should read Christ in our speech, integrity, kindness, and unwavering commitment to truth. When GGMI teams venture into hard-to-reach unreached territories, it is the radiance of God's love and holiness that breaks the power of darkness.",
      keyTakeaway: "Your conduct is the first sermon many unchurched people will ever hear.",
      prayerPoint: "Father, purify my walk. Grant me boldness to shine Your truth without shame or compromise in my workplace, community, and zone.",
      author: "Pastor (Mrs.) Martha Iorfa - GGMI Executive Trustee",
      tivTitle: "M-lu u Wani u Wanger Sha Mngereem shin Ijiir i Il",
      tivTheme: "M-lu u Orhenen u Kristu & M-lu u Shungur",
      tivScriptureRef: "Mfilipi 2:15-16",
      tivScriptureText: "...sha u i zua a ven a msor-ze man acin-ze, ve lu mbayeve mba Aondo mba ve lu a mfe-ze he atir a tar u bo man u gbilin ne, he mba ne wanger er ka m-wanger sha tar yô.",
      tivBodyText: "Sha tar u u bee a m-mnya ne, uma u or-nan-jighjigh kpaa i lu er ka ikyav i pasen loho u dedoo u Ter Yesu yô. Ior mba ve lu kpaa se yô ve er kwagh u Kristu he m-oro zwa wese, m-shungur wese, m-doo-shima wese, man m-sughun mimin Wou. Shighe u GGMI ve ze he ajiir a taver la, ka m-wanger u doo-shima u Aondo man m-shungur ka wanger mbam-bo mba il.",
      tivKeyTakeaway: "Airen ou ka tome u hiii u ior mbagenev kpishi ve ungwa sha u ve zua a Kristu yô.",
      tivPrayerPoint: "Ter Aondo, wanger airen am. Na imeen i pasen mimi Wou sha aityev-ga shin m-mnya ha tom wam, he ajiir am, man he ityar yam cii."
    }
  ],

  materials: [
    {
      id: "mat-1",
      title: "Msen Sha Ci u Myom u Uma Wou (Tiv Salvation Tract)",
      category: "Tract",
      author: "GGMI Editorial Board",
      description: "Comprehensive gospel message written in clear Tiv language, explaining God's creation, man's fall, the redemption through Christ's blood, and step-by-step prayer of salvation.",
      fileType: "PDF",
      fileSize: "1.2 MB",
      downloadUrl: "#download-tiv-tract",
      downloadsCount: 4820,
      language: "Tiv",
      createdAt: "2026-01-10T00:00:00Z"
    },
    {
      id: "mat-2",
      title: "The Call to Unreached Frontier Missions",
      category: "Book",
      author: "Prof. Daniel Vershima Uza",
      description: "A foundational guidebook on rural soul-winning, field strategy, pioneer church planting, and mobilizing believers for total world evangelization.",
      fileType: "PDF",
      fileSize: "4.8 MB",
      downloadUrl: "#download-missions-book",
      downloadsCount: 2310,
      language: "English",
      createdAt: "2026-02-01T00:00:00Z"
    },
    {
      id: "mat-3",
      title: "Annual Global Missions Journal 2025 Edition",
      category: "Journal",
      author: "GGMI Research & Field Documentation",
      description: "Comprehensive analytical report and spiritual journal capturing outreach field data, rural medical statistics, testimonial logs, and mission budget breakdowns.",
      fileType: "PDF",
      fileSize: "8.5 MB",
      downloadUrl: "#download-journal-2025",
      downloadsCount: 1450,
      language: "English",
      createdAt: "2025-12-20T00:00:00Z"
    },
    {
      id: "mat-4",
      title: "Audio Sermon: Overcoming Powers of Darkness in Mission Fields",
      category: "Audio Sermon",
      author: "Rev. Dr. Samuel Akaazua",
      description: "Powerful 58-minute teaching on spiritual warfare, prayer walk strategies, and authority in Christ while ministering in idolatrous territories.",
      fileType: "MP3",
      fileSize: "24.5 MB",
      downloadUrl: "#download-audio-warfare",
      downloadsCount: 3890,
      language: "Both",
      createdAt: "2026-03-12T00:00:00Z"
    },
    {
      id: "mat-5",
      title: "Video Documentary: Vandeikya Rural Medical Outreach",
      category: "Video Message",
      author: "GGMI Media Unit",
      description: "Inspirational 15-minute video highlights showing over 800 rural residents receiving free surgeries, medication, Bibles, and giving their lives to Jesus.",
      fileType: "MP4",
      fileSize: "120 MB",
      downloadUrl: "#download-vandeikya-video",
      downloadsCount: 1980,
      language: "English",
      createdAt: "2026-04-05T00:00:00Z"
    }
  ],

  outreachReports: [
    {
      id: "rep-1",
      title: "Vandeikya Rural Medical & Gospel Crusade",
      location: "Vandeikya LGA, Benue State",
      period: "May 14 – May 21, 2026",
      soulsReached: 3450,
      conversions: 890,
      medicalSupportProvided: 1240,
      biblesDistributed: 650,
      baptisms: 142,
      coverageArea: "12 Rural Villages in Mbaduku & Mbagbera",
      summary: "GGMI deployed a 45-man volunteer team comprising medical doctors, nurses, evangelists, and Tiv translators. Free surgeries for minor hernia and eye checks were conducted alongside evening open-air crusades. Over 890 precious souls surrendered their lives to Christ.",
      fieldTestimonials: [
        {
          author: "Mama Rachel Terseer (Age 68)",
          testimony: "I suffered from cataract blindness for 4 years. After the free medical procedure by GGMI doctors and prayer by the evangelists, my vision was restored and I received Jesus as my Lord!"
        },
        {
          author: "Chief Iorwuese K.",
          testimony: "Our community shrine leaders surrendered their fetishes to be burnt after seeing the power of God in healing the sick during the crusade."
        }
      ],
      galleryImages: [
        "https://i.ibb.co/5WtQ7F5r/Picture2.png",
        "https://i.ibb.co/2BYBDdr/Picture3.png",
        "https://i.ibb.co/whdLBv4w/Picture4.png"
      ],
      reportPdfUrl: "#download-vandeikya-full-pdf",
      createdAt: "2026-05-25T00:00:00Z"
    },
    {
      id: "rep-2",
      title: "Gboko Youth & High School Gospel Invasion",
      location: "Gboko Metropolis & Surrounding Schools",
      period: "March 10 – March 15, 2026",
      soulsReached: 5800,
      conversions: 1620,
      medicalSupportProvided: 300,
      biblesDistributed: 1200,
      baptisms: 210,
      coverageArea: "18 Secondary Schools and College Campuses",
      summary: "Intensive 5-day school-to-school evangelistic campaign distributing 'Msen Sha Ci u Myom' tracts, Bibles, and holding youth empowerment seminars addressing drug addiction and cultism.",
      fieldTestimonials: [
        {
          author: "Barnabas T. (Student President)",
          testimony: "Over 40 students in our school publicly renounced cultism and joined the Scripture Union fellowship during the GGMI invasion."
        }
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
      ],
      createdAt: "2026-03-20T00:00:00Z"
    }
  ],

  newsItems: [
    {
      id: "news-1",
      title: "Registration Now Open for GGMI Annual Global Gospel Conference 2026!",
      snippet: "Join thousands of mission-minded believers from across Benue, Nigeria, and diaspora for intensive word, prayer, and field commissioning.",
      content: "The Global Gospel Missions Initiative (GGMI) warmly invites all believers, church leaders, and mission enthusiasts to our Annual Global Conference themed 'Harvest Frontiers'. Accommodation, study classes in English and Tiv, and feeding will be provided.",
      date: "2026-08-01",
      isTicker: true,
      category: "Conference",
      tivTitle: "I Bugh M-nger u Za M-ziam u GGMI Annual Global Gospel Conference 2026!",
      tivSnippet: "Za ta kpaa a uder mba jighjigh mba he Benue, Naigeria man tar cii sha ci u loho u dedoo, msen, man m-kande tom u mission.",
      tivContent: "Global Gospel Missions Initiative (GGMI) ngu zizioron uder mba jighjigh cii man mba hemban sha ci u Za M-ziam u tar cii u inyom ne u i yer er 'Harvest Frontiers'. Ijiir i m-yamen, iyou-henen sha Zwa Ngeren (English) man Zwa Tiv, man kwaghyan a lu ha or cii."
    },
    {
      id: "news-2",
      title: "Urgent Prayer Request: Mission Field Expansion in Border Villages",
      snippet: "Please pray for our pioneer missionary teams entering unreached settlements along the Benue-Taraba border.",
      content: "Pray for divine protection, open doors among village chiefs, financial resources for Bible distribution, and health for our 12 pioneer missionaries on field duty.",
      date: "2026-08-02",
      isTicker: true,
      category: "Urgent Prayer",
      tivTitle: "Msen u Fiaa: M-zan u Tom u Mission Sha Ajiir a Ikumbur Hembankenegh",
      tivSnippet: "Suhul nen msen sha ci u kwar u mba pasen loho u dedoo mba ve ze he agar a Benue-Taraba border la.",
      tivContent: "Suhul nen msen sha ci u m-kura u Aondo, imeen he utor mba agar, inyaregh sha ci u m-yange u Bibilo, man m-gem-sa-kav sha ci u mba tomov 12 mba ve lu sha field yô."
    },
    {
      id: "news-3",
      title: "Over 1,200 Tiv Gospel Tracts Distributed in Otukpo Market Evangelism",
      snippet: "GGMI Otukpo Zone successfully executed a 2-day market outreach yielding 210 new converts.",
      content: "Glory be to God! Volunteers from Otukpo and surrounding areas gathered last weekend for mass literature distribution.",
      date: "2026-07-28",
      isTicker: false,
      category: "Outreach",
      tivTitle: "I Ha Ikyav i Ngeren Mbu Loho u Dedoo u Tiv Hembam 1,200 He Kasua u Otukpo",
      tivSnippet: "GGMI Otukpo Zone i er outreach sha kasua u otukpo nahan ior 210 ve gema imaagh zua a Kristu.",
      tivContent: "Iwuese i lu sha Aondo! Mba-sughun tom ve kohol he Otukpo sha u haan ikyav i ngeren mbu Tiv sha ci u myom u imaagh."
    }
  ],

  events: [
    {
      id: "evt-1",
      title: "GGMI Annual Global Gospel Conference 2026",
      theme: "Unshakable Kingdom & The Harvest Frontiers",
      date: "2026-11-12T09:00:00Z",
      location: "GGMI International Headquarters & Camp Ground, Makurdi, Benue State",
      isVirtual: true,
      zoomLink: "https://zoom.us/j/8066246499?pwd=GGMI2026Missions",
      teamsLink: "https://teams.microsoft.com/l/meetup-join/GGMI-Global-Conference",
      youtubeLive: "https://youtube.com/@GGMIMissionsOfficial",
      facebookLive: "https://facebook.com/GGMI.Missions",
      description: "A transformative 4-day gathering with intensive Bible study classes (available in English and Tiv), power-packed evening revivals, medical mission briefings, and missionary ordination.",
      registrationOpen: true
    },
    {
      id: "evt-2",
      title: "Monthly Global Missions Virtual Prayer Vigil",
      theme: "Laborers into the Harvest Field (Luke 10:2)",
      date: "2026-08-28T22:00:00Z",
      location: "Virtual via Zoom, Microsoft Teams & YouTube Live",
      isVirtual: true,
      zoomLink: "https://zoom.us/j/8066246499?pwd=GGMI2026Missions",
      teamsLink: "https://teams.microsoft.com/l/meetup-join/GGMI-Global-Vigil",
      youtubeLive: "https://youtube.com/@GGMIMissionsOfficial",
      facebookLive: "https://facebook.com/GGMI.Missions",
      description: "Join GGMI partners worldwide as we intercede for unreached people groups, missionary safety, supply of gospel materials, and revival in nations.",
      registrationOpen: true
    }
  ],

  testimonials: [
    {
      id: "test-1",
      name: "Evang. Samuel Aondohemba",
      roleLocation: "Missionary Coordinator, Vandeikya Zone",
      type: "text",
      content: "Serving with GGMI has opened my eyes to the urgent harvest in rural villages. Seeing entire families give their lives to Jesus after receiving medical care and hearing the word in Tiv is the greatest joy of my ministry.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      featured: true
    },
    {
      id: "test-2",
      name: "Mrs. Mercy Akpa",
      roleLocation: "Beneficiary, Rural Medical Outreach",
      type: "photo",
      content: "I had no money for surgery for my hernia. GGMI doctors treated me completely free and gave me a Tiv Bible. Today I am healthy, saved, and serving in my local church!",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      featured: true
    },
    {
      id: "test-3",
      name: "Elder Paul Iorgyer",
      roleLocation: "Conference Delegate, Tiv Study Class",
      type: "video",
      content: "The depth of spiritual understanding taught in the Tiv study class during last year's conference transformed my family and prayer life. I urge everyone to register early!",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      featured: true
    }
  ],

  leaders: [
    {
      id: "ldr-1",
      name: "Prof. Daniel Vershima Uza",
      role: "President & Chairman, Board of Trustees",
      bio: "A veteran evangelist, distinguished professor, and pioneer missionary leader dedicated to advancing the Great Commission across Benue State, Nigeria, and international mission frontiers through rural soul winning, gospel literature publishing, and church planting.",
      imageUrl: "https://i.ibb.co/GfrSLKyY/Uza.jpg",
      order: 1
    },
    {
      id: "ldr-2",
      name: "Mama Sue Akume",
      role: "Vice President & Executive Trustee",
      bio: "Passionate intercessor, author, and director of GGMI Women in Missions & Medical Welfare ministries, empowering rural women and orphans through gospel compassion programs.",
      imageUrl: "https://i.ibb.co/B2LP0qJq/Akume.jpg",
      order: 2
    },
    {
      id: "ldr-3",
      name: "John Yandev Weor",
      role: "International Director of Missions & Field Strategy",
      bio: "Oversees pioneer mission stations, missionary training schools, and research documentation across unreached territories.",
      imageUrl: "https://i.ibb.co/Nfr86YK/Weor.jpg",
      order: 3
    },
    {
      id: "ldr-4",
      name: "Mama Rebecca Agbo",
      role: "Director of Medical Missions & Humanitarian Relief",
      bio: "Consultant surgeon leading GGMI's mobile medical mission teams, providing free surgical operations and medical care alongside rural evangelism.",
      imageUrl: "https://i.ibb.co/DHmyhV67/473323283-1321529899197826-5139279282672105285-n.jpg",
      order: 4
    }
  ],

  faqs: [
    {
      id: "faq-1",
      question: "What is Global Gospel Missions Initiative (GGMI)?",
      answer: "GGMI is an interdenominational Christian missionary organization dedicated to preaching the uncompromised gospel of Jesus Christ, making disciples, distributing gospel literature (in Tiv and English), providing medical relief, and mobilizing believers for world evangelism.",
      category: "General"
    },
    {
      id: "faq-2",
      question: "How can I become an official GGMI member or partner?",
      answer: "You can click on the 'Membership Registration' link on our website to fill out your details. Once registered, you will receive your unique GGMI Membership ID and be connected to your nearest zone.",
      category: "Membership"
    },
    {
      id: "faq-3",
      question: "What study classes are offered during the Annual GGMI Conference?",
      answer: "To ensure maximum spiritual comprehension and spiritual growth, conference Bible study sessions are conducted concurrently in English and Tiv languages. You can select your preferred study class during conference registration.",
      category: "Conference"
    },
    {
      id: "faq-4",
      question: "Are accommodation and feeding provided during conferences?",
      answer: "Yes! Free dormitory-style accommodation and meals are arranged for registered delegates. If you have special accommodation needs, please specify them in the registration form.",
      category: "Conference"
    },
    {
      id: "faq-5",
      question: "How can I download GGMI gospel tracts, books, and sermons?",
      answer: "Visit the 'Repository' section on our website. All tracts (including 'Msen Sha Ci u Myom u Uma Wou'), journals, audio sermons, and books are completely free to read, download, print, and distribute.",
      category: "Outreach & Giving"
    },
    {
      id: "faq-6",
      question: "How can I donate or sponsor a mission outreach?",
      answer: "Click the 'Donate / Partner' button to view our official GGMI bank account details or donate securely online via debit card. Designations include General Missions, Rural Medical Outreach, Bible & Tract Printing, and Conference Sponsorship.",
      category: "Outreach & Giving"
    }
  ],

  donations: [
    {
      id: "don-1",
      donorName: "Brother Andrew Tser",
      email: "andrew.tser@gmail.com",
      phone: "+2348039998877",
      amount: 150000,
      currency: "NGN",
      designation: "Medical Outreach",
      paymentMethod: "Bank Transfer",
      reference: "GGMI-DON-9901",
      date: "2026-07-29"
    },
    {
      id: "don-2",
      donorName: "Sister Deborah Gbondo",
      email: "deborah.g@gmail.com",
      phone: "+2348051112233",
      amount: 50000,
      currency: "NGN",
      designation: "Tract & Bibles Printing",
      paymentMethod: "Online Card",
      reference: "GGMI-DON-9902",
      date: "2026-08-01"
    }
  ],

  admins: [
    {
      id: "adm-1",
      username: "admin",
      email: "admin@ggmi.org",
      role: "Super Admin",
      permissions: ["post", "edit", "upload", "view_database", "delete", "manage_admins"]
    },
    {
      id: "adm-2",
      username: "reporter_vandeikya",
      email: "reporter.vandeikya@ggmi.org",
      role: "Field Reporter",
      permissions: ["post", "upload", "view_database"]
    }
  ],

  contactMessages: [
    {
      id: "msg-1",
      name: "Elder Joseph Iorbee",
      email: "iorbee.j@gmail.com",
      phone: "+2348031234567",
      subject: "Request for Tiv Gospel Tracts in Gboko Zone",
      message: "Greetings in Christ! We have an upcoming evangelism drive in Gboko and would love to request 500 copies of 'Msen Sha Ci u Myom u Uma Wou' and 200 Bibles. Please let us know how to arrange collection.",
      status: "Unread",
      createdAt: "2026-08-03T14:30:00Z"
    },
    {
      id: "msg-2",
      name: "Sister Grace Orkaa",
      email: "grace.orkaa@yahoo.com",
      phone: "+2348129876543",
      subject: "Volunteer Surgeon for Upcoming Medical Mission",
      message: "Praise the Lord! I am a registered medical practitioner in Makurdi. I saw your outreach report for Logo LGA and want to offer my voluntary services for the next rural free medical clinic.",
      status: "Replied",
      replyNotes: "Thanked Sister Grace and connected her with Mama Rebecca Agbo (Medical Director). She is added to the November team roster.",
      repliedAt: "2026-08-04T08:15:00Z",
      createdAt: "2026-08-02T10:15:00Z"
    }
  ],

  galleryPhotos: [
    {
      id: "gal-1",
      title: "Logo LGA Rural Medical Mission & Gospel Crusade",
      caption: "GGMI medical team providing free surgery and checkups while preaching Christ in Logo rural settlement.",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      category: "Medical Mission",
      date: "2026-06-15"
    },
    {
      id: "gal-2",
      title: "Mass Baptism at Katsina-Ala River",
      caption: "New converts being baptized after accepting Jesus during the Katsina-Ala Pioneer Evangelism Outreach.",
      imageUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80",
      category: "Outreach",
      date: "2026-05-20"
    },
    {
      id: "gal-3",
      title: "GGMI Annual Global Conference Worship Session",
      caption: "Delegates praising God in English and Tiv during the evening revival session.",
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      category: "Conference",
      date: "2025-08-12"
    }
  ]
};
