import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomIcon from "./CustomIcon";
import { t } from "@/i18n/locales/i18n"; // Import the translation function
import AsyncStorage from "@react-native-async-storage/async-storage";

const MOOD_STORAGE_KEY = "@mood_data";

interface MoodData {
  mood: {
    icon: string;
    label: string;
  } | null;
  timestamp: string;
}

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<{
    icon: string;
    label: string;
  } | null>(null); // Track selected mood
  const [lastUpdated, setLastUpdated] = useState(t("moodSelector.lastUpdatedDate", "31 Oct 2024")); // Initial last updated date

  // Load saved mood data when component mounts
  useEffect(() => {
    loadMoodData();
  }, []);

  // Load mood data from AsyncStorage
  const loadMoodData = async () => {
    try {
      const savedMoodData = await AsyncStorage.getItem(MOOD_STORAGE_KEY);
      if (savedMoodData) {
        const { mood, timestamp } = JSON.parse(savedMoodData) as MoodData;
        setSelectedMood(mood);
        setLastUpdated(timestamp);
      }
    } catch (error) {
      console.error("Error loading mood data:", error);
    }
  };

  // Save mood data to AsyncStorage
  const saveMoodData = async (mood: { icon: string; label: string; } | null) => {
    try {
      const timestamp = new Date().toLocaleString();
      const moodData: MoodData = {
        mood,
        timestamp,
      };
      await AsyncStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(moodData));
      setSelectedMood(mood);
      setLastUpdated(timestamp);
    } catch (error) {
      console.error("Error saving mood data:", error);
    }
  };

  // Function to handle mood selection
  const handleMoodSelect = (mood: { icon: string; label: string }) => {
    saveMoodData(mood);
  };

  // Function to handle reset
  const handleReset = () => {
    saveMoodData(null);
  };

  // Create translated moods array within the component's render function
  const translatedMoods = moodIcons.map(mood => ({
    icon: mood.icon,
    label: t(mood.key, mood.defaultLabel)
  }));

  return (
    <View style={styles.card}>
      {/* Header with Title and Reset Button */}
      <View style={styles.header}>
        <Text style={styles.title}>{t("moodSelector.editMood", "Edit Mood")}</Text>
        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.resetButton}>{t("moodSelector.reset", "Reset")}</Text>
        </TouchableOpacity>
      </View>

      {/* Mood Icons Section */}
      <View style={styles.moodIcons}>
        {translatedMoods.map((mood) => (
          <MoodIcon
            key={mood.label}
            name={mood.icon}
            label={mood.label}
            isSelected={selectedMood?.label === mood.label}
            onPress={() => handleMoodSelect(mood)}
          />
        ))}
      </View>

      {/* Last Updated Text */}
      <Text style={styles.lastUpdated}>{t("moodSelector.lastUpdatedOn", "Last updated on")} {lastUpdated}</Text>
    </View>
  );
}

// Mood Icon Component
interface MoodIconProps {
  name: string;
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const MoodIcon = ({ name, label, isSelected, onPress }: MoodIconProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.iconContainer, isSelected ? styles.iconSelected : null]}
  >
    <CustomIcon
      type="MCI"
      name={name}
      size={isSelected ? 50 : 45} // Slightly larger when selected
      color={isSelected ? "#C841CC" : "#5F6368"} // Blue when selected, gray otherwise
    />
    <Text style={styles.iconLabel}>{label}</Text>
  </TouchableOpacity>
);

// Define mood icons outside of component (these don't need translation)
const moodIcons = [
  { icon: "emoticon-sad-outline", key: "moodSelector.frustrated", defaultLabel: "frustrated" }, // Sad face
  { icon: "emoticon-neutral-outline", key: "moodSelector.stressed", defaultLabel: "stressed" }, // Neutral face
  { icon: "emoticon-happy-outline", key: "moodSelector.content", defaultLabel: "content" }, // Happy face
  { icon: "emoticon-outline", key: "moodSelector.calm", defaultLabel: "calm" }, // Calm face
  { icon: "emoticon-excited-outline", key: "moodSelector.excited", defaultLabel: "excited" }, // Excited face
];

// Styles for MoodSelector
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 13, // Padding for the inner content
    marginHorizontal: 13,
    marginBottom: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#4A4A4A",
  },
  resetButton: {
    fontSize: 12,
    color: "#5F6368",
    fontFamily: "Poppins-Regular",
  },
  moodIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 16,
  },
  iconContainer: {
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
  },
  iconSelected: {
    backgroundColor: "#EFF0F2",
    borderColor: "#C841CC",
    borderWidth: 1,
  },
  iconLabel: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    color: "#000000",
    marginTop: 4,
  },
  lastUpdated: {
    color: "#7D7C7C",
    fontSize: 10,
    fontFamily: "Poppins_400Italic",
    textAlign: "left",
    marginTop: 8,
  },
});
