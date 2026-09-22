import React, { useState } from 'react';
import { 
  AppStateData, 
  AdminUser, 
  Member, 
  ConferenceRegistration, 
  Devotional, 
  GospelMaterial, 
  OutreachReport, 
  NewsItem, 
  EventItem, 
  FAQItem,
  ContactMessage,
  GalleryPhoto,
  LeaderProfile
} from '../../types';
import { 
  loginAdmin, 
  resetToDefaultSeed, 
  saveDevotional, 
  deleteDevotional, 
  saveMaterial, 
  deleteMaterial, 
  saveOutreachReport, 
  deleteOutreachReport, 
  saveNews, 
  deleteNews, 
  saveEvent, 
  deleteEvent, 
  updateVirtualLinks, 
  saveAdminUser, 
  deleteAdminUser, 
  saveFAQ, 
  deleteFAQ, 
  deleteMember, 
  deleteConferenceRegistration,
  replyContactMessage,
  deleteContactMessage,
  saveGalleryPhoto,
  deleteGalleryPhoto,
  submitContactMessage,
  saveLeader,
  deleteLeader
} from '../../lib/api';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Users, 
  CalendarCheck, 
  BookOpen, 
  FolderArchive, 
  HeartHandshake, 
  Tv, 
  Plus, 
  Trash2, 
  Edit, 
  Download, 
  Search, 
  RefreshCw, 
  LogOut, 
  UserPlus, 
  Check, 
  Video,
  Volume2,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  Reply,
  Send,
  Upload,
  Eye,
  Radio,
  Sparkles,
  Filter,
  CheckCircle2,
  ListFilter,
  Award
} from 'lucide-react';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  appState: AppStateData;
  onStateUpdated: (newState: AppStateData) => void;
}

// Universal File & Link Uploader Component
interface FileUploaderProps {
  label: string;
  accept: string;
  value?: string;
  onChange: (url: string, fileName?: string, fileSize?: string) => void;
  placeholder?: string;
  type?: 'image' | 'audio' | 'video' | 'pdf';
}

