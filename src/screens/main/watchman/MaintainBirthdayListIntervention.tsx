import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Banner from "@/components/watchmancompo/Banner";
import AppGroupCard from "@/components/watchmancompo/AppGroupCard";
import BirthdayList from "@/components/watchmancompo/BirthdayList"; // Import BirthdayList component
import DurationSelector from "@/components/watchmancompo/DurationSelector";
import DifficultyLevel from "@/components/watchmancompo/DifficultyLevel";
import ExpertVerdict from "@/components/watchmancompo/ExpertVerdict";
import PrimaryButton from "@/components/common/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";

const MaintainBirthdayListIntervention = () => {
  const handleStartJourney = () => {
    console.log("Journey started for 'Maintain Birthday List'!");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Banner */}
        <Banner
          title="Maintain Birthday List"
          subtitle="Level 2"
          description="When you open the app a pop up would appear every predetermined intervals"
        />

        {/* App Group Card */}
        <AppGroupCard />

        {/* Birthday List */}
        <BirthdayList />

        {/* Set Duration */}
        <DurationSelector />

        {/* Difficulty Level */}
        <DifficultyLevel />

        {/* Expert Verdict */}
        <ExpertVerdict />

        {/* Save & Start Journey Button */}
        <PrimaryButton
          label="Save & start the journey"
          callback={handleStartJourney}
          style={{ width: "100%", alignSelf: "stretch" }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

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

export default MaintainBirthdayListIntervention;