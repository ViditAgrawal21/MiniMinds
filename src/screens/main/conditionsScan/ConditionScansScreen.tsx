import React, { useState } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TabSelector from "../../../components/TabSelector";
import SearchBar from "../../../components/SearchBar";
import ConditionList from "../../../components/ConditionList";
import SectionHeader from "../../../components/SectionHeader";
import { t } from "@/i18n/locales/i18n";
import { canAccessFeature } from "@/utils/premiumUtils";
import { RootStackParamList } from "@/navigation/types";

type Plan = "free" | "basic" | "premium";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ConditionScansScreen() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [blockedPlan, setBlockedPlan] = useState<Plan | null>(null);
  const navigation = useNavigation<NavigationProp>(); // Initialize navigation

  const allScans = [
    // FREE
    {
      id: 2,
      nameKey: t("conditionScans.angerManagement"),
      name: "Anger Management",
      categoryKey: t("conditionScans.peerInteraction"),
      category: "Peer to Peer Interaction",
      requiredPlan: "free" as Plan,
    },
    {
      id: 14,
      nameKey: t("conditionScans.stressQuestion", "Stress"),
      name: "Stress",
      categoryKey: t("conditionScans.peerInteraction"),
      category: "Peer to Peer Interaction",
      requiredPlan: "free" as Plan,
    },
    {
      id: 8,
      nameKey: t(
        "conditionScans.internetAndSocialMediaQuestion",
        "Internet and Social Media Issue",
      ),
      name: "Internet and Social Media Issue",
      categoryKey: t("conditionScans.peerInteraction"),
      category: "Peer to Peer Interaction",
      requiredPlan: "free" as Plan,
    },

    // BASIC
    {
      id: 5,
      nameKey: t(
        "conditionScans.familyIssuesQuestion",
        "Family and Relationship",
      ),
      name: "Family and Relationship",
      categoryKey: t("conditionScans.education"),
      category: "Education",
      requiredPlan: "basic" as Plan,
    },
    {
      id: 12,
      nameKey: t("conditionScans.sleepQuestion", "Sleep"),
      name: "Sleep",
      categoryKey: t("conditionScans.peerInteraction"),
      category: "Peer to Peer Interaction",
      requiredPlan: "basic" as Plan,
    },
    {
      id: 15,
      nameKey: t(
        "conditionScans.suicidalBehaviorQuestion",
        "Suicidal Behaviour",
      ),
      name: "Suicidal Behaviour",
      categoryKey: t("conditionScans.peerInteraction"),
      category: "Peer to Peer Interaction",
      requiredPlan: "basic" as Plan,
    },
    {
      id: 11,
      nameKey: t("conditionScans.sexLifeQuestion", "Sex Life"),
      name: "Sex Life",
      categoryKey: t("conditionScans.peerInteraction"),
      category: "Peer to Peer Interaction",
      requiredPlan: "basic" as Plan,
    },

    // PREMIUM (all remaining)
    {
      id: 1,
      nameKey: t("conditionScans.addictions"),
      name: "Addictions",
      categoryKey: t("conditionScans.addictions", "Education"),
      category: "Education",
      requiredPlan: "premium" as Plan,
    },
    {
      id: 3,
      nameKey: t("conditionScans.commonPsychologicalIssuesQuestion"),
      name: "Common Psychological Issues",
      categoryKey: t("conditionScans.all"),
      category: "All",
      requiredPlan: "premium" as Plan,
    },
    {
      id: 4,
      nameKey: t(
        "conditionScans.environmentIssuesAffectingMentalWellbeingQuestion",
        "Environment Issues Affecting Mental Wellbeing",
      ),
      name: "Environment Issues Affecting Mental Wellbeing",
      categoryKey: t("conditionScans.all"),
      category: "All",
      requiredPlan: "premium" as Plan,
    },
    {
      id: 6,
      nameKey: t(
        "conditionScans.financialMentalHealthQuestion",
        "Financial Mental Health",
      ),
      name: "Financial Mental Health",
      categoryKey: t("conditionScans.peerInteraction"),
      category: "Peer to Peer Interaction",
      requiredPlan: "premium" as Plan,
    },
    {
      id: 7,
      nameKey: t(
        "conditionScans.generalPhysicalFitnessQuestion",
        "General Physical Fitness",
      ),
      name: "General Physical Fitness",
      categoryKey: t("conditionScans.education"),
      category: "Education",
      requiredPlan: "premium" as Plan,
    },
    {
      id: 9,
      nameKey: t(
        "conditionScans.internetDependenceQuestion",
        "Internet Dependence",
      ),
      name: "Internet Dependence",
      categoryKey: t("conditionScans.peerInteraction"),
      category: "Peer to Peer Interaction",
      requiredPlan: "premium" as Plan,
    },
    {
      id: 10,
      nameKey: t(
        "conditionScans.professionalMentalHealthQuestion",
        "Professional Mental Health",
      ),
      name: "Professional Mental Health",
      categoryKey: t("conditionScans.peerInteraction"),
      category: "Peer to Peer Interaction",
      requiredPlan: "premium" as Plan,
    },
    {
      id: 13,
      nameKey: t(
        "conditionScans.socialMentalHealthQuestion",
        "Social Mental Health",
      ),
      name: "Social Mental Health",
      categoryKey: t("conditionScans.peerInteraction"),
      category: "Peer to Peer Interaction",
      requiredPlan: "premium" as Plan,
    },
    {
      id: 16,
      nameKey: t("conditionScans.youngsterIssuesQuestion", "Youngster Issues"),
      name: "Youngster Issues",
      categoryKey: t("conditionScans.peerInteraction"),
      category: "Peer to Peer Interaction",
      requiredPlan: "premium" as Plan,
    },
    {
      id: 17,
      nameKey: t("conditionScans.jobInsecurityQuestion", "Job Insecurity"),
      name: "Job Insecurity",
      categoryKey: t("conditionScans.peerInteraction"),
      category: "Peer to Peer Interaction",
      requiredPlan: "premium" as Plan,
    },
  ];

  const tabs = [
    t("conditionScans.all", "All"),
    t("conditionScans.education", "Education"),
    t("conditionScans.peerInteraction", "Peer to Peer Interaction"),
    t("conditionScans.familyBonding", "Family Bonding"),
  ];

  // Map of translated tab to English tab for filtering
  const tabMapping: { [key: string]: string } = {
    [t("conditionScans.all", "All")]: "All",
    [t("conditionScans.education", "Education")]: "Education", 
    [t("conditionScans.peerInteraction", "Peer to Peer Interaction")]: "Peer to Peer Interaction",
    [t("conditionScans.familyBonding", "Family Bonding")]: "Family Bonding",
  };

  // Filter scans using English category names
  const filteredScans = allScans.filter(
    (scan) => {
      const englishTab = tabMapping[selectedTab] || selectedTab;
      return (englishTab === "All" || scan.category === englishTab) &&
        scan.name.toLowerCase().includes(searchText.toLowerCase());
    }
  );

  const handleItemPress = async ({
    name,
    nameKey,
  }: {
    name: string;
    nameKey: string;
  }) => {
    const scan = allScans.find((s) => s.name === name && s.nameKey === nameKey);
    if (!scan) return;
    
    const canAccess = await canAccessFeature(scan.requiredPlan);
    
    if (canAccess) {
      navigation.navigate("ScanIntro", { scanName: scan.name });
    } else {
      setBlockedPlan(scan.requiredPlan);
      setDialogVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <SectionHeader title="Check your conditional wellness" />
        <TabSelector
          tabs={tabs}
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
        />
        <SearchBar searchText={searchText} onChangeText={setSearchText} />
        <ConditionList data={filteredScans} onPressItem={handleItemPress} />
      </View>

      {/* Upgrade dialog */}
      <Modal
        visible={dialogVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDialogVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>
              {t(`conditionScans.upgradeDialog.${blockedPlan}.title`)}
            </Text>
            <Text style={styles.dialogText}>
              {t(`conditionScans.upgradeDialog.${blockedPlan}.message`)}
            </Text>
            <View style={styles.dialogActions}>
              <TouchableOpacity onPress={() => setDialogVisible(false)}>
                <Text style={styles.cancelButton}>
                  {t("conditionScans.upgradeDialog.cancelButton")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                    setDialogVisible(false);
                    navigation.navigate("UpgradeToPremium");
                  }}
                style={styles.upgradeButton}
              >
                <Text style={styles.upgradeButtonLabel}>
                  {t("conditionScans.upgradeDialog.upgradeButton")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    // padding: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    margin: 20,
    maxWidth: 350,
    width: "90%",
  },
  dialogTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },
  dialogText: {
    textAlign: "center",
    marginBottom: 8,
  },
  dialogActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginTop: 20,
  },
  cancelButton: {
    color: "#666",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  upgradeButton: {
    backgroundColor: "#AB47BC",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  upgradeButtonLabel: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});
