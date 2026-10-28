import React from 'react';
import { UserProfile, UserRole } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onRoleChange: (role: UserRole) => void;
  onOpenAssessment: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onRoleChange,
  onOpenAssessment,
}) => {
  if (!isOpen) return null;

  const heightM = (userProfile.heightCm || 168) / 100;
  const bmi = (userProfile.currentWeightKg / (heightM * heightM)).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-[#E8E3D7] flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8E3D7] pb-3">
          <div className="flex items-center gap-3">
            <img
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#0d6d2b]"
              src={userProfile.avatar}
            />
            <div>
              <h2 className="text-base font-bold font-heading text-[#121c2a]">
                {userProfile.name}
              </h2>
              <span className="text-xs text-[#0d6d2b] font-semibold uppercase">
                {userProfile.role} Membership
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#414942] hover:bg-gray-200 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Role Switcher Section */}
        <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E8E3D7] flex flex-col gap-2">
          <span className="text-xs font-bold text-[#121c2a]">Demo User Role Simulation:</span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'free', label: 'Free User', desc: '7-day protocol' },
              { id: 'premium', label: 'Premium User', desc: '30-day cyclic plan' },
              { id: 'dietitian', label: 'Dietitian (RDN)', desc: 'Client audits & notes' },
              { id: 'admin', label: 'System Admin', desc: 'Database & markets' },
            ].map((r) => {
              const isSelected = userProfile.role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => onRoleChange(r.id as UserRole)}
                  className={`p-2 rounded-xl text-left border transition-all text-xs ${
                    isSelected
                      ? 'bg-[#14432a] text-white border-[#14432a] shadow-xs'
                      : 'bg-white text-[#121c2a] border-[#E8E3D7] hover:border-[#c1c9c0]'
                  }`}
                >
                  <span className="font-bold block">{r.label}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-[#717972]'}`}>
                    {r.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Biometrics Summary */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-[#121c2a]">Biometrics &amp; Metabolic Target</span>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-[#eff4ff] p-2.5 rounded-xl border border-[#dee9fc]">
              <span className="text-[10px] text-[#414942] block">Current Wt</span>
              <strong className="text-sm text-[#002c17]">{userProfile.currentWeightKg} kg</strong>
            </div>
            <div className="bg-[#eff4ff] p-2.5 rounded-xl border border-[#dee9fc]">
              <span className="text-[10px] text-[#414942] block">Target Wt</span>
              <strong className="text-sm text-[#0d6d2b]">{userProfile.targetWeightKg} kg</strong>
            </div>
            <div className="bg-[#eff4ff] p-2.5 rounded-xl border border-[#dee9fc]">
              <span className="text-[10px] text-[#414942] block">Body BMI</span>
              <strong className="text-sm text-[#002c17]">{bmi}</strong>
            </div>
          </div>
        </div>

        {/* Dietary Preferences Tags */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-[#121c2a]">Active Cuisine Calibrations</span>
          <div className="flex flex-wrap gap-1.5">
            {userProfile.cuisinePreferences.map((c, i) => (
              <span
                key={i}
                className="bg-[#FAF8F5] text-[#121c2a] text-[11px] font-semibold px-2.5 py-1 rounded-full border border-[#E8E3D7]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[#E8E3D7]">
          <button
            onClick={() => {
              onClose();
              onOpenAssessment();
            }}
            className="w-full py-2.5 bg-[#eff4ff] hover:bg-[#dee9fc] text-[#002c17] text-xs font-bold rounded-xl border border-[#dee9fc] flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">tune</span>
            <span>Recalibrate Health Assessment</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#14432a] text-white text-xs font-bold rounded-xl hover:bg-[#002c17]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
