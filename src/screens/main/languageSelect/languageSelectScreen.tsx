import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLanguage } from "src/context/LanguageContext";

const LanguageSelectScreen: React.FC = (reset) => {
  const navigation = useNavigation();
  const { setLocale, supportedLanguages, t, isLoading } = useLanguage();
  const [isNavigating, setIsNavigating] = useState(false);

  // Check if this is not first launch
  useEffect(() => {
    const checkPreviousLaunch = async () => {
      try {
        if (!reset) {
          const hasCompletedFirstLaunch = await AsyncStorage.getItem(
            "hasCompletedFirstLaunch",
          );
          const selectedLanguage =
            await AsyncStorage.getItem("selectedLanguage");

          // If not first launch and language is selected, go to Tab
          if (hasCompletedFirstLaunch && selectedLanguage) {
            await setLocale(selectedLanguage);
            navigation.navigate("Tab" as never);
          }
        }
      } catch (error) {
        console.error("Error checking launch status:", error);
      }
    };

    checkPreviousLaunch();
  }, [reset, setLocale, navigation]);

  const handleSelectLanguage = async (languageCode: string) => {
    try {
      setIsNavigating(true);
      
      // Save selected language using the context
      await setLocale(languageCode);
      
      // Also save to AsyncStorage for consistency
      await AsyncStorage.setItem("selectedLanguage", languageCode);

      // Check if this is first launch
      const hasCompletedFirstLaunch = await AsyncStorage.getItem(
        "hasCompletedFirstLaunch",
      );

      if (hasCompletedFirstLaunch === null) {
        // First time - go to privacy notice screen
        navigation.navigate("PrivacyNoticeScreen" as never);
      } else {
        // Not first time - go directly to MainApp
        navigation.navigate("MainApp" as never);
      }
    } catch (error) {
      console.error("Error saving language selection:", error);
      Alert.alert(
        t('error', 'Error'),
        t('languageSelect.errorChangingLanguage', 'Failed to change language. Please try again.'),
        [{ text: t('ok', 'OK') }]
      );
    } finally {
      setIsNavigating(false);
    }
  };

  if (isLoading || isNavigating) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>
          {isNavigating 
            ? t('languageSelect.changing', 'Changing language...') 
            : t('loading', 'Loading...')
          }
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>
          {t("languageSelect.selectLanguage", "Please select your language")}
        </Text>

        <View style={styles.buttonContainer}>
          {Object.entries(supportedLanguages).map(([code, name]) => (
            <TouchableOpacity
              key={code}
              style={styles.button}
              onPress={() => handleSelectLanguage(code)}
              disabled={isNavigating}
            >
              <Text style={styles.buttonText}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LanguageSelectScreen;
