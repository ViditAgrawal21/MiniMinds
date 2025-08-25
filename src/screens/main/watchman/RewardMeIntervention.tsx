import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Banner from "@/components/watchmancompo/Banner";
import AppGroupCard from "@/components/watchmancompo/AppGroupCard";
import ScreenAndBreakTime from "@/components/watchmancompo/ScreenAndBreakTime";
import DifficultyLevel from "@/components/watchmancompo/DifficultyLevel";
import DurationSelector from "@/components/watchmancompo/DurationSelector";
import ExpertVerdict from "@/components/watchmancompo/ExpertVerdict";
import PrimaryButton from "@/components/common/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { t } from "@/i18n/locales/i18n"; // Import translation function

export default function RewardMeIntervention() {
  const navigation = useNavigation<any>();

  const handleStartJourney = () => {
    console.log("Journey started for 'Reward Me'!");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Banner */}
        <Banner
          title="Reward Me"
          subtitle="Level 1"
          description="When you open the app a pop-up would appear every predetermined intervals"
        />

        {/* App Group Card */}
        <AppGroupCard />

        {/* Screen and Break Time */}
        <ScreenAndBreakTime />

        {/* Difficulty Level */}
        <DifficultyLevel />

        {/* Set Duration */}
        <DurationSelector />

        {/* Expert Verdict */}
        <ExpertVerdict />

        {/* Save Button */}
        <PrimaryButton
          label="Save & start the journey"
          callback={handleStartJourney}
          style={{ width: "100%", alignSelf: "stretch" }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollViewContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
});