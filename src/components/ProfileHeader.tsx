import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomIcon from "./CustomIcon";
import { t } from "../i18n/locales/i18n";


const STORAGE_KEY = "profile_v1";

type StoredProfile = {
  name: string | null;
  imageUri: string | null;
  avatarGender: "male" | "female" | null;
  avatarIndex: number | null;
  selectedGender?: string;
};

async function getStoredProfile(): Promise<StoredProfile> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    name: "User",
    imageUri: null,
    avatarGender: null,
    avatarIndex: null,
  };
}

async function updateProfile(partial: Partial<StoredProfile>) {
  const existing = await getStoredProfile();
  const updated = { ...existing, ...partial };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

/**
 * -----------------------------------------------------------------------------
 * Avatar assets – adjust the paths to your real assets folder.
 * -----------------------------------------------------------------------------
 */
const maleAvatars = {
  sad: require("@/assets/avatars/male-sad.jpeg"),
  mid: require("@/assets/avatars/male-mid.jpeg"),
  happy: require("@/assets/avatars/male-happy.jpeg"),
};

const femaleAvatars = {
  sad: require("@/assets/avatars/female-sad.jpeg"),
  mid: require("@/assets/avatars/female-mid.jpeg"),
  happy: require("@/assets/avatars/female-happy.jpeg"),
};

type Gender = "male" | "female";

interface ProfileHeaderProps {
  /** optional fallbacks until DB loads */
  fallbackName?: string;
  fallbackImageUrl?: string;
}

/**
 * -----------------------------------------------------------------------------
 * Component
 * -----------------------------------------------------------------------------
 */
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  fallbackName,
  fallbackImageUrl,
}) => {
  const navigation = useNavigation();
  const [name, setName] = useState(fallbackName ?? "User");
  const [imageUri, setImageUri] = useState<string | null>(
    fallbackImageUrl ?? null
  );
  const [avatarGender, setAvatarGender] = useState<Gender | null>(null);
  const [avatarIndex, setAvatarIndex] = useState<number | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [wellnessScore, setWellnessScore] = useState<number>(0);

  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [genderSelection, setGenderSelection] = useState<Gender>("male");

  useEffect(() => {
    const fetchProfileAndScore = async () => {
      try {
        // Fetch profile data
        const profile = await getStoredProfile();
        setName(profile.name ?? "User");
        setImageUri(profile.imageUri);
        setAvatarGender(profile.avatarGender);
        setAvatarIndex(profile.avatarIndex);
        setSelectedGender(profile.selectedGender || null);
        
        // Set initial gender selection based on stored gender
        if (profile.selectedGender === "FEMALE") {
          setGenderSelection("female");
        } else if (profile.selectedGender === "MALE") {
          setGenderSelection("male");
        }

        // Fetch wellness score
        const storedResponses = await AsyncStorage.getItem("onboardingResponses");
        if (storedResponses) {
          const responses = JSON.parse(storedResponses);
          setWellnessScore(responses.overallOnboardingScore || 0);
        }
      } catch (error) {
        console.error("Error fetching profile and score:", error);
      }
    };

    fetchProfileAndScore();
  }, []);

  // Get the appropriate avatar based on wellness score and gender
  const getWellnessAvatar = () => {
    // If user has selected a specific avatar, use that
    if (avatarGender && avatarIndex !== null) {
      const avatars = avatarGender === "female" ? femaleAvatars : maleAvatars;
      return Object.values(avatars)[avatarIndex];
    }

    if (!selectedGender) return { uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" };

    // Only show gender-specific avatars for MALE and FEMALE
    if (selectedGender !== "MALE" && selectedGender !== "FEMALE") {
      return { uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" };
    }

    const gender = selectedGender === "FEMALE" ? "female" : "male";
    const avatars = gender === "female" ? femaleAvatars : maleAvatars;

    if (wellnessScore <= 40) {
      return avatars.sad;
    } else if (wellnessScore <= 55) {
      return avatars.mid;
    } else {
      return avatars.happy;
    }
  };

  // Refresh when coming back from EditProfile
  useFocusEffect(
    useCallback(() => {
      const fetchProfileAndScore = async () => {
        try {
          const profile = await getStoredProfile();
          setName(profile.name ?? "User");
          setImageUri(profile.imageUri);
          setAvatarGender(profile.avatarGender);
          setAvatarIndex(profile.avatarIndex);
          setSelectedGender(profile.selectedGender || null);
          
          if (profile.selectedGender === "FEMALE") {
            setGenderSelection("female");
          } else if (profile.selectedGender === "MALE") {
            setGenderSelection("male");
          }

          const storedResponses = await AsyncStorage.getItem("onboardingResponses");
          if (storedResponses) {
            const responses = JSON.parse(storedResponses);
            setWellnessScore(responses.overallOnboardingScore || 0);
          }
        } catch (error) {
          console.error("Error fetching profile and score:", error);
        }
      };

      fetchProfileAndScore();
    }, [])
  );

  /** -------------------------------- Image picker -------------------------- */
  async function requestPermission() {
    // Since expo-image-picker is not available, we'll just return true for now
    // In a real implementation, you would use react-native-image-picker
    Alert.alert("Info", "Image picker functionality needs to be implemented with react-native-image-picker");
    return false;
  }

  async function pickImage() {
    const ok = await requestPermission();
    if (!ok) return;

    // TODO: Implement with react-native-image-picker
    Alert.alert("Info", "Image picker functionality needs to be implemented with react-native-image-picker");
    
    // Placeholder implementation - in real app you would use react-native-image-picker
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   quality: 0.8,
    // });
    // if (!result.canceled && result.assets.length > 0) {
    //   const uri = result.assets[0].uri;
    //   setImageUri(uri);
    //   setAvatarGender(null);
    //   setAvatarIndex(null);
    //   await updateProfile({
    //     imageUri: uri,
    //     avatarGender: null,
    //     avatarIndex: null,
    //   });
    // }
  }

  /** ----------------------------- Avatar picker --------------------------- */
  function openAvatarPicker() {
    if (!shouldShowAvatarPicker()) {
      // Don't show avatar picker for non-binary or other gender selections
      return;
    }
    setAvatarModalVisible(true);
  }

  function selectAvatar(index: number) {
    // Determine the correct gender based on selectedGender or current selection
    let finalGender: Gender = genderSelection;
    
    switch (selectedGender) {
      case "MALE":
        finalGender = "male";
        break;
      case "FEMALE":
        finalGender = "female";
        break;
      case "PREFER_NOT_TO_SAY":
        finalGender = genderSelection;
        break;
      default:
        // For other cases, use current selection
        break;
    }

    setImageUri(null); // clear custom image so avatar shows
    setAvatarGender(finalGender);
    setAvatarIndex(index);
    
    // Store the selected avatar information
    updateProfile({
      avatarGender: finalGender,
      avatarIndex: index,
      imageUri: null,
      selectedGender: selectedGender || undefined // Keep the original gender selection
    });
    
    setAvatarModalVisible(false);
  }

  // Function to determine if avatar picker should be shown
  const shouldShowAvatarPicker = () => {
    // Always show avatar picker for all users
    return true;
  };

  // Function to get available avatars based on selected gender
  const getAvailableAvatars = () => {
    // Return avatars based on current gender selection
    return genderSelection === "male" ? maleAvatars : femaleAvatars;
  };

  /** ------------------------------ Render ---------------------------------- */
  const wellnessAvatar = getWellnessAvatar();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.outerCircle} />
        <View style={styles.middleCircle} />
        <View style={styles.innerCircle} />

        {/* ---- Profile image or avatar ---- */}
        <View style={styles.profileImageWrapper}>
          <Image
            source={
              imageUri
                ? { uri: imageUri }
                : wellnessAvatar
                ? wellnessAvatar
                : { uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }
            }
            style={styles.profileImage}
            resizeMode="cover"
          />

          {/* floating edit icon */}
          <TouchableOpacity
            onPress={() => {
              // open quick sheet
              pickImage();
            }}
            style={styles.cameraIcon}
          >
            <CustomIcon type="MCI" name="camera" size={18} color="#ffffff" />
          </TouchableOpacity>

          {/* choose avatar icon - always show */}
          <TouchableOpacity
            onPress={openAvatarPicker}
            style={styles.avatarIcon}
          >
            <CustomIcon type="MCI" name="account" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Name */}
        <Text style={styles.name}>{name}</Text>

        {/* Edit Profile navigates to full edit screen */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile" as never)}
        >
          <Text style={styles.editButtonText}>{t('editProfile.editProfileButton')}</Text>
        </TouchableOpacity>
      </View>

      {/* ---------------- Avatar selection modal ---------------- */}
      <Modal
        visible={avatarModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAvatarModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {/* Always show gender toggle */}
            <View style={styles.genderRow}>
              <Pressable
                style={[
                  styles.genderButton,
                  genderSelection === "male" && styles.genderButtonActive,
                ]}
                onPress={() => {
                  setGenderSelection("male");
                  // Reset avatar selection when switching gender
                  setAvatarIndex(null);
                }}
              >
                <Text
                  style={[
                    styles.genderText,
                    genderSelection === "male" && styles.genderTextActive,
                  ]}
                >
                  Male
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.genderButton,
                  genderSelection === "female" && styles.genderButtonActive,
                ]}
                onPress={() => {
                  setGenderSelection("female");
                  // Reset avatar selection when switching gender
                  setAvatarIndex(null);
                }}
              >
                <Text
                  style={[
                    styles.genderText,
                    genderSelection === "female" && styles.genderTextActive,
                  ]}
                >
                  Female
                </Text>
              </Pressable>
            </View>

            <FlatList
              data={Object.values(getAvailableAvatars())}
              keyExtractor={(_, idx) => idx.toString()}
              numColumns={3}
              contentContainerStyle={{ alignItems: "center" }}
              renderItem={({ item, index }) => (
                <Pressable
                  style={[
                    styles.avatarChoice,
                    avatarIndex === index && styles.selectedAvatarChoice
                  ]}
                  onPress={() => selectAvatar(index)}
                >
                  <Image
                    source={item}
                    style={{ width: 72, height: 72, borderRadius: 36 }}
                  />
                </Pressable>
              )}
            />
            <Pressable
              style={styles.closeButton}
              onPress={() => setAvatarModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

/**
 * -----------------------------------------------------------------------------
 * Styles
 * -----------------------------------------------------------------------------
 */
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "relative",
    marginBottom: 5,
  },
  header: {
    position: "relative",
    alignItems: "center",
    marginBottom: 60,
  },
  outerCircle: {
    position: "absolute",
    width: "200%",
    height: 430,
    backgroundColor: "#F09161",
    borderBottomLeftRadius: 350,
    borderBottomRightRadius: 350,
    top: -325,
  },
  middleCircle: {
    position: "absolute",
    width: "190%",
    height: 420,
    backgroundColor: "#CB6C46",
    borderBottomLeftRadius: 340,
    borderBottomRightRadius: 340,
    top: -335,
  },
  innerCircle: {
    position: "absolute",
    width: "180%",
    height: 410,
    backgroundColor: "#2B395E",
    borderBottomLeftRadius: 330,
    borderBottomRightRadius: 330,
    top: -350,
  },
  profileImageWrapper: {
    marginTop: 30,
    alignItems: "center",
    zIndex: 1,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: "#CB6C46",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#CB6C46",
    padding: 6,
    borderRadius: 14,
  },
  avatarIcon: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "#2B395E",
    padding: 6,
    borderRadius: 14,
  },
  name: {
    marginTop: 5,
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#000",
  },
  editButton: {
    marginTop: -3,
    backgroundColor: "#CB6C46",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },

  /* Modal */
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "85%",
    maxHeight: "80%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
  },
  genderRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 16,
  },
  genderButton: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CB6C46",
  },
  genderButtonActive: {
    backgroundColor: "#CB6C46",
  },
  genderText: {
    color: "#CB6C46",
    fontFamily: "Poppins-Medium",
  },
  genderTextActive: {
    color: "#FFF",
  },
  avatarChoice: {
    margin: 10,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "#CB6C46",
    fontSize: 14,
    fontFamily: "Poppins-Bold",
  },
  selectedAvatarChoice: {
    borderWidth: 2,
    borderColor: "#C841CC",
    borderRadius: 40,
    padding: 2,
  },
});

export default ProfileHeader;
