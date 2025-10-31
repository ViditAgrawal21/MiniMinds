import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import TabSelector from "../../../components/TabSelector";
import SearchBar from "../../../components/SearchBar";
import ConditionList from "../../../components/ConditionList";
import SectionHeader from "../../../components/SectionHeader";
import { t } from "@/i18n/locales/i18n";
import { canAccessFeature } from "@/utils/premiumUtils";
import { questionDataLoader } from "@/data/questionData";
import { RootStackParamList } from "@/navigation/types";

type Plan = "free" | "basic" | "premium";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type ConditionScansRouteProp = RouteProp<RootStackParamList, 'ConditionScansScreen'>;

export default function ConditionScansScreen() {
  const route = useRoute<ConditionScansRouteProp>();
  const initialTab = (route.params as any)?.initialTab;
  
  const getInitialTab = () => {
    if (initialTab && typeof initialTab === 'string') {
      return t(`conditionScans.${initialTab.replace(/\s+/g, '').replace(/&/g, '').toLowerCase()}`, initialTab);
    }
    return t("conditionScans.all", "All");
  };
  
  const [selectedTab, setSelectedTab] = useState<string>(getInitialTab());
  const [searchText, setSearchText] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [blockedPlan, setBlockedPlan] = useState<Plan | null>(null);
  const navigation = useNavigation<NavigationProp>(); // Initialize navigation
  
  // Update selected tab when route params change
  useEffect(() => {
    if (initialTab && typeof initialTab === 'string') {
      const translatedTab = t(`conditionScans.${initialTab.replace(/\s+/g, '').replace(/&/g, '').toLowerCase()}`, initialTab);
      setSelectedTab(translatedTab);
    }
  }, [initialTab]);

  // Build scan list dynamically from questionDatabase.json so CSV-generated scans appear
  const dynamicScanNames = questionDataLoader.getAllScanNames();

  // Helper: produce a readable title from the raw scan key when translation is missing
  const humanize = (s: string) => {
    if (!s) return "";
    // Replace punctuation with spaces, collapse multiple spaces, trim, then Title Case
    const cleaned = s.replace(/[\/_\-()]/g, " ").replace(/\s+/g, " ").trim();
    return cleaned
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  };

  const allScans = dynamicScanNames.map((scanName, idx) => {
    const intro = questionDataLoader.getIntroData(scanName);
    const displayTitle = intro?.title && intro.title !== scanName ? intro.title : humanize(scanName);
    const category = intro?.category || 'Other';

    return {
      id: idx + 1,
      // Use generated intro title if available, otherwise a humanized version of the raw key
      nameKey: displayTitle,
      name: scanName,
      // categoryKey for translation, category is an English label used for filtering
      categoryKey: t(`conditionScans.${category.replace(/\s+/g, '').toLowerCase()}`, category),
      category,
      // Default to free so newly added scans are visible during testing — switch to a plan strategy if needed
      requiredPlan: "free" as Plan,
    };
  });

  const tabs = [
    t("conditionScans.all", "All"),
    t("conditionScans.behaviourIssues", "Behaviour Issues"),
    t("conditionScans.schoolingAcademics", "Schooling and Academics"),
    t("conditionScans.internetSocialMedia", "Internet & Social Media Issues"),
    t("conditionScans.parentingIssues", "Parenting Issues"),
    t("conditionScans.psychologicalIssues", "Psychological Issues"),
    t("conditionScans.emotionalIssues", "Emotional Issues"),
  ];

  // Map of translated tab to English tab for filtering
  const tabMapping: { [key: string]: string } = {
    [t("conditionScans.all", "All")]: "All",
    [t("conditionScans.behaviourIssues", "Behaviour Issues")]: "Behaviour Issues",
    [t("conditionScans.schoolingAcademics", "Schooling and Academics")]: "Schooling and Academics",
    [t("conditionScans.internetSocialMedia", "Internet & Social Media Issues")]: "Internet & Social Media Issues",
    [t("conditionScans.parentingIssues", "Parenting Issues")]: "Parenting Issues",
    [t("conditionScans.psychologicalIssues", "Psychological Issues")]: "Psychological Issues",
    [t("conditionScans.emotionalIssues", "Emotional Issues")]: "Emotional Issues",
  };

  // Filter scans using English category names
  const filteredScans = allScans.filter(
    (scan) => {
      const englishTab = tabMapping[selectedTab] || selectedTab;
      return (englishTab === "All" || (scan.category && scan.category === englishTab)) &&
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

  const handleBackPress = () => {
    // Navigate to MainApp with Home tab selected
    navigation.navigate("MainApp", { screen: "Home" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {t('conditionScans.headerTitle', 'Check your conditional wellness')}
        </Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.content}>
        <TabSelector
          tabs={tabs}
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
        />
        <SearchBar
          searchText={searchText}
          onChangeText={setSearchText}
          placeholder={t('conditionScans.searchPlaceholder', 'Search conditions...')}
          helperText={t('conditionScans.helperText', 'Click on the scan below to proceed')}
        />
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
    backgroundColor: "#FF8C00",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  upgradeButtonLabel: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  placeholder: {
    width: 40, // Same width as back button to center the title
  },
});
