
// React Native IAP implementation for in-app purchases
// Complete implementation following react-native-iap v14+ documentation

import {
  Product,
  Purchase,
  PurchaseError,
  initConnection,
  endConnection,
  fetchProducts,
  requestPurchase,
  finishTransaction,
  acknowledgePurchaseAndroid,
  getAvailablePurchases,
  purchaseUpdatedListener,
  purchaseErrorListener,
} from 'react-native-iap';
import { Platform } from 'react-native';

let isConnected = false;
let purchaseUpdateSubscription: any = null;
let purchaseErrorSubscription: any = null;

// Check if we're in a testing environment (emulator or without Google Play Services)
const isTestingEnvironment = () => {
  // In React Native, __DEV__ is available globally
  return __DEV__;
};

// Product SKUs - Updated for ThoughtPro
const productSkus = Platform.select({
  ios: [
    'com.thoughtpro.premium_lifetime',
  ],
  android: [
    'premium_lifetime',
  ],
}) || [];

const subscriptionSkus = Platform.select({
  ios: [
    'com.thoughtpro.thoughtpro_subscriptions',  // iOS subscription product ID
  ],
  android: [
    'thoughtpro_subscriptions',  // Android subscription product ID from Google Play Console
  ],
}) || [];

/**
 * Initialize IAP connection with better error handling
 */
export const initIAP = async (): Promise<boolean> => {
  try {
    if (isConnected) return true;
    
    const result = await initConnection();
    console.log('IAP connection result:', result);
    isConnected = result;
    
    if (isConnected) {
      // Setup purchase listeners
      setupPurchaseListeners();
    }
    
    return isConnected;
  } catch (error: any) {
    console.error('Failed to initialize IAP:', error);
    
    // Handle specific billing errors
    if (error.code === 'E_BILLING_UNAVAILABLE') {
      console.warn('Billing unavailable - this is expected in development/emulator');
      console.warn('To test IAP:');
      console.warn('1. Use a real Android device with Google Play Services');
      console.warn('2. Upload your app to Google Play Console (internal testing)');
      console.warn('3. Sign your app with the same key as uploaded to Play Console');
      console.warn('4. Add test accounts in Google Play Console');
    }
    
    return false;
  }
};

/**
 * End IAP connection
 */
export const closeIAP = async (): Promise<void> => {
  try {
    // Remove listeners
    if (purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }
    if (purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    }
    
    if (isConnected) {
      await endConnection();
      isConnected = false;
    }
  } catch (error) {
    console.error('Error closing IAP connection:', error);
  }
};

/**
 * Get available products (one-time purchases)
 */
