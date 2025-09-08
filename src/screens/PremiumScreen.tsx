import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import SubscriptionCard from '../components/SubscriptionCard';
import { hasThoughtProSubscription } from '../services/inAppPurchase';

const PremiumScreen: React.FC = () => {
  const [hasAccess, setHasAccess] = useState<boolean>(false);

  useEffect(() => {
    checkPremiumAccess();
  }, []);

  const checkPremiumAccess = async () => {
    try {
      const access = await hasThoughtProSubscription();
      setHasAccess(access);
    } catch (error) {
      console.error('Error checking premium access:', error);
    }
  };

  const handlePurchaseSuccess = () => {
    setHasAccess(true);
    // You can also trigger any other actions after successful purchase
    // like updating user context, navigating to premium features, etc.
  };

  const handlePurchaseError = (error: string) => {
    console.error('Purchase error:', error);
    // Handle purchase error (show error message, etc.)
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ThoughtPro Premium</Text>
          <Text style={styles.headerSubtitle}>
            Unlock all premium features with your ThoughtPro subscription
          </Text>
        </View>

        <SubscriptionCard
          onPurchaseSuccess={handlePurchaseSuccess}
          onPurchaseError={handlePurchaseError}
        />

        {hasAccess && (
          <View style={styles.premiumFeatures}>
            <Text style={styles.featuresTitle}>🎉 Premium Features Unlocked:</Text>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>✅ All‑in free access</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>✅ 10+ Scans</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>✅ Primary & Secondary Interventions</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>✅ Video Tertiary Content</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>✅ Priority Support</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>✅ Advanced Analytics</Text>
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Your subscription will automatically renew unless cancelled at least 24 hours before the end of the current period. You can manage your subscription in your device's App Store settings.
          </Text>
        </View>
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
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  premiumFeatures: {
    margin: 16,
    backgroundColor: 'white',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 16,
  },
  featureItem: {
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#1f2937',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default PremiumScreen;
