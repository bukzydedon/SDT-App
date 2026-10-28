export type UserRole = 'free' | 'premium' | 'dietitian' | 'admin';

export type HealthGoal = 'loss' | 'gain' | 'maintain' | 'glycemic';

export type BudgetTier = 'budget' | 'standard' | 'premium';

export interface UserProfile {
  name: string;
  avatar: string;
  role: UserRole;
  gender: 'female' | 'male';
  age: number;
  heightCm: number;
  currentWeightKg: number;
  targetWeightKg: number;
  goal: HealthGoal;
  streakDays: number;
  dayInCycle: number;
  totalCycleDays: number;
  budgetTier: BudgetTier;
  cuisinePreferences: string[];
  allergiesAndConditions: string[];
  waterIntakeL: number;
  waterTargetL: number;
  dailyCalorieBudget: number;
  dailyCalorieConsumed: number;
  dailyCarbsG: number;
  dailyProteinG: number;
  dailyFatG: number;
}

export interface FoodItem {
  id: string;
  name: string;
  localName?: string;
  category: 'Swallows & Soups' | 'Rice & Grains' | 'Beans & Legumes' | 'Tubers & Plantain' | 'Snacks & Street Food' | 'Fruits & Local Veg';
  image: string;
  altText: string;
  baseCalories: number;
  baseCarbs: number;
  baseProtein: number;
  baseFat: number;
  baseServingLabel: string;
  baseGrams?: number;
  giRating: 'low' | 'medium' | 'high';
  priceRangeNgn: string;
  dietitianVerified: boolean;
  tags: string[];
  dietitianNote: string;
  portionMultiplierOptions: { label: string; factor: number }[];
  isFavorite?: boolean;
}

export interface PlannedMeal {
  id: string;
  slot: 'Breakfast' | 'Mid-Morning Snack' | 'Lunch' | 'Dinner';
  time: string;
  title: string;
  description: string;
  image: string;
  altText: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  estimatedCostNgn: number;
  badge: string;
  healthBenefit: string;
  prepTimeText: string;
  isLogged: boolean;
  swapAlternative?: {
    title: string;
    description: string;
    calories: number;
    proteinG: number;
    carbsG: number;
    image: string;
  };
}

export interface DayPlan {
  dayNum: number;
  dayName: string;
  dateNumber: number;
  targetCalories: number;
  deficitPacing: number;
  leanProteinTargetG: number;
  meals: PlannedMeal[];
}

export interface MarketItem {
  id: string;
  name: string;
  quantity: string;
  priceNgn: number;
  marketType: 'open-market' | 'supermarket';
  checked: boolean;
}
