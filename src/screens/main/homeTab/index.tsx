import InterventionsSheet from "@/components/common/InterventionsSheet";
import InterventionDetailModal from "@/components/common/InterventionDetailModal";
import { interventionsData } from "@/components/interventionScanDBCall";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Modal,
} from "react-native";
import * as Progress from "react-native-progress";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";

type HomeTabNavigationProp = NativeStackNavigationProp<RootStackParamList>;
import { TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLanguage } from "@/context/LanguageContext";
import RecommendedInterventionsList, {
  ScanItem,
} from "@/components/common/RecommendedInterventionsList";
import interventionObject from "@/components/interventionScanDBCall";
import { t } from "@/i18n/locales/i18n"; // Import translation function directly
import { getWellnessScore } from "@/utils/wellnessScore";
// ---------------------------------------------------------------------------
// Daily Mind‑Tools and EQ decks (round‑robin rotation)
// ---------------------------------------------------------------------------
const ANCHOR_DATE = new Date("2025-01-01");

type SimpleTip = {
  title: string;
  description: string;
  example: string;
  task: string;
};
type EqTip = { title: string; description: string[] };

const mindToolsKeys = [
  "emotionalAuditing",
  "reverseGratitude", 
  "fiveRule",
  "microMeditation",
  "jomo",
  "brainDumpJournaling",
  "thirdStoryTechnique",
  "deliberateDaydreaming",
  "failureCV",
  "fiveSecondRule",
  "mirrorQuestions",
  "randomActsKindness",
  "noComplaintConversations",
  "platinumRule",
  "neurosnacking",
  "coldExposure",
  "laughterYoga",
  "deathMeditation",
  "alterEgoExperiment",
  "futureSelfLetters"
];

const eqTips: EqTip[] = [
  {
    title: "EQ – Self‑Awareness",
    description: [
      "Keep a daily mood journal to identify emotional triggers and patterns.",
      "Practice mindfulness to observe your emotions without judgment.",
      'Ask yourself daily: "What emotion am I feeling right now? Why?"',
      "Request feedback from trusted friends about your emotional blind spots.",
      'Use "name it to tame it"—label emotions as they arise to reduce their intensity.',
    ],
  },
  {
    title: "EQ – Self‑Regulation",
    description: [
      "Pause before reacting—count to 5 or take a deep breath during emotional situations.",
      'Create a "calm‑down" plan: identify activities or places that help you reset.',
      "Reframe negative thoughts using cognitive techniques like the 5‑5‑5 Rule.",
      "Keep a list of grounding techniques (e.g., cold splash, sensory objects) for high‑stress moments.",
      "Review emotional reactions weekly: what worked, what didn't, and how you could respond better next time.",
    ],
  },
  {
    title: "EQ – Motivation",
    description: [
      "Set short‑term goals tied to a larger purpose to build intrinsic motivation.",
      "Write a letter from your future self to reinforce long‑term vision and effort.",
      "Track daily progress and celebrate small wins to stay motivated.",
      "Use affirmations and visualisation techniques to reinforce a growth mindset.",
      'Create a "Why I Started" board to remind yourself of your original passion and purpose.',
    ],
  },
  {
    title: "EQ – Empathy",
    description: [
      "Practice active listening—repeat back what someone said before responding.",
      'Ask mirror questions: "What are they really feeling or needing?"',
      "Read fiction or watch character‑driven films to practise emotional perspective‑taking.",
      'When in conflict, use the "Third Story" technique to understand both sides neutrally.',
      "Volunteer or spend time in diverse communities to increase exposure to others' lived experiences.",
    ],
  },
  {
    title: "EQ – Social Skills",
    description: [
      "Start conversations with curiosity—ask open‑ended questions.",
      "Practice giving genuine compliments or recognition without expectation.",
      "Engage in no‑complaint conversations to develop positive interaction habits.",
      'Use the "Platinum Rule" to adapt your communication style to others\' preferences.',
      "Join group activities, clubs, or communities to build collaborative experience.",
    ],
  },
];
const SCREEN_WIDTH = Dimensions.get("window").width;

// ---------------------------------------------------------------------------
// AsyncStorage helper to read saved profile image
// ---------------------------------------------------------------------------
const PROFILE_KEY = "profile_v1";

async function getStoredProfile(): Promise<{
  imageUri: string | null;
  currentAvatar?: any;
}> {
  try {
    const raw = await AsyncStorage.getItem(PROFILE_KEY);
    if (raw) {
      const obj = JSON.parse(raw);
      return {
        imageUri: obj.imageUri ?? null,
        currentAvatar: obj.currentAvatar,
      };
    }
  } catch {}
  return { imageUri: null };
}

type TabButtonProps = {
  title: string;
  isActive: boolean;
  onPress: () => void;
};

const TabButton: React.FC<TabButtonProps> = ({ title, isActive, onPress }) => {
  // Map the title to the translation key
  const getTranslationKey = (title: string) => {
    switch (title) {
      case "Daily":
        return "homeTab.daily";
      case "Weekly":
        return "homeTab.weekly";
      case "Monthly":
        return "homeTab.monthly";
      default:
        return "";
    }
  };

  return (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}
      accessibilityLabel={`Switch to ${t(getTranslationKey(title))} view`}
    >
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
        {t(getTranslationKey(title))}
      </Text>
    </TouchableOpacity>
  );
};

const getProgressColor = (score: any) => {
  if (score > 70) {
    return "#B0C4DD"; // Green for above 70%
  } else if (score >= 50) {
    return "#F0818B"; // Yellow for between 50% and 70%
  } else {
    return "#F1AB6B"; // Red for below 50%
  }
};

