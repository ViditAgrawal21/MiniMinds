import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import CustomIcon from "../../../components/CustomIcon";
import { t } from "../../../i18n/locales/i18n";
import {
  redeemCode,
  getPremiumStatus,
  type PremiumStatus,
} from "../../../utils/premiumUtils";

// Add this interface before the UpgradeToPremium component
interface TabItemProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onPress: () => void;
}



export default function UpgradeToPremium() {
  const navigation = useNavigation();
  const [activeTab] = React.useState("Profile");
  const [redeemCodeInput, setRedeemCodeInput] = React.useState("");
  const [isRedeeming, setIsRedeeming] = React.useState(false);
  const [premiumStatus, setPremiumStatusState] = React.useState<PremiumStatus | null>(null);

  const loadStatus = React.useCallback(async () => {
    try {
      const status = await getPremiumStatus();
      console.log("status",status)
      setPremiumStatusState(status);
    } catch (e) {
      console.warn("Failed to load premium status", e);
    }
  }, []);

  React.useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  const handleRedeemCode = async () => {
    if (!redeemCodeInput.trim()) {
      Alert.alert(
        t("upgrade.redeemCode.error", "Error"),
        t("upgrade.redeemCode.enterCode", "Please enter a redeem code"),
      );
      return;
    }
    setIsRedeeming(true);
    try {
      const result = await redeemCode(redeemCodeInput.trim());
      if (result.success) {
        await loadStatus();
        Alert.alert(
          t("upgrade.redeemCode.success", "Success!"),
          t("upgrade.redeemCode.successMessage", result.message),
        );
        setRedeemCodeInput("");
      } else {
        Alert.alert(
          t("upgrade.redeemCode.error", "Error"),
          t("upgrade.redeemCode.errorMessage", result.message),
        );
      }
    } catch {
      Alert.alert(
        t("upgrade.redeemCode.error", "Error"),
        t(
          "upgrade.redeemCode.unexpectedError",
          "An unexpected error occurred. Please try again.",
        ),
      );
    } finally {
      setIsRedeeming(false);
    }
  };

  const renderStatusCard = () => {
    if (!premiumStatus) return null;
    if (!premiumStatus.isPremium) {
      return (
        <View style={styles.statusCardPending}>
          <Text style={styles.statusTitle}>
            {t("upgrade.status.free", "Free Plan")}
          </Text>
          <Text style={styles.statusSubtitle}>
            {t(
              "upgrade.status.freeSubtitle",
              "Unlock Premium or Ultra features using your redeem code.",
            )}
          </Text>
        </View>
      );
    }
    
    // Since our PremiumStatus type is simpler now, we'll use a default plan name
    const plan =  premiumStatus?.planType ||  "premium";
    
    // For backward compatibility, we'll define an empty array for features
    const feats: string[] = [];
    
    return (
      <View style={styles.statusCardActive}>
        <Text style={styles.statusTitle}>
          {t("upgrade.status.active", "Subscription Active")}
        </Text>
        <Text style={styles.statusPlan}>
          {plan.toString().replace(/_/g, " ")}
        </Text>
        {premiumStatus.redeemedAt && (
          <Text style={styles.statusSubtitle}>
            {t("upgrade.status.validUntil", "Valid since")}: {new Date(
              premiumStatus.redeemedAt
            ).toDateString()}
          </Text>
        )}
        <View style={styles.featureChipRow}>
          {feats.map((f: string) => (
            <View key={f} style={styles.featureChip}>
              <Text style={styles.featureChipText}>{f}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Arrow */}
      <ScrollView
        style={styles.areaContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CustomIcon type="MI" name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>
          {t("upgrade.screen.title", "MiniMinds")}
        </Text>
  <View style={styles.tableContainer}>
          {/* Benefits Table */}
          <View style={[styles.row, styles.headerRow]}>
            <Text
              style={[styles.column, styles.benefitColumn, styles.headerText]}
            >
              {t("upgrade.screen.benefits.header", "Benefits")}
            </Text>
            <Text style={[styles.column, styles.smallColumn, styles.headerText]}>
              {t("upgrade.screen.plans.free", "Free")}
            </Text>
            <Text style={[styles.column, styles.smallColumn, styles.headerText]}>
              {t("upgrade.screen.plans.premium", "Premium")}
            </Text>
            <Text style={[styles.column, styles.smallColumn, styles.headerText]}>
              {t("upgrade.screen.plans.ultra", "Ultra")}
            </Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[styles.cell, styles.benefitColumn]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {t(
                "upgrade.screen.benefits.freeAccess",
                "Self-monitor stress, productivity, & 10 other vital parameters",
              )}
            </Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[styles.cell, styles.benefitColumn]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {t(
                "upgrade.screen.benefits.allInFreeAccess",
                "All-in free access",
              )}
            </Text>
            <Text style={[styles.cell, styles.smallColumn]}>—</Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[styles.cell, styles.benefitColumn]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {t("upgrade.screen.benefits.scans", "Scans")}
            </Text>
            <Text style={[styles.cell, styles.smallColumn]}>3</Text>
            <Text style={[styles.cell, styles.smallColumn]}>10+</Text>
            <Text style={[styles.cell, styles.smallColumn]}>100+</Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[styles.cell, styles.benefitColumn]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {t(
                "upgrade.screen.benefits.primarySecondaryInterventions",
                "Primary & Secondary Interventions",
              )}
            </Text>
            <Text style={[styles.cell, styles.smallColumn]}>—</Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[styles.cell, styles.benefitColumn]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {t(
                "upgrade.screen.benefits.videoTertiaryContent",
                "Video Tertiary Content",
              )}
            </Text>
            <Text style={[styles.cell, styles.smallColumn]}>—</Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[styles.cell, styles.benefitColumn]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {t(
                "upgrade.screen.benefits.professionalSessions",
                "1-on-1 session with professionals (₹500-800/session)",
              )}
            </Text>
            <Text style={[styles.cell, styles.smallColumn]}>—</Text>
            <Text style={[styles.cell, styles.smallColumn]}>—</Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
          </View>
          {/* Pricing rows removed in simplified redeem-only flow */}
        </View>
        {/* Conditions Info (optional marketing) */}
        <View style={styles.conditionsContainer}>
          <View style={styles.conditionBox}>
            <Text style={styles.conditionPlan}>
              {t("upgrade.screen.plans.free", "Free")}
            </Text>
            <Text style={styles.conditionCount}>
              {t("upgrade.screen.plans.freeScans", "3 Scans")}
            </Text>
          </View>
          <View style={styles.conditionBox}>
            <Text style={styles.conditionPlan}>
              {t("upgrade.screen.plans.premium", "Premium")}
            </Text>
            <Text style={styles.conditionCount}>
              {t("upgrade.screen.plans.premiumScans", "10+ Scans")}
            </Text>
          </View>
          <View style={styles.conditionBox}>
            <Text style={styles.conditionPlan}>
              {t("upgrade.screen.plans.ultra", "Ultra")}
            </Text>
            <Text style={styles.conditionCount}>
              {t("upgrade.screen.plans.ultraScans", "100+ Scans")}
            </Text>
          </View>
        </View>
        {renderStatusCard()}
        {!premiumStatus?.isPremium && (
          <View style={styles.redeemContainer}>
            <Text style={styles.redeemTitle}>
              {t("upgrade.redeemCode.title", "Redeem a Code")}
            </Text>
            <View style={styles.redeemInputContainer}>
              <TextInput
                style={styles.redeemInput}
                placeholder={t(
                  "upgrade.redeemCode.placeholder",
                  "Enter your code",
                )}
                value={redeemCodeInput}
                onChangeText={setRedeemCodeInput}
                editable={!isRedeeming}
              />
              <TouchableOpacity
                style={[styles.redeemButton, isRedeeming && { opacity: 0.6 }]}
                onPress={handleRedeemCode}
                disabled={isRedeeming}
              >
                <Text style={styles.redeemButtonText}>
                  {isRedeeming
                    ? t("upgrade.redeemCode.redeeming", "Redeeming...")
                    : t("upgrade.redeemCode.redeem", "Redeem")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

   

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 80, // Add padding to account for the tab bar
  },
  areaContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 100, // Extra padding at bottom to ensure content isn't hidden by tab bar
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    marginLeft: 20,
  },
  title: {
    fontSize: 17,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
    color: "#D27AD5",
  },
  tableContainer: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerRow: {
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 2,
    borderBottomColor: "#e0e0e0",
  },
  column: {
    color: "#333",
    textAlign: "center",
  },
  benefitColumn: {
    width: "40%",
    textAlign: "left",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  smallColumn: {
    width: "20%",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  cell: {
    color: "#333",
  },
  headerText: {
    fontFamily: "Poppins_600SemiBold",
    fontWeight: "600",
    color: "#555",
  },
  plan: {},
  label: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#00000",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  sublabel: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#000000",
    textAlign: "center",
  },
  /* Removed pricing & purchase related styles */
  // Tab Bar Section styles
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#F3E5F5",
    height: 80,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    overflow: "visible",
    paddingBottom: 5,
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: "#F3E5F5",
    width: Dimensions.get("window").width / 4,
    minWidth: 80,
  },
  activeTabItem: {
    backgroundColor: "#D27AD5",
    shadowColor: "#A63BAA",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    position: "relative",
  },
  tabLabel: {
    fontSize: 10,
    color: "#888",
    marginTop: 4,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    minWidth: 80,
  },
  activeTabLabel: {
    color: "white",
  },
  /* Price button styles removed */
  conditionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  conditionBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    marginHorizontal: 4,
  },
  conditionPlan: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    marginBottom: 4,
  },
  conditionCount: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#555",
  },
  redeemContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  redeemTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 10,
    textAlign: "center",
  },
  redeemInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  redeemInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginRight: 10,
  },
  redeemButton: {
    backgroundColor: "#D27AD5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  redeemButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  /* Plan selection styles removed */
  statusCardPending: {
    backgroundColor: "#fffaf0",
    borderWidth: 1,
    borderColor: "#ffe0b2",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  statusCardActive: {
    backgroundColor: "#f0fff4",
    borderWidth: 1,
    borderColor: "#9ae6b4",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  statusTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    marginBottom: 4,
  },
  statusPlan: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: "#2f855a",
    marginBottom: 4,
    textTransform: "capitalize",
  },
  statusSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#555",
  },
  featureChipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 6,
  },
  featureChip: {
    backgroundColor: "#e6fffa",
    borderColor: "#81e6d9",
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  featureChipText: {
    fontSize: 10,
    fontFamily: "Poppins_500Medium",
    color: "#234e52",
  },
});
