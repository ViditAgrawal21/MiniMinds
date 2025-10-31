import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "@/components/CustomIcon";
import ImagePicker from "@/components/ImagePicker";
import { t } from "@/i18n/locales/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AddGuardianScreenProps {
  navigation?: any;
}

export default function AddGuardianScreen({ navigation }: AddGuardianScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const handleImageSelected = (imageUri: string) => {
    setPhoto(imageUri);
  };

  const handlePhoneChange = (text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, "");
    // Restrict to 10 digits
    const restricted = cleaned.slice(0, 10);
    setPhone(restricted);
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

  const handleResendSMS = async (phoneNumber: string, guardianName: string) => {
    try {
      const success = await sendGuardianNotification(phoneNumber, guardianName);
      if (success) {
        Alert.alert(
          t("common.success", "Success"),
          t("addGuardian.smsSent", "SMS sent successfully")
        );
      } else {
        Alert.alert(
          t("common.error", "Error"),
          t("addGuardian.smsFailed", "Failed to send SMS. Please try again.")
        );
      }
    } catch (error) {
      Alert.alert(
        t("common.error", "Error"),
        t("addGuardian.smsFailed", "Failed to send SMS. Please try again.")
      );
    }
  };

  const handleSave = async () => {
    // Validation
    if (!name.trim()) {
      Alert.alert(
        t("common.error", "Error"),
        t("addGuardian.nameRequired", "Please enter guardian's name")
      );
      return;
    }

    if (!email.trim() && !phone.trim()) {
      Alert.alert(
        t("common.error", "Error"),
        t(
          "addGuardian.contactRequired",
          "Please enter at least email or phone number"
        )
      );
      return;
    }

    if (phone.trim() && phone.length !== 10) {
      Alert.alert(
        t("common.error", "Error"),
        t(
          "addGuardian.phoneInvalid",
          "Phone number must be exactly 10 digits"
        )
      );
      return;
    }

    if (!relation.trim()) {
      Alert.alert(
        t("common.error", "Error"),
        t("addGuardian.relationRequired", "Please enter your relation with user")
      );
      return;
    }

    try {
      // Load existing guardians
      const stored = await AsyncStorage.getItem("guardians");
      const guardians = stored ? JSON.parse(stored) : [];

      // Create new guardian
      const newGuardian = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        relation: relation.trim(),
        photo: photo,
        isDefault: guardians.length === 0, // First guardian is default
      };

      // Add to list
      guardians.push(newGuardian);

      // Save
      await AsyncStorage.setItem("guardians", JSON.stringify(guardians));

      // Send SMS notification to guardian's phone
      let smsSuccess = false;
      if (phone.trim()) {
        smsSuccess = await sendGuardianNotification(phone.trim(), name.trim());
      }

      // Show success message with SMS status
      Alert.alert(
        t("common.success", "Success"),
        phone.trim() && smsSuccess
          ? t("addGuardian.guardianAddedWithSMS", "Guardian added successfully and SMS sent")
          : phone.trim() && !smsSuccess
          ? t("addGuardian.guardianAddedNoSMS", "Guardian added successfully but SMS failed to send")
          : t("addGuardian.guardianAdded", "Guardian added successfully"),
        [
          ...(phone.trim() && !smsSuccess
            ? [
                {
                  text: t("addGuardian.resendSMS", "Resend SMS"),
                  onPress: () => handleResendSMS(phone.trim(), name.trim()),
                },
              ]
            : []),
          {
            text: t("common.ok", "OK"),
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error("Error saving guardian:", error);
      Alert.alert(
        t("common.error", "Error"),
        t("addGuardian.saveFailed", "Failed to save guardian. Please try again.")
      );
    }
  };

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
        <Text style={styles.headerTitle}>
          {t("addGuardian.title", "Add Guardian")}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Photo Section */}
        <View style={styles.photoSection}>
          <ImagePicker
            onImageSelected={handleImageSelected}
            imageUri={photo || undefined}
            buttonText={t("addGuardian.addPhoto", "Add Photo")}
            allowCamera={true}
            allowGallery={true}
            quality={0.8}
            maxWidth={800}
            maxHeight={800}
            borderColor="#FF8C00"
            editIconColor="#FF8C00"
            placeholderComponent={
              <View style={styles.photoPlaceholder}>
                <CustomIcon type="IO" name="person" size={48} color="#FF8C00" />
              </View>
            }
          />
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {t("addGuardian.name", "Name")}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={t(
                "addGuardian.namePlaceholder",
                "Enter the Name of Guardian"
              )}
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {t("addGuardian.email", "E-mail")}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={t(
                "addGuardian.emailPlaceholder",
                "Enter the Email address"
              )}
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Phone */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {t("addGuardian.phone", "Phone Number")}
            </Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+91</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder={t(
                  "addGuardian.phonePlaceholder",
                  "9123456789"
                )}
                placeholderTextColor="#999"
                value={phone}
                onChangeText={handlePhoneChange}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          </View>

          {/* Relation */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {t("addGuardian.relation", "Relation with User")}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={t(
                "addGuardian.relationPlaceholder",
                "Enter Your Relation with User"
              )}
              placeholderTextColor="#999"
              value={relation}
              onChangeText={setRelation}
            />
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>
              {t("common.cancel", "Cancel")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleSave}
          >
            <Text style={styles.addButtonText}>
              {t("common.add", "Add")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2B395E",
    fontFamily: "Poppins-SemiBold",
  },
  scrollContent: {
    padding: 16,
  },
  photoSection: {
    alignItems: "center",
    marginBottom: 32,
    paddingVertical: 20,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFE4CC",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2B395E",
    marginBottom: 8,
    fontFamily: "Poppins-SemiBold",
  },
  input: {
    backgroundColor: "#FAF5FF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: "#2B395E",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    fontFamily: "Poppins-Regular",
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAF5FF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
  },
  countryCode: {
    backgroundColor: "#FFE4CC",
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: "#E0E0E0",
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF8C00",
    fontFamily: "Poppins-SemiBold",
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: "#2B395E",
    fontFamily: "Poppins-Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF8C00",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF8C00",
    fontFamily: "Poppins-SemiBold",
  },
  addButton: {
    flex: 1,
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
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Poppins-SemiBold",
  },
});
