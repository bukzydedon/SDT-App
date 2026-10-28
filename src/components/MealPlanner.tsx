import React, { useState } from 'react';
import { DayPlan, PlannedMeal, UserRole } from '../types';
import { SEVEN_DAY_PLANS } from '../data/mealPlans';

interface MealPlannerProps {
  userRole: UserRole;
  onOpenUpgradeModal: () => void;
  onOpenMarketModal: () => void;
  onToast: (message: string, icon?: string) => void;
}

export const MealPlanner: React.FC<MealPlannerProps> = ({
  userRole,
  onOpenUpgradeModal,
  onOpenMarketModal,
  onToast,
}) => {
  const [plans, setPlans] = useState<DayPlan[]>(SEVEN_DAY_PLANS);
  const [selectedDayNum, setSelectedDayNum] = useState<number>(3); // Day 3 (Wed 16) is active default
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [swappedMeals, setSwappedMeals] = useState<{ [mealId: string]: boolean }>({});
  const [portionAdjustModalMeal, setPortionAdjustModalMeal] = useState<PlannedMeal | null>(null);
  const [portionWeightGrams, setPortionWeightGrams] = useState<number>(200);

  const activePlan = plans.find((p) => p.dayNum === selectedDayNum) || plans[0];

  // Calculate planned calories for active day
  const totalPlannedKcal = activePlan.meals.reduce((sum, m) => {
    if (swappedMeals[m.id] && m.swapAlternative) {
      return sum + m.swapAlternative.calories;
    }
    return sum + m.calories;
  }, 0);

  const kcalRemaining = Math.max(0, activePlan.targetCalories - totalPlannedKcal);
  const progressPct = Math.min(100, Math.round((totalPlannedKcal / activePlan.targetCalories) * 100));

  // Smart swap toggle
  const handleToggleSwap = (mealId: string) => {
    setSwappedMeals((prev) => {
      const nextState = !prev[mealId];
      if (nextState) {
        onToast('Swapped to low-glycemic Nigerian therapeutic variant!', 'published_with_changes');
      } else {
        onToast('Reverted to primary planned recipe', 'undo');
      }
      return { ...prev, [mealId]: nextState };
    });
  };

  // Regenerate day plan
  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      onToast(`Day ${activePlan.dayNum} plan rebalanced with fresh market options!`, 'autorenew');
    }, 600);
  };

  // Export PDF Guide
  const handleExportPdf = () => {
    window.print();
    onToast('Print / Save PDF dialog opened', 'picture_as_pdf');
  };

  // Dietitian Review
  const handleRequestReview = () => {
    onToast('Meal plan submitted to Dr. Ada, RDN for clinical audit', 'medical_services');
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-4 pb-24 text-[#121c2a] space-y-4">
      {/* 1. Plan Horizon & Upgrade Micro-Banner */}
      <div className="bg-[#eff4ff] rounded-2xl p-4 shadow-sm border border-[#dee9fc]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#9ef7a4] text-[#187431] flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                calendar_month
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#0d6d2b] font-bold uppercase tracking-wider">
                  {userRole === 'premium' ? 'Premium 30-Day Protocol' : 'Free Tier Active'}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0d6d2b]"></span>
                <span className="text-[11px] text-[#414942]">
                  {userRole === 'premium' ? '30-Day Cyclical' : '7-Day Protocol'}
                </span>
              </div>
              <p className="text-xs text-[#121c2a] mt-0.5 leading-snug font-medium">
                {userRole === 'premium'
                  ? 'Active multi-week glycemic balancing with Lagos & Abuja price sync.'
                  : 'Upgrade to Premium for 30-Day automated cyclic planning & local market price sync.'}
              </p>
            </div>
          </div>
          {userRole !== 'premium' && (
            <button
              onClick={onOpenUpgradeModal}
              className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-[#002c17] hover:bg-[#14432a] text-white text-xs font-bold shadow-sm active:scale-95 transition-all"
              type="button"
            >
              Unlock 30d
            </button>
          )}
        </div>
      </div>

      {/* 2. Weekly Horizontal Calendar Slider */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold font-heading text-[#121c2a]">Current Cycle</span>
            <span className="text-xs text-[#414942]">Oct 14 – 20</span>
          </div>
          <div className="flex items-center gap-1 bg-[#eff4ff] border border-[#dee9fc] rounded-full px-2.5 py-0.5">
            <span className="material-symbols-outlined text-xs text-[#0d6d2b]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <span className="text-[11px] text-[#121c2a] font-semibold">Clinically Aligned</span>
          </div>
        </div>

        {/* Date Pill Row */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {plans.map((p) => {
            const isActive = p.dayNum === selectedDayNum;
            return (
              <button
                key={p.dayNum}
                onClick={() => setSelectedDayNum(p.dayNum)}
                className={`day-tab flex flex-col items-center justify-center min-w-[52px] py-2.5 px-1 rounded-xl transition-all active:scale-95 ${
                  isActive
                    ? 'bg-[#002c17] text-white shadow-md ring-2 ring-[#0d6d2b] ring-offset-2'
                    : 'bg-white text-[#414942] border border-[#E8E3D7] hover:border-[#c1c9c0]'
                }`}
                type="button"
              >
                <span className="text-[11px] opacity-80 uppercase font-semibold">{p.dayName}</span>
                <span className="text-base font-bold font-heading mt-0.5">{p.dateNumber}</span>
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-1 ${
                    isActive ? 'bg-[#9ef7a4]' : 'bg-transparent'
                  }`}
                ></span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Goal Alignment Summary Strip (Dynamic) */}
      <div className="bg-[#14432a] text-white rounded-2xl p-4 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9ef7a4] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              tune
            </span>
            <span className="text-sm font-bold font-heading">
              Day {activePlan.dayNum} ({activePlan.dayName} {activePlan.dateNumber}) Targets
            </span>
          </div>
          <div className="bg-white/10 rounded-full px-2.5 py-0.5 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-[#9ef7a4]">bolt</span>
            <span className="text-[11px] text-[#9ef7a4] font-bold">Metabolic Focus</span>
          </div>
        </div>

        {/* Metric Chips Grid */}
        <div className="grid grid-cols-3 gap-2 mt-1">
          <div className="bg-white/10 rounded-xl p-2.5 flex flex-col">
            <span className="text-[10px] text-[#80b08f] uppercase font-bold">Calorie Target</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-bold font-heading text-white">
                {activePlan.targetCalories.toLocaleString()}
              </span>
              <span className="text-[10px] text-[#80b08f]">kcal</span>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-2.5 flex flex-col">
            <span className="text-[10px] text-[#80b08f] uppercase font-bold">Deficit Pacing</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-bold font-heading text-[#9ef7a4]">
                {activePlan.deficitPacing}
              </span>
              <span className="text-[10px] text-[#9ef7a4]">kcal</span>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-2.5 flex flex-col">
            <span className="text-[10px] text-[#80b08f] uppercase font-bold">Lean Protein</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-bold font-heading text-white">
                {activePlan.leanProteinTargetG}
              </span>
              <span className="text-[10px] text-[#80b08f]">g</span>
            </div>
          </div>
        </div>

        {/* Macro Progress Bar */}
        <div className="mt-3 pt-1">
          <div className="flex justify-between items-center mb-1 text-xs text-[#80b08f]">
            <span>Planned: {totalPlannedKcal} / {activePlan.targetCalories} kcal</span>
            <span className="text-[#9ef7a4] font-semibold">{kcalRemaining} kcal remaining</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden flex">
            <div
              className="bg-[#9ef7a4] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 4. Dietitian Clinical Endorsement Micro-Badge */}
      <div className="bg-[#eff4ff] rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm border border-[#dee9fc]">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="material-symbols-outlined text-[#0d6d2b] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            health_and_safety
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#121c2a] truncate">Hypertension &amp; Pre-Diabetes Guard</p>
            <p className="text-[11px] text-[#414942] truncate">
              Palm oil restricted to 1 tbsp • Sodium capped &lt; 1,800mg
            </p>
          </div>
        </div>
        <button
          onClick={() => onToast('Verified by Dr. Ada (RDN) for blood sugar & sodium safety', 'verified')}
          className="flex-shrink-0 flex items-center gap-1 text-[#0d6d2b] text-xs font-bold bg-[#9ef7a4] px-2.5 py-1 rounded-full hover:bg-[#82da8a] transition-colors"
          type="button"
        >
          <span>Verified</span>
          <span className="material-symbols-outlined text-xs">arrow_forward</span>
        </button>
      </div>

      {/* 5. Active Day Meal Timeline */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold font-heading text-[#121c2a]">Planned Nourishment</span>
          <span className="text-xs text-[#414942]">{activePlan.meals.length} slots allocated</span>
        </div>

        {activePlan.meals.map((meal) => {
          const isSwapped = swappedMeals[meal.id] && meal.swapAlternative;
          const displayTitle = isSwapped ? meal.swapAlternative!.title : meal.title;
          const displayDesc = isSwapped ? meal.swapAlternative!.description : meal.description;
          const displayCalories = isSwapped ? meal.swapAlternative!.calories : meal.calories;
          const displayProtein = isSwapped ? meal.swapAlternative!.proteinG : meal.proteinG;
          const displayCarbs = isSwapped ? meal.swapAlternative!.carbsG : meal.carbsG;
          const displayImg = isSwapped ? meal.swapAlternative!.image : meal.image;

          return (
            <div
              key={meal.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E3D7] transition-all hover:border-[#c1c9c0]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#eff4ff] text-[#002c17] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-base">
                      {meal.slot === 'Breakfast'
                        ? 'wb_twilight'
                        : meal.slot === 'Mid-Morning Snack'
                        ? 'sunny'
                        : meal.slot === 'Lunch'
                        ? 'restaurant'
                        : 'nightlight'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#121c2a] uppercase tracking-wide">
                        {meal.slot}
                      </span>
                      <span className="text-[11px] text-[#414942]">{meal.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] bg-[#9ef7a4] text-[#187431] px-1.5 py-0.5 rounded font-bold">
                        {meal.badge}
                      </span>
                      <span className="text-[10px] bg-[#FAF8F5] text-[#121c2a] font-semibold px-1.5 py-0.5 rounded border border-[#E8E3D7]">
                        ₦{meal.estimatedCostNgn.toLocaleString()} est.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-bold font-heading text-[#121c2a]">
                    {displayCalories}
                  </span>
                  <span className="text-[11px] text-[#414942] block -mt-1">kcal</span>
                </div>
              </div>

              <div className="mt-3 flex gap-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#eff4ff] border border-[#E8E3D7]">
                  <img
                    className="w-full h-full object-cover"
                    alt={meal.altText}
                    src={displayImg}
                  />
                </div>
                <div className="min-w-0 flex-1 flex flex-col justify-between">
                  <p className="text-xs md:text-sm text-[#121c2a] font-bold leading-tight">
                    {displayTitle}
                  </p>
                  <p className="text-xs text-[#414942] line-clamp-2 mt-0.5">{displayDesc}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] bg-[#FAF8F5] text-[#121c2a] font-semibold px-2 py-0.5 rounded border border-[#E8E3D7]">
                      {displayProtein}g Protein
                    </span>
                    <span className="text-[10px] bg-[#FAF8F5] text-[#121c2a] font-semibold px-2 py-0.5 rounded border border-[#E8E3D7]">
                      {displayCarbs}g Carbs
                    </span>
                  </div>
                </div>
              </div>

              {/* Smart Swap Button or Action Footer */}
              <div className="mt-3 pt-2.5 border-t border-[#E8E3D7] flex items-center justify-between">
                {meal.swapAlternative ? (
                  <div className="w-full bg-[#FAF8F5] rounded-xl p-2 flex items-center justify-between border border-[#E8E3D7]">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-[#0d6d2b] text-base">
                        published_with_changes
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-[#0d6d2b] block">
                          Therapeutic Variant
                        </span>
                        <span className="text-xs text-[#121c2a] truncate block">
                          {isSwapped ? 'Swapped to: ' + meal.swapAlternative.title : meal.swapAlternative.title}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleSwap(meal.id)}
                      className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-[#002c17] text-white text-xs font-bold shadow-sm active:scale-95 transition-all"
                      type="button"
                    >
                      {isSwapped ? 'Revert' : 'Smart Swap'}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <button
                      onClick={() => {
                        setPortionAdjustModalMeal(meal);
                        setPortionWeightGrams(200);
                      }}
                      className="text-[#0d6d2b] text-xs font-semibold flex items-center gap-1 hover:underline"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">tune</span>
                      <span>Adjust Portion (Grams)</span>
                    </button>
                    <span className="text-[11px] text-[#414942]">Cook: {meal.prepTimeText}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 6. Interactive Action Toolbar */}
      <div className="bg-[#FAF8F5] rounded-2xl p-4 shadow-sm border border-[#E8E3D7] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold font-heading text-[#121c2a]">Meal Plan Actions</span>
          <span className="text-[11px] bg-[#9ef7a4] text-[#187431] px-2 py-0.5 rounded-full font-bold">
            Smart Tools
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {/* 1. Regenerate Day Plan */}
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="w-full h-12 bg-[#002c17] hover:bg-[#14432a] text-white rounded-xl text-xs md:text-sm font-bold flex items-center justify-between px-4 shadow-sm active:scale-98 transition-all"
            type="button"
          >
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined text-xl ${isRegenerating ? 'animate-spin' : ''}`}>
                autorenew
              </span>
              <span>{isRegenerating ? 'Rebalancing Schedule...' : 'Regenerate Day Plan'}</span>
            </div>
            <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded">
              Allergy Safe
            </span>
          </button>

          {/* 2. Download Nigerian Market Shopping List */}
          <button
            onClick={onOpenMarketModal}
            className="w-full h-12 bg-white text-[#002c17] hover:bg-[#eff4ff] rounded-xl text-xs md:text-sm font-bold flex items-center justify-between px-4 shadow-sm border border-[#E8E3D7] active:scale-98 transition-all"
            type="button"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl text-[#0d6d2b]">shopping_cart</span>
              <span>Market Shopping List</span>
            </div>
            <span className="text-[11px] text-[#414942] font-medium">Mile 12 • Bodija • Utako</span>
          </button>

          {/* 3. Export PDF & Request Review */}
          <div className="grid grid-cols-2 gap-2 mt-0.5">
            <button
              onClick={handleExportPdf}
              className="h-11 bg-white hover:bg-[#eff4ff] text-[#121c2a] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm border border-[#E8E3D7] active:scale-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-lg text-[#002c17]">picture_as_pdf</span>
              <span>Export PDF Guide</span>
            </button>
            <button
              onClick={handleRequestReview}
              className="h-11 bg-white hover:bg-[#eff4ff] text-[#0d6d2b] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm border border-[#E8E3D7] active:scale-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">medical_services</span>
              <span>Dietitian Review</span>
            </button>
          </div>
        </div>
      </div>

      {/* Portion Adjustment Modal */}
      {portionAdjustModalMeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#E8E3D7] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#E8E3D7] pb-3">
              <h3 className="text-base font-bold font-heading text-[#121c2a]">Adjust Serving Weight</h3>
              <button
                onClick={() => setPortionAdjustModalMeal(null)}
                className="w-7 h-7 rounded-full bg-[#FAF8F5] text-[#414942] flex items-center justify-center hover:bg-gray-200"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <p className="text-xs text-[#414942]">
              Set weight in grams for <strong>{portionAdjustModalMeal.title}</strong> to calculate exact therapeutic calorie yield.
            </p>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-bold text-[#121c2a]">
                <span>Grams:</span>
                <span className="text-[#0d6d2b] text-base">{portionWeightGrams} g</span>
              </div>
              <input
                type="range"
                min={50}
                max={400}
                step={10}
                value={portionWeightGrams}
                onChange={(e) => setPortionWeightGrams(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-[#eff4ff] rounded-lg appearance-none cursor-pointer accent-[#14432a]"
              />
              <div className="flex justify-between text-[11px] text-[#414942]">
                <span>50g (Half wrap)</span>
                <span>200g (Standard)</span>
                <span>400g (Large)</span>
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E3D7] text-xs flex justify-between">
              <span>Recalculated Energy:</span>
              <span className="font-bold text-[#002c17]">
                {Math.round((portionAdjustModalMeal.calories * portionWeightGrams) / 200)} kcal
              </span>
            </div>

            <button
              onClick={() => {
                onToast(`Portion adjusted to ${portionWeightGrams}g (${Math.round((portionAdjustModalMeal.calories * portionWeightGrams) / 200)} kcal)`, 'done');
                setPortionAdjustModalMeal(null);
              }}
              className="w-full py-2.5 bg-[#14432a] text-white rounded-xl text-xs font-bold hover:bg-[#002c17] transition-all"
            >
              Confirm Grams
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
