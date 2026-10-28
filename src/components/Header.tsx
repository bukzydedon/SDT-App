import React from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  currentTabTitle: string;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenProfile: () => void;
  onOpenAssessment: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTabTitle,
  userRole,
  onRoleChange,
  onOpenProfile,
  onOpenAssessment,
}) => {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#E8E3D7] shadow-[0_1px_8px_rgba(45,35,20,0.05)]">
      <div className="h-16 px-4 md:px-6 max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Active Screen Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#14432a] text-white flex items-center justify-center shadow-sm flex-shrink-0">
            <span className="material-symbols-outlined text-[22px] text-[#9ef7a4]">eco</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] md:text-xs uppercase tracking-wider text-[#0d6d2b] font-bold truncate leading-none">
              Self-Diet Therapy
            </span>
            <h1 className="text-base md:text-lg text-[#121c2a] font-bold font-heading truncate leading-tight">
              {currentTabTitle}
            </h1>
          </div>
        </div>

        {/* Right Actions: Assessment link, Role Switcher, Profile Button */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onOpenAssessment}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e6eeff] hover:bg-[#dee9fc] text-[#002c17] text-xs font-semibold transition-colors"
            title="Edit Biometric Assessment"
          >
            <span className="material-symbols-outlined text-sm text-[#0d6d2b]">tune</span>
            <span>Assessment</span>
          </button>

          {/* Role Switcher Pill */}
          <div className="relative flex items-center bg-[#d9e3f6]/80 hover:bg-[#d9e3f6] rounded-full px-2.5 py-1 border border-[#c1c9c0]/50 transition-colors">
            <span className="material-symbols-outlined text-[#0d6d2b] text-sm select-none pointer-events-none mr-1">
              badge
            </span>
            <select
              aria-label="Switch User Role"
              value={userRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="appearance-none bg-transparent pr-4 pl-0.5 py-0 text-xs text-[#121c2a] font-bold focus:outline-none cursor-pointer"
            >
              <option value="free">Free User</option>
              <option value="premium">Premium ★</option>
              <option value="dietitian">Dietitian (RDN)</option>
              <option value="admin">System Admin</option>
            </select>
            <span className="material-symbols-outlined text-[#414942] text-xs absolute right-1.5 pointer-events-none select-none">
              arrow_drop_down
            </span>
          </div>

          {/* Profile Trigger */}
          <button
            onClick={onOpenProfile}
            aria-label="View Profile"
            className="min-h-[40px] min-w-[40px] flex items-center justify-center p-0.5 rounded-full hover:ring-2 hover:ring-[#0d6d2b] transition-all"
            type="button"
          >
            <img
              alt="User Profile"
              className="w-8 h-8 rounded-full object-cover border border-[#c1c9c0]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsGaYe-9W2NjH4opNR4XENznXQGXlRNz7QyvRtWgelK6_ASZCKoSKEcChsPpD3hHpK5Ie67D0XXTueVFPcIXo0m5cN6FotLfyRbYWQNaYhsRGpWj2Y4OjSWlnJdDZ5MJQqKLqV4TqwUN3hdF-l5UWkTAEnORMDyRNuBKa6qy8HZGe2m14BgAbuMiiqABu7tAetFzgvtqjf7qGvU2NWX0qJEIOZrqqKRm10Ip9pCdQ"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
