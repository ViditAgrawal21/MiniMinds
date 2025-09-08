# ThoughtPro Subscription Update Guide

## ✅ Changes Made

Your in-app purchase code has been updated to align with your new Google Play Console subscription configuration:

### 📱 New Subscription Configuration
- **Product ID**: `thoughtpro_subscriptions`
- **Monthly Plan**: `plan-299` (1 month, prepaid)
- **Yearly Plan**: `plan-yearly` (1 year, prepaid)
- **Benefits**: All‑in free access, 10+ Scans, Primary & Secondary Interventions, Video Tertiary Content

### 🔄 Updated Functions

#### New Functions:
```typescript
// Purchase specific subscription plans
purchaseThoughtProSubscription(basePlanId: 'plan-299' | 'plan-yearly')
purchaseMonthlySubscription()  // Uses plan-299
purchaseYearlySubscription()   // Uses plan-yearly

// Check subscription status
hasThoughtProSubscription()
getThoughtProSubscriptionInfo()

// Get pricing and plans
getAvailableBasePlans()
getSubscriptionPricing()
```

#### Backward Compatibility:
```typescript
// Old function names still work
purchase4WeekSubscription() // → purchaseMonthlySubscription()
has4WeekSubscription()      // → hasThoughtProSubscription()
```

## 🚀 How to Use

### 1. Purchase Monthly Subscription
```typescript
import { purchaseMonthlySubscription } from '../services/inAppPurchase';

const handleMonthlyPurchase = async () => {
  try {
    const success = await purchaseMonthlySubscription();
    if (success) {
      console.log('Monthly subscription purchase initiated');
      // Handle success (purchase completion will be handled by listeners)
    }
  } catch (error) {
    console.error('Purchase failed:', error);
  }
};
```

### 2. Purchase Yearly Subscription
```typescript
import { purchaseYearlySubscription } from '../services/inAppPurchase';

const handleYearlyPurchase = async () => {
  try {
    const success = await purchaseYearlySubscription();
    if (success) {
      console.log('Yearly subscription purchase initiated');
    }
  } catch (error) {
    console.error('Purchase failed:', error);
  }
};
```

### 3. Check Subscription Status
```typescript
import { hasThoughtProSubscription, getThoughtProSubscriptionInfo } from '../services/inAppPurchase';

const checkSubscription = async () => {
  const hasSubscription = await hasThoughtProSubscription();
  
  if (hasSubscription) {
    const subscriptionInfo = await getThoughtProSubscriptionInfo();
    console.log('Subscription details:', subscriptionInfo);
    // { isActive: true, basePlan: 'plan-299', productId: 'thoughtpro_subscriptions', ... }
  }
};
```

### 4. Get Pricing Information
```typescript
import { getSubscriptionPricing } from '../services/inAppPurchase';

const loadPricing = async () => {
  const pricing = await getSubscriptionPricing();
  console.log('Monthly price:', pricing.monthly?.price); // e.g., "₹299"
  console.log('Yearly price:', pricing.yearly?.price);   // e.g., "₹2999"
};
```

### 5. Debug Subscription Setup
```typescript
import { debugSubscriptionSetup } from '../services/inAppPurchase';

// Use this function to troubleshoot subscription configuration
await debugSubscriptionSetup();
```

## 🔧 Testing

### Development Testing:
1. **Emulator/Development**: Mock functions will be used automatically
2. **Real Device Testing**: 
   - Upload signed APK to Google Play Console (Internal Testing)
   - Add test accounts in Play Console
   - Install from Play Store on test device

### Common Issues and Solutions:

#### ❌ "No subscriptions available"
- Ensure subscription is published in Play Console (even for testing)
- Verify package name matches between app and Play Console
- Check that base plans (plan-299, plan-yearly) are active

#### ❌ "E_DEVELOPER_ERROR"
- Verify subscription product ID: `thoughtpro_subscriptions`
- Ensure base plans are properly configured
- Check that your app is signed with the same key as uploaded to Play Console

#### ❌ "E_ITEM_UNAVAILABLE"
- Subscription may not be published
- Check if your test account has access
- Verify the subscription is available in your region

## 📝 Example UI Implementation

```typescript
// Example subscription screen component
const SubscriptionScreen = () => {
  const [pricing, setPricing] = useState<any>({});
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const pricingData = await getSubscriptionPricing();
      const subscriptionStatus = await hasThoughtProSubscription();
      
      setPricing(pricingData);
      setHasSubscription(subscriptionStatus);
    };
    
    loadData();
  }, []);

  const handleMonthlyPurchase = async () => {
    const success = await purchaseMonthlySubscription();
    if (success) {
      // Show success message or navigate
    }
  };

  const handleYearlyPurchase = async () => {
    const success = await purchaseYearlySubscription();
    if (success) {
      // Show success message or navigate
    }
  };

  if (hasSubscription) {
    return <Text>You already have an active subscription!</Text>;
  }

  return (
    <View>
      <Text>Choose Your Plan</Text>
      
      <TouchableOpacity onPress={handleMonthlyPurchase}>
        <Text>Monthly Plan - {pricing.monthly?.price || '₹299'}</Text>
        <Text>1 month access</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleYearlyPurchase}>
        <Text>Yearly Plan - {pricing.yearly?.price || '₹2999'}</Text>
        <Text>12 months access - Save money!</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## 🎯 Next Steps

1. **Test the updated code** with the debug function
2. **Update your UI** to use the new functions
3. **Upload a signed build** to Google Play Console for testing
4. **Add test accounts** in Play Console → Setup → License testing
5. **Test on real devices** with test accounts

## 📋 Summary of Benefits

✅ **Aligned with Google Play Console**: Product ID and base plans match exactly  
✅ **Backward Compatible**: Old function names still work  
✅ **Better Error Handling**: Enhanced debugging and error messages  
✅ **Modern API Support**: Works with latest react-native-iap v14+  
✅ **Flexible Plans**: Easy to add more plans in the future  
✅ **Development Friendly**: Mock data for testing without billing setup  

Your subscription system is now ready to work with your Google Play Console configuration!
