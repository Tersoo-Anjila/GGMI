import React, { useState } from 'react';
import { GospelMaterial } from '../types';
import { 
  FolderArchive, 
  Download, 
  Search, 
  Filter, 
  FileText, 
  BookOpen, 
  Volume2, 
  Video, 
  Image, 
  Eye, 
  Check, 
  Sparkles 
} from 'lucide-react';

interface RepositorySectionProps {
  materials: GospelMaterial[];
  onPreviewMaterial?: (material: GospelMaterial) => void;
}

export const RepositorySection: React.FC<RepositorySectionProps> = ({
  materials,
  onPreviewMaterial,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [languageFilter, setLanguageFilter] = useState<string>('All');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const categories = ['All', 'Tract', 'Book', 'Article', 'Journal', 'Audio Sermon', 'Video Message', 'Photo Archive'];
  const languages = ['All', 'English', 'Tiv', 'Both'];

  const filtered = materials.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || m.category === categoryFilter;
    const matchesLang = languageFilter === 'All' || m.language === languageFilter || m.language === 'Both';
    return matchesSearch && matchesCategory && matchesLang;
  });

  const handleDownload = (material: GospelMaterial) => {
    setDownloadingId(material.id);
    
    // Simulate real file download trigger
    const element = document.createElement("a");
    const file = new Blob([
      `GLOBAL GOSPEL MISSIONS INITIATIVE (GGMI) - MATERIAL REPOSITORY\n\nTitle: ${material.title}\nCategory: ${material.category}\nAuthor: ${material.author}\nLanguage: ${material.language}\nFormat: ${material.fileType}\n\nDescription:\n${material.description}\n\nOfficial Website: https://ggmi-missions.org\nPhone: +2348066246499\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${material.title.replace(/\s+/g, '_')}_GGMI.${material.fileType.toLowerCase()}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setTimeout(() => setDownloadingId(null), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Tract': return FileText;
      case 'Book': return BookOpen;
      case 'Audio Sermon': return Volume2;
      case 'Video Message': return Video;
      case 'Photo Archive': return Image;
      default: return FolderArchive;
    }
  };

  return (
    <section id="repository" className="py-16 md:py-24 bg-[#F8F5F2] text-[#2D2D2D] border-b border-[#E6E2DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F1ECE7] text-[#5A5A40] border border-[#DED4C7] text-xs font-bold uppercase tracking-wider">
            <FolderArchive className="w-3.5 h-3.5 text-[#A68B67]" />
            <span>Gospel Literature & Media Repository</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#2D2D2D]">
            Free Gospel Material Downloads
          </h2>
          <p className="text-[#6B635B] text-sm sm:text-base">
            Access, read, listen, and freely download tracts (in Tiv & English), articles, books, journals, audio sermons, and video documentaries.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-5 rounded-2xl border border-[#E6E2DE] shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-[#8C8279] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search gospel tracts, Tiv salvation message, books, sermons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
              />
            </div>

            {/* Language Filter Dropdown */}
            <div className="md:col-span-3 flex items-center gap-2">
              <span className="text-xs text-[#6B635B] font-bold shrink-0">Language:</span>
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-xl px-3 py-2.5 text-xs text-[#5A5A40] font-bold focus:border-[#5A5A40] focus:outline-none"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang === 'All' ? 'All Languages' : lang}</option>
                ))}
              </select>
            </div>

            {/* Total Results Count */}
            <div className="md:col-span-3 text-right text-xs text-[#5A5A40] font-mono font-bold">
              Showing {filtered.length} Materials
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map((cat) => {
              const isActive = categoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold shrink-0 transition-all ${
                    isActive
                      ? 'bg-[#5A5A40] text-white shadow-xs'
                      : 'bg-[#F1ECE7] text-[#555555] hover:text-[#2D2D2D] hover:bg-[#E6E2DE]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Repository Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((mat) => {
            const Icon = getCategoryIcon(mat.category);
            const isDownloading = downloadingId === mat.id;

            return (
              <div
                key={mat.id}
                className="bg-white p-6 rounded-2xl border border-[#E6E2DE] hover:border-[#A68B67] transition-all flex flex-col justify-between space-y-4 group shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-[#F1ECE7] text-[#5A5A40] border border-[#DED4C7]">
                      <Icon className="w-3.5 h-3.5 text-[#A68B67]" />
                      {mat.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F8F5F2] text-[#6B635B] border border-[#E6E2DE]">
                      {mat.language} • {mat.fileType}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#2D2D2D] group-hover:text-[#A68B67] transition-colors line-clamp-2">
                    {mat.title}
                  </h3>

                  <p className="text-xs text-[#6B635B] leading-relaxed line-clamp-3">
                    {mat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E6E2DE] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-[#8C8279] block">Author / Source</span>
                    <span className="font-bold text-[#2D2D2D] truncate max-w-[150px] block">{mat.author}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownload(mat)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isDownloading
                          ? 'bg-[#5A5A40] text-white'
                          : 'bg-[#A68B67] hover:bg-[#8E7657] text-white shadow-xs'
                      }`}
                    >
                      {isDownloading ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                      {isDownloading ? 'Downloading...' : 'Download'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#E6E2DE] space-y-3">
            <FolderArchive className="w-12 h-12 text-[#8C8279] mx-auto" />
            <h4 className="text-lg font-bold text-[#2D2D2D]">No materials found</h4>
            <p className="text-xs text-[#6B635B]">Try adjusting your search query or category filters.</p>
          </div>
        )}

      </div>
    </section>
  );
};
