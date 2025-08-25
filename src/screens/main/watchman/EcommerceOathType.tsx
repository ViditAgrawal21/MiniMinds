import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Banner from "@/components/watchmancompo/Banner";
import AppGroupCard from "@/components/watchmancompo/AppGroupCard";
import OathText from "@/components/watchmancompo/OathText";
import DifficultyLevel from "@/components/watchmancompo/DifficultyLevel";
import DurationSelector from "@/components/watchmancompo/DurationSelector";
import ExpertVerdict from "@/components/watchmancompo/ExpertVerdict";
import PrimaryButton from "@/components/common/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";

const EcommerceOathType = () => {
  const handleStartJourney = () => {
    console.log("Journey started for 'Ecommerce Oath Type'!");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Banner */}
        <Banner
          title="Ecommerce Oath Type"
          subtitle="Level 2"
          description="When you open the app a pop up would appear every predetermined intervals"
        />

        {/* App Group Card */}
        <AppGroupCard />

        {/* Oath Text */}
        <OathText />

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

export default EcommerceOathType;