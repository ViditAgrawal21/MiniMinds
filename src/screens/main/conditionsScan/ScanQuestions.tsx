import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator, // Added for loading state
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/types';
import CustomIcon from "@/components/CustomIcon";
import {
  saveScanAnswers,
  getScanAnswers,
} from "@/services/database"; // Import the database functions
import ProgressBar from "@/components/common/ProgressBar";
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import TitleText from "@/components/common/TitleText";
import LabelText from "@/components/common/LabelText";
import RadioButtonGroup from "@/components/common/RadioButtonGroup";
import { t } from "@/i18n/locales/i18n"; // Import the translation function
import { useLanguage } from "@/context/LanguageContext"; // Import language context
import { getTranslatedScanName } from "@/utils/scanNameTranslations"; // Import the shared translation utility

// Local interface for complete scan data
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

import { SafeAreaView } from "react-native-safe-area-context";

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

interface QuestionSet {
  [scanType: string]: QuestionOption[][];
}

// Type definitions for navigation
type ScanQuestionsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ScanQuestions'>;
type ScanQuestionsRouteProp = RouteProp<RootStackParamList, 'ScanQuestions'>;

export interface ScanQuestionsScreenProps {
  navigation: ScanQuestionsNavigationProp;
  route: ScanQuestionsRouteProp;
}

