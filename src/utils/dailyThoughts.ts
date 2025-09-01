import { t } from '../i18n/locales/i18n';

/**
 * Daily thoughts data structure
 * Each thought has a key that corresponds to translations in all language files
 */
export const DAILY_THOUGHTS = [
  'dailyThoughts.thought1',
  'dailyThoughts.thought2', 
  'dailyThoughts.thought3',
  'dailyThoughts.thought4',
  'dailyThoughts.thought5',
  'dailyThoughts.thought6',
  'dailyThoughts.thought7',
  'dailyThoughts.thought8',
  'dailyThoughts.thought9',
  'dailyThoughts.thought10'
];

/**
 * Get the current daily thought based on the day
 * Rotates through 10 thoughts every 10 days
 */
export const getDailyThought = (): string => {
  // Get current date
  const now = new Date();
  
  // Calculate days since epoch (January 1, 1970)
  const epoch = new Date(1970, 0, 1);
  const daysSinceEpoch = Math.floor((now.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24));
  
  // Get thought index (0-9) based on current day
  const thoughtIndex = daysSinceEpoch % 10;
  
  // Get the thought key for current day
  const thoughtKey = DAILY_THOUGHTS[thoughtIndex];
  
  // Return translated thought with fallback
  return t(thoughtKey, "Take time to nurture your mind and soul today.");
};

/**
 * Get a specific thought by index (for testing purposes)
 */
export const getThoughtByIndex = (index: number): string => {
  if (index < 0 || index >= DAILY_THOUGHTS.length) {
    return t('dailyThoughts.thought1', "Take time to nurture your mind and soul today.");
  }
  
  const thoughtKey = DAILY_THOUGHTS[index];
  return t(thoughtKey, "Take time to nurture your mind and soul today.");
};

/**
 * Get the current thought index (for debugging)
 */
export const getCurrentThoughtIndex = (): number => {
  const now = new Date();
  const epoch = new Date(1970, 0, 1);
  const daysSinceEpoch = Math.floor((now.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24));
  return daysSinceEpoch % 10;
};
