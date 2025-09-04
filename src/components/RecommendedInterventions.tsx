import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
  Linking,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';
import { t } from "@/i18n/locales/i18n"; // Import translation function

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * --------------------------------------------------------------------------------
 * PART ONE: Render functions for each type of content (Primary, Secondary, Tertiary).
 * Headings are rendered in bold via style={styles.boldHeading}.
 * --------------------------------------------------------------------------------
 */

// ------------------------ PRIMARY CONTENT ------------------------
function renderPrimaryContent() {
  return (
    <>
      <Text>
        Addressing addictions involves a combination of personal, social, and
        medical strategies. Here are ten common suggestions along with examples
        of how they might work:
      </Text>

      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>
          1. Acknowledgment and Acceptance:
        </Text>
        {"\n"} - Example: Recognizing and admitting you have an addiction can be
        the first step towards recovery. For instance, someone addicted to
        alcohol might start by attending an Alcoholics Anonymous (AA) meeting.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>2. Seeking Professional Help:</Text>
        {"\n"} - Example: A person addicted to opioids might consult a
        healthcare professional for medication-assisted treatment (MAT),
        alongside counseling.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>3. Behavioral Therapy:</Text>
        {"\n"} - Example: Cognitive Behavioral Therapy (CBT) can help an
        individual with a gambling addiction identify triggers and develop
        strategies to avoid addictive behaviors.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>4. Support Groups:</Text>
        {"\n"} - Example: Joining a support group like Narcotics Anonymous (NA)
        provides a community of people who share similar experiences and offer
        encouragement.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>5. Developing Coping Mechanisms:</Text>
        {"\n"} - Example: Replacing a smoking habit with chewing gum or taking a
        walk can help break the cycle and manage cravings.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>6. Mindfulness and Meditation:</Text>
        {"\n"} - Example: Practicing mindfulness meditation can help an
        individual with a food addiction by increasing awareness of eating
        habits and reducing compulsive eating.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>7. Avoidance of Triggers:</Text>
        {"\n"} - Example: Someone recovering from nicotine addiction might avoid
        places where they previously smoked, such as bars or cafes.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>8. Healthy Lifestyle Changes:</Text>
        {"\n"} - Example: Incorporating regular exercise and a balanced diet can
        help manage stress and reduce cravings for substances like caffeine.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>
          9. Setting Goals and Monitoring Progress:
        </Text>
        {"\n"} - Example: Setting small, achievable goals week by week and
        tracking progress in a journal can motivate and provide a sense of
        accomplishment.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        <Text style={styles.boldHeading}>
          10. Building a Supportive Network:
        </Text>
        {"\n"} - Example: Relying on friends and family for support by openly
        discussing your addiction and involving them in your recovery process
        can create a strong support system.
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        Each person's journey with addiction is unique, and it's important to
        find the combination of strategies that work best for the individual.
        Professional advice and a personalized plan are often the most effective
        approach to overcoming addiction.
      </Text>
    </>
  );
}

// ------------------------ SECONDARY PART 1 ------------------------
function renderSecondaryPart1() {
  return (
    <>
      <Text>
        Below are recommendations on books, movies, motivational content, and
        music related to addiction recovery. These resources should be easily
        searchable online or available through libraries or streaming services.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Books</Text>
      <Text>
        1. "In the Realm of Hungry Ghosts" by Gabor Maté – An insightful look at
        addiction through compassion and science.
        {"\n"}2. "The Unexpected Joy of Being Sober" by Catherine Gray
        {"\n"}3. "Alcoholics Anonymous: The Big Book"
        {"\n"}4. "Recovery: Freedom from Our Addictions" by Russell Brand
        {"\n"}5. "Beautiful Boy: A Father's Journey..." by David Sheff
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Movies and Documentaries</Text>
      <Text>
        1. "Beautiful Boy" (2018) – Based on David Sheff's book.
        {"\n"}2. "Recovery Boys" (2018)
        {"\n"}3. "Clean and Sober" (1988)
        {"\n"}4. "Requiem for a Dream" (2000)
        {"\n"}5. "The Anonymous People" (2013)
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Motivational Videos and Talks</Text>
      <Text>
        1. TED Talk: "Everything You Know About Addiction is Wrong" by Johann
        Hari
        {"\n"}2. Russell Brand's YouTube channel
        {"\n"}3. "The Power of Vulnerability" by Brené Brown
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Music Therapy and Playlists</Text>
      <Text>
        1. Spotify's "Music for Healing" playlists
        {"\n"}2. Calm – An app with music and meditation sessions
        {"\n"}3. Classical music playlists
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Online Resources</Text>
      <Text>
        - National Institute on Drug Abuse (NIDA)
        {"\n"}- SMART Recovery
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        These resources can provide support, insight, and inspiration. If you or
        someone you know is dealing with addiction, consult a healthcare
        professional for personalized help.
      </Text>
    </>
  );
}

