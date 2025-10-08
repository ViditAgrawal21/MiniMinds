// Updated ScanQuestions.tsx - Dynamic Question Loading
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { BackHandler } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/types';
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBar from "@/components/common/ProgressBar";
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import TitleText from "@/components/common/TitleText";
import LabelText from "@/components/common/LabelText";
import RadioButtonGroup from "@/components/common/RadioButtonGroup";
import { t } from "@/i18n/locales/i18n";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslatedScanName } from "@/utils/scanNameTranslations";
import { saveScanAnswers } from "@/services/database";

// Import generated question data
import { questionDataLoader } from "@/data/questionData";

interface QuestionOption {
  "Option 4 Weight": string;
  "Option 5": string;
  "Option 1": string;
  "Option 2": string;
  "Option 3 Weight": string;
  "Option 3": string;
  Q_id: string;
  "Option 1 Weight": string;
  "Option 4": string;
  "Option 5 Weight": string;
  filename: string;
  Name: string;
  "Option 2 Weight": string;
}

interface ScanAnswerFull {
  scan_title: string;
  answer1_score: string;
  question1: string;
  answer2_score: string;
  question2: string;
  answer3_score: string;
  question3: string;
  answer4_score: string;
  question4: string;
  answer5_score: string;
  question5: string;
  answer6_score: string;
  question6: string;
  answer7_score: string;
  question7: string;
  answer8_score: string;
  question8: string;
  answer9_score: string;
  question9: string;
  answer10_score: string;
  question10: string;
  pair_index: number;
  scan_date: string;
  scan_time: string;
  total_score: string;
  result: string;
  interventions?: string | null;
}

type ScanQuestionsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ScanQuestions'>;
type ScanQuestionsRouteProp = RouteProp<RootStackParamList, 'ScanQuestions'>;

