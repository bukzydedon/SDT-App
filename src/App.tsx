import React, { useState } from 'react';
import { UserProfile, UserRole, FoodItem } from './types';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { HomeDashboard } from './components/HomeDashboard';
import { MealPlanner } from './components/MealPlanner';
import { FoodDatabase } from './components/FoodDatabase';
import { ConsultDietitian } from './components/ConsultDietitian';
import { ClinicalTools } from './components/ClinicalTools';
import { OnboardingAssessment } from './components/OnboardingAssessment';
import { MarketModal } from './components/MarketModal';
import { FoodScannerModal } from './components/FoodScannerModal';
import { UpgradeModal } from './components/UpgradeModal';
import { ProfileModal } from './components/ProfileModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home-dashboard');
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isMarketModalOpen, setIsMarketModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; icon: string; visible: boolean }>({
    message: '',
    icon: 'check',
    visible: false,
  });

  const showToast = (message: string, icon = 'check') => {
    setToast({ message, icon, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Amaka O.',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDsGaYe-9W2NjH4opNR4XENznXQGXlRNz7QyvRtWgelK6_ASZCKoSKEcChsPpD3hHpK5Ie67D0XXTueVFPcIXo0m5cN6FotLfyRbYWQNaYhsRGpWj2Y4OjSWlnJdDZ5MJQqKLqV4TqwUN3hdF-l5UWkTAEnORMDyRNuBKa6qy8HZGe2m14BgAbuMiiqABu7tAetFzgvtqjf7qGvU2NWX0qJEIOZrqqKRm10Ip9pCdQ',
    role: 'free',
    gender: 'female',
    age: 32,
    heightCm: 168,
    currentWeightKg: 71.2,
    targetWeightKg: 66.7,
    goal: 'loss',
    streakDays: 3,
    dayInCycle: 18,
    totalCycleDays: 60,
    budgetTier: 'standard',
    cuisinePreferences: [
      'Yoruba / Swallow Friendly',
      'Igbo / Ofe Soups',
      'Diabetic-Safe Portions',
      'Low-Sodium (DASH)',
    ],
    allergiesAndConditions: ['Mild Ulcer', 'Pre-Hypertension Guard'],
    waterIntakeL: 2.1,
    waterTargetL: 3.0,
    dailyCalorieBudget: 1850,
    dailyCalorieConsumed: 1680,
    dailyCarbsG: 210,
    dailyProteinG: 105,
    dailyFatG: 46,
  });

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
    showToast('Biometrics & dietary preferences updated!', 'verified');
  };

  const handleRoleChange = (role: UserRole) => {
    setUserProfile((prev) => ({ ...prev, role }));
    showToast(`Switched view to ${role.toUpperCase()} mode`, 'badge');
  };

  const handleAddToDailyLog = (food: FoodItem, calories: number, portionLabel: string) => {
    setUserProfile((prev) => ({
      ...prev,
      dailyCalorieConsumed: prev.dailyCalorieConsumed + calories,
    }));
    showToast(`Logged ${food.name} (${portionLabel}, ${calories} kcal)`, 'check_circle');
  };

  const tabTitles: { [key in NavTab]: string } = {
    'home-dashboard': 'Home Dashboard',
    'meal-planner': 'Meal Planner',
    'food-database': 'Food Database',
    'consult-dietitian': 'Consult Dr. Ada (RDN)',
    'clinical-tools': 'Clinical Tools',
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121c2a] flex flex-col font-sans selection:bg-[#9ef7a4] selection:text-[#002c17]">
      {/* Top Header */}
      <Header
        currentTabTitle={tabTitles[activeTab]}
        userRole={userProfile.role}
        onRoleChange={handleRoleChange}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenAssessment={() => setIsAssessmentOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20 pb-20">
        {activeTab === 'home-dashboard' && (
          <HomeDashboard
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onNavigateTab={setActiveTab}
            onOpenScanner={() => setIsScannerOpen(true)}
            onOpenMarketModal={() => setIsMarketModalOpen(true)}
          />
        )}

        {activeTab === 'meal-planner' && (
          <MealPlanner
            userRole={userProfile.role}
            onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
            onOpenMarketModal={() => setIsMarketModalOpen(true)}
            onToast={showToast}
          />
        )}

        {activeTab === 'food-database' && (
          <FoodDatabase
            onAddToDailyLog={handleAddToDailyLog}
            onToast={showToast}
          />
        )}

        {activeTab === 'consult-dietitian' && <ConsultDietitian />}

        {activeTab === 'clinical-tools' && <ClinicalTools />}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Global Toast Notification */}
      {toast.visible && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#14432a] text-white px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-center transition-all animate-bounce">
          <span className="material-symbols-outlined text-sm text-[#9ef7a4]">
            {toast.icon}
          </span>
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Assessment Full Modal */}
      {isAssessmentOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8E3D7] relative">
            <button
              onClick={() => setIsAssessmentOpen(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#FAF8F5] text-[#414942] hover:bg-gray-200 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
            <OnboardingAssessment
              userProfile={userProfile}
              onSave={handleUpdateProfile}
              onClose={() => setIsAssessmentOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Market Shopping List Modal */}
      <MarketModal
        isOpen={isMarketModalOpen}
        onClose={() => setIsMarketModalOpen(false)}
        onToast={showToast}
      />

      {/* Naija Food Scanner Modal */}
      <FoodScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onToast={showToast}
      />

      {/* Upgrade to 30-Day Cyclical Plan Modal */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onUpgradeToPremium={() => {
          handleRoleChange('premium');
          showToast('Upgraded to Premium 30-Day Cyclical Protocol!', 'workspace_premium');
        }}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userProfile={userProfile}
        onRoleChange={handleRoleChange}
        onOpenAssessment={() => {
          setIsProfileModalOpen(false);
          setIsAssessmentOpen(true);
        }}
      />
    </div>
  );
}
