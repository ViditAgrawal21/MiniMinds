import React from "react";
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import GuardianCardComponent from "./GuardianCardComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Install and import react-native-image-picker
// import {launchImageLibrary} from 'react-native-image-picker';

const GUARDIANS_KEY = "guardians_v1";

interface Guardian {
  name: string;
  email: string;
  phone: string;
  relation: string;
  imageUri: string | null;
}

const GuardianListScreen = () => {
  const [guardians, setGuardians] = React.useState<Guardian[]>([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [form, setForm] = React.useState<Guardian>({ name: "", email: "", phone: "", relation: "", imageUri: null });

  React.useEffect(() => {
    AsyncStorage.getItem(GUARDIANS_KEY).then((raw) => {
      if (raw) setGuardians(JSON.parse(raw));
    });
  }, []);

  const saveGuardians = async (list: Guardian[]) => {
    setGuardians(list);
    await AsyncStorage.setItem(GUARDIANS_KEY, JSON.stringify(list));
  };

  const handleDelete = (idx: number) => {
    const updated = guardians.filter((_, i) => i !== idx);
    saveGuardians(updated);
  };

  const handleEdit = (idx: number) => {
    setEditingIndex(idx);
    setForm(guardians[idx]);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setEditingIndex(null);
    setForm({ name: "", email: "", phone: "", relation: "", imageUri: null });
    setModalVisible(true);
  };

  const pickImage = async () => {
    // TODO: Implement with react-native-image-picker
    Alert.alert("Info", "Image picker functionality needs to be implemented with react-native-image-picker");
    
    // Placeholder implementation - in real app you would use react-native-image-picker
    // import {launchImageLibrary} from 'react-native-image-picker';
    // const options = {
    //   mediaType: 'photo',
    //   quality: 0.8,
    // };
    // launchImageLibrary(options, (response) => {
    //   if (response.assets && response.assets.length > 0) {
    //     setForm((f) => ({ ...f, imageUri: response.assets[0].uri }));
    //   }
    // });
  };

  const handleSave = () => {
    if (!form.name || !form.email || !form.phone || !form.relation) return;
    let updated: Guardian[];
    if (editingIndex !== null) {
      updated = guardians.map((g, i) => (i === editingIndex ? form : g));
    } else {
      updated = [...guardians, form];
    }
    saveGuardians(updated);
    setModalVisible(false);
    setEditingIndex(null);
    setForm({ name: "", email: "", phone: "", relation: "", imageUri: null });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Guardian List</Text>
        {guardians.map((g, idx) => (
          <GuardianCardComponent
            key={idx}
            profileImage={g.imageUri ? { uri: g.imageUri } : require("../assets/images/PFP.png")}
            title={g.name}
            subtitle={g.relation}
            rightImage1={require("../assets/images/Delete Icon.png")}
            rightImage2={require("../assets/images/Edit Icon.png")}
            onDelete={() => handleDelete(idx)}
            onEdit={() => handleEdit(idx)}
          />
        ))}
      </ScrollView>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAdd}
        >
          <Text style={styles.addButtonText}>Add Guardian</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.2)" }}>
          <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "85%" }}>
            {/* Profile Image Picker */}
            <View style={{ alignItems: "center", marginBottom: 16 }}>
              <TouchableOpacity onPress={pickImage} style={{ position: "relative" }}>
                <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: "#7B5AC2", alignItems: "center", justifyContent: "center" }}>
                  {form.imageUri ? (
                    <Image source={{ uri: form.imageUri }} style={{ width: 80, height: 80, borderRadius: 40 }} />
                  ) : null}
                </View>
                <View style={{ position: "absolute", bottom: 0, right: 0, backgroundColor: "#D27AD5", borderRadius: 16, padding: 4 }}>
                  <Text style={{ color: "#fff", fontSize: 16 }}>✏️</Text>
                </View>
              </TouchableOpacity>
              <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 8 }}>{form.name || " "}</Text>
              <Text style={{ color: "gray", fontSize: 14 }}>{form.relation || " "}</Text>
            </View>
            <TextInput
              placeholder="Enter the Name of Guardian"
              value={form.name}
              onChangeText={text => setForm(f => ({ ...f, name: text }))}
              style={{ borderBottomWidth: 1, marginBottom: 10, borderColor: '#D27AD5', borderRadius: 6, padding: 8, color: '#1a1a1a' }}
              placeholderTextColor="#C841CC"
            />
            <TextInput
              placeholder="Enter the Email address"
              value={form.email}
              onChangeText={text => setForm(f => ({ ...f, email: text }))}
              style={{ borderBottomWidth: 1, marginBottom: 10, borderColor: '#D27AD5', borderRadius: 6, padding: 8, color: '#1a1a1a' }}
              placeholderTextColor="#C841CC"
            />
            <TextInput
              placeholder="Enter the Phone Number"
              value={form.phone}
              onChangeText={text => setForm(f => ({ ...f, phone: text }))}
              style={{ borderBottomWidth: 1, marginBottom: 10, borderColor: '#D27AD5', borderRadius: 6, padding: 8, color: '#1a1a1a' }}
              keyboardType="phone-pad"
              placeholderTextColor="#C841CC"
            />
            <TextInput
              placeholder="Enter Your Relation with User"
              value={form.relation}
              onChangeText={text => setForm(f => ({ ...f, relation: text }))}
              style={{ borderBottomWidth: 1, marginBottom: 10, borderColor: '#D27AD5', borderRadius: 6, padding: 8, color: '#1a1a1a' }}
              placeholderTextColor="#C841CC"
            />
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginRight: 20 }}>
                <Text style={{ color: "#C841CC", fontWeight: "bold" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave}>
                <Text style={{ color: "#C841CC", fontWeight: "bold" }}>{editingIndex !== null ? "Save" : "Add"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  guardianCard: {
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  defaultGuardianCard: {
    borderColor: "pink",
    borderWidth: 2,
  },
  guardianName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  defaultText: {
    fontSize: 14,
    color: "gray",
    marginTop: 8,
  },
  bottomButtonContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  addButton: {
    borderRadius: 8,
    backgroundColor: "#D27AD5",
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GuardianListScreen;
