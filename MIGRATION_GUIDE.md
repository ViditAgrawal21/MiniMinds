# Migration Guide: React Native Purchases → React Native IAP

This guide helps you migrate from `react-native-purchases` (RevenueCat) to `react-native-iap`.

## Changes Made

### 1. Dependencies
- ❌ Removed: `react-native-purchases`
- ✅ Using: `react-native-iap` (already installed)

### 2. Service Files
- ❌ Removed: `src/services/revenueCat.ts`
- ✅ Created: `src/services/inAppPurchase.ts`

### 3. Documentation
- ❌ Removed: `REVENUECAT_SETUP.md`
- ✅ Created: `REACT_NATIVE_IAP_SETUP.md`

## Function Mapping

| RevenueCat Function | React Native IAP Function | Notes |
|-------------------|--------------------------|-------|
| `initRevenueCat()` | `initIAP()` | Initialize IAP connection |
| `getOfferings()` | `getAvailableProducts()` | Get one-time products |
| | `getAvailableSubscriptions()` | Get subscription products |
| `getCustomerInfo()` | `getAllPurchases()` | Get purchase history |
| `purchasePackage()` | `purchaseProduct()` | Purchase one-time product |
| | `purchaseSubscription()` | Purchase subscription |
| `restore()` | `restorePurchases()` | Restore purchases |

## Migration Steps

### 1. Update Imports
**Before (RevenueCat):**
```typescript
import { initRevenueCat, getOfferings, purchasePackage } from './services/revenueCat';
```

**After (React Native IAP):**
```typescript
import { initIAP, getAvailableProducts, purchaseProduct } from './services/inAppPurchase';
```

### 2. Initialize IAP
**Before:**
```typescript
await initRevenueCat(apiKey, userId);
```

**After:**
```typescript
await initIAP(); // No API key needed - direct store integration
```

### 3. Get Products
**Before:**
```typescript
const offerings = await getOfferings();
const products = offerings.current?.availablePackages || [];
```

**After:**
```typescript
const products = await getAvailableProducts();
const subscriptions = await getAvailableSubscriptions();
```

### 4. Purchase Items
**Before:**
```typescript
const purchase = await purchasePackage(package);
```

**After:**
```typescript
// For one-time products
const success = await purchaseProduct(productSku);

// For subscriptions
const success = await purchaseSubscription(subscriptionSku);
```

### 5. Restore Purchases
**Before:**
```typescript
const customerInfo = await restore();
```

**After:**
```typescript
const purchases = await restorePurchases();
```

## Key Differences

### 1. Event-Based vs Promise-Based
- **RevenueCat**: Returns purchase objects directly
- **React Native IAP**: Uses event listeners for purchase updates

### 2. Product Structure
- **RevenueCat**: Uses offerings and packages
- **React Native IAP**: Direct product/subscription arrays

### 3. Platform Differences
- **RevenueCat**: Unified API across platforms
- **React Native IAP**: Platform-specific configurations may be needed

### 4. Server Validation
- **RevenueCat**: Handles validation automatically
- **React Native IAP**: Requires manual server-side validation

## Important Notes

### 1. Update Product SKUs
Update the product identifiers in `src/services/inAppPurchase.ts`:

```typescript
const productSkus = Platform.select({
  ios: ['com.yourapp.premium_monthly', 'com.yourapp.premium_yearly'],
  android: ['premium_monthly', 'premium_yearly'],
}) || [];
```

### 2. Purchase Listeners
React Native IAP uses event-based purchase handling. The service automatically sets up listeners, but you can also add custom handlers:

```typescript
import { purchaseUpdatedListener, purchaseErrorListener } from 'react-native-iap';

// Custom purchase listener
const purchaseUpdateSubscription = purchaseUpdatedListener((purchase) => {
  // Handle successful purchase
  console.log('Purchase received:', purchase);
});

// Custom error listener
const purchaseErrorSubscription = purchaseErrorListener((error) => {
  // Handle purchase error
  console.error('Purchase error:', error);
});
```

### 3. Server-Side Validation
Implement receipt validation in the `validatePurchase` function:

```typescript
export const validatePurchase = async (purchase: Purchase): Promise<boolean> => {
  try {
    const response = await fetch('your-server.com/validate-purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        receiptData: purchase.transactionReceipt,
        productId: purchase.productId,
        platform: Platform.OS,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Validation error:', error);
    return false;
  }
};
```

### 4. Testing
- Use sandbox accounts for iOS testing
- Use test tracks for Android testing
- Test restore functionality thoroughly

## Benefits of Migration

1. **No Third-Party Dependencies**: Direct integration with Apple/Google stores
2. **Better Performance**: Lighter library with fewer dependencies
3. **More Control**: Direct access to native store APIs
4. **Cost Effective**: No RevenueCat subscription fees
5. **Privacy**: No data sharing with third-party services

## Potential Challenges

1. **Manual Receipt Validation**: Need to implement server-side validation
2. **Platform Differences**: May need platform-specific handling
3. **Less Analytics**: No built-in revenue analytics (need custom implementation)
4. **Event-Based Flow**: Different purchase flow compared to promise-based RevenueCat

## Example Integration

See `src/components/IAPScreen.example.tsx` for a complete example of how to use the new IAP service in a React Native component.

## Support

For issues with React Native IAP:
- [GitHub Repository](https://github.com/dooboolab/react-native-iap)
- [Documentation](https://react-native-iap.dooboolab.com/)
- [Troubleshooting Guide](https://react-native-iap.dooboolab.com/docs/troubleshooting)
