import { useState, useEffect, useCallback } from 'react';
import {
  has4WeekSubscription,
  initIAP,
  getAvailableSubscriptions,
  Product,
} from '../services/inAppPurchase';
import { hasActiveRedeemCode } from '../utils/redeemCodeUtils';

export interface SubscriptionState {
  hasAccess: boolean;
  isLoading: boolean;
  subscription: Product | null;
  error: string | null;
  hasRedeemCode: boolean;
}

export const useSubscription = () => {
  const [state, setState] = useState<SubscriptionState>({
    hasAccess: false,
    isLoading: true,
    subscription: null,
    error: null,
    hasRedeemCode: false,
  });

  const checkSubscriptionStatus = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      console.log('🔄 Checking subscription status...');
      
      // Check for redeem code first (faster check)
      const hasRedeemAccess = await hasActiveRedeemCode();
      console.log('🎟️ Has active redeem code:', hasRedeemAccess);
      
      // If user has redeem code, grant access immediately
      if (hasRedeemAccess) {
        setState({
          hasAccess: true,
          isLoading: false,
          subscription: null,
          error: null,
          hasRedeemCode: true,
        });
        return true;
      }
      
      // Initialize IAP connection
      await initIAP();
      console.log('✅ IAP initialized successfully');
      
      // Check if user has active subscription
      const hasAccess = await has4WeekSubscription();
      console.log('🔍 Has 4-week subscription access:', hasAccess);
      
      // Get subscription product info
      const subscriptions = await getAvailableSubscriptions();
      console.log('All available subscriptions:', subscriptions);
      
      const subscription = subscriptions.find(sub => {
        // For react-native-iap Product type, use 'id' property
        console.log('Checking subscription:', sub.id, sub);
        
        // Match against expected subscription IDs
        return sub.id === '500_30.' || sub.id === 'com.thoughtpro.500_30' || sub.id === '500_30';
      }) || null;
      
      console.log('Found subscription:', subscription);
      
      if (!subscription && subscriptions.length > 0) {
        console.warn('⚠️ No matching subscription found. Available subscriptions:', 
          subscriptions.map(s => ({ id: s.id, title: s.title })));
      }
      
      if (subscriptions.length === 0) {
        console.warn('⚠️ No subscriptions available at all');
      }
      
      setState({
        hasAccess,
        isLoading: false,
        subscription,
        error: null,
        hasRedeemCode: false,
      });
      
      return hasAccess;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to check subscription';
      console.error('❌ Subscription check failed:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return false;
    }
  }, []);

  const refreshSubscription = useCallback(() => {
    return checkSubscriptionStatus();
  }, [checkSubscriptionStatus]);

  useEffect(() => {
    checkSubscriptionStatus();
  }, [checkSubscriptionStatus]);

  return {
    ...state,
    refreshSubscription,
  };
};

export default useSubscription;
