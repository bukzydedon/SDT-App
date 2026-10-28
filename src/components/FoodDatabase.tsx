import React, { useState, useMemo } from 'react';
import { FoodItem } from '../types';
import { INITIAL_FOOD_DATABASE } from '../data/foodDatabase';

interface FoodDatabaseProps {
  onAddToDailyLog: (food: FoodItem, calories: number, portionLabel: string) => void;
  onToast: (msg: string, icon?: string) => void;
}

export const FoodDatabase: React.FC<FoodDatabaseProps> = ({
  onAddToDailyLog,
  onToast,
}) => {
  const [foods, setFoods] = useState<FoodItem[]>(INITIAL_FOOD_DATABASE);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterPill, setActiveFilterPill] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedRecipeIds, setExpandedRecipeIds] = useState<{ [id: string]: boolean }>({});
  const [selectedPortions, setSelectedPortions] = useState<{ [id: string]: number }>({});
  const [favorites, setFavorites] = useState<{ [id: string]: boolean }>({});

  const categories = [
    'All',
    'Swallows & Soups',
    'Rice & Grains',
    'Beans & Legumes',
    'Tubers & Plantain',
    'Snacks & Street Food',
    'Fruits & Local Veg',
  ];

  const filterPills = [
    { id: 'all', label: 'All', icon: 'auto_awesome' },
    { id: 'low-gi', label: 'Low GI (Diabetic-safe)', icon: 'health_and_safety' },
    { id: 'high-protein', label: 'High Protein', icon: 'fitness_center' },
    { id: 'low-cal', label: 'Low Calorie', icon: 'bolt' },
    { id: 'budget', label: 'Budget-friendly', icon: 'savings' },
  ];

  // Toggle favorite
  const handleToggleFavorite = (id: string, name: string) => {
    setFavorites((prev) => {
      const isFav = !prev[id];
      onToast(isFav ? `${name} added to favorites` : `${name} removed from favorites`, 'favorite');
      return { ...prev, [id]: isFav };
    });
  };

  // Toggle recipe details
  const handleToggleRecipe = (id: string) => {
    setExpandedRecipeIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Set portion multiplier
  const handleSetPortion = (foodId: string, factor: number) => {
    setSelectedPortions((prev) => ({ ...prev, [foodId]: factor }));
  };

  // Filtered food list
  const filteredFoods = useMemo(() => {
    return foods.filter((item) => {
      // Search query
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.localName && item.localName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Category tab
      if (activeCategory !== 'All' && item.category !== activeCategory) {
        return false;
      }

      // Micro filter pill
      if (activeFilterPill === 'low-gi' && item.giRating !== 'low') {
        return false;
      }
      if (activeFilterPill === 'high-protein' && item.baseProtein < 16) {
        return false;
      }
      if (activeFilterPill === 'low-cal' && item.baseCalories > 300) {
        return false;
      }
      if (activeFilterPill === 'budget') {
        const isBudget =
          item.priceRangeNgn.includes('₦50') ||
          item.priceRangeNgn.includes('₦200') ||
          item.priceRangeNgn.includes('₦450') ||
          item.priceRangeNgn.includes('₦600');
        if (!isBudget) return false;
      }

      return true;
    });
  }, [foods, searchQuery, activeFilterPill, activeCategory]);

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-4 pb-24 text-[#121c2a] space-y-4">
      {/* 1. Search Bar */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="relative w-full shadow-sm rounded-2xl">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-[#0d6d2b] text-xl">search</span>
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 450+ Nigerian foods (e.g. Ofada, Egusi, Amala, Akara)..."
            className="w-full pl-11 pr-10 py-3 bg-white text-[#121c2a] text-xs md:text-sm rounded-2xl placeholder:text-[#717972] focus:outline-none focus:ring-2 focus:ring-[#0d6d2b]/20 border border-[#E8E3D7] transition-all"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#717972] hover:text-[#121c2a]"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          ) : (
            <button
              onClick={() => onToast('Voice search ready', 'mic')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#717972] hover:text-[#0d6d2b]"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">mic</span>
            </button>
          )}
        </div>

        {/* 2. Nutritional Micro-Toggles (Filter Pills) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filterPills.map((pill) => {
            const isActive = activeFilterPill === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setActiveFilterPill(pill.id)}
                className={`filter-pill px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 active:scale-95 ${
                  isActive
                    ? 'bg-[#14432a] text-white shadow-sm'
                    : 'bg-white text-[#414942] border border-[#E8E3D7] hover:bg-[#eff4ff]'
                }`}
                type="button"
              >
                <span
                  className={`material-symbols-outlined text-sm ${
                    isActive ? 'text-[#9ef7a4]' : 'text-[#0d6d2b]'
                  }`}
                >
                  {pill.icon}
                </span>
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Indigenous Heritage Categories (Horizontal Tabs) */}
      <section className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider text-[#414942] font-bold">
            Food Categories
          </span>
          <span className="text-xs text-[#0d6d2b] font-bold">
            {filteredFoods.length} of {foods.length} Dishes
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isCatActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`category-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                  isCatActive
                    ? 'bg-[#0d6d2b] text-white shadow-sm'
                    : 'bg-[#eff4ff] text-[#414942] hover:bg-[#dee9fc]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Food Feed List */}
      <div className="flex flex-col gap-4">
        {filteredFoods.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-[#E8E3D7] flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-[#414942]">no_food</span>
            <h4 className="text-sm font-bold text-[#121c2a]">No Nigerian dishes match your filter</h4>
            <p className="text-xs text-[#414942]">
              Try searching for &lsquo;Ofada&rsquo;, &lsquo;Amala&rsquo;, &lsquo;Moi-Moi&rsquo;, or select &lsquo;All&rsquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilterPill('all');
                setActiveCategory('All');
              }}
              className="px-4 py-2 bg-[#14432a] text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFoods.map((item) => {
            const factor = selectedPortions[item.id] || 1.0;
            const currentCalories = Math.round(item.baseCalories * factor);
            const currentCarbs = Math.round(item.baseCarbs * factor);
            const currentProtein = Math.round(item.baseProtein * factor);
            const currentFat = Math.round(item.baseFat * factor);
            const isFav = favorites[item.id];
            const isExpanded = expandedRecipeIds[item.id];

            return (
              <article
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-[#E8E3D7] p-4 flex flex-col gap-3 transition-all hover:border-[#c1c9c0]"
              >
                <div className="flex gap-3">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#eff4ff] border border-[#E8E3D7]">
                    <img
                      className="w-full h-full object-cover"
                      alt={item.altText}
                      src={item.image}
                    />
                    <span className="absolute bottom-1 left-1 bg-[#002c17] text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-tight">
                      {item.category.split(' ')[0]}
                    </span>
                  </div>

                  <div className="flex flex-col flex-grow min-w-0 justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h2 className="text-sm md:text-base font-bold font-heading text-[#121c2a] leading-tight truncate">
                          {item.name}
                        </h2>
                        <button
                          type="button"
                          onClick={() => handleToggleFavorite(item.id, item.name)}
                          className="text-[#0d6d2b] hover:scale-110 transition-transform"
                          title="Save to favorites"
                        >
                          <span
                            className="material-symbols-outlined text-lg"
                            style={isFav ? { fontVariationSettings: "'FILL' 1" } : undefined}
                          >
                            {isFav ? 'favorite' : 'favorite_border'}
                          </span>
                        </button>
                      </div>
                      <p className="text-xs text-[#414942] line-clamp-1 mt-0.5">
                        {item.localName || item.dietitianNote}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      {item.dietitianVerified && (
                        <span className="bg-[#bceecb] text-[#002110] text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-xs">verified</span>
                          Verified
                        </span>
                      )}
                      <span className="bg-[#9ef7a4] text-[#187431] text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {item.tags[0] || 'Heart-safe'}
                      </span>
                      <span className="bg-[#FAF8F5] text-[#414942] text-[10px] px-2 py-0.5 rounded-full border border-[#E8E3D7]">
                        {item.priceRangeNgn}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Live Portion Controller & Nutritional Summary */}
                <div className="bg-[#FAF8F5] rounded-xl p-3 flex flex-col gap-2 border border-[#E8E3D7]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#414942]">Serving Portion</span>
                    <div className="inline-flex bg-white rounded-full p-0.5 border border-[#E8E3D7] shadow-xs">
                      {item.portionMultiplierOptions.map((opt) => {
                        const isSelected = factor === opt.factor;
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => handleSetPortion(item.id, opt.factor)}
                            className={`px-2.5 py-0.5 text-xs font-bold rounded-full transition-all ${
                              isSelected
                                ? 'bg-[#0d6d2b] text-white shadow-xs'
                                : 'text-[#414942] hover:text-[#121c2a]'
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    <div className="flex flex-col bg-white py-1.5 px-1 rounded-lg border border-[#E8E3D7]">
                      <span className="text-[10px] text-[#414942]">Energy</span>
                      <span className="text-sm font-bold text-[#121c2a]">{currentCalories}</span>
                      <span className="text-[9px] text-[#717972]">kcal</span>
                    </div>
                    <div className="flex flex-col bg-white py-1.5 px-1 rounded-lg border border-[#E8E3D7]">
                      <span className="text-[10px] text-[#414942]">Carbs</span>
                      <span className="text-sm font-bold text-[#121c2a]">{currentCarbs}g</span>
                      <span className="text-[9px] text-[#717972]">Unrefined</span>
                    </div>
                    <div className="flex flex-col bg-white py-1.5 px-1 rounded-lg border border-[#E8E3D7]">
                      <span className="text-[10px] text-[#414942]">Protein</span>
                      <span className="text-sm font-bold text-[#0d6d2b]">{currentProtein}g</span>
                      <span className="text-[9px] text-[#717972]">Bio-avail</span>
                    </div>
                    <div className="flex flex-col bg-white py-1.5 px-1 rounded-lg border border-[#E8E3D7]">
                      <span className="text-[10px] text-[#414942]">Fat</span>
                      <span className="text-sm font-bold text-[#121c2a]">{currentFat}g</span>
                      <span className="text-[9px] text-[#717972]">Healthy</span>
                    </div>
                  </div>
                </div>

                {/* Collapsible Dietitian Recipe Details */}
                {isExpanded && (
                  <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#dee9fc] text-xs space-y-1.5 animate-fadeIn">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#0d6d2b] text-base flex-shrink-0 mt-0.5">
                        medical_information
                      </span>
                      <p className="text-[#121c2a]">
                        <strong className="font-bold text-[#002c17]">Clinical Dietitian Note:</strong>{' '}
                        {item.dietitianNote}
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Footer */}
                <div className="flex items-center gap-2 pt-0.5">
                  <button
                    onClick={() => handleToggleRecipe(item.id)}
                    className="flex-1 py-2 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#121c2a] text-xs font-semibold border border-[#E8E3D7] transition-all flex items-center justify-center gap-1 active:scale-98"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {isExpanded ? 'expand_less' : 'menu_book'}
                    </span>
                    <span>{isExpanded ? 'Hide Notes' : 'Recipe Details'}</span>
                  </button>

                  <button
                    onClick={() => {
                      const selectedOpt = item.portionMultiplierOptions.find((o) => o.factor === factor);
                      const portionLabel = selectedOpt ? selectedOpt.label : `${factor}x`;
                      onAddToDailyLog(item, currentCalories, portionLabel);
                      onToast(`Added ${item.name} (${currentCalories} kcal) to daily log!`, 'add_circle');
                    }}
                    className="flex-1 py-2 rounded-xl bg-[#14432a] hover:bg-[#002c17] text-white text-xs font-bold transition-all flex items-center justify-center gap-1 active:scale-95 shadow-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">add_circle</span>
                    <span>Add to Log</span>
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
