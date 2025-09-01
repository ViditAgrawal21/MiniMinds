import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import i18n, { t } from "@/i18n/locales/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to get translated questions for each test
const getTranslatedQuestions = (testId: number) => {
  const testKeys = ['empathy', 'motivation', 'selfAwareness', 'selfRegulation', 'socialSkills'];
  const testKey = testKeys[testId - 1];
  
  if (!testKey) return [];
  
  const pairs = [];
  for (let i = 1; i <= 5; i++) {
    const pair = [];
    const question1 = t(`eqTest.questions.${testKey}.pair${i}.question1`);
    const question2 = t(`eqTest.questions.${testKey}.pair${i}.question2`);
    
    if (question1 && question2) {
      pair.push({
        id: (i - 1) * 2 + 1,
        question: question1,
        options: [
          { label: t("eqTest.questions.options.stronglyDisagree"), value: "1" },
          { label: t("eqTest.questions.options.disagree"), value: "2" },
          { label: t("eqTest.questions.options.neutral"), value: "3" },
          { label: t("eqTest.questions.options.agree"), value: "4" },
          { label: t("eqTest.questions.options.stronglyAgree"), value: "5" },
        ],
      });
      
      pair.push({
        id: (i - 1) * 2 + 2,
        question: question2,
        options: [
          { label: t("eqTest.questions.options.stronglyDisagree"), value: "1" },
          { label: t("eqTest.questions.options.disagree"), value: "2" },
          { label: t("eqTest.questions.options.neutral"), value: "3" },
          { label: t("eqTest.questions.options.agree"), value: "4" },
          { label: t("eqTest.questions.options.stronglyAgree"), value: "5" },
        ],
      });
      
      pairs.push(pair);
    }
  }
  
  return pairs;
};