// ------------------------ SECONDARY PART 2 ------------------------
function renderSecondaryPart2() {
  return (
    <>
      <Text>
        Addressing addictions through yoga and meditation can be a supportive
        practice. They help improve mental clarity, reduce stress, and increase
        self-awareness, but do not replace professional medical treatment.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Yoga for Addiction Recovery</Text>
      <Text>
        1. Mountain Pose (Tadasana)
        {"\n"}2. Child's Pose (Balasana)
        {"\n"}3. Cat-Cow Stretch (Marjaryasana-Bitilasana)
        {"\n"}4. Tree Pose (Vrksasana)
        {"\n"}5. Bridge Pose (Setu Bandhasana)
        {"\n"}6. Savasana (Corpse Pose)
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Meditation for Addiction Recovery</Text>
      <Text>
        1. Mindfulness Meditation
        {"\n"}2. Loving-Kindness Meditation (Metta)
        {"\n"}3. Body Scan Meditation
        {"\n"}4. Guided Meditations
        {"\n"}5. Breath Awareness Meditation
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Additional Tips</Text>
      <Text>
        - Consistency
        {"\n"}- Set Intentions
        {"\n"}- Community Support
        {"\n"}- Professional Guidance
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        Remember, recovery is a holistic journey. Combining yoga and meditation
        with formal addiction treatment and support networks can create a
        well-rounded approach.
      </Text>
    </>
  );
}

// ------------------------ SECONDARY PART 3 ------------------------
function renderSecondaryPart3() {
  return (
    <>
      <Text>
        Yoga and meditation can effectively complement professional treatment by
        helping manage stress, improving mental clarity, and promoting
        well-being.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Yoga Practices</Text>
      <Text>
        1. <Text style={styles.boldHeading}>Breath Awareness (Pranayama)</Text>
        {"\n"} - Deep Breathing: Spend a few minutes daily focusing on your
        breath. Inhale deeply, hold, then exhale slowly.
        {"\n"} - Nadi Shodhana (Alternate Nostril Breathing): Balances the mind
        and reduces anxiety.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Asanas (Postures)</Text>
      <Text>
        1. Child's Pose (Balasana)
        {"\n"}2. Cat-Cow Stretch (Marjaryasana-Bitilasana)
        {"\n"}3. Forward Bend (Uttanasana)
        {"\n"}4. Warrior Pose (Virabhadrasana)
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Restorative Yoga Poses</Text>
      <Text>
        1. Legs-Up-The-Wall Pose (Viparita Karani)
        {"\n"}2. Reclining Bound Angle Pose (Supta Baddha Konasana)
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Meditation Techniques</Text>
      <Text>
        1. Mindfulness Meditation
        {"\n"}2. Loving-Kindness Meditation (Metta)
        {"\n"}3. Body Scan Meditation
        {"\n"}4. Guided Imagery
        {"\n"}5. Mantra Meditation
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>Creating a Routine</Text>
      <Text>
        1. Set Aside Regular Time
        {"\n"}2. Create a Dedicated Space
        {"\n"}3. Journal Reflections
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>
        Integration with Professional Support
      </Text>
      <Text>
        - Counseling or Therapy
        {"\n"}- Support Groups (AA, NA)
        {"\n"}- Medical Support
      </Text>
      <View style={styles.lineSpacer} />

      <Text>
        Remember, while yoga and meditation can be powerful tools in addiction
        recovery, they should be part of an integrative approach that includes
        medical and psychological support.
      </Text>
    </>
  );
}

