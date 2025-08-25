import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  useEffect(() => {
    getStoredProfile().then((p) => {
      if (p.name) setName(p.name);
      if (p.email) setEmail(p.email);
      if (p.phoneNumber) setPhoneNumber(p.phoneNumber);
      if (p.relation) setRelation(p.relation);
    });
  }, []);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      {/* Input Fields */}
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Name of Guardian"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Relation with User</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Relation with User"
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
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={async () => {
            await updateProfile({
              name,
              email,
              phoneNumber,
              relation,
            });
            Alert.alert('Success', 'Profile Updated!');
            navigation.goBack();
          }}
        >
          <Text style={styles.addButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
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
    borderColor: '#D27AD5',
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
    backgroundColor: '#D27AD5',
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
    backgroundColor: '#FCEEF9',
    borderWidth: 1,
    borderColor: '#D27AD5',
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
    borderColor: '#D27AD5',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#D27AD5',
    fontSize: 16,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#D27AD5',
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