// Questions structured in pairs like in ScanQuestions.tsx
const EQ_TEST_QUESTIONS = {
  1: [ // Empathy EQ - Pairs of questions
    [
      {
        id: 1,
        question: "I find it easy to see things from another person's point of view.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 2,
        question: "I can accurately identify the emotions someone else is experiencing.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 3,
        question: "I often feel compassion for people who are going through difficult times.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 4,
        question: "When someone shares their feelings with me, I often feel those emotions myself.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 5,
        question: "I am good at reading other people's body language and facial expressions.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 6,
        question: "I make an effort to listen carefully when someone is talking about their feelings.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 7,
        question: "I often find myself offering support to others when they are upset.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 8,
        question: "I can manage my own emotions when I am trying to help someone else with theirs.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 9,
        question: "I am aware of how my actions affect the emotions of those around me.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 10,
        question: "Even in disagreements, I try to understand the other person's perspective.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ]
  ],
  2: [ // Motivation EQ - Placeholder pairs
    [
      {
        id: 1,
        question: "I set specific and challenging goals for myself regularly.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 2,
        question: "I continue working towards my goals even when faced with obstacles.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 3,
        question: "I maintain a positive outlook on achieving my goals, even in difficult situations.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 4,
        question: "I take the initiative to start new projects or tasks without needing external prompts.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 5,
        question: "I am committed to my personal and professional development.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 6,
        question: "I quickly recover from setbacks and continue pursuing my objectives.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 7,
        question: "I am motivated by personal satisfaction and the joy of accomplishment rather than external rewards.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 8,
        question: "I frequently encourage myself to stay focused and motivated.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 9,
        question: "I am willing to adjust my strategies to achieve my goals when necessary.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 10,
        question: "I actively seek out new learning opportunities to enhance my skills and knowledge.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ]
  ],
  3: [ // Self-awareness EQ - Placeholder pairs
    [
      {
        id: 1,
        question: "I am aware of my strengths and weaknesses.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 2,
        question: "I regularly reflect on my thoughts and feelings.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 3,
        question: "I understand how my emotions influence my behavior.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 4,
        question: "I can accurately describe how I am feeling at any given moment.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 5,
        question: "I am open to feedback about my behavior and performance.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 6,
        question: "I recognize the impact of my actions on others.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 7,
        question: "I am able to identify my emotional triggers.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 8,
        question: "I take responsibility for my emotions and actions.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 9,
        question: "I am aware of how my mood affects my decision-making.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 10,
        question: "I actively seek to understand my personal values and beliefs.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ]
  ],
  4: [ // Self-regulation EQ - Placeholder pairs
    [
      {
        id: 1,
        question: "I am able to remain calm even when I am faced with stressful situations.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 2,
        question: "I think carefully before making decisions, especially in emotionally charged situations.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 3,
        question: "I can easily adjust my plans when unexpected changes occur.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 4,
        question: "I recover quickly from setbacks or disappointments.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 5,
        question: "I have effective strategies for managing stress in my life.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 6,
        question: "I am able to resist temptations that could lead to negative outcomes.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 7,
        question: "I stay focused on my goals even when distractions arise.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 8,
        question: "I am aware of my emotions and how they influence my behavior.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 9,
        question: "I am patient and can wait for the right moment to act.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 10,
        question: "I regularly reflect on my actions and learn from my experiences.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ]
  ],
  5: [ // Social skills EQ - Placeholder pairs
    [
      {
        id: 1,
        question: "I actively listen to others and make an effort to understand their perspectives before responding.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 2,
        question: "I can easily put myself in someone else's shoes and understand their feelings and emotions.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 3,
        question: "I express my thoughts and feelings clearly and effectively in social situations.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 4,
        question: "I handle conflicts and disagreements in a calm and constructive manner.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 5,
        question: "I am aware of and can accurately interpret nonverbal cues, such as body language and facial expressions, in social interactions.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 6,
        question: "I find it easy to establish and maintain positive relationships with others.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 7,
        question: "I work well in a team setting, contributing to group goals while respecting others' opinions and ideas.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 8,
        question: "I can easily adapt my communication style to suit different social situations and audiences.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ],
    [
      {
        id: 9,
        question: "I am able to positively influence others' opinions and actions through my interactions.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      },
      {
        id: 10,
        question: "I am aware of the social dynamics and unwritten rules in different social settings and adjust my behavior accordingly.",
        options: [
          { label: "Strongly Disagree", value: "1" },
          { label: "Disagree", value: "2" },
          { label: "Neutral", value: "3" },
          { label: "Agree", value: "4" },
          { label: "Strongly Agree", value: "5" },
        ],
      }
    ]
  ],
};

// Async Storage keys
const getStorageKey = (testId: number, pairIndex: number) => 
  `eq_test_${testId}_pair_${pairIndex}`;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function EQTestQuestionsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Get test parameters from navigation
  const params = route.params as { testId: number; testTitle: string } || { testId: 1, testTitle: "EQ Test" };
  const testId = params.testId;
  const testTitle = params.testTitle;

  // State for the questions
  const [pairIndex, setPairIndex] = useState(0);
  const [answer1, setAnswer1] = useState<string>("");
  const [answer2, setAnswer2] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Get questions for this test - using translated questions
  const questionPairs = getTranslatedQuestions(testId);
  const currentPair = questionPairs[pairIndex] || [];
  const progress = (pairIndex + 1) / questionPairs.length;

  // Load saved answers when pair changes
  useEffect(() => {
    loadSavedAnswers();
  }, [pairIndex, testId]);

  const loadSavedAnswers = async () => {
    try {
      setIsLoading(true);
      const key = getStorageKey(testId, pairIndex);
      const savedAnswers = await AsyncStorage.getItem(key);
      
      if (savedAnswers) {
        const { answer1, answer2 } = JSON.parse(savedAnswers);
        setAnswer1(answer1);
        setAnswer2(answer2);
      } else {
        // Reset answers if no saved answers found
        setAnswer1("");
        setAnswer2("");
      }
    } catch (error) {
      console.error('Error loading saved answers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAnswers = async () => {
    try {
      if (!answer1 || !answer2) return false;
      
      const key = getStorageKey(testId, pairIndex);
      await AsyncStorage.setItem(key, JSON.stringify({ answer1, answer2 }));
      return true;
    } catch (error) {
      console.error('Error saving answers:', error);
      return false;
    }
  };

  const handleSaveAndProceed = async () => {
    try {
      setIsLoading(true);

      // Validate that answers have been selected
      if (!answer1 || !answer2) {
        Alert.alert(
          t("eqTest.questions.missingAnswersTitle"),
          t("eqTest.questions.missingAnswersMessage")
        );
        setIsLoading(false);
        return;
      }

      // Save current answers
      const saveSuccess = await saveAnswers();
      if (!saveSuccess) {
        Alert.alert(
          t("eqTest.errorTitle"),
          t("eqTest.errorMessage")
        );
        setIsLoading(false);
        return;
      }

      // Move to next question pair if available
      if (pairIndex < questionPairs.length - 1) {
        setPairIndex(pairIndex + 1);
      } else {
        // Test completed - calculate score and navigate
        let totalScore = 0;
        
        try {
          for (let i = 0; i < questionPairs.length; i++) {
            const key = getStorageKey(testId, i);
            const savedAnswers = await AsyncStorage.getItem(key);
            
            if (savedAnswers) {
              const { answer1, answer2 } = JSON.parse(savedAnswers);
              totalScore += (parseInt(answer1) || 0) + (parseInt(answer2) || 0);
            }
          }
          
          // Calculate percentage score (0-100)
          // Each question is worth 5 points max, 10 questions per test = 100 points max
          const maxScore = questionPairs.length * 2 * 5; // pairs × questions per pair × max score per question
          const scorePercentage = Math.round((totalScore / maxScore) * 100);
          
          // Navigate to results screen
          // @ts-ignore
          navigation.navigate("EQTestResult", {
            testId,
            testTitle,
            totalScore: scorePercentage
          });
        } catch (error) {
          console.error('Error calculating score:', error);
          Alert.alert("Error", "There was a problem calculating your results.");
        }
      }
    } catch (error) {
      console.error('Error handling next:', error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = async () => {
    try {
      setIsLoading(true);
      
      // Save current answers before going back (if selected)
      if (answer1 && answer2) {
        await saveAnswers();
      }

      // Go to previous question pair if possible
      if (pairIndex > 0) {
        setPairIndex(pairIndex - 1);
      } else {
        // We're at the first question, go back to test selection
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error handling back:', error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentPair || currentPair.length < 2) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#AB47BC" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Progress bar */}
      <View style={{ width: "70%", alignSelf: "center", marginTop: 20 }}>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${progress * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {t("eqTest.questions.progressText", {
            current: pairIndex + 1,
            total: questionPairs.length,
          })}
        </Text>
      </View>

      {/* Loading indicator */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#AB47BC" />
        </View>
      )}

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Test title */}
        <Text style={styles.title}>{testTitle}</Text>

        {/* First question */}
        <Text style={styles.label}>{currentPair[0].question}</Text>
        <View>
          {currentPair[0].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.radioItem}
              onPress={() => setAnswer1(option.value)}
            >
              <View style={[styles.radioButton, styles.radioButtonWrapper]}>
                <View style={[
                  styles.radioButtonOuter,
                  answer1 === option.value && styles.radioButtonSelected
                ]}>
                  {answer1 === option.value && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </View>
              <Text style={styles.radioText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Second question */}
        <Text style={styles.label}>{currentPair[1].question}</Text>
        <View>
          {currentPair[1].options.map((option, index) => (
            <Pressable
              key={index}
              style={styles.radioItem}
              onPress={() => setAnswer2(option.value)}
            >
              <View style={[styles.radioButton, styles.radioButtonWrapper]}>
                <View style={[
                  styles.radioButtonOuter,
                  answer2 === option.value && styles.radioButtonSelected
                ]}>
                  {answer2 === option.value && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </View>
              <Text style={styles.radioText}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSaveAndProceed}
        >
          <Text style={styles.primaryButtonText}>
            {t("eqTest.questions.saveAndProceed")}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={goBack}
        >
          <Text style={styles.secondaryButtonText}>
            {t("eqTest.questions.back")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: { 
    flex: 1, 
    marginBottom: 20 
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#A63BAA",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 15,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#A63BAA",
    fontWeight: "500",
    marginBottom: 8,
    marginTop: 25,
    marginLeft: 15,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: -15,
    marginLeft: 5,
  },
  radioText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    color: "#545353",
    marginLeft: -5,
  },
  radioButtonWrapper: { 
    transform: [{ scale: 0.8 }] 
  },
  radioButton: {
    marginRight: 10,
  },
  radioButtonOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#AB47BC",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  radioButtonSelected: {
    borderColor: "#AB47BC",
  },
  radioButtonInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#AB47BC",
  },
  buttonContainer: {
    height: SCREEN_HEIGHT * 0.15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  progressText: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#888",
    marginTop: 5,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#EEEEEE",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#AB47BC",
    borderRadius: 4,
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
  primaryButton: {
    backgroundColor: "#AB47BC",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "88%",
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#AB47BC",
    backgroundColor: "transparent",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "88%",
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#AB47BC",
  },
}); 