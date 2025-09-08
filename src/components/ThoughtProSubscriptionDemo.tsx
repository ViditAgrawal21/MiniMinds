import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  purchaseMonthlySubscription,
  purchaseYearlySubscription,
  hasThoughtProSubscription,
  getSubscriptionPricing,
  debugSubscriptionSetup,
} from '../services/inAppPurchase';

const ThoughtProSubscriptionDemo: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [hasSubscription, setHasSubscription] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [pricing, setPricing] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      // Check subscription status
      const hasActive = await hasThoughtProSubscription();
      setHasSubscription(hasActive);
      
      // Get pricing info
      const pricingData = await getSubscriptionPricing();
      setPricing(pricingData);
      
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async () => {
    try {
      setIsPurchasing(true);
      
      let success = false;
      if (selectedPlan === 'monthly') {
        success = await purchaseMonthlySubscription();
      } else {
        success = await purchaseYearlySubscription();
      }
      
      if (success) {
        Alert.alert(
          'Purchase Successful!',
          `Thank you for subscribing to ThoughtPro ${selectedPlan} plan!`,
          [
            {
              text: 'OK',
              onPress: () => {
                setHasSubscription(true);
              }
            }
          ]
        );
      }
    } catch (error) {
      Alert.alert('Purchase Failed', 'Something went wrong. Please try again.');
    } finally {
      setIsPurchasing(false);
    }
  };

  const getSavingsText = () => {
    const monthlyPrice = 299;
    const yearlyPrice = 999;
    const monthlyYearlyEquivalent = monthlyPrice * 12;
    const savings = monthlyYearlyEquivalent - yearlyPrice;
    const savingsPercentage = Math.round((savings / monthlyYearlyEquivalent) * 100);
    return { savings, savingsPercentage };
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#10b981" />
          <Text style={styles.loadingText}>Loading subscription plans...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (hasSubscription) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.successContainer}>
            <Text style={styles.successTitle}>🎉 You're All Set!</Text>
            <Text style={styles.successSubtitle}>
              You have access to all ThoughtPro premium features
            </Text>
            
            <View style={styles.featuresContainer}>
              <Text style={styles.featuresTitle}>Your Premium Benefits:</Text>
              <Text style={styles.featureItem}>✅ All‑in free access</Text>
              <Text style={styles.featureItem}>✅ 10+ Scans</Text>
              <Text style={styles.featureItem}>✅ Primary & Secondary Interventions</Text>
              <Text style={styles.featureItem}>✅ Video Tertiary Content</Text>
              <Text style={styles.featureItem}>✅ Priority Support</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.manageButton}
              onPress={() => Alert.alert('Manage Subscription', 'Go to your device settings to manage your subscription.')}
            >
              <Text style={styles.manageButtonText}>Manage Subscription</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const { savings, savingsPercentage } = getSavingsText();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your ThoughtPro Plan</Text>
          <Text style={styles.subtitle}>Unlock all premium features</Text>
        </View>

        {/* Plan Selection */}
        <View style={styles.plansContainer}>
          {/* Monthly Plan */}
          <TouchableOpacity
            style={[
              styles.planCard,
              selectedPlan === 'monthly' && styles.selectedPlanCard
            ]}
            onPress={() => setSelectedPlan('monthly')}
          >
            <View style={styles.planHeader}>
              <Text style={styles.planName}>Monthly Plan</Text>
              {selectedPlan === 'monthly' && (
                <View style={styles.selectedBadge}>
                  <Text style={styles.selectedBadgeText}>Selected</Text>
                </View>
              )}
            </View>
            <Text style={styles.planPrice}>{pricing.monthly?.price || '₹299.00'}</Text>
            <Text style={styles.planPeriod}>per month</Text>
            <Text style={styles.planDescription}>Perfect for trying out premium features</Text>
          </TouchableOpacity>

          {/* Yearly Plan */}
          <TouchableOpacity
            style={[
              styles.planCard,
              selectedPlan === 'yearly' && styles.selectedPlanCard,
              // Only show popular styling when monthly is selected (to highlight yearly as better option)
              selectedPlan === 'monthly' && styles.popularPlan
            ]}
            onPress={() => setSelectedPlan('yearly')}
          >
            {/* Only show BEST VALUE badge when monthly is selected */}
            {selectedPlan === 'monthly' && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>BEST VALUE</Text>
              </View>
            )}
            <View style={styles.planHeader}>
              <Text style={styles.planName}>Yearly Plan</Text>
              {selectedPlan === 'yearly' && (
                <View style={styles.selectedBadge}>
                  <Text style={styles.selectedBadgeText}>Selected</Text>
                </View>
              )}
            </View>
            <Text style={styles.planPrice}>{pricing.yearly?.price || '₹999.00'}</Text>
            <Text style={styles.planPeriod}>per year</Text>
            <Text style={styles.savingsText}>Save ₹{savings} ({savingsPercentage}% off)</Text>
            <Text style={styles.planDescription}>Best value for long-term users</Text>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>What you'll get:</Text>
          <Text style={styles.featureItem}>✅ All‑in free access</Text>
          <Text style={styles.featureItem}>✅ 10+ Scans</Text>
          <Text style={styles.featureItem}>✅ Primary & Secondary Interventions</Text>
          <Text style={styles.featureItem}>✅ Video Tertiary Content</Text>
          <Text style={styles.featureItem}>✅ Priority support</Text>
          <Text style={styles.featureItem}>✅ Advanced analytics</Text>
        </View>

        {/* Purchase Button */}
        <TouchableOpacity
          style={styles.purchaseButton}
          onPress={handlePurchase}
          disabled={isPurchasing}
        >
          {isPurchasing ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="white" />
              <Text style={styles.loadingButtonText}>Processing...</Text>
            </View>
          ) : (
            <Text style={styles.purchaseButtonText}>
              Subscribe for {selectedPlan === 'monthly' ? (pricing.monthly?.price || '₹299') : (pricing.yearly?.price || '₹999')}
              {selectedPlan === 'monthly' ? '/month' : '/year'}
            </Text>
          )}
        </TouchableOpacity>

        {/* Terms */}
        <Text style={styles.termsText}>
          Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period. You can manage your subscription in your device settings.
        </Text>

        {/* Debug Button (Development Only) */}
        {__DEV__ && (
          <TouchableOpacity
            style={styles.debugButton}
            onPress={debugSubscriptionSetup}
          >
            <Text style={styles.debugButtonText}>🔍 Debug Subscription Setup</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#6b7280',
    fontSize: 16,
  },
  loadingButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  successContainer: {
    padding: 20,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  plansContainer: {
    padding: 20,
    paddingTop: 0,
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    right: 20,
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
    fontSize: 20,
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  planPeriod: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 4,
  },
  savingsText: {
    fontSize: 14,
    color: '#dc2626',
    fontWeight: '600',
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  featuresContainer: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  featureItem: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
    lineHeight: 24,
  },
  purchaseButton: {
    backgroundColor: '#10b981',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  purchaseButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  manageButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  manageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  debugButton: {
    backgroundColor: '#8b5cf6',
    marginHorizontal: 20,
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 20,
  },
  debugButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ThoughtProSubscriptionDemo;