// ------------------------ TERTIARY PART 1 ------------------------
function renderTertiaryPart1() {
  return (
    <>
      <Text>
        Cognitive Behavioral Therapy (CBT) aims to change patterns of thinking
        or behavior that fuel addiction. Below are ten CBT suggestions:
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>
        1. Identify and Challenge Negative Thoughts
      </Text>
      <Text>
        - Why it Helps: Negative thoughts can make individuals feel hopeless or
        unworthy.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>2. Behavioral Activation</Text>
      <Text>
        - Why it Helps: Engaging in meaningful activities reduces boredom and
        stress.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>3. Craving Control Techniques</Text>
      <Text>
        - Why it Helps: Managing cravings effectively can prevent relapse.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>4. Thought Stopping</Text>
      <Text>
        - Why it Helps: Interrupting obsessive thoughts can reduce the impulse
        to use substances.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>5. Cognitive Restructuring</Text>
      <Text>
        - Why it Helps: Changing distorted thinking can alleviate negative
        emotions that trigger addiction.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>
        6. Mindfulness and Grounding Techniques
      </Text>
      <Text>
        - Why it Helps: Being present can help manage stress and reduce
        impulsivity.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>7. Relapse Prevention Planning</Text>
      <Text>
        - Why it Helps: Anticipating high-risk situations helps prevent relapse.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>8. Assertiveness Training</Text>
      <Text>
        - Why it Helps: Building assertiveness helps individuals refuse
        substances confidently.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>9. Goal Setting and Reward Systems</Text>
      <Text>
        - Why it Helps: Setting achievable goals and rewarding progress
        increases motivation.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>10. Building a Support Network</Text>
      <Text>
        - Why it Helps: Support from others provides encouragement and
        accountability.
      </Text>
    </>
  );
}

// ------------------------ TERTIARY PART 2 ------------------------
function renderTertiaryPart2() {
  return (
    <>
      <Text>
        Rational Emotive Behavior Therapy (REBT) focuses on identifying and
        changing irrational beliefs. Here are ten REBT-based strategies:
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>
        1. Identify and Dispute Irrational Beliefs
      </Text>
      <Text>
        - Why it Helps: Irrational beliefs can fuel addictive behaviors.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>
        2. Develop a Stronger Sense of Self-acceptance
      </Text>
      <Text>
        - Why it Helps: Accepting yourself reduces the reliance on substances.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>3. Change "Musts" to Preferences</Text>
      <Text>
        - Why it Helps: Replacing absolute language with preferences reduces
        stress.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>
        4. Practice Emotional Responsibility
      </Text>
      <Text>
        - Why it Helps: Controlling your reactions minimizes the need for
        substances.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>
        5. Visualize Long-term Consequences
      </Text>
      <Text>
        - Why it Helps: Imagining negative outcomes can motivate behavior
        change.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>6. Create a Rational Coping Plan</Text>
      <Text>
        - Why it Helps: Having a clear plan for coping with urges reduces
        relapse risk.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>7. Develop Problem-solving Skills</Text>
      <Text>
        - Why it Helps: Overcoming problems without substances builds
        resilience.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>8. Challenge Catastrophic Thinking</Text>
      <Text>
        - Why it Helps: Disputing catastrophic thoughts creates a balanced
        perspective.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>9. Employ Mindfulness Techniques</Text>
      <Text>
        - Why it Helps: Mindfulness increases awareness of thoughts and urges.
      </Text>
      <View style={styles.lineSpacer} />

      <Text style={styles.boldHeading}>10. Seek Social Support</Text>
      <Text>
        - Why it Helps: Support from others provides encouragement and
        accountability.
      </Text>
    </>
  );
}

/**
 * --------------------------------------------------------------------------------
 * PART TWO: recommendedItems array
 * Each item references a render function (renderContent) for custom heading styling.
 * --------------------------------------------------------------------------------
 */
