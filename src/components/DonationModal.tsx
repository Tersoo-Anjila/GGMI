import React, { useState } from 'react';
import { DonationRecord } from '../types';
import { submitDonation } from '../lib/api';
import { GGMILogo } from './GGMILogo';
import { 
  X, 
  HeartHandshake, 
  Building2, 
  CreditCard, 
  Copy, 
  Check, 
  CheckCircle2, 
  Printer, 
  ShieldCheck, 
  Sparkles, 
  Lock 
} from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonationAdded?: (donation: DonationRecord) => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  onDonationAdded,
}) => {
  const [activeTab, setActiveTab] = useState<'BankTransfer' | 'OnlineCard'>('BankTransfer');

  const [formData, setFormData] = useState<Partial<DonationRecord>>({
    donorName: '',
    email: '',
    phone: '',
    amount: 25000,
    currency: 'NGN',
    designation: 'General Missions',
    paymentMethod: 'Bank Transfer'
  });

  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [donationReceipt, setDonationReceipt] = useState<DonationRecord | null>(null);

  if (!isOpen) return null;

  const bankAccounts = [
    {
      bank: 'Zenith Bank',
      accountName: 'Global Gospel Missions Initiative',
      accountNumber: '1015882910',
      currency: 'NGN (Naira)',
      type: 'Naira Main Missions Account'
    },
    {
      bank: 'Guaranty Trust Bank (GTB)',
      accountName: 'Global Gospel Missions Initiative',
      accountNumber: '0123987654',
      currency: 'NGN (Naira)',
      type: 'Medical & Tracts Account'
    },
    {
      bank: 'First Bank of Nigeria',
      accountName: 'Global Gospel Missions Initiative',
      accountNumber: '2034567890',
      currency: 'USD (Domiciliary)',
      type: 'International Domiciliary Account'
    }
  ];

  const handleCopy = (accNum: string) => {
    navigator.clipboard.writeText(accNum);
    setCopiedAccount(accNum);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleSubmitOnlineDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.donorName || !formData.amount) {
      setError('Donor Name and Amount are required.');
      return;
    }

    setLoading(true);
    try {
      const record = await submitDonation({
        ...formData,
        paymentMethod: activeTab === 'BankTransfer' ? 'Bank Transfer' : 'Online Card'
      });
      setDonationReceipt(record);
      if (onDonationAdded) onDonationAdded(record);
    } catch (err: any) {
      setError(err.message || 'Donation submission failed.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2D2D]/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-[#E6E2DE] rounded-2xl max-w-2xl w-full text-[#2D2D2D] shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#F1ECE7] px-6 py-4 border-b border-[#E6E2DE] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#5A5A40] text-white font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#2D2D2D]">Partner & Donate to GGMI</h2>
              <p className="text-xs text-[#6B635B]">Support rural crusades, medical relief, and free Bible distribution</p>
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
          {donationReceipt ? (
            /* Success Receipt View */
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F1ECE7] text-[#5A5A40] border border-[#DED4C7] mx-auto">
                <CheckCircle2 className="w-7 h-7 text-[#A68B67]" />
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-[#2D2D2D]">Thank You for Supporting GGMI!</h3>
                <p className="text-[#6B635B] text-sm mt-1">
                  May the Lord multiply your seed and bless your kingdom partnership.
                </p>
              </div>

              {/* Donation Receipt Card */}
              <div id="donation-receipt-print" className="bg-[#F8F5F2] p-6 rounded-2xl border-2 border-[#A68B67] shadow-lg text-left max-w-md mx-auto space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E6E2DE]">
                  <GGMILogo size="sm" />
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#5A5A40] text-white">
                    DONATION RECEIPT
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[#8C8279] block text-[10px] uppercase">Partner Name</span>
                    <span className="font-serif font-bold text-base text-[#2D2D2D]">{donationReceipt.donorName}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-xl border border-[#E6E2DE]">
                    <div>
                      <span className="text-[#8C8279] block text-[10px]">Amount Partnered</span>
                      <span className="font-extrabold text-[#5A5A40] text-sm">
                        {donationReceipt.currency === 'NGN' ? '₦' : '$'}{donationReceipt.amount.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#8C8279] block text-[10px]">Designation</span>
                      <span className="font-bold text-[#A68B67]">{donationReceipt.designation}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-[#6B635B]">
                    <span>Reference: <strong className="text-[#2D2D2D]">{donationReceipt.reference}</strong></span>
                    <span>Date: <strong className="text-[#2D2D2D]">{donationReceipt.date}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrintReceipt}
                  className="px-4 py-2.5 rounded-xl bg-[#F1ECE7] hover:bg-[#E6E2DE] text-[#2D2D2D] text-xs font-bold flex items-center gap-2 border border-[#DED4C7]"
                >
                  <Printer className="w-4 h-4" /> Print Official Receipt
                </button>
                <button
                  onClick={() => setDonationReceipt(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold"
                >
                  Make Another Donation
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
            <div className="space-y-6">
              
              {/* Payment Method Switcher Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#F8F5F2] rounded-xl border border-[#E6E2DE] text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab('BankTransfer')}
                  className={`py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
                    activeTab === 'BankTransfer'
                      ? 'bg-[#5A5A40] text-white shadow-xs'
                      : 'text-[#6B635B] hover:text-[#2D2D2D]'
                  }`}
                >
                  <Building2 className="w-4 h-4" /> Official Bank Accounts
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('OnlineCard')}
                  className={`py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
                    activeTab === 'OnlineCard'
                      ? 'bg-[#5A5A40] text-white shadow-xs'
                      : 'text-[#6B635B] hover:text-[#2D2D2D]'
                  }`}
                >
                  <CreditCard className="w-4 h-4" /> Pay Online (Debit Card)
                </button>
              </div>

              {/* TAB 1: OFFICIAL BANK ACCOUNTS LIST */}
              {activeTab === 'BankTransfer' && (
                <div className="space-y-4">
                  <div className="p-3 bg-[#F1ECE7] rounded-xl border border-[#DED4C7] text-xs text-[#5A5A40]">
                    <p className="font-semibold">
                      Direct bank transfer into GGMI's registered account. You can log your transfer below to receive an instant electronic receipt!
                    </p>
                  </div>

                  <div className="space-y-3">
                    {bankAccounts.map((acc, idx) => (
                      <div key={idx} className="bg-[#F8F5F2] p-4 rounded-xl border border-[#E6E2DE] flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <span className="text-[10px] uppercase font-bold text-[#A68B67]">{acc.bank} • {acc.type}</span>
                          <h4 className="text-sm font-bold text-[#2D2D2D]">{acc.accountName}</h4>
                          <div className="font-mono text-base font-extrabold text-[#5A5A40] tracking-wider">
                            {acc.accountNumber}
                          </div>
                        </div>

                        <button
                          onClick={() => handleCopy(acc.accountNumber)}
                          className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#F1ECE7] text-[#5A5A40] text-xs font-bold flex items-center gap-1.5 border border-[#E6E2DE] shrink-0"
                        >
                          {copiedAccount === acc.accountNumber ? <Check className="w-3.5 h-3.5 text-[#5A5A40]" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedAccount === acc.accountNumber ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Optional Transfer Logging Form */}
                  <form onSubmit={handleSubmitOnlineDonation} className="pt-4 border-t border-[#E6E2DE] space-y-3 text-xs">
                    <h4 className="font-bold text-[#2D2D2D] text-xs uppercase tracking-wider">Notify Us of Bank Transfer (Get Receipt)</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[#6B635B] font-bold mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.donorName || ''}
                          onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                          placeholder="e.g. Bro. Terhemba"
                          className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[#6B635B] font-bold mb-1">Amount Transferred *</label>
                        <input
                          type="number"
                          required
                          min="1000"
                          value={formData.amount || 25000}
                          onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 25000 })}
                          className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#6B635B] font-bold mb-1">Designation / Purpose</label>
                      <select
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value as any })}
                        className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                      >
                        <option value="General Missions">General Missions & Field Support</option>
                        <option value="Medical Outreach">Rural Medical & Surgery Outreach</option>
                        <option value="Tract & Bibles Printing">Tiv Gospel Tracts & Bibles Printing</option>
                        <option value="Conference Support">Annual Conference Delegate Sponsorship</option>
                        <option value="Rural Evangelism">Rural Church Planting</option>
                      </select>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-5 py-2 rounded-xl bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-xs shadow-xs"
                      >
                        {loading ? 'Submitting...' : 'Log Transfer & Generate Receipt'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: ONLINE CARD PAYMENT FORM */}
              {activeTab === 'OnlineCard' && (
                <form onSubmit={handleSubmitOnlineDonation} className="space-y-4 text-xs">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#6B635B] font-bold mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.donorName || ''}
                        onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                        placeholder="e.g. Sister Grace"
                        className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#6B635B] font-bold mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="myemail@gmail.com"
                        className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-[#6B635B] font-bold mb-1">Amount to Give *</label>
                      <input
                        type="number"
                        required
                        min="500"
                        value={formData.amount || 25000}
                        onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 25000 })}
                        className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] font-bold focus:border-[#5A5A40] focus:outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[#6B635B] font-bold mb-1">Currency</label>
                      <select
                        value={formData.currency}
                        onChange={(e) => setFormData({ ...formData, currency: e.target.value as any })}
                        className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] font-bold focus:border-[#5A5A40] focus:outline-none"
                      >
                        <option value="NGN">NGN (₦)</option>
                        <option value="USD">USD ($)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#6B635B] font-bold mb-1">Designated Purpose</label>
                    <select
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value as any })}
                      className="w-full bg-[#F8F5F2] border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none"
                    >
                      <option value="General Missions">General Missions & Field Support</option>
                      <option value="Medical Outreach">Rural Medical & Surgery Outreach</option>
                      <option value="Tract & Bibles Printing">Tiv Gospel Tracts & Bibles Printing</option>
                      <option value="Conference Support">Annual Conference Delegate Sponsorship</option>
                      <option value="Rural Evangelism">Rural Church Planting</option>
                    </select>
                  </div>

                  {/* Simulated Card Details */}
                  <div className="bg-[#F8F5F2] p-4 rounded-xl border border-[#E6E2DE] space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#6B635B]">
                      <span className="flex items-center gap-1 text-[#5A5A40]">
                        <Lock className="w-3.5 h-3.5" /> 256-Bit Encrypted Payment
                      </span>
                      <span>Visa / Mastercard / Verve</span>
                    </div>

                    <input
                      type="text"
                      placeholder="Card Number: 5399 •••• •••• 1234"
                      className="w-full bg-white border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none font-mono"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="bg-white border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none font-mono"
                      />
                      <input
                        type="password"
                        maxLength={3}
                        placeholder="CVV"
                        className="bg-white border border-[#E6E2DE] rounded-lg p-2.5 text-[#2D2D2D] focus:border-[#5A5A40] focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2.5 rounded-xl bg-[#F1ECE7] text-[#6B635B] font-bold hover:bg-[#E6E2DE]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2.5 rounded-xl bg-[#5A5A40] hover:bg-[#484833] text-white font-bold shadow-md flex items-center gap-2 disabled:opacity-50"
                    >
                      {loading ? 'Processing Gateway...' : `Complete ${formData.currency === 'NGN' ? '₦' : '$'}${formData.amount?.toLocaleString()} Donation`}
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