export const getAvailableProducts = async (): Promise<Product[]> => {
  try {
    if (!isConnected) {
      await initIAP();
    }
    
    const products = await fetchProducts({
      skus: productSkus,
      type: 'inapp',
    });
    console.log('Available products:', products);
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

/**
 * Mock functions for development/testing when billing is unavailable
 */
const mockProduct = {
  productId: 'thoughtpro_subscriptions',
  title: 'ThoughtPro Premium Subscription (Mock)',
  description: 'All‑in free access, 10+ Scans, Primary & Secondary Interventions, Video Tertiary Content',
  displayPrice: '₹299.00', // Mock price matching your plan-299
  currency: 'INR',
  localizedPrice: '₹299.00',
  productIds: ['thoughtpro_subscriptions'],
  id: 'thoughtpro_subscriptions',
  type: 'subs' as const,
} as any; // Use any for mock data in development

const mockSubscriptionForDev = (): Product[] => {
  console.log('🧪 Using mock subscription data for development');
  return [mockProduct];
};

const mockPurchaseForDev = async (): Promise<boolean> => {
  console.log('🧪 Mock purchase successful - In production, this would be a real purchase');
  // In development, you might want to store this in AsyncStorage
  // await AsyncStorage.setItem('mock_subscription_active', 'true');
  return true;
};

const mockHasSubscriptionForDev = async (): Promise<boolean> => {
  console.log('🧪 Mock subscription check - returning true for development');
  // In development, you might want to read from AsyncStorage
  // const hasSubscription = await AsyncStorage.getItem('mock_subscription_active');
  // return hasSubscription === 'true';
  return true; // Return true for development testing
};

/**
 * Get available subscriptions
 */

export const getAvailableSubscriptions = async (): Promise<Product[]> => {
  try {
    if (!isConnected) {
      const connected = await initIAP();
      if (!connected && isTestingEnvironment()) {
        console.log('🧪 Billing unavailable - using mock subscriptions for development');
        return mockSubscriptionForDev();
      }
      if (!connected) {
        return [];
      }
    }
    
    const subscriptions = await fetchProducts({
      skus: subscriptionSkus,
      type: 'subs',
    });
    console.log('Available subscriptions:', subscriptions);
    return subscriptions;
  } catch (error) {
    console.error('Error getting subscriptions:', error);
    
    // If billing is unavailable and we're in development, return mock data
    if (isTestingEnvironment()) {
      console.log('🧪 Using mock subscriptions due to billing error in development');
      return mockSubscriptionForDev();
    }
    
    return [];
  }
};

/**
 * Purchase a product (one-time purchase)
 */
export const purchaseProduct = async (sku: string): Promise<boolean> => {
  try {
    if (!isConnected) {
      await initIAP();
    }
    
    await requestPurchase({
      request: {
        ios: { sku },
        android: { skus: [sku] },
      },
      type: 'inapp',
    });
    
    // Purchase result will be handled by purchaseUpdatedListener
    return true;
  } catch (error) {
    console.error('Purchase failed:', error);
    handlePurchaseError(error as PurchaseError);
    return false;
  }
};

/**
 * Purchase ThoughtPro subscription with specific base plan
 */
export const purchaseThoughtProSubscription = async (basePlanId: 'plan-299' | 'plan-yearly' = 'plan-299'): Promise<boolean> => {
  try {
    if (!isConnected) {
      const connected = await initIAP();
      if (!connected && isTestingEnvironment()) {
        console.log('🧪 Billing unavailable - using mock purchase for development');
        return await mockPurchaseForDev();
      }
      if (!connected) {
        return false;
      }
    }
    
    // Get the subscription product to access the offer token
    const subscriptions = await getAvailableSubscriptions();
    console.log('All available subscriptions for purchase:', subscriptions);
    
    if (subscriptions.length === 0) {
      throw new Error('No subscriptions available');
    }
    
    // Find our target subscription
    let targetSubscription = subscriptions.find(sub => sub.id === 'thoughtpro_subscriptions');
    
    if (!targetSubscription) {
      // Try alternative SKU formats
      targetSubscription = subscriptions.find(sub => 
        sub.id === 'com.thoughtpro.thoughtpro_subscriptions' ||
        sub.id.includes('thoughtpro_subscriptions') ||
        sub.id.includes('thoughtpro')
      );
    }
    
    if (!targetSubscription) {
      // Just use the first available subscription for testing
      targetSubscription = subscriptions[0];
      console.warn('⚠️ Using first available subscription for purchase:', targetSubscription.id);
    }
    
    console.log('Selected subscription for purchase:', targetSubscription);
    console.log('Subscription offer details:', (targetSubscription as any).subscriptionOfferDetailsAndroid);
    
    const purchaseSku = targetSubscription.id;
    console.log(`Attempting to purchase subscription with SKU: ${purchaseSku} and base plan: ${basePlanId}`);
    
    // For Android subscriptions with base plans, we need to use subscriptionOffers
    if (Platform.OS === 'android' && (targetSubscription as any).subscriptionOfferDetailsAndroid) {
      const offerDetails = (targetSubscription as any).subscriptionOfferDetailsAndroid;
      
      // Find the specific base plan offer
      const basePlanOffer = offerDetails.find((offer: any) => offer.basePlanId === basePlanId);
      
      if (!basePlanOffer) {
        console.error(`Base plan ${basePlanId} not found. Available base plans:`, 
          offerDetails.map((offer: any) => offer.basePlanId));
        // Fallback to first available offer
        const fallbackOffer = offerDetails[0];
        if (fallbackOffer) {
          console.warn(`Using fallback base plan: ${fallbackOffer.basePlanId}`);
          const offerToken = fallbackOffer.offerToken;
          
          await requestPurchase({
            request: {
              ios: { sku: purchaseSku },
              android: { 
                skus: [purchaseSku],
                subscriptionOffers: [{ 
                  sku: purchaseSku,
                  offerToken: offerToken
                }]
              },
            },
            type: 'subs',
          });
          console.log('✅ Purchase request successful with fallback base plan');
          return true;
        } else {
          throw new Error('No valid base plans found');
        }
      }
      
      const offerToken = basePlanOffer.offerToken;
      
      if (!offerToken) {
        console.error('No offer token found for base plan:', basePlanId);
        throw new Error(`No offer token found for base plan: ${basePlanId}`);
      }
      
      console.log('Using base plan:', basePlanId);
      console.log('Using offer token:', offerToken);
      
      await requestPurchase({
        request: {
          ios: { sku: purchaseSku },
          android: { 
            skus: [purchaseSku],
            subscriptionOffers: [{ 
              sku: purchaseSku,
              offerToken: offerToken
            }]
          },
        },
        type: 'subs',
      });
      console.log('✅ Purchase request successful with specified base plan');
      
    } else {
      // Fallback for iOS or subscriptions without base plans
      console.log('🔄 Using fallback purchase method (iOS or no base plans)');
      await requestPurchase({
        request: {
          ios: { sku: purchaseSku },
          android: { skus: [purchaseSku] },
        },
        type: 'subs',
      });
      console.log('✅ Purchase request successful with fallback method');
    }
    
    return true;
  } catch (error) {
    console.error('ThoughtPro subscription purchase failed:', error);
    
    // If billing is unavailable and we're in development, use mock purchase
    if (isTestingEnvironment()) {
      console.log('🧪 Using mock purchase due to billing error in development');
      return await mockPurchaseForDev();
    }
    
    handlePurchaseError(error as PurchaseError);
    return false;
  }
};

/**
 * Purchase monthly subscription (plan-299)
 */
export const purchaseMonthlySubscription = async (): Promise<boolean> => {
  return await purchaseThoughtProSubscription('plan-299');
};

/**
 * Purchase yearly subscription (plan-yearly)
 */
export const purchaseYearlySubscription = async (): Promise<boolean> => {
  return await purchaseThoughtProSubscription('plan-yearly');
};

/**
 * Debug function to verify subscription configuration
 */
export const debugSubscriptionSetup = async (): Promise<void> => {
  try {
    console.log('🔍 Debugging ThoughtPro subscription setup...');
    console.log('🔍 Platform:', Platform.OS);
    console.log('🔍 Expected subscription SKUs:', subscriptionSkus);
    console.log('🔍 Expected base plans: plan-299 (monthly), plan-yearly (yearly)');
    
    // Initialize IAP connection
    const connected = await initIAP();
    console.log('🔍 IAP connected:', connected);
    
    if (!connected) {
      console.log('❌ Cannot debug without IAP connection');
      return;
    }
    
    // Get available subscriptions
    console.log('🔄 Fetching available subscriptions...');
    const subscriptions = await getAvailableSubscriptions();
    console.log('🔍 Available subscriptions count:', subscriptions.length);
    console.log('🔍 Full subscription data:', JSON.stringify(subscriptions, null, 2));
    
    if (subscriptions.length === 0) {
      console.log('❌ No subscriptions available - check Google Play Console configuration');
      console.log('🚨 CRITICAL ISSUES TO CHECK:');
      console.log('1. Is subscription "thoughtpro_subscriptions" PUBLISHED in Play Console?');
      console.log('2. Are base plans (plan-299, plan-yearly) ACTIVE?');
      console.log('3. Is your app uploaded to Play Console (even for testing)?');
      console.log('4. Is package name matching: com.thoughtpro?');
      console.log('5. Is app signed with SAME KEY as uploaded to Play Console?');
      console.log('6. Are you testing with SAME ACCOUNT that uploaded the app?');
      console.log('7. Is your test account added in Play Console → Setup → License testing?');
      return;
    }
    
    subscriptions.forEach((sub, index) => {
      console.log(`🔍 Subscription ${index + 1}:`, {
        id: sub.id,
        title: sub.title,
        displayName: (sub as any).displayName,
        displayPrice: sub.displayPrice,
        currency: (sub as any).currency,
        platform: (sub as any).platform,
        type: (sub as any).type,
        hasOfferDetails: !!(sub as any).subscriptionOfferDetailsAndroid,
        offerDetailsCount: (sub as any).subscriptionOfferDetailsAndroid?.length || 0
      });
      
      if ((sub as any).subscriptionOfferDetailsAndroid) {
        (sub as any).subscriptionOfferDetailsAndroid.forEach((offer: any, offerIndex: number) => {
          console.log(`🔍   Base Plan ${offerIndex + 1}:`, {
            basePlanId: offer.basePlanId,
            offerToken: offer.offerToken?.substring(0, 20) + '...',
            pricingPhases: offer.pricingPhases?.length || 0,
            isExpectedPlan: offer.basePlanId === 'plan-299' || offer.basePlanId === 'plan-yearly'
          });
          
          if (offer.pricingPhases) {
            offer.pricingPhases.forEach((phase: any, phaseIndex: number) => {
              console.log(`🔍     Pricing Phase ${phaseIndex + 1}:`, {
                billingPeriod: phase.billingPeriod,
                formattedPrice: phase.formattedPrice,
                priceCurrencyCode: phase.priceCurrencyCode,
                billingCycleCount: phase.billingCycleCount
              });
            });
          }
        });
      }
    });
    
    // Test different SKU matching strategies
    console.log('🔍 Testing SKU matching strategies:');
    
    const strategies = [
      { name: 'Exact match "thoughtpro_subscriptions"', test: (sub: any) => sub.id === 'thoughtpro_subscriptions' },
      { name: 'With prefix "com.thoughtpro.thoughtpro_subscriptions"', test: (sub: any) => sub.id === 'com.thoughtpro.thoughtpro_subscriptions' },
      { name: 'Contains "thoughtpro_subscriptions"', test: (sub: any) => sub.id.includes('thoughtpro_subscriptions') },
      { name: 'Contains "thoughtpro"', test: (sub: any) => sub.id.includes('thoughtpro') },
      { name: 'First available', test: () => true }
    ];
    
    for (const strategy of strategies) {
      const found = subscriptions.find(strategy.test);
      console.log(`🔍 ${strategy.name}:`, found ? `✅ Found: ${found.id}` : '❌ Not found');
      if (found && strategy.name.includes('First available')) break;
    }
    
    // Check for expected base plans
    const targetSubscription = subscriptions.find(sub => 
      sub.id === 'thoughtpro_subscriptions' || 
      sub.id === 'com.thoughtpro.thoughtpro_subscriptions' ||
      sub.id.includes('thoughtpro_subscriptions') ||
      subscriptions[0]
    );
    
    if (targetSubscription && (targetSubscription as any).subscriptionOfferDetailsAndroid) {
      const offers = (targetSubscription as any).subscriptionOfferDetailsAndroid;
      const monthlyPlan = offers.find((offer: any) => offer.basePlanId === 'plan-299');
      const yearlyPlan = offers.find((offer: any) => offer.basePlanId === 'plan-yearly');
      
      console.log('🎯 Base Plan Check:');
      console.log('  Monthly plan (plan-299):', monthlyPlan ? '✅ Found' : '❌ Missing');
      console.log('  Yearly plan (plan-yearly):', yearlyPlan ? '✅ Found' : '❌ Missing');
      
      if (monthlyPlan) {
        console.log('  Monthly plan details:', {
          basePlanId: monthlyPlan.basePlanId,
          hasOfferToken: !!monthlyPlan.offerToken,
          pricingPhases: monthlyPlan.pricingPhases?.length || 0
        });
      }
      
      if (yearlyPlan) {
        console.log('  Yearly plan details:', {
          basePlanId: yearlyPlan.basePlanId,
          hasOfferToken: !!yearlyPlan.offerToken,
          pricingPhases: yearlyPlan.pricingPhases?.length || 0
        });
      }
      
      if (!monthlyPlan || !yearlyPlan) {
        console.log('🚨 MISSING BASE PLANS - CHECK PLAY CONSOLE:');
        console.log('1. Go to Play Console → Your App → Monetize → Subscriptions');
        console.log('2. Click on "thoughtpro_subscriptions"');
        console.log('3. Ensure both base plans are created and ACTIVE:');
        console.log('   - plan-299 (monthly, ₹299)');
        console.log('   - plan-yearly (yearly, ₹999)');
        console.log('4. Make sure subscription is PUBLISHED (not just saved as draft)');
      }
    } else {
      console.log('❌ No valid subscription found with expected structure');
      console.log('🚨 SUBSCRIPTION SETUP ISSUES:');
      console.log('1. Subscription ID should be exactly: thoughtpro_subscriptions');
      console.log('2. Check if subscription is published in Play Console');
      console.log('3. Ensure base plans are properly configured');
    }
    
    if (targetSubscription) {
      console.log('🎯 Will use this subscription for purchase:', {
        id: targetSubscription.id,
        title: targetSubscription.title,
        displayPrice: targetSubscription.displayPrice
      });
    }
    
    // Additional diagnostic info
    console.log('🔍 App Package Name Check:');
    console.log('Expected: com.thoughtpro');
    console.log('Make sure this matches your Play Console app package name!');
    
    console.log('🔍 Testing Environment Check:');
    console.log('- Are you using a real Android device (not emulator)?');
    console.log('- Is Google Play Services available and updated?');
    console.log('- Is your app signed with the SAME keystore as uploaded to Play Console?');
    console.log('- Are you testing with an account that has access to the app in Play Console?');
    
  } catch (error) {
    console.error('❌ Error debugging subscription setup:', error);
    console.log('🚨 NETWORK/CONNECTION ISSUES:');
    console.log('1. Check internet connection');
    console.log('2. Ensure Google Play Services is working');
    console.log('3. Try restarting the app');
  }
};

/**
 * Purchase a subscription with enhanced error handling
 */
export const purchaseSubscription = async (sku: string): Promise<boolean> => {
  try {
    if (!isConnected) {
      await initIAP();
    }
    
    console.log(`Attempting to purchase subscription: ${sku}`);
    
    await requestPurchase({
      request: {
        ios: { sku },
        android: { 
          skus: [sku],
          // For Android subscriptions with multiple base plans
          // You may need to specify the subscription offer token
          // subscriptionOffers: [{ sku, offerToken: 'your-base-plan-offer-token' }]
        },
      },
      type: 'subs',
    });
    
    // Purchase result will be handled by purchaseUpdatedListener
    return true;
  } catch (error) {
    console.error('Subscription purchase failed:', error);
    handlePurchaseError(error as PurchaseError);
    return false;
  }
};

/**
 * Restore purchases
 */
export const restorePurchases = async (): Promise<Purchase[]> => {
  try {
    if (!isConnected) {
      await initIAP();
    }
    
    const purchases = await getAvailablePurchases({
      onlyIncludeActiveItemsIOS: true,
    });
    console.log('Restored purchases:', purchases);
    
    // Process restored purchases
    for (const purchase of purchases) {
      await processPurchase(purchase);
    }
    
    return purchases;
  } catch (error) {
    console.error('Error restoring purchases:', error);
    return [];
  }
};

/**
 * Get subscription status with detailed information
 */
export const getSubscriptionStatus = async (): Promise<{
  isActive: boolean;
  productId?: string;
  expirationDate?: number;
  autoRenewing?: boolean;
}> => {
  try {
    const purchases = await getAvailablePurchases({
      onlyIncludeActiveItemsIOS: true,
    });
    
    // Find the most recent subscription
    const activeSubscription = purchases.find(
      purchase => subscriptionSkus.includes(purchase.productId)
    );
    
    if (activeSubscription) {
      return {
        isActive: true,
        productId: activeSubscription.productId,
        expirationDate: activeSubscription.transactionDate,
        autoRenewing: true, // Can be determined from purchase data on Android
      };
    }
    
    return { isActive: false };
  } catch (error) {
    console.error('Error getting subscription status:', error);
    return { isActive: false };
  }
};

/**
 * Check if user has ThoughtPro subscription active
 */
export const hasThoughtProSubscription = async (): Promise<boolean> => {
  try {
    if (!isConnected) {
      const connected = await initIAP();
      if (!connected && isTestingEnvironment()) {
        console.log('🧪 Billing unavailable - using mock subscription check for development');
        return await mockHasSubscriptionForDev();
      }
      if (!connected) {
        return false;
      }
    }
    
    const purchases = await getAvailablePurchases({
      onlyIncludeActiveItemsIOS: true,
    });
    
    const subscriptionSku = Platform.OS === 'android' ? 'thoughtpro_subscriptions' : 'com.thoughtpro.thoughtpro_subscriptions';
    const activeSubscription = purchases.find(
      purchase => purchase.productId === subscriptionSku
    );
    
    return !!activeSubscription;
  } catch (error) {
    console.error('Error checking ThoughtPro subscription status:', error);
    
    // If billing is unavailable and we're in development, use mock check
    if (isTestingEnvironment()) {
      console.log('🧪 Using mock subscription check due to billing error in development');
      return await mockHasSubscriptionForDev();
    }
    
    return false;
  }
};

/**
 * Get detailed subscription information
 */
export const getThoughtProSubscriptionInfo = async (): Promise<{
  isActive: boolean;
  basePlan?: string;
  productId?: string;
  expirationDate?: number;
  autoRenewing?: boolean;
}> => {
  try {
    const purchases = await getAvailablePurchases({
      onlyIncludeActiveItemsIOS: true,
    });
    
    const subscriptionSku = Platform.OS === 'android' ? 'thoughtpro_subscriptions' : 'com.thoughtpro.thoughtpro_subscriptions';
    const activeSubscription = purchases.find(
      purchase => purchase.productId === subscriptionSku
    );
    
    if (activeSubscription) {
      // Try to extract base plan info from Android purchase data
      let basePlan: string | undefined;
      if (Platform.OS === 'android' && (activeSubscription as any).productIds) {
        // Check if purchase data contains base plan information
        const androidPurchase = activeSubscription as any;
        if (androidPurchase.obfuscatedProfileIdAndroid || androidPurchase.obfuscatedAccountIdAndroid) {
          // These fields might contain base plan info in some cases
          basePlan = 'unknown'; // You might need to parse this differently based on your implementation
        }
      }
      
      return {
        isActive: true,
        basePlan,
        productId: activeSubscription.productId,
        expirationDate: activeSubscription.transactionDate,
        autoRenewing: true,
      };
    }
    
    return { isActive: false };
  } catch (error) {
    console.error('Error getting ThoughtPro subscription info:', error);
    return { isActive: false };
  }
};

/**
 * Check if user has any active premium subscription
 */
export const hasPremiumAccess = async (): Promise<boolean> => {
  try {
    const subscriptionStatus = await getSubscriptionStatus();
    return subscriptionStatus.isActive;
  } catch (error) {
    console.error('Error checking premium access:', error);
    return false;
  }
};

/**
 * Check if user has active subscription (backward compatibility)
 */
export const hasActiveSubscription = async (subscriptionSku?: string): Promise<boolean> => {
  try {
    const purchases = await getAvailablePurchases({
      onlyIncludeActiveItemsIOS: true,
    });
    
    if (subscriptionSku) {
      // Check specific subscription
      const activeSubscription = purchases.find(
        purchase => purchase.productId === subscriptionSku
      );
      return !!activeSubscription;
    } else {
      // Check any premium subscription
      const activeSubscription = purchases.find(
        purchase => subscriptionSkus.includes(purchase.productId)
      );
      return !!activeSubscription;
    }
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return false;
  }
};

/**
 * Get all available purchases
 */
export const getAllPurchases = async (): Promise<Purchase[]> => {
  try {
    if (!isConnected) {
      await initIAP();
    }
    
    const purchases = await getAvailablePurchases();
    console.log('All purchases:', purchases);
    return purchases;
  } catch (error) {
    console.error('Error getting purchases:', error);
    return [];
  }
};

/**
 * Process a successful purchase
 */
const processPurchase = async (purchase: Purchase): Promise<void> => {
  try {
    console.log('Processing purchase:', purchase);
    
    // Validate purchase with your server here
    const isValid = await validatePurchase(purchase);
    
    if (isValid) {
      // Grant access to premium features
      console.log('Purchase validated successfully');
      
      // Finish the transaction
      await finishTransaction({ purchase, isConsumable: false });
      
      // For Android, acknowledge the purchase
      if (Platform.OS === 'android' && purchase.purchaseToken) {
        await acknowledgePurchaseAndroid(purchase.purchaseToken);
      }
    } else {
      console.error('Purchase validation failed');
    }
  } catch (error) {
    console.error('Error processing purchase:', error);
  }
};

/**
 * Setup purchase listeners
 */
const setupPurchaseListeners = () => {
  // Listen for successful purchases
  purchaseUpdateSubscription = purchaseUpdatedListener((purchase: Purchase) => {
    console.log('Purchase updated:', purchase);
    processPurchase(purchase);
  });

  // Listen for purchase errors
  purchaseErrorSubscription = purchaseErrorListener((error: PurchaseError) => {
    console.error('Purchase error:', error);
    handlePurchaseError(error);
  });
};

/**
 * Validate purchase with your server
 */
export const validatePurchase = async (purchase: Purchase): Promise<boolean> => {
  try {
    // This is where you would send the receipt to your server for validation
    // Example implementation:
    
    if (Platform.OS === 'ios') {
      // Send receipt to your server for iOS validation
      // const response = await fetch('your-server.com/validate-ios-receipt', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     receiptData: purchase.transactionReceipt,
      //     productId: purchase.productId,
      //   }),
      // });
      // return response.ok;
    } else {
      // Send purchase token to your server for Android validation
      // const response = await fetch('your-server.com/validate-android-purchase', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     purchaseToken: purchase.purchaseToken,
      //     productId: purchase.productId,
      //   }),
      // });
      // return response.ok;
    }
    
    // For now, return true (replace with actual server validation)
    console.log('Purchase validation needed for:', purchase.productId);
    return true;
  } catch (error) {
    console.error('Error validating purchase:', error);
    return false;
  }
};

/**
 * Handle purchase errors
 */
const handlePurchaseError = (error: PurchaseError) => {
  console.log('🚨 Purchase error details:', error);
  console.log('🚨 Error code:', error.code);
  console.log('🚨 Error message:', error.message);
  console.log('🚨 Debug message:', (error as any).debugMessage);
  console.log('🚨 Response code:', (error as any).responseCode);
  
  switch (error.code) {
    case 'E_USER_CANCELLED':
      console.log('👤 User cancelled the purchase');
      break;
    case 'E_PAYMENT_INVALID':
      console.log('💳 Payment invalid - check payment method');
      break;
    case 'E_ALREADY_OWNED':
      console.log('🔄 Product already owned - user may need to restore purchases');
      break;
    case 'E_SERVICE_DISCONNECTED':
      console.log('🔌 Google Play Billing service disconnected');
      break;
    case 'E_NETWORK_ERROR':
      console.log('🌐 Network error - check internet connection');
      break;
    case 'E_SKU_NOT_FOUND':
      console.log('🚨 CRITICAL: SKU not found - this is a configuration issue!');
      console.log('🔍 TROUBLESHOOTING STEPS:');
      console.log('1. Check Google Play Console subscription configuration:');
      console.log('   - Product ID: thoughtpro_subscriptions');
      console.log('   - Base plans: plan-299, plan-yearly');
      console.log('   - Status: ACTIVE and PUBLISHED');
      console.log('2. App signing and upload:');
      console.log('   - App must be uploaded to Play Console (even for testing)');
      console.log('   - Signed with SAME keystore as Play Console');
      console.log('   - Package name: com.thoughtpro (must match Play Console)');
      console.log('3. Testing account:');
      console.log('   - Must be added to License testing in Play Console');
      console.log('   - Use SAME account that uploaded the app OR added test account');
      console.log('   - Test on REAL device (not emulator)');
      console.log('4. Subscription publishing:');
      console.log('   - Subscription must be PUBLISHED, not just saved as draft');
      console.log('   - Base plans must be ACTIVE');
      console.log('   - Check in Play Console → Monetize → Subscriptions');
      console.log('5. Run debugSubscriptionSetup() to get more details');
      break;
    case 'E_DEVELOPER_ERROR':
      console.log('👨‍💻 Developer error - check API parameters and configuration');
      console.log('Common causes:');
      console.log('- Invalid SKU or offer token');
      console.log('- App not properly configured in Play Console');
      console.log('- Missing subscription offers for base plan');
      console.log('- Wrong API parameters for react-native-iap version');
      console.log('- Package name mismatch between app and Play Console');
      break;
    case 'E_ITEM_UNAVAILABLE':
      console.log('📦 Item unavailable - subscription may not be published');
      console.log('Check:');
      console.log('- Subscription is PUBLISHED in Play Console');
      console.log('- Base plans are ACTIVE');
      console.log('- App is uploaded to Play Console');
      console.log('- Testing with correct account');
      break;
    default:
      console.log('❓ Unknown purchase error:', error.message || 'Unknown error');
      console.log('Error code:', error.code);
      console.log('Full error object:', error);
      console.log('🔍 Try running debugSubscriptionSetup() for more information');
  }
  
  // Additional diagnostic info for common setup issues
  if (error.code === 'E_SKU_NOT_FOUND' || error.code === 'E_ITEM_UNAVAILABLE') {
    console.log('');
    console.log('🆘 QUICK CHECKLIST FOR E_SKU_NOT_FOUND:');
    console.log('□ Subscription "thoughtpro_subscriptions" exists in Play Console');
    console.log('□ Base plans "plan-299" and "plan-yearly" are created and ACTIVE');
    console.log('□ Subscription is PUBLISHED (not draft)');
    console.log('□ App is uploaded to Play Console (Internal Testing at minimum)');
    console.log('□ App is signed with SAME key as uploaded to Play Console');
    console.log('□ Package name "com.thoughtpro" matches Play Console exactly');
    console.log('□ Testing account is added to License testing in Play Console');
    console.log('□ Using real Android device (not emulator)');
    console.log('□ Google Play Services is installed and up to date');
    console.log('');
    console.log('🔍 Run this to get detailed info: debugSubscriptionSetup()');
  }
};

/**
 * Get formatted price for a product
 */
export const getFormattedPrice = (product: Product): string => {
  return product.displayPrice;
};

/**
 * Utility to check if purchase is valid (Android specific)
 */
export const isPurchaseValid = (purchase: Purchase): boolean => {
  if (Platform.OS === 'android') {
    // For Android, check purchaseStateAndroid if available
    return (purchase as any).purchaseStateAndroid === 1; // 1 = PURCHASED
  }
  // For iOS, if purchase exists in getAvailablePurchases, it's valid
  return true;
};

/**
 * Get all available base plans for ThoughtPro subscription
 */
export const getAvailableBasePlans = async (): Promise<Array<{
  basePlanId: string;
  formattedPrice?: string;
  currency?: string;
  billingPeriod?: string;
  offerToken: string;
}>> => {
  try {
    const subscriptions = await getAvailableSubscriptions();
    const thoughtProSub = subscriptions.find(sub => 
      sub.id === 'thoughtpro_subscriptions' || 
      sub.id.includes('thoughtpro_subscriptions') ||
      sub.id.includes('thoughtpro')
    );
    
    if (!thoughtProSub || !((thoughtProSub as any).subscriptionOfferDetailsAndroid)) {
      return [];
    }
    
    const offers = (thoughtProSub as any).subscriptionOfferDetailsAndroid;
    return offers.map((offer: any) => ({
      basePlanId: offer.basePlanId,
      formattedPrice: offer.pricingPhases?.[0]?.formattedPrice,
      currency: offer.pricingPhases?.[0]?.priceCurrencyCode,
      billingPeriod: offer.pricingPhases?.[0]?.billingPeriod,
      offerToken: offer.offerToken,
    }));
  } catch (error) {
    console.error('Error getting available base plans:', error);
    return [];
  }
};

/**
 * Convenience function to get subscription pricing info
 */
export const getSubscriptionPricing = async (): Promise<{
  monthly?: { price: string; currency: string };
  yearly?: { price: string; currency: string };
}> => {
  try {
    const basePlans = await getAvailableBasePlans();
    const result: any = {};
    
    const monthlyPlan = basePlans.find(plan => plan.basePlanId === 'plan-299');
    const yearlyPlan = basePlans.find(plan => plan.basePlanId === 'plan-yearly');
    
    if (monthlyPlan) {
      result.monthly = {
        price: monthlyPlan.formattedPrice || '₹299',
        currency: monthlyPlan.currency || 'INR'
      };
    }
    
    if (yearlyPlan) {
      result.yearly = {
        price: yearlyPlan.formattedPrice || '₹2999',
        currency: yearlyPlan.currency || 'INR'
      };
    }
    
    return result;
  } catch (error) {
    console.error('Error getting subscription pricing:', error);
    return {};
  }
};

/**
 * Get product by SKU
 */
export const getProductBySku = async (sku: string, type: 'inapp' | 'subs' = 'inapp'): Promise<Product | null> => {
  try {
    const products = await fetchProducts({
      skus: [sku],
      type,
    });
    return products.length > 0 ? products[0] : null;
  } catch (error) {
    console.error('Error getting product by SKU:', error);
    return null;
  }
};

// Legacy function names for backward compatibility
export const initRevenueCat = initIAP;
export const getOfferings = getAvailableProducts;
export const getCustomerInfo = getAllPurchases;
export const purchasePackage = purchaseProduct;
export const restore = restorePurchases;

// Backward compatibility aliases for old function names
export const purchase4WeekSubscription = purchaseMonthlySubscription; // Alias for old function name
export const has4WeekSubscription = hasThoughtProSubscription; // Alias for old function name

// Export types for use in other files
export type {
  Product,
  Purchase,
  PurchaseError,
};
