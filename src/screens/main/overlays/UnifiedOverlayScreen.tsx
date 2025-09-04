import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Modal,
  Animated,
  Dimensions,
  Easing,
  ScrollView,
} from 'react-native';
import CustomIcon from '../../../components/CustomIcon';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

interface OverlayConfig {
  backgroundColor: string;
  gradientColors: [string, string, string];
  iconName: string;
  title: string;
  messageTitle: string;
  suggestionText: string;
  recommendationText: string;
  pulseColor: string;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const overlayConfigs: Record<string, OverlayConfig> = {
  yellow: {
    backgroundColor: '#F59E0B',
    gradientColors: ['#FEF3C7', '#FDE68A', '#F59E0B'],
    iconName: 'warning',
    title: 'Yellow Alert',
    messageTitle: 'Mild Concern',
    suggestionText: "Consider taking a moment to check in with yourself",
    recommendationText: "A gentle self-check might be helpful",
    pulseColor: '#FEF3C7',
  },
  orange: {
    backgroundColor: '#EA580C',
    gradientColors: ['#FED7AA', '#FB923C', '#EA580C'],
    iconName: 'warning',
    title: 'Orange Alert',
    messageTitle: 'Moderate Concern',
    suggestionText: "Time for a mindful break! Consider taking a test or exploring interventions",
    recommendationText: "Take action to address your current state",
    pulseColor: '#FED7AA',
  },
  red: {
    backgroundColor: '#DC2626',
    gradientColors: ['#FECACA', '#F87171', '#DC2626'],
    iconName: 'emergency',
    title: 'Red Alert - Critical',
    messageTitle: 'Immediate Attention Required',
    suggestionText: "Immediate intervention is recommended. Please take action now.",
    recommendationText: "Seek immediate support or intervention",
    pulseColor: '#FECACA',
  },
};

export default function UnifiedOverlayScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const overlayType = (route.params as any)?.type || "orange";
  const category = (route.params as any)?.category || null;
  const isTestMode = (route.params as any)?.isTestMode || false;
  const config = overlayConfigs[overlayType] || overlayConfigs.orange;

