import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSubscriptionContext } from '../context/SubscriptionContext';

interface PremiumGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  showUpgradePrompt?: boolean;
  onUpgradePress?: () => void;
}

const PremiumGuard: React.FC<PremiumGuardProps> = ({
  children,
  fallback,
  showUpgradePrompt = true,
  onUpgradePress,
}) => {
  const { hasAccess, isLoading, subscription, error } = useSubscriptionContext();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading subscription...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Subscription Error</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (showUpgradePrompt) {
    return (
      <View style={styles.upgradeContainer}>
        <Text style={styles.upgradeTitle}>Premium Feature</Text>
        <Text style={styles.upgradeDescription}>
          {subscription 
            ? `Upgrade to premium for ${subscription.displayPrice} to access this feature.`
            : 'This feature requires a premium subscription. Please check your internet connection and try again.'
          }
        </Text>
        {onUpgradePress && subscription && (
          <TouchableOpacity style={styles.upgradeButton} onPress={onUpgradePress}>
            <Text style={styles.upgradeButtonText}>
              Upgrade for {subscription.displayPrice}
            </Text>
          </TouchableOpacity>
        )}
        {!subscription && (
          <Text style={styles.unavailableText}>
            Subscription not available. Please check your connection.
          </Text>
        )}
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: '#6b7280',
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#991b1b',
    textAlign: 'center',
  },
  upgradeContainer: {
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    alignItems: 'center',
  },
  upgradeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 8,
  },
  upgradeDescription: {
    fontSize: 14,
    color: '#78350f',
    textAlign: 'center',
    marginBottom: 12,
  },
  upgradeButton: {
    backgroundColor: '#f59e0b',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  upgradeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  unavailableText: {
    fontSize: 12,
    color: '#78350f',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default PremiumGuard;
