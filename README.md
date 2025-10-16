# 🧠 MiniMinds - Your Mental Wellness Companion

<div align="center">

**A comprehensive mental health and wellness tracking application**

[![React Native](https://img.shields.io/badge/React%20Native-0.81.0-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![Android](https://img.shields.io/badge/Android-API%2024+-green.svg)](https://developer.android.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

[Features](#-features) • [Screenshots](#-screenshots) • [Installation](#-installation) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

**MiniMinds** is a comprehensive mental wellness application designed to help users maintain healthy digital habits, track their mental health conditions, and access evidence-based interventions. The app combines modern psychology principles with cutting-edge mobile technology to provide a personalized mental health journey.

### 🎯 Mission

To democratize mental health care by providing accessible, affordable, and effective tools for mental wellness monitoring and improvement.

---

## ✨ Features

### 🔍 Core Features

#### 1. **Mental Health Assessments**
- 📊 16+ specialized psychological scans covering:
  - Addictions
  - Anger Management
  - Stress & Anxiety
  - Depression & Suicidal Behavior
  - Sleep Quality
  - Relationship Issues
  - Professional Mental Health
  - And more...
- 📈 Real-time scoring with severity assessment
- 🎯 Personalized recommendations based on results

#### 2. **Intelligent Interventions System**
- 🗓️ Scheduled interventions (Daily, Weekly, Bi-weekly, Monthly)
- ✅ Task completion tracking with XP rewards
- 🎮 Gamification elements to encourage consistency
- 📱 Push notifications for reminders
- 📊 Progress visualization

#### 3. **Digital Wellness Monitoring**
- ⏱️ App usage tracking using Android's UsageStatsManager
- 🚨 Customizable usage limits and wellness alerts
- 🔔 Foreground service for continuous monitoring
- 💡 Real-time interventions when limits are reached
- 📉 Usage pattern analysis

#### 4. **Conditions Management**
- 📋 Track multiple mental health conditions simultaneously
- 🏷️ Custom categorization and notes
- 📊 Historical data visualization
- 🔄 Regular reassessments and progress tracking

#### 5. **Insights Dashboard**
- 📈 Interactive charts showing wellness trends over time
- 🏆 XP and achievement tracking (gamification)
- 📊 Condition-specific analytics
- 📅 Time-based filtering (daily, weekly, monthly, yearly)
- 💤 Sleep tracking integration

#### 6. **Multi-language Support**
- 🌍 Full internationalization (i18n) support
- 🗣️ Currently supports multiple languages
- 🔄 Easy language switching in-app

#### 7. **Profile & Personalization**
- 👤 Custom avatars with wellness-based recommendations
- 📸 Profile photo upload
- ⚙️ Customizable settings
- 🎨 Theme preferences

### 🔒 Privacy & Security

- 🔐 End-to-end encryption for sensitive data
- 💾 Local-first data storage with SQLite
- 🔑 OAuth 2.0 authentication (Google Sign-In)
- 🚫 No third-party data sharing
- 🗑️ Easy account deletion (GDPR compliant)

### 💰 Monetization

- 💳 In-app purchases using React Native IAP
- 🎁 Freemium model with premium features
- 📱 Subscription management
- 🔄 RevenueCat integration for cross-platform support

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React Native 0.81.0
- **Language:** TypeScript 5.8.3
- **UI Components:** Custom components with React Native's core APIs
- **Navigation:** React Navigation 7.x (Stack, Bottom Tabs)
- **State Management:** Redux Toolkit + Redux Persist
- **Icons:** Lucide React Native + React Native Vector Icons
- **Charts:** React Native Chart Kit + Gifted Charts
- **Animations:** React Native Reanimated

### Backend & Services
- **API:** Google Cloud Platform (App Engine)
- **Authentication:** Google Sign-In OAuth 2.0
- **Database:** SQLite (local storage)
- **Persistent Storage:** AsyncStorage
- **Analytics:** Custom implementation

### Native Features
- **Android Services:** Foreground Service (Usage Monitoring)
- **Permissions:** UsageStats, Overlay, System Alert Window
- **IAP:** React Native IAP with Google Play Billing
- **PDF Generation:** React Native HTML to PDF
- **File System:** React Native FS

### Developer Tools
- **Build System:** Gradle 8.13
- **Testing:** Jest
- **Linting:** ESLint
- **Code Quality:** Prettier
- **Version Control:** Git

---

## 🏗️ Architecture

### Project Structure

```
thought-pro/
├── android/                    # Android native code
│   ├── app/
│   │   ├── src/main/java/com/syneptlabs/miniminds/
│   │   │   ├── MainActivity.kt          # Main activity
│   │   │   ├── MainApplication.kt       # Application entry point
│   │   │   ├── UsageMonitorService.java # Background service
│   │   │   ├── OverlayService.java      # Overlay alerts
│   │   │   └── UsageStatsModule.java    # Native module bridge
│   │   └── build.gradle                 # App-level Gradle config
│   └── build.gradle                     # Project-level Gradle config
├── ios/                        # iOS native code (future support)
├── src/
│   ├── api/                    # API integration layer
│   ├── assets/                 # Images, fonts, static files
│   ├── components/             # Reusable UI components
│   │   ├── common/             # Shared components
│   │   └── CustomIcon.tsx      # Icon wrapper
│   ├── context/                # React Context providers
│   ├── data/                   # Static data and constants
│   ├── hooks/                  # Custom React hooks
│   ├── i18n/                   # Internationalization
│   │   └── locales/            # Translation files
│   ├── navigation/             # Navigation configuration
│   ├── redux/                  # Redux store and slices
│   ├── screens/                # App screens
│   │   ├── main/               # Main app screens
│   │   │   ├── homeTab/        # Home dashboard
│   │   │   ├── Insights/       # Analytics & insights
│   │   │   ├── Profile/        # User profile
│   │   │   └── Interventions/  # Task management
│   │   ├── auth/               # Authentication screens
│   │   └── onboarding/         # First-time user experience
│   ├── services/               # Business logic layer
│   │   └── database.ts         # SQLite operations
│   ├── theme/                  # Styling and theming
│   ├── types/                  # TypeScript type definitions
│   └── utils/                  # Utility functions
├── scripts/                    # Build and automation scripts
├── docs/                       # Documentation
├── App.tsx                     # Root component
├── index.js                    # App entry point
└── package.json                # Dependencies and scripts
```

### Key Design Patterns

#### 1. **Component-Based Architecture**
- Modular, reusable components
- Separation of concerns (presentation vs. logic)
- Props-driven with TypeScript interfaces

#### 2. **State Management**
```typescript
// Redux Toolkit for global state
store/
├── slices/
│   ├── userSlice.ts
│   ├── wellnessSlice.ts
│   └── interventionsSlice.ts
└── store.ts
```

#### 3. **Service Layer Pattern**
```typescript
// Database operations abstracted
services/
└── database.ts
    ├── getAllScanResults()
    ├── saveScanResult()
    └── updateCondition()
```

#### 4. **Custom Hooks**
```typescript
// Reusable business logic
hooks/
├── useExitConfirmation.ts
├── useWellnessScore.ts
└── useNotifications.ts
```

---

## 📥 Installation

### Prerequisites

- **Node.js:** >= 18.x
- **npm or Yarn:** Latest version
- **Android Studio:** For Android development
- **JDK:** 17 or higher
- **Android SDK:** API Level 24+ (Android 7.0)

### Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/ViditAgrawal21/MiniMinds.git
cd MiniMinds/thought-pro
```

#### 2. Install Dependencies

```bash
# Using npm
npm install

# OR using Yarn
yarn install
```

#### 3. Configure Environment

Create necessary configuration files:

```bash
# Android keystore for signing (production)
# Place your release.keystore in android/app/
```

Update `android/gradle.properties` with your signing credentials:

```properties
MYAPP_UPLOAD_STORE_FILE=release.keystore
MYAPP_UPLOAD_KEY_ALIAS=your-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=your-store-password
MYAPP_UPLOAD_KEY_PASSWORD=your-key-password
```

#### 4. Run the Application

**Android:**

```bash
# Start Metro bundler
npm start

# In a new terminal, run Android
npm run android

# OR run release build
cd android
./gradlew assembleRelease
# APK will be at: android/app/build/outputs/apk/release/app-release.apk
```

**iOS (macOS only):**

```bash
# Install CocoaPods dependencies
cd ios
bundle install
bundle exec pod install
cd ..

# Run iOS
npm run ios
```

---

## 🔧 Configuration

### Android Permissions

The app requires the following permissions (automatically configured in AndroidManifest.xml):

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.PACKAGE_USAGE_STATS" />
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_DATA_SYNC" />
```

### API Configuration

Update the backend API URL in your environment:

```typescript
// src/api/config.ts
export const API_BASE_URL = 'https://booking-system-468212.el.r.appspot.com';
```

### Google Sign-In Setup

1. Create a project in [Google Cloud Console](https://console.cloud.google.com)
2. Enable Google Sign-In API
3. Add your SHA-1 certificate fingerprint
4. Download `google-services.json` and place in `android/app/`

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- path/to/test.ts
```

---

## 📦 Building for Production

### Android Release Build

#### Generate AAB (Android App Bundle)

```bash
cd android
./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`

#### Generate APK

```bash
cd android
./gradlew assembleRelease
```

Output: `android/app/build/outputs/apk/release/app-release.apk`

---

## 🚀 Deployment

### Google Play Store

1. **Prepare Store Listing:**
   - App name: "Mini Minds"
   - Short description (80 chars)
   - Full description (4000 chars)
   - Feature graphic (1024x500px)
   - Screenshots (minimum 2)

2. **Upload AAB:**
   - Go to Play Console → Production → Create new release
   - Upload `app-release.aab`

3. **Configure:**
   - Content rating: 13+
   - Privacy policy URL
   - Data safety declarations
   - App access (test account credentials)

4. **Submit for Review**

---

## 📊 Key Metrics

- **App Size:** ~44 MB (AAB)
- **Package Name:** com.syneptlabs.miniminds
- **Version:** 1.1 (versionCode 2)
- **Min SDK:** 24 (Android 7.0)
- **Target SDK:** 36 (Android 15)
- **Supported Architectures:** arm64-v8a, armeabi-v7a, x86, x86_64

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with descriptive messages:**
   ```bash
   git commit -m "feat: add new intervention scheduling feature"
   ```
6. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request**

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier for formatting
- Write meaningful commit messages (Conventional Commits)
- Add JSDoc comments for public APIs
- Write unit tests for new features

### Commit Message Convention

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: code style changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

---

## 📄 Documentation

Detailed documentation available in the `/docs` folder:

- [Login Screen Documentation](docs/01_LOGIN_SCREEN_DOCUMENTATION.md)
- [Language Selection](docs/02_LANGUAGE_SELECTION_DOCUMENTATION.md)
- [Privacy Notice](docs/03_PRIVACY_NOTICE_DOCUMENTATION.md)
- [Self Onboarding](docs/04_SELF_ONBOARDING_DOCUMENTATION.md)
- [Home Tab](docs/05_HOME_TAB_DOCUMENTATION.md)
- [Insights Screen](docs/06_INSIGHTS_SCREEN_DOCUMENTATION.md)
- [MindTools Screen](docs/07_MINDTOOLS_SCREEN_DOCUMENTATION.md)
- [Profile Screen](docs/08_PROFILE_SCREEN_DOCUMENTATION.md)
- [Conditions Scan End-to-End](docs/09_CONDITIONS_SCAN_END_TO_END_DOCUMENTATION.md)

Additional guides:
- [Subscription Implementation](SUBSCRIPTION_IMPLEMENTATION_GUIDE.md)
- [Account Deletion Policy](ACCOUNT_DELETION.md)
- [RevenueCat Setup](REVENUECAT_SETUP.md)
- [Android IAP Testing](ANDROID_IAP_TESTING_GUIDE.md)

---

## 🐛 Known Issues

- **Android 14+:** Some overlay permissions may require manual granting
- **Battery Optimization:** Background service may be killed on some OEM devices
- **iOS:** Currently under development

---

## 📝 Changelog

### Version 1.1 (Current)
- ✨ Enhanced dashboard with XP tracking
- 🔄 Improved intervention scheduling
- 🌍 Multi-language support
- 📊 Advanced analytics charts
- 🐛 Bug fixes and performance improvements

### Version 1.0
- 🎉 Initial release
- 📱 Core mental health assessments
- 📊 Basic insights dashboard
- 🔔 Notification system

---

## 📞 Support

### For Users

- **Email:** support@miniminds.app
- **In-App Support:** Profile → Help & Support

### For Developers

- **GitHub Issues:** [Create an issue](https://github.com/ViditAgrawal21/MiniMinds/issues)
- **Documentation:** Check `/docs` folder

---

## 🙏 Acknowledgments

- React Native community for excellent documentation
- Open source contributors
- Mental health professionals for guidance
- All beta testers and early adopters

---

## 📜 License

**Proprietary - All Rights Reserved**

Copyright © 2025 Synept Labs. This software is proprietary and confidential. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited.

For licensing inquiries, contact: legal@syneptlabs.com

---

## 👥 Team

**Synept Labs**
- Mental wellness technology specialists
- Committed to accessible mental health care

---

## 🔗 Links

- **Repository:** [github.com/ViditAgrawal21/MiniMinds](https://github.com/ViditAgrawal21/MiniMinds)
- **Privacy Policy:** [View on GitHub](ACCOUNT_DELETION.md)

---

<div align="center">

**Made with ❤️ by Synept Labs**

⭐ Star us on GitHub if you find this project helpful!

</div>

---

# Getting Started (Development)

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
