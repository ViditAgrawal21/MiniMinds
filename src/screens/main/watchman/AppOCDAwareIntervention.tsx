import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function
import Banner from "@/components/watchmancompo/Banner";
import AppGroupCard from "@/components/watchmancompo/AppGroupCard";
import IntervenesSelector from "@/components/watchmancompo/IntervenesSelector";
import DifficultyLevel from "@/components/watchmancompo/DifficultyLevel";
import DurationSelector from "@/components/watchmancompo/DurationSelector";
import ExpertVerdict from "@/components/watchmancompo/ExpertVerdict";
import PrimaryButton from "@/components/common/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";

const AppOCDAwareIntervention = () => {
  const handleStartJourney = () => {
    console.log("Journey started for 'App OCD Aware'!");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Banner */}
        <Banner
          title={t("appOCDAwareIntervention.title")}
          subtitle={t("appOCDAwareIntervention.subtitle")}
          description={t("appOCDAwareIntervention.description")}
        />

        {/* App Group Card */}
        <AppGroupCard />

        {/* Intervenes Selector */}
        <IntervenesSelector />

        {/* Difficulty Level */}
        <DifficultyLevel />

        {/* Set Duration */}
        <DurationSelector />

        {/* Expert Verdict */}
        <ExpertVerdict />

        {/* Save Button */}
        <PrimaryButton
          label={t("appOCDAwareIntervention.saveButton")}
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

export default AppOCDAwareIntervention;
