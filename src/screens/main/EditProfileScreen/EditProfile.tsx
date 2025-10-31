import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from '../../../i18n/locales/i18n';
import ImagePicker from '@/components/ImagePicker';
import CustomIcon from '@/components/CustomIcon';

const STORAGE_KEY = 'profile_v1';

type StoredProfile = {
  name: string | null;
  imageUri?: string | null;
  avatarGender?: 'male' | 'female' | null;
  avatarIndex?: number | null;
  email?: string | null;
  phoneNumber?: string | null;
  relation?: string | null;
};

async function getStoredProfile(): Promise<StoredProfile> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { name: null };
}

async function updateProfile(partial: Partial<StoredProfile>) {
  const existing = await getStoredProfile();
  const updated = { ...existing, ...partial };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [relation, setRelation] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  
  useEffect(() => {
    getStoredProfile().then((p) => {
      if (p.name) setName(p.name);
      if (p.email) setEmail(p.email);
      if (p.phoneNumber) setPhoneNumber(p.phoneNumber);
      if (p.relation) setRelation(p.relation);
      if (p.imageUri) setImageUri(p.imageUri);
    });
  }, []);
  const navigation = useNavigation();

  const handleImageSelected = (uri: string) => {
    setImageUri(uri);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <CustomIcon type="IO" name="arrow-back" size={24} color="#2B395E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {t('editProfile.title', 'Edit Profile')}
          </Text>
        </View>

        {/* Profile Photo */}
        <View style={styles.photoSection}>
          <ImagePicker
            onImageSelected={handleImageSelected}
            imageUri={imageUri || undefined}
            buttonText={t("editProfile.changePhoto", "Change Photo")}
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
            containerStyle={styles.imagePickerContainer}
          />
        </View>
      
        {/* Input Fields */}
        <View style={styles.form}>
        <Text style={styles.label}>{t('editProfile.name')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('editProfile.namePlaceholder')}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>{t('editProfile.email')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('editProfile.emailPlaceholder')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>{t('editProfile.phoneNumber')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('editProfile.phonePlaceholder')}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>{t('editProfile.relation')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('editProfile.relationPlaceholder')}
          value={relation}
          onChangeText={setRelation}
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
        onPress={() => navigation.goBack()} // Redirect to main page
        >
          <Text style={styles.cancelButtonText}>{t('editProfile.cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={async () => {
            await updateProfile({
              name,
              email,
              phoneNumber,
              relation,
              imageUri,
            });
            Alert.alert(t('editProfile.success'), t('editProfile.profileUpdated'));
            navigation.goBack();
          }}
        >
          <Text style={styles.addButtonText}>{t('editProfile.save')}</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
  imagePickerContainer: {
    // Additional styles for image picker if needed
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF8C00',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFE4CC',
    borderWidth: 1,
    borderColor: '#FF8C00',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF8C00',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#FF8C00',
    fontSize: 16,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default EditProfile;
