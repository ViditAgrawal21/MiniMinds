import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  getAvailableSubscriptions,
  getAvailableBasePlans,
  purchaseMonthlySubscription,
  purchaseYearlySubscription,
  hasThoughtProSubscription,
  getThoughtProSubscriptionInfo,
  initIAP,
  Product,
  debugSubscriptionSetup,
} from '../services/inAppPurchase';

interface SubscriptionCardProps {
  onPurchaseSuccess?: () => void;
  onPurchaseError?: (error: string) => void;
}

interface BasePlan {
  basePlanId: string;
  formattedPrice?: string;
  currency?: string;
  billingPeriod?: string;
  offerToken: string;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  onPurchaseSuccess,
  onPurchaseError,
}) => {
  const [subscription, setSubscription] = useState<Product | null>(null);
  const [basePlans, setBasePlans] = useState<BasePlan[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'plan-299' | 'plan-yearly'>('plan-299');
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null);

  useEffect(() => {
    loadSubscriptionData();
  }, []);

  const loadSubscriptionData = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 Loading ThoughtPro subscription data...');
      
      // Initialize IAP connection
      await initIAP();
      console.log('✅ IAP initialized');
      
      // Get available subscriptions
      const subscriptions = await getAvailableSubscriptions();
      console.log('📦 Available subscriptions:', subscriptions);
      
      const targetSubscription = subscriptions.find(sub => 
        sub.id === 'thoughtpro_subscriptions' || 
        sub.id.includes('thoughtpro_subscriptions') ||
        sub.id.includes('thoughtpro')
      );
      
      console.log('🎯 Target subscription found:', targetSubscription);
      
      if (targetSubscription) {
        setSubscription(targetSubscription);
        
        // Get available base plans
        const plans = await getAvailableBasePlans();
        console.log('📋 Available base plans:', plans);
        setBasePlans(plans);
      } else {
        console.warn('⚠️ No matching subscription found');
        console.log('Available subscription IDs:', subscriptions.map(s => s.id));
      }
      
      // Check if user already has this subscription
      const hasActive = await hasThoughtProSubscription();
      console.log('🔐 Has active subscription:', hasActive);
      setIsActive(hasActive);
      
      if (hasActive) {
        const info = await getThoughtProSubscriptionInfo();
        setSubscriptionInfo(info);
      }
      
    } catch (error) {
      console.error('❌ Error loading subscription data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async (planType: 'monthly' | 'yearly') => {
    try {
      setIsPurchasing(true);
      
      let success = false;
      if (planType === 'monthly') {
        success = await purchaseMonthlySubscription();
      } else {
        success = await purchaseYearlySubscription();
      }
      
      if (success) {
        // Wait a moment for the purchase to process
        setTimeout(async () => {
          const hasActive = await hasThoughtProSubscription();
          setIsActive(hasActive);
          
          if (hasActive) {
            const info = await getThoughtProSubscriptionInfo();
            setSubscriptionInfo(info);
            
            Alert.alert(
              'Purchase Successful!',
              `Thank you for subscribing to ThoughtPro ${planType} plan! You now have access to all premium features.`,
              [{ text: 'OK', onPress: onPurchaseSuccess }]
            );
          }
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Purchase failed';
      Alert.alert('Purchase Failed', errorMessage);
      onPurchaseError?.(errorMessage);
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleRestorePurchases = async () => {
    try {
      setIsLoading(true);
      await loadSubscriptionData();
      
      if (isActive) {
        Alert.alert('Success', 'Your subscription has been restored!');
      } else {
        Alert.alert('No Purchases Found', 'No active subscriptions were found to restore.');
      }
    } catch (error) {
      Alert.alert('Restore Failed', 'Failed to restore purchases. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getBillingPeriodText = (billingPeriod?: string) => {
    if (!billingPeriod) return '';
    if (billingPeriod === 'P1M') return '/month';
    if (billingPeriod === 'P1Y') return '/year';
    return '';
  };

  const getDisplayPrice = (planId: string) => {
    const plan = basePlans.find(p => p.basePlanId === planId);
    return plan?.formattedPrice || (planId === 'plan-299' ? '₹299.00' : '₹999.00');
  };

  const getSavingsText = () => {
    const monthlyPrice = 299;
    const yearlyPrice = 999;
    const monthlyYearlyEquivalent = monthlyPrice * 12;
    const savings = monthlyYearlyEquivalent - yearlyPrice;
    const savingsPercentage = Math.round((savings / monthlyYearlyEquivalent) * 100);
    return `Save ₹${savings} (${savingsPercentage}% off)`;
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading subscription plans...</Text>
      </View>
    );
  }

  if (isActive) {
    return (
      <View style={[styles.container, styles.activeContainer]}>
        <Text style={styles.title}>🎉 ThoughtPro Premium Active</Text>
        <Text style={styles.activeDescription}>
          You have access to all premium features!
        </Text>
        
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Your Premium Benefits:</Text>
          <Text style={styles.featureItem}>✅ All‑in free access</Text>
          <Text style={styles.featureItem}>✅ 10+ Scans</Text>
          <Text style={styles.featureItem}>✅ Primary & Secondary Interventions</Text>
          <Text style={styles.featureItem}>✅ Video Tertiary Content</Text>
        </View>
        
        {subscriptionInfo && (
          <View style={styles.subscriptionDetails}>
            <Text style={styles.detailText}>Plan: {subscriptionInfo.basePlan || 'Premium'}</Text>
            <Text style={styles.detailText}>Status: Active</Text>
          </View>
        )}
        
        <TouchableOpacity
          style={[styles.button, styles.restoreButton]}
          onPress={handleRestorePurchases}
        >
          <Text style={styles.restoreButtonText}>Restore Purchases</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!subscription && basePlans.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Subscription Plans Not Available</Text>
        <Text style={styles.errorText}>
          We couldn't load the subscription information. This might be due to:
          {'\n'}• Network connectivity issues
          {'\n'}• Google Play Services not available
          {'\n'}• App not properly configured in Play Console
          {'\n'}• Subscription not published in Play Console
        </Text>
        <TouchableOpacity
          style={[styles.button, styles.restoreButton]}
          onPress={loadSubscriptionData}
          disabled={isLoading}
        >
          <Text style={styles.restoreButtonText}>
            {isLoading ? 'Loading...' : 'Try Again'}
          </Text>
        </TouchableOpacity>
        
        {__DEV__ && (
          <TouchableOpacity
            style={[styles.button, styles.debugButton]}
            onPress={debugSubscriptionSetup}
          >
            <Text style={styles.debugButtonText}>🔍 Debug Subscription</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {__DEV__ && (
        <View style={styles.devModeIndicator}>
          <Text style={styles.devModeText}>🧪 Development Mode</Text>
        </View>
      )}
      
      <Text style={styles.title}>Choose Your ThoughtPro Plan</Text>
      <Text style={styles.subtitle}>Unlock all premium features</Text>
      
      {/* Plan Selection */}
      <View style={styles.plansContainer}>
        {/* Monthly Plan */}
        <TouchableOpacity
          style={[
            styles.planCard,
            selectedPlan === 'plan-299' && styles.selectedPlanCard
          ]}
          onPress={() => setSelectedPlan('plan-299')}
        >
          <View style={styles.planHeader}>
            <Text style={styles.planName}>Monthly</Text>
            {selectedPlan === 'plan-299' && (
              <View style={styles.selectedBadge}>
                <Text style={styles.selectedBadgeText}>Selected</Text>
              </View>
            )}
          </View>
          <Text style={styles.planPrice}>{getDisplayPrice('plan-299')}</Text>
          <Text style={styles.planPeriod}>per month</Text>
          <Text style={styles.planDescription}>Perfect for trying out premium features</Text>
        </TouchableOpacity>
        
        {/* Yearly Plan */}
        <TouchableOpacity
          style={[
            styles.planCard,
            selectedPlan === 'plan-yearly' && styles.selectedPlanCard,
            // Only show popular styling when monthly is selected (to highlight yearly as better option)
            selectedPlan === 'plan-299' && styles.popularPlan
          ]}
          onPress={() => setSelectedPlan('plan-yearly')}
        >
          {/* Only show BEST VALUE badge when monthly is selected */}
          {selectedPlan === 'plan-299' && (
            <View style={styles.popularBadge}>
              <Text style={styles.popularBadgeText}>BEST VALUE</Text>
            </View>
          )}
          <View style={styles.planHeader}>
            <Text style={styles.planName}>Yearly</Text>
            {selectedPlan === 'plan-yearly' && (
              <View style={styles.selectedBadge}>
                <Text style={styles.selectedBadgeText}>Selected</Text>
              </View>
            )}
          </View>
          <Text style={styles.planPrice}>{getDisplayPrice('plan-yearly')}</Text>
          <Text style={styles.planPeriod}>per year</Text>
          <Text style={styles.savingsText}>{getSavingsText()}</Text>
          <Text style={styles.planDescription}>Best value for long-term users</Text>
        </TouchableOpacity>
      </View>
      
      {/* Features List */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>What you'll get:</Text>
        <Text style={styles.featureItem}>✅ All‑in free access</Text>
        <Text style={styles.featureItem}>✅ 10+ Scans</Text>
        <Text style={styles.featureItem}>✅ Primary & Secondary Interventions</Text>
        <Text style={styles.featureItem}>✅ Video Tertiary Content</Text>
        <Text style={styles.featureItem}>✅ Priority support</Text>
      </View>
      
      {/* Purchase Button */}
      <TouchableOpacity
        style={[styles.button, styles.purchaseButton]}
        onPress={() => handlePurchase(selectedPlan === 'plan-299' ? 'monthly' : 'yearly')}
        disabled={isPurchasing}
      >
        {isPurchasing ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="white" />
            <Text style={styles.loadingButtonText}>Processing...</Text>
          </View>
        ) : (
          <Text style={styles.purchaseButtonText}>
            Subscribe for {getDisplayPrice(selectedPlan)}
            {selectedPlan === 'plan-yearly' ? '/year' : '/month'}
          </Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, styles.restoreButton]}
        onPress={handleRestorePurchases}
      >
        <Text style={styles.restoreButtonText}>Restore Purchases</Text>
      </TouchableOpacity>
      
      {/* Terms */}
      <Text style={styles.termsText}>
        Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period.
      </Text>
      
      {__DEV__ && (
        <TouchableOpacity
          style={[styles.button, styles.debugButton]}
          onPress={debugSubscriptionSetup}
        >
          <Text style={styles.debugButtonText}>🔍 Debug Subscription</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeContainer: {
    backgroundColor: '#f0f9ff',
    borderColor: '#10b981',
    borderWidth: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 20,
  },
  activeDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#10b981',
    marginBottom: 20,
    lineHeight: 22,
  },
  plansContainer: {
    marginBottom: 20,
  },
  planCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    position: 'relative',
  },
  selectedPlanCard: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  popularPlan: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: 16,
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  popularBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  selectedBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  selectedBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  planPeriod: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  savingsText: {
    fontSize: 14,
    color: '#dc2626',
    fontWeight: '600',
    marginBottom: 4,
  },
  planDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 18,
  },
  featuresContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  featureItem: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
    lineHeight: 20,
  },
  subscriptionDetails: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  purchaseButton: {
    backgroundColor: '#059669',
  },
  purchaseButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  restoreButton: {
    backgroundColor: 'transparent',
    borderColor: '#d1d5db',
    borderWidth: 1,
  },
  restoreButtonText: {
    color: '#6b7280',
    fontSize: 16,
    textAlign: 'center',
  },
  termsText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 12,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 12,
    color: '#6b7280',
  },
  errorText: {
    textAlign: 'center',
    color: '#ef4444',
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  errorTitle: {
    textAlign: 'center',
    color: '#dc2626',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  devModeIndicator: {
    backgroundColor: '#fef3c7',
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
    borderColor: '#f59e0b',
    borderWidth: 1,
  },
  devModeText: {
    color: '#92400e',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  debugButton: {
    backgroundColor: '#8b5cf6',
    borderWidth: 0,
  },
  debugButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default SubscriptionCard;
