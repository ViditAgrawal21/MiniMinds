import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SubscriptionCard from '../components/SubscriptionCard';
import { hasThoughtProSubscription } from '../services/inAppPurchase';
import { redeemCode, hasActiveRedeemCode, getRedeemCodeDetails } from '../utils/redeemCodeUtils';

const PremiumScreen: React.FC = () => {
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [redeemCodeInput, setRedeemCodeInput] = useState<string>('');
  const [isRedeeming, setIsRedeeming] = useState<boolean>(false);
  const [redeemCodeDetails, setRedeemCodeDetails] = useState<any>(null);

  useEffect(() => {
    checkPremiumAccess();
    checkRedeemCodeStatus();
  }, []);

  const checkPremiumAccess = async () => {
    try {
      const access = await hasThoughtProSubscription();
      setHasAccess(access);
    } catch (error) {
      console.error('Error checking premium access:', error);
    }
  };

  const checkRedeemCodeStatus = async () => {
    try {
      const hasCode = await hasActiveRedeemCode();
      if (hasCode) {
        const details = await getRedeemCodeDetails();
        setRedeemCodeDetails(details);
        setHasAccess(true);
      }
    } catch (error) {
      console.error('Error checking redeem code:', error);
    }
  };

  const handleRedeemCode = async () => {
    if (!redeemCodeInput.trim()) {
      Alert.alert('Error', 'Please enter a redeem code');
      return;
    }

    setIsRedeeming(true);
    try {
      const success = await redeemCode(redeemCodeInput);
      
      if (success) {
        Alert.alert(
          'Success! 🎉',
          'Your redeem code has been activated! You now have full access to all premium features.',
          [
            {
              text: 'OK',
              onPress: () => {
                setHasAccess(true);
                setRedeemCodeInput('');
                checkRedeemCodeStatus();
              },
            },
          ]
        );
      } else {
        Alert.alert(
          'Invalid Code',
          'The redeem code you entered is not valid. Please check and try again.'
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to redeem code. Please try again.');
    } finally {
      setIsRedeeming(false);
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
          <Text style={styles.headerTitle}>MiniMinds Premium</Text>
          <Text style={styles.headerSubtitle}>
            Unlock all premium features
          </Text>
        </View>

        {/* Redeem Code Section */}
        {!hasAccess && (
          <View style={styles.redeemSection}>
            <Text style={styles.redeemTitle}>Have a Redeem Code?</Text>
            <Text style={styles.redeemSubtitle}>
              Enter your code below to unlock premium access
            </Text>
            <View style={styles.redeemInputContainer}>
              <TextInput
                style={styles.redeemInput}
                placeholder="Enter redeem code"
                placeholderTextColor="#9ca3af"
                value={redeemCodeInput}
                onChangeText={setRedeemCodeInput}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isRedeeming}
              />
              <TouchableOpacity
                style={[styles.redeemButton, isRedeeming && styles.redeemButtonDisabled]}
                onPress={handleRedeemCode}
                disabled={isRedeeming}
              >
                <Text style={styles.redeemButtonText}>
                  {isRedeeming ? 'Redeeming...' : 'Redeem'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Show active redeem code status */}
        {hasAccess && redeemCodeDetails && (
          <View style={styles.activeCodeBanner}>
            <Text style={styles.activeCodeText}>
              🎟️ Redeem Code Active - Full Premium Access
            </Text>
            <Text style={styles.activeCodeDate}>
              Activated: {new Date(redeemCodeDetails.redeemedAt).toLocaleDateString()}
            </Text>
          </View>
        )}

        {/* Subscription Card - only show if no redeem code access */}
        {!redeemCodeDetails && (
          <>
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <SubscriptionCard
              onPurchaseSuccess={handlePurchaseSuccess}
              onPurchaseError={handlePurchaseError}
            />
          </>
        )}

        {hasAccess && (
          <View style={styles.premiumFeatures}>
            <Text style={styles.featuresTitle}>🎉 Premium Features Unlocked:</Text>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>✅ All Mental Health Conditions Access</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>✅ Unlimited Scans & Assessments</Text>
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
              <Text style={styles.featureText}>✅ Advanced Analytics & Insights</Text>
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {redeemCodeDetails 
              ? 'Your redeem code provides lifetime access to all premium features.'
              : 'Your subscription will automatically renew unless cancelled at least 24 hours before the end of the current period. You can manage your subscription in your device\'s App Store settings.'}
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
  redeemSection: {
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
  redeemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  redeemSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  redeemInputContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  redeemInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#f9fafb',
  },
  redeemButton: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
  },
  redeemButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  redeemButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  activeCodeBanner: {
    margin: 16,
    backgroundColor: '#d1fae5',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#059669',
  },
  activeCodeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#047857',
    marginBottom: 4,
  },
  activeCodeDate: {
    fontSize: 14,
    color: '#065f46',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#d1d5db',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
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
