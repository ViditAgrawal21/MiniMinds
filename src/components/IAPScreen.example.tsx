// Example usage of React Native IAP service
// This file demonstrates how to integrate the IAP service in your React Native app

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  initIAP,
  getAvailableProducts,
  getAvailableSubscriptions,
  purchaseProduct,
  purchaseSubscription,
  restorePurchases,
  hasActiveSubscription,
  closeIAP,
  getFormattedPrice,
  Product,
  Purchase,
} from '../services/inAppPurchase';

interface IAPScreenProps {}

const IAPScreen: React.FC<IAPScreenProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [subscriptions, setSubscriptions] = useState<Product[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeIAP();
    
    // Cleanup when component unmounts
    return () => {
      closeIAP();
    };
  }, []);

  const initializeIAP = async () => {
    try {
      setIsLoading(true);
      const success = await initIAP();
      
      if (success) {
        setIsInitialized(true);
        await loadProducts();
        await checkPremiumStatus();
      } else {
        Alert.alert('Error', 'Failed to initialize in-app purchases');
      }
    } catch (error) {
      console.error('Failed to initialize IAP:', error);
      Alert.alert('Error', 'Failed to initialize in-app purchases');
    } finally {
      setIsLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const [productsResult, subscriptionsResult] = await Promise.all([
        getAvailableProducts(),
        getAvailableSubscriptions(),
      ]);
      
      setProducts(productsResult);
      setSubscriptions(subscriptionsResult);
    } catch (error) {
      console.error('Failed to load products:', error);
      Alert.alert('Error', 'Failed to load products');
    }
  };

  const checkPremiumStatus = async () => {
    try {
      // Check for any premium subscription - replace with your actual subscription SKU
      const premium = await hasActiveSubscription('premium_subscription_sku');
      setIsPremium(premium);
    } catch (error) {
      console.error('Failed to check premium status:', error);
    }
  };

  const handlePurchaseProduct = async (product: Product) => {
    try {
      setIsLoading(true);
      const success = await purchaseProduct(product.id);
      
      if (success) {
        Alert.alert(
          'Purchase Initiated',
          'Your purchase is being processed. You will be notified when it completes.'
        );
      } else {
        Alert.alert('Purchase Failed', 'Unable to initiate purchase');
      }
    } catch (error) {
      console.error('Purchase failed:', error);
      Alert.alert('Purchase Failed', 'An error occurred during purchase');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchaseSubscription = async (subscription: Product) => {
    try {
      setIsLoading(true);
      const success = await purchaseSubscription(subscription.id);
      
      if (success) {
        Alert.alert(
          'Subscription Initiated',
          'Your subscription is being processed. You will be notified when it completes.'
        );
      } else {
        Alert.alert('Subscription Failed', 'Unable to initiate subscription');
      }
    } catch (error) {
      console.error('Subscription failed:', error);
      Alert.alert('Subscription Failed', 'An error occurred during subscription');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestorePurchases = async () => {
    try {
      setIsLoading(true);
      const restoredPurchases = await restorePurchases();
      
      if (restoredPurchases.length > 0) {
        Alert.alert(
          'Purchases Restored',
          `Successfully restored ${restoredPurchases.length} purchase(s)`
        );
        await checkPremiumStatus(); // Re-check premium status after restore
      } else {
        Alert.alert('No Purchases', 'No previous purchases found to restore');
      }
    } catch (error) {
      console.error('Restore failed:', error);
      Alert.alert('Restore Failed', 'An error occurred while restoring purchases');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Initializing In-App Purchases...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>In-App Purchases</Text>
      
      {isPremium && (
        <View style={styles.premiumBanner}>
          <Text style={styles.premiumText}>✨ Premium Active ✨</Text>
        </View>
      )}

      {/* One-time Products */}
      <Text style={styles.sectionTitle}>Products</Text>
      {products.map((product) => (
        <View key={product.id} style={styles.productItem}>
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={styles.productPrice}>{getFormattedPrice(product)}</Text>
          </View>
          <TouchableOpacity
            style={styles.purchaseButton}
            onPress={() => handlePurchaseProduct(product)}
            disabled={isLoading}
          >
            <Text style={styles.purchaseButtonText}>Buy</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Subscriptions */}
      <Text style={styles.sectionTitle}>Subscriptions</Text>
      {subscriptions.map((subscription) => (
        <View key={subscription.id} style={styles.productItem}>
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>{subscription.title}</Text>
            <Text style={styles.productDescription}>{subscription.description}</Text>
            <Text style={styles.productPrice}>{getFormattedPrice(subscription)}</Text>
          </View>
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={() => handlePurchaseSubscription(subscription)}
            disabled={isLoading}
          >
            <Text style={styles.subscribeButtonText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Restore Purchases Button */}
      <TouchableOpacity
        style={styles.restoreButton}
        onPress={handleRestorePurchases}
        disabled={isLoading}
      >
        <Text style={styles.restoreButtonText}>Restore Purchases</Text>
      </TouchableOpacity>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  premiumBanner: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  premiumText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
    color: '#333',
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productInfo: {
    flex: 1,
    marginRight: 15,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  purchaseButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  purchaseButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subscribeButton: {
    backgroundColor: '#28A745',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  subscribeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  restoreButton: {
    backgroundColor: '#6C757D',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  restoreButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IAPScreen;