  // Same database structure as TestScreen
  const appUsageDatabase = {
    "Finance Anxiety": {
      Yellow: {
        totalUsage: "3 hours 15 minutes",
        apps: [
          { name: "PayPal", usage: "45 minutes", icon: "💳", openCount: 12 },
          { name: "Bank of America", usage: "1 hour 20 minutes", icon: "🏦", openCount: 8 },
          { name: "Mint - Budget Tracker", usage: "35 minutes", icon: "💰", openCount: 15 },
          { name: "Robinhood", usage: "35 minutes", icon: "📈", openCount: 6 },
        ],
        trigger: "Moderate financial app usage detected",
      },
      Orange: {
        totalUsage: "5 hours 30 minutes",
        apps: [
          { name: "Trading 212", usage: "2 hours 10 minutes", icon: "📊", openCount: 25 },
          { name: "Chase Mobile", usage: "1 hour 45 minutes", icon: "🏪", openCount: 18 },
          { name: "Coinbase", usage: "1 hour 15 minutes", icon: "₿", openCount: 22 },
          { name: "Personal Capital", usage: "20 minutes", icon: "💼", openCount: 9 },
        ],
        trigger: "High financial app usage with frequent checking",
      },
      Red: {
        totalUsage: "7 hours 45 minutes",
        apps: [
          { name: "E*TRADE", usage: "3 hours 30 minutes", icon: "📱", openCount: 45 },
          { name: "Binance", usage: "2 hours 15 minutes", icon: "🪙", openCount: 38 },
          { name: "TD Ameritrade", usage: "1 hour 40 minutes", icon: "💹", openCount: 28 },
          { name: "Fidelity", usage: "20 minutes", icon: "🏛️", openCount: 12 },
        ],
        trigger: "Excessive financial app usage - possible addiction pattern",
      },
    },
    "Health Anxiety": {
      Red: {
        totalUsage: "6 hours 20 minutes",
        apps: [
          { name: "WebMD", usage: "2 hours 45 minutes", icon: "🏥", openCount: 32 },
          { name: "Mayo Clinic", usage: "1 hour 30 minutes", icon: "🩺", openCount: 18 },
          { name: "Symptom Checker", usage: "1 hour 25 minutes", icon: "🔍", openCount: 24 },
          { name: "Healthline", usage: "40 minutes", icon: "📋", openCount: 15 },
        ],
        trigger: "Compulsive health information seeking detected",
      },
    },
    "Sleep": {
      Yellow: {
        totalUsage: "2 hours 30 minutes",
        apps: [
          { name: "Sleep Cycle", usage: "45 minutes", icon: "😴", openCount: 5 },
          { name: "Calm", usage: "30 minutes", icon: "🧘", openCount: 3 },
          { name: "Headspace", usage: "1 hour 15 minutes", icon: "💭", openCount: 4 },
        ],
        trigger: "Late night app usage affecting sleep schedule",
      },
      Orange: {
        totalUsage: "4 hours 15 minutes",
        apps: [
          { name: "TikTok", usage: "2 hours 30 minutes", icon: "🎵", openCount: 28 },
          { name: "Instagram", usage: "1 hour 20 minutes", icon: "📷", openCount: 22 },
          { name: "YouTube", usage: "25 minutes", icon: "📺", openCount: 8 },
        ],
        trigger: "Excessive screen time before bedtime",
      },
      Red: {
        totalUsage: "6 hours 45 minutes",
        apps: [
          { name: "Netflix", usage: "3 hours 15 minutes", icon: "🎬", openCount: 12 },
          { name: "Twitch", usage: "2 hours 10 minutes", icon: "🎮", openCount: 18 },
          { name: "Reddit", usage: "1 hour 20 minutes", icon: "📱", openCount: 35 },
        ],
        trigger: "Severe sleep disruption from late-night screen time",
      },
    },
    "Gambling": {
      Orange: {
        totalUsage: "4 hours 20 minutes",
        apps: [
          { name: "DraftKings", usage: "2 hours 30 minutes", icon: "🎯", openCount: 15 },
          { name: "FanDuel", usage: "1 hour 25 minutes", icon: "🏈", openCount: 12 },
          { name: "PokerStars", usage: "25 minutes", icon: "♠️", openCount: 6 },
        ],
        trigger: "Increased gambling app activity",
      },
      Red: {
        totalUsage: "8 hours 10 minutes",
        apps: [
          { name: "Caesars Casino", usage: "4 hours 45 minutes", icon: "🎰", openCount: 42 },
          { name: "BetMGM", usage: "2 hours 15 minutes", icon: "🎲", openCount: 28 },
          { name: "Borgata Casino", usage: "1 hour 10 minutes", icon: "🃏", openCount: 22 },
        ],
        trigger: "Compulsive gambling behavior detected",
      },
    },
    "Gaming": {
      Orange: {
        totalUsage: "5 hours 30 minutes",
        apps: [
          { name: "Fortnite", usage: "2 hours 45 minutes", icon: "🎮", openCount: 8 },
          { name: "Call of Duty Mobile", usage: "1 hour 50 minutes", icon: "🔫", openCount: 12 },
          { name: "PUBG Mobile", usage: "55 minutes", icon: "🏹", openCount: 6 },
        ],
        trigger: "Extended gaming session detected",
      },
      Red: {
        totalUsage: "9 hours 15 minutes",
        apps: [
          { name: "World of Warcraft", usage: "5 hours 30 minutes", icon: "⚔️", openCount: 3 },
          { name: "League of Legends", usage: "2 hours 45 minutes", icon: "🏆", openCount: 8 },
          { name: "Steam", usage: "1 hour", icon: "🎯", openCount: 15 },
        ],
        trigger: "Gaming addiction pattern - extended continuous play",
      },
    },
    "Internet Dependence": {
      Orange: {
        totalUsage: "7 hours 20 minutes",
        apps: [
          { name: "Facebook", usage: "2 hours 30 minutes", icon: "👥", openCount: 45 },
          { name: "Twitter", usage: "2 hours 15 minutes", icon: "🐦", openCount: 38 },
          { name: "Instagram", usage: "1 hour 35 minutes", icon: "📸", openCount: 32 },
          { name: "TikTok", usage: "1 hour", icon: "🎵", openCount: 28 },
        ],
        trigger: "Excessive social media usage detected",
      },
    },
    "Impulse Shopping": {
      Orange: {
        totalUsage: "3 hours 45 minutes",
        apps: [
          { name: "Amazon", usage: "1 hour 30 minutes", icon: "📦", openCount: 22 },
          { name: "eBay", usage: "45 minutes", icon: "🛒", openCount: 15 },
          { name: "Wish", usage: "40 minutes", icon: "💫", openCount: 18 },
          { name: "AliExpress", usage: "50 minutes", icon: "🛍️", openCount: 12 },
        ],
        trigger: "Frequent shopping app usage with multiple purchases",
      },
      Red: {
        totalUsage: "6 hours 30 minutes",
        apps: [
          { name: "Amazon", usage: "3 hours 15 minutes", icon: "📦", openCount: 55 },
          { name: "Shopify", usage: "1 hour 20 minutes", icon: "🏪", openCount: 28 },
          { name: "Etsy", usage: "1 hour 10 minutes", icon: "🎨", openCount: 22 },
          { name: "Target", usage: "45 minutes", icon: "🎯", openCount: 18 },
        ],
        trigger: "Compulsive shopping behavior - multiple daily purchases",
      },
    },
    "Food Binging": {
      Orange: {
        totalUsage: "2 hours 45 minutes",
        apps: [
          { name: "Uber Eats", usage: "1 hour 15 minutes", icon: "🍔", openCount: 8 },
          { name: "DoorDash", usage: "45 minutes", icon: "🚗", openCount: 6 },
          { name: "MyFitnessPal", usage: "45 minutes", icon: "📊", openCount: 12 },
        ],
        trigger: "Frequent food delivery app usage",
      },
      Red: {
        totalUsage: "4 hours 20 minutes",
        apps: [
          { name: "Grubhub", usage: "2 hours 10 minutes", icon: "🍕", openCount: 15 },
          { name: "Seamless", usage: "1 hour 30 minutes", icon: "🥡", openCount: 12 },
          { name: "Postmates", usage: "40 minutes", icon: "📱", openCount: 8 },
        ],
        trigger: "Compulsive food ordering behavior detected",
      },
    },
    "Depression and Anxiety": {
      Orange: {
        totalUsage: "5 hours 15 minutes",
        apps: [
          { name: "Instagram", usage: "2 hours 30 minutes", icon: "📱", openCount: 45 },
          { name: "Snapchat", usage: "1 hour 45 minutes", icon: "👻", openCount: 32 },
          { name: "TikTok", usage: "1 hour", icon: "🎵", openCount: 28 },
        ],
        trigger: "Social media usage pattern indicating mood changes",
      },
    },
    "Investment Site": {
      Red: {
        totalUsage: "8 hours 45 minutes",
        apps: [
          { name: "Interactive Brokers", usage: "4 hours 20 minutes", icon: "📈", openCount: 52 },
          { name: "Charles Schwab", usage: "2 hours 30 minutes", icon: "💼", openCount: 35 },
          { name: "Vanguard", usage: "1 hour 55 minutes", icon: "🏛️", openCount: 28 },
        ],
        trigger: "Obsessive investment monitoring detected",
      },
    },
  };

