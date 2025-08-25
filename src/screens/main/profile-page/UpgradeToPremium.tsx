import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import CustomIcon from "@/components/CustomIcon";
import { t } from "@/i18n/locales/i18n"; // Import translation function
import { redeemCode } from "@/utils/premiumUtils";
// import { redeemCode } from "../../utils/premiumUtils";

// Add this interface before the UpgradeToPremium component
interface TabItemProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onPress: () => void;
}

const TabItem: React.FC<TabItemProps> = ({
  label,
  icon,
  isActive,
  onPress,
}) => {
  const positionValue = React.useRef(new Animated.Value(0)).current; // Initial position

  React.useEffect(() => {
    // Trigger animation when the tab becomes active/inactive
    Animated.spring(positionValue, {
      toValue: isActive ? -10 : 0,
      useNativeDriver: true,
    }).start();
  }, [isActive, positionValue]);

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateY: positionValue }],
          zIndex: isActive ? 1 : 0,
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.tabItem, isActive && styles.activeTabItem]}
        onPress={onPress}
      >
        {icon}
        <Text
          style={[styles.tabLabel, isActive && styles.activeTabLabel]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function UpgradeToPremium() {
  const navigation = useNavigation();
  const [activeTab] = React.useState("Profile");
  const [redeemCodeInput, setRedeemCodeInput] = React.useState("");
  const [isRedeeming, setIsRedeeming] = React.useState(false);

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
        Alert.alert(
          t("upgrade.redeemCode.success", "Success!"),
          t("upgrade.redeemCode.successMessage", result.message),
          [
            {
              text: t("upgrade.redeemCode.ok", "OK"),
              onPress: () => {
                setRedeemCodeInput("");
                navigation.goBack();
              },
            },
          ],
        );
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
        <Text style={styles.title}>Upgrade to Premium</Text>
        <View style={styles.tableContainer}>
          {/* Benefits Table */}
          <View style={styles.row}>
            <Text style={[styles.column, styles.benefitColumn]}>Benefits</Text>
            <Text style={[styles.column, styles.smallColumn]}>Basic</Text>
            <Text style={[styles.column, styles.smallColumn]}>Premium</Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[styles.cell, styles.benefitColumn]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Daily activity tracking
            </Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[styles.cell, styles.benefitColumn]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Wellness score tracking
            </Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[styles.cell, styles.benefitColumn]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Insights sharing
            </Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[styles.cell, styles.benefitColumn]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Tailored Interventions
            </Text>
            <Text style={[styles.cell, styles.smallColumn]}>—</Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[styles.cell, styles.benefitColumn]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Tailored content
            </Text>
            <Text style={[styles.cell, styles.smallColumn]}>—</Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[styles.cell, styles.benefitColumn]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Detailed Insights
            </Text>
            <Text style={[styles.cell, styles.smallColumn]}>—</Text>
            <Text style={[styles.cell, styles.smallColumn]}>✔</Text>
          </View>
          {/* Plan pricing row */}
          <View style={styles.row}>
            <Text style={[styles.cell, styles.benefitColumn]}>Basic</Text>
            <Pressable
              style={[styles.priceButton, styles.smallColumn]}
              onPress={() => {
                // TODO: handle purchase of Basic monthly
              }}
            >
              <Text style={styles.priceButtonText}>299</Text>
            </Pressable>
            <Pressable
              style={[styles.priceButton, styles.smallColumn, { marginLeft: 8 }]}
              onPress={() => {
                // TODO: handle purchase of Basic yearly
              }}
            >
              <Text style={styles.priceButtonText}>999</Text>
            </Pressable>
          </View>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.benefitColumn]}>Premium</Text>
            <Pressable
              style={[styles.priceButton, styles.smallColumn]}
              onPress={() => {
                // TODO: handle purchase of Premium monthly
              }}
            >
              <Text style={styles.priceButtonText}>599</Text>
            </Pressable>
            <Pressable
              style={[styles.priceButton, styles.smallColumn, { marginLeft: 8 }]}
              onPress={() => {
                // TODO: handle purchase of Premium yearly
              }}
            >
              <Text style={styles.priceButtonText}>2800</Text>
            </Pressable>
          </View>
        </View>
        {/* Conditions Info */}
        <View style={styles.conditionsContainer}>
          <View style={styles.conditionBox}>
            <Text style={styles.conditionPlan}>Free</Text>
            <Text style={styles.conditionCount}>3 Conditions</Text>
          </View>
          <View style={styles.conditionBox}>
            <Text style={styles.conditionPlan}>Basic</Text>
            <Text style={styles.conditionCount}>7 Conditions</Text>
          </View>
          <View style={styles.conditionBox}>
            <Text style={styles.conditionPlan}>Premium</Text>
            <Text style={styles.conditionCount}>All Conditions</Text>
          </View>
        </View>
        <View style={styles.plan}>
          <Text style={styles.label}>EARLY BIRD OFFER</Text>
          <Text style={styles.sublabel}>
            Buy Premium plans for a nominal price.
          </Text>
        </View>
        {/* Pricing Section */}
        <View style={styles.pricingContainer}>
          {/* Monthly Plan */}
          <View style={styles.planRow}>
            <View>
              <Text style={styles.planTitle}>Monthly Plan</Text>
              <Text style={styles.planPrice}>Rs. 99/-</Text>
            </View>
            <Pressable style={styles.buyButton1}>
              <Text style={styles.buyTextBuy}>Buy</Text>
            </Pressable>
          </View>
          <View style={styles.planRow}>
            <View>
              <Text style={styles.planTitle}>Yearly Plan</Text>
              <Text style={styles.planPrice}>Rs. 800/-</Text>
            </View>

            <Pressable style={styles.buyButton2}>
              <Text style={styles.buyTextBuy}>Buy</Text>
              <Text style={styles.buyTextRecommended}>
                (Recommended)
              </Text>
            </Pressable>
          </View>
          {/* Redeem Section */}
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
              <Pressable
                style={[styles.redeemButton, isRedeeming && { opacity: 0.6 }]}
                onPress={handleRedeemCode}
                disabled={isRedeeming}
              >
                <Text style={styles.redeemButtonText}>
                  {isRedeeming
                    ? t("upgrade.redeemCode.redeeming", "Redeeming...")
                    : t("upgrade.redeemCode.redeem", "Redeem")}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Custom Bottom Tab Navigation */}
      <View style={styles.tabBar}>
        <TabItem
          label={t("navigation.home", "Home")}
          icon={
            <CustomIcon type="IO"
              name="home-outline"
              size={30}
              color={activeTab === "Home" ? "white" : "#888"}
            />
          }
          isActive={activeTab === "Home"}
          onPress={() => {
            // @ts-ignore - Adding params to navigate
            navigation.navigate("Tab", { screen: "Home" });
          }}
        />
        <TabItem
          label={t("navigation.insights", "Insights")}
          icon={
            <CustomIcon type="FA5"
              name="chart-bar"
              size={30}
              color={activeTab === "Insights" ? "white" : "#888"}
            />
          }
          isActive={activeTab === "Insights"}
          onPress={() => {
            // @ts-ignore - Adding params to navigate
            navigation.navigate("Tab", { screen: "Insights" });
          }}
        />
        <TabItem
          label={t("navigation.mindTools", "Mind Tools")}
          icon={
            <CustomIcon type="IO"
              name="grid-outline"
              size={30}
              color={activeTab === "MindTools" ? "white" : "#888"}
            />
          }
          isActive={activeTab === "MindTools"}
          onPress={() => {
            // @ts-ignore - Adding params to navigate
            navigation.navigate("Tab", { screen: "MindTools" });
          }}
        />
        <TabItem
          label={t("navigation.profile", "Profile")}
          icon={
            <CustomIcon type="IO"
              name="person-outline"
              size={30}
              color={activeTab === "Profile" ? "white" : "#888"}
            />
          }
          isActive={activeTab === "Profile"}
          onPress={() => navigation.goBack()}
        />
      </View>
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
    fontFamily: "Poppins-Bold",
    marginLeft: 20,
  },
  title: {
    fontSize: 17,
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
    color: "#D27AD5",
  },
  tableContainer: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomColor: "#ddd",
  },
  column: {
    color: "#333",
    textAlign: "center",
  },
  benefitColumn: {
    width: "50%",
    textAlign: "left",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  smallColumn: {
    width: "25%",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  cell: {
    color: "#333",
  },
  plan: {},
  label: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#00000",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  sublabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#000000",
    textAlign: "center",
  },
  pricingContainer: {
    marginTop: 10,
  },
  planRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  recommendedPlan: {
    backgroundColor: "#D27AD5",
    borderColor: "#D27AD5",
  },
  planTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  planPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginTop: 5,
  },
  buyButton1: {
    backgroundColor: "#D27AD5",
    paddingVertical: 20,
    paddingHorizontal: 53,
    borderRadius: 5,
  },
  buyButton2: {
    backgroundColor: "#D27AD5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buyTextBuy: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  buyTextRecommended: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
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
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    minWidth: 80,
  },
  activeTabLabel: {
    color: "white",
  },
  priceButton: {
    backgroundColor: "#D27AD5",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  priceButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Poppins-Bold",
  },
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
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    marginBottom: 4,
  },
  conditionCount: {
    fontFamily: "Poppins-Regular",
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
    fontFamily: "Poppins-Bold",
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
    fontFamily: "Poppins-Regular",
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
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
});
