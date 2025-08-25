import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function
import Banner from "@/components/watchmancompo/Banner";
import AppGroupCard from "@/components/watchmancompo/AppGroupCard";
import BlockAppForSelector from "@/components/watchmancompo/BlockAppForSelector";
import DifficultyLevel from "@/components/watchmancompo/DifficultyLevel";
import DurationSelector from "@/components/watchmancompo/DurationSelector";
import ExpertVerdict from "@/components/watchmancompo/ExpertVerdict";
import PrimaryButton from "@/components/common/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";

const BeginnersLuckIntervention = () => {
  const handleStartJourney = () => {
    console.log("Journey started for 'Beginners Luck'!");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Banner */}
        <Banner
          title={t("beginnersLuckIntervention.title")}
          subtitle={t("beginnersLuckIntervention.subtitle")}
          description={t("beginnersLuckIntervention.description")}
        />

        {/* App Group Card */}
        <AppGroupCard />

        {/* Block App for Selector */}
        <BlockAppForSelector />

        {/* Difficulty Level */}
        <DifficultyLevel />

        {/* Set Duration */}
        <DurationSelector />

        {/* Expert Verdict */}
        <ExpertVerdict />

        {/* Save Button */}
        <PrimaryButton
          label={t("beginnersLuckIntervention.saveButton")}
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

export default BeginnersLuckIntervention;
