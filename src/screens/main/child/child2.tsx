import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import ScreenContainer from "@/components/common/ScreenContainer";
import TitleText from "@/components/common/TitleText";
import LabelText from "@/components/common/LabelText";
import RadioButtonGroup from "@/components/common/RadioButtonGroup";
import ProgressBar from "../../../components/ProgressBar";

const { height: screenHeight } = Dimensions.get("window");

const ChildScreen2 = () => {
  const navigation = useNavigation();
  const [lifeStatus, setLifeStatus] = useState("");
  const [schoolStatus, setSchoolStatus] = useState("");
  const [proudStatus, setProudStatus] = useState("");

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const storedResponses = await AsyncStorage.getItem(
          "onboardingResponses",
        );
        if (storedResponses) {
          const parsedResponses = JSON.parse(storedResponses);
          setLifeStatus(parsedResponses.lifeStatus || "");
          setSchoolStatus(parsedResponses.schoolStatus || "");
          setProudStatus(parsedResponses.proudStatus || "");
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
        lifeStatus,
        schoolStatus,
        proudStatus,
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
      navigation.navigate("Child3");
    } catch (error) {
      console.error("Error saving responses:", error);
    }
  };

  const goBack = () => navigation.goBack();
  const navigateTo = () => {
    // @ts-ignore
    navigation.navigate("Child3");
  };

  const lifeOptions = [
    t("child2Screen.lifeOptionSmoothly"),
    t("child2Screen.lifeOptionMostlyOkay"),
    t("child2Screen.lifeOptionBitOff"),
    t("child2Screen.lifeOptionDifficult"),
  ];

  const schoolOptions = [
    t("child2Screen.schoolOptionVeryManageable"),
    t("child2Screen.schoolOptionSomewhatManageable"),
    t("child2Screen.schoolOptionBitOverwhelming"),
    t("child2Screen.schoolOptionVeryOverwhelming"),
  ];

  const proudOptions = [
    t("child2Screen.proudOptionYes"),
    t("child2Screen.proudOptionSometimes"),
    t("child2Screen.proudOptionNo"),
  ];

  return (
    <ScreenContainer>
      <View style={{ width: "70%", alignSelf: "center" }}>
        <ProgressBar progress={1 / 5} />
      </View>
      <ScrollView>
        <TitleText>{t("child2Screen.title")}</TitleText>

        <LabelText>{t("child2Screen.lifeLabel")}</LabelText>
        <RadioButtonGroup
          options={lifeOptions}
          selectedValue={lifeStatus} // Consider if this should store the key or English value
          onValueChange={setLifeStatus}
        />

        <LabelText>{t("child2Screen.schoolLabel")}</LabelText>
        <RadioButtonGroup
          options={schoolOptions}
          selectedValue={schoolStatus} // Consider if this should store the key or English value
          onValueChange={setSchoolStatus}
        />

        <LabelText>{t("child2Screen.proudLabel")}</LabelText>
        <RadioButtonGroup
          options={proudOptions}
          selectedValue={proudStatus} // Consider if this should store the key or English value
          onValueChange={setProudStatus}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          label={t("child2Screen.saveButton")}
          callback={saveResponses}
        />
        <View style={styles.secondaryButtonContainer}>
          <SecondaryButton
            label={t("child2Screen.backButton")}
            callback={goBack}
            customStyle={styles.secondaryButton}
          />
          <SecondaryButton
            label={t("child2Screen.skipButton")}
            callback={navigateTo}
            customStyle={styles.secondaryButton}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default ChildScreen2;

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
    width: "90%",
  },
  secondaryButton: {
    width: "48%",
    marginHorizontal: "1%",
  },
});