  // Get specific app data if available
  const alertTypeKey = overlayType.charAt(0).toUpperCase() + overlayType.slice(1);
  const specificData = category && isTestMode && 
    (appUsageDatabase as any)[category]?.[alertTypeKey];

  console.log('Overlay Data:', { category, overlayType, alertTypeKey, specificData });

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const iconRotateAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 7,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation for critical alerts
    if (overlayType === 'red') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }

    // Icon rotation animation
    Animated.loop(
      Animated.timing(iconRotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [overlayType, fadeAnim, slideAnim, buttonScaleAnim, pulseAnim, iconRotateAnim]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.goBack();
    });
  };

  const handleTakeTest = () => {
    console.log(`${overlayType} overlay: Take test pressed`);
    // Navigate to test screen - implement this later
    handleClose();
  };

  const handleInterventions = () => {
    console.log(`${overlayType} overlay: Interventions pressed`);
    // Navigate to interventions - implement this later
    handleClose();
  };

  const handleEmergencyContact = () => {
    console.log("Emergency contact pressed");
    // Implement emergency contact functionality
  };

  const iconRotation = iconRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal visible={true} animationType="none" transparent={false}>
      <StatusBar 
        backgroundColor={config.backgroundColor} 
        barStyle="light-content" 
      />
      <Animated.View 
        style={[
          styles.container, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <LinearGradient
          colors={config.gradientColors}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        {/* Header */}
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <CustomIcon type="MI" name="close" size={28} color="white" />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Animated.Text 
                style={[
                  styles.headerTitle,
                  { transform: [{ scale: pulseAnim }] }
                ]}
                numberOfLines={2}
                adjustsFontSizeToFit
              >
                {isTestMode && category ? `${config.title} - ${category} Test` : config.title}
              </Animated.Text>
            </View>
            <View style={styles.placeholder} />
          </View>

          {/* Content - Make scrollable */}
          <ScrollView 
            style={styles.contentContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={true}
          >
            <Animated.View 
              style={[
                styles.alertContainer,
                overlayType === "red" && styles.criticalAlertContainer,
                { transform: [{ scale: buttonScaleAnim }] }
              ]}
            >
              <Text 
                style={[
                  styles.alertSubtitle,
                  overlayType === "red" && styles.criticalSubtitle,
                ]}
              >
                {config.messageTitle}
              </Text>
              
              <View style={styles.messageContainer}>
                <Animated.View 
                  style={[
                    styles.iconContainer,
                    { 
                      backgroundColor: config.pulseColor,
                      transform: [
                        { scale: pulseAnim },
                        { rotate: iconRotation }
                      ] 
                    }
                  ]}
                >
                  <CustomIcon 
                    type="MI"
                    name={config.iconName as any} 
                    size={64} 
                    color={config.backgroundColor} 
                  />
                </Animated.View>
                
                <Animated.Text 
                  style={[
                    styles.highlightText, 
                    { 
                      color: config.backgroundColor,
                      transform: [{ scale: pulseAnim }] 
                    },
                  ]}
                >
                  {config.messageTitle}
                </Animated.Text>
              </View>
              
              <Text style={styles.suggestionText}>
                {isTestMode && specificData
                  ? `${specificData.trigger} - Total Usage: ${specificData.totalUsage}`
                  : isTestMode 
                    ? `This is a test simulation for ${category} ${overlayType} alert. ${config.suggestionText}`
                    : config.suggestionText
                }
              </Text>

              {/* Show app usage data if available */}
              {isTestMode && specificData && (
                <View style={styles.appDataContainer}>
                  <Text style={styles.appDataTitle}>Apps Contributing to Alert:</Text>
                  <ScrollView style={styles.appScrollView} showsVerticalScrollIndicator={false}>
                    {specificData.apps.map((app: any, index: number) => (
                      <View key={index} style={styles.appDataItem}>
                        <Text style={styles.appDataIcon}>{app.icon}</Text>
                        <View style={styles.appDataDetails}>
                          <Text style={styles.appDataName}>{app.name}</Text>
                          <Text style={styles.appDataUsage}>
                            {app.usage} • {app.openCount} opens
                          </Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              )}
              
              <Text 
                style={[
                  styles.recommendationText,
                  overlayType === "red" && {
                    color: config.backgroundColor,
                    fontWeight: "600",
                  },
                ]}
              >
                {config.recommendationText}
              </Text>
            </Animated.View>

            {/* Action Buttons */}
            <Animated.View 
              style={[
                styles.buttonsContainer,
                { transform: [{ scale: buttonScaleAnim }] }
              ]}
            >
              <TouchableOpacity 
                style={[styles.actionButton, styles.primaryButton]}
                onPress={handleTakeTest}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#60A5FA', '#3B82F6', '#2563EB']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <CustomIcon type="MI" name="assessment" size={24} color="white" />
                  <Text style={styles.buttonText}>
                    {overlayType === "red" ? "Take Assessment" : "Take a test"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={handleInterventions}
                activeOpacity={0.8}
              >
                <CustomIcon type="MI" name="healing" size={24} color="#4A5568" />
                <Text style={[styles.buttonText, { color: '#4A5568' }]}>
                  View Interventions
                </Text>
              </TouchableOpacity>

              {overlayType === 'red' && (
                <TouchableOpacity 
                  style={[styles.actionButton, styles.emergencyButton]}
                  onPress={handleEmergencyContact}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#F87171', '#EF4444', '#DC2626']}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <CustomIcon type="MI" name="local-hospital" size={24} color="white" />
                    <Text style={styles.buttonText}>Emergency Contact</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </Animated.View>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 20,
  },
  closeButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    fontFamily: "Poppins-Bold",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    textAlign: "center",
    lineHeight: 22,
  },
  placeholder: {
    width: 48,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  alertContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 32,
    marginBottom: 32,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  criticalAlertContainer: {
    borderWidth: 3,
    borderColor: '#DC2626',
    backgroundColor: 'rgba(254, 242, 242, 0.95)',
    shadowColor: '#DC2626',
    shadowOpacity: 0.3,
  },
  alertSubtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 24,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  criticalSubtitle: {
    color: '#DC2626',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  highlightText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  suggestionText: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 26,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  recommendationText: {
    fontSize: 14,
    color: '#718096',
    fontStyle: 'italic',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    lineHeight: 22,
  },
  buttonsContainer: {
    gap: 16,
  },
  actionButton: {
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 28,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#4299E1',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 2,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 28,
    gap: 12,
  },
  emergencyButton: {
    backgroundColor: '#E53E3E',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  appDataContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    maxHeight: 200,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appDataTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 12,
    fontFamily: "Poppins-SemiBold",
  },
  appScrollView: {
    maxHeight: 140,
  },
  appDataItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(247, 250, 252, 0.8)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  appDataIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  appDataDetails: {
    flex: 1,
  },
  appDataName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2D3748",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 2,
  },
  appDataUsage: {
    fontSize: 11,
    color: "#718096",
    fontFamily: "Poppins-Regular",
  },
});