const recommendedItems = [
  {
    id: "1",
    title: "Primary Intervention",
    image: require("../assets/images/watchman.png"),
    sections: [
      {
        title: "Primary Intervention Info",
        renderContent: renderPrimaryContent,
      },
    ],
  },
  {
    id: "2",
    title: "Secondary Intervention",
    image: require("../assets/images/watchman.png"),
    sections: [
      {
        title: "Books, Movies, Motivational Content, and Music",
        renderContent: renderSecondaryPart1,
      },
      {
        title: "Yoga & Meditation (Part 1)",
        renderContent: renderSecondaryPart2,
      },
      {
        title: "Yoga & Meditation (Part 2)",
        renderContent: renderSecondaryPart3,
      },
    ],
  },
  {
    id: "3",
    title: "Tertiary Intervention",
    image: require("../assets/images/watchman.png"),
    sections: [
      {
        title: "Cognitive Behavioral Therapy (CBT)",
        renderContent: renderTertiaryPart1,
      },
      {
        title: "Rational Emotive Behavior Therapy (REBT)",
        renderContent: renderTertiaryPart2,
      },
    ],
  },
  {
    id: "4",
    title: "Connect to Mental Health Professional",
    image: require("../assets/images/watchman.png"),
    sections: [
      {
        title: "Connect to Mental Health Professional",
        renderContent: () => (
          <>
            <Text>
              Tap below to message on WhatsApp for professional support.
            </Text>
            <View style={{ marginVertical: 5 }}>
              <Button
                title="Message on WhatsApp"
                onPress={() =>
                  Linking.openURL("https://wa.me/917020037124")
                }
                color="#AB47BC"
              />
            </View>
          </>
        ),
      },
    ],
  },
];

/**
 * --------------------------------------------------------------------------------
 * PART THREE: Main Component with Modal for Section Content
 * --------------------------------------------------------------------------------
 */
interface RecommendedInterventionsProps {
  images?: {
    primary?: any; // custom image for Primary Intervention
    secondary?: any; // custom image for Secondary Intervention
    tertiary?: any; // custom image for Tertiary Intervention
  };
  recommendedInterventions?: any; // New prop to receive intervention data
  scanName?: string; // Name of the scan taken
  totalScore?: number; // Score from the scan
  navigation?: any; // Navigation prop for routing to Mind Tools
}

// Add interface for intervention types
interface InterventionSection {
  name: string;
  component: any;
}

interface Intervention {
  name: string;
  type: InterventionSection[];
}

interface GroupedInterventions {
  primary: Intervention | null;
  secondary: Intervention[];
  tertiary: Intervention[];
}

interface SectionItem {
  title: string;
  renderContent: () => React.ReactNode;
}

interface CardItem {
  id: string;
  title: string;
  image: any;
  sections: SectionItem[];
  isRecommended?: boolean;
}

