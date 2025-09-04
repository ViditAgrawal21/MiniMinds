# RevenueCat Setup (React Native)

## What is RevenueCat?
RevenueCat provides a backend and a wrapper around StoreKit and Google Play Billing to make implementing in-app purchases and subscriptions easy. With our SDK, you can build and manage your app business on any platform without having to maintain IAP infrastructure. You can read more about how RevenueCat fits into your app or you can sign up free to start building.

---

## Installation

### Release
Make sure that the deployment target for iOS is at least 13.4 and Android is at least 6.0 (API 23) as defined here.

### React Native package
Purchases for React Native can be installed either via npm or yarn.

We recommend using the latest version of React Native, or making sure that the version is at least greater than 0.64.

#### Option 1.1: Using auto-linking
Recent versions of React Native will automatically link the SDK, so all that's needed is to install the library.

- npm

```bash
npm install react-native-purchases
```

- yarn

```bash
yarn add react-native-purchases
```

#### Option 1.2: Manual linking
Install the package, then link it to the native projects.

- npm

```bash
npm install react-native-purchases
```

- yarn

```bash
yarn add react-native-purchases
```

Then link:

```bash
react-native link react-native-purchases
```

### Using Expo
Use Expo to rapidly iterate on your app by using JavaScript/TypeScript exclusively, while letting Expo take care of everything else.

See Using RevenueCat with Expo to get started.

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

You can find Android's documentation on the various `launchMode` options here.

### Include BILLING permission
Don't forget to include the BILLING permission in your `AndroidManifest.xml` file:

```xml
<uses-permission android:name="com.android.vending.BILLING" />
```

### Android Build Issues — R8 Dependencies Conflict
If you encounter build failures related to R8 (Android's code shrinker) when using `react-native-purchases-ui`, you may see errors like:

```
Execution failed for task ':app:mergeExtDexDevDebug'.
> Could not resolve all files for configuration ':app:devDebugRuntimeClasspath'.
```

This issue occurs due to a bug in earlier versions of Android Gradle Plugin (AGP) that affects R8 dependency resolution. To fix this, add the following to your project-level `build.gradle` file (not `app/build.gradle`):

`build.gradle (project level)`

```groovy
buildscript {
    repositories {
        mavenCentral()
        maven {
            url = uri("https://storage.googleapis.com/r8-releases/raw")
        }
    }
    dependencies {
        classpath("com.android.tools:r8:8.1.44")
    }
}
```

This solution forces the use of a specific R8 version that resolves the dependency conflicts. For more details, see the Google Issue Tracker.

---

## iOS Setup

### Enable In‑App Purchase capability
Don't forget to enable the In‑App Purchase capability for your project under:

Project Target → Capabilities → In‑App Purchase

---

## Usage

### Import Purchases
You should now be able to import Purchases.

```ts
import Purchases from 'react-native-purchases';
```

---

## Next Steps
Now that you've installed the Purchases SDK in your React Native app, get started by initializing an instance of Purchases →