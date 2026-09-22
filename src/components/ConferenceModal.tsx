import React, { useState } from 'react';
import { ConferenceRegistration } from '../types';
import { submitConferenceRegistration } from '../lib/api';
import { GGMILogo } from './GGMILogo';
import { 
  X, 
  CalendarCheck, 
  CheckCircle2, 
  Printer, 
  Copy, 
  Check, 
  BookOpen, 
  Home, 
  PhoneCall, 
  Sparkles,
  Award
} from 'lucide-react';

interface ConferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistrationAdded?: (reg: ConferenceRegistration) => void;
}

export const ConferenceModal: React.FC<ConferenceModalProps> = ({
  isOpen,
  onClose,
  onRegistrationAdded,
}) => {
  const [formData, setFormData] = useState<Partial<ConferenceRegistration>>({
    fullName: '',
    sex: 'Male',
    age: 30,
    zone: 'Makurdi Central Zone',
    phone: '',
    address: '',
    email: '',
    maritalStatus: 'Single',
    accommodationNeeds: 'Yes',
    specialAccommodationDetails: '',
    preferredStudyClass: 'English',
    emergencyContact: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registeredPass, setRegisteredPass] = useState<ConferenceRegistration | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const zonesList = [
    'Makurdi Central Zone',
    'Gboko Zone',
    'Otukpo Zone',
    'Vandeikya Zone',
    'Katsina-Ala Zone',
    'Benue South Zone',
    'Abuja Chapter',
    'Lagos Chapter',
    'Port Harcourt Chapter',
    'Northern Region Zone',
    'Diaspora / International'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.fullName || !formData.phone) {
      setError('Please fill in Full Name and Phone Number.');
      return;
    }

    setLoading(true);
    try {
      const result = await submitConferenceRegistration(formData);
      setRegisteredPass(result);
      if (onRegistrationAdded) onRegistrationAdded(result);
    } catch (err: any) {
      setError(err.message || 'Conference registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (registeredPass?.registrationCode) {
      navigator.clipboard.writeText(registeredPass.registrationCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handlePrintBadge = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2D2D]/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-[#E6E2DE] rounded-2xl max-w-2xl w-full text-[#2D2D2D] shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-[#F1ECE7] px-6 py-4 border-b border-[#E6E2DE] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#5A5A40] text-white font-bold">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#2D2D2D]">GGMI Conference Registration</h2>
              <p className="text-xs text-[#6B635B]">Annual Global Gospel Conference 2026 • Harvest Frontiers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8C8279] hover:text-[#2D2D2D] hover:bg-[#E6E2DE] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {registeredPass ? (
            /* Success & Conference Pass Badge View */
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F1ECE7] text-[#5A5A40] border border-[#DED4C7] mx-auto">
                <CheckCircle2 className="w-7 h-7 text-[#A68B67]" />
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-[#2D2D2D]">Conference Seat Reserved!</h3>
                <p className="text-[#6B635B] text-sm mt-1">
                  Your conference delegate pass is generated. Please keep your registration code safe.
                </p>
              </div>

              {/* Printable Delegate Pass Badge */}
              <div id="conference-badge-print" className="bg-[#F8F5F2] p-6 rounded-2xl border-2 border-[#A68B67] shadow-lg text-left max-w-md mx-auto relative">
                <div className="flex items-center justify-between pb-3 border-b border-[#E6E2DE] mb-3">
                  <GGMILogo size="sm" />
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#5A5A40] text-white">
                    DELEGATE PASS
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-[10px] text-[#A68B67] font-bold uppercase">Delegate Name</span>
                    <h4 className="text-lg font-serif font-bold text-[#2D2D2D]">{registeredPass.fullName}</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 bg-white p-3 rounded-xl border border-[#E6E2DE]">
                    <div>
                      <span className="text-[#8C8279] block text-[10px]">Study Class</span>
                      <span className="font-bold text-[#5A5A40] flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {registeredPass.preferredStudyClass} Class
                      </span>
                    </div>
                    <div>
                      <span className="text-[#8C8279] block text-[10px]">Accommodation</span>
                      <span className="font-bold text-[#5A5A40] flex items-center gap-1">
                        <Home className="w-3.5 h-3.5" />
                        {registeredPass.accommodationNeeds === 'Yes' ? 'Requested' : 'Self-Arranged'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#8C8279] block text-[10px]">Zone / Chapter</span>
                      <span className="font-semibold text-[#2D2D2D]">{registeredPass.zone}</span>
                    </div>
                    <div>
                      <span className="text-[#8C8279] block text-[10px]">Phone</span>
                      <span className="font-semibold text-[#2D2D2D]">{registeredPass.phone}</span>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between border-t border-[#E6E2DE]">
                    <div>
                      <span className="text-[9px] uppercase text-[#8C8279]">Pass Code</span>
                      <div className="font-mono text-sm font-extrabold text-[#A68B67] tracking-wider">
                        {registeredPass.registrationCode}
                      </div>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="px-2.5 py-1 rounded bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedCode ? 'Copied' : 'Copy Code'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrintBadge}
                  className="px-4 py-2.5 rounded-xl bg-[#F1ECE7] hover:bg-[#E6E2DE] text-[#2D2D2D] text-xs font-bold flex items-center gap-2 border border-[#DED4C7]"
                >
                  <Printer className="w-4 h-4" /> Print Delegate Badge
                </button>
                <button
                  onClick={() => setRegisteredPass(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold"
                >
                  Register Another Delegate
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-[#F1ECE7] hover:bg-[#E6E2DE] text-[#6B635B] text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Conference Registration Form */
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[#6B635B] font-bold mb-1">Full Names *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName || ''}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Dr. Terver Moses Kpenksen"
                  className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#6B635B] font-bold mb-1">Sex *</label>
                  <select
                    value={formData.sex}
                    onChange={(e) => setFormData({ ...formData, sex: e.target.value as 'Male' | 'Female' })}
                    className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#6B635B] font-bold mb-1">Age *</label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={formData.age || 30}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 30 })}
                    className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#6B635B] font-bold mb-1">Marital Status *</label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value as any })}
                    className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                </div>
              </div>

              {/* CRITICAL FEATURE: Preferred Study Class Choice (Tiv or English) */}
              <div className="bg-[#F8F5F2] p-3.5 rounded-xl border border-[#E6E2DE]">
                <label className="block text-[#5A5A40] font-bold text-xs mb-2">
                  Preferred Bible Study Class * (Select Language)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer font-bold transition-all ${
                    formData.preferredStudyClass === 'English'
                      ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-xs'
                      : 'bg-white text-[#6B635B] border-[#E6E2DE]'
                  }`}>
                    <input
                      type="radio"
                      name="studyClass"
                      value="English"
                      checked={formData.preferredStudyClass === 'English'}
                      onChange={() => setFormData({ ...formData, preferredStudyClass: 'English' })}
                      className="hidden"
                    />
                    <span>English Study Class</span>
                  </label>

                  <label className={`flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer font-bold transition-all ${
                    formData.preferredStudyClass === 'Tiv'
                      ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-xs'
                      : 'bg-white text-[#6B635B] border-[#E6E2DE]'
                  }`}>
                    <input
                      type="radio"
                      name="studyClass"
                      value="Tiv"
                      checked={formData.preferredStudyClass === 'Tiv'}
                      onChange={() => setFormData({ ...formData, preferredStudyClass: 'Tiv' })}
                      className="hidden"
                    />
                    <span>Tiv Study Class</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#6B635B] font-bold mb-1">Zone / Chapter *</label>
                  <select
                    value={formData.zone}
                    onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                    className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                  >
                    {zonesList.map((z) => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#6B635B] font-bold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+234 800 000 0000"
                    className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#6B635B] font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="myname@gmail.com"
                    className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#6B635B] font-bold mb-1">Residential Address / City</label>
                  <input
                    type="text"
                    value={formData.address || ''}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Gboko, Benue State"
                    className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-[#F8F5F2] p-3.5 rounded-xl border border-[#E6E2DE] space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[#6B635B] font-bold">Accommodation Needed on Ground?</label>
                  <select
                    value={formData.accommodationNeeds}
                    onChange={(e) => setFormData({ ...formData, accommodationNeeds: e.target.value as 'Yes' | 'No' })}
                    className="bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D] font-bold focus:border-[#5A5A40] focus:outline-none"
                  >
                    <option value="Yes">Yes (Provide Free Dormitory Bed)</option>
                    <option value="No">No (Self-Arranged Hotel/House)</option>
                  </select>
                </div>

                {formData.accommodationNeeds === 'Yes' && (
                  <input
                    type="text"
                    value={formData.specialAccommodationDetails || ''}
                    onChange={(e) => setFormData({ ...formData, specialAccommodationDetails: e.target.value })}
                    placeholder="Special accommodation needs (e.g. elderly access, nursing mother)"
                    className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D] text-xs focus:border-[#5A5A40] focus:outline-none"
                  />
                )}
              </div>

              <div>
                <label className="block text-[#6B635B] font-bold mb-1">Emergency Contact (Name & Phone)</label>
                <input
                  type="text"
                  value={formData.emergencyContact || ''}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  placeholder="e.g. Spouse / Relative Name (+234...)"
                  className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-[#F1ECE7] hover:bg-[#E6E2DE] text-[#6B635B] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#484833] text-white font-bold shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Reserve Conference Seat'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
