import React from 'react';
import { UserProfile } from '../types';
import { NavTab } from './BottomNav';

interface HomeDashboardProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNavigateTab: (tab: NavTab) => void;
  onOpenScanner: () => void;
  onOpenMarketModal: () => void;
  onOpenSwapModal?: (mealSlot: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  userProfile,
  onUpdateProfile,
  onNavigateTab,
  onOpenScanner,
  onOpenMarketModal,
}) => {
  // Add water handler (+0.25 L)
  const handleAddWater = () => {
    const current = userProfile.waterIntakeL || 2.1;
    const target = userProfile.waterTargetL || 3.0;
    if (current < target) {
      const next = Math.min(target, Number((current + 0.25).toFixed(2)));
      onUpdateProfile({ waterIntakeL: next });
    }
  };

  const waterPercent = Math.min(
    100,
    Math.round(((userProfile.waterIntakeL || 2.1) / (userProfile.waterTargetL || 3.0)) * 100)
  );

  const calorieBudget = userProfile.dailyCalorieBudget || 1850;
  const calorieConsumed = userProfile.dailyCalorieConsumed || 1680;
  const calorieLeft = Math.max(0, calorieBudget - calorieConsumed);
  const caloriePercent = Math.min(100, Math.round((calorieConsumed / calorieBudget) * 100));

  // Compute BMI
  const heightM = (userProfile.heightCm || 168) / 100;
  const currentBmi = (userProfile.currentWeightKg / (heightM * heightM)).toFixed(1);
  const targetBmi = (userProfile.targetWeightKg / (heightM * heightM)).toFixed(1);

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-4 pb-24 text-[#121c2a] space-y-5">
      {/* 1. Cultural Greeting & Goal Badge Banner */}
      <section className="bg-[#14432a] text-white rounded-2xl p-4 md:p-5 shadow-md relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-[#0d6d2b]/30 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0d6d2b] text-white text-[11px] font-bold">
              <span className="material-symbols-outlined text-[13px] leading-none">verified</span>
              <span>CLINICAL DIETARY PLAN</span>
            </div>
            <span className="text-[#80b08f] text-xs font-semibold tracking-wide">
              DAY {userProfile.dayInCycle || 18} OF {userProfile.totalCycleDays || 60}
            </span>
          </div>

          <div className="mt-1">
            <p className="text-xs text-[#80b08f] font-semibold">Ẹ káàbọ̀ / Welcome back,</p>
            <h2 className="text-2xl font-bold font-heading text-white tracking-tight">
              {userProfile.name}
            </h2>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#9ef7a4] text-[#187431] text-xs font-bold shadow-sm">
              <span className="material-symbols-outlined text-sm">trending_down</span>
              <span>
                Goal:{' '}
                {userProfile.goal === 'loss'
                  ? 'Healthy Weight Loss'
                  : userProfile.goal === 'gain'
                  ? 'Lean Mass Gain'
                  : userProfile.goal === 'glycemic'
                  ? 'Blood Sugar Stabilization'
                  : 'Metabolic Maintenance'}
              </span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 text-[#a0d2b0] text-xs font-semibold">
              <span className="material-symbols-outlined text-sm text-[#ffdcc3]">
                local_fire_department
              </span>
              <span>{userProfile.streakDays || 3}-Day Streak!</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. Key Health Biomarkers (2x2 Tactile Card Grid) */}
      <section className="grid grid-cols-2 gap-3">
        {/* Weight Metric */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E3D7] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#414942] uppercase font-bold tracking-wider">
              Current Weight
            </span>
            <div className="w-7 h-7 rounded-full bg-[#9ef7a4] flex items-center justify-center text-[#187431]">
              <span className="material-symbols-outlined text-base">monitor_weight</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold font-heading text-[#121c2a]">
                {userProfile.currentWeightKg}
              </span>
              <span className="text-xs text-[#414942] font-semibold">kg</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[#0d6d2b] text-xs font-bold">
              <span className="material-symbols-outlined text-sm">arrow_downward</span>
              <span>-1.8 kg this month</span>
            </div>
          </div>
        </div>

        {/* Target BMI */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E3D7] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#414942] uppercase font-bold tracking-wider">
              Target BMI
            </span>
            <div className="w-7 h-7 rounded-full bg-[#bceecb] flex items-center justify-center text-[#002110]">
              <span className="material-symbols-outlined text-base">vital_signs</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold font-heading text-[#121c2a]">{currentBmi}</span>
              <span className="text-xs text-[#0d6d2b] font-bold">Normal</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[#414942] text-xs">
              <span>Target: {targetBmi}</span>
            </div>
          </div>
        </div>

        {/* Daily Energy Budget */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E3D7] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#414942] uppercase font-bold tracking-wider">
              Energy Budget
            </span>
            <div className="w-7 h-7 rounded-full bg-[#ffdcc3] flex items-center justify-center text-[#3d1d00]">
              <span className="material-symbols-outlined text-base">local_fire_department</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold font-heading text-[#121c2a]">
                {calorieConsumed.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#414942]">/ {calorieBudget.toLocaleString()} kcal</span>
            </div>
            <div className="w-full bg-[#dee9fc] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#5c2f00] h-full rounded-full transition-all duration-300"
                style={{ width: `${caloriePercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Hydration Metric with One-Tap Logging */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E3D7] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#414942] uppercase font-bold tracking-wider">
              Water Intake
            </span>
            <button
              onClick={handleAddWater}
              aria-label="Add 250ml water"
              title="Click to add +250ml"
              className="w-7 h-7 rounded-full bg-[#e6eeff] hover:bg-[#9ef7a4] text-[#121c2a] hover:text-[#187431] flex items-center justify-center transition-all active:scale-90"
              type="button"
            >
              <span className="material-symbols-outlined text-base">add</span>
            </button>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold font-heading text-[#121c2a]">
                {userProfile.waterIntakeL || 2.1}
              </span>
              <span className="text-[11px] text-[#414942]">
                / {userProfile.waterTargetL || 3.0} L
              </span>
            </div>
            <div className="w-full bg-[#dee9fc] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#0d6d2b] h-full rounded-full transition-all duration-300"
                style={{ width: `${waterPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Calorie & Nigerian Macro Distribution Visualizer */}
      <section className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-[#E8E3D7] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm md:text-base font-bold font-heading text-[#121c2a]">
              Macronutrient Balance
            </h3>
            <p className="text-xs text-[#414942]">Calibrated for stable blood glucose &amp; satiety</p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#9ef7a4] text-[#187431] text-[11px] font-bold">
            ON TARGET
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#FAF8F5] rounded-xl p-3.5 border border-[#E8E3D7]">
          {/* SVG Donut */}
          <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
            <svg aria-hidden="true" className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-[#dee9fc]"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeWidth="12"
              ></circle>
              {/* Carbs 50% */}
              <circle
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke="#f28b23"
                strokeDasharray="125.66 251.32"
                strokeDashoffset="0"
                strokeLinecap="round"
                strokeWidth="12"
              ></circle>
              {/* Protein 25% */}
              <circle
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke="#0d6d2b"
                strokeDasharray="62.83 251.32"
                strokeDashoffset="-125.66"
                strokeLinecap="round"
                strokeWidth="12"
              ></circle>
              {/* Healthy Fats 25% */}
              <circle
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke="#14432a"
                strokeDasharray="62.83 251.32"
                strokeDashoffset="-188.49"
                strokeLinecap="round"
                strokeWidth="12"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-lg font-bold font-heading text-[#121c2a]">{calorieLeft}</span>
              <span className="text-[10px] text-[#414942] leading-none">kcal left</span>
            </div>
          </div>

          {/* Macro Breakdown Legend */}
          <div className="flex flex-col gap-2 flex-grow w-full text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f28b23] flex-shrink-0"></span>
                <span className="text-[#121c2a] font-semibold">Complex Carbs</span>
                <span className="text-[#414942] text-[11px]">(Ofada, Plantain)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-[#121c2a]">210g</span>
                <span className="text-[#414942] text-[11px]">50%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0d6d2b] flex-shrink-0"></span>
                <span className="text-[#121c2a] font-semibold">Proteins</span>
                <span className="text-[#414942] text-[11px]">(Goat meat, Fish)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-[#121c2a]">105g</span>
                <span className="text-[#187431] text-[11px] font-bold">25%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#14432a] flex-shrink-0"></span>
                <span className="text-[#121c2a] font-semibold">Healthy Lipids</span>
                <span className="text-[#414942] text-[11px]">(Groundnuts)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-[#121c2a]">46g</span>
                <span className="text-[#414942] text-[11px]">25%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quick Clinical Actions */}
      <section className="flex flex-col gap-2">
        <h3 className="text-sm font-bold font-heading text-[#121c2a] px-0.5">Quick Clinical Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Action 1: Food Scanner */}
          <button
            onClick={onOpenScanner}
            className="bg-white hover:bg-[#eff4ff] rounded-2xl p-3 flex flex-col items-center text-center gap-1.5 shadow-sm border border-[#E8E3D7] transition-all active:scale-95 group"
            type="button"
          >
            <div className="w-10 h-10 rounded-full bg-[#bceecb] text-[#002110] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-xl">qr_code_scanner</span>
            </div>
            <span className="text-xs font-bold text-[#121c2a]">Naija Food Scanner</span>
            <span className="text-[11px] text-[#414942]">Scan or Search</span>
          </button>

          {/* Action 2: Consult Dietitian */}
          <button
            onClick={() => onNavigateTab('consult-dietitian')}
            className="bg-white hover:bg-[#eff4ff] rounded-2xl p-3 flex flex-col items-center text-center gap-1.5 shadow-sm border border-[#E8E3D7] transition-all active:scale-95 group"
            type="button"
          >
            <div className="w-10 h-10 rounded-full bg-[#9ef7a4] text-[#187431] flex items-center justify-center group-hover:scale-105 transition-transform relative">
              <span className="material-symbols-outlined text-xl">clinical_notes</span>
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#0d6d2b] rounded-full"></span>
            </div>
            <span className="text-xs font-bold text-[#121c2a]">Dr. Ada (RDN)</span>
            <span className="text-[11px] text-[#0d6d2b] font-semibold">Online Consult</span>
          </button>

          {/* Action 3: Anthropometry Tracker */}
          <button
            onClick={() => onNavigateTab('clinical-tools')}
            className="bg-white hover:bg-[#eff4ff] rounded-2xl p-3 flex flex-col items-center text-center gap-1.5 shadow-sm border border-[#E8E3D7] transition-all active:scale-95 group"
            type="button"
          >
            <div className="w-10 h-10 rounded-full bg-[#ffdcc3] text-[#3d1d00] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-xl">straighten</span>
            </div>
            <span className="text-xs font-bold text-[#121c2a]">MUAC &amp; Waist</span>
            <span className="text-[11px] text-[#414942]">Log Stature</span>
          </button>

          {/* Action 4: Local Market Basket */}
          <button
            onClick={onOpenMarketModal}
            className="bg-white hover:bg-[#eff4ff] rounded-2xl p-3 flex flex-col items-center text-center gap-1.5 shadow-sm border border-[#E8E3D7] transition-all active:scale-95 group"
            type="button"
          >
            <div className="w-10 h-10 rounded-full bg-[#dee9fc] text-[#121c2a] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-xl">shopping_cart</span>
            </div>
            <span className="text-xs font-bold text-[#121c2a]">Market Basket</span>
            <span className="text-[11px] text-[#414942]">Mile 12 &amp; Bodija</span>
          </button>
        </div>
      </section>

      {/* 5. Today's Nigerian Meal Schedule */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-0.5">
          <div>
            <h3 className="text-sm md:text-base font-bold font-heading text-[#121c2a]">
              Today's Nigerian Meal Schedule
            </h3>
            <p className="text-xs text-[#414942]">Therapeutic portions calibrated for Amaka</p>
          </div>
          <button
            onClick={() => onNavigateTab('meal-planner')}
            className="text-xs text-[#0d6d2b] font-bold hover:underline flex items-center gap-0.5"
            type="button"
          >
            <span>Full Menu</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

        {/* Meal 1: Breakfast */}
        <article className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#E8E3D7] flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E8E3D7] text-[#121c2a] text-[10px] font-bold">
                BREAKFAST • 08:30 AM
              </span>
              <span className="flex items-center gap-1 text-[#0d6d2b] text-[11px] font-bold">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                LOGGED
              </span>
            </div>
            <span className="text-xs font-bold text-[#121c2a]">380 kcal</span>
          </div>

          <div className="flex gap-3 items-center">
            <img
              className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-[#E8E3D7]"
              alt="Boiled plantain and egg sauce"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgRDcKQt-LQzfEJ0H5MwtZUWg4TFjEOBKcaIy7YxDcawCdXyWwHp0Piw5Q6Mrqd7to4OpRMPX1QIJpae7gUQln5iRB_mc1OMUILRl6EYNC2ImOU6S_ZLfYhrC7gNExG0Idl-jF9CQVDcCj3b_8AxYjlAnpsuola6B5R3tk5myj20tHanc0UX09u-ccwaUgrgubJvpjZLmz0NOD04HQOFVWcuxcobZIzg2ZSiMYbzU"
            />
            <div className="flex flex-col min-w-0">
              <h4 className="text-sm font-bold text-[#121c2a] truncate">Boiled Plantain &amp; Egg Sauce</h4>
              <p className="text-xs text-[#414942] line-clamp-1">
                2 fingers ripe plantain + scrambled egg with plum tomatoes &amp; peppers (1 tsp palm oil)
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] bg-[#FAF8F5] text-[#414942] px-1.5 py-0.5 rounded border border-[#E8E3D7]">
                  P: 18g
                </span>
                <span className="text-[10px] bg-[#FAF8F5] text-[#414942] px-1.5 py-0.5 rounded border border-[#E8E3D7]">
                  C: 56g
                </span>
                <span className="text-[10px] bg-[#FAF8F5] text-[#414942] px-1.5 py-0.5 rounded border border-[#E8E3D7]">
                  F: 8g
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* Meal 2: Lunch (Next Up) */}
        <article className="bg-[#FAF8F5] rounded-2xl p-4 shadow-sm border-2 border-[#14432a]/30 flex flex-col gap-3 relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#9ef7a4] text-[#187431] text-[10px] font-bold">
                NEXT UP • 01:30 PM
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#bceecb] text-[#002110] text-[10px] font-bold">
                Therapeutic Swallow
              </span>
            </div>
            <span className="text-sm font-bold text-[#0d6d2b]">520 kcal</span>
          </div>

          <div className="flex gap-3 items-center">
            <img
              className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-[#E8E3D7] shadow-sm"
              alt="Authentic Nigerian Amala swallow with Ewedu and Gbegiri"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8YJfIwuikyHjbGFw19QWh0XfMXhlo2-QOczmuUzIIN8_aTkzB3kcsqnKA_nV-xpxSs8YIuPv8tUGQ6so2s15OSL9a3t8oNDrbirV2JpLuhObFJOzDsqtI1Soj1QISUPN14_ABzJx74kyZ4VVXW4ebTDBvmfiEkBz4dmNLJLWCQ1cNdt2-Eo8ckupuMBZkywOlLCtggVyYiGGor98hRd8eiFdg6Q7iMUvJFIuAkd0"
            />
            <div className="flex flex-col min-w-0">
              <h4 className="text-sm font-bold font-heading text-[#121c2a] truncate">
                Àmàlà, Ewédú &amp; Gbẹ̀gìrì
              </h4>
              <p className="text-xs text-[#414942] mt-0.5 line-clamp-2">
                1 small wrap (120g yam flour), 1 ladle each Ewedu/Gbegiri, with lean stewed goat meat (90g)
              </p>
              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                <span className="px-1.5 py-0.5 rounded bg-[#a0d2b0] text-[#002110] text-[10px] font-bold">
                  Low Glycemic Load
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#dee9fc] text-[#121c2a] text-[10px] font-semibold">
                  High Fiber
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => onNavigateTab('meal-planner')}
              className="flex-1 min-h-[40px] bg-[#14432a] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#002c17] active:scale-95 transition-all shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-base">check</span>
              <span>Log Portions</span>
            </button>
            <button
              onClick={() => onNavigateTab('meal-planner')}
              className="min-h-[40px] px-3.5 bg-white text-[#14432a] text-xs font-bold rounded-xl flex items-center justify-center gap-1 border border-[#14432a]/30 hover:bg-[#eff4ff] active:scale-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-base">swap_horiz</span>
              <span>Swap Meal</span>
            </button>
          </div>
        </article>

        {/* Meal 3: Afternoon Snack */}
        <article className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#E8E3D7] flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <span className="px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E8E3D7] text-[#121c2a] text-[10px] font-bold">
              AFTERNOON SNACK • 04:30 PM
            </span>
            <span className="text-xs font-bold text-[#121c2a]">140 kcal</span>
          </div>
          <div className="flex gap-3 items-center">
            <div className="w-14 h-14 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#0d6d2b] flex-shrink-0 border border-[#dee9fc]">
              <span className="material-symbols-outlined text-2xl">spa</span>
            </div>
            <div className="flex flex-col min-w-0">
              <h4 className="text-sm font-bold text-[#121c2a]">
                Roasted Groundnuts &amp; Garden Eggs
              </h4>
              <p className="text-xs text-[#414942] line-clamp-1">
                2 crisp white African garden eggs + 1 small handful roasted groundnuts (20g)
              </p>
            </div>
          </div>
        </article>

        {/* Meal 4: Dinner */}
        <article className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#E8E3D7] flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E8E3D7] text-[#121c2a] text-[10px] font-bold">
                DINNER • 07:30 PM
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#9ef7a4] text-[#187431] text-[10px] font-bold">
                High Protein
              </span>
            </div>
            <span className="text-xs font-bold text-[#121c2a]">410 kcal</span>
          </div>
          <div className="flex gap-3 items-center">
            <img
              className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-[#E8E3D7]"
              alt="Steamed Nigerian Moi Moi bean pudding"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNOqR8fDwJAvLI7N5NX3UC0cKyKId6xNBpvY15dpa-npsPBWvnSQYPTcx2qbUtpBLeW-uSW8l6F9RYEiUKpL81Y0zIKlS1X9oHlZXci7uDUcl-g-JYiI9HDYv4VAbdPIfLezQyD9y3m8KuIBztkgdQ54EwSX4Ynmj7c7gnZbBZaxds1rDh4Jictf4XRgCay0T7DHEdNFYXDJ0kLDcz26VXUUoQGm-2cAmApTQVuC0"
            />
            <div className="flex flex-col min-w-0">
              <h4 className="text-sm font-bold text-[#121c2a] truncate">Steamed Mọ́i-Mọ́i &amp; Grilled Fish</h4>
              <p className="text-xs text-[#414942] line-clamp-1">
                Leaf-wrapped steamed bean cake with grilled croaker fish (120g) &amp; fresh vegetable salad
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] bg-[#FAF8F5] text-[#414942] px-1.5 py-0.5 rounded border border-[#E8E3D7]">
                  P: 34g
                </span>
                <span className="text-[10px] bg-[#FAF8F5] text-[#414942] px-1.5 py-0.5 rounded border border-[#E8E3D7]">
                  C: 38g
                </span>
                <span className="text-[10px] bg-[#FAF8F5] text-[#414942] px-1.5 py-0.5 rounded border border-[#E8E3D7]">
                  F: 11g
                </span>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* 6. Medical Safety / Dietitian Note Card */}
      <section className="bg-[#eff4ff] rounded-2xl p-4 shadow-sm border border-[#dee9fc] flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#bceecb] text-[#002110] flex items-center justify-center flex-shrink-0 shadow-sm">
          <span className="material-symbols-outlined text-xl">health_and_safety</span>
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#002c17]">Dietitian Clinical Note</h4>
            <span className="text-[11px] text-[#414942] font-semibold">Dr. Ada, RDN</span>
          </div>
          <p className="text-xs text-[#414942] leading-relaxed">
            &ldquo;Great consistency Amaka! Remember to drink at least 750ml of water 30 minutes before your Àmàlà lunch. This aids digestion and softens starch absorption. Keep your deficits gentle (under 350 kcal/day) to safeguard metabolic rate.&rdquo;
          </p>
        </div>
      </section>
    </div>
  );
};