export default function ScanQuestions() {
  const navigation = useNavigation<ScanQuestionsNavigationProp>();
  const route = useRoute<ScanQuestionsRouteProp>();
  const { scanName, questionScreen } = route.params || {};
  const { locale } = useLanguage(); // Add language context to trigger re-renders

  console.log("ScanQuestions received params:", scanName, questionScreen);
  console.log("Current locale in ScanQuestions:", locale);

  // Safety check for required parameters
  if (!scanName) {
    console.error("ScanQuestions: scanName is required but not provided");
    return null;
  }

  // Create ScreenQuestionData dynamically based on current locale
  const ScreenQuestionData = useMemo(
    () => [
      {
        [t(
          "scanQuestions.environmentIssues.title",
          "Environment Issues Affecting Mental Wellbeing"
        )]: [
          [
            {
              filename: t(
                "scanQuestions.environmentIssues.title",
                "Environment Issues Affecting Mental Wellbeing"
              ),
              Q_id: "1",
              Name: t(
                "scanQuestions.environmentIssues.questions.1",
                "I feel anxious about the air quality in my area."
              ),
              "Option 1": t(
                "scanQuestions.environmentIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.environmentIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.environmentIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.environmentIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.environmentIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.environmentIssues.title",
                "Environment Issues Affecting Mental Wellbeing"
              ),
              Q_id: "2",
              Name: t(
                "scanQuestions.environmentIssues.questions.2",
                "Thinking about climate change makes me feel stressed."
              ),
              "Option 1": t(
                "scanQuestions.environmentIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.environmentIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.environmentIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.environmentIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.environmentIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.environmentIssues.title",
                "Environment Issues Affecting Mental Wellbeing"
              ),
              Q_id: "3",
              Name: t(
                "scanQuestions.environmentIssues.questions.3",
                "Noise pollution in my environment negatively affects my mental well-being."
              ),
              "Option 1": t(
                "scanQuestions.environmentIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.environmentIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.environmentIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.environmentIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.environmentIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.environmentIssues.title",
                "Environment Issues Affecting Mental Wellbeing"
              ),
              Q_id: "4",
              Name: t(
                "scanQuestions.environmentIssues.questions.4",
                "Having access to green spaces helps improve my mental health."
              ),
              "Option 1": t(
                "scanQuestions.environmentIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.environmentIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.environmentIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.environmentIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.environmentIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.environmentIssues.title",
                "Environment Issues Affecting Mental Wellbeing"
              ),
              Q_id: "5",
              Name: t(
                "scanQuestions.environmentIssues.questions.5",
                "I worry about the quality of water in my community."
              ),
              "Option 1": t(
                "scanQuestions.environmentIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.environmentIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.environmentIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.environmentIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.environmentIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.environmentIssues.title",
                "Environment Issues Affecting Mental Wellbeing"
              ),
              Q_id: "6",
              Name: t(
                "scanQuestions.environmentIssues.questions.6",
                "The threat of natural disasters in my area causes me significant stress."
              ),
              "Option 1": t(
                "scanQuestions.environmentIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.environmentIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.environmentIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.environmentIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.environmentIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.environmentIssues.title",
                "Environment Issues Affecting Mental Wellbeing"
              ),
              Q_id: "7",
              Name: t(
                "scanQuestions.environmentIssues.questions.7",
                "Seeing pollution and waste in my environment makes me feel distressed."
              ),
              "Option 1": t(
                "scanQuestions.environmentIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.environmentIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.environmentIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.environmentIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.environmentIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.environmentIssues.title",
                "Environment Issues Affecting Mental Wellbeing"
              ),
              Q_id: "8",
              Name: t(
                "scanQuestions.environmentIssues.questions.8",
                "The loss of biodiversity in my region is a source of concern for me."
              ),
              "Option 1": t(
                "scanQuestions.environmentIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.environmentIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.environmentIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.environmentIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.environmentIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.environmentIssues.title",
                "Environment Issues Affecting Mental Wellbeing"
              ),
              Q_id: "9",
              Name: t(
                "scanQuestions.environmentIssues.questions.9",
                "Extreme temperatures in my area affect my mental well-being."
              ),
              "Option 1": t(
                "scanQuestions.environmentIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.environmentIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.environmentIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.environmentIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.environmentIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.environmentIssues.title",
                "Environment Issues Affecting Mental Wellbeing"
              ),
              Q_id: "10",
              Name: t(
                "scanQuestions.environmentIssues.questions.10",
                "Engaging in sustainable practices helps alleviate my environmental concerns."
              ),
              "Option 1": t(
                "scanQuestions.environmentIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.environmentIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.environmentIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.environmentIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.environmentIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
        ],
      },
      {
        [t("scanQuestions.sexLife.title", "Sex Life")]: [
          [
            {
              filename: t("scanQuestions.sexLife.title", "Sex Life"),
              Q_id: "1",
              Name: t(
                "scanQuestions.sexLife.questions.1",
                "How satisfied are you with the frequency of your sexual activities?"
              ),
              "Option 1": t(
                "scanQuestions.sexLife.options.veryDissatisfied",
                "Very Dissatisfied"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.sexLife.options.dissatisfied",
                "Dissatisfied"
              ),
              "Option 2 Weight": "4",
              "Option 3": t("scanQuestions.sexLife.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.sexLife.options.satisfied",
                "Satisfied"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.sexLife.options.verySatisfied",
                "Very Satisfied"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t("scanQuestions.sexLife.title", "Sex Life"),
              Q_id: "2",
              Name: t(
                "scanQuestions.sexLife.questions.2",
                "How strong is the emotional connection you feel during sexual activities?"
              ),
              "Option 1": t(
                "scanQuestions.sexLife.options.veryDissatisfied",
                "Very Dissatisfied"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.sexLife.options.dissatisfied",
                "Dissatisfied"
              ),
              "Option 2 Weight": "4",
              "Option 3": t("scanQuestions.sexLife.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.sexLife.options.satisfied",
                "Satisfied"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.sexLife.options.verySatisfied",
                "Very Satisfied"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t("scanQuestions.sexLife.title", "Sex Life"),
              Q_id: "3",
              Name: t(
                "scanQuestions.sexLife.questions.3",
                "How effectively do you communicate with your partner about your sexual needs and desires?"
              ),
              "Option 1": t(
                "scanQuestions.sexLife.options.veryDissatisfied",
                "Very Dissatisfied"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.sexLife.options.dissatisfied",
                "Dissatisfied"
              ),
              "Option 2 Weight": "4",
              "Option 3": t("scanQuestions.sexLife.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.sexLife.options.satisfied",
                "Satisfied"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.sexLife.options.verySatisfied",
                "Very Satisfied"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t("scanQuestions.sexLife.title", "Sex Life"),
              Q_id: "4",
              Name: t(
                "scanQuestions.sexLife.questions.4",
                "How satisfied are you with the variety and exploration in your sexual activities?"
              ),
              "Option 1": t(
                "scanQuestions.sexLife.options.veryDissatisfied",
                "Very Dissatisfied"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.sexLife.options.dissatisfied",
                "Dissatisfied"
              ),
              "Option 2 Weight": "4",
              "Option 3": t("scanQuestions.sexLife.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.sexLife.options.satisfied",
                "Satisfied"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.sexLife.options.verySatisfied",
                "Very Satisfied"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t("scanQuestions.sexLife.title", "Sex Life"),
              Q_id: "5",
              Name: t(
                "scanQuestions.sexLife.questions.5",
                "How comfortable do you feel physically during sexual activities?"
              ),
              "Option 1": t(
                "scanQuestions.sexLife.options.veryDissatisfied",
                "Very Dissatisfied"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.sexLife.options.dissatisfied",
                "Dissatisfied"
              ),
              "Option 2 Weight": "4",
              "Option 3": t("scanQuestions.sexLife.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.sexLife.options.satisfied",
                "Satisfied"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.sexLife.options.verySatisfied",
                "Very Satisfied"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t("scanQuestions.sexLife.title", "Sex Life"),
              Q_id: "6",
              Name: t(
                "scanQuestions.sexLife.questions.6",
                "How emotionally satisfied do you feel after sexual activities?"
              ),
              "Option 1": t(
                "scanQuestions.sexLife.options.veryDissatisfied",
                "Very Dissatisfied"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.sexLife.options.dissatisfied",
                "Dissatisfied"
              ),
              "Option 2 Weight": "4",
              "Option 3": t("scanQuestions.sexLife.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.sexLife.options.satisfied",
                "Satisfied"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.sexLife.options.verySatisfied",
                "Very Satisfied"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t("scanQuestions.sexLife.title", "Sex Life"),
              Q_id: "7",
              Name: t(
                "scanQuestions.sexLife.questions.7",
                "How satisfied are you with the mutual satisfaction between you and your partner?"
              ),
              "Option 1": t(
                "scanQuestions.sexLife.options.veryDissatisfied",
                "Very Dissatisfied"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.sexLife.options.dissatisfied",
                "Dissatisfied"
              ),
              "Option 2 Weight": "4",
              "Option 3": t("scanQuestions.sexLife.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.sexLife.options.satisfied",
                "Satisfied"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.sexLife.options.verySatisfied",
                "Very Satisfied"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t("scanQuestions.sexLife.title", "Sex Life"),
              Q_id: "8",
              Name: t(
                "scanQuestions.sexLife.questions.8",
                "How often do you feel a strong desire or arousal for sexual activity?"
              ),
              "Option 1": t(
                "scanQuestions.sexLife.options.veryDissatisfied",
                "Very Dissatisfied"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.sexLife.options.dissatisfied",
                "Dissatisfied"
              ),
              "Option 2 Weight": "4",
              "Option 3": t("scanQuestions.sexLife.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.sexLife.options.satisfied",
                "Satisfied"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.sexLife.options.verySatisfied",
                "Very Satisfied"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t("scanQuestions.sexLife.title", "Sex Life"),
              Q_id: "9",
              Name: t(
                "scanQuestions.sexLife.questions.9",
                "How much trust and safety do you feel with your partner during sexual activities?"
              ),
              "Option 1": t(
                "scanQuestions.sexLife.options.veryDissatisfied",
                "Very Dissatisfied"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.sexLife.options.dissatisfied",
                "Dissatisfied"
              ),
              "Option 2 Weight": "4",
              "Option 3": t("scanQuestions.sexLife.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.sexLife.options.satisfied",
                "Satisfied"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.sexLife.options.verySatisfied",
                "Very Satisfied"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t("scanQuestions.sexLife.title", "Sex Life"),
              Q_id: "10",
              Name: t(
                "scanQuestions.sexLife.questions.10",
                "How satisfied are you with your overall sex life?"
              ),
              "Option 1": t(
                "scanQuestions.sexLife.options.veryDissatisfied",
                "Very Dissatisfied"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.sexLife.options.dissatisfied",
                "Dissatisfied"
              ),
              "Option 2 Weight": "4",
              "Option 3": t("scanQuestions.sexLife.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.sexLife.options.satisfied",
                "Satisfied"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.sexLife.options.verySatisfied",
                "Very Satisfied"
              ),
              "Option 5 Weight": "1",
            },
          ],
        ],
      },
      {
        [t(
          "scanQuestions.financialMentalHealth.title",
          "Financial Mental Health"
        )]: [
          [
            {
              filename: t(
                "scanQuestions.financialMentalHealth.title",
                "Financial Mental Health"
              ),
              Q_id: "1",
              Name: t(
                "scanQuestions.financialMentalHealth.questions.1",
                "How often do you find yourself worrying about your financial situation?"
              ),
              "Option 1": t(
                "scanQuestions.financialMentalHealth.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.financialMentalHealth.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.financialMentalHealth.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.financialMentalHealth.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.financialMentalHealth.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.financialMentalHealth.title",
                "Financial Mental Health"
              ),
              Q_id: "2",
              Name: t(
                "scanQuestions.financialMentalHealth.questions.2",
                "To what extent do you feel in control of your financial situation?"
              ),
              "Option 1": t(
                "scanQuestions.financialMentalHealth.options.never",
                "Never"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.financialMentalHealth.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.financialMentalHealth.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.financialMentalHealth.options.often",
                "Often"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.financialMentalHealth.options.always",
                "Always"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.financialMentalHealth.title",
                "Financial Mental Health"
              ),
              Q_id: "3",
              Name: t(
                "scanQuestions.financialMentalHealth.questions.3",
                "How secure do you feel about your current and future financial situation?"
              ),
              "Option 1": t(
                "scanQuestions.financialMentalHealth.options.never",
                "Never"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.financialMentalHealth.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.financialMentalHealth.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.financialMentalHealth.options.often",
                "Often"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.financialMentalHealth.options.always",
                "Always"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.financialMentalHealth.title",
                "Financial Mental Health"
              ),
              Q_id: "4",
              Name: t(
                "scanQuestions.financialMentalHealth.questions.4",
                "How often do financial concerns cause you stress?"
              ),
              "Option 1": t(
                "scanQuestions.financialMentalHealth.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.financialMentalHealth.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.financialMentalHealth.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.financialMentalHealth.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.financialMentalHealth.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.financialMentalHealth.title",
                "Financial Mental Health"
              ),
              Q_id: "5",
              Name: t(
                "scanQuestions.financialMentalHealth.questions.5",
                "How confident are you in your ability to handle unexpected financial emergencies?"
              ),
              "Option 1": t(
                "scanQuestions.financialMentalHealth.options.never",
                "Never"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.financialMentalHealth.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.financialMentalHealth.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.financialMentalHealth.options.often",
                "Often"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.financialMentalHealth.options.always",
                "Always"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.financialMentalHealth.title",
                "Financial Mental Health"
              ),
              Q_id: "6",
              Name: t(
                "scanQuestions.financialMentalHealth.questions.6",
                "How much do you feel your financial situation affects your mental health?"
              ),
              "Option 1": t(
                "scanQuestions.financialMentalHealth.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.financialMentalHealth.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.financialMentalHealth.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.financialMentalHealth.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.financialMentalHealth.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.financialMentalHealth.title",
                "Financial Mental Health"
              ),
              Q_id: "7",
              Name: t(
                "scanQuestions.financialMentalHealth.questions.7",
                "To what extent do you feel empowered to make decisions that improve your financial situation?"
              ),
              "Option 1": t(
                "scanQuestions.financialMentalHealth.options.never",
                "Never"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.financialMentalHealth.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.financialMentalHealth.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.financialMentalHealth.options.often",
                "Often"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.financialMentalHealth.options.always",
                "Always"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.financialMentalHealth.title",
                "Financial Mental Health"
              ),
              Q_id: "8",
              Name: t(
                "scanQuestions.financialMentalHealth.questions.8",
                "How satisfied are you with your current financial situation?"
              ),
              "Option 1": t(
                "scanQuestions.financialMentalHealth.options.never",
                "Never"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.financialMentalHealth.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.financialMentalHealth.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.financialMentalHealth.options.often",
                "Often"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.financialMentalHealth.options.always",
                "Always"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.financialMentalHealth.title",
                "Financial Mental Health"
              ),
              Q_id: "9",
              Name: t(
                "scanQuestions.financialMentalHealth.questions.9",
                "How confident are you in achieving your financial goals?"
              ),
              "Option 1": t(
                "scanQuestions.financialMentalHealth.options.never",
                "Never"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.financialMentalHealth.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.financialMentalHealth.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.financialMentalHealth.options.often",
                "Often"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.financialMentalHealth.options.always",
                "Always"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.financialMentalHealth.title",
                "Financial Mental Health"
              ),
              Q_id: "10",
              Name: t(
                "scanQuestions.financialMentalHealth.questions.10",
                "How often do you actively plan and manage your finances?"
              ),
              "Option 1": t(
                "scanQuestions.financialMentalHealth.options.never",
                "Never"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.financialMentalHealth.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.financialMentalHealth.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.financialMentalHealth.options.often",
                "Often"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.financialMentalHealth.options.always",
                "Always"
              ),
              "Option 5 Weight": "1",
            },
          ],
        ],
      },
      {
        [t(
          "scanQuestions.generalPhysicalFitness.title",
          "General Physical Fitness"
        )]: [
          [
            {
              filename: t(
                "scanQuestions.generalPhysicalFitness.title",
                "General Physical Fitness"
              ),
              Q_id: "1",
              Name: t(
                "scanQuestions.generalPhysicalFitness.questions.1",
                "How would you rate your ability to engage in aerobic activities (e.g., running, cycling) for extended periods without excessive fatigue?"
              ),
              "Option 1": t(
                "scanQuestions.generalPhysicalFitness.options.veryPoor",
                "Very Poor"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.generalPhysicalFitness.options.poor",
                "Poor"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.generalPhysicalFitness.options.average",
                "Average"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.generalPhysicalFitness.options.good",
                "Good"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.generalPhysicalFitness.options.excellent",
                "Excellent"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.generalPhysicalFitness.title",
                "General Physical Fitness"
              ),
              Q_id: "2",
              Name: t(
                "scanQuestions.generalPhysicalFitness.questions.2",
                "How confident are you in your ability to lift or carry heavy objects without strain?"
              ),
              "Option 1": t(
                "scanQuestions.generalPhysicalFitness.options.veryPoor",
                "Very Poor"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.generalPhysicalFitness.options.poor",
                "Poor"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.generalPhysicalFitness.options.average",
                "Average"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.generalPhysicalFitness.options.good",
                "Good"
              ),
              "Option 4 Weight": "2",
              "Option 5": "Excellent",
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.generalPhysicalFitness.title",
                "General Physical Fitness"
              ),
              Q_id: "3",
              Name: t(
                "scanQuestions.generalPhysicalFitness.questions.3",
                "How well can you perform repetitive physical tasks (e.g., push-ups, sit-ups) without tiring quickly?"
              ),
              "Option 1": t(
                "scanQuestions.generalPhysicalFitness.options.veryPoor",
                "Very Poor"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.generalPhysicalFitness.options.poor",
                "Poor"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.generalPhysicalFitness.options.average",
                "Average"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.generalPhysicalFitness.options.good",
                "Good"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.generalPhysicalFitness.options.excellent",
                "Excellent"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.generalPhysicalFitness.title",
                "General Physical Fitness"
              ),
              Q_id: "4",
              Name: t(
                "scanQuestions.generalPhysicalFitness.questions.4",
                "How would you rate your ability to perform movements that require flexibility, such as bending or stretching?"
              ),
              "Option 1": t(
                "scanQuestions.generalPhysicalFitness.options.veryPoor",
                "Very Poor"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.generalPhysicalFitness.options.poor",
                "Poor"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.generalPhysicalFitness.options.average",
                "Average"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.generalPhysicalFitness.options.good",
                "Good"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.generalPhysicalFitness.options.excellent",
                "Excellent"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.generalPhysicalFitness.title",
                "General Physical Fitness"
              ),
              Q_id: "5",
              Name: t(
                "scanQuestions.generalPhysicalFitness.questions.5",
                "How would you assess your balance and coordination during physical activities?"
              ),
              "Option 1": t(
                "scanQuestions.generalPhysicalFitness.options.veryPoor",
                "Very Poor"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.generalPhysicalFitness.options.poor",
                "Poor"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.generalPhysicalFitness.options.average",
                "Average"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.generalPhysicalFitness.options.good",
                "Good"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.generalPhysicalFitness.options.excellent",
                "Excellent"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.generalPhysicalFitness.title",
                "General Physical Fitness"
              ),
              Q_id: "6",
              Name: t(
                "scanQuestions.generalPhysicalFitness.questions.6",
                "How would you describe your energy levels throughout the day?"
              ),
              "Option 1": t(
                "scanQuestions.generalPhysicalFitness.options.veryPoor",
                "Very Poor"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.generalPhysicalFitness.options.poor",
                "Poor"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.generalPhysicalFitness.options.average",
                "Average"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.generalPhysicalFitness.options.good",
                "Good"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.generalPhysicalFitness.options.excellent",
                "Excellent"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.generalPhysicalFitness.title",
                "General Physical Fitness"
              ),
              Q_id: "7",
              Name: t(
                "scanQuestions.generalPhysicalFitness.questions.7",
                "How quickly do you recover from physical exertion or exercise?"
              ),
              "Option 1": t(
                "scanQuestions.generalPhysicalFitness.options.veryPoor",
                "Very Poor"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.generalPhysicalFitness.options.poor",
                "Poor"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.generalPhysicalFitness.options.average",
                "Average"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.generalPhysicalFitness.options.good",
                "Good"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.generalPhysicalFitness.options.excellent",
                "Excellent"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.generalPhysicalFitness.title",
                "General Physical Fitness"
              ),
              Q_id: "8",
              Name: t(
                "scanQuestions.generalPhysicalFitness.questions.8",
                "How would you rate your overall physical health and fitness?"
              ),
              "Option 1": t(
                "scanQuestions.generalPhysicalFitness.options.veryPoor",
                "Very Poor"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.generalPhysicalFitness.options.poor",
                "Poor"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.generalPhysicalFitness.options.average",
                "Average"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.generalPhysicalFitness.options.good",
                "Good"
              ),
              "Option 4 Weight": "2",
              "Option 5": "Excellent",
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.generalPhysicalFitness.title",
                "General Physical Fitness"
              ),
              Q_id: "9",
              Name: t(
                "scanQuestions.generalPhysicalFitness.questions.9",
                "How often do you engage in physical exercise or activities each week?"
              ),
              "Option 1": t(
                "scanQuestions.generalPhysicalFitness.options.veryPoor",
                "Very Poor"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.generalPhysicalFitness.options.poor",
                "Poor"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.generalPhysicalFitness.options.average",
                "Average"
              ),
              "Option 3 Weight": "3",
              "Option 4": "Good",
              "Option 4 Weight": "2",
              "Option 5": "Excellent",
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.generalPhysicalFitness.title",
                "General Physical Fitness"
              ),
              Q_id: "10",
              Name: t(
                "scanQuestions.generalPhysicalFitness.questions.10",
                "How satisfied are you with your current level of physical fitness?"
              ),
              "Option 1": t(
                "scanQuestions.generalPhysicalFitness.options.veryPoor",
                "Very Poor"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.generalPhysicalFitness.options.poor",
                "Poor"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.generalPhysicalFitness.options.average",
                "Average"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.generalPhysicalFitness.options.good",
                "Good"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.generalPhysicalFitness.options.excellent",
                "Excellent"
              ),
              "Option 5 Weight": "1",
            },
          ],
        ],
      },
      {
        [t("scanQuestions.sleep.title", "Sleep")]: [
          [
            {
              filename: t("scanQuestions.sleep.title", "Sleep"),
              Q_id: "1",
              Name: t(
                "scanQuestions.sleep.questions.1",
                "I feel that I get a restful night's sleep."
              ),
              "Option 1": t(
                "scanQuestions.sleep.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t("scanQuestions.sleep.options.disagree", "Disagree"),
              "Option 2 Weight": "4",
              "Option 3": t("scanQuestions.sleep.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.sleep.options.agree", "Agree"),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.sleep.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t("scanQuestions.sleep.title", "Sleep"),
              Q_id: "2",
              Name: t(
                "scanQuestions.sleep.questions.2",
                "I am satisfied with the amount of sleep I get each night."
              ),
              "Option 1": t(
                "scanQuestions.sleep.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t("scanQuestions.sleep.options.disagree", "Disagree"),
              "Option 2 Weight": "4",
              "Option 3": t("scanQuestions.sleep.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.sleep.options.agree", "Agree"),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.sleep.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t("scanQuestions.sleep.title", "Sleep"),
              Q_id: "3",
              Name: t(
                "scanQuestions.sleep.questions.3",
                "I fall asleep within 30 minutes of going to bed."
              ),
              "Option 1": t(
                "scanQuestions.sleep.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t("scanQuestions.sleep.options.disagree", "Disagree"),
              "Option 2 Weight": "4",
              "Option 3": t("scanQuestions.sleep.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.sleep.options.agree", "Agree"),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.sleep.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t("scanQuestions.sleep.title", "Sleep"),
              Q_id: "4",
              Name: t(
                "scanQuestions.sleep.questions.4",
                "I rarely wake up during the night."
              ),
              "Option 1": t(
                "scanQuestions.sleep.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t("scanQuestions.sleep.options.disagree", "Disagree"),
              "Option 2 Weight": "4",
              "Option 3": t("scanQuestions.sleep.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.sleep.options.agree", "Agree"),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.sleep.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t("scanQuestions.sleep.title", "Sleep"),
              Q_id: "5",
              Name: t(
                "scanQuestions.sleep.questions.5",
                "I feel alert and awake during the day."
              ),
              "Option 1": t(
                "scanQuestions.sleep.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t("scanQuestions.sleep.options.disagree", "Disagree"),
              "Option 2 Weight": "4",
              "Option 3": t("scanQuestions.sleep.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.sleep.options.agree", "Agree"),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.sleep.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t("scanQuestions.sleep.title", "Sleep"),
              Q_id: "6",
              Name: t(
                "scanQuestions.sleep.questions.6",
                "I am frequently disturbed by noise or light while trying to sleep."
              ),
              "Option 1": t(
                "scanQuestions.sleep.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t("scanQuestions.sleep.options.disagree", "Disagree"),
              "Option 2 Weight": "2",
              "Option 3": t("scanQuestions.sleep.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.sleep.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.sleep.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t("scanQuestions.sleep.title", "Sleep"),
              Q_id: "7",
              Name: t(
                "scanQuestions.sleep.questions.7",
                "I rely on medication or other aids to help me sleep."
              ),
              "Option 1": t(
                "scanQuestions.sleep.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t("scanQuestions.sleep.options.disagree", "Disagree"),
              "Option 2 Weight": "2",
              "Option 3": t("scanQuestions.sleep.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.sleep.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.sleep.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t("scanQuestions.sleep.title", "Sleep"),
              Q_id: "8",
              Name: t(
                "scanQuestions.sleep.questions.8",
                "My sleep environment is comfortable and conducive to sleep."
              ),
              "Option 1": t(
                "scanQuestions.sleep.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t("scanQuestions.sleep.options.disagree", "Disagree"),
              "Option 2 Weight": "4",
              "Option 3": t("scanQuestions.sleep.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.sleep.options.agree", "Agree"),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.sleep.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t("scanQuestions.sleep.title", "Sleep"),
              Q_id: "9",
              Name: t(
                "scanQuestions.sleep.questions.9",
                "Overall, I am satisfied with my sleep patterns."
              ),
              "Option 1": t(
                "scanQuestions.sleep.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t("scanQuestions.sleep.options.disagree", "Disagree"),
              "Option 2 Weight": "4",
              "Option 3": t("scanQuestions.sleep.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.sleep.options.agree", "Agree"),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.sleep.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t("scanQuestions.sleep.title", "Sleep"),
              Q_id: "10",
              Name: t(
                "scanQuestions.sleep.questions.10",
                "My sleep issues negatively affect my daily activities and performance."
              ),
              "Option 1": t(
                "scanQuestions.sleep.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t("scanQuestions.sleep.options.disagree", "Disagree"),
              "Option 2 Weight": "2",
              "Option 3": t("scanQuestions.sleep.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.sleep.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.sleep.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
        ],
      },
      {
        [t("scanQuestions.internetDependence.title", "Internet Dependence")]: [
          [
            {
              filename: t(
                "scanQuestions.internetDependence.title",
                "Internet Dependence"
              ),
              Q_id: "1",
              Name: t(
                "scanQuestions.internetDependence.questions.1",
                "I often find myself spending more time online than I initially intended."
              ),
              "Option 1": t(
                "scanQuestions.internetDependence.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetDependence.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetDependence.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetDependence.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetDependence.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.internetDependence.title",
                "Internet Dependence"
              ),
              Q_id: "2",
              Name: t(
                "scanQuestions.internetDependence.questions.2",
                "My internet use has interfered with my responsibilities at work, school, or home."
              ),
              "Option 1": t(
                "scanQuestions.internetDependence.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetDependence.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetDependence.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetDependence.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetDependence.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.internetDependence.title",
                "Internet Dependence"
              ),
              Q_id: "3",
              Name: t(
                "scanQuestions.internetDependence.questions.3",
                "I frequently think about being online when I am offline."
              ),
              "Option 1": t(
                "scanQuestions.internetDependence.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetDependence.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetDependence.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetDependence.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetDependence.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.internetDependence.title",
                "Internet Dependence"
              ),
              Q_id: "4",
              Name: t(
                "scanQuestions.internetDependence.questions.4",
                "I have lost interest in hobbies or activities that I used to enjoy because of my internet use."
              ),
              "Option 1": t(
                "scanQuestions.internetDependence.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetDependence.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetDependence.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetDependence.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetDependence.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.internetDependence.title",
                "Internet Dependence"
              ),
              Q_id: "5",
              Name: t(
                "scanQuestions.internetDependence.questions.5",
                "I feel restless, irritable, or anxious when I cannot access the internet."
              ),
              "Option 1": t(
                "scanQuestions.internetDependence.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetDependence.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetDependence.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetDependence.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetDependence.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.internetDependence.title",
                "Internet Dependence"
              ),
              Q_id: "6",
              Name: t(
                "scanQuestions.internetDependence.questions.6",
                "I need to spend increasing amounts of time online to achieve the same level of satisfaction."
              ),
              "Option 1": t(
                "scanQuestions.internetDependence.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetDependence.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetDependence.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetDependence.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetDependence.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.internetDependence.title",
                "Internet Dependence"
              ),
              Q_id: "7",
              Name: t(
                "scanQuestions.internetDependence.questions.7",
                "I have tried to reduce my internet use but have been unsuccessful."
              ),
              "Option 1": t(
                "scanQuestions.internetDependence.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetDependence.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetDependence.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetDependence.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetDependence.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.internetDependence.title",
                "Internet Dependence"
              ),
              Q_id: "8",
              Name: t(
                "scanQuestions.internetDependence.questions.8",
                "My internet use has negatively affected my relationships with family or friends."
              ),
              "Option 1": t(
                "scanQuestions.internetDependence.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetDependence.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetDependence.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetDependence.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetDependence.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.internetDependence.title",
                "Internet Dependence"
              ),
              Q_id: "9",
              Name: t(
                "scanQuestions.internetDependence.questions.9",
                "I use the internet to escape from my problems or to relieve feelings of helplessness, guilt, anxiety, or depression."
              ),
              "Option 1": t(
                "scanQuestions.internetDependence.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetDependence.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetDependence.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetDependence.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetDependence.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.internetDependence.title",
                "Internet Dependence"
              ),
              Q_id: "10",
              Name: t(
                "scanQuestions.internetDependence.questions.10",
                "I have hidden or lied about the amount of time I spend online from others."
              ),
              "Option 1": t(
                "scanQuestions.internetDependence.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetDependence.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetDependence.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetDependence.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetDependence.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
        ],
      },
      {
        [t(
          "scanQuestions.familyRelationship.title",
          "Family and Relationship"
        )]: [
          [
            {
              filename: t(
                "scanQuestions.familyRelationship.title",
                "Family and Relationship"
              ),
              Q_id: "1",
              Name: t(
                "scanQuestions.familyRelationship.questions.1",
                "How effectively do you feel your family communicates with each other?"
              ),
              "Option 1": t(
                "scanQuestions.familyRelationship.options.veryIneffectively",
                "Very Ineffectively"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.familyRelationship.options.ineffectively",
                "Ineffectively"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.familyRelationship.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.familyRelationship.options.effectively",
                "Effectively"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.familyRelationship.options.veryEffectively",
                "Very Effectively"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.familyRelationship.title",
                "Family and Relationship"
              ),
              Q_id: "2",
              Name: t(
                "scanQuestions.familyRelationship.questions.2",
                "How well does your family resolve conflicts when they arise?"
              ),
              "Option 1": t(
                "scanQuestions.familyRelationship.options.veryIneffectively",
                "Very Ineffectively"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.familyRelationship.options.ineffectively",
                "Ineffectively"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.familyRelationship.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.familyRelationship.options.effectively",
                "Effectively"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.familyRelationship.options.veryEffectively",
                "Very Effectively"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.familyRelationship.title",
                "Family and Relationship"
              ),
              Q_id: "3",
              Name: t(
                "scanQuestions.familyRelationship.questions.3",
                "How supported do you feel by your family members emotionally?"
              ),
              "Option 1": t(
                "scanQuestions.familyRelationship.options.veryIneffectively",
                "Very Ineffectively"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.familyRelationship.options.ineffectively",
                "Ineffectively"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.familyRelationship.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.familyRelationship.options.effectively",
                "Effectively"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.familyRelationship.options.veryEffectively",
                "Very Effectively"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.familyRelationship.title",
                "Family and Relationship"
              ),
              Q_id: "4",
              Name: t(
                "scanQuestions.familyRelationship.questions.4",
                "How much trust do you have in your family members?"
              ),
              "Option 1": t(
                "scanQuestions.familyRelationship.options.veryIneffectively",
                "Very Ineffectively"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.familyRelationship.options.ineffectively",
                "Ineffectively"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.familyRelationship.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.familyRelationship.options.effectively",
                "Effectively"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.familyRelationship.options.veryEffectively",
                "Very Effectively"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.familyRelationship.title",
                "Family and Relationship"
              ),
              Q_id: "5",
              Name: t(
                "scanQuestions.familyRelationship.questions.5",
                "How often do you spend quality time with your family?"
              ),
              "Option 1": t(
                "scanQuestions.familyRelationship.options.veryIneffectively",
                "Very Ineffectively"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.familyRelationship.options.ineffectively",
                "Ineffectively"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.familyRelationship.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.familyRelationship.options.effectively",
                "Effectively"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.familyRelationship.options.veryEffectively",
                "Very Effectively"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.familyRelationship.title",
                "Family and Relationship"
              ),
              Q_id: "6",
              Name: t(
                "scanQuestions.familyRelationship.questions.6",
                "How respected do you feel by your family members?"
              ),
              "Option 1": t(
                "scanQuestions.familyRelationship.options.veryIneffectively",
                "Very Ineffectively"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.familyRelationship.options.ineffectively",
                "Ineffectively"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.familyRelationship.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.familyRelationship.options.effectively",
                "Effectively"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.familyRelationship.options.veryEffectively",
                "Very Effectively"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.familyRelationship.title",
                "Family and Relationship"
              ),
              Q_id: "7",
              Name: t(
                "scanQuestions.familyRelationship.questions.7",
                "How fairly are responsibilities shared among family members?"
              ),
              "Option 1": t(
                "scanQuestions.familyRelationship.options.veryIneffectively",
                "Very Ineffectively"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.familyRelationship.options.ineffectively",
                "Ineffectively"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.familyRelationship.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.familyRelationship.options.effectively",
                "Effectively"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.familyRelationship.options.veryEffectively",
                "Very Effectively"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.familyRelationship.title",
                "Family and Relationship"
              ),
              Q_id: "8",
              Name: t(
                "scanQuestions.familyRelationship.questions.8",
                "How often do conflicts occur within your family?"
              ),
              "Option 1": t(
                "scanQuestions.familyRelationship.options.veryIneffectively",
                "Very Ineffectively"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.familyRelationship.options.ineffectively",
                "Ineffectively"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.familyRelationship.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.familyRelationship.options.effectively",
                "Effectively"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.familyRelationship.options.veryEffectively",
                "Very Effectively"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.familyRelationship.title",
                "Family and Relationship"
              ),
              Q_id: "9",
              Name: t(
                "scanQuestions.familyRelationship.questions.9",
                "How cohesive do you feel your family is?"
              ),
              "Option 1": t(
                "scanQuestions.familyRelationship.options.veryIneffectively",
                "Very Ineffectively"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.familyRelationship.options.ineffectively",
                "Ineffectively"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.familyRelationship.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.familyRelationship.options.effectively",
                "Effectively"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.familyRelationship.options.veryEffectively",
                "Very Effectively"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.familyRelationship.title",
                "Family and Relationship"
              ),
              Q_id: "10",
              Name: t(
                "scanQuestions.familyRelationship.questions.10",
                "How satisfied are you with your current family relationships?"
              ),
              "Option 1": t(
                "scanQuestions.familyRelationship.options.veryIneffectively",
                "Very Ineffectively"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.familyRelationship.options.ineffectively",
                "Ineffectively"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.familyRelationship.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.familyRelationship.options.effectively",
                "Effectively"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.familyRelationship.options.veryEffectively",
                "Very Effectively"
              ),
              "Option 5 Weight": "1",
            },
          ],
        ],
      },
      {
        [t("scanQuestions.socialMentalHealth.title", "Social Mental Health")]: [
          [
            {
              filename: t(
                "scanQuestions.socialMentalHealth.title",
                "Social Mental Health"
              ),
              Q_id: "1",
              Name: t(
                "scanQuestions.socialMentalHealth.questions.1",
                "I feel comfortable interacting with others in social settings."
              ),
              "Option 1": t(
                "scanQuestions.socialMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.socialMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.socialMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.socialMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.socialMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.socialMentalHealth.title",
                "Social Mental Health"
              ),
              Q_id: "2",
              Name: t(
                "scanQuestions.socialMentalHealth.questions.2",
                "I often feel anxious when I have to engage in social activities."
              ),
              "Option 1": t(
                "scanQuestions.socialMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.socialMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.socialMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.socialMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.socialMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.socialMentalHealth.title",
                "Social Mental Health"
              ),
              Q_id: "3",
              Name: t(
                "scanQuestions.socialMentalHealth.questions.3",
                "I feel a strong sense of belonging within my social circles."
              ),
              "Option 1": t(
                "scanQuestions.socialMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.socialMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.socialMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.socialMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.socialMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.socialMentalHealth.title",
                "Social Mental Health"
              ),
              Q_id: "4",
              Name: t(
                "scanQuestions.socialMentalHealth.questions.4",
                "I have people in my life who provide me with emotional support."
              ),
              "Option 1": t(
                "scanQuestions.socialMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.socialMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.socialMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.socialMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.socialMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.socialMentalHealth.title",
                "Social Mental Health"
              ),
              Q_id: "5",
              Name: t(
                "scanQuestions.socialMentalHealth.questions.5",
                "I often feel isolated from others, even when I am not alone."
              ),
              "Option 1": t(
                "scanQuestions.socialMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.socialMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.socialMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.socialMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.socialMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.socialMentalHealth.title",
                "Social Mental Health"
              ),
              Q_id: "6",
              Name: t(
                "scanQuestions.socialMentalHealth.questions.6",
                "I am confident in my ability to handle social situations."
              ),
              "Option 1": t(
                "scanQuestions.socialMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.socialMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.socialMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.socialMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.socialMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.socialMentalHealth.title",
                "Social Mental Health"
              ),
              Q_id: "7",
              Name: t(
                "scanQuestions.socialMentalHealth.questions.7",
                "I worry about being judged by others in social settings."
              ),
              "Option 1": t(
                "scanQuestions.socialMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.socialMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.socialMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.socialMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.socialMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.socialMentalHealth.title",
                "Social Mental Health"
              ),
              Q_id: "8",
              Name: t(
                "scanQuestions.socialMentalHealth.questions.8",
                "I enjoy participating in social activities and gatherings."
              ),
              "Option 1": t(
                "scanQuestions.socialMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.socialMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.socialMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.socialMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.socialMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.socialMentalHealth.title",
                "Social Mental Health"
              ),
              Q_id: "9",
              Name: t(
                "scanQuestions.socialMentalHealth.questions.9",
                "I find it easy to make new friends."
              ),
              "Option 1": t(
                "scanQuestions.socialMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.socialMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.socialMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.socialMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.socialMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.socialMentalHealth.title",
                "Social Mental Health"
              ),
              Q_id: "10",
              Name: t(
                "scanQuestions.socialMentalHealth.questions.10",
                "Social interactions have a positive impact on my mood."
              ),
              "Option 1": t(
                "scanQuestions.socialMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.socialMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.socialMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.socialMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.socialMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
        ],
      },
      {
        [t("scanQuestions.angerManagement.title", "Anger Management")]: [
          [
            {
              filename: t(
                "scanQuestions.angerManagement.title",
                "Anger Management"
              ),
              Q_id: "1",
              Name: t(
                "scanQuestions.angerManagement.questions.1",
                "I often find myself feeling angry."
              ),
              "Option 1": t(
                "scanQuestions.angerManagement.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.angerManagement.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.angerManagement.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.angerManagement.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.angerManagement.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.angerManagement.title",
                "Anger Management"
              ),
              Q_id: "2",
              Name: t(
                "scanQuestions.angerManagement.questions.2",
                "When I get angry, my anger feels overwhelming."
              ),
              "Option 1": t(
                "scanQuestions.angerManagement.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.angerManagement.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.angerManagement.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.angerManagement.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.angerManagement.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.angerManagement.title",
                "Anger Management"
              ),
              Q_id: "3",
              Name: t(
                "scanQuestions.angerManagement.questions.3",
                "I feel in control of my anger."
              ),
              "Option 1": t(
                "scanQuestions.angerManagement.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.angerManagement.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.angerManagement.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.angerManagement.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.angerManagement.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.angerManagement.title",
                "Anger Management"
              ),
              Q_id: "4",
              Name: t(
                "scanQuestions.angerManagement.questions.4",
                "Small annoyances can make me very angry."
              ),
              "Option 1": t(
                "scanQuestions.angerManagement.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.angerManagement.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.angerManagement.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.angerManagement.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.angerManagement.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.angerManagement.title",
                "Anger Management"
              ),
              Q_id: "5",
              Name: t(
                "scanQuestions.angerManagement.questions.5",
                "I express my anger in a healthy way."
              ),
              "Option 1": t(
                "scanQuestions.angerManagement.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.angerManagement.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.angerManagement.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.angerManagement.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.angerManagement.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.angerManagement.title",
                "Anger Management"
              ),
              Q_id: "6",
              Name: t(
                "scanQuestions.angerManagement.questions.6",
                "My anger negatively affects my relationships with others."
              ),
              "Option 1": t(
                "scanQuestions.angerManagement.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.angerManagement.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.angerManagement.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.angerManagement.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.angerManagement.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.angerManagement.title",
                "Anger Management"
              ),
              Q_id: "7",
              Name: t(
                "scanQuestions.angerManagement.questions.7",
                "I experience physical symptoms (e.g., increased heart rate) when I am angry."
              ),
              "Option 1": t(
                "scanQuestions.angerManagement.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.angerManagement.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.angerManagement.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.angerManagement.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.angerManagement.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.angerManagement.title",
                "Anger Management"
              ),
              Q_id: "8",
              Name: t(
                "scanQuestions.angerManagement.questions.8",
                "I am able to calm down quickly after getting angry."
              ),
              "Option 1": t(
                "scanQuestions.angerManagement.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.angerManagement.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.angerManagement.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.angerManagement.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.angerManagement.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.angerManagement.title",
                "Anger Management"
              ),
              Q_id: "9",
              Name: t(
                "scanQuestions.angerManagement.questions.9",
                "I make poor decisions when I am angry."
              ),
              "Option 1": t(
                "scanQuestions.angerManagement.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.angerManagement.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.angerManagement.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.angerManagement.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.angerManagement.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.angerManagement.title",
                "Anger Management"
              ),
              Q_id: "10",
              Name: t(
                "scanQuestions.angerManagement.questions.10",
                "I use techniques to manage my anger effectively."
              ),
              "Option 1": t(
                "scanQuestions.angerManagement.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.angerManagement.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.angerManagement.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.angerManagement.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.angerManagement.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
        ],
      },
      {
        [t(
          "scanQuestions.professionalMentalHealth.title",
          "Professional Mental Health"
        )]: [
          [
            {
              filename: t(
                "scanQuestions.professionalMentalHealth.title",
                "Professional Mental Health"
              ),
              Q_id: "1",
              Name: t(
                "scanQuestions.professionalMentalHealth.questions.1",
                "I feel overwhelmed by my workload on a regular basis."
              ),
              "Option 1": t(
                "scanQuestions.professionalMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.professionalMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.professionalMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.professionalMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.professionalMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.professionalMentalHealth.title",
                "Professional Mental Health"
              ),
              Q_id: "2",
              Name: t(
                "scanQuestions.professionalMentalHealth.questions.2",
                "I am satisfied with my current job role and responsibilities."
              ),
              "Option 1": t(
                "scanQuestions.professionalMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.professionalMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.professionalMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.professionalMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.professionalMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.professionalMentalHealth.title",
                "Professional Mental Health"
              ),
              Q_id: "3",
              Name: t(
                "scanQuestions.professionalMentalHealth.questions.3",
                "I am able to maintain a healthy balance between my work and personal life."
              ),
              "Option 1": t(
                "scanQuestions.professionalMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.professionalMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.professionalMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.professionalMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.professionalMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.professionalMentalHealth.title",
                "Professional Mental Health"
              ),
              Q_id: "4",
              Name: t(
                "scanQuestions.professionalMentalHealth.questions.4",
                "I often feel emotionally drained after work."
              ),
              "Option 1": t(
                "scanQuestions.professionalMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.professionalMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.professionalMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.professionalMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.professionalMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.professionalMentalHealth.title",
                "Professional Mental Health"
              ),
              Q_id: "5",
              Name: t(
                "scanQuestions.professionalMentalHealth.questions.5",
                "I feel motivated and enthusiastic about my work."
              ),
              "Option 1": t(
                "scanQuestions.professionalMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.professionalMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.professionalMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.professionalMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.professionalMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.professionalMentalHealth.title",
                "Professional Mental Health"
              ),
              Q_id: "6",
              Name: t(
                "scanQuestions.professionalMentalHealth.questions.6",
                "I have access to adequate support and resources at work when I need them."
              ),
              "Option 1": t(
                "scanQuestions.professionalMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.professionalMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.professionalMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.professionalMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.professionalMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.professionalMentalHealth.title",
                "Professional Mental Health"
              ),
              Q_id: "7",
              Name: t(
                "scanQuestions.professionalMentalHealth.questions.7",
                "I frequently feel anxious or nervous about work-related tasks."
              ),
              "Option 1": t(
                "scanQuestions.professionalMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.professionalMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.professionalMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.professionalMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.professionalMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.professionalMentalHealth.title",
                "Professional Mental Health"
              ),
              Q_id: "8",
              Name: t(
                "scanQuestions.professionalMentalHealth.questions.8",
                "I find it easy to concentrate on my work tasks without getting distracted."
              ),
              "Option 1": t(
                "scanQuestions.professionalMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.professionalMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.professionalMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.professionalMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.professionalMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.professionalMentalHealth.title",
                "Professional Mental Health"
              ),
              Q_id: "9",
              Name: t(
                "scanQuestions.professionalMentalHealth.questions.9",
                "I have positive and supportive relationships with my colleagues."
              ),
              "Option 1": t(
                "scanQuestions.professionalMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.professionalMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.professionalMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.professionalMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.professionalMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.professionalMentalHealth.title",
                "Professional Mental Health"
              ),
              Q_id: "10",
              Name: t(
                "scanQuestions.professionalMentalHealth.questions.10",
                "I have effective strategies to cope with work-related stress."
              ),
              "Option 1": t(
                "scanQuestions.professionalMentalHealth.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.professionalMentalHealth.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.professionalMentalHealth.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.professionalMentalHealth.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.professionalMentalHealth.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
        ],
      },
      {
        [t(
          "scanQuestions.internetSocialMedia.title",
          "Internet and Social Media Issue"
        )]: [
          [
            {
              filename: t(
                "scanQuestions.internetSocialMedia.title",
                "Internet and Social Media Issue"
              ),
              Q_id: "1",
              Name: t(
                "scanQuestions.internetSocialMedia.questions.1",
                "How often do you find yourself spending more time on social media than you intended?"
              ),
              "Option 1": t(
                "scanQuestions.internetSocialMedia.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetSocialMedia.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetSocialMedia.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetSocialMedia.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetSocialMedia.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.internetSocialMedia.title",
                "Internet and Social Media Issue"
              ),
              Q_id: "2",
              Name: t(
                "scanQuestions.internetSocialMedia.questions.2",
                "To what extent does your use of the Internet and social media impacts your daily responsibilities (e.g., work, school, household tasks)?"
              ),
              "Option 1": t(
                "scanQuestions.internetSocialMedia.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetSocialMedia.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetSocialMedia.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetSocialMedia.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetSocialMedia.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.internetSocialMedia.title",
                "Internet and Social Media Issue"
              ),
              Q_id: "3",
              Name: t(
                "scanQuestions.internetSocialMedia.questions.3",
                "How often do you feel anxious or stressed when you cannot access social media?"
              ),
              "Option 1": t(
                "scanQuestions.internetSocialMedia.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetSocialMedia.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetSocialMedia.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetSocialMedia.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetSocialMedia.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.internetSocialMedia.title",
                "Internet and Social Media Issue"
              ),
              Q_id: "4",
              Name: t(
                "scanQuestions.internetSocialMedia.questions.4",
                "How often does your use of the Internet or social media negatively affect your sleep patterns?"
              ),
              "Option 1": t(
                "scanQuestions.internetSocialMedia.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetSocialMedia.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetSocialMedia.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetSocialMedia.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetSocialMedia.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.internetSocialMedia.title",
                "Internet and Social Media Issue"
              ),
              Q_id: "5",
              Name: t(
                "scanQuestions.internetSocialMedia.questions.5",
                "How often do you prefer interacting with people online rather than face-to-face?"
              ),
              "Option 1": t(
                "scanQuestions.internetSocialMedia.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetSocialMedia.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetSocialMedia.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetSocialMedia.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetSocialMedia.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.internetSocialMedia.title",
                "Internet and Social Media Issue"
              ),
              Q_id: "6",
              Name: t(
                "scanQuestions.internetSocialMedia.questions.6",
                "How often do you find it difficult to concentrate on tasks because of thoughts about checking social media?"
              ),
              "Option 1": t(
                "scanQuestions.internetSocialMedia.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetSocialMedia.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetSocialMedia.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetSocialMedia.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetSocialMedia.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.internetSocialMedia.title",
                "Internet and Social Media Issue"
              ),
              Q_id: "7",
              Name: t(
                "scanQuestions.internetSocialMedia.questions.7",
                "How successful have you been in attempts to reduce your Internet or social media use?"
              ),
              "Option 1": t(
                "scanQuestions.internetSocialMedia.options.never",
                "Never"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.internetSocialMedia.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.internetSocialMedia.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetSocialMedia.options.often",
                "Often"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.internetSocialMedia.options.always",
                "Always"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.internetSocialMedia.title",
                "Internet and Social Media Issue"
              ),
              Q_id: "8",
              Name: t(
                "scanQuestions.internetSocialMedia.questions.8",
                "How often does your mood change based on your interactions or experiences on social media?"
              ),
              "Option 1": t(
                "scanQuestions.internetSocialMedia.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetSocialMedia.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetSocialMedia.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetSocialMedia.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetSocialMedia.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.internetSocialMedia.title",
                "Internet and Social Media Issue"
              ),
              Q_id: "9",
              Name: t(
                "scanQuestions.internetSocialMedia.questions.9",
                "How important is social media to your sense of self-worth?"
              ),
              "Option 1": t(
                "scanQuestions.internetSocialMedia.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetSocialMedia.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetSocialMedia.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetSocialMedia.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetSocialMedia.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.internetSocialMedia.title",
                "Internet and Social Media Issue"
              ),
              Q_id: "10",
              Name: t(
                "scanQuestions.internetSocialMedia.questions.10",
                "How often do you experience withdrawal symptoms (e.g., irritability, restlessness) when you are unable to use the Internet or social media?"
              ),
              "Option 1": t(
                "scanQuestions.internetSocialMedia.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.internetSocialMedia.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.internetSocialMedia.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.internetSocialMedia.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.internetSocialMedia.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
          ],
        ],
      },
      {
        [t("scanQuestions.addictions.title", "Addictions")]: [
          [
            {
              filename: t("scanQuestions.addictions.title", "Addictions"),
              Q_id: "1",
              Name: t(
                "scanQuestions.addictions.questions.1",
                "I frequently experience strong cravings or urges to engage in the addictive behavior."
              ),
              "Option 1": t(
                "scanQuestions.addictions.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.addictions.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.addictions.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.addictions.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.addictions.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t("scanQuestions.addictions.title", "Addictions"),
              Q_id: "2",
              Name: t(
                "scanQuestions.addictions.questions.2",
                "I often find it difficult to control or reduce my engagement in the addictive behavior, even when I try."
              ),
              "Option 1": t(
                "scanQuestions.addictions.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.addictions.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.addictions.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.addictions.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.addictions.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t("scanQuestions.addictions.title", "Addictions"),
              Q_id: "3",
              Name: t(
                "scanQuestions.addictions.questions.3",
                "I spend a significant amount of time thinking about, planning, or engaging in the addictive behavior."
              ),
              "Option 1": t(
                "scanQuestions.addictions.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.addictions.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.addictions.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.addictions.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.addictions.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t("scanQuestions.addictions.title", "Addictions"),
              Q_id: "4",
              Name: t(
                "scanQuestions.addictions.questions.4",
                "My involvement in the addictive behavior has caused me to neglect important responsibilities at work, school, or home."
              ),
              "Option 1": t(
                "scanQuestions.addictions.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.addictions.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.addictions.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.addictions.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.addictions.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t("scanQuestions.addictions.title", "Addictions"),
              Q_id: "5",
              Name: t(
                "scanQuestions.addictions.questions.5",
                "My relationships with family and friends have been negatively affected by my addictive behavior."
              ),
              "Option 1": t(
                "scanQuestions.addictions.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.addictions.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.addictions.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.addictions.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.addictions.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t("scanQuestions.addictions.title", "Addictions"),
              Q_id: "6",
              Name: t(
                "scanQuestions.addictions.questions.6",
                "I have noticed that I need to engage in the addictive behavior more frequently or intensely to achieve the same effect."
              ),
              "Option 1": t(
                "scanQuestions.addictions.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.addictions.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.addictions.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.addictions.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.addictions.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t("scanQuestions.addictions.title", "Addictions"),
              Q_id: "7",
              Name: t(
                "scanQuestions.addictions.questions.7",
                "I experience physical or emotional discomfort when I am unable to engage in the addictive behavior."
              ),
              "Option 1": t(
                "scanQuestions.addictions.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.addictions.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.addictions.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.addictions.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.addictions.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t("scanQuestions.addictions.title", "Addictions"),
              Q_id: "8",
              Name: t(
                "scanQuestions.addictions.questions.8",
                "I have made multiple unsuccessful attempts to quit or cut back on the addictive behavior."
              ),
              "Option 1": t(
                "scanQuestions.addictions.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.addictions.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.addictions.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.addictions.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.addictions.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t("scanQuestions.addictions.title", "Addictions"),
              Q_id: "9",
              Name: t(
                "scanQuestions.addictions.questions.9",
                "My physical or mental health has suffered as a result of my addictive behavior."
              ),
              "Option 1": t(
                "scanQuestions.addictions.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.addictions.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.addictions.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.addictions.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.addictions.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t("scanQuestions.addictions.title", "Addictions"),
              Q_id: "10",
              Name: t(
                "scanQuestions.addictions.questions.10",
                "I continue to engage in the addictive behavior despite knowing it causes problems in my life."
              ),
              "Option 1": t(
                "scanQuestions.addictions.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.addictions.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.addictions.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.addictions.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.addictions.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
        ],
      },
      {
        [t("scanQuestions.youngsterIssues.title", "Youngster Issues")]: [
          [
            {
              filename: t(
                "scanQuestions.youngsterIssues.title",
                "Youngster Issues"
              ),
              Q_id: "1",
              Name: t(
                "scanQuestions.youngsterIssues.questions.1",
                "I often feel overwhelmed by the amount of work and responsibilities I have."
              ),
              "Option 1": t(
                "scanQuestions.youngsterIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.youngsterIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.youngsterIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.youngsterIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.youngsterIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.youngsterIssues.title",
                "Youngster Issues"
              ),
              Q_id: "2",
              Name: t(
                "scanQuestions.youngsterIssues.questions.2",
                "I find it easy to make and maintain friendships."
              ),
              "Option 1": t(
                "scanQuestions.youngsterIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.youngsterIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.youngsterIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.youngsterIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.youngsterIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.youngsterIssues.title",
                "Youngster Issues"
              ),
              Q_id: "3",
              Name: t(
                "scanQuestions.youngsterIssues.questions.3",
                "I feel confident in my abilities and self-worth."
              ),
              "Option 1": t(
                "scanQuestions.youngsterIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.youngsterIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.youngsterIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.youngsterIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.youngsterIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.youngsterIssues.title",
                "Youngster Issues"
              ),
              Q_id: "4",
              Name: t(
                "scanQuestions.youngsterIssues.questions.4",
                "I feel a lot of pressure to perform well academically."
              ),
              "Option 1": t(
                "scanQuestions.youngsterIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.youngsterIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.youngsterIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.youngsterIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.youngsterIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.youngsterIssues.title",
                "Youngster Issues"
              ),
              Q_id: "5",
              Name: t(
                "scanQuestions.youngsterIssues.questions.5",

                "I am able to manage my emotions effectively when I am upset or angry."
              ),
              "Option 1": t(
                "scanQuestions.youngsterIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.youngsterIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.youngsterIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.youngsterIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.youngsterIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.youngsterIssues.title",
                "Youngster Issues"
              ),
              Q_id: "6",
              Name: t(
                "scanQuestions.youngsterIssues.questions.6",
                "I get enough sleep to feel rested and alert during the day."
              ),
              "Option 1": t(
                "scanQuestions.youngsterIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.youngsterIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.youngsterIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.youngsterIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.youngsterIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.youngsterIssues.title",
                "Youngster Issues"
              ),
              Q_id: "7",
              Name: t(
                "scanQuestions.youngsterIssues.questions.7",
                "I feel supported and understood by my family."
              ),
              "Option 1": t(
                "scanQuestions.youngsterIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.youngsterIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.youngsterIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.youngsterIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.youngsterIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.youngsterIssues.title",
                "Youngster Issues"
              ),
              Q_id: "8",
              Name: t(
                "scanQuestions.youngsterIssues.questions.8",
                "I spend a healthy amount of time on social media and electronic devices."
              ),
              "Option 1": t(
                "scanQuestions.youngsterIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.youngsterIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.youngsterIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.youngsterIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.youngsterIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.youngsterIssues.title",
                "Youngster Issues"
              ),
              Q_id: "9",
              Name: t(
                "scanQuestions.youngsterIssues.questions.9",
                "I am satisfied with my physical health and fitness level."
              ),
              "Option 1": t(
                "scanQuestions.youngsterIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.youngsterIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.youngsterIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.youngsterIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.youngsterIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.youngsterIssues.title",
                "Youngster Issues"
              ),
              Q_id: "10",
              Name: t(
                "scanQuestions.youngsterIssues.questions.10",
                "I feel optimistic about my future and the opportunities available to me."
              ),
              "Option 1": t(
                "scanQuestions.youngsterIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.youngsterIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.youngsterIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.youngsterIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.youngsterIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
          ],
        ],
      },
      {
        [t(
          "scanQuestions.commonPsychologicalIssues.title",
          "Common Psychological Issues"
        )]: [
          [
            {
              filename: t(
                "scanQuestions.commonPsychologicalIssues.title",
                "Common Psychological Issues"
              ),
              Q_id: "1",
              Name: t(
                "scanQuestions.commonPsychologicalIssues.questions.1",
                "I often feel nervous, anxious, or on edge."
              ),
              "Option 1": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.commonPsychologicalIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.commonPsychologicalIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.commonPsychologicalIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.commonPsychologicalIssues.title",
                "Common Psychological Issues"
              ),
              Q_id: "2",
              Name: t(
                "scanQuestions.commonPsychologicalIssues.questions.2",
                "I frequently feel down, depressed, or hopeless."
              ),
              "Option 1": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.commonPsychologicalIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.commonPsychologicalIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.commonPsychologicalIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.commonPsychologicalIssues.title",
                "Common Psychological Issues"
              ),
              Q_id: "3",
              Name: t(
                "scanQuestions.commonPsychologicalIssues.questions.3",
                "I find it difficult to relax due to stress."
              ),
              "Option 1": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.commonPsychologicalIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.commonPsychologicalIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.commonPsychologicalIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.commonPsychologicalIssues.title",
                "Common Psychological Issues"
              ),
              Q_id: "4",
              Name: t(
                "scanQuestions.commonPsychologicalIssues.questions.4",
                "I have trouble falling or staying asleep."
              ),
              "Option 1": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.commonPsychologicalIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.commonPsychologicalIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.commonPsychologicalIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.commonPsychologicalIssues.title",
                "Common Psychological Issues"
              ),
              Q_id: "5",
              Name: t(
                "scanQuestions.commonPsychologicalIssues.questions.5",
                "I often feel irritable or easily annoyed."
              ),
              "Option 1": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.commonPsychologicalIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.commonPsychologicalIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.commonPsychologicalIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.commonPsychologicalIssues.title",
                "Common Psychological Issues"
              ),
              Q_id: "6",
              Name: t(
                "scanQuestions.commonPsychologicalIssues.questions.6",
                "I have difficulty concentrating on tasks."
              ),
              "Option 1": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.commonPsychologicalIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.commonPsychologicalIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.commonPsychologicalIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.commonPsychologicalIssues.title",
                "Common Psychological Issues"
              ),
              Q_id: "7",
              Name: t(
                "scanQuestions.commonPsychologicalIssues.questions.7",
                "I prefer to avoid social interactions."
              ),
              "Option 1": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.commonPsychologicalIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.commonPsychologicalIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.commonPsychologicalIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.commonPsychologicalIssues.title",
                "Common Psychological Issues"
              ),
              Q_id: "8",
              Name: t(
                "scanQuestions.commonPsychologicalIssues.questions.8",
                "I often feel tired or have little energy."
              ),
              "Option 1": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.commonPsychologicalIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.commonPsychologicalIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.commonPsychologicalIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.commonPsychologicalIssues.title",
                "Common Psychological Issues"
              ),
              Q_id: "9",
              Name: t(
                "scanQuestions.commonPsychologicalIssues.questions.9",
                "I feel confident in myself and my abilities."
              ),
              "Option 1": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.commonPsychologicalIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.commonPsychologicalIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.commonPsychologicalIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t(
                "scanQuestions.commonPsychologicalIssues.title",
                "Common Psychological Issues"
              ),
              Q_id: "10",
              Name: t(
                "scanQuestions.commonPsychologicalIssues.questions.10",
                "I have experienced significant changes in my appetite."
              ),
              "Option 1": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.commonPsychologicalIssues.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.commonPsychologicalIssues.options.neutral",
                "Neutral"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.commonPsychologicalIssues.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.commonPsychologicalIssues.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
        ],
      },
      {
        [t("scanQuestions.suicidalBehavior.title", "Suicidal Behaviour")]: [
          [
            {
              filename: t(
                "scanQuestions.suicidalBehavior.title",
                "Suicidal Behaviour"
              ),
              Q_id: "1",
              Name: t(
                "scanQuestions.suicidalBehavior.questions.1",
                "How often do you feel hopeless about your future?"
              ),
              "Option 1": t(
                "scanQuestions.suicidalBehavior.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.suicidalBehavior.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.suicidalBehavior.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.suicidalBehavior.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.suicidalBehavior.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.suicidalBehavior.title",
                "Suicidal Behaviour"
              ),
              Q_id: "2",
              Name: t(
                "scanQuestions.suicidalBehavior.questions.2",
                "How frequently do you think about death or dying?"
              ),
              "Option 1": t(
                "scanQuestions.suicidalBehavior.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.suicidalBehavior.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.suicidalBehavior.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.suicidalBehavior.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.suicidalBehavior.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.suicidalBehavior.title",
                "Suicidal Behaviour"
              ),
              Q_id: "3",
              Name: t(
                "scanQuestions.suicidalBehavior.questions.3",
                "How often do you feel that life is not worth living?"
              ),
              "Option 1": t(
                "scanQuestions.suicidalBehavior.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.suicidalBehavior.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.suicidalBehavior.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.suicidalBehavior.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.suicidalBehavior.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.suicidalBehavior.title",
                "Suicidal Behaviour"
              ),
              Q_id: "4",
              Name: t(
                "scanQuestions.suicidalBehavior.questions.4",
                "How frequently do you have thoughts of harming yourself?"
              ),
              "Option 1": t(
                "scanQuestions.suicidalBehavior.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.suicidalBehavior.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.suicidalBehavior.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.suicidalBehavior.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.suicidalBehavior.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.suicidalBehavior.title",
                "Suicidal Behaviour"
              ),
              Q_id: "5",
              Name: t(
                "scanQuestions.suicidalBehavior.questions.5",
                "How often do you feel like a burden to others?"
              ),
              "Option 1": t(
                "scanQuestions.suicidalBehavior.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.suicidalBehavior.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.suicidalBehavior.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.suicidalBehavior.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.suicidalBehavior.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.suicidalBehavior.title",
                "Suicidal Behaviour"
              ),
              Q_id: "6",
              Name: t(
                "scanQuestions.suicidalBehavior.questions.6",
                "How frequently do you feel isolated or disconnected from others?"
              ),
              "Option 1": t(
                "scanQuestions.suicidalBehavior.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.suicidalBehavior.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.suicidalBehavior.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.suicidalBehavior.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.suicidalBehavior.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.suicidalBehavior.title",
                "Suicidal Behaviour"
              ),
              Q_id: "7",
              Name: t(
                "scanQuestions.suicidalBehavior.questions.7",
                "How often do you engage in risky or self-destructive behaviors?"
              ),
              "Option 1": t(
                "scanQuestions.suicidalBehavior.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.suicidalBehavior.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.suicidalBehavior.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.suicidalBehavior.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.suicidalBehavior.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.suicidalBehavior.title",
                "Suicidal Behaviour"
              ),
              Q_id: "8",
              Name: t(
                "scanQuestions.suicidalBehavior.questions.8",
                "How frequently do you experience intense mood swings?"
              ),
              "Option 1": t(
                "scanQuestions.suicidalBehavior.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.suicidalBehavior.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.suicidalBehavior.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.suicidalBehavior.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.suicidalBehavior.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t(
                "scanQuestions.suicidalBehavior.title",
                "Suicidal Behaviour"
              ),
              Q_id: "9",
              Name: t(
                "scanQuestions.suicidalBehavior.questions.9",
                "How often do you feel trapped or like there's no way out of your current situation?"
              ),
              "Option 1": t(
                "scanQuestions.suicidalBehavior.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.suicidalBehavior.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.suicidalBehavior.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.suicidalBehavior.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.suicidalBehavior.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t(
                "scanQuestions.suicidalBehavior.title",
                "Suicidal Behaviour"
              ),
              Q_id: "10",
              Name: t(
                "scanQuestions.suicidalBehavior.questions.10",
                "How frequently do you think about specific ways to end your life?"
              ),
              "Option 1": t(
                "scanQuestions.suicidalBehavior.options.never",
                "Never"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.suicidalBehavior.options.rarely",
                "Rarely"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.suicidalBehavior.options.sometimes",
                "Sometimes"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.suicidalBehavior.options.often",
                "Often"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.suicidalBehavior.options.always",
                "Always"
              ),
              "Option 5 Weight": "5",
            },
          ],
        ],
      },
      {
        Stress: [
          [
            {
              filename: t("scanQuestions.stress.title", "Stress"),
              Q_id: "1",
              Name: t(
                "scanQuestions.stress.questions.1",
                "I frequently experience headaches or migraines."
              ),
              "Option 1": t(
                "scanQuestions.stress.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.stress.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t("scanQuestions.stress.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.stress.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.stress.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t("scanQuestions.stress.title", "Stress"),
              Q_id: "2",
              Name: t(
                "scanQuestions.stress.questions.2",
                "I often feel fatigued or exhausted, even after a full night's sleep."
              ),
              "Option 1": t(
                "scanQuestions.stress.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.stress.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t("scanQuestions.stress.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.stress.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.stress.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t("scanQuestions.stress.title", "Stress"),
              Q_id: "3",
              Name: t(
                "scanQuestions.stress.questions.3",
                "I feel overwhelmed by my responsibilities and tasks."
              ),
              "Option 1": t(
                "scanQuestions.stress.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.stress.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t("scanQuestions.stress.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.stress.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.stress.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t("scanQuestions.stress.title", "Stress"),
              Q_id: "4",
              Name: t(
                "scanQuestions.stress.questions.4",
                "I often feel irritable or short-tempered."
              ),
              "Option 1": t(
                "scanQuestions.stress.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.stress.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t("scanQuestions.stress.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.stress.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.stress.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t("scanQuestions.stress.title", "Stress"),
              Q_id: "5",
              Name: t(
                "scanQuestions.stress.questions.5",
                "I have difficulty concentrating or focusing on tasks."
              ),
              "Option 1": t(
                "scanQuestions.stress.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.stress.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t("scanQuestions.stress.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.stress.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.stress.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t("scanQuestions.stress.title", "Stress"),
              Q_id: "6",
              Name: t(
                "scanQuestions.stress.questions.6",
                "I find myself worrying excessively about various aspects of my life."
              ),
              "Option 1": t(
                "scanQuestions.stress.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.stress.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t("scanQuestions.stress.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.stress.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.stress.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t("scanQuestions.stress.title", "Stress"),
              Q_id: "7",
              Name: t(
                "scanQuestions.stress.questions.7",
                "I have noticed changes in my eating habits, such as overeating or loss of appetite."
              ),
              "Option 1": t(
                "scanQuestions.stress.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.stress.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t("scanQuestions.stress.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.stress.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.stress.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t("scanQuestions.stress.title", "Stress"),
              Q_id: "8",
              Name: t(
                "scanQuestions.stress.questions.8",
                "I find myself withdrawing from social activities or interactions."
              ),
              "Option 1": t(
                "scanQuestions.stress.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.stress.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t("scanQuestions.stress.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.stress.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.stress.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t("scanQuestions.stress.title", "Stress"),
              Q_id: "9",
              Name: t(
                "scanQuestions.stress.questions.9",
                "I have trouble falling asleep or staying asleep throughout the night."
              ),
              "Option 1": t(
                "scanQuestions.stress.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.stress.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t("scanQuestions.stress.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.stress.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.stress.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t("scanQuestions.stress.title", "Stress"),
              Q_id: "10",
              Name: t(
                "scanQuestions.stress.questions.10",
                "I often wake up feeling unrefreshed or unrested."
              ),
              "Option 1": t(
                "scanQuestions.stress.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.stress.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t("scanQuestions.stress.options.neutral", "Neutral"),
              "Option 3 Weight": "3",
              "Option 4": t("scanQuestions.stress.options.agree", "Agree"),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.stress.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
        ],
      },
      {
        [t("scanQuestions.jobInsecurity.title", "Job Insecurity")]: [
          [
            {
              filename: t("scanQuestions.jobInsecurity.title", "Job Insecurity"),
              Q_id: "1",
              Name: t(
                "scanQuestions.jobInsecurity.questions.1",
                "My job is likely to exist in its current form in the next year."
              ),
              "Option 1": t(
                "scanQuestions.jobInsecurity.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.jobInsecurity.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.jobInsecurity.options.neutral",
                "Neither Agree nor Disagree"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.jobInsecurity.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.jobInsecurity.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t("scanQuestions.jobInsecurity.title", "Job Insecurity"),
              Q_id: "2",
              Name: t(
                "scanQuestions.jobInsecurity.questions.2",
                "I am concerned about the possibility of being laid off or downsized in the near future."
              ),
              "Option 1": t(
                "scanQuestions.jobInsecurity.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.jobInsecurity.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.jobInsecurity.options.neutral",
                "Neither Agree nor Disagree"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.jobInsecurity.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.jobInsecurity.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t("scanQuestions.jobInsecurity.title", "Job Insecurity"),
              Q_id: "3",
              Name: t(
                "scanQuestions.jobInsecurity.questions.3",
                "I feel confident that my employer will continue to need my skills and expertise."
              ),
              "Option 1": t(
                "scanQuestions.jobInsecurity.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.jobInsecurity.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.jobInsecurity.options.neutral",
                "Neither Agree nor Disagree"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.jobInsecurity.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.jobInsecurity.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t("scanQuestions.jobInsecurity.title", "Job Insecurity"),
              Q_id: "4",
              Name: t(
                "scanQuestions.jobInsecurity.questions.4",
                "I worry that my job could be outsourced or replaced by technology."
              ),
              "Option 1": t(
                "scanQuestions.jobInsecurity.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.jobInsecurity.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.jobInsecurity.options.neutral",
                "Neither Agree nor Disagree"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.jobInsecurity.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.jobInsecurity.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t("scanQuestions.jobInsecurity.title", "Job Insecurity"),
              Q_id: "5",
              Name: t(
                "scanQuestions.jobInsecurity.questions.5",
                "I am certain that I could find a comparable job quickly if I were to lose my current one."
              ),
              "Option 1": t(
                "scanQuestions.jobInsecurity.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "5",
              "Option 2": t(
                "scanQuestions.jobInsecurity.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "4",
              "Option 3": t(
                "scanQuestions.jobInsecurity.options.neutral",
                "Neither Agree nor Disagree"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.jobInsecurity.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "2",
              "Option 5": t(
                "scanQuestions.jobInsecurity.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "1",
            },
            {
              filename: t("scanQuestions.jobInsecurity.title", "Job Insecurity"),
              Q_id: "6",
              Name: t(
                "scanQuestions.jobInsecurity.questions.6",
                "I frequently hear rumors or discussions at work about potential organizational changes that could affect my job."
              ),
              "Option 1": t(
                "scanQuestions.jobInsecurity.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.jobInsecurity.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.jobInsecurity.options.neutral",
                "Neither Agree nor Disagree"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.jobInsecurity.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.jobInsecurity.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t("scanQuestions.jobInsecurity.title", "Job Insecurity"),
              Q_id: "7",
              Name: t(
                "scanQuestions.jobInsecurity.questions.7",
                "I feel my current job situation is impacting my family harmony and environment."
              ),
              "Option 1": t(
                "scanQuestions.jobInsecurity.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.jobInsecurity.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.jobInsecurity.options.neutral",
                "Neither Agree nor Disagree"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.jobInsecurity.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.jobInsecurity.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t("scanQuestions.jobInsecurity.title", "Job Insecurity"),
              Q_id: "8",
              Name: t(
                "scanQuestions.jobInsecurity.questions.8",
                "I feel that my current job depends on my ability to consistently outperform my colleagues."
              ),
              "Option 1": t(
                "scanQuestions.jobInsecurity.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.jobInsecurity.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.jobInsecurity.options.neutral",
                "Neither Agree nor Disagree"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.jobInsecurity.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.jobInsecurity.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
          [
            {
              filename: t("scanQuestions.jobInsecurity.title", "Job Insecurity"),
              Q_id: "9",
              Name: t(
                "scanQuestions.jobInsecurity.questions.9",
                "I fear losing my job now will severely affect my current financial conditions."
              ),
              "Option 1": t(
                "scanQuestions.jobInsecurity.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.jobInsecurity.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.jobInsecurity.options.neutral",
                "Neither Agree nor Disagree"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.jobInsecurity.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.jobInsecurity.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
            {
              filename: t("scanQuestions.jobInsecurity.title", "Job Insecurity"),
              Q_id: "10",
              Name: t(
                "scanQuestions.jobInsecurity.questions.10",
                "My job situation and current market conditions are severely affecting my mental health."
              ),
              "Option 1": t(
                "scanQuestions.jobInsecurity.options.stronglyDisagree",
                "Strongly Disagree"
              ),
              "Option 1 Weight": "1",
              "Option 2": t(
                "scanQuestions.jobInsecurity.options.disagree",
                "Disagree"
              ),
              "Option 2 Weight": "2",
              "Option 3": t(
                "scanQuestions.jobInsecurity.options.neutral",
                "Neither Agree nor Disagree"
              ),
              "Option 3 Weight": "3",
              "Option 4": t(
                "scanQuestions.jobInsecurity.options.agree",
                "Agree"
              ),
              "Option 4 Weight": "4",
              "Option 5": t(
                "scanQuestions.jobInsecurity.options.stronglyAgree",
                "Strongly Agree"
              ),
              "Option 5 Weight": "5",
            },
          ],
        ],
      },
    ],
    [] // Removed unnecessary locale dependency
  ); // Dependency on locale to recreate when language changes

  // Initialize state with default values
  const [question1, setQuestion1] = useState<string>("");
  const [question2, setQuestion2] = useState<string>("");
  const [pairIndex, setPairdex] = useState<number>(0);
  const [answer1, setAnswer1] = useState<string>("");
  const [answer2, setAnswer2] = useState<string>("");
  const [progress, setProgress] = useState(1 / 5);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // State to accumulate all answers as user progresses
  const [allAnswers, setAllAnswers] = useState<Record<string, string>>({});
  const [allQuestions, setAllQuestions] = useState<Record<string, string>>({});

  // Find question data using useMemo to ensure it updates when locale changes
  const questionData = useMemo(() => {
    let data;
    if (questionScreen) {
      // Try to find by questionScreen parameter passed from ScanIntro
      const matchingDataByScreen = ScreenQuestionData.find((item) => {
        return Object.keys(item).some((key) =>
          key
            .toLowerCase()
            .includes(questionScreen.toLowerCase().replace("Question", ""))
        );
      });
      if (matchingDataByScreen) {
        data = matchingDataByScreen;
      }
    }

    // Fallback to finding by scanName if no match by questionScreen
    if (!data) {
      // First try direct match with scanName
      data = ScreenQuestionData.find(
        (item): item is QuestionSet => scanName in item
      );

      // If not found, try to match by English titles to translated titles
      if (!data) {
        // Create mapping from English names to translated keys
        const englishToTranslatedMapping: { [key: string]: string } = {
          Addictions: t("scanQuestions.addictions.title", "Addictions"),
          "Anger Management": t(
            "scanQuestions.angerManagement.title",
            "Anger Management"
          ),
          "Common Psychological Issues": t(
            "scanQuestions.commonPsychologicalIssues.title",
            "Common Psychological Issues"
          ),
          "Environment Issues Affecting Mental Wellbeing": t(
            "scanQuestions.environmentIssues.title",
            "Environment Issues Affecting Mental Wellbeing"
          ),
          "Family and Relationship": t(
            "scanQuestions.familyRelationship.title",
            "Family and Relationship"
          ),
          "Financial Mental Health": t(
            "scanQuestions.financialMentalHealth.title",
            "Financial Mental Health"
          ),
          "General Physical Fitness": t(
            "scanQuestions.generalPhysicalFitness.title",
            "General Physical Fitness"
          ),
          "Internet and Social Media Issue": t(
            "scanQuestions.internetSocialMedia.title",
            "Internet and Social Media Issue"
          ),
          "Internet Dependence": t(
            "scanQuestions.internetDependence.title",
            "Internet Dependence"
          ),
          "Job Insecurity": t(
            "scanQuestions.jobInsecurity.title",
            "Job Insecurity"
          ),
          "Professional Mental Health": t(
            "scanQuestions.professionalMentalHealth.title",
            "Professional Mental Health"
          ),
          "Sex Life": t("scanQuestions.sexLife.title", "Sex Life"),
          Sleep: t("scanQuestions.sleep.title", "Sleep"),
          "Social Mental Health": t(
            "scanQuestions.socialMentalHealth.title",
            "Social Mental Health"
          ),
          Stress: t("scanQuestions.stress.title", "Stress"),
          "Suicidal Behaviour": t(
            "scanQuestions.suicidalBehavior.title",
            "Suicidal Behaviour"
          ),
          "Youngster Issues": t(
            "scanQuestions.youngsterIssues.title",
            "Youngster Issues"
          ),
        };

        const translatedTitle = englishToTranslatedMapping[scanName];
        if (translatedTitle) {
          data = ScreenQuestionData.find(
            (item): item is QuestionSet => translatedTitle in item
          );
        }
      }
    }

    return data;
  }, [scanName, questionScreen, ScreenQuestionData]); // Add ScreenQuestionData dependency

  const title = questionData
    ? Object.keys(questionData)[0]
    : getTranslatedScanName(scanName as string);
  const questions = questionData?.[title as keyof typeof questionData];

  // Function to load answers for a specific question pair (temporarily simplified)
  const loadAnswersForPair = useCallback(
    async (pairIdx: number) => {
      if (!questions) return false;
      try {
        setIsLoading(true);
        
        // For now, since we're not saving individual pairs, just reset answers
        // In the future, we could load from a completed scan if it exists
        setAnswer1("");
        setAnswer2("");
        
        return true;
      } catch (error) {
        console.error(`Error loading answers for pair ${pairIdx}:`, error);
        // Reset answers on error
        setAnswer1("");
        setAnswer2("");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [questions]
  );

  // Function to find the furthest answered question pair (temporarily simplified)
  const findFurthestAnsweredPair = useCallback(async (): Promise<number> => {
    if (!questions) return 0;

    try {
      // For now, always start from the beginning since we're not saving individual pairs
      // In the future, we could check for a completed scan and resume from there
      return 0;
    } catch (error) {
      console.error("Error finding furthest answered pair:", error);
      return 0;
    }
  }, [questions]);

  // Effect to update questions when pair index changes or when language changes
  useEffect(() => {
    if (questions && questions.length > 0 && questions[pairIndex]) {
      setProgress((pairIndex + 1) / questions.length);
      setQuestion1(questions[pairIndex][0].Name);
      setQuestion2(questions[pairIndex][1].Name);
    }
  }, [pairIndex, questions, locale]); // Add locale as dependency to re-render on language change

  // Effect to load initial answers and restore progress when component mounts
  useEffect(() => {
    const initializeQuestions = async () => {
      if (!questions || isInitialized) return;

      try {
        setIsLoading(true);

        // Find the furthest pair that has been answered
        const lastAnsweredPair = await findFurthestAnsweredPair();

        // If we found saved answers, set the pair index to that position + 1
        // (to continue from the next unanswered question)
        // If it's the last question, stay there to let user review or submit
        if (lastAnsweredPair >= 0 && lastAnsweredPair < questions.length - 1) {
          // Go to the next unanswered question
          setPairdex(lastAnsweredPair);
          await loadAnswersForPair(lastAnsweredPair);
        } else {
          // No progress found or we're at the last question, start from the beginning
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
  }, [
    title,
    questions,
    isInitialized,
    findFurthestAnsweredPair,
    loadAnswersForPair,
  ]);

  // Function to save answers for the current pair
  const saveCurrentAnswers = async (): Promise<boolean> => {
    if (!questions) return false;

    try {
      // If answers aren't selected, don't save
      if (!answer1 || !answer2) {
        return false;
      }

      const currentQuestions = questions[pairIndex];
      
      // Store answers in accumulated state
      const answer1Key = `answer${pairIndex * 2 + 1}_score`;
      const answer2Key = `answer${pairIndex * 2 + 2}_score`;
      const question1Key = `question${pairIndex * 2 + 1}`;
      const question2Key = `question${pairIndex * 2 + 2}`;
      
      setAllAnswers(prev => ({
        ...prev,
        [answer1Key]: answer1,
        [answer2Key]: answer2
      }));
      
      setAllQuestions(prev => ({
        ...prev,
        [question1Key]: currentQuestions[0]["Name"],
        [question2Key]: currentQuestions[1]["Name"]
      }));
      
      console.log("Pair answers captured:", {
        pairIndex,
        answer1,
        answer2,
        questions: [
          currentQuestions[0]["Name"],
          currentQuestions[1]["Name"]
        ]
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

      // Validate that answers have been selected
      if (!answer1 || !answer2) {
        Alert.alert(
          t("eqTest.missingResponseTitle"),
          t("eqTest.missingBothResponsesMessage")
        );
        setIsLoading(false);
        return;
      }

      // Save current answers
      const saveSuccess = await saveCurrentAnswers();

      if (!saveSuccess) {
        Alert.alert(t("eqTest.errorTitle"), t("eqTest.saveErrorMessage"));
        setIsLoading(false);
        return;
      }

      // Move to the next question pair if available
      if (questions && pairIndex < questions.length - 1) {
        // Go to next question pair
        const nextPairIndex = pairIndex + 1;
        setPairdex(nextPairIndex);

        // Load answers for the next pair using our centralized function
        await loadAnswersForPair(nextPairIndex);
      } else if (questions && pairIndex === questions.length - 1) {
        // This is the last question pair, navigate to results
        // This is the last question pair, collect all scores and navigate to results
        // Collect all scores from all questions
        let totalScore = 0;
        let allScores = [];

        // Function to save complete scan data
        const saveCompleteScan = async (finalScore: number) => {
          try {
            // Create complete scan data object
            const scanData: ScanAnswerFull = {
              scan_title: title,
              answer1_score: allAnswers.answer1_score || '',
              question1: allQuestions.question1 || '',
              answer2_score: allAnswers.answer2_score || '',
              question2: allQuestions.question2 || '',
              answer3_score: allAnswers.answer3_score || '',
              question3: allQuestions.question3 || '',
              answer4_score: allAnswers.answer4_score || '',
              question4: allQuestions.question4 || '',
              answer5_score: allAnswers.answer5_score || '',
              question5: allQuestions.question5 || '',
              answer6_score: allAnswers.answer6_score || '',
              question6: allQuestions.question6 || '',
              answer7_score: allAnswers.answer7_score || '',
              question7: allQuestions.question7 || '',
              answer8_score: allAnswers.answer8_score || '',
              question8: allQuestions.question8 || '',
              answer9_score: allAnswers.answer9_score || '',
              question9: allQuestions.question9 || '',
              answer10_score: allAnswers.answer10_score || '',
              question10: allQuestions.question10 || '',
              pair_index: questions.length - 1,
              scan_date: new Date().toLocaleDateString(),
              scan_time: new Date().toLocaleTimeString(),
              total_score: finalScore.toString(),
              result: '', // Will be calculated based on score
              interventions: null,
            };

            console.log('=== ScanQuestions: Preparing to save complete scan ===');
            console.log('Title:', title);
            console.log('Final Score:', finalScore);
            console.log('Questions Length:', questions.length);

            await saveScanAnswers(scanData);
            console.log('=== ScanQuestions: Complete scan saved successfully ===');
          } catch (error) {
            console.error('Error saving complete scan:', error);
            throw error;
          }
        };

        // Function to get and process all scores
        const processAllScores = async () => {
          try {
            if (!questions) return;
            
            // Make sure we save the current answers first
            await saveCurrentAnswers();
            
            // Process all accumulated answers
            for (let i = 0; i < questions.length; i++) {
              const answer1Key = `answer${i * 2 + 1}_score`;
              const answer2Key = `answer${i * 2 + 2}_score`;
              
              const answer1Value = allAnswers[answer1Key];
              const answer2Value = allAnswers[answer2Key];

              if (answer1Value && answer2Value) {
                // Convert string scores to numbers
                const score1 = Number(answer1Value);
                const score2 = Number(answer2Value);

                // Apply the formula: multiply by 2 and divide by 10
                const processedScore1 = score1 * 2;
                const processedScore2 = score2 * 2;

                // Add to our tracking arrays
                allScores.push(processedScore1, processedScore2);
                totalScore += processedScore1 + processedScore2;
              }
            }
            
            // Now save the complete scan to the database
            await saveCompleteScan(totalScore);

            // Log the calculated score

            // Navigate to results screen with the score data
            //@ts-ignore
            navigation.navigate("ScanResult", {
              scanName,
              totalScore: totalScore,
              // allScores: allScores,
            });
          } catch (error) {
            console.error("Error processing scores:", error);
            Alert.alert(
              t("eqTest.errorTitle"),
              t("eqTest.resultsErrorMessage")
            );
          }
        };

        // Process scores and navigate
        processAllScores();

        // navigation.navigate("ScanResults");
      }
    } catch (error) {
      console.error("Error in handleSaveAndProceed:", error);
      Alert.alert(t("eqTest.errorTitle"), t("eqTest.unexpectedErrorMessage"));
    } finally {
      setIsLoading(false);
    }
  }; // Function to handle going back to previous question set
  const goBack = async () => {
    try {
      setIsLoading(true);
      if (pairIndex > 0) {
        // Save current answers before going back (if any are selected)
        if (answer1 && answer2) {
          await saveCurrentAnswers();
        }

        // Go to previous question pair
        const previousPairIndex = pairIndex - 1;
        setPairdex(previousPairIndex);

        // Update progress bar
        if (questions) {
          setProgress((previousPairIndex + 1) / questions.length);
        }

        // Load answers for the previous pair using our centralized function
        await loadAnswersForPair(previousPairIndex);
      } else {
        // We're at the first question, ask for confirmation before exiting
        Alert.alert(t("eqTest.exitScanTitle"), t("eqTest.exitScanMessage"), [
          {
            text: t("eqTest.cancel"),
            style: "cancel",
            onPress: () => setIsLoading(false),
          },
          {
            text: t("eqTest.saveAndExit"),
            onPress: () => {
              setIsLoading(false);
              navigation.goBack();
            },
          },
        ]);
        return; // Return early since we're handling loading state in Alert callbacks
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
  };

  // Return loading or error state if questions not available
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
      {/* Progress bar */}
      <View style={{ width: "70%", alignSelf: "center", marginBottom: 20, marginTop: 20 }}>
        <ProgressBar progress={progress} />
        <Text style={styles.progressText}>{`Question Set ${
          pairIndex + 1
        } of ${questions.length}`}</Text>
      </View>

      {/* Loading indicator */}
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
        {/* Use TitleText component instead of basic Text */}
        <TitleText>{title}</TitleText>

          {/* Render the first question from the pair */}
          <LabelText>{question1}</LabelText>
          <RadioButtonGroup
            options={[
              questions[pairIndex][0]["Option 1"],
              questions[pairIndex][0]["Option 2"],
              questions[pairIndex][0]["Option 3"],
              questions[pairIndex][0]["Option 4"],
              questions[pairIndex][0]["Option 5"]
            ]}
            selectedValue={
              answer1 === questions[pairIndex][0]["Option 1 Weight"] ? questions[pairIndex][0]["Option 1"] :
              answer1 === questions[pairIndex][0]["Option 2 Weight"] ? questions[pairIndex][0]["Option 2"] :
              answer1 === questions[pairIndex][0]["Option 3 Weight"] ? questions[pairIndex][0]["Option 3"] :
              answer1 === questions[pairIndex][0]["Option 4 Weight"] ? questions[pairIndex][0]["Option 4"] :
              answer1 === questions[pairIndex][0]["Option 5 Weight"] ? questions[pairIndex][0]["Option 5"] : ""
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

          {/* Render the second question from the pair */}
          <LabelText>{question2}</LabelText>
          <RadioButtonGroup
            options={[
              questions[pairIndex][1]["Option 1"],
              questions[pairIndex][1]["Option 2"],
              questions[pairIndex][1]["Option 3"],
              questions[pairIndex][1]["Option 4"],
              questions[pairIndex][1]["Option 5"]
            ]}
            selectedValue={
              answer2 === questions[pairIndex][1]["Option 1 Weight"] ? questions[pairIndex][1]["Option 1"] :
              answer2 === questions[pairIndex][1]["Option 2 Weight"] ? questions[pairIndex][1]["Option 2"] :
              answer2 === questions[pairIndex][1]["Option 3 Weight"] ? questions[pairIndex][1]["Option 3"] :
              answer2 === questions[pairIndex][1]["Option 4 Weight"] ? questions[pairIndex][1]["Option 4"] :
              answer2 === questions[pairIndex][1]["Option 5 Weight"] ? questions[pairIndex][1]["Option 5"] : ""
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

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            label={t("scanQuestions.ui.saveAndProceed")}
            callback={handleSaveAndProceed}
          />
          <SecondaryButton
            label={t("scanQuestions.ui.back")}
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
    backgroundColor: "#f8f9fa", // Match SelfOnboarding background
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
    width: "88%" 
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
  // Remove custom styles that are now handled by components
  // title: removed - using TitleText component
  // label: removed - using LabelText component  
  // radioItem, radioText, radioButtonWrapper, radioGroup, radioButton, radioButtonSelected: removed - using RadioButtonGroup component
});
