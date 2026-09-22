import React, { useState } from 'react';
import { Member } from '../types';
import { submitMemberRegistration } from '../lib/api';
import { GGMILogo } from './GGMILogo';
import { 
  X, 
  UserPlus, 
  CheckCircle2, 
  Printer, 
  Copy, 
  Check, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Sparkles 
} from 'lucide-react';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMemberAdded?: (member: Member) => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({
  isOpen,
  onClose,
  onMemberAdded,
}) => {
  const [formData, setFormData] = useState<Partial<Member>>({
    firstName: '',
    lastName: '',
    sex: 'Male',
    age: 25,
    zone: 'Makurdi Central Zone',
    phone: '',
    email: '',
    maritalStatus: 'Single',
    occupation: '',
    bornAgainStatus: 'Yes',
    bornAgainYear: new Date().getFullYear() - 5,
    baptized: true,
    skills: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registeredMember, setRegisteredMember] = useState<Member | null>(null);
  const [copiedId, setCopiedId] = useState(false);

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
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      setError('Please fill in First Name, Last Name, and Phone Number.');
      return;
    }

    setLoading(true);
    try {
      const result = await submitMemberRegistration(formData);
      setRegisteredMember(result);
      if (onMemberAdded) onMemberAdded(result);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyId = () => {
    if (registeredMember?.membershipId) {
      navigator.clipboard.writeText(registeredMember.membershipId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2500);
    }
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2D2D]/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-[#E6E2DE] rounded-2xl max-w-2xl w-full text-[#2D2D2D] shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-[#F1ECE7] px-6 py-4 border-b border-[#E6E2DE] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#5A5A40] text-white font-bold">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#2D2D2D]">GGMI Membership Registration</h2>
              <p className="text-xs text-[#6B635B]">Join Global Gospel Missions Initiative as an official member</p>
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
          {registeredMember ? (
            /* Success & Membership Digital Badge View */
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F1ECE7] text-[#5A5A40] border border-[#DED4C7] mx-auto">
                <CheckCircle2 className="w-7 h-7 text-[#A68B67]" />
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-[#2D2D2D]">Welcome to the GGMI Family!</h3>
                <p className="text-[#6B635B] text-sm mt-1">
                  Your membership record has been successfully created in the official database.
                </p>
              </div>

              {/* Digital Membership ID Card */}
              <div id="membership-card-print" className="bg-[#F8F5F2] p-6 rounded-2xl border-2 border-[#A68B67] shadow-lg text-left max-w-md mx-auto relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-[#E6E2DE] mb-4">
                  <GGMILogo size="sm" />
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#F1ECE7] text-[#5A5A40] border border-[#DED4C7] font-bold">
                    Official Member
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#A68B67] font-bold">Full Member Name</div>
                    <div className="text-lg font-serif font-bold text-[#2D2D2D]">
                      {registeredMember.firstName} {registeredMember.lastName}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div>
                      <span className="text-[#8C8279] block text-[10px] uppercase">Zone/Chapter</span>
                      <span className="font-semibold text-[#5A5A40]">{registeredMember.zone}</span>
                    </div>
                    <div>
                      <span className="text-[#8C8279] block text-[10px] uppercase">Marital Status</span>
                      <span className="font-semibold text-[#5A5A40]">{registeredMember.maritalStatus}</span>
                    </div>
                    <div>
                      <span className="text-[#8C8279] block text-[10px] uppercase">Sex / Age</span>
                      <span className="font-semibold text-[#5A5A40]">{registeredMember.sex}, {registeredMember.age} yrs</span>
                    </div>
                    <div>
                      <span className="text-[#8C8279] block text-[10px] uppercase">Phone</span>
                      <span className="font-semibold text-[#5A5A40]">{registeredMember.phone}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E6E2DE] flex items-center justify-between">
                    <div>
                      <div className="text-[9px] uppercase text-[#8C8279]">Membership ID</div>
                      <div className="font-mono text-sm font-extrabold text-[#A68B67] tracking-wider">
                        {registeredMember.membershipId}
                      </div>
                    </div>
                    <button
                      onClick={handleCopyId}
                      className="px-2.5 py-1 rounded bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                    >
                      {copiedId ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedId ? 'Copied' : 'Copy ID'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrintCard}
                  className="px-4 py-2.5 rounded-xl bg-[#F1ECE7] hover:bg-[#E6E2DE] text-[#2D2D2D] text-xs font-bold flex items-center gap-2 border border-[#DED4C7]"
                >
                  <Printer className="w-4 h-4" /> Print / Save Card
                </button>
                <button
                  onClick={() => setRegisteredMember(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold"
                >
                  Register Another Member
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-[#F1ECE7] hover:bg-[#E6E2DE] text-[#6B635B] text-xs font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#6B635B] font-bold mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName || ''}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="e.g. Terhemba"
                    className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#6B635B] font-bold mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName || ''}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="e.g. Aondoaver"
                    className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                  />
                </div>
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
                    value={formData.age || 25}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 25 })}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#6B635B] font-bold mb-1">GGMI Zone / Chapter *</label>
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
                  <label className="block text-[#6B635B] font-bold mb-1">Occupation / Profession</label>
                  <input
                    type="text"
                    value={formData.occupation || ''}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    placeholder="e.g. Teacher, Nurse, Business"
                    className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F8F5F2] p-3 rounded-xl border border-[#E6E2DE]">
                <div>
                  <label className="block text-[#A68B67] font-bold mb-1">Born-Again Status</label>
                  <select
                    value={formData.bornAgainStatus}
                    onChange={(e) => setFormData({ ...formData, bornAgainStatus: e.target.value as any })}
                    className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                  >
                    <option value="Yes">Yes, Born Again</option>
                    <option value="Seeking">Seeking Salvation</option>
                    <option value="Inquirer">Inquirer / New Believer</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer text-[#6B635B] font-bold">
                    <input
                      type="checkbox"
                      checked={formData.baptized}
                      onChange={(e) => setFormData({ ...formData, baptized: e.target.checked })}
                      className="w-4 h-4 text-[#5A5A40] rounded focus:ring-[#5A5A40]"
                    />
                    <span>Water Baptized</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[#6B635B] font-bold mb-1">Ministry Skills / Talents</label>
                <input
                  type="text"
                  value={formData.skills || ''}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="e.g. Medical Aid, Tiv Translation, Music, Media, Counseling"
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
                  {loading ? 'Saving...' : 'Complete Registration'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
