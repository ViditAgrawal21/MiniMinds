// components/Interventions/Interventions.tsx
import React, { useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { t } from "@/i18n/locales/i18n"; // Import translation function

const watchmanImage = require("../../assets/images/watchman.png");

// Define navigation type for better TypeScript support
type RootStackParamList = {
  WatchmanIntervention: undefined;
  // Add other screens as needed
  [key: string]: undefined | object; // Allow dynamic screen names
};

export default function Interventions() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const interventions = [
    {
      id: "watchman",
      title: t("interventions.watchman"),
      image: watchmanImage,
      route: "WatchmanIntervention", // internal screen
    },
    {
      id: "break",
      title: t("interventions.giveMeABreak"),
      image: watchmanImage,
      url: "https://youtu.be/dQw4w9WgXcQ", // example YouTube
    },
    {
      id: "meditation",
      title: t("interventions.timeForMeditation"),
      image: watchmanImage,
      url: "https://youtu.be/dQw4w9WgXcQ",
    },
    {
      id: "relax",
      title: t("interventions.relaxationExercise"),
      image: watchmanImage,
      url: "https://youtu.be/dQw4w9WgXcQ",
    },
  ];

  const handlePress = useCallback((item: (typeof interventions)[0]) => {
    if (item.route) {
      try {
        // Use navigate with proper typing
        (navigation as any).navigate(item.route);
      } catch (error) {
        Alert.alert("Navigation Error", "Unable to navigate to this screen");
      }
    } else if (item.url) {
      Linking.openURL(item.url).catch((error) => {
        console.error('Failed to open URL:', error);
        Alert.alert("Unable to open link", "Please check your internet connection and try again");
      });
    }
  }, [navigation]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>{t("interventions.title")}</Text>

      <View style={styles.panel}>
        <View style={styles.grid}>
          {interventions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.block}
              activeOpacity={0.7}
              onPress={() => handlePress(item)}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={item.title}
            >
              <Image source={item.image} style={styles.icon} />
              <Text style={styles.label}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* outer spacing */
  wrapper: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    color: "#4A4A4A",
    marginBottom: 12,
  },

  /* rounded container that holds the grid */
  panel: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    padding: 16,
  },

  /* 2 × 2 grid */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  /* each block */
  block: {
    width: "48%", // two per row
    aspectRatio: 1, // perfect square
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  icon: {
    width: 110,
    height: 70,
    resizeMode: "contain",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#4A4A4A",
    textAlign: "center",
  },
});
