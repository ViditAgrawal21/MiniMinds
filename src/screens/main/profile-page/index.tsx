import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileHeader from "../../../components/ProfileHeader";
import QuoteCard from "../../../components/QuoteCard";
import ProfileMenuItem from "../../../components/ProfileMenuItem";
import CustomIcon from "@/components/CustomIcon";
import { useNavigation } from "@react-navigation/native";
import { t } from "@/i18n/locales/i18n"; // Import translation function

interface MenuItem {
  label: string;
  subLabel?: string;
  progress?: number;
  type: "general" | "onboarding" | "guardian" | "mindtools" | "language";
}

export default function ProfilePage() {
  const navigation = useNavigation<any>();
  const [onboardingProgress, setOnboardingProgress] = useState(0);
  const [onboardingType, setOnboardingType] = useState<"self" | "child" | null>(
    null,
  );

  useEffect(() => {
    const fetchOnboardingProgress = async () => {
      try {
        const storedResponses = await AsyncStorage.getItem(
          "onboardingResponses",
        );
        if (storedResponses) {
          const responses = JSON.parse(storedResponses);

          // Check if we have any child scores to determine onboarding type
          if (
            responses.child2Score ||
            responses.child3Score ||
            responses.child4Score ||
            responses.child5Score
          ) {
            setOnboardingType("child");
            // Use the overall child onboarding score directly
            setOnboardingProgress(responses.overallChildOnboardingScore || 0);
          }
          // Check if we have any self scores
          else if (
            responses.self2Score ||
            responses.self3Score ||
            responses.self4Score ||
            responses.self5Score
          ) {
            setOnboardingType("self");
            
            // Calculate completion percentage based on answered questions
            let answeredQuestions = 0;
            const totalQuestions = 13; // Total questions across all screens

            // Self1 (3 questions)
            if (responses.name && responses.dob && responses.gender) answeredQuestions += 3;
            else if (responses.name || responses.dob || responses.gender) {
              answeredQuestions += [responses.name, responses.dob, responses.gender].filter(Boolean).length;
            }

            // Self2 (3 questions)
            if (responses.lifeStatusKey && responses.workLifeKey && responses.feelingKey) answeredQuestions += 3;
            else if (responses.lifeStatusKey || responses.workLifeKey || responses.feelingKey) {
              answeredQuestions += [responses.lifeStatusKey, responses.workLifeKey, responses.feelingKey].filter(Boolean).length;
            }

            // Self3 (2 questions)
            if (responses.socialMediaTimeKey && responses.socialMediaEffectKey) answeredQuestions += 2;
            else if (responses.socialMediaTimeKey || responses.socialMediaEffectKey) {
              answeredQuestions += [responses.socialMediaTimeKey, responses.socialMediaEffectKey].filter(Boolean).length;
            }

            // Self4 (3 questions)
            if (responses.screen6?.irritabilityKey && responses.screen6?.muscleTensionKey && responses.screen6?.anxietySleepKey) answeredQuestions += 3;
            else if (responses.screen6?.irritabilityKey || responses.screen6?.muscleTensionKey || responses.screen6?.anxietySleepKey) {
              answeredQuestions += [responses.screen6?.irritabilityKey, responses.screen6?.muscleTensionKey, responses.screen6?.anxietySleepKey].filter(Boolean).length;
            }

            // Self5 (2 questions)
            if (responses.screen11?.overwhelmedKey && responses.screen11?.physicalSymptomsKey) answeredQuestions += 2;
            else if (responses.screen11?.overwhelmedKey || responses.screen11?.physicalSymptomsKey) {
              answeredQuestions += [responses.screen11?.overwhelmedKey, responses.screen11?.physicalSymptomsKey].filter(Boolean).length;
            }

            // Calculate percentage
            const completionPercentage = Math.round((answeredQuestions / totalQuestions) * 100);
            setOnboardingProgress(completionPercentage);
          }
          // If no scores exist yet, leave as null
        }
      } catch (error) {
        console.error("Error fetching onboarding progress:", error);
      }
    };

    fetchOnboardingProgress();
  }, []);

  const handlePremiumPress = () => {
    navigation.navigate("UpgradeToPremium" );
  };

  const handleContinueOnboarding = () => {
    if (onboardingProgress === 100) {
      // Show completion alert based on onboarding type
      const message =
        onboardingType === "child"
          ? t(
              "onboarding.childComplete",
              "Child's onboarding is completed! You're all set to help them on their journey.",
            )
          : t(
              "onboarding.selfComplete",
              "Self onboarding is completed! You're ready to begin your wellness journey.",
            );

      Alert.alert(
        t("onboarding.completeTitle", "Onboarding Complete! 🎉"),
        message,
        [
          {
            text: t("common.ok", "OK"),
            style: "default",
          },
        ],
      );
      return;
    }

    // If not 100%, handle navigation
    if (onboardingType === "self") {
      navigation.navigate("SelfOnboarding" as never);
    } else if (onboardingType === "child") {
      navigation.navigate("Child1" as never);
    } else {
      navigation.navigate("selforchild" as never);
    }
  };

  const getOnboardingLabel = () => {
    if (onboardingProgress === 100) {
      return t("onboarding.complete", "100% Complete");
    }
    if (onboardingType) {
      return t(
        "profilePage.continueOnboarding",
        `Continue ${onboardingType.charAt(0).toUpperCase() + onboardingType.slice(1)} Onboarding`,
      );
    }
    return t("profilePage.continueOnboarding", "Continue Onboarding");
  };

  const menuItems: MenuItem[] = [
    {
      label: t("profilePage.generalSettings", "General Settings"),
      subLabel: t(
        "profilePage.generalSettingsSubLabel",
        "Notification, Account Setting, Support",
      ),
      type: "general",
    },
    {
      label: getOnboardingLabel(),
      progress: onboardingProgress,
      type: "onboarding",
    },
    // {
    //   label: t("profilePage.guardianSettings", "Guardian Settings"),
    //   subLabel: t(
    //     "profilePage.guardianSettingsSubLabel",
    //     "Add Guardian, Edit Guardian, Password",
    //   ),
    //   type: "guardian"
    // },
    {
      label: t("profilePage.changeLanguage", "Change language"),
      type: "language",
    },
    // {
    //   label: t("profilePage.mindToolSettings", "Mind Tool Settings"),
    //   type: "mindtools",
    // },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProfileHeader />
        <QuoteCard
          title={t("profilePage.quoteTitle", "Quote of the Day")}
        />
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <ProfileMenuItem
              key={index}
              label={item.label}
              subLabel={item.subLabel}
              progress={item.progress}
              onPress={() => {
                switch (item.type) {
                  // case "guardian":
                  //   navigation.navigate("GuardianSettings" as never);
                  //   break;
                  case "language":
                    navigation.navigate("LanguageSelect", {
                      reset: true,
                    });
                    break;
                  case "general":
                    navigation.navigate("generalsettings" as never);
                    break;
                  case "onboarding":
                    handleContinueOnboarding();
                    break;
                  case "mindtools":
                    // Handle mind tools navigation if needed
                    break;
                }
              }}
            />
          ))}
          <Pressable
            style={styles.premiumContainer}
            onPress={handlePremiumPress}
          >
            <View style={styles.premiumContent}>
              <CustomIcon type="MCI"
                name="crown"
                size={18}
                color="#C841CC"
                style={styles.premiumIcon}
              />
              <Text style={styles.premiumText}>
                {t("profilePage.upgradeToPremium", "Upgrade to Premium")}
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  menuContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  premiumContainer: {
    borderRadius: 8,
    paddingVertical: 18,
    paddingHorizontal: 12,
  },
  premiumContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  premiumIcon: {
    marginRight: 8,
  },
  premiumText: {
    color: "#C841CC",
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    letterSpacing: 0.5,
    lineHeight: 24,
  },
});