export default function RecommendedInterventions({
  images,
  recommendedInterventions,
  scanName,
  totalScore,
  navigation: propNavigation,
}: RecommendedInterventionsProps) {
  // Use navigation hook as fallback
  const hookNavigation = useNavigation<NavigationProp>();
  const navigation = propNavigation || hookNavigation;

  console.log("RecommendedInterventions initialized with:", {
    scanName,
    totalScore,
    hasNavigation: !!navigation,
    hasPropNavigation: !!propNavigation,
    hasHookNavigation: !!hookNavigation,
  });

  const [selectedIntervention, setSelectedIntervention] = useState<any>(null);
  const [selectedSection, setSelectedSection] = useState<any>(null);

  // Reset all modal states when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen focused - resetting modal states");
      setSelectedIntervention(null);
      setSelectedSection(null);
    }, [])
  );

  // Helper functions for better UI
  const getStrategyIcon = (index: number) => {
    const icons = ["💡", "🧘‍♀️", "🌿", "🧠", "💭", "👨‍⚕️"];
    return icons[index] || "💡";
  };

  // Add clear debugging to show what interventions we received
  useEffect(() => {
    console.log(
      "RecommendedInterventions component received props:",
      recommendedInterventions ? true : false
    );

    if (recommendedInterventions?.interventionData?.interventions) {
      console.log(
        "Interventions received:",
        recommendedInterventions.interventionData.interventions
          .map((i: any) => i.name)
          .join(", ")
      );
      console.log(
        "Total interventions: ",
        recommendedInterventions.interventionData.interventions.length
      );
    } else {
      console.log("No valid interventions data provided to component");
    }
  }, [recommendedInterventions]);

  // If we have recommended interventions passed in, use those instead of the default recommendedItems
  const interventionsToShow = useMemo(() => {    // NEW STRATEGY CARDS APPROACH: Always use the new six strategy cards
    console.log("Using new strategy cards approach");
    
    // Helper function to get the condition slug for navigation
    const getConditionSlug = (scanName: string) => {
      if (!scanName) return "common-psychological-issues"; // Default fallback
      
      // Map scan names to condition slugs used in strategy screens
      const conditionMappings: Record<string, string> = {
        "Anger Management": "anger-management",
        "Stress": "stress", 
        "Internet and Social Media Issue": "internet-social-media",
        "Internet & Social Media": "internet-social-media", // Alternative form
        "Internet Social Media": "internet-social-media", // Short form
        "Family and Relationship": "family-relationship",
        "Family & Relationship": "family-relationship", // Alternative form
        "Sleep": "sleep",
        "Suicidal Behaviour": "suicidal-behaviour",
        "Sex Life": "sex-life",
        "Addictions": "addictions",
        "Common Psychological Issues": "common-psychological-issues",
        "Environment Issues Affecting Mental Wellbeing": "environment-issues",
        "Financial Mental Health": "financial-mental-health",
        "General Physical Fitness": "general-physical-fitness",
        "Internet Dependence": "internet-dependence", 
        "Professional Mental Health": "professional-mental-health",
        "Social Mental Health": "social-mental-health",
        "Youngster Issues": "youngster-issues",
        "Job Insecurity": "job-insecurity",
        // Additional mappings for alternative names
        "Environment Issues": "environment-issues",
        "Physical Fitness": "general-physical-fitness",
        "Internet Addiction": "internet-dependence", // Alternative name
        "Social Issues": "social-mental-health", // Alternative name
      };
      
      // Try exact match first
      if (conditionMappings[scanName]) {
        return conditionMappings[scanName];
      }
      
      // Try fuzzy matching
      const normalizedScanName = scanName.toLowerCase();
      for (const [key, value] of Object.entries(conditionMappings)) {
        if (
          key.toLowerCase().includes(normalizedScanName) ||
          normalizedScanName.includes(key.toLowerCase())
        ) {
          return value;
        }
      }
      
      // Default fallback
      return "common-psychological-issues";
    };

    // Helper function to navigate to specific strategy screen
    const navigateToStrategy = (strategyType: string) => {
      if (!navigation) {
        console.error("Navigation not available");
        return;
      }
      
      // Immediately close all modals and reset states
      setSelectedIntervention(null);
      setSelectedSection(null);
      
      const condition = getConditionSlug(scanName || "");
      console.log(`Navigating to ${strategyType} with condition: ${condition}, scanName: ${scanName}`);
      
      // Navigate immediately without setTimeout to prevent UI lag
      try {
        switch (strategyType) {
          case "common":
            navigation.navigate("CommonSuggestionsScreen", { condition });
            break;
          case "yoga":
            navigation.navigate("YogaScreen", { condition });
            break;
          case "relaxation":
            navigation.navigate("RelaxationScreen", { condition });
            break;
          case "cbt":
            navigation.navigate("CBTScreen", { condition });
            break;
          case "rebt":
            navigation.navigate("REBTScreen", { condition });
            break;
          default:
            console.log(`Unknown strategy type: ${strategyType}`);
        }
      } catch (error) {
        console.error(`Navigation error for ${strategyType}:`, error);
      }
    };

    // Helper function to determine if a strategy should be recommended based on score
    const isRecommended = (strategyIndex: number, score: number) => {
      if (score >= 0 && score <= 25) {
        // 0-25: Only Common Suggestions
        return strategyIndex === 0; // Common Suggestions
      } else if (score >= 26 && score <= 49) {
        // 26-49: Common Suggestions, Yoga, Relaxation
        return strategyIndex === 0 || strategyIndex === 1 || strategyIndex === 2; 
      } else if (score >= 50 && score <= 75) {
        // 50-75: CBT, REBT, and Professional Support
        return strategyIndex === 3 || strategyIndex === 4 || strategyIndex === 5; // CBT, REBT, Professional
      } else if (score >= 76 && score <= 100) {
        // 76-100: CBT, REBT, and Professional Support
        return strategyIndex === 3 || strategyIndex === 4 || strategyIndex === 5; // CBT, REBT, Professional
      }
      return false;
    };
    
    const strategyCards: CardItem[] = [
      {
        id: "1",
        title: t("scanResult.strategies.commonSuggestions.title"),
        image: require("../assets/images/watchman.png"),
        isRecommended: isRecommended(0, totalScore || 0),
        sections: [
          {
            title: t("scanResult.strategies.commonSuggestions.title"),
            renderContent: () => (
              <View>
                <Text style={styles.boldHeading}>{t("scanResult.strategies.commonSuggestions.title")}</Text>
                <Text>
                  {t("scanResult.strategies.commonSuggestions.content", { conditionName: scanName || t("scanResult.ui.defaultConditionName") })}
                </Text>
                <View style={styles.lineSpacer} />
                <View style={{ marginVertical: 10 }}>
                  <Button
                    title={t("scanResult.strategies.viewInMindTools")}
                    onPress={() => navigateToStrategy("common")}
                    color="#AB47BC"
                  />
                </View>
              </View>
            ),
          },
        ],
      },
      {
        id: "2",
        title: t("scanResult.strategies.yoga.title"),
        image: require("../assets/images/watchman.png"),
        isRecommended: isRecommended(1, totalScore || 0),
        sections: [
          {
            title: t("scanResult.strategies.yoga.title"),
            renderContent: () => (
              <View>
                <Text style={styles.boldHeading}>{t("scanResult.strategies.yoga.title")}</Text>
                <Text>
                  {t("scanResult.strategies.yoga.content", { conditionName: scanName || t("scanResult.ui.defaultConditionName") })}
                </Text>
                <View style={styles.lineSpacer} />
                <View style={{ marginVertical: 10 }}>
                  <Button
                    title={t("scanResult.strategies.viewInMindTools")}
                    onPress={() => navigateToStrategy("yoga")}
                    color="#AB47BC"
                  />
                </View>
              </View>
            ),
          },
        ],
      },
      {
        id: "3",
        title: t("scanResult.strategies.relaxation.title"),
        image: require("../assets/images/watchman.png"),
        isRecommended: isRecommended(2, totalScore || 0),
        sections: [
          {
            title: t("scanResult.strategies.relaxation.title"),
            renderContent: () => (
              <View>
                <Text style={styles.boldHeading}>{t("scanResult.strategies.relaxation.title")}</Text>
                <Text>
                  {t("scanResult.strategies.relaxation.content", { conditionName: scanName || t("scanResult.ui.defaultConditionName") })}
                </Text>
                <View style={styles.lineSpacer} />
                <View style={{ marginVertical: 10 }}>
                  <Button
                    title={t("scanResult.strategies.viewInMindTools")}
                    onPress={() => navigateToStrategy("relaxation")}
                    color="#AB47BC"
                  />
                </View>
              </View>
            ),
          },
        ],
      },
      {
        id: "4",
        title: t("scanResult.strategies.cbt.title"),
        image: require("../assets/images/watchman.png"),
        isRecommended: isRecommended(3, totalScore || 0),
        sections: [
          {
            title: t("scanResult.strategies.cbt.title"),
            renderContent: () => (
              <View>
                <Text style={styles.boldHeading}>{t("scanResult.strategies.cbt.title")}</Text>
                <Text>
                  {t("scanResult.strategies.cbt.content", { conditionName: scanName || t("scanResult.ui.defaultConditionName") })}
                </Text>
                <View style={styles.lineSpacer} />
                <View style={{ marginVertical: 10 }}>
                  <Button
                    title={t("scanResult.strategies.viewInMindTools")}
                    onPress={() => navigateToStrategy("cbt")}
                    color="#AB47BC"
                  />
                </View>
              </View>
            ),
          },
        ],
      },
      {
        id: "5",
        title: t("scanResult.strategies.rebt.title"),
        image: require("../assets/images/watchman.png"),
        isRecommended: isRecommended(4, totalScore || 0),
        sections: [
          {
            title: t("scanResult.strategies.rebt.title"),
            renderContent: () => (
              <View>
                <Text style={styles.boldHeading}>{t("scanResult.strategies.rebt.title")}</Text>
                <Text>
                  {t("scanResult.strategies.rebt.content", { conditionName: scanName || t("scanResult.ui.defaultConditionName") })}
                </Text>
                <View style={styles.lineSpacer} />
                <View style={{ marginVertical: 10 }}>
                  <Button
                    title={t("scanResult.strategies.viewInMindTools")}
                    onPress={() => navigateToStrategy("rebt")}
                    color="#AB47BC"
                  />
                </View>
              </View>
            ),
          },
        ],
      },
      {
        id: "6",
        title: t("scanResult.strategies.professional.title"),
        image: require("../assets/images/watchman.png"),
        isRecommended: isRecommended(5, totalScore || 0),
        sections: [
          {
            title: t("scanResult.strategies.professional.title"),
            renderContent: () => (
              <>
                <Text style={[styles.boldHeading, { color: "#d00" }]}>
                  Important Notice
                </Text>
                <Text>
                  {t("scanResult.strategies.professional.content", { conditionName: scanName || t("scanResult.ui.defaultConditionName") })}
                </Text>
                <View style={styles.lineSpacer} />
                <Text style={styles.boldHeading}>
                  Benefits of Professional Support:
                </Text>
                <Text>• Expert assessment and diagnosis</Text>
                <Text>• Evidence-based treatment options</Text>
                <Text>
                  • Personalized strategies for your specific situation
                </Text>
                <Text>• Ongoing support throughout your recovery journey</Text>
                <View style={{ marginVertical: 10 }}>
                  <Button
                    title={t("scanResult.strategies.connectWithExpert")}
                    onPress={() => {
                      console.log("Professional Help button pressed - Opening WhatsApp");
                      // Close any open strategy modal immediately
                      setSelectedIntervention(null);
                      setSelectedSection(null);
                      // Open WhatsApp directly instead of chatbot
                      Linking.openURL("https://wa.me/917020037124");
                    }}
                    color="#AB47BC"
                  />
                </View>
              </>
            ),
          },
        ],
      },
    ];

    console.log(`Returning ${strategyCards.length} strategy cards`);
    return strategyCards;

    // FALLBACK: Use default items if needed
    // console.log("Using default recommended items");
    // return recommendedItems;
  }, [scanName, navigation, totalScore]);

  // Allow callers to override the default images for the first
  // three interventions. Item
  const itemsWithDynamicImages = React.useMemo(() => {
    return interventionsToShow.map((item: any) => {
      let dynamicImage = item.image;
      if (item.id === "1" && images?.primary) dynamicImage = images.primary;
      if (item.id === "2" && images?.secondary) dynamicImage = images.secondary;
      if (item.id === "3" && images?.tertiary) dynamicImage = images.tertiary;
      return { ...item, image: dynamicImage };
    });
  }, [images, interventionsToShow]);

  const handlePress = (item: any) => {
    // Ensure any previous states are cleared immediately
    setSelectedSection(null);
    setSelectedIntervention(item);
  };

  const closeModal = () => {
    console.log("Closing modal - clearing all states");
    setSelectedIntervention(null);
    setSelectedSection(null);
  };

  const handleSectionPress = (section: any) => {
    setSelectedSection(section);
  };

  const renderModalContent = () => {
    if (!selectedIntervention) return null;

    if (
      !selectedIntervention.sections ||
      selectedIntervention.sections.length === 0
    ) {
      return (
        <ScrollView style={styles.modalScroll}>
          <Text>No content available for this intervention.</Text>
        </ScrollView>
      );
    }

    if (selectedIntervention.sections.length === 1 && !selectedSection) {
      const { renderContent } = selectedIntervention.sections[0];
      return (
        <ScrollView style={styles.modalScroll}>
          {renderContent ? renderContent() : <Text>Content not available</Text>}
        </ScrollView>
      );
    }

    if (selectedSection) {
      return (
        <ScrollView style={styles.modalScroll}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedSection(null)}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>
              Back to Sections
            </Text>
          </TouchableOpacity>
          {selectedSection.renderContent ? (
            selectedSection.renderContent()
          ) : (
            <Text>Content not available</Text>
          )}
        </ScrollView>
      );
    } else {
      return (
        <View>
          <Text style={styles.sectionListTitle}>
            Sections for {selectedIntervention.title}:
          </Text>
          {selectedIntervention.sections.map((sec: any, idx: number) => (
            <TouchableOpacity
              key={idx}
              style={styles.sectionButton}
              onPress={() => handleSectionPress(sec)}
            >
              <Text style={styles.sectionButtonText}>
                {sec.title || `Section ${idx + 1}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t("scanResult.strategies.heading")}</Text>
      <View style={styles.strategyGrid}>
        {itemsWithDynamicImages.map((item: any, index: number) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.strategyCard,
              index === 5 && styles.professionalCard, // Special styling for Professional Mental Health Support
              item.isRecommended && styles.recommendedCard, // Add special styling for recommended cards
            ]}
            onPress={() => handlePress(item)}
            activeOpacity={0.8}
          >
            {/* Recommended Badge - positioned absolutely */}
            {item.isRecommended && (
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedText}>
                  {t("scanResult.strategies.recommended")}
                </Text>
              </View>
            )}
            
            <View style={styles.strategyCardContent}>
              <View style={styles.strategyIconContainer}>
                <Text style={styles.strategyIcon}>
                  {getStrategyIcon(index)}
                </Text>
              </View>
              <View style={styles.strategyTextContainer}>
                <Text style={styles.strategyTitle}>
                  {index === 0 && t("scanResult.strategies.commonSuggestions.title")}
                  {index === 1 && t("scanResult.strategies.yoga.title")}
                  {index === 2 && t("scanResult.strategies.relaxation.title")}
                  {index === 3 && t("scanResult.strategies.cbt.title")}
                  {index === 4 && t("scanResult.strategies.rebt.title")}
                  {index === 5 && t("scanResult.strategies.professional.title")}
                </Text>
                <Text style={styles.strategyDescription}>
                  {index === 0 && t("scanResult.strategies.commonSuggestions.description")}
                  {index === 1 && t("scanResult.strategies.yoga.description")}
                  {index === 2 && t("scanResult.strategies.relaxation.description")}
                  {index === 3 && t("scanResult.strategies.cbt.description")}
                  {index === 4 && t("scanResult.strategies.rebt.description")}
                  {index === 5 && t("scanResult.strategies.professional.description")}
                </Text>
              </View>
              <View style={styles.strategyArrow}>
                <Text style={styles.arrowIcon}>›</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Modal 
        visible={!!selectedIntervention} 
        animationType="slide" 
        transparent
        onRequestClose={closeModal}
        hardwareAccelerated={true}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={closeModal}
        >
          <TouchableOpacity 
            style={styles.modalContainer} 
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>
                {selectedIntervention?.title}
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            {renderModalContent()}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

/**
 * --------------------------------------------------------------------------------
 * PART FOUR: Styles
 * --------------------------------------------------------------------------------
 */
const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A1B23",
    marginBottom: 24,
    paddingHorizontal: 20,
    letterSpacing: -0.8,
    lineHeight: 30,
  },
  strategyGrid: {
    paddingHorizontal: 16,
    gap: 16,
  },
  strategyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#1E293B",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 5,
    position: "relative",
    overflow: "visible",
  },
  recommendedCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#8B5CF6",
    borderWidth: 2,
    shadowColor: "#8B5CF6",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    transform: [{ scale: 1.02 }],
  },
  professionalCard: {
    backgroundColor: "#FEFBFF",
    borderColor: "#8B5CF6",
    borderWidth: 2.5,
    shadowColor: "#8B5CF6",
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 10,
  },
  strategyCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  strategyIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#64748B",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  strategyIcon: {
    fontSize: 32,
    lineHeight: 38,
  },
  strategyTextContainer: {
    flex: 1,
    paddingRight: 12,
  },
  strategyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
    lineHeight: 24,
    letterSpacing: -0.3,
  },
  strategyDescription: {
    fontSize: 15,
    color: "#64748B",
    lineHeight: 22,
    letterSpacing: -0.1,
  },
  strategyArrow: {
    marginLeft: 12,
    padding: 4,
  },
  arrowIcon: {
    fontSize: 24,
    color: "#CBD5E1",
    fontWeight: "200",
  },
  recommendedBadge: {
    position: "absolute",
    top: -8,
    right: 12,
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    zIndex: 10,
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  recommendedText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  // Keep existing styles for modal functionality
  scrollContainer: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 15,
    width: 160,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 10,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "92%",
    maxHeight: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  modalHeaderText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  closeButton: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
    padding: 4,
  },
  modalScroll: {
    padding: 20,
  },
  sectionListTitle: {
    fontSize: 18,
    fontWeight: "700",
    margin: 20,
    textAlign: "center",
    color: "#1F2937",
    letterSpacing: -0.3,
  },
  sectionButton: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  sectionButtonText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  backButton: {
    backgroundColor: "#374151",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  boldHeading: {
    fontWeight: "700",
    fontSize: 18,
    color: "#1F2937",
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  lineSpacer: {
    marginVertical: 8,
  },
});
