import React from 'react';

export type NavTab = 'home-dashboard' | 'meal-planner' | 'food-database' | 'consult-dietitian' | 'clinical-tools';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  unreadConsultCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  unreadConsultCount = 1,
}) => {
  const navItems = [
    {
      id: 'home-dashboard' as NavTab,
      label: 'Home',
      icon: 'home',
    },
    {
      id: 'meal-planner' as NavTab,
      label: 'Planner',
      icon: 'restaurant_menu',
    },
    {
      id: 'food-database' as NavTab,
      label: 'Food DB',
      icon: 'local_dining',
    },
    {
      id: 'consult-dietitian' as NavTab,
      label: 'Consult',
      icon: 'support_agent',
      badge: unreadConsultCount,
    },
    {
      id: 'clinical-tools' as NavTab,
      label: 'Tools',
      icon: 'calculate',
    },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#FAF8F5]/90 backdrop-blur-xl border-t border-[#E8E3D7] shadow-[0_-2px_12px_rgba(45,35,20,0.06)]">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center flex-1 min-h-[44px] transition-all relative ${
                isActive
                  ? 'text-[#0d6d2b] font-semibold scale-105'
                  : 'text-[#414942] hover:text-[#121c2a]'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                {item.badge && item.badge > 0 && !isActive && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#0d6d2b] rounded-full ring-2 ring-white"></span>
                )}
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-[#0d6d2b] rounded-full mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
