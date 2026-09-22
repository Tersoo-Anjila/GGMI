import { AppStateData, Member, ConferenceRegistration, Devotional, GospelMaterial, OutreachReport, NewsItem, EventItem, FAQItem, DonationRecord, AdminUser, ContactMessage, GalleryPhoto, LeaderProfile } from "../types";

export async function fetchAppState(): Promise<AppStateData> {
  try {
    const res = await fetch("/api/state");
    if (!res.ok) throw new Error("Failed to load state");
    return await res.json();
  } catch (err) {
    console.warn("API state fetch failed, returning fallback state", err);
    throw err;
  }
}

export async function submitContactMessage(msg: { name: string; email: string; phone?: string; subject?: string; message: string }): Promise<ContactMessage> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(msg)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to submit message");
  return data.message;
}

export async function replyContactMessage(id: string, replyNotes: string): Promise<boolean> {
  const res = await fetch("/api/admin/messages/reply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, replyNotes })
  });
  return res.ok;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
  return res.ok;
}

export async function saveGalleryPhoto(photo: Partial<GalleryPhoto>): Promise<GalleryPhoto> {
  const res = await fetch("/api/admin/gallery", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(photo)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to save photo");
  return data.photo;
}

export async function deleteGalleryPhoto(id: string): Promise<boolean> {
  const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
  return res.ok;
}

export async function submitMemberRegistration(memberData: Partial<Member>): Promise<Member> {
  const res = await fetch("/api/members", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(memberData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Member registration failed");
  return data.member;
}

export async function submitConferenceRegistration(confData: Partial<ConferenceRegistration>): Promise<ConferenceRegistration> {
  const res = await fetch("/api/conference-registrations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(confData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Conference registration failed");
  return data.registration;
}

export async function submitDonation(donationData: Partial<DonationRecord>): Promise<DonationRecord> {
  const res = await fetch("/api/donations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(donationData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Donation failed");
  return data.donation;
}

export async function loginAdmin(username: string, password: string): Promise<{ success: boolean; user: AdminUser }> {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Invalid credentials");
  return data;
}

export async function resetToDefaultSeed(): Promise<AppStateData> {
  const res = await fetch("/api/admin/reset-seed", { method: "POST" });
  const data = await res.json();
  return data.state;
}

// Admin Content Operations
export async function saveDevotional(dev: Partial<Devotional>): Promise<Devotional> {
  const res = await fetch("/api/devotionals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dev)
  });
  const data = await res.json();
  return data.devotional;
}

export async function deleteDevotional(id: string): Promise<boolean> {
  const res = await fetch(`/api/devotionals/${id}`, { method: "DELETE" });
  return res.ok;
}

export async function saveMaterial(mat: Partial<GospelMaterial>): Promise<GospelMaterial> {
  const res = await fetch("/api/materials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mat)
  });
  const data = await res.json();
  return data.material;
}

export async function deleteMaterial(id: string): Promise<boolean> {
  const res = await fetch(`/api/materials/${id}`, { method: "DELETE" });
  return res.ok;
}

export async function saveOutreachReport(rep: Partial<OutreachReport>): Promise<OutreachReport> {
  const res = await fetch("/api/outreach-reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rep)
  });
  const data = await res.json();
  return data.report;
}

export async function deleteOutreachReport(id: string): Promise<boolean> {
  const res = await fetch(`/api/outreach-reports/${id}`, { method: "DELETE" });
  return res.ok;
}

export async function saveNews(news: Partial<NewsItem>): Promise<NewsItem> {
  const res = await fetch("/api/news", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(news)
  });
  const data = await res.json();
  return data.news;
}

export async function deleteNews(id: string): Promise<boolean> {
  const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
  return res.ok;
}

export async function saveEvent(evt: Partial<EventItem>): Promise<EventItem> {
  const res = await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(evt)
  });
  const data = await res.json();
  return data.event;
}

export async function deleteEvent(id: string): Promise<boolean> {
  const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
  return res.ok;
}

export async function updateVirtualLinks(links: { zoomLink?: string; teamsLink?: string; youtubeLive?: string; facebookLive?: string }): Promise<any> {
  const res = await fetch("/api/admin/virtual-links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(links)
  });
  return await res.json();
}

export async function saveAdminUser(admin: Partial<AdminUser>): Promise<AdminUser> {
  const res = await fetch("/api/admin/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(admin)
  });
  const data = await res.json();
  return data.admin;
}

export async function deleteAdminUser(id: string): Promise<boolean> {
  const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
  return res.ok;
}

export async function saveFAQ(faq: Partial<FAQItem>): Promise<FAQItem> {
  const res = await fetch("/api/faqs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(faq)
  });
  const data = await res.json();
  return data.faq;
}

export async function deleteFAQ(id: string): Promise<boolean> {
  const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" });
  return res.ok;
}

export async function deleteMember(id: string): Promise<boolean> {
  const res = await fetch(`/api/members/${id}`, { method: "DELETE" });
  return res.ok;
}

export async function deleteConferenceRegistration(id: string): Promise<boolean> {
  const res = await fetch(`/api/conference-registrations/${id}`, { method: "DELETE" });
  return res.ok;
}

export async function saveLeader(leader: Partial<LeaderProfile>): Promise<LeaderProfile> {
  const res = await fetch("/api/leaders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(leader)
  });
  const data = await res.json();
  return data.leader;
}

export async function deleteLeader(id: string): Promise<boolean> {
  const res = await fetch(`/api/leaders/${id}`, { method: "DELETE" });
  return res.ok;
}
