export type Language = 'English' | 'Tiv';

export interface Member {
  id: string;
  membershipId: string;
  firstName: string;
  lastName: string;
  sex: 'Male' | 'Female';
  age: number;
  zone: string;
  phone: string;
  email: string;
  maritalStatus: 'Single' | 'Married' | 'Widowed' | 'Divorced';
  occupation: string;
  bornAgainStatus: 'Yes' | 'Seeking' | 'Inquirer';
  bornAgainYear?: number;
  baptized: boolean;
  skills?: string;
  notes?: string;
  createdAt: string;
}

export interface ConferenceRegistration {
  id: string;
  registrationCode: string;
  fullName: string;
  sex: 'Male' | 'Female';
  age: number;
  zone: string;
  phone: string;
  address: string;
  email: string;
  maritalStatus: 'Single' | 'Married' | 'Widowed' | 'Divorced';
  accommodationNeeds: 'Yes' | 'No';
  specialAccommodationDetails?: string;
  preferredStudyClass: 'English' | 'Tiv';
  emergencyContact: string;
  createdAt: string;
}

export interface Devotional {
  id: string;
  title: string;
  date: string;
  theme: string;
  scriptureRef: string;
  scriptureText: string;
  bodyText: string;
  keyTakeaway: string;
  prayerPoint: string;
  author: string;
  audioUrl?: string;
  tivTitle?: string;
  tivTheme?: string;
  tivScriptureRef?: string;
  tivScriptureText?: string;
  tivBodyText?: string;
  tivKeyTakeaway?: string;
  tivPrayerPoint?: string;
}

export interface GospelMaterial {
  id: string;
  title: string;
  category: 'Tract' | 'Book' | 'Article' | 'Journal' | 'Audio Sermon' | 'Video Message' | 'Photo Archive';
  author: string;
  description: string;
  fileType: 'PDF' | 'MP3' | 'MP4' | 'EPUB' | 'JPG';
  fileSize: string;
  downloadUrl: string;
  downloadsCount: number;
  coverImage?: string;
  language: 'English' | 'Tiv' | 'Both';
  createdAt: string;
}

export interface OutreachReport {
  id: string;
  title: string;
  location: string;
  period: string;
  soulsReached: number;
  conversions: number;
  medicalSupportProvided: number;
  biblesDistributed: number;
  baptisms: number;
  coverageArea: string;
  summary: string;
  fieldTestimonials: { author: string; testimony: string }[];
  galleryImages: string[];
  reportPdfUrl?: string;
  createdAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  snippet: string;
  content: string;
  date: string;
  isTicker: boolean;
  category: 'Outreach' | 'Conference' | 'General' | 'Urgent Prayer';
  imageUrl?: string;
  tivTitle?: string;
  tivSnippet?: string;
  tivContent?: string;
}

export interface EventItem {
  id: string;
  title: string;
  theme: string;
  date: string; // ISO string
  location: string;
  isVirtual: boolean;
  zoomLink?: string;
  teamsLink?: string;
  youtubeLive?: string;
  facebookLive?: string;
  description: string;
  registrationOpen: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  roleLocation: string;
  type: 'text' | 'video' | 'photo';
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  featured: boolean;
}

export interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  order: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Membership' | 'Conference' | 'Outreach & Giving';
}

export interface DonationRecord {
  id: string;
  donorName: string;
  email: string;
  phone: string;
  amount: number;
  currency: 'NGN' | 'USD' | 'GBP';
  designation: 'General Missions' | 'Medical Outreach' | 'Tract & Bibles Printing' | 'Conference Support' | 'Rural Evangelism';
  paymentMethod: 'Bank Transfer' | 'Online Card' | 'USSD';
  reference: string;
  date: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'Super Admin' | 'Sub Admin' | 'Field Reporter';
  permissions: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
  replyNotes?: string;
  repliedAt?: string;
  createdAt: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption?: string;
  imageUrl: string;
  category: 'Outreach' | 'Conference' | 'Medical Mission' | 'Leadership' | 'Community' | 'General';
  date: string;
}

export interface AppStateData {
  members: Member[];
  conferenceRegistrations: ConferenceRegistration[];
  devotionals: Devotional[];
  materials: GospelMaterial[];
  outreachReports: OutreachReport[];
  newsItems: NewsItem[];
  events: EventItem[];
  testimonials: Testimonial[];
  leaders: LeaderProfile[];
  faqs: FAQItem[];
  donations: DonationRecord[];
  admins: AdminUser[];
  contactMessages: ContactMessage[];
  galleryPhotos: GalleryPhoto[];
  zoomLink: string;
  teamsLink: string;
  youtubeLive: string;
  facebookLive: string;
}