const WellnessScore = ({ score, profileImage }: any) => {
  const animatedProgress = useState(new Animated.Value(0))[0];
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: score / 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [score, animatedProgress]);

  const progressColor = getProgressColor(score);

  return (
    <View
      style={styles.wellnessContainer}
      accessible={true}
      accessibilityLabel={t("homeTab.yourWellnessScore")}
    >
      <View style={styles.progressContainer}>
        <View style={{ transform: [{ rotate: "90deg" }] }}>
          <Progress.Circle
            size={200}
            progress={score / 100}
            thickness={18}
            color={getProgressColor(score)}
            borderWidth={0}
            showsText={false}
            style={styles.progressCircle}
            accessibilityLabel={`${t("homeTab.yourWellnessScore")} ${score}%`}
          />
        </View>
        <Image
          source={profileImage}
          style={styles.profileImage}
          accessibilityLabel="Profile Picture"
        />
      </View>
      <View style={styles.wellnessTextContainer}>
        <Text style={styles.wellnessText}>
          {t("homeTab.yourWellnessScore")}
        </Text>
        <TouchableOpacity onPress={() => setShowInfoModal(true)}>
          <Icon name="info-outline" size={20} style={styles.infoIcon} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.wellnessPercentage, { color: progressColor }]}>
        {`${score}%`}
      </Text>

      <Modal
        visible={showInfoModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowInfoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.infoModalContainer}>
            <View style={styles.infoModalContent}>
              <Text style={styles.infoModalText}>
                {t("homeTab.wellnessScoreInfo")}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowInfoModal(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ServiceCards = () => {
  const navigation = useNavigation<HomeTabNavigationProp>();
  const [activeService, setActiveService] = useState<string | null>(null);

  // Map service names to their translation keys
  const getTranslationKey = (service: string) => {
    switch (service) {
      case "Health Assessment":
        return "homeTab.healthAssessment";
      case "Explore Scans":
        return "homeTab.exploreScans";
      case "Anger Management":
        return "homeTab.angerManagement";
      case "Stress":
        return "homeTab.stress";
      case "Internet and Social Media Issue":
        return "homeTab.internetAndSocialMedia";
      default:
        return "";
    }
  };

  function redirectToScans(service: string) {
    setActiveService(service); // Set the active card
    if (service === "Explore Scans") {
      // @ts-ignore
      navigation.navigate("ConditionScansScreen");
    } else if (service === "Health Assessment") {
      // @ts-ignore
      navigation.navigate("MentalHealthAssessment");
    } else if (service === "Anger Management") {
      // @ts-ignore
      navigation.navigate("ScanIntro", { scanName: "Anger Management" });
    } else if (service === "Stress") {
      // @ts-ignore
      navigation.navigate("ScanIntro", { scanName: "Stress" });
    } else if (service === "Internet and Social Media Issue") {
      // @ts-ignore
      navigation.navigate("ScanIntro", { scanName: "Internet and Social Media Issue" });
    }
  }

  const services = [
    "Health Assessment", // New button in the first position
    "Explore Scans", // Moved to the second position
    "Anger Management",
    "Stress",
    "Internet and Social Media Issue",
  ];

  return (
    <View
      style={styles.servicesBox}
      accessible={true}
      accessibilityLabel={t("homeTab.checkConditionalWellness")}
    >
      <Text
        style={styles.servicesHeading}
        accessibilityLabel={t("homeTab.checkConditionalWellness")}
      >
        {t("homeTab.checkConditionalWellness")}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.serviceContainer}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "flex-start",
          paddingHorizontal: 0,
        }}
      >
        {services.map((service, index) => (
          <Pressable
            key={index}
            onPress={() => redirectToScans(service)}
            style={[
              styles.serviceCard,
              activeService === service && styles.activeCard, // Highlight active card
            ]}
          >
            <View
              key={index}
              accessible={true}
              accessibilityLabel={`${t(getTranslationKey(service))}`}
            >
              <Text
                style={[
                  styles.serviceTitle,
                  activeService === service && styles.activeTitle, // Change text color for active card
                ]}
              >
                {t(getTranslationKey(service))}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const getWellnessAvatar = (
  score: number,
  gender: string | null,
  avatarGender?: string | null,
  avatarIndex?: number | null,
) => {
  // If user has selected a specific avatar, use that
  if (avatarGender && avatarIndex !== null && avatarIndex !== undefined) {
    const avatars =
      avatarGender === "female"
        ? {
            sad: require("@/assets/avatars/female-sad.jpeg"),
            mid: require("@/assets/avatars/female-mid.jpeg"),
            happy: require("@/assets/avatars/female-happy.jpeg"),
          }
        : {
            sad: require("@/assets/avatars/male-sad.jpeg"),
            mid: require("@/assets/avatars/male-mid.jpeg"),
            happy: require("@/assets/avatars/male-happy.jpeg"),
          };
    return Object.values(avatars)[avatarIndex];
  }

  if (!gender)
    return {
      uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    };

  // Only show gender-specific avatars for MALE and FEMALE
  if (gender !== "MALE" && gender !== "FEMALE") {
    return {
      uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    };
  }

  const avatars =
    gender === "FEMALE"
      ? {
          sad: require("@/assets/avatars/female-sad.jpeg"),
          mid: require("@/assets/avatars/female-mid.jpeg"),
          happy: require("@/assets/avatars/female-happy.jpeg"),
        }
      : {
          sad: require("@/assets/avatars/male-sad.jpeg"),
          mid: require("@/assets/avatars/male-mid.jpeg"),
          happy: require("@/assets/avatars/male-happy.jpeg"),
        };

  if (score <= 40) {
    return avatars.sad;
  } else if (score <= 55) {
    return avatars.mid;
  } else {
    return avatars.happy;
  }
};

export default function HomeTab() {
  // Language hook  
  const { locale } = useLanguage();
  
  // Move these hooks to the very top of the component
  const [selectedTip, setSelectedTip] = useState<SimpleTip | null>(null);
  const [tipModalVisible, setTipModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState({
    uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [activityTitle, setActivityTitle] = useState("");
  const [category, setCategory] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const [activityRemarks, setActivityRemarks] = useState("");
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false); // Track if success message is visible
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const [sheetVisible, setSheetVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedIntervention, setSelectedIntervention] = useState<
    any | null
  >(null);

  const [interventionsList, setInterventionsList] = useState<any[]>([]);
  const [selectedTestId, setSelectedTestId] = useState<number>(0);

  const navigation = useNavigation();

  // Intervention counts state
  const [interventionCounts, setInterventionCounts] = useState({
    Daily: 0,
    Weekly: 0,
    "Bi-weekly": 0,
    Monthly: 0,
  });

  // Function to load intervention counts from AsyncStorage
  const loadInterventionCounts = async () => {
    try {
      const periods = ["Daily", "Weekly", "Bi-weekly", "Monthly"];
      const counts = { Daily: 0, Weekly: 0, "Bi-weekly": 0, Monthly: 0 };

      for (const period of periods) {
        const key = `interventions_${period}`;
        const stored = await AsyncStorage.getItem(key);
        if (stored) {
          const interventions = JSON.parse(stored);
          if (Array.isArray(interventions)) {
            // Count all active interventions (not completed)
            counts[period as keyof typeof counts] = interventions.filter(
              (intervention: any) =>
                intervention &&
                typeof intervention === "object" &&
                !intervention.isCompleted,
            ).length;
          }
        }
      }

      console.log("Updated intervention counts:", counts);
      setInterventionCounts(counts);
    } catch (error) {
      console.error("Error loading intervention counts:", error);
      // Set default values in case of error
      setInterventionCounts({
        Daily: 0,
        Weekly: 0,
        "Bi-weekly": 0,
        Monthly: 0,
      });
    }
  };

  // Load intervention counts on component mount
  useEffect(() => {
    loadInterventionCounts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadInterventionCounts();
    }, []),
  );

  // Fetch interventions data on component mount
  useEffect(() => {
    async function fetchInterventions() {
      try {
        const data = await interventionObject();

        if (!Array.isArray(data)) {
          console.error("Invalid data format received from interventionObject");
          setInterventionsList([]);
          return;
        }

        // First, sort all interventions by date (oldest to newest)
        const sortedByDate = data
          .filter((intervention) => {
            // Validate each intervention
            if (!intervention.scan_title) {
              console.warn("Skipping intervention with missing scan_title");
              return false;
            }
            if (intervention.total_score === undefined) {
              console.warn(
                `Skipping ${intervention.scan_title} with missing score`,
              );
              return false;
            }
            if (!intervention.scan_date || !intervention.scan_time) {
              console.warn(
                `Skipping ${intervention.scan_title} with missing date/time`,
              );
              return false;
            }
            return true;
          })
          .sort((a: any, b: any) => {
            const dateA = new Date(`${a.scan_date} ${a.scan_time}`);
            const dateB = new Date(`${b.scan_date} ${b.scan_time}`);
            return dateA.getTime() - dateB.getTime();
          });

        // Create a map to track the latest intervention for each scan type
        const latestInterventionsMap = new Map();

        // Process interventions in chronological order
        sortedByDate.forEach((intervention) => {
          latestInterventionsMap.set(intervention.scan_title, intervention);
        });

        // Convert map to array and sort by date (oldest to newest)
        const latestInterventions = Array.from(
          latestInterventionsMap.values(),
        ).sort((a: any, b: any) => {
          const dateA = new Date(`${a.scan_date} ${a.scan_time}`);
          const dateB = new Date(`${b.scan_date} ${b.scan_time}`);
          return dateA.getTime() - dateB.getTime();
        });

        // Log the interventions with their dates and scores for debugging
        console.info(
          "Interventions in chronological order:",
          JSON.stringify(
            latestInterventions.map((item) => ({
              scan_title: item.scan_title,
              date: `${item.scan_date} ${item.scan_time}`,
              score: item.total_score,
            })),
            null,
            2,
          ),
        );

        setInterventionsList(latestInterventions);
      } catch (error) {
        console.error("Error fetching interventions:", error);
        setInterventionsList([]); // Set empty list on error
      }
    }

    fetchInterventions();
  }, []);

  // Toggle the Add Activity Modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddActivity = () => {
    setActivityTitle("");
    setCategory("");
    setActivityDuration("");
    setActivityRemarks("");
    setSuccessMessageVisible(true);

    setTimeout(() => {
      setSuccessMessageVisible(false);
    }, 5000);

    toggleModal();
  };

  const [activeTab, setActiveTab] = useState<"Daily" | "Weekly" | "Monthly">(
    "Daily",
  );
  // Fetch final wellness score from AsyncStorage using the wellness score utility
  useEffect(() => {
    const fetchWellnessScore = async () => {
      try {
        const score = await getWellnessScore();
        setFinalScore(score);
      } catch (error) {
        console.error("Error fetching wellness score:", error);
        setFinalScore(0);
      }
    };
    fetchWellnessScore();

    // fetch stored profile picture and gender
    const fetchProfile = async () => {
      try {
        const profile = await AsyncStorage.getItem("profile_v1");
        if (profile) {
          const parsed = JSON.parse(profile);
          setSelectedGender(parsed.selectedGender || null);

          if (parsed.imageUri) {
            setProfileImage({ uri: parsed.imageUri });
          } else {
            // If no custom image, use wellness-based avatar
            const stored = await AsyncStorage.getItem("onboardingResponses");
            if (stored) {
              const responses = JSON.parse(stored);
              const score = responses.overallOnboardingScore || 0;
              const wellnessAvatar = getWellnessAvatar(
                score,
                parsed.selectedGender,
                parsed.avatarGender,
                parsed.avatarIndex,
              );
              setProfileImage(wellnessAvatar);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // refresh on focus so updates made in Profile screen appear instantly
  useFocusEffect(
    React.useCallback(() => {
      const fetchProfile = async () => {
        try {
          // Refresh wellness score from the utility (includes XP increments)
          const score = await getWellnessScore();
          setFinalScore(score);

          const profile = await AsyncStorage.getItem("profile_v1");
          if (profile) {
            const parsed = JSON.parse(profile);
            setSelectedGender(parsed.selectedGender || null);

            if (parsed.imageUri) {
              setProfileImage({ uri: parsed.imageUri });
            } else {
              // If no custom image, use wellness-based avatar with updated score
              const wellnessAvatar = getWellnessAvatar(
                score,
                parsed.selectedGender,
                parsed.avatarGender,
                parsed.avatarIndex,
              );
              setProfileImage(wellnessAvatar);
            }
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
    }, []),
  );

  // Show recommended interventions only if last addiction scan was within 7 days
  const [showInterventions, setShowInterventions] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("addictionScanResults");
        const history = stored ? JSON.parse(stored) : [];
        if (history.length > 0) {
          const lastEntry = history[history.length - 1];
          const lastDate = new Date(lastEntry.date);
          const now = new Date();
          const diffDays =
            (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
          setShowInterventions(diffDays <= 7);
        } else {
          setShowInterventions(false);
        }
      } catch (err) {
        console.error("Error fetching addiction scan history:", err);
        setShowInterventions(false);
      }
    })();
  }, []);

  const tabData = {
    Daily: {
      wellnessScore: 79,
      healthScore: 60,
      entries: [
        {
          title: "Online videos",
          description: "YouTube, education, movies",
          time: "2 hrs",
          color: "#e0bbff",
          date: "03 Mar 2024",
        },
        {
          title: "Sleep",
          description: "NA",
          time: "5 hrs",
          color: "#bbdefb",
          date: "03 Mar 2024",
        },
        {
          title: "Distance Traveled",
          description: "Home to Akurdi Railway Station",
          time: "1 hr",
          color: "#ffcccb",
          date: "03 Mar 2024",
        },
      ],
    },
    Weekly: {
      wellnessScore: 40,
      healthScore: 60,
      entries: [
        {
          title: "Walking",
          description: "Park walk",
          time: "4 hrs",
          color: "#c8e6c9",
          date: "03 Mar 2024",
        },
        {
          title: "Reading",
          description: "Books, articles",
          time: "3 hrs",
          color: "#ffcccb",
          date: "03 Mar 2024",
        },
      ],
    },
    Monthly: {
      wellnessScore: 63,
      healthScore: 60,
      entries: [
        {
          title: "Yoga",
          description: "Classes",
          time: "12 hrs",
          color: "#ffe0b2",
          date: "03 Mar 2024",
        },
        {
          title: "Meditation",
          description: "Mindfulness practice",
          time: "8 hrs",
          color: "#bbdefb",
          date: "03 Mar 2024",
        },
      ],
    },
  };

  const { wellnessScore, healthScore } = tabData[activeTab];

  // ---------------------------------------------------------------------------
  // Round‑robin selection of today's Mind‑Tools (2) tips
  // ---------------------------------------------------------------------------
  const today = new Date();
  const daysElapsed = Math.floor(
    (today.getTime() - ANCHOR_DATE.getTime()) / (1000 * 60 * 60 * 24),
  );

  // two Mind‑Tools tips using translation keys
  const mtIdx = daysElapsed % mindToolsKeys.length;
  const currentKey = mindToolsKeys[mtIdx];
  const nextKey = mindToolsKeys[(mtIdx + 1) % mindToolsKeys.length];
  
  const todaysMindTools = [
    {
      title: t(`mindToolsTips.${currentKey}.title`),
      description: t(`mindToolsTips.${currentKey}.description`),
      example: t(`mindToolsTips.${currentKey}.example`),
      task: t(`mindToolsTips.${currentKey}.task`)
    },
    {
      title: t(`mindToolsTips.${nextKey}.title`),
      description: t(`mindToolsTips.${nextKey}.description`),
      example: t(`mindToolsTips.${nextKey}.example`),
      task: t(`mindToolsTips.${nextKey}.task`)
    }
  ];

  const handleEQTestPress = () => {
    // @ts-ignore
    navigation.navigate("EQTest");
  };

  const TopMessage = ({
    message,
    highlightText,
    suffixText,
    customTextStyle,
  }: any) => (
    <Text style={customTextStyle}>
      {message}
      {highlightText && (
        <Text style={styles.highlightedText}>{highlightText}</Text>
      )}
      {suffixText && <Text style={styles.suffixText}>{suffixText}</Text>}
    </Text>
  );

  // Mind‑Tools Cards with Modal
  const handleTipCardPress = (tip: SimpleTip) => {
    console.log("Selected tip:", tip);
    setSelectedTip(tip);
    setTipModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.topMessageContainer}>
              <TopMessage
                message={
                  finalScore! > 70
                    ? t("homeTab.greatJob")
                    : t("homeTab.youCanDoBetter")
                }
                highlightText={finalScore! > 70 ? "" : t("homeTab.mindTools")}
                suffixText={finalScore! > 70 ? "" : t("homeTab.forSuggestions")}
                customTextStyle={
                  finalScore! > 70
                    ? styles.greatJobText
                    : styles.youCanDoBetterText
                }
                customMessageParts={
                  finalScore! > 70
                    ? []
                    : [
                        { text: "Check out ", style: styles.normalText },
                        { text: "MIND TOOLS", style: styles.highlightedText },
                        { text: " for suggestions", style: styles.normalText },
                      ]
                }
              />
            </View>

            <WellnessScore
              score={finalScore !== null ? finalScore : 0}
              profileImage={profileImage}
            />

            <View style={styles.tabContainer}>
              {["Daily", "Weekly", "Monthly"].map((tab) => (
                <TabButton
                  key={tab}
                  title={tab}
                  isActive={activeTab === tab}
                  onPress={() =>
                    setActiveTab(tab as "Daily" | "Weekly" | "Monthly")
                  }
                />
              ))}
            </View>
            <ServiceCards />

            {/* Intervention Buttons */}
            <View style={styles.interventionButtonsContainer}>
              <Text style={styles.interventionButtonsTitle}>
                {t("homeTab.currentInterventions")}
              </Text>
              <View style={styles.interventionButtonsRow}>
                <TouchableOpacity
                  style={styles.interventionButton}
                  activeOpacity={0.7}
                  onPress={() =>
                    (navigation as any).navigate("InterventionsScreen", {
                      activeTab: "Daily",
                      sourceScreen: "homeTab",
                    })
                  }
                  accessible={true}
                  accessibilityLabel={`${t("homeTab.dailyInterventions")}: ${interventionCounts.Daily} items`}
                >
                  <View style={styles.interventionIconContainer}>
                    <Icon name="calendar-today" size={30} color="#4A90E2" />
                  </View>
                  <Text numberOfLines={1} style={styles.interventionButtonText}>
                    {t("homeTab.dailyInterventions")}
                  </Text>
                  <Text
                    style={
                      interventionCounts.Daily > 0
                        ? styles.interventionButtonCount
                        : styles.interventionButtonCountEmpty
                    }
                  >
                    {interventionCounts.Daily}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.interventionButton}
                  activeOpacity={0.7}
                  onPress={() =>
                    (navigation as any).navigate("InterventionsScreen", {
                      activeTab: "Weekly",
                      sourceScreen: "homeTab",
                    })
                  }
                  accessible={true}
                  accessibilityLabel={`${t("homeTab.weeklyInterventions")}: ${interventionCounts.Weekly} items`}
                >
                  <View
                    style={[
                      styles.interventionIconContainer,
                      { backgroundColor: "#E6F2FF" },
                    ]}
                  >
                    <Icon name="view-week" size={30} color="#5D9DF5" />
                  </View>
                  <Text numberOfLines={1} style={styles.interventionButtonText}>
                    {t("homeTab.weeklyInterventions")}
                  </Text>
                  <Text
                    style={
                      interventionCounts.Weekly > 0
                        ? styles.interventionButtonCount
                        : styles.interventionButtonCountEmpty
                    }
                  >
                    {interventionCounts.Weekly}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.interventionButton}
                  activeOpacity={0.7}
                  onPress={() =>
                    (navigation as any).navigate("InterventionsScreen", {
                      activeTab: "Bi-weekly",
                      sourceScreen: "homeTab",
                    })
                  }
                  accessible={true}
                  accessibilityLabel={`${t("homeTab.biweeklyInterventions")}: ${interventionCounts["Bi-weekly"]} items`}
                >
                  <View
                    style={[
                      styles.interventionIconContainer,
                      { backgroundColor: "#EEF7FF" },
                    ]}
                  >
                    <Icon name="date-range" size={30} color="#70A9F7" />
                  </View>
                  <Text numberOfLines={1} style={styles.interventionButtonText}>
                    {t("homeTab.biweeklyInterventions")}
                  </Text>
                  <Text
                    style={
                      interventionCounts["Bi-weekly"] > 0
                        ? styles.interventionButtonCount
                        : styles.interventionButtonCountEmpty
                    }
                  >
                    {interventionCounts["Bi-weekly"]}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.interventionButton}
                  activeOpacity={0.7}
                  onPress={() =>
                    (navigation as any).navigate("InterventionsScreen", {
                      activeTab: "Monthly",
                      sourceScreen: "homeTab",
                    })
                  }
                  accessible={true}
                  accessibilityLabel={`${t("homeTab.monthlyInterventions")}: ${interventionCounts.Monthly} items`}
                >
                  <View
                    style={[
                      styles.interventionIconContainer,
                      { backgroundColor: "#F0F7FF" },
                    ]}
                  >
                    <Icon name="event-note" size={30} color="#85B8FF" />
                  </View>
                  <Text numberOfLines={1} style={styles.interventionButtonText}>
                    {t("homeTab.monthlyInterventions")}
                  </Text>
                  <Text
                    style={
                      interventionCounts.Monthly > 0
                        ? styles.interventionButtonCount
                        : styles.interventionButtonCountEmpty
                    }
                  >
                    {interventionCounts.Monthly}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Recommended Interventions */}
            {interventionsList.length > 0 && (
              <RecommendedInterventionsList
                scans={interventionsList}
                onScanSelect={(id) => {
                  const selected = interventionsList.find(
                    (item) => item.id === id,
                  );
                  if (!selected) return;

                  // Map scan_title to screen name - making sure these match the exact names in MindToolsNavigator.js
                  const screenMapping = {
                    Addictions: "AddictionsScreen",
                    "ADHD": "CommonPsychologicalScreen", // Changed to match available screens
                    "Common Psychological Issues": "CommonPsychologicalScreen",
                    "Environment Issues Affecting Mental Wellbeing": "EnvironmentIssuesScreen",
                    "Family and Relationship": "FamilyRelationshipScreen",
                    "Financial Mental Health": "FinancialMentalHealthScreen",
                    "General Physical Fitness": "PhysicalFitnessScreen",
                    "Internet Dependence": "InternetDependenceScreen",
                    Stress: "StressScreen",
                    "Internet and Social Media Issue": "InternetSocialMediaScreen",
                    Sleep: "SleepScreen",
                    "Suicidal Behaviour": "SuicidalBehaviourScreen",
                    "Substance Addiction": "AddictionsScreen", // Changed to match available screens
                    "Professional Mental Health": "ProfessionalMentalHealthScreen",
                    "Social Mental Health": "SocialMentalHealthScreen",
                    "Youngster Issues": "YoungsterIssuesScreen"
                  };
                  
                  // Convert navigation object to any to bypass type checking
                  const nav = navigation as any;
                  console.log("Selected scan:", selected.scan_title);
                  
                  try {
                    nav.navigate({
                      screen: screenMapping[selected.scan_title as keyof typeof screenMapping] || 'MindToolsMain',
                      params: { category: selected.scan_title }
                    })
                    // The correct way to navigate to a nested navigator screen
                  //   nav.navigate(
                  //     screen: selected.scan_title || 'MindToolsMain',
                  //       params: { category: selected.scan_title }
                  // );
                    
                    console.log("Navigation completed to MindTools");
                  } catch (error) {
                    console.error("Navigation error:", error);
                    
                    // Fallback approach
                    try {
                      // If the main navigation fails, try just navigating to the MindTools tab
                      nav.navigate('MainApp', { screen: 'MindTools' });
                      console.log("Fallback navigation to MindTools tab");
                    } catch (fallbackError) {
                      console.error("Fallback navigation error:", fallbackError);
                    }
                  }
                }}
              />
            )}

            {/* Daily Mind‑Tools & EQ Test */}
            <View style={styles.tipCardsContainer}>
              {/* 2 Mind‑Tools cards */}
              {todaysMindTools.map((tip, i) => (
                <TouchableOpacity
                  key={`mt-${i}`}
                  style={styles.tipCard}
                  accessible
                  accessibilityLabel={tip.title}
                  onPress={() => handleTipCardPress(tip)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Text
                    style={styles.tipDescription}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {tip.description}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* EQ Test Button */}
              <TouchableOpacity
                style={styles.eqTestButton}
                onPress={handleEQTestPress}
                accessible
                accessibilityLabel={t("homeTab.eqTest")}
              >
                <Text style={styles.eqTestButtonText}>
                  {t("homeTab.eqTest") || "EQ Test"}
                </Text>
              </TouchableOpacity>

              {/* Mind‑Tools Tip Modal */}
              <Modal
                visible={tipModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setTipModalVisible(false)}
              >
                <View style={styles.tipModalOverlay}>
                  <View style={styles.tipModalContainer}>
                    {/* Header */}
                    <View style={styles.tipModalHeader}>
                      <Text style={styles.tipModalTitle}>
                        {selectedTip?.title || "Loading..."}
                      </Text>
                      <TouchableOpacity
                        style={styles.tipModalCloseIcon}
                        onPress={() => setTipModalVisible(false)}
                      >
                        <Text style={styles.tipModalCloseText}>✕</Text>
                      </TouchableOpacity>
                    </View>
                    
                    {/* Content Area */}
                    <View style={{ flex: 1, padding: 20 }}>
                      <ScrollView 
                        showsVerticalScrollIndicator={true}
                        style={{ flex: 1 }}
                      >
                        {/* Description */}
                        <Text style={{ 
                          fontSize: 16, 
                          marginBottom: 20, 
                          color: "#333",
                          lineHeight: 24
                        }}>
                          {selectedTip?.description || "No description available"}
                        </Text>
                        
                        {/* Example */}
                        {selectedTip?.example && (
                          <View style={{ marginBottom: 20 }}>
                            <Text style={{ 
                              fontSize: 18, 
                              fontWeight: "bold", 
                              color: "#2196F3",
                              marginBottom: 10 
                            }}>
                              💡 {t("homeTab.example")}
                            </Text>
                            <Text style={{ 
                              fontSize: 15, 
                              backgroundColor: "#F0F0F0",
                              padding: 15,
                              borderRadius: 8,
                              lineHeight: 22
                            }}>
                              {selectedTip.example}
                            </Text>
                          </View>
                        )}
                        
                        {/* Task */}
                        {selectedTip?.task && (
                          <View style={{ marginBottom: 20 }}>
                            <Text style={{ 
                              fontSize: 18, 
                              fontWeight: "bold", 
                              color: "#2196F3",
                              marginBottom: 10 
                            }}>
                              🎯 {t("homeTab.tryThis")}
                            </Text>
                            <Text style={{ 
                              fontSize: 15, 
                              backgroundColor: "#F0F0F0",
                              padding: 15,
                              borderRadius: 8,
                              lineHeight: 22
                            }}>
                              {selectedTip.task}
                            </Text>
                          </View>
                        )}
                      </ScrollView>
                    </View>
                    
                    {/* Close Button */}
                    <View style={styles.tipModalFooter}>
                      <TouchableOpacity
                        style={styles.tipModalCloseButton}
                        onPress={() => setTipModalVisible(false)}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.tipModalCloseButtonText}>{t("homeTab.gotIt")}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>

            {/* This is the primary tertiary secondary intervention component. */}
            {selectedTestId && (
              <InterventionsSheet
                visible={sheetVisible}
                onClose={() => setSheetVisible(false)}
                selectedTest={interventionsList.find(
                  (item) => item.id === selectedTestId,
                )}
                onSelectIntervention={(item) => {
                  setSelectedIntervention(item);
                  setSheetVisible(false);
                  setDetailVisible(true);
                }}
              />
            )}

            {/* This is the text detail component */}
            {interventionsList.length > 0 &&
              selectedTestId > 0 &&
              selectedIntervention && (
                <InterventionDetailModal
                  visible={detailVisible}
                  intervention={selectedIntervention}
                  onClose={() => setDetailVisible(false)}
                />
              )}
          </ScrollView>
          {/* Floating Action Button */}
          {/* <View style={styles.fabContainer}>
            <FAB
              style={styles.fab}
              icon="plus"
              size="large"
              color="#FFFFFF"
              onPress={toggleModal}
            />
          </View> */}
          {/* Modal for adding activity */}
          {/* <Modal
            transparent={true}
            visible={isModalVisible}
            animationType="slide"
            onRequestClose={toggleModal}
          >
            <KeyboardAvoidingView
              style={styles.modalContainer}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={styles.addActivityContainer}>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={styles.closeIconContainer}
                >
                  <IconButton icon="close" iconColor="white" size={25} />
                </TouchableOpacity>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    {t("homeTab.activityTitle")}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder={t("homeTab.selectCategory")}
                    value={activityTitle}
                    onChangeText={setActivityTitle}
                  />
                </View>

                <View style={styles.row}>
                  <Text style={styles.inputLabel}>{t("homeTab.duration")}</Text>
                  <TextInput
                    style={styles.durationInput}
                    placeholder="HH:MM"
                    value={activityDuration}
                    onChangeText={setActivityDuration}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    {t("homeTab.addTagsRemarks")}
                  </Text>
                  <TextInput
                    style={[styles.input, styles.remarksInput]}
                    placeholder={t("homeTab.selectCategory")}
                    value={activityRemarks}
                    onChangeText={setActivityRemarks}
                    multiline
                  />
                </View>

                <Pressable onPress={handleAddActivity}>
                  <View style={styles.modalButtons}>
                    <Button
                      mode="contained"
                      style={styles.saveButton}
                      labelStyle={styles.saveButtonLabel}
                    >
                      {t("homeTab.enter")}
                    </Button>
                  </View>
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          </Modal> */}

          {/* Success Message */}
          <Modal
            transparent={true}
            visible={isSuccessMessageVisible}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.successContent}>
                <Text style={styles.successMessage}>
                  {t("homeTab.activityAddedSuccess")}
                </Text>
                <Text style={styles.successSubtext}>
                  {t("homeTab.editActivityTimeLimit")}
                </Text>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "FFF",
    alignItems: "center",
  },
  topMessageContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    width: "100%",
    alignItems: "center",
  },
  topMessage: {
    fontSize: 16,
    fontWeight: "400",
    color: "#8E8E8E",
    marginTop: 20,
    marginBottom: 5,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  wellnessContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingTop: 5,
    marginBottom: 5,
    width: SCREEN_WIDTH,
  },
  progressContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  profileImage: {
    width: 165,
    height: 165,
    borderRadius: 83,
    position: "absolute",
    zIndex: 1,
    borderWidth: 6,
    borderColor: "#FFF",
  },
  progressCircle: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
  },
  wellnessPercentage: {
    fontSize: 42,
    fontWeight: "500",
    color: "#709ACF",
    marginTop: 5,
    fontFamily: "Poppins-Medium",
  },
  wellnessText: {
    fontSize: 18,
    color: "#4A4A4A",
    marginTop: 5,
    lineHeight: 24,
    fontFamily: "Poppins-Regular",
  },
  wellnessTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  infoIcon: {
    marginLeft: 8,
    marginTop: 7,
    color: "#B0B0B0",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: -10,
    backgroundColor: "#FFFFFF",
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  activeTabButton: {
    backgroundColor: "#D27AD5",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#707070",
    fontFamily: "Poppins-Regular",
  },
  activeTabText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    fontFamily: "Poppins-Bold",
  },
  servicesBox: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginVertical: 15,
    alignItems: "center",
    marginTop: 8,
  },
  servicesHeading: {
    fontSize: 14,
    fontWeight: "400",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  serviceContainer: {
    // flexDirection: "row",
    // paddingHorizontal: 15,
    // marginLeft: -15,
    // marginRight: 15,
  },
  serviceCard: {
    width: 135,
    height: 78,
    borderRadius: 10,
    marginHorizontal: 8,
    borderColor: "#D27AD5",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#555555",
    textAlign: "left",
    fontFamily: "Poppins-Regular",
  },
  titleContainer: {
    justifyContent: "center",
    marginRight: 15,
  },
  healthScoreWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    width: "70%",
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: -5,
  },
  percentageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
  },
  healthScoreContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    width: "70%",
    alignSelf: "flex-start",
    marginHorizontal: 16,
    marginVertical: 10,
  },
  healthTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: -5,
    marginLeft: -10,
    paddingHorizontal: 15,
    fontFamily: "Poppins-Regular",
  },
  healthPercentage: {
    fontSize: 32,
    fontWeight: "500",
    color: "#F49E4F",
    marginLeft: -25,
    marginRight: 30,
    marginTop: -10,
    fontFamily: "Poppins-Medium",
  },
  fab: {
    width: 55,
    height: 55,
    backgroundColor: "#B0C4DD",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    borderColor: "#FFFFFF",
    borderWidth: 3,
    transform: [{ rotate: "90deg" }],
  },
  fabContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 100,
  },
  journalContainer: {
    marginTop: 5,
    width: "100%",
    marginRight: 10,
  },
  journalEntryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  journalColorStrip: {
    width: 5,
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  journalEntry: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    elevation: 1,
    marginLeft: 5,
    backgroundColor: "#f9f9f9",
  },
  journalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  journalTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
  },
  journalTime: {
    fontSize: 14,
    color: "#888",
    fontFamily: "Poppins-Regular",
  },
  journalDescription: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
    fontFamily: "Poppins-Regular",
  },
  journalDate: {
    marginTop: 5,
    fontSize: 12,
    color: "#888",
    fontFamily: "Poppins-Regular",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 45,
    fontSize: 14,
    fontFamily: "Poppins_300Light",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    textAlignVertical: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // fixed typo
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#D27AD5",
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#B0B0B0",
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  highlightedText: {
    fontSize: 16,
    color: "#D27AD5",
    fontWeight: "600",
    fontFamily: "Poppins-Bold",
    padding: 10,
  },
  suffixText: {
    color: "#8E8E8E",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  greatJobText: {
    fontSize: 21,
    color: "#8E8E8E",
    fontFamily: "Poppins-Regular",
  },
  youCanDoBetterText: {
    fontSize: 16,
    color: "#8E8E8E",
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  secondLineText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  normalText: {
    marginLeft: 30,
    fontWeight: "normal",
  },
  remarksInput: {
    height: 120,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "Poppins_300Light",
    textAlignVertical: "top",
    color: "#A2A2A2",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#5A96E1",
    borderWidth: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 50,
  },
  saveButtonLabel: {
    color: "#5F6368",
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    marginTop: 15,
    marginBottom: 5,
  },
  durationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  row: {
    top: -5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  durationTitle: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
  },
  durationInput: {
    width: "60%",
    height: 40,
    borderColor: "#A9A9A9",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: "Poppins_300Light",
    textAlign: "center",
    textAlignVertical: "center",
    marginLeft: 10,
    color: "#A2A2A2",
    backgroundColor: "#FFFFFF",
  },
  inputGroup: {
    marginBottom: 10,
  },
  successContent: {
    backgroundColor: "#B0C4DD",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
    minHeight: "50%",
  },
  successMessage: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#4A4A4A",
    textAlign: "center",
    marginBottom: 60,
  },
  successSubtext: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular_Italic",
    textAlign: "center",
    color: "#4A4A4A",
  },
  closeIconContainer: {
    position: "absolute",
    top: 0,
    right: 5,
  },
  addActivityContainer: {
    backgroundColor: "#B0C4DD",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    minHeight: "50%",
    justifyContent: "flex-start",
    marginBottom: 55,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  activeCard: {
    backgroundColor: "#D27AD5",
  },
  activeTitle: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  tipCardsContainer: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  tipCard: {
    borderWidth: 1,
    borderColor: "#B0C4DD",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  eqCard: {
    borderColor: "#F1AB6B",
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A4A4A",
    marginBottom: 6,
    fontFamily: "Poppins-Bold",
  },
  tipDescription: {
    fontSize: 14,
    color: "#555555",
    fontFamily: "Poppins-Regular",
    lineHeight: 20,
  },
  eqTestButton: {
    borderWidth: 1,
    borderColor: "#F1AB6B",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  eqTestButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A4A4A",
    fontFamily: "Poppins-Bold",
  },
  infoModalContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  infoModalContent: {
    alignItems: "center",
  },
  infoModalText: {
    fontSize: 16,
    color: "#4A4A4A",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
  },
  closeButton: {
    backgroundColor: "#D27AD5",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  interventionButtonsContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 18,
    paddingBottom: 24,
    borderRadius: 16,
    marginVertical: 15,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  interventionButtonsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 18,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  interventionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 2,
  },
  interventionButton: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 4,
    height: 125,
    borderRadius: 14,
    marginHorizontal: 5,
    backgroundColor: "#FAFAFA",
    borderColor: "#ECECEC",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  interventionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EDF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  interventionButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4A4A4A",
    marginVertical: 4,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    width: "100%",
    paddingHorizontal: 1,
  },
  interventionButtonCount: {
    fontSize: 22,
    fontWeight: "700",
    color: "#4A90E2",
    fontFamily: "Poppins-Bold",
    backgroundColor: "#EDF4FF",
    width: 40,
    height: 40,
    borderRadius: 20,
    textAlign: "center",
    textAlignVertical: "center",
    overflow: "hidden",
    lineHeight: 40,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  interventionButtonCountEmpty: {
    fontSize: 20,
    fontWeight: "500",
    color: "#BBBBBB",
    fontFamily: "Poppins-Medium",
    backgroundColor: "#F7F7F7",
    width: 36,
    height: 36,
    borderRadius: 18,
    textAlign: "center",
    textAlignVertical: "center",
    overflow: "hidden",
    lineHeight: 36,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  // Enhanced Tip Modal Styles
  tipModalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 20,
  },
  tipModalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    width: "100%",
    maxWidth: 400,
    height: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  tipModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#F8F9FA",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  tipModalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2C3E50",
    fontFamily: "Poppins-Bold",
    flex: 1,
    marginRight: 12,
    lineHeight: 28,
  },
  tipModalCloseIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E9ECEF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipModalCloseText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6C757D",
    fontFamily: "Poppins-Bold",
  },
  tipModalScrollView: {
    flex: 1,
  },
  tipModalSection: {
    marginBottom: 24,
  },
  tipModalDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#495057",
    fontFamily: "Poppins-Regular",
    marginBottom: 16,
  },
  tipModalSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#E3F2FD",
  },
  tipModalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tipModalIcon: {
    fontSize: 20,
  },
  tipModalSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2196F3",
    fontFamily: "Poppins-Bold",
    flex: 1,
  },
  tipModalSectionText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#495057",
    fontFamily: "Poppins-Regular",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#E3F2FD",
  },
  tipModalCloseButton: {
    backgroundColor: "#2196F3",
    marginHorizontal: 24,
    marginVertical: 20,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  tipModalFooter: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  tipModalCloseButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins-Bold",
  },
});
