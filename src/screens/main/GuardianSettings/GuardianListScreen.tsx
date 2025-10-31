import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "@/components/CustomIcon";
import { t } from "@/i18n/locales/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Guardian {
  id: string;
  name: string;
  relation: string;
  email: string;
  phone: string;
  photo?: string;
  isDefault: boolean;
}

interface GuardianListScreenProps {
  navigation?: any;
}

export default function GuardianListScreen({ navigation }: GuardianListScreenProps) {
  const [guardians, setGuardians] = useState<Guardian[]>([]);

  useEffect(() => {
    loadGuardians();
  }, []);

  // Refresh guardians list periodically
  useEffect(() => {
    const interval = setInterval(loadGuardians, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadGuardians = async () => {
    try {
      const stored = await AsyncStorage.getItem("guardians");
      if (stored) {
        const parsedGuardians = JSON.parse(stored);
        setGuardians(parsedGuardians);
      }
    } catch (error) {
      console.error("Error loading guardians:", error);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      t("guardianList.deleteTitle", "Delete Guardian"),
      t(
        "guardianList.deleteMessage",
        "Are you sure you want to delete this guardian?"
      ),
      [
        {
          text: t("common.cancel", "Cancel"),
          style: "cancel",
        },
        {
          text: t("common.delete", "Delete"),
          style: "destructive",
          onPress: async () => {
            try {
              const updated = guardians.filter((g) => g.id !== id);
              await AsyncStorage.setItem("guardians", JSON.stringify(updated));
              setGuardians(updated);
            } catch (error) {
              console.error("Error deleting guardian:", error);
            }
          },
        },
      ]
    );
  };

  const handleEdit = (guardian: Guardian) => {
    navigation.navigate("EditGuardian" as never, { guardian } as never);
  };

  const sendGuardianNotification = async (phoneNumber: string, guardianName: string) => {
    try {
      const message = `Hello ${guardianName}, you have been added as a guardian on MiniMinds app. You will receive notifications about your child's well-being.`;
      
      const apiUrl = `http://bhashsms.com/api/sendmsg.php?user=&pass=123456&sender=Syneptlabs_01&phone=${phoneNumber}&text=${encodeURIComponent(message)}&priority=wa&stype=normal`;
      
      const response = await fetch(apiUrl);
      const result = await response.text();
      
      console.log('SMS API Response:', result);
      return true;
    } catch (error) {
      console.error('Error sending SMS notification:', error);
      return false;
    }
  };

  const handleResendSMS = async (guardian: Guardian) => {
    if (!guardian.phone) {
      Alert.alert(
        t("common.error", "Error"),
        t("guardianList.noPhone", "No phone number available for this guardian")
      );
      return;
    }

    try {
      const success = await sendGuardianNotification(guardian.phone, guardian.name);
      if (success) {
        Alert.alert(
          t("common.success", "Success"),
          t("guardianList.smsSent", "SMS sent successfully to ") + guardian.name
        );
      } else {
        Alert.alert(
          t("common.error", "Error"),
          t("guardianList.smsFailed", "Failed to send SMS. Please try again.")
        );
      }
    } catch (error) {
      Alert.alert(
        t("common.error", "Error"),
        t("guardianList.smsFailed", "Failed to send SMS. Please try again.")
      );
    }
  };

  const renderGuardianCard = ({ item }: { item: Guardian }) => (
    <View
      style={[
        styles.guardianCard,
        item.isDefault && styles.defaultGuardianCard,
      ]}
    >
      <View style={styles.guardianContent}>
        {/* Photo */}
        <View style={styles.photoContainer}>
          {item.photo ? (
            <Image source={{ uri: item.photo }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <CustomIcon type="IO" name="person" size={32} color="#FF8C00" />
            </View>
          )}
        </View>

        {/* Info */}
        <View style={styles.guardianInfo}>
          <Text style={styles.guardianName}>{item.name}</Text>
          <Text style={styles.guardianRelation}>{item.relation}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          {item.phone && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleResendSMS(item)}
            >
              <CustomIcon type="IO" name="mail" size={20} color="#4CAF50" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEdit(item)}
          >
            <CustomIcon type="IO" name="create" size={20} color="#FF8C00" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDelete(item.id)}
          >
            <CustomIcon type="IO" name="trash" size={20} color="#FF4444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* {item.isDefault && (
        <Text style={styles.defaultText}>
          {t(
            "guardianList.defaultNote",
            "*The pink border shows that the guardian is set as default guardian"
          )}
        </Text>
      )} */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <CustomIcon type="IO" name="arrow-back" size={24} color="#2B395E" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>
            {t("guardianList.title", "Guardian List")}
          </Text>
          <Text style={styles.headerSubtitle}>
            {guardians.length}/3 {t("guardianList.guardiansAdded", "Guardians")}
          </Text>
        </View>
      </View>

      {/* Guardian List */}
      <FlatList
        data={guardians}
        renderItem={renderGuardianCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <CustomIcon type="IO" name="people-outline" size={64} color="#CCC" />
            <Text style={styles.emptyText}>
              {t("guardianList.noGuardians", "No guardians added yet")}
            </Text>
            <Text style={styles.emptySubtext}>
              {t(
                "guardianList.addGuardianPrompt",
                "Tap the button below to add a guardian"
              )}
            </Text>
          </View>
        }
      />

      {/* Add Guardian Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.addButton, guardians.length >= 3 && styles.addButtonDisabled]}
          onPress={() => {
            if (guardians.length >= 3) {
              Alert.alert(
                t("common.limit", "Limit Reached"),
                t("guardianList.maxGuardians", "You can only add up to 3 guardians"),
                [{ text: t("common.ok", "OK") }]
              );
            } else {
              navigation.navigate("AddGuardian" as never);
            }
          }}
          disabled={guardians.length >= 3}
        >
          <Text style={[styles.addButtonText, guardians.length >= 3 && styles.addButtonTextDisabled]}>
            {guardians.length >= 3 
              ? t("guardianList.maxReached", "Maximum Guardians Reached (3/3)")
              : t("guardianList.addGuardian", `Add Guardian (${guardians.length}/3)`)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2B395E",
    fontFamily: "Poppins-SemiBold",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    fontFamily: "Poppins-Regular",
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  guardianCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  defaultGuardianCard: {
    borderColor: "#FF8C00",
  },
  guardianContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  photoContainer: {
    marginRight: 12,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  photoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFE4CC",
    justifyContent: "center",
    alignItems: "center",
  },
  guardianInfo: {
    flex: 1,
  },
  guardianName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2B395E",
    marginBottom: 4,
    fontFamily: "Poppins-SemiBold",
  },
  guardianRelation: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  defaultText: {
    fontSize: 11,
    color: "#666",
    marginTop: 12,
    fontStyle: "italic",
    fontFamily: "Poppins-Regular",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2B395E",
    marginTop: 16,
    fontFamily: "Poppins-SemiBold",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  addButton: {
    backgroundColor: "#FF8C00",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#FF8C00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonDisabled: {
    backgroundColor: "#D1D1D6",
    shadowOpacity: 0,
    elevation: 0,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Poppins-SemiBold",
  },
  addButtonTextDisabled: {
    color: "#999",
  },
});
