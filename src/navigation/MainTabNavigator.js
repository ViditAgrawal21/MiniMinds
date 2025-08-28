import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import CustomIcon from "../components/CustomIcon";
import { useAppFonts } from "../theme/fonts"; // Assuming you have a fonts utility
// import { t } from "../i18n/i18n"; // Import translation function

// Import screens
// import Home from "../screens/homeTab";
// import InsightsScreen from "../screens/Insights";
// import MindToolsScreen from "../screens/MindTools/MindToolsScreen";
// import ProfilePage from "../screens/profile-page";
// import ConditionsManagementScreen from "../screens/ConditionsManagement";
// import ConditionDetailScreen from "../screens/ConditionDetailScreen";
import HomeScreen from "@/screens/home/home";
import InsightsScreen from "@/screens/main/Insights";
import ProfilePage from "@/screens/main/profile-page";
import { t } from "@/i18n/locales";

/**
 * @typedef {Object} TabItemProps
 * @property {string} label - The tab label text
 * @property {React.ReactNode} icon - The icon component to display
 * @property {boolean} isActive - Whether the tab is currently active
 * @property {function} onPress - Function to call when tab is pressed
 */

const screenWidth = Dimensions.get("window").width; // Get screen width
const tabItemWidth = screenWidth / 4; // Adjust for 4 items

function MainTabNavigator({
  route,
  navigation,
}) {
  const initialTab = route?.params?.screen;
  const [activeTab, setActiveTab] = useState(initialTab || "Home");
  const [currentScreen, setCurrentScreen] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);

  React.useEffect(() => {
    if (route?.params?.screen) {
      setActiveTab(route.params.screen);
    }
  }, [route?.params?.screen]);

  // In React Native CLI, we don't need to dynamically load fonts
  // as they're linked during the build process

  // Render the screen based on the active tab and current screen
  const renderScreen = () => {
    if (currentScreen === "ConditionsManagement") {
      return (
        <ConditionsManagementScreen
          onBack={() => setCurrentScreen(null)}
          navigation={{
            navigate: (screen, condition) => {
              if (screen === "ConditionDetail" && condition) {
                setSelectedCondition(condition);
                setCurrentScreen("ConditionDetail");
              } else {
                setCurrentScreen(screen);
              }
            },
          }}
        />
      );
    }

    if (currentScreen === "ConditionDetail" && selectedCondition) {
      return (
        <ConditionDetailScreen
          condition={selectedCondition}
          onBack={() => {
            setCurrentScreen("ConditionsManagement");
            setSelectedCondition(null);
          }}
        />
      );
    }

    switch (activeTab) {
      case "Home":
        return <HomeScreen />;
      case "Insights":
        return (
          <InsightsScreen
            navigation={{
              ...navigation,
              navigate: (screen) => {
                if (screen === "ConditionsManagement") {
                  setCurrentScreen(screen);
                } else {
                  navigation.navigate(screen);
                }
              },
            }}
          />
        );
      case "MindTools":
        return <ProfilePage />;
      case "Profile":
        return <ProfilePage />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Render the selected screen */}
      <View
        style={[
          styles.screen,
          (currentScreen === "ConditionsManagement" ||
            currentScreen === "ConditionDetail") &&
            styles.fullScreen,
        ]}
      >
        {renderScreen()}
      </View>

      {/* Custom Bottom Tab Navigation - Hidden when on ConditionsManagement or ConditionDetail */}
      {currentScreen !== "ConditionsManagement" &&
        currentScreen !== "ConditionDetail" && (
          <View style={styles.tabBar}>
            <TabItem
              label={t("navigation.home", "Home")}
              icon={
                <CustomIcon
                  type="IO"
                  name="home-outline"
                  size={30}
                  color={activeTab === "Home" ? "white" : "#888"}
                />
              }
              isActive={activeTab === "Home"}
              onPress={() => setActiveTab("Home")}
            />
            <TabItem
              label={t("navigation.insights", "Insights")}
              icon={
                <CustomIcon
                  type="FA5"
                  name="chart-bar"
                  size={30}
                  color={activeTab === "Insights" ? "white" : "#888"}
                />
              }
              isActive={activeTab === "Insights"}
              onPress={() => setActiveTab("Insights")}
            />
            <TabItem
              label={t("navigation.mindTools", "Mind Tools")}
              icon={
                <CustomIcon
                  type="IO"
                  name="grid-outline"
                  size={30}
                  color={activeTab === "MindTools" ? "white" : "#888"}
                />
              }
              isActive={activeTab === "MindTools"}
              onPress={() => setActiveTab("MindTools")}
            />
            <TabItem
              label={t("navigation.profile", "Profile")}
              icon={
                <CustomIcon
                  type="IO"
                  name="person-outline"
                  size={30}
                  color={activeTab === "Profile" ? "white" : "#888"}
                />
              }
              isActive={activeTab === "Profile"}
              onPress={() => setActiveTab("Profile")}
            />
          </View>
        )}
    </View>
  );
}

const TabItem = ({
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  screen: {
    flex: 1,
    marginBottom: 80,
  },
  fullScreen: {
    marginBottom: 0,
  },

  // Tab Bar Section
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
    width: tabItemWidth,
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
    fontFamily: "Poppins-Regular", // Changed to use React Native CLI font naming convention
    textAlign: "center",
    minWidth: 80,
  },
  activeTabLabel: {
    color: "white",
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainTabNavigator;
