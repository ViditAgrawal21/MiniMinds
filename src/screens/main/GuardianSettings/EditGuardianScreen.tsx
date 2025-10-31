import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "@/components/CustomIcon";
import ImagePicker from "@/components/ImagePicker";
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

interface EditGuardianScreenProps {
  navigation?: any;
  route?: any;
}

export default function EditGuardianScreen({ navigation, route }: EditGuardianScreenProps) {
  const guardian = route?.params?.guardian as Guardian;

  const [name, setName] = useState(guardian?.name || "");
  const [email, setEmail] = useState(guardian?.email || "");
  const [phone, setPhone] = useState(guardian?.phone || "");
  const [relation, setRelation] = useState(guardian?.relation || "");
  const [photo, setPhoto] = useState<string | null>(guardian?.photo || null);
  const [isDefault, setIsDefault] = useState(guardian?.isDefault || false);

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

  useEffect(() => {
    if (!guardian) {
      Alert.alert(
        t("common.error", "Error"),
        t("editGuardian.noData", "Guardian data not found"),
        [{ text: t("common.ok", "OK"), onPress: () => navigation.goBack() }]
      );
    }
  }, [guardian]);

  const handleSave = async () => {
    // Validation
    if (!name.trim()) {
      Alert.alert(
        t("common.error", "Error"),
        t("editGuardian.nameRequired", "Please enter guardian's name")
      );
      return;
    }

    if (!email.trim() && !phone.trim()) {
      Alert.alert(
        t("common.error", "Error"),
        t(
          "editGuardian.contactRequired",
          "Please enter at least email or phone number"
        )
      );
      return;
    }

    if (phone.trim() && phone.length !== 10) {
      Alert.alert(
        t("common.error", "Error"),
        t(
          "editGuardian.phoneInvalid",
          "Phone number must be exactly 10 digits"
        )
      );
      return;
    }

    if (!relation.trim()) {
      Alert.alert(
        t("common.error", "Error"),
        t("editGuardian.relationRequired", "Please enter your relation with user")
      );
      return;
    }

    try {
      // Load existing guardians
      const stored = await AsyncStorage.getItem("guardians");
      const guardians: Guardian[] = stored ? JSON.parse(stored) : [];

      // Find index of current guardian
      const index = guardians.findIndex((g) => g.id === guardian.id);
      if (index === -1) {
        throw new Error("Guardian not found");
      }

      // If setting as default, remove default from others
      if (isDefault) {
        guardians.forEach((g) => {
          g.isDefault = false;
        });
      }

      // Update guardian
      guardians[index] = {
        ...guardian,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        relation: relation.trim(),
        photo: photo || undefined,
        isDefault: isDefault,
      };

      // Save
      await AsyncStorage.setItem("guardians", JSON.stringify(guardians));

      Alert.alert(
        t("common.success", "Success"),
        t("editGuardian.guardianUpdated", "Guardian updated successfully"),
        [
          {
            text: t("common.ok", "OK"),
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error("Error updating guardian:", error);
      Alert.alert(
        t("common.error", "Error"),
        t("editGuardian.saveFailed", "Failed to update guardian. Please try again.")
      );
    }
  };

  if (!guardian) {
    return null;
  }

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
          {t("editGuardian.title", "Edit Guardian")}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Photo Section */}
        <View style={styles.photoSection}>
          <ImagePicker
            onImageSelected={handleImageSelected}
            imageUri={photo || undefined}
            buttonText={t("editGuardian.changePhoto", "Change Photo")}
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
              {t("editGuardian.name", "Name")}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={t(
                "editGuardian.namePlaceholder",
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
              {t("editGuardian.email", "E-mail")}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={t(
                "editGuardian.emailPlaceholder",
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
              {t("editGuardian.phone", "Phone Number")}
            </Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+91</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder={t(
                  "editGuardian.phonePlaceholder",
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
              {t("editGuardian.relation", "Relation with User")}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={t(
                "editGuardian.relationPlaceholder",
                "Enter Your Relation with User"
              )}
              placeholderTextColor="#999"
              value={relation}
              onChangeText={setRelation}
            />
          </View>

          {/* Default Guardian Toggle */}
          <View style={styles.defaultToggle}>
            <View style={styles.defaultInfo}>
              <Text style={styles.defaultLabel}>
                {t("editGuardian.setAsDefault", "Set as Default Guardian")}
              </Text>
              <Text style={styles.defaultDescription}>
                {t(
                  "editGuardian.defaultDescription",
                  "The default guardian will be highlighted in the list"
                )}
              </Text>
            </View>
            <Switch
              value={isDefault}
              onValueChange={setIsDefault}
              trackColor={{ false: "#D1D1D6", true: "#FF9920" }}
              thumbColor={isDefault ? "#FF8C00" : "#F4F3F4"}
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

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {t("common.save", "Save")}
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
  defaultToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  defaultInfo: {
    flex: 1,
    marginRight: 12,
  },
  defaultLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2B395E",
    marginBottom: 4,
    fontFamily: "Poppins-SemiBold",
  },
  defaultDescription: {
    fontSize: 12,
    color: "#666",
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
  saveButton: {
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
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Poppins-SemiBold",
  },
});
