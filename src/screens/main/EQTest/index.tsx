import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomIcon from "@/components/CustomIcon";
import { getCurrentLanguage } from "@/utils/i18nHelpers";
import { t } from "@/i18n/locales/i18n";
import { useLanguage } from "@/context/LanguageContext";
import {
  getTestCompletionStatus,
  getComprehensiveReportData,
  TestCompletionStatus,
  ComprehensiveReportData,
} from "@/utils/eqTestUtils";
import ComprehensiveReport from "@/components/EQTest/ComprehensiveReport";
import { hasUltraTier } from "@/utils/premiumUtils";

export default function EQTestScreen() {
  const navigation = useNavigation();
  const { locale } = useLanguage(); // Get locale to trigger re-renders when it changes
  
  // Create a translation function that forces re-evaluation when locale changes
  const tWithLocale = React.useCallback(
    (key: string, options?: any) => {
      // Force immediate re-evaluation by accessing getCurrentLanguage()
      const currentLocale = getCurrentLanguage();
      return t(key, options);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale], // This ensures the function recreates when locale changes
  );
  
  const [testStatuses, setTestStatuses] = React.useState<{
    [key: number]: TestCompletionStatus;
  }>({});
  const [comprehensiveData, setComprehensiveData] =
    React.useState<ComprehensiveReportData | null>(null);
  const [showComprehensiveReport, setShowComprehensiveReport] =
    React.useState(false);
  const [showIncompleteModal, setShowIncompleteModal] = React.useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = React.useState(false);

  // Load test statuses when screen comes into focus
  const loadTestStatuses = React.useCallback(async () => {
    const statuses: { [key: number]: TestCompletionStatus } = {};
    for (let i = 1; i <= 5; i++) {
      statuses[i] = await getTestCompletionStatus(i);
    }
    setTestStatuses(statuses);
  }, []);

  // Load comprehensive report data
  const loadComprehensiveData = React.useCallback(async () => {
    const data = await getComprehensiveReportData();
    setComprehensiveData(data);
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadTestStatuses();
      loadComprehensiveData();
    });

    return unsubscribe;
  }, [navigation, loadTestStatuses, loadComprehensiveData]);

  // Recreate tests when language changes
  const eqTests = React.useMemo(() => {
    return [
      {
        id: 1,
        key: "empathy",
        title: t("eqTest.tests.empathy.title"),
        fullName: t("eqTest.tests.empathy.fullName"),
        description: t("eqTest.tests.empathy.description"),
        color: "#B0C4DD",
      },
      {
        id: 2,
        key: "motivation",
        title: t("eqTest.tests.motivation.title"),
        fullName: t("eqTest.tests.motivation.fullName"),
        description: t("eqTest.tests.motivation.description"),
        color: "#F1AB6B",
      },
      {
        id: 3,
        key: "selfAwareness",
        title: t("eqTest.tests.selfAwareness.title"),
        fullName: t("eqTest.tests.selfAwareness.fullName"),
        description: t("eqTest.tests.selfAwareness.description"),
        color: "#F0818B",
      },
      {
        id: 4,
        key: "selfRegulation",
        title: t("eqTest.tests.selfRegulation.title"),
        fullName: t("eqTest.tests.selfRegulation.fullName"),
        description: t("eqTest.tests.selfRegulation.description"),
        color: "#D27AD5",
      },
      {
        id: 5,
        key: "socialSkills",
        title: t("eqTest.tests.socialSkills.title"),
        fullName: t("eqTest.tests.socialSkills.fullName"),
        description: t("eqTest.tests.socialSkills.description"),
        color: "#78C2AD",
      },
    ];
  }, [t]);

  const handleComprehensiveReport = React.useCallback(() => {
    if (comprehensiveData?.allCompleted) {
      setShowComprehensiveReport(true);
    } else {
      setShowIncompleteModal(true);
    }
  }, [comprehensiveData?.allCompleted]);

  const renderFooter = React.useCallback(
    () => (
      <TouchableOpacity
        style={styles.comprehensiveButton}
        onPress={handleComprehensiveReport}
      >
        <View style={styles.comprehensiveButtonContent}>
          <TouchableOpacity style={styles.comprehensiveIcon}>
            <CustomIcon 
              type="MCI"
              name="file-document-outline" 
              size={24} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
          <View style={styles.comprehensiveTextContainer}>
            <Text style={styles.comprehensiveButtonTitle}>
              {t("eqTest.comprehensiveReport.buttonTitle")}
            </Text>
            <Text style={styles.comprehensiveButtonSubtitle}>
              {t("eqTest.comprehensiveReport.buttonSubtitle")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [t, handleComprehensiveReport],
  );

  const handleTestSelect = async (test: any) => {
    try {
      // Check if user has Ultra subscription
      const hasUltra = await hasUltraTier();
      
      if (hasUltra) {
        // User has Ultra subscription, proceed to test
        // @ts-ignore
        navigation.navigate("EQTestQuestions", {
          testId: test.id,
          testTitle: test.title,
        });
      } else {
        // User doesn't have Ultra subscription, show modal
        setShowSubscriptionModal(true);
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
      // On error, show subscription modal as fallback
      setShowSubscriptionModal(true);
    }
  };

  const getStatusIconName = (testId: number): string => {
    const status = testStatuses[testId];
    if (!status?.isCompleted) return "information-outline";
    if (status.isExpired) return "information-outline";
    return "check-circle";
  };

  const getStatusIconColor = (testId: number): string => {
    const status = testStatuses[testId];
    if (!status?.isCompleted) return "#9E9E9E";
    if (status.isExpired) return "#9E9E9E";
    return "#4CAF50";
  };

  const renderTestItem = ({ item }: { item: any }) => (
    <View style={styles.testItemContainer}>
      <TouchableOpacity
        style={[styles.testCard, { borderColor: item.color }]}
        onPress={() => handleTestSelect(item)}
      >
        <View style={styles.testCardContent}>
          <View style={styles.testInfo}>
            <Text style={styles.testTitle}>{item.title}</Text>
            <Text style={styles.testDescription}>{item.description}</Text>
          </View>
          <TouchableOpacity
            style={styles.statusIcon}
            onPress={() => {
              const status = testStatuses[item.id];
              if (status?.isCompleted && !status.isExpired) {
                Alert.alert(
                  t("eqTest.statusModal.completed.title"),
                  t("eqTest.statusModal.completed.message", {
                    date: status.lastCompletedDate,
                    score: status.latestScore,
                  }),
                );
              } else if (status?.isExpired) {
                Alert.alert(
                  t("eqTest.statusModal.expired.title"),
                  t("eqTest.statusModal.expired.message"),
                );
              } else {
                Alert.alert(
                  t("eqTest.statusModal.notCompleted.title"),
                  t("eqTest.statusModal.notCompleted.message"),
                );
              }
            }}
          >
            <CustomIcon
              type="MCI"
              name={getStatusIconName(item.id)}
              color={getStatusIconColor(item.id)}
              size={24}
              style={styles.infoIcon}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <CustomIcon
              type="MCI"
              name="arrow-left"
              size={24}
              color="#000000"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("eqTest.title")}</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{t("eqTest.subtitle")}</Text>
        </View>

        <FlatList
          key={locale} // Force re-render when locale changes
          data={eqTests}
          renderItem={renderTestItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          ListFooterComponent={renderFooter}
        />

        {/* Incomplete Tests Modal */}
        <Modal
          visible={showIncompleteModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowIncompleteModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {t("eqTest.incompleteModal.title")}
              </Text>
              <Text style={styles.modalMessage}>
                {t("eqTest.incompleteModal.message")}
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowIncompleteModal(false)}
              >
                <Text style={styles.modalButtonText}>
                  {t("eqTest.incompleteModal.okButton")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Comprehensive Report Modal */}
        <Modal
          visible={showComprehensiveReport}
          animationType="slide"
          onRequestClose={() => setShowComprehensiveReport(false)}
        >
          {comprehensiveData && (
            <ComprehensiveReport
              data={comprehensiveData}
              onClose={() => setShowComprehensiveReport(false)}
            />
          )}
        </Modal>

        {/* Subscription Required Modal */}
        <Modal
          visible={showSubscriptionModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowSubscriptionModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {t("eqTest.subscriptionModal.title", "Ultra Subscription Required")}
              </Text>
              <Text style={styles.modalMessage}>
                {t("eqTest.subscriptionModal.message", "EQ Test feature requires an Ultra subscription to access. Please upgrade to continue.")}
              </Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonSecondary]}
                  onPress={() => setShowSubscriptionModal(false)}
                >
                  <Text style={[styles.modalButtonText, styles.modalButtonTextSecondary]}>
                    {t("eqTest.subscriptionModal.cancelButton", "Cancel")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setShowSubscriptionModal(false);
                    // @ts-ignore
                    navigation.navigate("UpgradeToPremium");
                  }}
                >
                  <Text style={styles.modalButtonText}>
                    {t("eqTest.subscriptionModal.upgradeButton", "Upgrade Now")}
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
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  backButton: {
    margin: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#4A4A4A",
    textAlign: "center",
  },
  subtitleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F9F9F9",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
  },
  listContainer: {
    padding: 16,
  },
  testItemContainer: {
    marginBottom: 16,
  },
  testCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  testCardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  testInfo: {
    flex: 1,
    marginRight: 10,
  },
  testTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#4A4A4A",
    marginBottom: 8,
  },
  testDescription: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#666666",
    lineHeight: 20,
  },
  statusIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  infoIcon: {
    margin: 0,
  },
  comprehensiveButton: {
    backgroundColor: "#2196F3",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  comprehensiveButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  comprehensiveIcon: {
    margin: 0,
    marginRight: 12,
  },
  comprehensiveTextContainer: {
    flex: 1,
  },
  comprehensiveButtonTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  comprehensiveButtonSubtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
    opacity: 0.9,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#2D3E50",
    marginBottom: 12,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#666666",
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flex: 1,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  modalButtonSecondary: {
    backgroundColor: "#E0E0E0",
    flex: 1,
  },
  modalButtonTextSecondary: {
    color: "#666666",
  },
});
