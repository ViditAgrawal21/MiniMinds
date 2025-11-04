import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLanguage } from '@/context/LanguageContext';
import { incrementWellnessScore } from '@/utils/wellnessScore';
import { addGlobalUserXP } from '@/utils/xpSystem';
import ConfettiCannon from 'react-native-confetti-cannon';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.85;

// Import the JSON data
const positiveMentalHealthData = require('@/assets/data/Positive_mental_health/Positive_Mental_Health_Content_Multilingual.json');

type Topic = {
  en: {
    title: string;
    description: string;
    steps?: Array<{ step: number; title: string; description: string }>;
    benefits?: string[];
  };
  hi: {
    title: string;
    description: string;
    steps?: Array<{ step: number; title: string; description: string }>;
    benefits?: string[];
  };
  mr: {
    title: string;
    description: string;
    steps?: Array<{ step: number; title: string; description: string }>;
    benefits?: string[];
  };
};

const STORAGE_KEY = 'positive_mental_health_progress';
const XP_PER_TOPIC = 5;

export default function PositiveMentalHealthScreen() {
  const { locale } = useLanguage();
  const navigation = useNavigation();
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [readTopics, setReadTopics] = useState<Set<number>>(new Set());
  const [totalXPEarned, setTotalXPEarned] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const confettiRef = useRef<any>(null);

  // Load progress from storage
  useFocusEffect(
    useCallback(() => {
      loadProgress();
    }, []),
  );

  const loadProgress = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setReadTopics(new Set(data.readTopics || []));
        setTotalXPEarned(data.totalXPEarned || 0);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const saveProgress = async (updatedReadTopics: Set<number>, xp: number) => {
    try {
      const data = {
        readTopics: Array.from(updatedReadTopics),
        totalXPEarned: xp,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const markTopicAsRead = async (topicIndex: number) => {
    if (!readTopics.has(topicIndex)) {
      const updatedReadTopics = new Set(readTopics);
      updatedReadTopics.add(topicIndex);
      
      const newTotalXP = totalXPEarned + XP_PER_TOPIC;
      
      setReadTopics(updatedReadTopics);
      setTotalXPEarned(newTotalXP);
      
      // Save to storage
      await saveProgress(updatedReadTopics, newTotalXP);
      
      // Add XP to wellness score
      const { newScore, appliedDelta } = await incrementWellnessScore(XP_PER_TOPIC);
      
      // Add XP to global user XP
      const newGlobalXP = await addGlobalUserXP(XP_PER_TOPIC);
      
      // Show success message
      Alert.alert(
        '🎉 Great Job!',
        `You earned ${appliedDelta} XP for reading this topic!\nYour wellness score is now ${newScore}%\nTotal XP: ${newGlobalXP}`,
        [{ text: 'Awesome!', style: 'default' }]
      );
    }
  };

  const openTopicDetail = (topic: any, index: number) => {
    const currentLocale = locale as 'en' | 'hi' | 'mr';
    setSelectedTopic({ ...topic[currentLocale], index });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTopic(null);
  };

  const handleCompletedReading = async () => {
    if (selectedTopic && !readTopics.has(selectedTopic.index)) {
      // Trigger confetti animation
      if (confettiRef.current) {
        confettiRef.current.start();
      }
      
      await markTopicAsRead(selectedTopic.index);
      
      // Close modal after a delay to show confetti
      setTimeout(() => {
        setModalVisible(false);
        setSelectedTopic(null);
      }, 1500);
    }
  };

  const handleUndoReading = async () => {
    if (selectedTopic && readTopics.has(selectedTopic.index)) {
      try {
        const updatedReadTopics = new Set(readTopics);
        updatedReadTopics.delete(selectedTopic.index);
        
        const newTotalXP = Math.max(0, totalXPEarned - XP_PER_TOPIC);
        
        setReadTopics(updatedReadTopics);
        setTotalXPEarned(newTotalXP);

        // Save updated progress
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            readTopics: Array.from(updatedReadTopics),
            totalXPEarned: newTotalXP,
          })
        );

        // Deduct XP from wellness score
        await incrementWellnessScore(-XP_PER_TOPIC);
        
        // Deduct XP from global user XP
        const newGlobalXP = await addGlobalUserXP(-XP_PER_TOPIC);

        Alert.alert(
          'Reading Undone',
          `${XP_PER_TOPIC} XP has been removed from your wellness score.\nTotal XP: ${newGlobalXP}`,
          [{ text: 'OK' }]
        );
      } catch (error) {
        console.error('Error undoing reading:', error);
        Alert.alert('Error', 'Failed to undo reading. Please try again.');
      }
    }
  };

  const getTopicColor = (index: number) => {
    const colors = ['#B0C4DD', '#F0818B', '#F1AB6B', '#D27AD5', '#CB6C46', '#9DABC6'];
    return colors[index % colors.length];
  };

  const renderTopicCard = ({ item, index }: { item: Topic; index: number }) => {
    const currentLocale = locale as 'en' | 'hi' | 'mr';
    const topicData = item[currentLocale];
    const isRead = readTopics.has(index);
    const cardColor = getTopicColor(index);

    return (
      <TouchableOpacity
        style={[styles.topicCard, { backgroundColor: cardColor }]}
        onPress={() => openTopicDetail(item, index)}
        activeOpacity={0.9}
      >
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Icon 
              name={
                index === 0 ? "compass" : 
                index === 1 ? "people" : 
                index === 2 ? "chatbubbles" : 
                index === 3 ? "leaf" : 
                index === 4 ? "heart" : "star"
              } 
              size={32} 
              color="#FFFFFF" 
            />
          </View>
          {isRead && (
            <View style={styles.completedBadge}>
              <Icon name="checkmark-circle" size={24} color="#4CAF50" />
            </View>
          )}
        </View>

        <Text style={styles.cardTitle} numberOfLines={3}>
          {topicData.title}
        </Text>
        
        <Text style={styles.cardDescription} numberOfLines={3}>
          {topicData.description}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.xpBadge}>
            <Icon name="flash" size={16} color="#FFD700" />
            <Text style={styles.xpText}>+{XP_PER_TOPIC} XP</Text>
          </View>
          <Icon name="arrow-forward-circle" size={24} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    );
  };

  const renderStepItem = ({ item }: { item: any }) => (
    <View style={styles.stepCard}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{item.step}</Text>
      </View>
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>{item.title}</Text>
        <Text style={styles.stepDescription}>{item.description}</Text>
      </View>
    </View>
  );

  const renderBenefitItem = ({ item }: { item: string }) => (
    <View style={styles.benefitItem}>
      <Icon name="checkmark-circle" size={20} color="#4CAF50" />
      <Text style={styles.benefitText}>{item}</Text>
    </View>
  );

  const progressPercentage = Math.round((readTopics.size / positiveMentalHealthData.topics.length) * 100);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#2B395E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Positive Mental Health</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressTitle}>Your Progress</Text>
            <Text style={styles.progressSubtitle}>
              {readTopics.size} of {positiveMentalHealthData.topics.length} topics completed
            </Text>
          </View>
          <View style={styles.xpContainer}>
            <Icon name="flash" size={20} color="#FFD700" />
            <Text style={styles.totalXP}>{totalXPEarned} XP</Text>
          </View>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
        </View>
        <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
      </View>

      {/* Topics Carousel */}
      <View style={styles.carouselSection}>
        <Text style={styles.sectionTitle}>Explore Topics</Text>
        <Animated.FlatList
          data={positiveMentalHealthData.topics}
          renderItem={renderTopicCard}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        />

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {positiveMentalHealthData.topics.map((_: any, index: number) => {
            const inputRange = [
              (index - 1) * (CARD_WIDTH + 20),
              index * (CARD_WIDTH + 20),
              (index + 1) * (CARD_WIDTH + 20),
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 20, 8],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.paginationDot,
                  {
                    width: dotWidth,
                    opacity,
                    backgroundColor: readTopics.has(index) ? '#4CAF50' : '#D27AD5',
                  },
                ]}
              />
            );
          })}
        </View>
      </View>

      {/* Topic Detail Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={closeModal}
      >
        <SafeAreaView style={styles.modalContainer} edges={['top']}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Icon name="close" size={28} color="#2B395E" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>Topic Details</Text>
            <View style={styles.modalHeaderRight} />
          </View>

          {selectedTopic && (
            <ScrollView 
              style={styles.modalContent} 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScrollContent}
            >
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>{selectedTopic.title}</Text>
                <Text style={styles.modalDescription}>{selectedTopic.description}</Text>
              </View>

              {selectedTopic.steps && selectedTopic.steps.length > 0 && (
                <View style={styles.stepsContainer}>
                  <Text style={styles.sectionTitle}>Steps to Follow</Text>
                  <FlatList
                    data={selectedTopic.steps}
                    renderItem={renderStepItem}
                    keyExtractor={(item) => item.step.toString()}
                    scrollEnabled={false}
                  />
                </View>
              )}

              {selectedTopic.benefits && selectedTopic.benefits.length > 0 && (
                <View style={styles.benefitsContainer}>
                  <Text style={styles.sectionTitle}>Key Benefits</Text>
                  <FlatList
                    data={selectedTopic.benefits}
                    renderItem={renderBenefitItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                  />
                </View>
              )}

              <View style={styles.actionButtonsContainer}>
                {!readTopics.has(selectedTopic.index) ? (
                  <TouchableOpacity 
                    style={styles.completedButton} 
                    onPress={handleCompletedReading}
                  >
                    <Icon name="checkmark-circle" size={24} color="#FFFFFF" />
                    <Text style={styles.completedButtonText}>
                      {`Completed Reading • Earn ${XP_PER_TOPIC} XP`}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.completedActionsContainer}>
                    <View style={styles.alreadyCompletedBadge}>
                      <Icon name="checkmark-done" size={20} color="#4CAF50" />
                      <Text style={styles.alreadyCompletedText}>Already Completed ✓</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.undoButton} 
                      onPress={handleUndoReading}
                    >
                      <Icon name="refresh" size={20} color="#EF4444" />
                      <Text style={styles.undoButtonText}>
                        Undo Reading
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
        
        {/* Confetti Animation */}
        <ConfettiCannon
          ref={confettiRef}
          count={200}
          origin={{ x: SCREEN_WIDTH / 2, y: -10 }}
          autoStart={false}
          fadeOut={true}
          explosionSpeed={350}
          fallSpeed={2500}
          colors={['#4CAF50', '#FFD700', '#FF6B6B', '#4ECDC4', '#95E1D3', '#F38181']}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E1FE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2B395E',
    fontFamily: 'Poppins-Bold',
  },
  headerRight: {
    width: 40,
  },
  progressSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2B395E',
    fontFamily: 'Poppins-Bold',
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  totalXP: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F59E0B',
    marginLeft: 4,
    fontFamily: 'Poppins-Bold',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    textAlign: 'right',
    marginTop: 8,
    fontFamily: 'Poppins-SemiBold',
  },
  carouselSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2B395E',
    fontFamily: 'Poppins-Bold',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  carouselContent: {
    paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2,
  },
  topicCard: {
    width: CARD_WIDTH,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    minHeight: 280,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    marginBottom: 12,
    lineHeight: 26,
  },
  cardDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    opacity: 0.95,
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  xpText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 4,
    fontFamily: 'Poppins-Bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  closeButton: {
    padding: 8,
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2B395E',
    fontFamily: 'Poppins-Bold',
  },
  modalHeaderRight: {
    width: 40,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  modalScrollContent: {
    paddingBottom: 40,
  },
  modalTitleContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2B395E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 12,
    lineHeight: 32,
  },
  modalDescription: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
    lineHeight: 24,
  },
  stepsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 16,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#D27AD5',
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D27AD5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B395E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 6,
  },
  stepDescription: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
  },
  benefitsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 14,
    color: '#166534',
    fontFamily: 'Poppins-Regular',
    marginLeft: 8,
    flex: 1,
  },
  completedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  completedButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    marginLeft: 8,
  },
  completedButtonDisabled: {
    backgroundColor: '#9CA3AF',
    opacity: 0.6,
  },
  actionButtonsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  completedActionsContainer: {
    gap: 12,
  },
  alreadyCompletedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  alreadyCompletedText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
    fontFamily: 'Poppins-Bold',
    marginLeft: 8,
  },
  undoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#EF4444',
  },
  undoButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 8,
  },
});
