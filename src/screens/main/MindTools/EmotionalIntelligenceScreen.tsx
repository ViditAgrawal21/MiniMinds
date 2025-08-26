import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EmotionalIntelligenceScreen({ navigation }: any) {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleViewStrategy = (strategyKey: string) => {
    console.log(`${strategyKey} strategy pressed`);
    
    // Navigate to individual strategy screens
    const navigationMap = {
      selfAwareness: "SelfAwarenessStrategyScreen",
      selfRegulation: "SelfRegulationStrategyScreen",
      motivation: "MotivationStrategyScreen",
      empathy: "EmpathyStrategyScreen",
      socialSkills: "SocialSkillsStrategyScreen",
    };
    
    const screenName = navigationMap[strategyKey as keyof typeof navigationMap];
    if (screenName) {
      navigation.navigate(screenName);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.headerTitle}>Emotional Intelligence</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            <View style={styles.imageContainer}>
              <Ionicons name="heart" size={48} color="#8b5cf6" />
              <Text style={styles.imageLabel}>Emotional Intelligence</Text>
            </View>
          </View>
        </View>

        {/* Title and Description */}
        <Text style={styles.title}>Emotional Intelligence </Text>
        <Text style={styles.description}>
          Emotional Intelligence (EQ) is the ability to recognize, understand,
          and manage emotions effectively. It encompasses five key dimensions
          that help you navigate social complexities, lead more effectively, and
          achieve better personal and professional outcomes.
        </Text>

        {/* Benefits Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Benefits</Text>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              Better self-awareness and emotional control
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              Improved relationships and communication
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              Enhanced leadership and social skills
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              Greater resilience and stress management
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              Increased empathy and perspective-taking
            </Text>
          </View>
        </View>

        {/* EQ Dimensions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EQ Development Strategies</Text>

          {/* Self-Awareness */}
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>Self-awareness EQ</Text>
            <Text style={styles.strategyDescription}>
              Assesses how well you recognize your own emotions and their
              impact.
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("selfAwareness")}
            >
              <Text style={styles.viewStrategyButtonText}>View Strategies</Text>
            </Pressable>
          </View>

          {/* Self-Regulation */}
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>Self-regulation EQ</Text>
            <Text style={styles.strategyDescription}>
              Measures your ability to manage and control your emotions.
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("selfRegulation")}
            >
              <Text style={styles.viewStrategyButtonText}>View Strategies</Text>
            </Pressable>
          </View>

          {/* Motivation */}
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>Motivation EQ</Text>
            <Text style={styles.strategyDescription}>
              Evaluates your drive to achieve goals and stay persistent.
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("motivation")}
            >
              <Text style={styles.viewStrategyButtonText}>View Strategies</Text>
            </Pressable>
          </View>

          {/* Empathy */}
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>Empathy EQ</Text>
            <Text style={styles.strategyDescription}>
              Measures your ability to understand others' emotions and
              perspectives.
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("empathy")}
            >
              <Text style={styles.viewStrategyButtonText}>View Strategies</Text>
            </Pressable>
          </View>

          {/* Social Skills */}
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>Social skills EQ</Text>
            <Text style={styles.strategyDescription}>
              Evaluates your ability to build relationships and communicate
              effectively.
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("socialSkills")}
            >
              <Text style={styles.viewStrategyButtonText}>View Strategies</Text>
            </Pressable>
          </View>
        </View>

        {/* Alert Box */}
        <View style={styles.alertBox}>
          <View style={styles.alertHeader}>
            <View style={styles.alertIconContainer}>
              <Ionicons name="information-circle" size={16} color="#3b82f6" />
            </View>
            <Text style={styles.alertTitle}>Remember</Text>
          </View>
          <Text style={styles.alertText}>
            Developing emotional intelligence is a gradual process that requires
            consistent practice and self-reflection. Start with one dimension
            and gradually incorporate others as you build confidence.
          </Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#f8f9ff",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  illustrationBox: {
    width: "100%",
    height: 120,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
  },
  imageLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 8,
    fontWeight: "500",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  symptomItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  symptomDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#8b5cf6",
    marginTop: 8,
    marginRight: 12,
  },
  symptomText: {
    flex: 1,
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
  },
  strategyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  strategyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  strategyDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 16,
  },
  viewStrategyButton: {
    backgroundColor: "#8b5cf6",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  viewStrategyButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  alertBox: {
    backgroundColor: "#eff6ff",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
    marginBottom: 16,
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  alertIconContainer: {
    marginRight: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e40af",
  },
  alertText: {
    fontSize: 14,
    color: "#1e40af",
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 32,
  },
});