const FileUploader: React.FC<FileUploaderProps> = ({
  label,
  accept,
  value,
  onChange,
  placeholder = "Upload file or enter URL...",
  type = 'image'
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileDetails, setFileDetails] = useState('');

  const handleFile = (file: File) => {
    if (!file) return;
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2) + " MB";
    setFileDetails(`${file.name} (${sizeMB})`);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result, file.name, sizeMB);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-1 text-xs">
      <div className="flex justify-between items-center text-[#6B635B] font-bold">
        <span>{label}</span>
        {fileDetails && <span className="text-[10px] text-[#A68B67] font-mono">{fileDetails}</span>}
      </div>
      
      <div 
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
        }}
        className={`p-2.5 rounded-xl border-2 border-dashed transition-all bg-white flex flex-col sm:flex-row items-center gap-2.5 ${
          dragActive ? 'border-[#5A5A40] bg-[#F1ECE7]' : 'border-[#E6E2DE] hover:border-[#A68B67]'
        }`}
      >
        <label className="px-3 py-1.5 rounded-lg bg-[#F1ECE7] hover:bg-[#E6E2DE] text-[#5A5A40] text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1.5 border border-[#DED4C7]">
          <Upload className="w-3.5 h-3.5 text-[#A68B67]" /> Browse File
          <input 
            type="file" 
            accept={accept} 
            className="hidden" 
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }} 
          />
        </label>
        
        <span className="text-[#8C8279] text-[10px] hidden sm:inline">or URL:</span>
        
        <input
          type="text"
          placeholder={placeholder}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg px-2.5 py-1.5 text-xs text-[#2D2D2D]"
        />
      </div>

      {value && type === 'image' && (
        <div className="mt-1.5 w-20 h-20 rounded-lg overflow-hidden border border-[#E6E2DE] bg-stone-100 relative group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button 
            type="button" 
            onClick={() => onChange('')} 
            className="absolute top-1 right-1 p-0.5 bg-stone-900/80 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      )}

      {value && type === 'audio' && (
        <div className="mt-1.5">
          <audio controls src={value} className="w-full h-7 accent-[#5A5A40]" />
        </div>
      )}

      {value && type === 'video' && (
        <div className="mt-1.5">
          {value.includes('youtube.com') || value.includes('youtu.be') ? (
            <div className="aspect-video w-full max-w-xs rounded-lg overflow-hidden border border-[#E6E2DE]">
              <iframe 
                src={value.replace('watch?v=', 'embed/')} 
                className="w-full h-full" 
                title="Video preview"
              />
            </div>
          ) : (
            <video controls src={value} className="w-full max-w-xs max-h-32 rounded-lg border border-[#E6E2DE]" />
          )}
        </div>
      )}
    </div>
  );
};

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  appState,
  onStateUpdated,
}) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  type TabType = 
    | 'dashboard' 
    | 'messages' 
    | 'audioVideo' 
    | 'literature' 
    | 'outreach' 
    | 'gallery' 
    | 'news' 
    | 'devotionals' 
    | 'members' 
    | 'conference' 
    | 'virtualLinks' 
    | 'donations' 
    | 'leadership'
    | 'admins';

  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Search & Filters
  const [memberSearch, setMemberSearch] = useState('');
  const [confSearch, setConfSearch] = useState('');
  const [confClassFilter, setConfClassFilter] = useState<'All' | 'Tiv' | 'English'>('All');
  const [msgFilter, setMsgFilter] = useState<'All' | 'Unread' | 'Replied'>('All');
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [litFilter, setLitFilter] = useState<string>('All');

  // Reply Modal Tracker
  const [replyingMessage, setReplyingMessage] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);

  // Editing Item Trackers
  const [editingMaterial, setEditingMaterial] = useState<Partial<GospelMaterial> | null>(null);
  const [editingOutreach, setEditingOutreach] = useState<Partial<OutreachReport> | null>(null);
  const [editingGallery, setEditingGallery] = useState<Partial<GalleryPhoto> | null>(null);
  const [editingNews, setEditingNews] = useState<Partial<NewsItem> | null>(null);
  const [editingDevotional, setEditingDevotional] = useState<Partial<Devotional> | null>(null);
  const [editingLeader, setEditingLeader] = useState<Partial<LeaderProfile> | null>(null);

  // Virtual Links
  const [zoomLink, setZoomLink] = useState(appState.zoomLink || '');
  const [teamsLink, setTeamsLink] = useState(appState.teamsLink || '');
  const [youtubeLive, setYoutubeLive] = useState(appState.youtubeLive || '');
  const [facebookLive, setFacebookLive] = useState(appState.facebookLive || '');

  // Sub-Admin State
  const [newAdmin, setNewAdmin] = useState<Partial<AdminUser>>({
    username: '',
    email: '',
    role: 'Sub Admin',
    permissions: ['post', 'edit', 'upload', 'view_database']
  });

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const result = await loginAdmin(loginUsername, loginPassword);
      setCurrentUser(result.user);
    } catch (err: any) {
      setLoginError(err.message || 'Login failed.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleQuickDemoLogin = (role: 'Super Admin' | 'Sub Admin') => {
    if (role === 'Super Admin') {
      setCurrentUser({
        id: 'adm-1',
        username: 'admin',
        email: 'admin@ggmi.org',
        role: 'Super Admin',
        permissions: ['post', 'edit', 'upload', 'view_database', 'delete', 'manage_admins']
      });
    } else {
      setCurrentUser({
        id: 'adm-2',
        username: 'subadmin_vandeikya',
        email: 'subadmin@ggmi.org',
        role: 'Sub Admin',
        permissions: ['post', 'edit', 'upload', 'view_database']
      });
    }
  };

  const handleResetSeed = async () => {
    if (window.confirm("Are you sure you want to reset all data to default GGMI seed data?")) {
      const newState = await resetToDefaultSeed();
      onStateUpdated(newState);
      alert("Database reset to initial seed data!");
    }
  };

  const exportToCSV = (filename: string, rows: any[]) => {
    if (!rows || rows.length === 0) return;
    const keys = Object.keys(rows[0]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [keys.join(","), ...rows.map(r => keys.map(k => `"${String(r[k] || '').replace(/"/g, '""')}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveVirtualLinks = async () => {
    await updateVirtualLinks({ zoomLink, teamsLink, youtubeLive, facebookLive });
    onStateUpdated({ ...appState, zoomLink, teamsLink, youtubeLive, facebookLive });
    alert("Virtual links updated successfully!");
  };

  const handleSaveLeader = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLeader?.name || !editingLeader?.role) {
      alert("Please fill in Leader Name and Role.");
      return;
    }
    try {
      const saved = await saveLeader(editingLeader);
      let updatedLeaders = [...(appState.leaders || [])];
      const exists = updatedLeaders.some(l => l.id === saved.id);
      if (exists) {
        updatedLeaders = updatedLeaders.map(l => l.id === saved.id ? saved : l);
      } else {
        updatedLeaders.push(saved);
      }
      onStateUpdated({ ...appState, leaders: updatedLeaders });
      setEditingLeader(null);
      alert("Leadership profile saved successfully!");
    } catch (err) {
      alert("Failed to save leadership profile.");
    }
  };

  const handleDeleteLeader = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this leader profile?")) {
      await deleteLeader(id);
      onStateUpdated({
        ...appState,
        leaders: (appState.leaders || []).filter(l => l.id !== id)
      });
    }
  };

  const handleCreateSubAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.username || !newAdmin.email) return;
    const admin = await saveAdminUser(newAdmin);
    onStateUpdated({ ...appState, admins: [...appState.admins, admin] });
    setNewAdmin({ username: '', email: '', role: 'Sub Admin', permissions: ['post', 'edit', 'upload', 'view_database'] });
    alert(`Sub Admin '${admin.username}' created! Password set to 'subadmin123'`);
  };

  const handleSendReply = async () => {
    if (!replyingMessage || !replyText) return;
    setReplyLoading(true);
    try {
      await replyContactMessage(replyingMessage.id, replyText);
      const updatedMessages = (appState.contactMessages || []).map(m => 
        m.id === replyingMessage.id ? { ...m, status: 'Replied' as const, replyNotes: replyText, repliedAt: new Date().toISOString() } : m
      );
      onStateUpdated({ ...appState, contactMessages: updatedMessages });
      setReplyingMessage(null);
      setReplyText('');
      alert(`Reply sent to ${replyingMessage.name} (${replyingMessage.email})!`);
    } catch (err) {
      alert("Failed to send reply.");
    } finally {
      setReplyLoading(false);
    }
  };

  const hasPermission = (permission: string) => {
    if (!currentUser) return false;
    if (currentUser.role === 'Super Admin') return true;
    return currentUser.permissions.includes(permission);
  };

  const contactMsgs = appState.contactMessages || [];
  const galleryPhotos = appState.galleryPhotos || [];
  const unreadCount = contactMsgs.filter(m => m.status === 'Unread').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#2D2D2D]/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-[#E6E2DE] rounded-2xl max-w-6xl w-full text-[#2D2D2D] shadow-2xl overflow-hidden my-4 flex flex-col max-h-[94vh]">
        
        {/* Top Header */}
        <div className="bg-[#F1ECE7] px-6 py-4 border-b border-[#E6E2DE] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#5A5A40] text-white font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-[#2D2D2D] flex items-center gap-2">
                GGMI Admin Portal
                {currentUser && (
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                    currentUser.role === 'Super Admin' ? 'bg-[#5A5A40] text-white' : 'bg-[#A68B67] text-white'
                  }`}>
                    {currentUser.role}
                  </span>
                )}
              </h2>
              <p className="text-xs text-[#6B635B]">Media Upload, Messaging, Impact Statistics & Database Control</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser && (
              <button
                onClick={() => setCurrentUser(null)}
                className="px-3 py-1.5 rounded-lg bg-[#F8F5F2] hover:bg-[#E6E2DE] text-[#6B635B] text-xs font-bold flex items-center gap-1.5 border border-[#E6E2DE]"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            )}
            <button onClick={onClose} className="p-1.5 rounded-lg text-[#8C8279] hover:text-[#2D2D2D] hover:bg-[#E6E2DE]">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BODY AREA */}
        {!currentUser ? (
          /* LOGIN SCREEN */
          <div className="p-8 max-w-md mx-auto my-auto w-full space-y-6 text-center">
            <div className="p-4 rounded-2xl bg-[#F8F5F2] border border-[#E6E2DE] w-fit mx-auto text-[#5A5A40]">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-[#2D2D2D]">Admin Authentication</h3>
              <p className="text-xs text-[#6B635B] mt-1">Super Admin & Sub Admin Access Portal</p>
            </div>

            <div className="p-3 bg-[#F8F5F2] rounded-xl border border-[#E6E2DE] text-left text-xs space-y-2">
              <div className="text-[10px] uppercase font-bold text-[#A68B67]">Quick Testing Credentials</div>
              <div className="flex justify-between items-center text-[#6B635B]">
                <span>Super Admin: <strong className="text-[#2D2D2D]">admin / admin123</strong></span>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('Super Admin')}
                  className="px-2 py-1 rounded bg-[#5A5A40] text-white font-bold text-[10px]"
                >
                  Demo Log In
                </button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left text-xs">
              {loginError && <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700">{loginError}</div>}

              <div>
                <label className="block text-[#6B635B] font-bold mb-1">Username or Email</label>
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-xl p-3 text-xs text-[#2D2D2D]"
                />
              </div>

              <div>
                <label className="block text-[#6B635B] font-bold mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-xl p-3 text-xs text-[#2D2D2D]"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 rounded-xl bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-sm shadow-xs"
              >
                {loginLoading ? 'Authenticating...' : 'Sign In to Portal'}
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD & NAVIGATION */
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-[#F8F5F2] p-4 border-r border-[#E6E2DE] space-y-1.5 shrink-0 overflow-y-auto">
              <div className="text-[10px] uppercase font-bold text-[#8C8279] px-3 pb-1">Dashboard & Uploads</div>

              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
                  activeTab === 'dashboard' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#6B635B] hover:bg-[#F1ECE7] hover:text-[#2D2D2D]'
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> Overview Dashboard
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  activeTab === 'messages' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#6B635B] hover:bg-[#F1ECE7] hover:text-[#2D2D2D]'
                }`}
              >
                <span className="flex items-center gap-2.5"><MessageSquare className="w-4 h-4" /> Messages & Replies</span>
                {unreadCount > 0 ? (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">{unreadCount}</span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-[#F1ECE7] text-[10px] font-mono text-[#5A5A40] font-bold">{contactMsgs.length}</span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('audioVideo')}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  activeTab === 'audioVideo' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#6B635B] hover:bg-[#F1ECE7] hover:text-[#2D2D2D]'
                }`}
              >
                <span className="flex items-center gap-2.5"><Volume2 className="w-4 h-4" /> Audio & Video Sermons</span>
                <span className="px-2 py-0.5 rounded bg-[#F1ECE7] text-[10px] font-mono text-[#5A5A40] font-bold">
                  {appState.materials.filter(m => m.category === 'Audio Sermon' || m.category === 'Video Message').length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('literature')}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  activeTab === 'literature' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#6B635B] hover:bg-[#F1ECE7] hover:text-[#2D2D2D]'
                }`}
              >
                <span className="flex items-center gap-2.5"><FileText className="w-4 h-4" /> Gospel Literature</span>
                <span className="px-2 py-0.5 rounded bg-[#F1ECE7] text-[10px] font-mono text-[#5A5A40] font-bold">
                  {appState.materials.filter(m => m.category === 'Tract' || m.category === 'Book' || m.category === 'Journal' || m.category === 'Article').length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('outreach')}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  activeTab === 'outreach' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#6B635B] hover:bg-[#F1ECE7] hover:text-[#2D2D2D]'
                }`}
              >
                <span className="flex items-center gap-2.5"><Users className="w-4 h-4" /> Outreach & Stats</span>
                <span className="px-2 py-0.5 rounded bg-[#F1ECE7] text-[10px] font-mono text-[#5A5A40] font-bold">{appState.outreachReports.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  activeTab === 'gallery' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#6B635B] hover:bg-[#F1ECE7] hover:text-[#2D2D2D]'
                }`}
              >
                <span className="flex items-center gap-2.5"><ImageIcon className="w-4 h-4" /> Photo Gallery</span>
                <span className="px-2 py-0.5 rounded bg-[#F1ECE7] text-[10px] font-mono text-[#5A5A40] font-bold">{galleryPhotos.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('news')}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  activeTab === 'news' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#6B635B] hover:bg-[#F1ECE7] hover:text-[#2D2D2D]'
                }`}
              >
                <span className="flex items-center gap-2.5"><Radio className="w-4 h-4" /> Latest News & Tickers</span>
                <span className="px-2 py-0.5 rounded bg-[#F1ECE7] text-[10px] font-mono text-[#5A5A40] font-bold">{appState.newsItems.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('devotionals')}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  activeTab === 'devotionals' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#6B635B] hover:bg-[#F1ECE7] hover:text-[#2D2D2D]'
                }`}
              >
                <span className="flex items-center gap-2.5"><BookOpen className="w-4 h-4" /> Daily Devotionals</span>
                <span className="px-2 py-0.5 rounded bg-[#F1ECE7] text-[10px] font-mono text-[#5A5A40] font-bold">{appState.devotionals.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('leadership')}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  activeTab === 'leadership' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#6B635B] hover:bg-[#F1ECE7] hover:text-[#2D2D2D]'
                }`}
              >
                <span className="flex items-center gap-2.5"><Award className="w-4 h-4" /> Leadership Team</span>
                <span className="px-2 py-0.5 rounded bg-[#F1ECE7] text-[10px] font-mono text-[#5A5A40] font-bold">{(appState.leaders || []).length}</span>
              </button>

              <div className="pt-2 text-[10px] uppercase font-bold text-[#8C8279] px-3">Database Records</div>

              <button
                onClick={() => setActiveTab('members')}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  activeTab === 'members' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#6B635B] hover:bg-[#F1ECE7] hover:text-[#2D2D2D]'
                }`}
              >
                <span className="flex items-center gap-2.5"><Users className="w-4 h-4" /> Members DB</span>
                <span className="px-2 py-0.5 rounded bg-[#F1ECE7] text-[10px] font-mono text-[#5A5A40] font-bold">{appState.members.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('conference')}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  activeTab === 'conference' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#6B635B] hover:bg-[#F1ECE7] hover:text-[#2D2D2D]'
                }`}
              >
                <span className="flex items-center gap-2.5"><CalendarCheck className="w-4 h-4" /> Conference Regs</span>
                <span className="px-2 py-0.5 rounded bg-[#F1ECE7] text-[10px] font-mono text-[#5A5A40] font-bold">{appState.conferenceRegistrations.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('virtualLinks')}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
                  activeTab === 'virtualLinks' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#6B635B] hover:bg-[#F1ECE7] hover:text-[#2D2D2D]'
                }`}
              >
                <Tv className="w-4 h-4" /> Meeting & Stream Links
              </button>

              <button
                onClick={() => setActiveTab('donations')}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  activeTab === 'donations' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#6B635B] hover:bg-[#F1ECE7] hover:text-[#2D2D2D]'
                }`}
              >
                <span className="flex items-center gap-2.5"><HeartHandshake className="w-4 h-4" /> Donation Logs</span>
                <span className="px-2 py-0.5 rounded bg-[#F1ECE7] text-[10px] font-mono text-[#5A5A40] font-bold">{appState.donations.length}</span>
              </button>

              {currentUser.role === 'Super Admin' && (
                <button
                  onClick={() => setActiveTab('admins')}
                  className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                    activeTab === 'admins' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#6B635B] hover:bg-[#F1ECE7] hover:text-[#2D2D2D]'
                  }`}
                >
                  <span className="flex items-center gap-2.5"><UserPlus className="w-4 h-4" /> Sub Admin Users</span>
                  <span className="px-2 py-0.5 rounded bg-[#F1ECE7] text-[10px] font-mono text-[#5A5A40] font-bold">{appState.admins.length}</span>
                </button>
              )}

              <div className="pt-3 border-t border-[#E6E2DE]">
                <button
                  onClick={handleResetSeed}
                  className="w-full px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center gap-2 border border-red-200"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset Database Seed
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-white">
              
              {/* TAB 1: OVERVIEW DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div 
                      onClick={() => setActiveTab('members')}
                      className="bg-[#F8F5F2] hover:bg-[#F1ECE7] p-5 rounded-2xl border border-[#E6E2DE] cursor-pointer transition-all"
                    >
                      <span className="text-[10px] uppercase font-bold text-[#6B635B]">Registered Members</span>
                      <div className="text-2xl font-bold text-[#5A5A40] font-serif mt-1">{appState.members.length}</div>
                    </div>

                    <div 
                      onClick={() => setActiveTab('conference')}
                      className="bg-[#F8F5F2] hover:bg-[#F1ECE7] p-5 rounded-2xl border border-[#E6E2DE] cursor-pointer transition-all"
                    >
                      <span className="text-[10px] uppercase font-bold text-[#6B635B]">Conference Delegates</span>
                      <div className="text-2xl font-bold text-[#5A5A40] font-serif mt-1">{appState.conferenceRegistrations.length}</div>
                    </div>

                    <div 
                      onClick={() => setActiveTab('messages')}
                      className="bg-[#F8F5F2] hover:bg-[#F1ECE7] p-5 rounded-2xl border border-[#E6E2DE] cursor-pointer transition-all relative"
                    >
                      <span className="text-[10px] uppercase font-bold text-[#6B635B]">Visitor Messages</span>
                      <div className="text-2xl font-bold text-[#5A5A40] font-serif mt-1">{contactMsgs.length}</div>
                      {unreadCount > 0 && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                          {unreadCount} Unread
                        </span>
                      )}
                    </div>

                    <div 
                      onClick={() => setActiveTab('donations')}
                      className="bg-[#F8F5F2] hover:bg-[#F1ECE7] p-5 rounded-2xl border border-[#E6E2DE] cursor-pointer transition-all"
                    >
                      <span className="text-[10px] uppercase font-bold text-[#6B635B]">Total Donations</span>
                      <div className="text-2xl font-bold text-[#5A5A40] font-serif mt-1">
                        ₦{appState.donations.reduce((acc, d) => acc + d.amount, 0).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="bg-[#F8F5F2] p-6 rounded-2xl border border-[#E6E2DE] space-y-4">
                    <h4 className="font-bold text-[#2D2D2D] text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#A68B67]" /> Admin Quick Actions & Content Uploads
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs font-bold">
                      <button 
                        onClick={() => setActiveTab('messages')}
                        className="p-3 bg-white hover:bg-[#F1ECE7] border border-[#E6E2DE] rounded-xl text-[#5A5A40] flex items-center gap-2 shadow-xs"
                      >
                        <MessageSquare className="w-4 h-4 text-[#A68B67]" /> Reply Messages
                      </button>
                      <button 
                        onClick={() => setActiveTab('audioVideo')}
                        className="p-3 bg-white hover:bg-[#F1ECE7] border border-[#E6E2DE] rounded-xl text-[#5A5A40] flex items-center gap-2 shadow-xs"
                      >
                        <Volume2 className="w-4 h-4 text-[#A68B67]" /> Upload Sermons
                      </button>
                      <button 
                        onClick={() => setActiveTab('literature')}
                        className="p-3 bg-white hover:bg-[#F1ECE7] border border-[#E6E2DE] rounded-xl text-[#5A5A40] flex items-center gap-2 shadow-xs"
                      >
                        <FileText className="w-4 h-4 text-[#A68B67]" /> Upload Literature
                      </button>
                      <button 
                        onClick={() => setActiveTab('outreach')}
                        className="p-3 bg-white hover:bg-[#F1ECE7] border border-[#E6E2DE] rounded-xl text-[#5A5A40] flex items-center gap-2 shadow-xs"
                      >
                        <Users className="w-4 h-4 text-[#A68B67]" /> Upload Outreach
                      </button>
                      <button 
                        onClick={() => setActiveTab('gallery')}
                        className="p-3 bg-white hover:bg-[#F1ECE7] border border-[#E6E2DE] rounded-xl text-[#5A5A40] flex items-center gap-2 shadow-xs"
                      >
                        <ImageIcon className="w-4 h-4 text-[#A68B67]" /> Upload Gallery Photo
                      </button>
                      <button 
                        onClick={() => setActiveTab('news')}
                        className="p-3 bg-white hover:bg-[#F1ECE7] border border-[#E6E2DE] rounded-xl text-[#5A5A40] flex items-center gap-2 shadow-xs"
                      >
                        <Radio className="w-4 h-4 text-[#A68B67]" /> Post News Ticker
                      </button>
                      <button 
                        onClick={() => setActiveTab('devotionals')}
                        className="p-3 bg-white hover:bg-[#F1ECE7] border border-[#E6E2DE] rounded-xl text-[#5A5A40] flex items-center gap-2 shadow-xs"
                      >
                        <BookOpen className="w-4 h-4 text-[#A68B67]" /> Post Devotional
                      </button>
                      <button 
                        onClick={() => setActiveTab('virtualLinks')}
                        className="p-3 bg-white hover:bg-[#F1ECE7] border border-[#E6E2DE] rounded-xl text-[#5A5A40] flex items-center gap-2 shadow-xs"
                      >
                        <Tv className="w-4 h-4 text-[#A68B67]" /> Stream & Zoom Links
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: MESSAGES & REPLIES */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-[#2D2D2D] flex items-center gap-2">
                        Visitor Inquiries & Contact Messages
                      </h3>
                      <p className="text-xs text-[#6B635B]">View inquiries, send responses, and manage official message logs</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select 
                        value={msgFilter}
                        onChange={(e) => setMsgFilter(e.target.value as any)}
                        className="bg-[#F8F5F2] border border-[#E6E2DE] rounded-xl px-3 py-2 text-xs text-[#5A5A40] font-bold"
                      >
                        <option value="All">All Messages ({contactMsgs.length})</option>
                        <option value="Unread">Unread Only ({unreadCount})</option>
                        <option value="Replied">Replied Messages</option>
                      </select>
                    </div>
                  </div>

                  {contactMsgs.length === 0 ? (
                    <div className="p-8 text-center text-xs text-[#8C8279] bg-[#F8F5F2] rounded-2xl border border-[#E6E2DE]">
                      No contact messages recorded yet.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {contactMsgs
                        .filter(m => msgFilter === 'All' || m.status === msgFilter)
                        .map((msg) => (
                          <div key={msg.id} className="bg-[#F8F5F2] p-5 rounded-2xl border border-[#E6E2DE] space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E6E2DE] pb-3">
                              <div>
                                <h4 className="font-bold text-[#2D2D2D] text-sm flex items-center gap-2">
                                  {msg.subject}
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                    msg.status === 'Unread' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                                    msg.status === 'Replied' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                                    'bg-[#E6E2DE] text-[#5A5A40]'
                                  }`}>
                                    {msg.status}
                                  </span>
                                </h4>
                                <div className="text-xs text-[#6B635B] mt-0.5">
                                  From: <strong className="text-[#2D2D2D]">{msg.name}</strong> ({msg.email}) {msg.phone && `• ${msg.phone}`}
                                </div>
                              </div>
                              <div className="text-[10px] text-[#8C8279] font-mono">
                                {new Date(msg.createdAt).toLocaleString()}
                              </div>
                            </div>

                            <p className="text-xs text-[#2D2D2D] bg-white p-3.5 rounded-xl border border-[#E6E2DE] leading-relaxed">
                              "{msg.message}"
                            </p>

                            {msg.status === 'Replied' && msg.replyNotes && (
                              <div className="bg-[#F1ECE7] p-3 rounded-xl border border-[#DED4C7] space-y-1">
                                <div className="text-[10px] uppercase font-bold text-[#5A5A40] flex items-center gap-1">
                                  <Check className="w-3 h-3 text-emerald-600" /> Admin Reply Sent ({msg.repliedAt ? new Date(msg.repliedAt).toLocaleDateString() : ''})
                                </div>
                                <p className="text-xs text-[#6B635B] italic">{msg.replyNotes}</p>
                              </div>
                            )}

                            <div className="flex items-center justify-end gap-2 pt-1">
                              <button
                                onClick={() => {
                                  setReplyingMessage(msg);
                                  setReplyText(msg.replyNotes || '');
                                }}
                                className="px-3 py-1.5 rounded-lg bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold flex items-center gap-1.5"
                              >
                                <Reply className="w-3.5 h-3.5" /> {msg.status === 'Replied' ? 'Edit Reply' : 'Reply to Visitor'}
                              </button>

                              {hasPermission('delete') && (
                                <button
                                  onClick={async () => {
                                    if (confirm('Delete this message?')) {
                                      await deleteContactMessage(msg.id);
                                      onStateUpdated({ ...appState, contactMessages: contactMsgs.filter(m => m.id !== msg.id) });
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Reply Modal */}
                  {replyingMessage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
                      <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-[#E6E2DE] shadow-2xl">
                        <div className="flex justify-between items-center border-b border-[#E6E2DE] pb-3">
                          <h4 className="font-serif font-bold text-sm text-[#2D2D2D] flex items-center gap-2">
                            <Reply className="w-4 h-4 text-[#A68B67]" /> Reply to {replyingMessage.name}
                          </h4>
                          <button onClick={() => setReplyingMessage(null)} className="text-[#8C8279] hover:text-[#2D2D2D]">✕</button>
                        </div>

                        <div className="text-xs text-[#6B635B] bg-[#F8F5F2] p-3 rounded-xl border border-[#E6E2DE]">
                          <strong>Recipient:</strong> {replyingMessage.email} <br />
                          <strong>Subject:</strong> RE: {replyingMessage.subject}
                        </div>

                        <textarea
                          rows={4}
                          placeholder="Type official response/reply message here..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-xl p-3 text-xs text-[#2D2D2D]"
                        />

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setReplyingMessage(null)}
                            className="px-4 py-2 rounded-xl bg-[#F8F5F2] text-[#6B635B] font-bold text-xs"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleSendReply}
                            disabled={replyLoading || !replyText}
                            className="px-5 py-2 rounded-xl bg-[#5A5A40] text-white font-bold text-xs flex items-center gap-2"
                          >
                            <Send className="w-3.5 h-3.5" /> {replyLoading ? 'Sending...' : 'Send Official Reply'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: AUDIO & VIDEO SERMONS MANAGEMENT */}
              {activeTab === 'audioVideo' && (
                <div className="space-y-6">
                  <div className="bg-[#F8F5F2] p-6 rounded-2xl border border-[#E6E2DE] space-y-4">
                    <h4 className="font-bold text-[#2D2D2D] text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2"><Volume2 className="w-4 h-4 text-[#A68B67]" /> Upload Audio Sermon or Video Message</span>
                      {editingMaterial && (
                        <button onClick={() => setEditingMaterial(null)} className="text-xs text-[#5A5A40] underline font-normal">
                          Clear Form
                        </button>
                      )}
                    </h4>

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (!editingMaterial?.title || (!editingMaterial?.downloadUrl && !editingMaterial?.youtubeUrl)) {
                          alert("Title and Audio/Video file link are required.");
                          return;
                        }
                        const saved = await saveMaterial(editingMaterial as any);
                        onStateUpdated({
                          ...appState,
                          materials: [saved, ...appState.materials.filter(m => m.id !== saved.id)]
                        });
                        setEditingMaterial(null);
                        alert("Audio/Video Sermon saved!");
                      }}
                      className="space-y-3 text-xs"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[#6B635B] font-bold mb-1">Media Category</label>
                          <select
                            value={editingMaterial?.category || 'Audio Sermon'}
                            onChange={(e) => setEditingMaterial({ ...editingMaterial, category: e.target.value as any })}
                            className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                          >
                            <option value="Audio Sermon">Audio Sermon (MP3)</option>
                            <option value="Video Message">Video Message / Documentary (MP4 / YouTube)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[#6B635B] font-bold mb-1">Language</label>
                          <select
                            value={editingMaterial?.language || 'English'}
                            onChange={(e) => setEditingMaterial({ ...editingMaterial, language: e.target.value as any })}
                            className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                          >
                            <option value="English">English</option>
                            <option value="Tiv">Tiv Language</option>
                            <option value="Both">Bilingual (English & Tiv)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Sermon / Message Title *"
                          value={editingMaterial?.title || ''}
                          onChange={(e) => setEditingMaterial({ ...editingMaterial, title: e.target.value })}
                          className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        />
                        <input
                          type="text"
                          placeholder="Preacher / Speaker (e.g. Evangelist Jacob Tsue)"
                          value={editingMaterial?.author || ''}
                          onChange={(e) => setEditingMaterial({ ...editingMaterial, author: e.target.value })}
                          className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        />
                      </div>

                      {/* File Uploader for Audio or Video */}
                      {editingMaterial?.category === 'Video Message' ? (
                        <FileUploader
                          label="Video File / YouTube Link *"
                          accept="video/*"
                          value={editingMaterial?.downloadUrl || editingMaterial?.youtubeUrl || ''}
                          onChange={(url) => setEditingMaterial({ ...editingMaterial, downloadUrl: url, fileType: 'MP4' })}
                          placeholder="Upload MP4 video or paste YouTube embed URL..."
                          type="video"
                        />
                      ) : (
                        <FileUploader
                          label="Audio Sermon MP3 File / URL *"
                          accept="audio/*"
                          value={editingMaterial?.downloadUrl || ''}
                          onChange={(url, name, size) => setEditingMaterial({ 
                            ...editingMaterial, 
                            downloadUrl: url, 
                            fileType: 'MP3',
                            fileSize: size || editingMaterial?.fileSize || '12 MB'
                          })}
                          placeholder="Upload MP3 sermon audio file or enter direct audio URL..."
                          type="audio"
                        />
                      )}

                      <FileUploader
                        label="Sermon Cover / Thumbnail Image (Optional)"
                        accept="image/*"
                        value={editingMaterial?.coverImage || ''}
                        onChange={(url) => setEditingMaterial({ ...editingMaterial, coverImage: url })}
                        placeholder="Upload thumbnail photo or URL..."
                        type="image"
                      />

                      <textarea
                        rows={3}
                        placeholder="Sermon notes, description, or key scripture references..."
                        value={editingMaterial?.description || ''}
                        onChange={(e) => setEditingMaterial({ ...editingMaterial, description: e.target.value })}
                        className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                      />

                      <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#5A5A40] font-bold text-white text-xs shadow-xs flex items-center gap-2">
                        <Upload className="w-4 h-4 text-[#A68B67]" /> Save Sermon / Video Message
                      </button>
                    </form>
                  </div>

                  {/* List of Audio & Video Messages */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-[#2D2D2D] text-xs uppercase tracking-wider">Uploaded Audio & Video Sermons Library</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {appState.materials
                        .filter(m => m.category === 'Audio Sermon' || m.category === 'Video Message')
                        .map((mat) => (
                          <div key={mat.id} className="bg-[#F8F5F2] p-4 rounded-2xl border border-[#E6E2DE] space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  mat.category === 'Audio Sermon' ? 'bg-[#5A5A40] text-white' : 'bg-[#A68B67] text-white'
                                }`}>
                                  {mat.category} • {mat.language}
                                </span>
                                <h5 className="font-bold text-[#2D2D2D] text-sm mt-1">{mat.title}</h5>
                                <div className="text-xs text-[#6B635B]">Preacher: {mat.author}</div>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => setEditingMaterial(mat)}
                                  className="p-1.5 rounded-lg bg-white text-[#5A5A40] hover:bg-[#F1ECE7] border border-[#E6E2DE]"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                {hasPermission('delete') && (
                                  <button
                                    onClick={async () => {
                                      if (confirm(`Drop / Delete '${mat.title}'?`)) {
                                        await deleteMaterial(mat.id);
                                        onStateUpdated({ ...appState, materials: appState.materials.filter(m => m.id !== mat.id) });
                                      }
                                    }}
                                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>

                            {mat.category === 'Audio Sermon' && mat.downloadUrl && (
                              <audio controls src={mat.downloadUrl} className="w-full h-8 accent-[#5A5A40]" />
                            )}

                            {mat.category === 'Video Message' && mat.downloadUrl && (
                              mat.downloadUrl.includes('youtube') ? (
                                <iframe src={mat.downloadUrl.replace('watch?v=', 'embed/')} className="w-full aspect-video rounded-xl" title={mat.title} />
                              ) : (
                                <video controls src={mat.downloadUrl} className="w-full max-h-40 rounded-xl" />
                              )
                            )}

                            <p className="text-xs text-[#6B635B] line-clamp-2">{mat.description}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: GOSPEL LITERATURE (TRACTS, JOURNALS, BOOKS) */}
              {activeTab === 'literature' && (
                <div className="space-y-6">
                  <div className="bg-[#F8F5F2] p-6 rounded-2xl border border-[#E6E2DE] space-y-4">
                    <h4 className="font-bold text-[#2D2D2D] text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#A68B67]" /> Upload Gospel Tract, Book, Journal or Article</span>
                      {editingMaterial && (
                        <button onClick={() => setEditingMaterial(null)} className="text-xs text-[#5A5A40] underline font-normal">
                          Clear Form
                        </button>
                      )}
                    </h4>

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (!editingMaterial?.title) return;
                        const saved = await saveMaterial({
                          ...editingMaterial,
                          category: editingMaterial.category || 'Tract',
                          fileType: editingMaterial.fileType || 'PDF',
                          downloadUrl: editingMaterial.downloadUrl || '#'
                        } as any);
                        onStateUpdated({
                          ...appState,
                          materials: [saved, ...appState.materials.filter(m => m.id !== saved.id)]
                        });
                        setEditingMaterial(null);
                        alert("Gospel Literature saved!");
                      }}
                      className="space-y-3 text-xs"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[#6B635B] font-bold mb-1">Type of Literature</label>
                          <select
                            value={editingMaterial?.category || 'Tract'}
                            onChange={(e) => setEditingMaterial({ ...editingMaterial, category: e.target.value as any })}
                            className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                          >
                            <option value="Tract">Gospel Tract</option>
                            <option value="Book">Mission Book</option>
                            <option value="Journal">GGMI Journal</option>
                            <option value="Article">Spiritual Article</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[#6B635B] font-bold mb-1">Language</label>
                          <select
                            value={editingMaterial?.language || 'Tiv'}
                            onChange={(e) => setEditingMaterial({ ...editingMaterial, language: e.target.value as any })}
                            className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                          >
                            <option value="Tiv">Tiv Language</option>
                            <option value="English">English Language</option>
                            <option value="Both">Bilingual (English & Tiv)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[#6B635B] font-bold mb-1">File Format</label>
                          <select
                            value={editingMaterial?.fileType || 'PDF'}
                            onChange={(e) => setEditingMaterial({ ...editingMaterial, fileType: e.target.value as any })}
                            className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                          >
                            <option value="PDF">PDF Document</option>
                            <option value="EPUB">EPUB Reader</option>
                            <option value="JPG">JPG Leaflet</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Literature Title (e.g. Msen Sha Ci u Myom u Uma Wou) *"
                          value={editingMaterial?.title || ''}
                          onChange={(e) => setEditingMaterial({ ...editingMaterial, title: e.target.value })}
                          className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        />
                        <input
                          type="text"
                          placeholder="Author / Publisher (e.g. GGMI Evangelism Department)"
                          value={editingMaterial?.author || ''}
                          onChange={(e) => setEditingMaterial({ ...editingMaterial, author: e.target.value })}
                          className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        />
                      </div>

                      {/* File Upload for Document */}
                      <FileUploader
                        label="Literature PDF / Document File *"
                        accept=".pdf,.epub,.doc,.docx,image/*"
                        value={editingMaterial?.downloadUrl || ''}
                        onChange={(url, name, size) => setEditingMaterial({
                          ...editingMaterial,
                          downloadUrl: url,
                          fileSize: size || editingMaterial?.fileSize || '2.5 MB'
                        })}
                        placeholder="Upload PDF document or enter download link..."
                        type="pdf"
                      />

                      <FileUploader
                        label="Literature Cover Image (Optional)"
                        accept="image/*"
                        value={editingMaterial?.coverImage || ''}
                        onChange={(url) => setEditingMaterial({ ...editingMaterial, coverImage: url })}
                        placeholder="Upload cover image photo..."
                        type="image"
                      />

                      <textarea
                        rows={3}
                        placeholder="Summary of gospel tract or book description..."
                        value={editingMaterial?.description || ''}
                        onChange={(e) => setEditingMaterial({ ...editingMaterial, description: e.target.value })}
                        className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                      />

                      <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#5A5A40] font-bold text-white text-xs shadow-xs flex items-center gap-2">
                        <Upload className="w-4 h-4 text-[#A68B67]" /> Upload Gospel Literature
                      </button>
                    </form>
                  </div>

                  {/* List of Literature */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-[#2D2D2D] text-xs uppercase tracking-wider">Literature & Tracts Library</h4>
                      <select
                        value={litFilter}
                        onChange={(e) => setLitFilter(e.target.value)}
                        className="bg-[#F8F5F2] border border-[#E6E2DE] rounded-xl px-3 py-1.5 text-xs text-[#5A5A40] font-bold"
                      >
                        <option value="All">All Literature Types</option>
                        <option value="Tract">Tracts</option>
                        <option value="Book">Books</option>
                        <option value="Journal">Journals</option>
                        <option value="Article">Articles</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {appState.materials
                        .filter(m => m.category !== 'Audio Sermon' && m.category !== 'Video Message')
                        .filter(m => litFilter === 'All' || m.category === litFilter)
                        .map((lit) => (
                          <div key={lit.id} className="bg-[#F8F5F2] p-4 rounded-2xl border border-[#E6E2DE] space-y-3 flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#5A5A40] text-white">
                                  {lit.category} • {lit.language}
                                </span>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => setEditingMaterial(lit)}
                                    className="p-1 rounded bg-white text-[#5A5A40] border border-[#E6E2DE]"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  {hasPermission('delete') && (
                                    <button
                                      onClick={async () => {
                                        if (confirm(`Drop / Delete '${lit.title}'?`)) {
                                          await deleteMaterial(lit.id);
                                          onStateUpdated({ ...appState, materials: appState.materials.filter(m => m.id !== lit.id) });
                                        }
                                      }}
                                      className="p-1 rounded bg-red-50 text-red-600 border border-red-200"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </div>

                              <h5 className="font-bold text-[#2D2D2D] text-sm">{lit.title}</h5>
                              <p className="text-xs text-[#6B635B] line-clamp-2">{lit.description}</p>
                            </div>

                            <div className="pt-2 border-t border-[#E6E2DE] flex justify-between items-center text-[10px] text-[#8C8279]">
                              <span>Format: {lit.fileType} ({lit.fileSize})</span>
                              <span>Downloads: {lit.downloadsCount}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: OUTREACH REPORTS & IMPACT STATISTICS */}
              {activeTab === 'outreach' && (
                <div className="space-y-6">
                  <div className="bg-[#F8F5F2] p-6 rounded-2xl border border-[#E6E2DE] space-y-4">
                    <h4 className="font-bold text-[#2D2D2D] text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[#A68B67]" /> Upload Outreach Report & Impact Statistics</span>
                      {editingOutreach && (
                        <button onClick={() => setEditingOutreach(null)} className="text-xs text-[#5A5A40] underline font-normal">
                          Clear Form
                        </button>
                      )}
                    </h4>

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (!editingOutreach?.title || !editingOutreach?.location) return;
                        const saved = await saveOutreachReport({
                          ...editingOutreach,
                          soulsReached: Number(editingOutreach.soulsReached || 0),
                          conversions: Number(editingOutreach.conversions || 0),
                          medicalSupportProvided: Number(editingOutreach.medicalSupportProvided || 0),
                          biblesDistributed: Number(editingOutreach.biblesDistributed || 0),
                          fieldTestimonials: editingOutreach.fieldTestimonials || [],
                          galleryImages: editingOutreach.galleryImages || []
                        } as any);
                        onStateUpdated({
                          ...appState,
                          outreachReports: [saved, ...appState.outreachReports.filter(r => r.id !== saved.id)]
                        });
                        setEditingOutreach(null);
                        alert("Outreach Report & Impact Statistics saved!");
                      }}
                      className="space-y-3 text-xs"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Outreach Title (e.g. Logo LGA Rural Mission) *"
                          value={editingOutreach?.title || ''}
                          onChange={(e) => setEditingOutreach({ ...editingOutreach, title: e.target.value })}
                          className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Location / Zone *"
                          value={editingOutreach?.location || ''}
                          onChange={(e) => setEditingOutreach({ ...editingOutreach, location: e.target.value })}
                          className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        />
                        <input
                          type="text"
                          placeholder="Period (e.g. June 2026)"
                          value={editingOutreach?.period || ''}
                          onChange={(e) => setEditingOutreach({ ...editingOutreach, period: e.target.value })}
                          className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        />
                      </div>

                      {/* Impact Statistics */}
                      <div className="bg-white p-3.5 rounded-xl border border-[#E6E2DE] space-y-2">
                        <div className="text-[10px] font-bold uppercase text-[#A68B67]">Impact Statistics Breakdown</div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-[10px] text-[#6B635B] mb-0.5">Souls Reached</label>
                            <input
                              type="number"
                              placeholder="0"
                              value={editingOutreach?.soulsReached || ''}
                              onChange={(e) => setEditingOutreach({ ...editingOutreach, soulsReached: Number(e.target.value) })}
                              className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded p-1.5 text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-[#6B635B] mb-0.5">Conversions / Decisions</label>
                            <input
                              type="number"
                              placeholder="0"
                              value={editingOutreach?.conversions || ''}
                              onChange={(e) => setEditingOutreach({ ...editingOutreach, conversions: Number(e.target.value) })}
                              className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded p-1.5 text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-[#6B635B] mb-0.5">Free Medical Care</label>
                            <input
                              type="number"
                              placeholder="0"
                              value={editingOutreach?.medicalSupportProvided || ''}
                              onChange={(e) => setEditingOutreach({ ...editingOutreach, medicalSupportProvided: Number(e.target.value) })}
                              className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded p-1.5 text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-[#6B635B] mb-0.5">Bibles & Tracts Given</label>
                            <input
                              type="number"
                              placeholder="0"
                              value={editingOutreach?.biblesDistributed || ''}
                              onChange={(e) => setEditingOutreach({ ...editingOutreach, biblesDistributed: Number(e.target.value) })}
                              className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded p-1.5 text-xs font-bold"
                            />
                          </div>
                        </div>
                      </div>

                      <FileUploader
                        label="Primary Outreach Photo / Banner *"
                        accept="image/*"
                        value={editingOutreach?.galleryImages?.[0] || ''}
                        onChange={(url) => setEditingOutreach({
                          ...editingOutreach,
                          galleryImages: url ? [url, ...(editingOutreach?.galleryImages?.slice(1) || [])] : []
                        })}
                        placeholder="Upload outreach field photo..."
                        type="image"
                      />

                      <textarea
                        rows={3}
                        required
                        placeholder="Outreach summary and field report details *"
                        value={editingOutreach?.summary || ''}
                        onChange={(e) => setEditingOutreach({ ...editingOutreach, summary: e.target.value })}
                        className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                      />

                      <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#5A5A40] font-bold text-white text-xs shadow-xs flex items-center gap-2">
                        <Upload className="w-4 h-4 text-[#A68B67]" /> Save Outreach Report & Stats
                      </button>
                    </form>
                  </div>

                  {/* Outreach List */}
                  <div className="space-y-4">
                    {appState.outreachReports.map((rep) => (
                      <div key={rep.id} className="bg-[#F8F5F2] p-5 rounded-2xl border border-[#E6E2DE] space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-bold text-[#2D2D2D] text-base">{rep.title}</h5>
                            <div className="text-xs text-[#6B635B]">Location: {rep.location} • {rep.period}</div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setEditingOutreach(rep)}
                              className="p-1.5 rounded-lg bg-white text-[#5A5A40] border border-[#E6E2DE]"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            {hasPermission('delete') && (
                              <button
                                onClick={async () => {
                                  if (confirm(`Drop / Delete outreach report '${rep.title}'?`)) {
                                    await deleteOutreachReport(rep.id);
                                    onStateUpdated({ ...appState, outreachReports: appState.outreachReports.filter(r => r.id !== rep.id) });
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2 bg-white p-3 rounded-xl border border-[#E6E2DE] text-center">
                          <div>
                            <div className="text-xs font-bold text-[#5A5A40]">{rep.soulsReached}</div>
                            <div className="text-[9px] uppercase text-[#6B635B]">Souls</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#5A5A40]">{rep.conversions}</div>
                            <div className="text-[9px] uppercase text-[#6B635B]">Conversions</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#5A5A40]">{rep.medicalSupportProvided}</div>
                            <div className="text-[9px] uppercase text-[#6B635B]">Medical Patients</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#5A5A40]">{rep.biblesDistributed}</div>
                            <div className="text-[9px] uppercase text-[#6B635B]">Bibles</div>
                          </div>
                        </div>

                        <p className="text-xs text-[#6B635B]">{rep.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: PHOTO GALLERY MANAGEMENT */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="bg-[#F8F5F2] p-6 rounded-2xl border border-[#E6E2DE] space-y-4">
                    <h4 className="font-bold text-[#2D2D2D] text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2"><ImageIcon className="w-4 h-4 text-[#A68B67]" /> Upload Photo to Gallery</span>
                      {editingGallery && (
                        <button onClick={() => setEditingGallery(null)} className="text-xs text-[#5A5A40] underline font-normal">
                          Clear Form
                        </button>
                      )}
                    </h4>

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (!editingGallery?.title || !editingGallery?.imageUrl) {
                          alert("Title and Photo file are required.");
                          return;
                        }
                        const saved = await saveGalleryPhoto(editingGallery);
                        onStateUpdated({
                          ...appState,
                          galleryPhotos: [saved, ...galleryPhotos.filter(g => g.id !== saved.id)]
                        });
                        setEditingGallery(null);
                        alert("Gallery Photo uploaded!");
                      }}
                      className="space-y-3 text-xs"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Photo Title *"
                          value={editingGallery?.title || ''}
                          onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                          className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        />
                        <div>
                          <select
                            value={editingGallery?.category || 'Outreach'}
                            onChange={(e) => setEditingGallery({ ...editingGallery, category: e.target.value as any })}
                            className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                          >
                            <option value="Outreach">Outreach</option>
                            <option value="Conference">Conference</option>
                            <option value="Medical Mission">Medical Mission</option>
                            <option value="Leadership">Leadership</option>
                            <option value="Community">Community</option>
                            <option value="General">General</option>
                          </select>
                        </div>
                      </div>

                      <FileUploader
                        label="Photo File Upload *"
                        accept="image/*"
                        value={editingGallery?.imageUrl || ''}
                        onChange={(url) => setEditingGallery({ ...editingGallery, imageUrl: url })}
                        placeholder="Upload photo file or paste image URL..."
                        type="image"
                      />

                      <textarea
                        rows={2}
                        placeholder="Caption / photo description..."
                        value={editingGallery?.caption || ''}
                        onChange={(e) => setEditingGallery({ ...editingGallery, caption: e.target.value })}
                        className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                      />

                      <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#5A5A40] font-bold text-white text-xs shadow-xs flex items-center gap-2">
                        <Upload className="w-4 h-4 text-[#A68B67]" /> Upload Photo to Gallery
                      </button>
                    </form>
                  </div>

                  {/* Photo Gallery Grid */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-[#2D2D2D] text-xs uppercase tracking-wider">Gallery Album ({galleryPhotos.length})</h4>
                      <select
                        value={galleryFilter}
                        onChange={(e) => setGalleryFilter(e.target.value)}
                        className="bg-[#F8F5F2] border border-[#E6E2DE] rounded-xl px-3 py-1 text-xs text-[#5A5A40] font-bold"
                      >
                        <option value="All">All Categories</option>
                        <option value="Outreach">Outreach</option>
                        <option value="Conference">Conference</option>
                        <option value="Medical Mission">Medical Mission</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {galleryPhotos
                        .filter(g => galleryFilter === 'All' || g.category === galleryFilter)
                        .map((photo) => (
                          <div key={photo.id} className="bg-[#F8F5F2] rounded-2xl border border-[#E6E2DE] overflow-hidden group space-y-2 p-2">
                            <div className="aspect-square rounded-xl overflow-hidden bg-stone-200 relative">
                              <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                              {hasPermission('delete') && (
                                <button
                                  onClick={async () => {
                                    if (confirm(`Drop / Delete photo '${photo.title}'?`)) {
                                      await deleteGalleryPhoto(photo.id);
                                      onStateUpdated({ ...appState, galleryPhotos: galleryPhotos.filter(g => g.id !== photo.id) });
                                    }
                                  }}
                                  className="absolute top-1.5 right-1.5 p-1 bg-red-600/90 hover:bg-red-700 text-white rounded-full text-[10px]"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                            <div className="px-1">
                              <span className="text-[9px] font-bold uppercase text-[#A68B67]">{photo.category}</span>
                              <h5 className="font-bold text-[#2D2D2D] text-xs truncate">{photo.title}</h5>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: LATEST NEWS & TICKERS */}
              {activeTab === 'news' && (
                <div className="space-y-6">
                  <div className="bg-[#F8F5F2] p-6 rounded-2xl border border-[#E6E2DE] space-y-4">
                    <h4 className="font-bold text-[#2D2D2D] text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2"><Radio className="w-4 h-4 text-[#A68B67]" /> Post News Item or Urgent Ticker Alert</span>
                      {editingNews && (
                        <button onClick={() => setEditingNews(null)} className="text-xs text-[#5A5A40] underline font-normal">
                          Clear Form
                        </button>
                      )}
                    </h4>

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (!editingNews?.title || !editingNews?.snippet) return;
                        const saved = await saveNews(editingNews);
                        onStateUpdated({
                          ...appState,
                          newsItems: [saved, ...appState.newsItems.filter(n => n.id !== saved.id)]
                        });
                        setEditingNews(null);
                        alert("News Item saved!");
                      }}
                      className="space-y-3 text-xs"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="English News Title *"
                          value={editingNews?.title || ''}
                          onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                          className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        />
                        <input
                          type="text"
                          placeholder="Tiv News Title (Optional)"
                          value={editingNews?.tivTitle || ''}
                          onChange={(e) => setEditingNews({ ...editingNews, tivTitle: e.target.value })}
                          className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                        <div>
                          <label className="block text-[#6B635B] font-bold mb-1">Category</label>
                          <select
                            value={editingNews?.category || 'General'}
                            onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value as any })}
                            className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                          >
                            <option value="Outreach">Outreach</option>
                            <option value="Conference">Conference</option>
                            <option value="General">General News</option>
                            <option value="Urgent Prayer">Urgent Prayer</option>
                          </select>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer pt-4">
                          <input
                            type="checkbox"
                            checked={editingNews?.isTicker || false}
                            onChange={(e) => setEditingNews({ ...editingNews, isTicker: e.target.checked })}
                            className="w-4 h-4 accent-[#5A5A40]"
                          />
                          <span className="font-bold text-[#2D2D2D]">Display on Top Announcement Ticker</span>
                        </label>
                      </div>

                      <textarea
                        rows={2}
                        required
                        placeholder="Short Snippet / Headline *"
                        value={editingNews?.snippet || ''}
                        onChange={(e) => setEditingNews({ ...editingNews, snippet: e.target.value })}
                        className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                      />

                      <textarea
                        rows={3}
                        placeholder="Full Article Content..."
                        value={editingNews?.content || ''}
                        onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                        className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                      />

                      <FileUploader
                        label="Featured News Photo (Optional)"
                        accept="image/*"
                        value={editingNews?.imageUrl || ''}
                        onChange={(url) => setEditingNews({ ...editingNews, imageUrl: url })}
                        placeholder="Upload image photo or URL..."
                        type="image"
                      />

                      <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#5A5A40] font-bold text-white text-xs shadow-xs flex items-center gap-2">
                        <Upload className="w-4 h-4 text-[#A68B67]" /> Save News / Ticker Item
                      </button>
                    </form>
                  </div>

                  {/* News List */}
                  <div className="space-y-3">
                    {appState.newsItems.map((news) => (
                      <div key={news.id} className="bg-[#F8F5F2] p-4 rounded-2xl border border-[#E6E2DE] flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#5A5A40] text-white uppercase">
                              {news.category}
                            </span>
                            {news.isTicker && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white">
                                TICKER ACTIVE
                              </span>
                            )}
                            <span className="text-[10px] text-[#8C8279]">{news.date}</span>
                          </div>
                          <h5 className="font-bold text-[#2D2D2D] text-sm">{news.title}</h5>
                          <p className="text-xs text-[#6B635B]">{news.snippet}</p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button onClick={() => setEditingNews(news)} className="p-1.5 rounded-lg bg-white border border-[#E6E2DE]">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          {hasPermission('delete') && (
                            <button
                              onClick={async () => {
                                if (confirm(`Drop news '${news.title}'?`)) {
                                  await deleteNews(news.id);
                                  onStateUpdated({ ...appState, newsItems: appState.newsItems.filter(n => n.id !== news.id) });
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: DAILY DEVOTIONALS MANAGEMENT */}
              {activeTab === 'devotionals' && (
                <div className="space-y-6">
                  <div className="bg-[#F8F5F2] p-6 rounded-2xl border border-[#E6E2DE] space-y-4">
                    <h4 className="font-bold text-[#2D2D2D] text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#A68B67]" /> Post Daily Devotional Exhortation</span>
                      {editingDevotional && (
                        <button onClick={() => setEditingDevotional(null)} className="text-xs text-[#5A5A40] underline font-normal">
                          Clear Form
                        </button>
                      )}
                    </h4>

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (!editingDevotional?.title || !editingDevotional?.bodyText) return;
                        const saved = await saveDevotional(editingDevotional);
                        onStateUpdated({
                          ...appState,
                          devotionals: [saved, ...appState.devotionals.filter(d => d.id !== saved.id)]
                        });
                        setEditingDevotional(null);
                        alert("Devotional saved!");
                      }}
                      className="space-y-3 text-xs"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Devotional Title (English) *"
                          value={editingDevotional?.title || ''}
                          onChange={(e) => setEditingDevotional({ ...editingDevotional, title: e.target.value })}
                          className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        />
                        <input
                          type="text"
                          placeholder="Itine M-nger (Tiv Title)"
                          value={editingDevotional?.tivTitle || ''}
                          onChange={(e) => setEditingDevotional({ ...editingDevotional, tivTitle: e.target.value })}
                          className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Scripture Ref (e.g. Matthew 28:18-20)"
                          value={editingDevotional?.scriptureRef || ''}
                          onChange={(e) => setEditingDevotional({ ...editingDevotional, scriptureRef: e.target.value })}
                          className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        />
                        <input
                          type="text"
                          placeholder="Theme (e.g. World Evangelism)"
                          value={editingDevotional?.theme || ''}
                          onChange={(e) => setEditingDevotional({ ...editingDevotional, theme: e.target.value })}
                          className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        />
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Scripture Text (English)..."
                        value={editingDevotional?.scriptureText || ''}
                        onChange={(e) => setEditingDevotional({ ...editingDevotional, scriptureText: e.target.value })}
                        className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                      />

                      <textarea
                        rows={4}
                        required
                        placeholder="Full Exhortation Body Text (English) *"
                        value={editingDevotional?.bodyText || ''}
                        onChange={(e) => setEditingDevotional({ ...editingDevotional, bodyText: e.target.value })}
                        className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                      />

                      {/* Tiv Translation Fields */}
                      <div className="bg-white p-3.5 rounded-xl border border-[#E6E2DE] space-y-2">
                        <div className="text-[10px] uppercase font-bold text-[#A68B67]">Tiv Language Translations (Optional)</div>
                        <textarea
                          rows={2}
                          placeholder="Avur Bibilo sha Zwa Tiv..."
                          value={editingDevotional?.tivScriptureText || ''}
                          onChange={(e) => setEditingDevotional({ ...editingDevotional, tivScriptureText: e.target.value })}
                          className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded p-2 text-xs"
                        />
                        <textarea
                          rows={3}
                          placeholder="M-nger u Aond Oron sha Zwa Tiv..."
                          value={editingDevotional?.tivBodyText || ''}
                          onChange={(e) => setEditingDevotional({ ...editingDevotional, tivBodyText: e.target.value })}
                          className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded p-2 text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Key Takeaway"
                          value={editingDevotional?.keyTakeaway || ''}
                          onChange={(e) => setEditingDevotional({ ...editingDevotional, keyTakeaway: e.target.value })}
                          className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        />
                        <input
                          type="text"
                          placeholder="Today's Prayer Point"
                          value={editingDevotional?.prayerPoint || ''}
                          onChange={(e) => setEditingDevotional({ ...editingDevotional, prayerPoint: e.target.value })}
                          className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        />
                      </div>

                      <FileUploader
                        label="Devotional Audio Exhortation MP3 (Optional)"
                        accept="audio/*"
                        value={editingDevotional?.audioUrl || ''}
                        onChange={(url) => setEditingDevotional({ ...editingDevotional, audioUrl: url })}
                        placeholder="Upload audio file or link..."
                        type="audio"
                      />

                      <input
                        type="text"
                        placeholder="Author Name (e.g. Prof. Daniel Vershima Uza)"
                        value={editingDevotional?.author || ''}
                        onChange={(e) => setEditingDevotional({ ...editingDevotional, author: e.target.value })}
                        className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                      />

                      <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#5A5A40] font-bold text-white text-xs shadow-xs flex items-center gap-2">
                        <Upload className="w-4 h-4 text-[#A68B67]" /> Save Devotional
                      </button>
                    </form>
                  </div>

                  {/* Devotional List */}
                  <div className="space-y-3">
                    {appState.devotionals.map((dev) => (
                      <div key={dev.id} className="bg-[#F8F5F2] p-4 rounded-2xl border border-[#E6E2DE] flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-[#A68B67] font-bold">{dev.date} • {dev.scriptureRef}</span>
                          <h5 className="font-bold text-[#2D2D2D] text-sm">{dev.title}</h5>
                          <p className="text-xs text-[#6B635B] line-clamp-2">{dev.bodyText}</p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button onClick={() => setEditingDevotional(dev)} className="p-1.5 rounded-lg bg-white border border-[#E6E2DE]">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          {hasPermission('delete') && (
                            <button
                              onClick={async () => {
                                if (confirm(`Drop devotional '${dev.title}'?`)) {
                                  await deleteDevotional(dev.id);
                                  onStateUpdated({ ...appState, devotionals: appState.devotionals.filter(d => d.id !== dev.id) });
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: MEMBERS DATABASE */}
              {activeTab === 'members' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="w-4 h-4 text-[#8C8279] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search members..."
                        value={memberSearch}
                        onChange={(e) => setMemberSearch(e.target.value)}
                        className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-xl pl-9 pr-3 py-2 text-xs text-[#2D2D2D]"
                      />
                    </div>

                    <button
                      onClick={() => exportToCSV('GGMI_Registered_Members', appState.members)}
                      className="px-4 py-2 rounded-xl bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold flex items-center gap-2 shadow-xs"
                    >
                      <Download className="w-4 h-4" /> Export Members CSV
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-[#E6E2DE] bg-white">
                    <table className="w-full text-left text-xs text-[#2D2D2D]">
                      <thead className="bg-[#F1ECE7] text-[#5A5A40] font-bold uppercase text-[10px] border-b border-[#E6E2DE]">
                        <tr>
                          <th className="p-3">Member ID</th>
                          <th className="p-3">Full Name</th>
                          <th className="p-3">Sex / Age</th>
                          <th className="p-3">Zone / Chapter</th>
                          <th className="p-3">Phone</th>
                          <th className="p-3">Marital</th>
                          <th className="p-3">Born-Again</th>
                          {hasPermission('delete') && <th className="p-3">Actions</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E6E2DE]">
                        {appState.members
                          .filter(m => `${m.firstName} ${m.lastName} ${m.phone} ${m.zone}`.toLowerCase().includes(memberSearch.toLowerCase()))
                          .map((m) => (
                            <tr key={m.id} className="hover:bg-[#F8F5F2]">
                              <td className="p-3 font-mono font-bold text-[#A68B67]">{m.membershipId}</td>
                              <td className="p-3 font-bold text-[#2D2D2D]">{m.firstName} {m.lastName}</td>
                              <td className="p-3">{m.sex}, {m.age}</td>
                              <td className="p-3">{m.zone}</td>
                              <td className="p-3">{m.phone}</td>
                              <td className="p-3">{m.maritalStatus}</td>
                              <td className="p-3">{m.bornAgainStatus}</td>
                              {hasPermission('delete') && (
                                <td className="p-3">
                                  <button
                                    onClick={async () => {
                                      if (confirm('Drop member record?')) {
                                        await deleteMember(m.id);
                                        onStateUpdated({ ...appState, members: appState.members.filter(x => x.id !== m.id) });
                                      }
                                    }}
                                    className="p-1 rounded bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB: CONFERENCE REGISTRATIONS */}
              {activeTab === 'conference' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="w-4 h-4 text-[#8C8279] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search delegates..."
                          value={confSearch}
                          onChange={(e) => setConfSearch(e.target.value)}
                          className="bg-[#F8F5F2] border border-[#E6E2DE] rounded-xl pl-9 pr-3 py-2 text-xs text-[#2D2D2D]"
                        />
                      </div>

                      <select
                        value={confClassFilter}
                        onChange={(e) => setConfClassFilter(e.target.value as any)}
                        className="bg-[#F8F5F2] border border-[#E6E2DE] rounded-xl px-3 py-2 text-xs text-[#5A5A40] font-bold"
                      >
                        <option value="All">All Study Classes</option>
                        <option value="Tiv">Tiv Study Class</option>
                        <option value="English">English Study Class</option>
                      </select>
                    </div>

                    <button
                      onClick={() => exportToCSV('GGMI_Conference_Delegates', appState.conferenceRegistrations)}
                      className="px-4 py-2 rounded-xl bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold flex items-center gap-2 shadow-xs"
                    >
                      <Download className="w-4 h-4" /> Export Delegates CSV
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-[#E6E2DE] bg-white">
                    <table className="w-full text-left text-xs text-[#2D2D2D]">
                      <thead className="bg-[#F1ECE7] text-[#5A5A40] font-bold uppercase text-[10px] border-b border-[#E6E2DE]">
                        <tr>
                          <th className="p-3">Pass Code</th>
                          <th className="p-3">Full Name</th>
                          <th className="p-3">Study Class</th>
                          <th className="p-3">Accommodation</th>
                          <th className="p-3">Zone</th>
                          <th className="p-3">Phone</th>
                          {hasPermission('delete') && <th className="p-3">Actions</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E6E2DE]">
                        {appState.conferenceRegistrations
                          .filter(c => confClassFilter === 'All' || c.preferredStudyClass === confClassFilter)
                          .filter(c => `${c.fullName} ${c.phone} ${c.zone}`.toLowerCase().includes(confSearch.toLowerCase()))
                          .map((c) => (
                            <tr key={c.id} className="hover:bg-[#F8F5F2]">
                              <td className="p-3 font-mono font-bold text-[#A68B67]">{c.registrationCode}</td>
                              <td className="p-3 font-bold text-[#2D2D2D]">{c.fullName}</td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F1ECE7] text-[#5A5A40]">
                                  {c.preferredStudyClass} Class
                                </span>
                              </td>
                              <td className="p-3">{c.accommodationNeeds}</td>
                              <td className="p-3">{c.zone}</td>
                              <td className="p-3">{c.phone}</td>
                              {hasPermission('delete') && (
                                <td className="p-3">
                                  <button
                                    onClick={async () => {
                                      if (confirm('Drop delegate registration?')) {
                                        await deleteConferenceRegistration(c.id);
                                        onStateUpdated({ ...appState, conferenceRegistrations: appState.conferenceRegistrations.filter(x => x.id !== c.id) });
                                      }
                                    }}
                                    className="p-1 rounded bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB: VIRTUAL MEETING LINKS */}
              {activeTab === 'virtualLinks' && (
                <div className="bg-[#F8F5F2] p-6 rounded-2xl border border-[#E6E2DE] space-y-4 max-w-xl">
                  <h4 className="font-bold text-[#2D2D2D] text-sm flex items-center gap-2">
                    <Tv className="w-4 h-4 text-[#A68B67]" /> Update Zoom, Teams & Stream Links
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[#6B635B] font-bold mb-1">Zoom Meeting Link</label>
                      <input
                        type="text"
                        value={zoomLink}
                        onChange={(e) => setZoomLink(e.target.value)}
                        className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#6B635B] font-bold mb-1">Microsoft Teams Meeting Link</label>
                      <input
                        type="text"
                        value={teamsLink}
                        onChange={(e) => setTeamsLink(e.target.value)}
                        className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#6B635B] font-bold mb-1">YouTube Live Stream Embed URL</label>
                      <input
                        type="text"
                        value={youtubeLive}
                        onChange={(e) => setYoutubeLive(e.target.value)}
                        className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#6B635B] font-bold mb-1">Facebook Live Broadcast Link</label>
                      <input
                        type="text"
                        value={facebookLive}
                        onChange={(e) => setFacebookLive(e.target.value)}
                        className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveVirtualLinks}
                      className="px-5 py-2 rounded-xl bg-[#5A5A40] font-bold text-white text-xs shadow-xs"
                    >
                      Update Broadcast Links
                    </button>
                  </div>
                </div>
              )}

              {/* TAB: DONATION LOGS */}
              {activeTab === 'donations' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-[#2D2D2D] text-sm">Donation & Partnership Records</h4>
                    <button
                      onClick={() => exportToCSV('GGMI_Donation_Records', appState.donations)}
                      className="px-3 py-1.5 rounded-xl bg-[#5A5A40] text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" /> Export CSV
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-[#E6E2DE] bg-white">
                    <table className="w-full text-left text-xs text-[#2D2D2D]">
                      <thead className="bg-[#F1ECE7] text-[#5A5A40] font-bold uppercase text-[10px]">
                        <tr>
                          <th className="p-3">Reference</th>
                          <th className="p-3">Donor Name</th>
                          <th className="p-3">Amount</th>
                          <th className="p-3">Designation</th>
                          <th className="p-3">Method</th>
                          <th className="p-3">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E6E2DE]">
                        {appState.donations.map((d) => (
                          <tr key={d.id} className="hover:bg-[#F8F5F2]">
                            <td className="p-3 font-mono font-bold text-[#A68B67]">{d.reference}</td>
                            <td className="p-3 font-bold text-[#2D2D2D]">{d.donorName}</td>
                            <td className="p-3 text-[#5A5A40] font-bold">{d.currency === 'NGN' ? '₦' : '$'}{d.amount.toLocaleString()}</td>
                            <td className="p-3">{d.designation}</td>
                            <td className="p-3">{d.paymentMethod}</td>
                            <td className="p-3">{d.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB: SUB ADMINS MANAGER */}
              {activeTab === 'admins' && currentUser.role === 'Super Admin' && (
                <div className="space-y-6 max-w-xl">
                  <div className="bg-[#F8F5F2] p-6 rounded-2xl border border-[#E6E2DE] space-y-4">
                    <h4 className="font-bold text-[#2D2D2D] text-sm">Create New Sub-Admin Account</h4>

                    <form onSubmit={handleCreateSubAdmin} className="space-y-3 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Sub Admin Username *"
                          value={newAdmin.username || ''}
                          onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                          className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Email Address *"
                          value={newAdmin.email || ''}
                          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                          className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#6B635B] font-bold mb-1">Privilege Level</label>
                        <select
                          value={newAdmin.role}
                          onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value as any })}
                          className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D]"
                        >
                          <option value="Sub Admin">Sub Admin (Upload/Post/Edit)</option>
                          <option value="Field Reporter">Field Reporter (Upload/Post)</option>
                        </select>
                      </div>

                      <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#5A5A40] font-bold text-white text-xs shadow-xs">
                        Create Sub Admin Account
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB: LEADERSHIP MANAGER */}
              {activeTab === 'leadership' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-[#2D2D2D] text-sm sm:text-base">Leadership & Board of Trustees</h4>
                      <p className="text-xs text-[#6B635B]">Manage executive team profiles, names, titles, and photos shown on the website.</p>
                    </div>

                    {!editingLeader && (
                      <button
                        onClick={() => setEditingLeader({ name: '', role: '', bio: '', imageUrl: '', order: (appState.leaders || []).length + 1 })}
                        className="px-4 py-2 rounded-xl bg-[#5A5A40] text-white font-bold text-xs flex items-center gap-2 hover:bg-[#484833] transition-colors"
                      >
                        <Plus className="w-4 h-4" /> Add New Leader
                      </button>
                    )}
                  </div>

                  {/* EDIT/CREATE LEADER FORM */}
                  {editingLeader && (
                    <div className="bg-[#F8F5F2] p-6 rounded-2xl border border-[#E6E2DE] space-y-4">
                      <div className="flex justify-between items-center border-b border-[#E6E2DE] pb-3">
                        <h5 className="font-bold text-[#2D2D2D] text-sm">
                          {editingLeader.id ? 'Edit Leadership Profile' : 'Add New Leader Profile'}
                        </h5>
                        <button
                          onClick={() => setEditingLeader(null)}
                          className="p-1 rounded text-[#8C8279] hover:text-[#2D2D2D]"
                        >
                          ✕
                        </button>
                      </div>

                      <form onSubmit={handleSaveLeader} className="space-y-4 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[#6B635B] font-bold mb-1">Full Name & Title *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Prof. Daniel Vershima Uza"
                              value={editingLeader.name || ''}
                              onChange={(e) => setEditingLeader({ ...editingLeader, name: e.target.value })}
                              className="w-full bg-white border border-[#E6E2DE] rounded-xl p-2.5 text-[#2D2D2D]"
                            />
                          </div>

                          <div>
                            <label className="block text-[#6B635B] font-bold mb-1">Official Executive Role *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. President & Chairman, Board of Trustees"
                              value={editingLeader.role || ''}
                              onChange={(e) => setEditingLeader({ ...editingLeader, role: e.target.value })}
                              className="w-full bg-white border border-[#E6E2DE] rounded-xl p-2.5 text-[#2D2D2D]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[#6B635B] font-bold mb-1">Biography & Ministry Focus</label>
                          <textarea
                            rows={3}
                            placeholder="Brief biography outlining ministry experience, missionary field oversight..."
                            value={editingLeader.bio || ''}
                            onChange={(e) => setEditingLeader({ ...editingLeader, bio: e.target.value })}
                            className="w-full bg-white border border-[#E6E2DE] rounded-xl p-2.5 text-[#2D2D2D]"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FileUploader
                            label="Leader Profile Photo"
                            accept="image/*"
                            value={editingLeader.imageUrl}
                            onChange={(url) => setEditingLeader({ ...editingLeader, imageUrl: url })}
                            type="image"
                          />

                          <div>
                            <label className="block text-[#6B635B] font-bold mb-1">Display Order Priority</label>
                            <input
                              type="number"
                              value={editingLeader.order || 1}
                              onChange={(e) => setEditingLeader({ ...editingLeader, order: parseInt(e.target.value) || 1 })}
                              className="w-full bg-white border border-[#E6E2DE] rounded-xl p-2.5 text-[#2D2D2D]"
                            />
                            <span className="text-[10px] text-[#8C8279] mt-1 block">1 = Highest Priority (e.g. President)</span>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingLeader(null)}
                            className="px-4 py-2 rounded-xl bg-white border border-[#E6E2DE] text-[#6B635B] font-bold"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#5A5A40] text-white font-bold shadow-xs"
                          >
                            Save Leadership Profile
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* LEADERS GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(appState.leaders || [])
                      .slice()
                      .sort((a, b) => (a.order || 0) - (b.order || 0))
                      .map((leader) => (
                        <div key={leader.id} className="bg-white p-4 rounded-xl border border-[#E6E2DE] space-y-3 flex flex-col justify-between">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={leader.imageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80"}
                                alt={leader.name}
                                className="w-12 h-12 rounded-full object-cover border border-[#E6E2DE] bg-stone-100 shrink-0"
                              />
                              <div className="overflow-hidden">
                                <span className="text-[10px] font-bold text-[#A68B67] uppercase block truncate">{leader.role}</span>
                                <h5 className="font-bold text-[#2D2D2D] text-sm truncate">{leader.name}</h5>
                                <span className="text-[10px] text-[#8C8279] font-mono">Order: #{leader.order}</span>
                              </div>
                            </div>
                            <p className="text-xs text-[#6B635B] line-clamp-3 leading-relaxed bg-[#F8F5F2] p-2.5 rounded-lg border border-[#E6E2DE]">
                              {leader.bio}
                            </p>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E6E2DE]">
                            <button
                              onClick={() => setEditingLeader(leader)}
                              className="px-3 py-1.5 rounded-lg bg-[#F1ECE7] hover:bg-[#E6E2DE] text-[#5A5A40] text-xs font-bold flex items-center gap-1"
                            >
                              <Edit className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteLeader(leader.id)}
                              className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
