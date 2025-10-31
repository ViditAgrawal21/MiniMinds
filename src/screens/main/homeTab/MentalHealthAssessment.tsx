import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function

interface Option {
  text: string;
  score: number;
}

interface Question {
  text: string;
  options: Option[];
}

interface Option {
  text: string;
  score: number;
}

interface Question {
  text: string;
  options: Option[];
}

const MentalHealthAssessment: React.FC = () => {
  const navigation = useNavigation<any>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(6).fill(null),
  );
  const [showResult, setShowResult] = useState<boolean>(false);
  const [mhs, setMhs] = useState<number>(0);
  const [contribution, setContribution] = useState<number>(0);

  // Define questions inside component to access translation function
  const questions: Question[] = [
    {
      text: t("mentalHealthAssessment.questions.q1"),
      options: [
        { text: t("mentalHealthAssessment.options.frequency.never"), score: 5 },
        {
          text: t("mentalHealthAssessment.options.frequency.rarely"),
          score: 4,
        },
        {
          text: t("mentalHealthAssessment.options.frequency.sometimes"),
          score: 3,
        },
        { text: t("mentalHealthAssessment.options.frequency.often"), score: 2 },
        {
          text: t("mentalHealthAssessment.options.frequency.always"),
          score: 1,
        },
      ],
    },
    {
      text: t("mentalHealthAssessment.questions.q2"),
      options: [
        {
          text: t("mentalHealthAssessment.options.quality.veryWell"),
          score: 5,
        },
        { text: t("mentalHealthAssessment.options.quality.well"), score: 4 },
        { text: t("mentalHealthAssessment.options.quality.neutral"), score: 3 },
        { text: t("mentalHealthAssessment.options.quality.poorly"), score: 2 },
        {
          text: t("mentalHealthAssessment.options.quality.veryPoorly"),
          score: 1,
        },
      ],
    },
    {
      text: t("mentalHealthAssessment.questions.q3"),
      options: [
        {
          text: t("mentalHealthAssessment.options.quality.veryWell"),
          score: 5,
        },
        { text: t("mentalHealthAssessment.options.quality.well"), score: 4 },
        { text: t("mentalHealthAssessment.options.quality.neutral"), score: 3 },
        { text: t("mentalHealthAssessment.options.quality.poorly"), score: 2 },
        {
          text: t("mentalHealthAssessment.options.quality.veryPoorly"),
          score: 1,
        },
      ],
    },
    {
      text: t("mentalHealthAssessment.questions.q4"),
      options: [
        {
          text: t("mentalHealthAssessment.options.satisfaction.verySatisfied"),
          score: 5,
        },
        {
          text: t("mentalHealthAssessment.options.satisfaction.satisfied"),
          score: 4,
        },
        {
          text: t("mentalHealthAssessment.options.satisfaction.neutral"),
          score: 3,
        },
        {
          text: t("mentalHealthAssessment.options.satisfaction.dissatisfied"),
          score: 2,
        },
        {
          text: t(
            "mentalHealthAssessment.options.satisfaction.veryDissatisfied",
          ),
          score: 1,
        },
      ],
    },
    {
      text: t("mentalHealthAssessment.questions.q5"),
      options: [
        {
          text: t("mentalHealthAssessment.options.financialBurden.daily"),
          score: 1,
        },
        {
          text: t(
            "mentalHealthAssessment.options.financialBurden.severalTimesWeek",
          ),
          score: 2,
        },
        {
          text: t("mentalHealthAssessment.options.financialBurden.onceWeek"),
          score: 3,
        },
        {
          text: t("mentalHealthAssessment.options.financialBurden.rarely"),
          score: 4,
        },
        {
          text: t("mentalHealthAssessment.options.financialBurden.never"),
          score: 5,
        },
      ],
    },
    {
      text: t("mentalHealthAssessment.questions.q6"),
      options: [
        { text: t("mentalHealthAssessment.options.frequency.never"), score: 5 },
        {
          text: t("mentalHealthAssessment.options.frequency.rarely"),
          score: 4,
        },
        {
          text: t("mentalHealthAssessment.options.frequency.sometimes"),
          score: 3,
        },
        { text: t("mentalHealthAssessment.options.frequency.often"), score: 2 },
        {
          text: t("mentalHealthAssessment.options.frequency.always"),
          score: 1,
        },
      ],
    },
  ];

  const handleOptionSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestionIndex] === null) return;
    if (currentQuestionIndex < 5) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (answers.every((answer) => answer !== null)) {
      const totalMhs = questions.reduce((sum, question, index) => {
        return sum + question.options[answers[index]!].score;
      }, 0);
      const totalContribution = (40 * (totalMhs - 6)) / 24;
      setMhs(totalMhs);
      setContribution(totalContribution);
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.progressText}>
        {t("mentalHealthAssessment.progress", {
          current: currentQuestionIndex + 1,
          total: 6,
        })}
      </Text>
      <Text style={styles.questionText}>{currentQuestion.text}</Text>
      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            answers[currentQuestionIndex] === index && styles.selectedOption,
          ]}
          onPress={() => handleOptionSelect(index)}
        >
          <Text
            style={[
              styles.optionText,
              answers[currentQuestionIndex] === index &&
                styles.selectedOptionText,
            ]}
          >
            {option.text}
          </Text>
        </TouchableOpacity>
      ))}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentQuestionIndex === 0 && styles.disabledButton,
          ]}
          onPress={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <Text style={styles.navText}>
            {t("mentalHealthAssessment.navigation.previous")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navButton,
            answers[currentQuestionIndex] === null && styles.disabledButton,
          ]}
          onPress={handleNext}
          disabled={answers[currentQuestionIndex] === null}
        >
          <Text style={styles.navText}>
            {currentQuestionIndex < 5
              ? t("mentalHealthAssessment.navigation.next")
              : t("mentalHealthAssessment.navigation.finish")}
          </Text>
        </TouchableOpacity>
      </View>
      {showResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {t("mentalHealthAssessment.results.scoreText", {
              score: mhs,
              maxScore: 30,
            })}
          </Text>
          <Text style={styles.resultText}>
            {t("mentalHealthAssessment.results.contributionText", {
              contribution: contribution.toFixed(2),
            })}
          </Text>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate("MainApp", { screen: "Home" })}
          >
            <Text style={styles.homeButtonText}>
              {t("mentalHealthAssessment.results.backToHome")}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  progressText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    fontFamily: "Poppins-Regular",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  optionButton: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#FF8C00",
  },
  optionText: {
    fontSize: 16,
    color: "#555555",
    fontFamily: "Poppins-Regular",
  },
  selectedOptionText: {
    color: "#fff",
    fontFamily: "Poppins-Medium",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    width: "100%",
  },
  navButton: {
    padding: 10,
    backgroundColor: "#FF8C00",
    borderRadius: 8,
    width: 100,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  navText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  resultContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  resultText: {
    fontSize: 16,
    marginVertical: 5,
    fontFamily: "Poppins-Regular",
    color: "#4A4A4A",
  },
  homeButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#FF8C00",
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});

export default MentalHealthAssessment;
