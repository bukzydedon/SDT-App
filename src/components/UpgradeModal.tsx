import React from 'react';
import { UserRole } from '../types';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeToPremium: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  onUpgradeToPremium,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-[#E8E3D7] flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E3D7]">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#9ef7a4] text-[#187431] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">workspace_premium</span>
            </div>
            <div>
              <h2 className="text-base font-bold font-heading text-[#121c2a]">
                Unlock 30-Day Cyclical Protocol
              </h2>
              <span className="text-xs text-[#0d6d2b] font-bold">Premium Clinical Nutrition</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#414942] hover:bg-gray-200 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Pricing badge */}
        <div className="bg-[#eff4ff] p-4 rounded-2xl border border-[#dee9fc] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#414942] block">Special Nigerian Launch Offer</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-bold font-heading text-[#002c17]">₦4,500</span>
              <span className="text-xs text-[#414942]">/ month</span>
            </div>
          </div>
          <span className="bg-[#002c17] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            SAVE 35%
          </span>
        </div>

        {/* Features list */}
        <div className="space-y-2.5 text-xs text-[#414942]">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[#0d6d2b] text-base mt-0.5">check_circle</span>
            <span><strong>Full 30-Day Automated Cyclic Planning:</strong> Continuous multi-week macro distribution with no meal repetition boredom.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[#0d6d2b] text-base mt-0.5">check_circle</span>
            <span><strong>Live Open Market Price Tracker:</strong> Real-time pricing sync across Mile 12, Bodija, Utako, and Ogbete markets.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[#0d6d2b] text-base mt-0.5">check_circle</span>
            <span><strong>Unlimited Dr. Ada (RDN) Clinical Consultations:</strong> Instant personalized lab review and meal audits.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[#0d6d2b] text-base mt-0.5">check_circle</span>
            <span><strong>Export Comprehensive Medical PDF:</strong> Share nutritional clinical records directly with your physician or endocrinologist.</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => {
            onUpgradeToPremium();
            onClose();
          }}
          className="w-full py-3 bg-[#14432a] hover:bg-[#002c17] text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">lock_open</span>
          <span>Activate Premium 30-Day Plan</span>
        </button>

        <p className="text-[11px] text-center text-[#717972]">
          Instant activation • Cancel anytime • Pay with Paystack or Card in ₦ Naira
        </p>
      </div>
    </div>
  );
};
