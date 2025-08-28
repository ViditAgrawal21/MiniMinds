import AsyncStorage from "@react-native-async-storage/async-storage";

const WELLNESS_SCORE_KEY = "wellnessScore";
const ONBOARDING_KEY = "onboardingResponses";

/**
 * Get the dynamic wellness score. Falls back to onboarding overall score
 * if dynamic score not yet initialized. Does NOT mutate storage.
 */
export const getWellnessScore = async (): Promise<number> => {
  try {
    const stored = await AsyncStorage.getItem(WELLNESS_SCORE_KEY);
    if (stored !== null) {
      const n = parseInt(stored, 10);
      if (!isNaN(n)) return Math.min(100, Math.max(0, n));
    }
    // fallback to onboarding
    const onboarding = await AsyncStorage.getItem(ONBOARDING_KEY);
    if (onboarding) {
      const parsed = JSON.parse(onboarding);
      const base = parsed?.overallOnboardingScore ?? 0;
      return Math.min(100, Math.max(0, Number(base) || 0));
    }
  } catch (e) {
  console.warn("getWellnessScore error", e);
  }
  return 0;
};

/**
 * Ensure a dynamic wellness score entry exists; if not, initialize from onboarding.
 */
export const ensureWellnessScoreInitialized = async (): Promise<number> => {
  const existing = await AsyncStorage.getItem(WELLNESS_SCORE_KEY);
  if (existing !== null) {
    const n = parseInt(existing, 10);
    return isNaN(n) ? 0 : n;
  }
  const onboarding = await AsyncStorage.getItem(ONBOARDING_KEY);
  let base = 0;
  if (onboarding) {
    try {
      const parsed = JSON.parse(onboarding);
      base = parsed?.overallOnboardingScore ?? 0;
    } catch {}
  }
  const clamped = Math.min(100, Math.max(0, Number(base) || 0));
  await AsyncStorage.setItem(WELLNESS_SCORE_KEY, String(clamped));
  return clamped;
};

/**
 * Increment wellness score by delta (XP gained) capped at 100.
 * If not initialized, initializes first from onboarding baseline.
 * Returns the new score and the applied delta (may be less than requested if capped).
 */
export const incrementWellnessScore = async (
  delta: number,
): Promise<{ newScore: number; appliedDelta: number }> => {
  if (!delta || delta <= 0) {
    const current = await getWellnessScore();
    return { newScore: current, appliedDelta: 0 };
  }
  const current = await ensureWellnessScoreInitialized();
  if (current >= 100) {
    return { newScore: 100, appliedDelta: 0 };
  }
  const target = current + delta;
  const newScore = target > 100 ? 100 : target;
  const appliedDelta = newScore - current;
  try {
    await AsyncStorage.setItem(WELLNESS_SCORE_KEY, String(newScore));
  } catch (e) {
    console.warn("incrementWellnessScore persist error", e);
  }
  return { newScore, appliedDelta };
};