export default function ScanQuestions() {
  const navigation = useNavigation<ScanQuestionsNavigationProp>();
  const route = useRoute<ScanQuestionsRouteProp>();
  const { scanName, questionScreen } = route.params || {};
  const { locale } = useLanguage();

  console.log("ScanQuestions received params:", scanName, questionScreen);
  console.log("Current locale in ScanQuestions:", locale);

  if (!scanName) {
    console.error("ScanQuestions: scanName is required but not provided");
    return null;
  }

  // Load question data dynamically
  const ScreenQuestionData = useMemo(() => {
    try {
      return questionDataLoader.getQuestionsForScan(scanName, locale);
    } catch (error) {
      console.error("Error loading question data:", error);
      return [];
    }
  }, [scanName, locale]);

  const [question1, setQuestion1] = useState<string>("");
  const [question2, setQuestion2] = useState<string>("");
  const [pairIndex, setPairIndex] = useState<number>(0);
  const [answer1, setAnswer1] = useState<string>("");
  const [answer2, setAnswer2] = useState<string>("");
  const [progress, setProgress] = useState(1 / 5);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [allAnswers, setAllAnswers] = useState<Record<string, string>>({});
  const [allQuestions, setAllQuestions] = useState<Record<string, string>>({});

  const questionData = ScreenQuestionData.length > 0 ? ScreenQuestionData[0] : null;
  const title = questionData ? Object.keys(questionData)[0] : getTranslatedScanName(scanName);
  const questions = questionData?.[title as keyof typeof questionData];

  const loadAnswersForPair = useCallback(
    async (pairIdx: number) => {
      if (!questions) return false;
      try {
        setIsLoading(true);
        setAnswer1("");
        setAnswer2("");
        return true;
      } catch (error) {
        console.error(`Error loading answers for pair ${pairIdx}:`, error);
        setAnswer1("");
        setAnswer2("");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [questions]
  );

  const findFurthestAnsweredPair = useCallback(async (): Promise<number> => {
    if (!questions) return 0;
    try {
      return 0;
    } catch (error) {
      console.error("Error finding furthest answered pair:", error);
      return 0;
    }
  }, [questions]);

  useEffect(() => {
    if (questions && questions.length > 0 && questions[pairIndex]) {
      setProgress((pairIndex + 1) / questions.length);
      setQuestion1(questions[pairIndex][0].Name);
      setQuestion2(questions[pairIndex][1].Name);
    }
  }, [pairIndex, questions, locale]);

  useEffect(() => {
    const initializeQuestions = async () => {
      if (!questions || isInitialized) return;

      try {
        setIsLoading(true);
        const lastAnsweredPair = await findFurthestAnsweredPair();

        if (lastAnsweredPair >= 0 && lastAnsweredPair < questions.length - 1) {
          setPairIndex(lastAnsweredPair);
          await loadAnswersForPair(lastAnsweredPair);
        } else {
          await loadAnswersForPair(0);
        }
      } catch (error) {
        console.error("Error initializing questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeQuestions();
    setIsInitialized(true);
  }, [title, questions, isInitialized, findFurthestAnsweredPair, loadAnswersForPair]);


  const saveCurrentAnswers = async (): Promise<boolean> => {
    if (!questions) return false;

    try {
      if (!answer1 || !answer2) {
        return false;
      }

      const currentQuestions = questions[pairIndex];
      const answer1Key = `answer${pairIndex * 2 + 1}_score`;
      const answer2Key = `answer${pairIndex * 2 + 2}_score`;
      const question1Key = `question${pairIndex * 2 + 1}`;
      const question2Key = `question${pairIndex * 2 + 2}`;

      setAllAnswers((prev) => ({
        ...prev,
        [answer1Key]: answer1,
        [answer2Key]: answer2,
      }));

      setAllQuestions((prev) => ({
        ...prev,
        [question1Key]: currentQuestions[0]["Name"],
        [question2Key]: currentQuestions[1]["Name"],
      }));

      console.log("Pair answers captured:", {
        pairIndex,
        answer1,
        answer2,
        questions: [currentQuestions[0]["Name"], currentQuestions[1]["Name"]],
      });

      return true;
    } catch (error) {
      console.error("Error saving answers:", error);
      return false;
    }
  };

  const handleSaveAndProceed = async () => {
    try {
      setIsLoading(true);

      if (!answer1 || !answer2) {
        Alert.alert(
          t("eqTest.missingResponseTitle"),
          t("eqTest.missingBothResponsesMessage")
        );
        setIsLoading(false);
        return;
      }

      const saveSuccess = await saveCurrentAnswers();

      if (!saveSuccess) {
        Alert.alert(t("eqTest.errorTitle"), t("eqTest.saveErrorMessage"));
        setIsLoading(false);
        return;
      }

      if (questions && pairIndex < questions.length - 1) {
        const nextPairIndex = pairIndex + 1;
        setPairIndex(nextPairIndex);
        await loadAnswersForPair(nextPairIndex);
      } else if (questions && pairIndex === questions.length - 1) {
        let totalScore = 0;
        let allScores = [];

        const saveCompleteScan = async (finalScore: number) => {
          try {
            const scanData: ScanAnswerFull = {
              scan_title: title,
              answer1_score: allAnswers.answer1_score || "",
              question1: allQuestions.question1 || "",
              answer2_score: allAnswers.answer2_score || "",
              question2: allQuestions.question2 || "",
              answer3_score: allAnswers.answer3_score || "",
              question3: allQuestions.question3 || "",
              answer4_score: allAnswers.answer4_score || "",
              question4: allQuestions.question4 || "",
              answer5_score: allAnswers.answer5_score || "",
              question5: allQuestions.question5 || "",
              answer6_score: allAnswers.answer6_score || "",
              question6: allQuestions.question6 || "",
              answer7_score: allAnswers.answer7_score || "",
              question7: allQuestions.question7 || "",
              answer8_score: allAnswers.answer8_score || "",
              question8: allQuestions.question8 || "",
              answer9_score: allAnswers.answer9_score || "",
              question9: allQuestions.question9 || "",
              answer10_score: allAnswers.answer10_score || "",
              question10: allQuestions.question10 || "",
              pair_index: questions.length - 1,
              scan_date: new Date().toLocaleDateString(),
              scan_time: new Date().toLocaleTimeString(),
              total_score: finalScore.toString(),
              result: "",
              interventions: null,
            };

            console.log("=== ScanQuestions: Preparing to save complete scan ===");
            console.log("Title:", title);
            console.log("Final Score:", finalScore);
            console.log("Questions Length:", questions.length);

            await saveScanAnswers(scanData);
            console.log("=== ScanQuestions: Complete scan saved successfully ===");
          } catch (error) {
            console.error("Error saving complete scan:", error);
            throw error;
          }
        };

        const processAllScores = async () => {
          try {
            if (!questions) return;

            await saveCurrentAnswers();

            for (let i = 0; i < questions.length; i++) {
              const answer1Key = `answer${i * 2 + 1}_score`;
              const answer2Key = `answer${i * 2 + 2}_score`;

              const answer1Value = allAnswers[answer1Key];
              const answer2Value = allAnswers[answer2Key];

              if (answer1Value && answer2Value) {
                const score1 = Number(answer1Value);
                const score2 = Number(answer2Value);

                const processedScore1 = score1 * 2;
                const processedScore2 = score2 * 2;

                allScores.push(processedScore1, processedScore2);
                totalScore += processedScore1 + processedScore2;
              }
            }

            await saveCompleteScan(totalScore);

            //@ts-ignore
            navigation.navigate("ScanResult", {
              scanName,
              totalScore: totalScore,
            });
          } catch (error) {
            console.error("Error processing scores:", error);
            Alert.alert(
              t("eqTest.errorTitle"),
              t("eqTest.resultsErrorMessage")
            );
          }
        };

        processAllScores();
      }
    } catch (error) {
      console.error("Error in handleSaveAndProceed:", error);
      Alert.alert(t("eqTest.errorTitle"), t("eqTest.unexpectedErrorMessage"));
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = useCallback(async () => {
    try {
      setIsLoading(true);
      if (pairIndex > 0) {
        if (answer1 && answer2) {
          await saveCurrentAnswers();
        }

        const previousPairIndex = pairIndex - 1;
        setPairIndex(previousPairIndex);

        if (questions) {
          setProgress((previousPairIndex + 1) / questions.length);
        }

        await loadAnswersForPair(previousPairIndex);
      } else {
        // If user is at the first question pair, navigate back to the scan list
        // instead of calling goBack() which may close the app in some flows.
        setIsLoading(false);
        navigation.navigate('ConditionScansScreen');
        return;
      }
    } catch (error) {
      console.error("Error navigating to previous question:", error);
      Alert.alert(
        t("eqTest.errorTitle"),
        t("eqTest.previousQuestionErrorMessage")
      );
    } finally {
      setIsLoading(false);
    }
  }, [pairIndex, answer1, answer2, questions, navigation, loadAnswersForPair]);

  // Register Android hardware back handler after goBack is defined
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      goBack();
      return true; // prevent default behavior (exit dialog)
    });

    return () => subscription.remove();
  }, [goBack, pairIndex, answer1, answer2, questions]);

  if (!questionData || !questions) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <TitleText>
            {!questionData ? "Question data not found" : "Loading questions..."}
          </TitleText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: "70%",
          alignSelf: "center",
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        <ProgressBar progress={progress} />
        <Text style={styles.progressText}>{`Question Set ${
          pairIndex + 1
        } of ${questions.length}`}</Text>
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#AB47BC" />
        </View>
      )}

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <TitleText>{title}</TitleText>

        <LabelText>{question1}</LabelText>
        <RadioButtonGroup
          options={[
            questions[pairIndex][0]["Option 1"],
            questions[pairIndex][0]["Option 2"],
            questions[pairIndex][0]["Option 3"],
            questions[pairIndex][0]["Option 4"],
            questions[pairIndex][0]["Option 5"],
          ]}
          selectedValue={
            answer1 === questions[pairIndex][0]["Option 1 Weight"]
              ? questions[pairIndex][0]["Option 1"]
              : answer1 === questions[pairIndex][0]["Option 2 Weight"]
              ? questions[pairIndex][0]["Option 2"]
              : answer1 === questions[pairIndex][0]["Option 3 Weight"]
              ? questions[pairIndex][0]["Option 3"]
              : answer1 === questions[pairIndex][0]["Option 4 Weight"]
              ? questions[pairIndex][0]["Option 4"]
              : answer1 === questions[pairIndex][0]["Option 5 Weight"]
              ? questions[pairIndex][0]["Option 5"]
              : ""
          }
          onValueChange={(value) => {
            if (value === questions[pairIndex][0]["Option 1"]) {
              setAnswer1(questions[pairIndex][0]["Option 1 Weight"]);
            } else if (value === questions[pairIndex][0]["Option 2"]) {
              setAnswer1(questions[pairIndex][0]["Option 2 Weight"]);
            } else if (value === questions[pairIndex][0]["Option 3"]) {
              setAnswer1(questions[pairIndex][0]["Option 3 Weight"]);
            } else if (value === questions[pairIndex][0]["Option 4"]) {
              setAnswer1(questions[pairIndex][0]["Option 4 Weight"]);
            } else if (value === questions[pairIndex][0]["Option 5"]) {
              setAnswer1(questions[pairIndex][0]["Option 5 Weight"]);
            }
          }}
        />

        <LabelText>{question2}</LabelText>
        <RadioButtonGroup
          options={[
            questions[pairIndex][1]["Option 1"],
            questions[pairIndex][1]["Option 2"],
            questions[pairIndex][1]["Option 3"],
            questions[pairIndex][1]["Option 4"],
            questions[pairIndex][1]["Option 5"],
          ]}
          selectedValue={
            answer2 === questions[pairIndex][1]["Option 1 Weight"]
              ? questions[pairIndex][1]["Option 1"]
              : answer2 === questions[pairIndex][1]["Option 2 Weight"]
              ? questions[pairIndex][1]["Option 2"]
              : answer2 === questions[pairIndex][1]["Option 3 Weight"]
              ? questions[pairIndex][1]["Option 3"]
              : answer2 === questions[pairIndex][1]["Option 4 Weight"]
              ? questions[pairIndex][1]["Option 4"]
              : answer2 === questions[pairIndex][1]["Option 5 Weight"]
              ? questions[pairIndex][1]["Option 5"]
              : ""
          }
          onValueChange={(value) => {
            if (value === questions[pairIndex][1]["Option 1"]) {
              setAnswer2(questions[pairIndex][1]["Option 1 Weight"]);
            } else if (value === questions[pairIndex][1]["Option 2"]) {
              setAnswer2(questions[pairIndex][1]["Option 2 Weight"]);
            } else if (value === questions[pairIndex][1]["Option 3"]) {
              setAnswer2(questions[pairIndex][1]["Option 3 Weight"]);
            } else if (value === questions[pairIndex][1]["Option 4"]) {
              setAnswer2(questions[pairIndex][1]["Option 4 Weight"]);
            } else if (value === questions[pairIndex][1]["Option 5"]) {
              setAnswer2(questions[pairIndex][1]["Option 5 Weight"]);
            }
          }}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          label={t("scanQuestions.ui.saveAndProceed", "Save & Proceed")}
          callback={handleSaveAndProceed}
        />
        <SecondaryButton
          label={t("scanQuestions.ui.back", "Back")}
          callback={goBack}
          customStyle={styles.secondaryButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: Dimensions.get("window").height * 0.03,
    paddingBottom: 20,
  },
  buttonContainer: {
    height: Dimensions.get("window").height * 0.15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  secondaryButton: {
    width: "88%",
  },
  progressText: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#888",
    marginTop: 5,
  },
  loadingOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 10,
  },
});