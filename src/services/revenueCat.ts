// Minimal RevenueCat initialization wrapper.
// Note: Replace placeholders after you share your RevenueCat API key and app user ID logic.

import Purchases from 'react-native-purchases';

let initialized = false;

export const initRevenueCat = async (apiKey: string, appUserId?: string) => {
  if (initialized) return;
  // Configure Purchases SDK
  Purchases.setDebugLogsEnabled(__DEV__);
  await Purchases.configure({ apiKey, appUserId });
  initialized = true;
};

export const getOfferings = async () => {
  return Purchases.getOfferings();
};

export const getCustomerInfo = async () => {
  return Purchases.getCustomerInfo();
};

export const purchasePackage = async (pack: any) => {
  // pack should be type PurchasesPackage; using any to avoid importing types pre-setup
  return Purchases.purchasePackage(pack);
};

export const restore = async () => {
  return Purchases.restorePurchases();
};
