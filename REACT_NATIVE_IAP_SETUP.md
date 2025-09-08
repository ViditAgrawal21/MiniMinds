# React Native IAP Setup

## What is React Native IAP?
React Native IAP is a lightweight, performant library for implementing in-app purchases (IAP) and subscriptions in React Native apps. It provides direct access to native store APIs (StoreKit for iOS and Google Play Billing for Android) without relying on third-party services.

---

## Installation

### React Native package
React Native IAP can be installed via npm or yarn.

We recommend using the latest version of React Native, or making sure that the version is at least greater than 0.64.

#### Option 1: Using npm

```bash
npm install react-native-iap
```

#### Option 2: Using yarn

```bash
yarn add react-native-iap
```

### Auto-linking
Recent versions of React Native (0.60+) will automatically link the library. No additional steps needed.

---

## Android Setup

### Set the correct launchMode for Android
Depending on your user's payment method, they may be asked by Google Play to verify their purchase in their (banking) app. This means they will have to background your app and go to another app to verify the purchase. If your Activity's `launchMode` is set to anything other than `standard` or `singleTop`, backgrounding your app can cause the purchase to get cancelled. To avoid this, set the `launchMode` of your Activity to `standard` or `singleTop` in your Android app's `AndroidManifest.xml` file, like so:

`AndroidManifest.xml`

```xml
<activity 
    android:name="com.your.Activity"
    android:launchMode="standard" />  <!-- or singleTop -->
```

### Include BILLING permission
Don't forget to include the BILLING permission in your `AndroidManifest.xml` file:

```xml
<uses-permission android:name="com.android.vending.BILLING" />
```

### Android ProGuard Configuration
If you're using ProGuard for code obfuscation, add these rules to your `proguard-rules.pro` file:

```
-keep class com.android.vending.billing.**
```

---

## iOS Setup

### Enable In‑App Purchase capability
Don't forget to enable the In‑App Purchase capability for your project under:

Project Target → Capabilities → In‑App Purchase

### Add StoreKit Framework
Ensure that the StoreKit framework is linked to your project. This should be automatic with auto-linking.

---

## Configuration

### Update your App Store Connect / Google Play Console

#### iOS (App Store Connect)
1. Create your products in App Store Connect
2. Set up your product identifiers (SKUs)
3. Configure your app's bundle identifier
4. Set up your shared secret for receipt validation

#### Android (Google Play Console)
1. Create your products in Google Play Console
2. Set up your product identifiers (SKUs)
3. Configure your app's package name
4. Set up your service account for server-side validation

---

## Usage

### Import the IAP service
```ts
import {
  initIAP,
  getAvailableProducts,
  getAvailableSubscriptions,
  purchaseProduct,
  purchaseSubscription,
  restorePurchases,
  hasActiveSubscription,
  closeIAP,
} from './src/services/inAppPurchase';
```

### Initialize IAP
```ts
import { initIAP } from './src/services/inAppPurchase';

// Initialize IAP connection
const initializeIAP = async () => {
  const isConnected = await initIAP();
  if (isConnected) {
    console.log('IAP initialized successfully');
  } else {
    console.log('Failed to initialize IAP');
  }
};
```

### Fetch Products
```ts
import { getAvailableProducts, getAvailableSubscriptions } from './src/services/inAppPurchase';

// Get one-time purchase products
const loadProducts = async () => {
  const products = await getAvailableProducts();
  console.log('Available products:', products);
};

// Get subscription products
const loadSubscriptions = async () => {
  const subscriptions = await getAvailableSubscriptions();
  console.log('Available subscriptions:', subscriptions);
};
```

### Make Purchases
```ts
import { purchaseProduct, purchaseSubscription } from './src/services/inAppPurchase';

// Purchase a one-time product
const buyProduct = async (productSku: string) => {
  const success = await purchaseProduct(productSku);
  if (success) {
    console.log('Purchase initiated');
  }
};

// Purchase a subscription
const buySubscription = async (subscriptionSku: string) => {
  const success = await purchaseSubscription(subscriptionSku);
  if (success) {
    console.log('Subscription purchase initiated');
  }
};
```

### Restore Purchases
```ts
import { restorePurchases } from './src/services/inAppPurchase';

const restore = async () => {
  const purchases = await restorePurchases();
  console.log('Restored purchases:', purchases);
};
```

### Check Subscription Status
```ts
import { hasActiveSubscription } from './src/services/inAppPurchase';

const checkPremium = async () => {
  const isPremium = await hasActiveSubscription('premium_subscription_sku');
  console.log('Has premium subscription:', isPremium);
};
```

### Cleanup
```ts
import { closeIAP } from './src/services/inAppPurchase';

// Call this when your app is closing or when you no longer need IAP
const cleanup = async () => {
  await closeIAP();
};
```

---

## Important Notes

### Product Identifiers (SKUs)
Update the product SKUs in `/src/services/inAppPurchase.ts`:

```ts
const productSkus = Platform.select({
  ios: [
    'com.yourapp.premium_monthly',
    'com.yourapp.premium_yearly',
    'com.yourapp.premium_lifetime',
  ],
  android: [
    'premium_monthly',
    'premium_yearly', 
    'premium_lifetime',
  ],
}) || [];
```

### Server-Side Validation
For production apps, implement server-side receipt validation in the `validatePurchase` function within the service file.

### Event-Based Purchases
React Native IAP uses event-based purchase handling. Purchase results are delivered through listeners, not as return values from purchase methods.

### Testing
- Use sandbox accounts for testing on iOS
- Use test tracks on Google Play for Android testing
- Never test with real money during development

---

## Next Steps
1. Update your product SKUs in the service file
2. Implement server-side validation
3. Test with sandbox/test accounts
4. Configure your store listings
5. Submit for review