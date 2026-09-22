import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { initialAppData } from "./src/data/initialData.ts";
import { AppStateData } from "./src/types.ts";

const PORT = 3000;
const DATA_FILE = path.join(process.cwd(), "data", "ggmi-store.json");

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Load or initialize store
function loadStore(): AppStateData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      return { ...initialAppData, ...parsed };
    }
  } catch (err) {
    console.error("Error loading GGMI store, resetting to initial data:", err);
  }
  saveStore(initialAppData);
  return { ...initialAppData };
}

function saveStore(data: AppStateData) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving GGMI store:", err);
  }
}

let currentStore: AppStateData = loadStore();

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "20mb" }));

  // --- API ROUTES ---

  // Get full app state
  app.get("/api/state", (_req, res) => {
    res.json(currentStore);
  });

  // Reset store to initial seed data
  app.post("/api/admin/reset-seed", (req, res) => {
    currentStore = { ...initialAppData };
    saveStore(currentStore);
    res.json({ success: true, message: "Data reset to default GGMI seed data.", state: currentStore });
  });

  // Admin Login API
  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    
    // Super Admin check
    if ((username === "admin" || username === "admin@ggmi.org") && password === "admin123") {
      const superAdmin = currentStore.admins.find(a => a.role === "Super Admin") || {
        id: "adm-1",
        username: "admin",
        email: "admin@ggmi.org",
        role: "Super Admin",
        permissions: ["post", "edit", "upload", "view_database", "delete", "manage_admins"]
      };
      return res.json({ success: true, user: superAdmin });
    }

    // Check custom sub-admins
    const subAdmin = currentStore.admins.find(a => a.username.toLowerCase() === String(username).toLowerCase() || a.email.toLowerCase() === String(username).toLowerCase());
    if (subAdmin && password === "subadmin123") {
      return res.json({ success: true, user: subAdmin });
    }

    return res.status(401).json({ success: false, message: "Invalid credentials. Try username: 'admin' and password: 'admin123'" });
  });

  // Register Member API
  app.post("/api/members", (req, res) => {
    const newMember = req.body;
    if (!newMember.firstName || !newMember.lastName || !newMember.phone) {
      return res.status(400).json({ error: "First name, last name, and phone number are required." });
    }
    const id = "mbr-" + Date.now();
    const membershipId = "GGMI-MBR-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
    const memberRecord = {
      ...newMember,
      id,
      membershipId,
      createdAt: new Date().toISOString()
    };
    currentStore.members.unshift(memberRecord);
    saveStore(currentStore);
    res.status(201).json({ success: true, member: memberRecord });
  });

  // Register Conference Participant API
  app.post("/api/conference-registrations", (req, res) => {
    const reg = req.body;
    if (!reg.fullName || !reg.phone) {
      return res.status(400).json({ error: "Full name and phone number are required." });
    }
    const id = "conf-" + Date.now();
    const registrationCode = "GGMI-CONF-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
    const record = {
      ...reg,
      id,
      registrationCode,
      createdAt: new Date().toISOString()
    };
    currentStore.conferenceRegistrations.unshift(record);
    saveStore(currentStore);
    res.status(201).json({ success: true, registration: record });
  });

  // Submit Donation API
  app.post("/api/donations", (req, res) => {
    const don = req.body;
    const id = "don-" + Date.now();
    const reference = "GGMI-DON-" + Math.floor(10000 + Math.random() * 90000);
    const record = {
      ...don,
      id,
      reference,
      date: new Date().toISOString().split('T')[0]
    };
    currentStore.donations.unshift(record);
    saveStore(currentStore);
    res.status(201).json({ success: true, donation: record });
  });

  // --- CONTENT MANAGEMENT ENDPOINTS (ADMIN) ---

  // Add / Edit Devotional
  app.post("/api/devotionals", (req, res) => {
    const devotional = req.body;
    if (devotional.id) {
      currentStore.devotionals = currentStore.devotionals.map(d => d.id === devotional.id ? devotional : d);
    } else {
      devotional.id = "dev-" + Date.now();
      currentStore.devotionals.unshift(devotional);
    }
    saveStore(currentStore);
    res.json({ success: true, devotional });
  });

  app.delete("/api/devotionals/:id", (req, res) => {
    currentStore.devotionals = currentStore.devotionals.filter(d => d.id !== req.params.id);
    saveStore(currentStore);
    res.json({ success: true });
  });

  // Add / Edit Material
  app.post("/api/materials", (req, res) => {
    const mat = req.body;
    if (mat.id) {
      currentStore.materials = currentStore.materials.map(m => m.id === mat.id ? mat : m);
    } else {
      mat.id = "mat-" + Date.now();
      mat.downloadsCount = mat.downloadsCount || 0;
      mat.createdAt = new Date().toISOString();
      currentStore.materials.unshift(mat);
    }
    saveStore(currentStore);
    res.json({ success: true, material: mat });
  });

  app.delete("/api/materials/:id", (req, res) => {
    currentStore.materials = currentStore.materials.filter(m => m.id !== req.params.id);
    saveStore(currentStore);
    res.json({ success: true });
  });

  // Add / Edit Outreach Report
  app.post("/api/outreach-reports", (req, res) => {
    const report = req.body;
    if (report.id) {
      currentStore.outreachReports = currentStore.outreachReports.map(r => r.id === report.id ? report : r);
    } else {
      report.id = "rep-" + Date.now();
      report.createdAt = new Date().toISOString();
      currentStore.outreachReports.unshift(report);
    }
    saveStore(currentStore);
    res.json({ success: true, report });
  });

  app.delete("/api/outreach-reports/:id", (req, res) => {
    currentStore.outreachReports = currentStore.outreachReports.filter(r => r.id !== req.params.id);
    saveStore(currentStore);
    res.json({ success: true });
  });

  // Add / Edit News & Ticker
  app.post("/api/news", (req, res) => {
    const news = req.body;
    if (news.id) {
      currentStore.newsItems = currentStore.newsItems.map(n => n.id === news.id ? news : n);
    } else {
      news.id = "news-" + Date.now();
      news.date = news.date || new Date().toISOString().split('T')[0];
      currentStore.newsItems.unshift(news);
    }
    saveStore(currentStore);
    res.json({ success: true, news });
  });

  app.delete("/api/news/:id", (req, res) => {
    currentStore.newsItems = currentStore.newsItems.filter(n => n.id !== req.params.id);
    saveStore(currentStore);
    res.json({ success: true });
  });

  // Add / Edit Events & Links
  app.post("/api/events", (req, res) => {
    const evt = req.body;
    if (evt.id) {
      currentStore.events = currentStore.events.map(e => e.id === evt.id ? evt : e);
    } else {
      evt.id = "evt-" + Date.now();
      currentStore.events.unshift(evt);
    }
    saveStore(currentStore);
    res.json({ success: true, event: evt });
  });

  app.delete("/api/events/:id", (req, res) => {
    currentStore.events = currentStore.events.filter(e => e.id !== req.params.id);
    saveStore(currentStore);
    res.json({ success: true });
  });

  // Update Virtual Meeting Links (Zoom / Teams / Streams)
  app.post("/api/admin/virtual-links", (req, res) => {
    const { zoomLink, teamsLink, youtubeLive, facebookLive } = req.body;
    if (zoomLink !== undefined) currentStore.zoomLink = zoomLink;
    if (teamsLink !== undefined) currentStore.teamsLink = teamsLink;
    if (youtubeLive !== undefined) currentStore.youtubeLive = youtubeLive;
    if (facebookLive !== undefined) currentStore.facebookLive = facebookLive;
    saveStore(currentStore);
    res.json({ success: true, zoomLink: currentStore.zoomLink, teamsLink: currentStore.teamsLink, youtubeLive: currentStore.youtubeLive, facebookLive: currentStore.facebookLive });
  });

  // Manage Admin Users (Super Admin creates sub admins)
  app.post("/api/admin/users", (req, res) => {
    const adminUser = req.body;
    if (adminUser.id) {
      currentStore.admins = currentStore.admins.map(a => a.id === adminUser.id ? adminUser : a);
    } else {
      adminUser.id = "adm-" + Date.now();
      currentStore.admins.push(adminUser);
    }
    saveStore(currentStore);
    res.json({ success: true, admin: adminUser });
  });

  app.delete("/api/admin/users/:id", (req, res) => {
    currentStore.admins = currentStore.admins.filter(a => a.id !== req.params.id);
    saveStore(currentStore);
    res.json({ success: true });
  });

  // Add / Edit FAQs
  app.post("/api/faqs", (req, res) => {
    const faq = req.body;
    if (faq.id) {
      currentStore.faqs = currentStore.faqs.map(f => f.id === faq.id ? faq : f);
    } else {
      faq.id = "faq-" + Date.now();
      currentStore.faqs.push(faq);
    }
    saveStore(currentStore);
    res.json({ success: true, faq });
  });

  app.delete("/api/faqs/:id", (req, res) => {
    currentStore.faqs = currentStore.faqs.filter(f => f.id !== req.params.id);
    saveStore(currentStore);
    res.json({ success: true });
  });

  // Add / Edit Leadership Profile
  app.post("/api/leaders", (req, res) => {
    const leader = req.body;
    if (!currentStore.leaders) currentStore.leaders = [];
    if (leader.id) {
      currentStore.leaders = currentStore.leaders.map(l => l.id === leader.id ? { ...l, ...leader } : l);
    } else {
      leader.id = "ldr-" + Date.now();
      leader.order = leader.order || currentStore.leaders.length + 1;
      currentStore.leaders.push(leader);
    }
    saveStore(currentStore);
    res.json({ success: true, leader });
  });

  app.delete("/api/leaders/:id", (req, res) => {
    if (currentStore.leaders) {
      currentStore.leaders = currentStore.leaders.filter(l => l.id !== req.params.id);
      saveStore(currentStore);
    }
    res.json({ success: true });
  });

  // Submit Contact Message API (Public)
  app.post("/api/contact", (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message content are required." });
    }
    const id = "msg-" + Date.now();
    const messageRecord = {
      id,
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
      status: 'Unread' as const,
      createdAt: new Date().toISOString()
    };
    currentStore.contactMessages = currentStore.contactMessages || [];
    currentStore.contactMessages.unshift(messageRecord);
    saveStore(currentStore);
    res.status(201).json({ success: true, message: messageRecord });
  });

  // Reply / Update Contact Message (Admin)
  app.post("/api/admin/messages/reply", (req, res) => {
    const { id, replyNotes } = req.body;
    if (!id) return res.status(400).json({ error: "Message ID required" });
    
    currentStore.contactMessages = (currentStore.contactMessages || []).map(m => {
      if (m.id === id) {
        return {
          ...m,
          status: 'Replied' as const,
          replyNotes: replyNotes || 'Replied by administrator',
          repliedAt: new Date().toISOString()
        };
      }
      return m;
    });
    saveStore(currentStore);
    res.json({ success: true, messages: currentStore.contactMessages });
  });

  // Delete Contact Message (Admin)
  app.delete("/api/admin/messages/:id", (req, res) => {
    currentStore.contactMessages = (currentStore.contactMessages || []).filter(m => m.id !== req.params.id);
    saveStore(currentStore);
    res.json({ success: true });
  });

  // Add / Edit Gallery Photo (Admin)
  app.post("/api/admin/gallery", (req, res) => {
    const photo = req.body;
    if (!photo.title || !photo.imageUrl) {
      return res.status(400).json({ error: "Title and Image URL are required" });
    }
    currentStore.galleryPhotos = currentStore.galleryPhotos || [];
    if (photo.id) {
      currentStore.galleryPhotos = currentStore.galleryPhotos.map(p => p.id === photo.id ? photo : p);
    } else {
      photo.id = "gal-" + Date.now();
      photo.date = photo.date || new Date().toISOString().split('T')[0];
      currentStore.galleryPhotos.unshift(photo);
    }
    saveStore(currentStore);
    res.json({ success: true, photo });
  });

  // Delete Gallery Photo (Admin)
  app.delete("/api/admin/gallery/:id", (req, res) => {
    currentStore.galleryPhotos = (currentStore.galleryPhotos || []).filter(p => p.id !== req.params.id);
    saveStore(currentStore);
    res.json({ success: true });
  });

  // Member Delete
  app.delete("/api/members/:id", (req, res) => {
    currentStore.members = currentStore.members.filter(m => m.id !== req.params.id);
    saveStore(currentStore);
    res.json({ success: true });
  });

  // Conference Reg Delete
  app.delete("/api/conference-registrations/:id", (req, res) => {
    currentStore.conferenceRegistrations = currentStore.conferenceRegistrations.filter(c => c.id !== req.params.id);
    saveStore(currentStore);
    res.json({ success: true });
  });

  // Direct download for HTML bundle archive
  app.get("/api/download/html-bundle", (_req, res) => {
    const archivePath = path.join(process.cwd(), "html-website.tar.gz");
    if (fs.existsSync(archivePath)) {
      res.download(archivePath, "ggmi-html-website.tar.gz");
    } else {
      res.status(404).json({ error: "HTML archive not found." });
    }
  });

  // --- VITE MIDDLEWARE OR STATIC SERVING ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GGMI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
