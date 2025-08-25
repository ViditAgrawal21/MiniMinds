import React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Banner from "@/components/watchmancompo/Banner";
import AppGroupCard from "@/components/watchmancompo/AppGroupCard";
import SelectGuardianDropdown from "@/components/watchmancompo/SelectGuardianDropdown";
import SelectReportDropdown from "@/components/watchmancompo/SelectReportDropdown";
import ExpertVerdict from "@/components/watchmancompo/ExpertVerdict";
import PrimaryButton from "@/components/common/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";

const SendReportIntervention = () => {
  const handleSendReport = () => {
    console.log("Report sent!");
  };

  const handleStartJourney = () => {
    console.log("Journey started for 'Send Report'!");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Banner */}
        <Banner
          title="Send Report"
          subtitle="Level 1"
          description="When you open the app a pop up would appear every predetermined intervals"
        />

        {/* App Group Card */}
        <AppGroupCard />

        {/* Select Guardian Dropdown */}
        <SelectGuardianDropdown />

        {/* Select Report Dropdown */}
        <SelectReportDropdown />

        {/* Send Report Button */}
        <View style={styles.sendReportContainer}>
          <TouchableOpacity
            onPress={handleSendReport}
            style={styles.sendReportButton}
          >
            <Text style={styles.sendReportButtonText}>Send report</Text>
          </TouchableOpacity>
        </View>

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
  sendReportContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  sendReportButton: {
    backgroundColor: "#D27AD5",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  sendReportButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SendReportIntervention;