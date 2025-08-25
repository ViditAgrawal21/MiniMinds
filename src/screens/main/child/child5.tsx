import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { t } from "@/i18n/locales/i18n"; // Import translation function
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import ScreenContainer from "@/components/common/ScreenContainer";
import TitleText from "@/components/common/TitleText";
import LabelText from "@/components/common/LabelText";
import HorizontalRadioButtonGroup from "@/components/common/HorizontalRadioButtonGroup"; // Import the new component
import ProgressBar from "../../../components/ProgressBar";

const { height: screenHeight } = Dimensions.get("window");

export default function ChildScreen5() {
  const navigation = useNavigation();

  // Individual states for each question
  const [response1, setResponse1] = useState("");
  const [response2, setResponse2] = useState("");
  const [response3, setResponse3] = useState("");

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const storedResponses = await AsyncStorage.getItem(
          "onboardingResponses",
        );
        if (storedResponses) {
          const parsedResponses = JSON.parse(storedResponses);
          setResponse1(parsedResponses.response1 || "");
          setResponse2(parsedResponses.response2 || "");
          setResponse3(parsedResponses.response3 || "");
        }
      } catch (error) {
        console.error("Error loading saved responses:", error);
      }
    };

    loadSavedData();
  }, []);

  const saveResponses = async () => {
    try {
      const responses = {
        response1,
        response2,
        response3,
      };

      const storedResponses = await AsyncStorage.getItem("onboardingResponses");
      const parsedResponses = storedResponses
        ? JSON.parse(storedResponses)
        : {};

      const updatedResponses = {
        ...parsedResponses,
        ...responses,
      };

      await AsyncStorage.setItem(
        "onboardingResponses",
        JSON.stringify(updatedResponses),
      );
      // @ts-ignore
      navigation.navigate("Child6");
    } catch (error) {
      console.error("Error saving responses:", error);
    }
  };

  const goBack = () => navigation.goBack();
  const navigateTo = () => {
    // @ts-ignore
    navigation.navigate("Child6");
  };

  const options = [
    t("child5Screen.veryUnlikely", "Very Unlikely"),
    t("child5Screen.unlikely", "Unlikely"),
    t("child5Screen.neutral", "Neutral"),
    t("child5Screen.likely", "Likely"),
    t("child5Screen.veryLikely", "Very Likely"),
  ];

  return (
    <ScreenContainer>
      <View style={{ width: "70%", alignSelf: "center" }}>
        <ProgressBar progress={4 / 5} />
      </View>
      <ScrollView>
        <TitleText>
          {t("child5Screen.title", "How much likely are you to...")}
        </TitleText>

        <LabelText>
          {t(
            "child5Screen.annoyedQuestion",
            "To get annoyed or irritated pretty easily.",
          )}
        </LabelText>
        <HorizontalRadioButtonGroup
          options={options}
          selectedValue={response1}
          onValueChange={setResponse1}
        />

        <LabelText>
          {t(
            "child5Screen.sleepQuestion",
            "To have trouble falling asleep or staying asleep because I'm feeling anxious.",
          )}
        </LabelText>
        <HorizontalRadioButtonGroup
          options={options}
          selectedValue={response2}
          onValueChange={setResponse2}
        />

        <LabelText>
          {t(
            "child5Screen.stressQuestion",
            "To have stress or feel like I have too much to handle.",
          )}
        </LabelText>
        <HorizontalRadioButtonGroup
          options={options}
          selectedValue={response3}
          onValueChange={setResponse3}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          label={t("child5Screen.saveAndProceed", "Save & Proceed")}
          callback={saveResponses}
        />
        <View style={styles.secondaryButtonContainer}>
          <SecondaryButton
            label={t("child5Screen.back", "Back")}
            callback={goBack}
            customStyle={styles.secondaryButton}
          />
          <SecondaryButton
            label={t("child5Screen.skip", "Skip")}
            callback={navigateTo}
            customStyle={styles.secondaryButton}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
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
});
