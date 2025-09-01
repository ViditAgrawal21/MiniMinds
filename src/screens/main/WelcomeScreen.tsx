import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function
import PrimaryButton from "@/components/common/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation<any>();

  const navigateTo = () => {
    return navigation.navigate("SelfOnboarding");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('welcomeScreen.title')}</Text>
      <Text style={styles.subtitle}>{t('welcomeScreen.subtitle')}</Text>
      <Text style={styles.description}>{t('welcomeScreen.description')}</Text>
      <PrimaryButton label={t('welcomeScreen.nextButton')} callback={navigateTo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#C841CC",
    marginTop: 26,
    fontFamily: "Poppins-ExtraBold",
  },
  subtitle: {
    fontSize: 34,
    fontWeight: "500",
    color: "#C841CC",
    marginBottom: 60,
    marginTop: -5,
    fontFamily: "Poppins-Medium",
  },
  description: {
    fontSize: 20,
    fontWeight: "500",
    color: "#D27AD5",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
});
