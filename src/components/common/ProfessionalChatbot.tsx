import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatbotService, {
  ChatMessage,
  ChatOption,
} from "../../services/chatbotService";

interface ProfessionalChatbotProps {
  visible: boolean;
  onClose: () => void;
  scanName?: string;
  totalScore?: number;
}

const { width: screenWidth } = Dimensions.get("window");

const ProfessionalChatbot: React.FC<ProfessionalChatbotProps> = ({
  visible,
  onClose,
  scanName,
  totalScore,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Handle Android back button
  useEffect(() => {
    const backAction = () => {
      if (visible) {
        handleCloseAttempt();
        return true; // Prevent default behavior
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [visible]);

  // Initialize chatbot when modal opens
  useEffect(() => {
    if (visible && messages.length === 0) {
      initializeChatbot();
    }
  }, [visible]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const initializeChatbot = async () => {
    setIsLoading(true);
    try {
      const greetingMessage = await ChatbotService.getGreetingMessage();

      // Add context about the user's scan if available
      if (scanName && totalScore !== undefined) {
        const contextMessage: ChatMessage = {
          id: (Date.now() - 1).toString(),
          type: "bot",
          content: `I see you just completed your ${scanName} assessment with a score of ${totalScore}. This indicates a ${
            totalScore > 75
              ? "severe"
              : totalScore > 50
              ? "moderate"
              : totalScore > 25
              ? "low"
              : "normal"
          } level of concern. Let me help you connect with the right mental health professional.`,
          timestamp: new Date(),
          options: [],
        };
        setMessages([contextMessage, greetingMessage]);
      } else {
        setMessages([greetingMessage]);
      }
    } catch (error) {
      console.error("Error initializing chatbot:", error);
      // Add error message
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "bot",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
        options: [{ id: "retry", text: "Try Again", action: "greeting" }],
      };
      setMessages([errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = async (option: ChatOption) => {
    // Add user's selection as a message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: option.text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get bot response based on the action
      const botMessages = await ChatbotService.handleAction(
        option.action,
        option.data
      );
      setMessages((prev) => [...prev, ...botMessages]);
    } catch (error) {
      console.error("Error handling option:", error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "bot",
        content:
          "Sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
        options: [{ id: "back", text: "← Back to Menu", action: "greeting" }],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAttempt = () => {
    setShowExitConfirmation(true);
  };

  const confirmExit = () => {
    setShowExitConfirmation(false);
    setMessages([]); // Clear chat history
    onClose();
  };

  const cancelExit = () => {
    setShowExitConfirmation(false);
  };

  const renderMessage = (message: ChatMessage, index: number) => {
    const isBot = message.type === "bot";

    return (
      <View key={message.id} style={styles.messageContainer}>
        <View
          style={[
            styles.messageBubble,
            isBot ? styles.botBubble : styles.userBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isBot ? styles.botText : styles.userText,
            ]}
          >
            {message.content}
          </Text>

          <Text
            style={[
              styles.timestamp,
              isBot ? styles.botTimestamp : styles.userTimestamp,
            ]}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>

        {/* Render options for bot messages */}
        {isBot && message.options && message.options.length > 0 && (
          <View style={styles.optionsContainer}>
            {message.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionButton}
                onPress={() => handleOptionSelect(option)}
                activeOpacity={0.7}
              >
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      {/* Main Chatbot Modal */}
      <Modal
        visible={visible}
        animationType="slide"
        transparent={false}
        presentationStyle="fullScreen"
        onRequestClose={handleCloseAttempt}
      >
        <SafeAreaView style={styles.safeAreaContainer}>
          <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Mental Health Professional</Text>
                <Text style={styles.headerSubtitle}>
                  Connect with qualified experts
                </Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleCloseAttempt}
                  activeOpacity={0.7}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Chat Area */}
              <ScrollView
                ref={scrollViewRef}
                style={styles.chatArea}
                contentContainerStyle={styles.chatContent}
                showsVerticalScrollIndicator={false}
              >
                {messages.map((message, index) => renderMessage(message, index))}

                {/* Loading indicator */}
                {isLoading && (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#AB47BC" />
                    <Text style={styles.loadingText}>Typing...</Text>
                  </View>
                )}
              </ScrollView>

              {/* Footer */}
              <SafeAreaView style={styles.footerSafeArea}>
                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    🔒 Your conversation is secure and confidential
                  </Text>
                </View>
              </SafeAreaView>
            </View>
          </SafeAreaView>
        </SafeAreaView>
      </Modal>

      {/* Exit Confirmation Modal */}
      <Modal
        visible={showExitConfirmation}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelExit}
      >
        <View style={styles.exitModalOverlay}>
          <View style={styles.exitModalContent}>
            <Text style={styles.exitModalTitle}>Leave Conversation?</Text>
            <Text style={styles.exitModalMessage}>
              Are you sure you want to leave this conversation? Your chat
              history will be lost.
            </Text>

            <View style={styles.exitModalButtons}>
              <TouchableOpacity
                style={[styles.exitModalButton, styles.cancelButton]}
                onPress={cancelExit}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Stay</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.exitModalButton, styles.confirmButton]}
                onPress={confirmExit}
                activeOpacity={0.7}
              >
                <Text style={styles.confirmButtonText}>Leave</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#AB47BC", // Purple background for notch area
  },

  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },

  innerContainer: {
    flex: 1,
  },

  header: {
    backgroundColor: "#AB47BC",
    paddingHorizontal: 20,
    paddingVertical: 16,
    position: "relative",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#E1BEE7",
    textAlign: "center",
    marginTop: 4,
  },

  closeButton: {
    position: "absolute",
    right: 20,
    top: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  closeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  chatArea: {
    flex: 1,
  },

  chatContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexGrow: 1,
  },

  messageContainer: {
    marginBottom: 16,
  },

  messageBubble: {
    maxWidth: "85%",
    padding: 12,
    borderRadius: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  botBubble: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
    marginRight: "15%",
  },

  userBubble: {
    backgroundColor: "#AB47BC",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
    marginLeft: "15%",
  },

  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },

  botText: {
    color: "#333",
  },

  userText: {
    color: "#fff",
  },

  timestamp: {
    fontSize: 11,
    marginTop: 4,
    opacity: 0.7,
  },

  botTimestamp: {
    color: "#666",
  },

  userTimestamp: {
    color: "#E1BEE7",
  },

  optionsContainer: {
    marginTop: 8,
    marginLeft: 12,
  },

  optionButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#AB47BC",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 3,
    alignSelf: "flex-start",
    minWidth: 120,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  optionText: {
    color: "#AB47BC",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },

  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginBottom: 16,
    elevation: 1,
  },

  loadingText: {
    marginLeft: 8,
    color: "#666",
    fontSize: 14,
    fontStyle: "italic",
  },

  footer: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },

  footerSafeArea: {
    backgroundColor: "#fff",
  },

  footerText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },

  // Exit Confirmation Modal Styles
  exitModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  exitModalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: screenWidth * 0.85,
    maxWidth: 320,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  exitModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 12,
  },

  exitModalMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },

  exitModalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  exitModalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  cancelButton: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  confirmButton: {
    backgroundColor: "#AB47BC",
  },

  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },

  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfessionalChatbot;
