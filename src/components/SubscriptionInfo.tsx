import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface SubscriptionInfoProps {
  monthlyPrice: string;
  yearlyPrice: string;
  onSelectPlan?: (plan: 'monthly' | 'yearly') => void;
  selectedPlan?: 'monthly' | 'yearly';
  compact?: boolean;
}

const SubscriptionInfo: React.FC<SubscriptionInfoProps> = ({
  monthlyPrice,
  yearlyPrice,
  onSelectPlan,
  selectedPlan = 'monthly',
  compact = false,
}) => {
  const getSavingsInfo = () => {
    const monthly = parseFloat(monthlyPrice.replace('₹', '').replace(',', ''));
    const yearly = parseFloat(yearlyPrice.replace('₹', '').replace(',', ''));
    const yearlyEquivalent = monthly * 12;
    const savings = yearlyEquivalent - yearly;
    const savingsPercentage = Math.round((savings / yearlyEquivalent) * 100);
    return { savings, savingsPercentage };
  };

  const { savings, savingsPercentage } = getSavingsInfo();

  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <Text style={styles.compactTitle}>ThoughtPro Premium Plans</Text>
        <View style={styles.compactPlans}>
          <View style={styles.compactPlan}>
            <Text style={styles.compactPlanName}>Monthly</Text>
            <Text style={styles.compactPrice}>{monthlyPrice}</Text>
            <Text style={styles.compactPeriod}>per month</Text>
          </View>
          <View style={[styles.compactPlan, styles.compactBestValue]}>
            <Text style={styles.bestValueBadge}>BEST VALUE</Text>
            <Text style={styles.compactPlanName}>Yearly</Text>
            <Text style={styles.compactPrice}>{yearlyPrice}</Text>
            <Text style={styles.compactPeriod}>per year</Text>
            <Text style={styles.compactSavings}>Save {savingsPercentage}%</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Plan</Text>
      
      <View style={styles.plansContainer}>
        {/* Monthly Plan */}
        <TouchableOpacity
          style={[
            styles.planCard,
            selectedPlan === 'monthly' && styles.selectedPlan
          ]}
          onPress={() => onSelectPlan?.('monthly')}
        >
          <Text style={styles.planName}>Monthly Plan</Text>
          <Text style={styles.planPrice}>{monthlyPrice}</Text>
          <Text style={styles.planPeriod}>per month</Text>
          <Text style={styles.planDescription}>Great for trying premium</Text>
        </TouchableOpacity>

        {/* Yearly Plan */}
        <TouchableOpacity
          style={[
            styles.planCard,
            // Only show yearly plan styling when monthly is selected
            selectedPlan === 'monthly' && styles.yearlyPlan,
            selectedPlan === 'yearly' && styles.selectedPlan
          ]}
          onPress={() => onSelectPlan?.('yearly')}
        >
          {/* Only show BEST VALUE badge when monthly is selected */}
          {selectedPlan === 'monthly' && (
            <View style={styles.bestValueBadgeContainer}>
              <Text style={styles.bestValueBadgeText}>BEST VALUE</Text>
            </View>
          )}
          <Text style={styles.planName}>Yearly Plan</Text>
          <Text style={styles.planPrice}>{yearlyPrice}</Text>
          <Text style={styles.planPeriod}>per year</Text>
          <Text style={styles.savingsText}>Save ₹{savings} ({savingsPercentage}% off)</Text>
          <Text style={styles.planDescription}>Best value for committed users</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Premium Features:</Text>
        <Text style={styles.feature}>✅ All‑in free access</Text>
        <Text style={styles.feature}>✅ 10+ Scans</Text>
        <Text style={styles.feature}>✅ Primary & Secondary Interventions</Text>
        <Text style={styles.feature}>✅ Video Tertiary Content</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  compactContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  compactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  compactPlans: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  compactPlan: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginHorizontal: 4,
    position: 'relative',
  },
  compactBestValue: {
    backgroundColor: '#eff6ff',
    borderColor: '#3b82f6',
    borderWidth: 1,
  },
  bestValueBadge: {
    position: 'absolute',
    top: -6,
    backgroundColor: '#3b82f6',
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  compactPlanName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  compactPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 2,
  },
  compactPeriod: {
    fontSize: 12,
    color: '#6b7280',
  },
  compactSavings: {
    fontSize: 11,
    color: '#dc2626',
    fontWeight: '600',
    marginTop: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  plansContainer: {
    marginBottom: 20,
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    position: 'relative',
  },
  selectedPlan: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  yearlyPlan: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  bestValueBadgeContainer: {
    position: 'absolute',
    top: -8,
    right: 16,
    backgroundColor: '#3b82f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  bestValueBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 24,
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
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '600',
    marginBottom: 4,
  },
  planDescription: {
    fontSize: 13,
    color: '#6b7280',
  },
  featuresContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  feature: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
  },
});

export default SubscriptionInfo;
