import { Devotional, NewsItem, Language } from '../types';

export function getLocalizedDevotional(dev: Devotional | null, language: Language): Devotional | null {
  if (!dev) return null;
  if (language === 'Tiv') {
    return {
      ...dev,
      title: dev.tivTitle || dev.title,
      theme: dev.tivTheme || dev.theme,
      scriptureRef: dev.tivScriptureRef || dev.scriptureRef,
      scriptureText: dev.tivScriptureText || dev.scriptureText,
      bodyText: dev.tivBodyText || dev.bodyText,
      keyTakeaway: dev.tivKeyTakeaway || dev.keyTakeaway,
      prayerPoint: dev.tivPrayerPoint || dev.prayerPoint,
    };
  }
  return dev;
}

export function getLocalizedDevotionalList(devotionals: Devotional[], language: Language): Devotional[] {
  return devotionals.map(dev => getLocalizedDevotional(dev, language)!);
}

export function getLocalizedNews(news: NewsItem | null, language: Language): NewsItem | null {
  if (!news) return null;
  if (language === 'Tiv') {
    return {
      ...news,
      title: news.tivTitle || news.title,
      snippet: news.tivSnippet || news.snippet,
      content: news.tivContent || news.content,
    };
  }
  return news;
}

export function getLocalizedNewsList(newsItems: NewsItem[], language: Language): NewsItem[] {
  return newsItems.map(item => getLocalizedNews(item, language)!);
}

export const uiTranslations = {
  English: {
    newsTickerHeader: "NEWS & URGENT PRAYER TICKER",
    devotionalsHeading: "Daily Devotionals & Exhortations",
    devotionalsSubheading: "Spiritual nourishment for personal growth, family devotions, and mission mobilization",
    todayDevotionalBadge: "TODAY'S DEVOTIONAL",
    readFullDevotional: "Read Full Exhortation & Listen",
    keyTakeawayLabel: "Key Takeaway",
    prayerPointLabel: "Prayer Point",
    authorLabel: "Exhortation Author",
    gospelRepository: "Gospel Repository",
    aboutUs: "About Us",
    devotionals: "Devotionals",
    reports: "Outreach Reports",
    leadership: "Leadership",
    events: "Events & Streams",
    faq: "FAQ",
    contactUs: "Contact Us",
    joinGGMI: "Join GGMI",
    conferenceReg: "Conference Reg",
    donatePartner: "Donate / Partner",
    readMore: "Read More",
    publishedOn: "Published On",
    audioPlayer: "Audio Message",
    languageSwitcherLabel: "Language:",
  },
  Tiv: {
    newsTickerHeader: "LOHO U DEDOO & MSEN U FIAA",
    devotionalsHeading: "Aond Oron & Mrumun U Yange Yange",
    devotionalsSubheading: "M-kya u ken imaagh sha m-zan u he zwa, m-lu u sombo, man m-taver m-lu u pasen loho u dedoo",
    todayDevotionalBadge: "AOND ORON U NYIAN",
    readFullDevotional: "Or Aond Oron ne cii & Ungwa Audio",
    keyTakeawayLabel: "Kwagh u Hemban",
    prayerPointLabel: "Msen u Fiaa",
    authorLabel: "Or u Or Aond Oron ne",
    gospelRepository: "Ijiir i Ngeren Mbu Loho u Dedoo",
    aboutUs: "Sha Ci u Wase",
    devotionals: "Aond Oron",
    reports: "Ripoto u Field",
    leadership: "Utor & Mbahemban-zwa",
    events: "Iliin & M-ziam",
    faq: "Mpin & Mlumun",
    contactUs: "Lam a Wase",
    joinGGMI: "Va Lu Or u GGMI",
    conferenceReg: "Za M-ziam u Conference",
    donatePartner: "Sugh Tom / Partner",
    readMore: "Or Vanger",
    publishedOn: "I Nger Sha",
    audioPlayer: "Audio u Pasen Loho",
    languageSwitcherLabel: "Zwa:",
  }
};
