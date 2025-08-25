import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
  TouchableOpacity,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { t } from "@/i18n/locales/i18n"; // Import translation function
import CustomIcon from "@/components/CustomIcon";
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import ScreenContainer from "@/components/common/ScreenContainer";
import TitleText from "@/components/common/TitleText";
import LabelText from "@/components/common/LabelText";
import RadioButtonText from "@/components/common/RadioButtonText";
import ProgressBar from "../../../components/ProgressBar";

const { height: screenHeight } = Dimensions.get("window");

export default function Child6() {
  const navigation = useNavigation();

  const [goals, setGoals] = useState<{
    trackMoods: boolean;
    manageStress: boolean;
    improveMentalHealth: boolean;
    seekTherapy: boolean;
    other: boolean;
  }>({
    trackMoods: false,
    manageStress: false,
    improveMentalHealth: false,
    seekTherapy: false,
    other: false,
  });

  const checkboxOptions = [
    {
      key: "trackMoods",
      label: t("child6Screen.trackMoods", "Track moods and emotions"),
    },
    {
      key: "manageStress",
      label: t("child6Screen.manageStress", "Manage stress or anxiety"),
    },
    {
      key: "improveMentalHealth",
      label: t(
        "child6Screen.improveMentalHealth",
        "Improve overall mental health",
      ),
    },
    {
      key: "seekTherapy",
      label: t("child6Screen.seekTherapy", "Seek guidance or therapy"),
    },
    { key: "other", label: t("child6Screen.other", "Other (please specify)") },
  ];

  useEffect(() => {
    const loadResponses = async () => {
      try {
        const storedResponses = await AsyncStorage.getItem(
          "onboardingResponses",
        );
        const parsedResponses = storedResponses
          ? JSON.parse(storedResponses)
          : {};

        if (parsedResponses.screen13) {
          setGoals(parsedResponses.screen13.goals || goals);
        }
      } catch (error) {
        console.error("Error loading responses:", error);
      }
    };

    loadResponses();
  }, []);

  const saveResponses = async () => {
    try {
      const storedResponses = await AsyncStorage.getItem("onboardingResponses");
      const parsedResponses = storedResponses
        ? JSON.parse(storedResponses)
        : {};

      const updatedResponses = {
        ...parsedResponses,
        screen13: {
          goals,
        },
      };

      await AsyncStorage.setItem(
        "onboardingResponses",
        JSON.stringify(updatedResponses),
      );
      // @ts-ignore
      navigation.navigate("ChildThankYou");
    } catch (error) {
      console.error("Error saving responses:", error);
    }
  };

  const goBack = () => navigation.goBack();
  const navigateTo = () => {
    // @ts-ignore
    navigation.navigate("ChildThankYou");
  };

  return (
    <ScreenContainer>
      <View style={{ width: "70%", alignSelf: "center" }}>
        <ProgressBar progress={5 / 5} />
      </View>
      <TitleText>{t("child6Screen.title", "What are your goals?")}</TitleText>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <LabelText>
          {t("child6Screen.title", "What are your goals for using this app?")}
        </LabelText>
        {checkboxOptions.map(({ key, label }) => (
          <Pressable
            key={key}
            onPress={() =>
              setGoals((prev) => ({
                ...prev,
                [key]: !prev[key as keyof typeof goals],
              }))
            }
          >
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[
                  styles.customCheckbox,
                  goals[key as keyof typeof goals] && styles.customCheckboxChecked
                ]}
                onPress={() =>
                  setGoals((prev) => ({
                    ...prev,
                    [key]: !prev[key as keyof typeof goals],
                  }))
                }
              >
                {goals[key as keyof typeof goals] && (
                  <CustomIcon type="IO" name="checkmark" size={16} color="#FFFFFF" />
                )}
              </TouchableOpacity>
              <RadioButtonText>{label}</RadioButtonText>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          label={t("child6Screen.saveAndProceed", "Save & Proceed")}
          callback={saveResponses}
        />
        <View style={styles.secondaryButtonContainer}>
          <SecondaryButton
            label={t("child6Screen.back", "Back")}
            callback={goBack}
            customStyle={styles.secondaryButton}
          />
          <SecondaryButton
            label={t("child6Screen.skip", "Skip")}
            callback={navigateTo}
            customStyle={styles.secondaryButton}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    marginTop: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: -10,
    marginLeft: 10,
  },
  buttonContainer: {
    height: screenHeight * 0.15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  secondaryButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "88%",
  },
  secondaryButton: {
    width: "48%",
  },
  customCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#CE93D8",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  customCheckboxChecked: {
    backgroundColor: "#AB47BC",
    borderColor: "#AB47BC",
  },
});
