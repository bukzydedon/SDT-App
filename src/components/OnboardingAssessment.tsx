import React, { useState } from 'react';
import { UserProfile, HealthGoal, BudgetTier } from '../types';

interface OnboardingAssessmentProps {
  userProfile: UserProfile;
  onSave: (updatedProfile: Partial<UserProfile>) => void;
  onClose?: () => void;
  isInitialModal?: boolean;
}

export const OnboardingAssessment: React.FC<OnboardingAssessmentProps> = ({
  userProfile,
  onSave,
  onClose,
  isInitialModal = false,
}) => {
  const [goal, setGoal] = useState<HealthGoal>(userProfile.goal);
  const [gender, setGender] = useState<'female' | 'male'>(userProfile.gender);
  const [age, setAge] = useState<number>(userProfile.age);
  const [heightCm, setHeightCm] = useState<number>(userProfile.heightCm);
  const [currentWeight, setCurrentWeight] = useState<number>(userProfile.currentWeightKg);
  const [targetWeight, setTargetWeight] = useState<number>(userProfile.targetWeightKg);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [budgetTier, setBudgetTier] = useState<BudgetTier>(userProfile.budgetTier);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(
    userProfile.cuisinePreferences || [
      'Yoruba / Swallow Friendly',
      'Igbo / Ofe Soups',
      'Diabetic-Safe Portions',
      'Low-Sodium (DASH)',
    ]
  );

  const toggleCuisine = (c: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
    );
  };

  // Mifflin-St Jeor formula calculation
  const bmr = Math.round(
    gender === 'female'
      ? 10 * currentWeight + 6.25 * heightCm - 5 * age - 161
      : 10 * currentWeight + 6.25 * heightCm - 5 * age + 5
  );

  let targetKcal = Math.round(bmr * 1.25);
  if (goal === 'loss') {
    targetKcal = Math.round(bmr * 1.2 - 350);
  } else if (goal === 'gain') {
    targetKcal = Math.round(bmr * 1.3 + 300);
  } else if (goal === 'glycemic') {
    targetKcal = Math.round(bmr * 1.25 - 150);
  }

  const handleSave = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onSave({
        goal,
        gender,
        age,
        heightCm,
        currentWeightKg: currentWeight,
        targetWeightKg: targetWeight,
        budgetTier,
        cuisinePreferences: selectedCuisines,
        dailyCalorieBudget: targetKcal,
      });
      setIsSubmitting(false);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        if (onClose) onClose();
      }, 700);
    }, 600);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-4 pb-24 text-[#121c2a]">
      {/* Top Banner / Progress */}
      <section className="flex flex-col gap-1.5 mb-4">
        <div className="flex items-center justify-between text-[#414942] text-xs font-semibold">
          <span className="tracking-wide uppercase">CLINICAL ASSESSMENT &amp; BIOMETRICS</span>
          <span className="font-bold text-[#14432a]">Step 2 of 5</span>
        </div>
        <div className="w-full h-2 bg-[#e6eeff] rounded-full overflow-hidden">
          <div className="h-full bg-[#14432a] rounded-full transition-all duration-500 ease-out" style={{ width: '40%' }}></div>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="material-symbols-outlined text-[#0d6d2b] text-[18px]">verified_user</span>
          <span className="text-xs text-[#414942]">Calibrated to West African adult metabolic reference frames</span>
        </div>
      </section>

      {/* Cultural Narrative Card */}
      <section className="bg-[#eff4ff] rounded-2xl p-4 mb-5 shadow-sm border border-[#dee9fc]">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-xl bg-[#d9e3f6] overflow-hidden flex-shrink-0 shadow-sm">
            <img
              className="w-full h-full object-cover"
              alt="Warm terracotta bowl filled with wholesome Nigerian Ofada rice, fresh steamed vegetables"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo99xGUAZyKjFLvuY1ru-QIKfartP1-2gd7eNob-XrQpyQOTBaeJuxqd49ozD7YlVX58jpp9ctAIytzSl9hmAMwbB7wQr3SiZpkKBBfUNKiAoMfh4DQBHvEH_gq7VJO7dxYfgHH9JY_F99egWMqrB4bLn-xOPnROSi9ynjUu1XaWJb91VRVARovBrAGzAMSSmnNDjqnk9TzI_O03aERsoDagPRjY8_XJF9i95TXpU"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <h1 className="text-xl font-bold font-heading text-[#002c17] tracking-tight">
              Biometric Calibration &amp; Nutrition Goals
            </h1>
            <p className="text-xs text-[#414942] mt-1 leading-relaxed">
              We personalize your caloric and macronutrient targets using indigenous staples—from unpolished Ofada grains to nutrient-dense leaf soups and lean goat meat.
            </p>
          </div>
        </div>
      </section>

      <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        {/* 1. Primary Health Objective */}
        <fieldset className="flex flex-col gap-2">
          <legend className="text-base font-bold text-[#121c2a] mb-1">Primary Health Objective</legend>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              {
                id: 'loss',
                title: 'Weight Loss',
                sub: 'Healthy therapeutic deficit',
                icon: 'trending_down',
              },
              {
                id: 'gain',
                title: 'Weight Gain',
                sub: 'Lean mass & clean surplus',
                icon: 'trending_up',
              },
              {
                id: 'maintain',
                title: 'Maintenance',
                sub: 'Metabolic stamina',
                icon: 'balance',
              },
              {
                id: 'glycemic',
                title: 'Blood Sugar',
                sub: 'Low glycemic indices',
                icon: 'blood_pressure',
              },
            ].map((item) => {
              const isSelected = goal === item.id;
              return (
                <label
                  key={item.id}
                  onClick={() => setGoal(item.id as HealthGoal)}
                  className={`relative flex flex-col p-3.5 rounded-xl cursor-pointer border transition-all active:scale-[0.98] ${
                    isSelected
                      ? 'bg-[#eef8f1] border-[#0d6d2b] shadow-sm'
                      : 'bg-white border-[#E8E3D7] hover:border-[#c1c9c0]'
                  }`}
                >
                  <input
                    checked={isSelected}
                    onChange={() => setGoal(item.id as HealthGoal)}
                    className="sr-only"
                    name="health_goal"
                    type="radio"
                    value={item.id}
                  />
                  <div className="w-full flex items-center justify-between mb-1.5">
                    <span className="material-symbols-outlined text-[#14432a] text-[22px]">
                      {item.icon}
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-[#14432a]' : 'bg-[#e6eeff]'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-[#121c2a]">{item.title}</span>
                  <span className="text-xs text-[#414942] mt-0.5">{item.sub}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* 2. Gender & Age Group */}
        <section className="flex flex-col gap-3 bg-white p-4 rounded-2xl shadow-sm border border-[#E8E3D7]">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#121c2a]">Biometric Calibration</h2>
            <span className="text-[11px] font-bold px-2 py-0.5 bg-[#9ef7a4] text-[#187431] rounded-full">
              BMR Accuracy
            </span>
          </div>
          <p className="text-xs text-[#414942]">
            Required to calculate basal expenditure based on African adult lean muscle distribution.
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`flex items-center justify-between p-2.5 rounded-xl border text-sm font-semibold transition-all ${
                gender === 'female'
                  ? 'bg-[#eff4ff] border-[#14432a] text-[#002c17]'
                  : 'bg-[#FAF8F5] border-transparent text-[#414942]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${gender === 'female' ? 'border-[#14432a] bg-[#14432a]' : 'border-gray-400'}`}>
                  {gender === 'female' && <span className="w-1 h-1 bg-white rounded-full"></span>}
                </span>
                <span>Female</span>
              </div>
              <span className="material-symbols-outlined text-[20px]">female</span>
            </button>

            <button
              type="button"
              onClick={() => setGender('male')}
              className={`flex items-center justify-between p-2.5 rounded-xl border text-sm font-semibold transition-all ${
                gender === 'male'
                  ? 'bg-[#eff4ff] border-[#14432a] text-[#002c17]'
                  : 'bg-[#FAF8F5] border-transparent text-[#414942]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${gender === 'male' ? 'border-[#14432a] bg-[#14432a]' : 'border-gray-400'}`}>
                  {gender === 'male' && <span className="w-1 h-1 bg-white rounded-full"></span>}
                </span>
                <span>Male</span>
              </div>
              <span className="material-symbols-outlined text-[20px]">male</span>
            </button>
          </div>

          <div className="flex items-center justify-between bg-[#FAF8F5] px-4 py-2.5 rounded-xl border border-[#E8E3D7]">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#121c2a]">Current Age</span>
              <span className="text-xs text-[#414942]">Years</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAge(Math.max(18, age - 1))}
                className="w-8 h-8 rounded-lg bg-white text-[#14432a] font-bold text-lg flex items-center justify-center shadow-sm border border-[#E8E3D7] active:scale-95"
              >
                -
              </button>
              <span className="text-lg font-bold text-[#121c2a] w-8 text-center">{age}</span>
              <button
                type="button"
                onClick={() => setAge(Math.min(90, age + 1))}
                className="w-8 h-8 rounded-lg bg-white text-[#14432a] font-bold text-lg flex items-center justify-center shadow-sm border border-[#E8E3D7] active:scale-95"
              >
                +
              </button>
            </div>
          </div>
        </section>

        {/* 3. Anthropometrics: Height & Weight */}
        <section className="flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-sm border border-[#E8E3D7]">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#121c2a]">Stature &amp; Body Mass</h2>
            <div className="flex bg-[#eff4ff] p-0.5 rounded-full text-xs font-semibold">
              <button
                type="button"
                onClick={() => setUnit('metric')}
                className={`px-3 py-1 rounded-full transition-all ${
                  unit === 'metric' ? 'bg-[#14432a] text-white shadow-sm' : 'text-[#414942]'
                }`}
              >
                Metric (cm/kg)
              </button>
              <button
                type="button"
                onClick={() => setUnit('imperial')}
                className={`px-3 py-1 rounded-full transition-all ${
                  unit === 'imperial' ? 'bg-[#14432a] text-white shadow-sm' : 'text-[#414942]'
                }`}
              >
                Imperial (ft/lbs)
              </button>
            </div>
          </div>

          {/* Height Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-semibold text-[#414942]">Standing Height</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-[#002c17]">
                  {unit === 'metric' ? heightCm : `${Math.floor(heightCm / 30.48)}'${Math.round((heightCm % 30.48) / 2.54)}"`}
                </span>
                <span className="text-xs text-[#414942]">{unit === 'metric' ? 'cm' : 'ft/in'}</span>
              </div>
            </div>
            <input
              type="range"
              min={140}
              max={210}
              value={heightCm}
              onChange={(e) => setHeightCm(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-[#eff4ff] rounded-lg appearance-none cursor-pointer accent-[#14432a]"
            />
            <div className="flex justify-between text-[11px] text-[#414942]">
              <span>140 cm</span>
              <span>175 cm</span>
              <span>210 cm</span>
            </div>
          </div>

          {/* Weight Steppers */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="flex flex-col gap-1 bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E3D7]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#414942]">
                CURRENT WEIGHT
              </span>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-xl font-bold text-[#121c2a]">
                    {unit === 'metric' ? currentWeight : Math.round(currentWeight * 2.20462)}
                  </span>
                  <span className="text-xs text-[#414942]">{unit === 'metric' ? 'kg' : 'lbs'}</span>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setCurrentWeight(Math.max(40, currentWeight - 1))}
                    className="w-7 h-7 bg-white text-[#002c17] rounded-lg flex items-center justify-center font-bold shadow-sm border border-[#E8E3D7] active:scale-95"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentWeight(Math.min(180, currentWeight + 1))}
                    className="w-7 h-7 bg-white text-[#002c17] rounded-lg flex items-center justify-center font-bold shadow-sm border border-[#E8E3D7] active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E3D7]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#0d6d2b]">
                TARGET WEIGHT
              </span>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-xl font-bold text-[#0d6d2b]">
                    {unit === 'metric' ? targetWeight : Math.round(targetWeight * 2.20462)}
                  </span>
                  <span className="text-xs text-[#414942]">{unit === 'metric' ? 'kg' : 'lbs'}</span>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setTargetWeight(Math.max(40, targetWeight - 1))}
                    className="w-7 h-7 bg-white text-[#0d6d2b] rounded-lg flex items-center justify-center font-bold shadow-sm border border-[#E8E3D7] active:scale-95"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetWeight(Math.min(180, targetWeight + 1))}
                    className="w-7 h-7 bg-white text-[#0d6d2b] rounded-lg flex items-center justify-center font-bold shadow-sm border border-[#E8E3D7] active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-[#eff4ff] px-3.5 py-2.5 rounded-xl border border-[#dee9fc]">
            <span className="material-symbols-outlined text-[#0d6d2b] text-[20px] mt-0.5">speed</span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#121c2a]">Target Pace: Safe &amp; Sustainable</span>
              <span className="text-xs text-[#414942]">
                0.5 kg / week (Preserves lean muscle and protects resting thyroid metabolism)
              </span>
            </div>
          </div>
        </section>

        {/* 4. Regional Cuisine & Dietary Adjustments */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#121c2a]">Cuisine Traditions &amp; Health Focus</h2>
            <span className="text-xs text-[#414942]">Multi-select</span>
          </div>
          <p className="text-xs text-[#414942]">
            We adapt ancestral preparation methods (e.g. low-oil Efo, fermented Tuwo) to your therapeutic needs.
          </p>

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Yoruba / Swallow Friendly', sub: 'Amala, Ila Alasepo' },
              { label: 'Igbo / Ofe Soups', sub: 'Oha, Okazi, Utazi' },
              { label: 'Hausa / Tuwo & Grains', sub: 'Miyan Kuka, Acha' },
              { label: 'Diabetic-Safe Portions', sub: 'High-fiber swaps' },
              { label: 'Ulcer-Friendly', sub: 'Mild pepper & spices' },
              { label: 'Low-Sodium (DASH)', sub: 'Locust bean seasoning' },
            ].map((cuisine) => {
              const isChecked = selectedCuisines.includes(cuisine.label);
              return (
                <label
                  key={cuisine.label}
                  onClick={() => toggleCuisine(cuisine.label)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl cursor-pointer border transition-all ${
                    isChecked
                      ? 'bg-[#eff4ff] border-[#14432a]'
                      : 'bg-white border-[#E8E3D7] hover:border-[#c1c9c0]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-[#14432a] accent-[#14432a]"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#121c2a] leading-snug">{cuisine.label}</span>
                    <span className="text-[11px] text-[#414942]">{cuisine.sub}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </section>

        {/* 5. Cooking & Grocery Budget Preference */}
        <section className="flex flex-col gap-2 bg-white p-4 rounded-2xl shadow-sm border border-[#E8E3D7]">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#121c2a]">Market Basket Tier</h2>
            <span className="text-xs text-[#414942]">Budget Alignment</span>
          </div>
          <p className="text-xs text-[#414942]">
            Substitution lists calibrated around your local open market or supermarket preferences.
          </p>

          <div className="grid grid-cols-3 gap-2 mt-1">
            {[
              { id: 'budget', title: 'Everyday', desc: 'Open Market', icon: 'local_convenience_store' },
              { id: 'standard', title: 'Standard', desc: 'Family staples', icon: 'shopping_basket' },
              { id: 'premium', title: 'Wholefoods', desc: 'Organic cold-pressed', icon: 'eco' },
            ].map((b) => {
              const isSel = budgetTier === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBudgetTier(b.id as BudgetTier)}
                  className={`flex flex-col items-center text-center p-2.5 rounded-xl border transition-all ${
                    isSel ? 'bg-[#eff4ff] border-[#14432a]' : 'bg-[#FAF8F5] border-[#E8E3D7]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[#002c17] text-[22px] mb-1">
                    {b.icon}
                  </span>
                  <span className="text-xs font-bold text-[#121c2a]">{b.title}</span>
                  <span className="text-[10px] text-[#414942] mt-0.5">{b.desc}</span>
                  <div className={`w-full h-1 mt-2 rounded-full ${isSel ? 'bg-[#14432a]' : 'bg-transparent'}`}></div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 6. Live Metabolic Forecast */}
        <section className="bg-[#14432a] text-white p-4 rounded-2xl shadow-md flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#9ef7a4] text-[20px]">bolt</span>
              <span className="text-xs font-bold tracking-wider text-[#9ef7a4] uppercase">
                LIVE METABOLIC FORECAST
              </span>
            </div>
            <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full text-white">
              Mifflin-St Jeor (African Ref)
            </span>
          </div>

          <div className="flex items-baseline justify-between py-1">
            <div className="flex flex-col">
              <span className="text-xs opacity-80">Estimated BMR</span>
              <span className="text-2xl font-bold font-heading">{bmr.toLocaleString()} kcal</span>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="flex flex-col items-end">
              <span className="text-xs opacity-80">Target Daily Intake</span>
              <span className="text-2xl font-bold font-heading text-[#9ef7a4]">
                {targetKcal.toLocaleString()} kcal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl text-xs leading-snug">
            <span className="material-symbols-outlined text-[#9ef7a4] text-[18px] flex-shrink-0">
              restaurant_menu
            </span>
            <p>
              Calibrated for whole-food Nigerian meal distributions (Efo Riro, Ofada, Moi Moi).
            </p>
          </div>
        </section>

        {/* 7. Clinical Disclaimer */}
        <div className="flex items-start gap-2 bg-[#dee9fc]/70 text-[#414942] p-3 rounded-xl border border-[#c1c9c0]/50 text-xs">
          <span className="material-symbols-outlined text-[#14432a] text-[20px] mt-0.5 flex-shrink-0">
            info
          </span>
          <p>
            <strong className="text-[#121c2a]">Educational Guidance:</strong> This therapeutic nutritional framework does not substitute individualized physician diagnosis, lab consultations, or nephrology clearances.
          </p>
        </div>

        {/* 8. Save Action Button */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-[#14432a] hover:bg-[#002c17] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                <span>Calculating Therapeutic Target...</span>
              </>
            ) : savedSuccess ? (
              <>
                <span className="material-symbols-outlined text-[20px] text-[#9ef7a4]">done</span>
                <span>Assessment Saved &amp; Calibrated!</span>
              </>
            ) : (
              <>
                <span>Save &amp; Calibrate Diet Targets</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </>
            )}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-xs font-semibold text-[#414942] hover:text-[#121c2a]"
            >
              Close Assessment
            </button>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[#414942] text-xs mt-1">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Secure &amp; encrypted Nigerian health data standards</span>
          </div>
        </div>
      </form>
    </div>
  );
};
