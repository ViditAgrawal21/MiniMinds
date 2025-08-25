import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Banner from "@/components/watchmancompo/Banner";
import AppGroupCard from "@/components/watchmancompo/AppGroupCard";
import ScreenAndBreakTime from "@/components/watchmancompo/ScreenAndBreakTime";
import DifficultyLevel from "@/components/watchmancompo/DifficultyLevel";
import DurationSelector from "@/components/watchmancompo/DurationSelector";
import ExpertVerdict from "@/components/watchmancompo/ExpertVerdict";
import PrimaryButton from "@/components/common/PrimaryButton"; // Replacing SecondaryButton with PrimaryButton
import { SafeAreaView } from "react-native-safe-area-context";

const GiveMeABreakIntervention = () => {
  const handleStartJourney = () => {
    console.log("Journey started for 'Give me a Break'!");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Banner */}
        <Banner
          title="Give me a Break"
          subtitle="Level 1"
          description="When you open the app a pop up would appear every predetermined intervals"
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
          style={{ width: "100%", alignSelf: "stretch" }} // Added stretch styling
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  scrollViewContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
});

export default GiveMeABreakIntervention;