import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";

const BirthdayList = () => {
  const [birthdays, setBirthdays] = useState([
    { id: "1", name: "Mom", date: "19/10/1946" },
    { id: "2", name: "Dad", date: "05/04/1945" },
  ]);
  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState("");
  const [isAdding, setIsAdding] = useState(false); // Toggle visibility of input fields

  const addBirthday = () => {
    if (newName.trim() === "" || newDate.trim() === "") {
      Alert.alert("Invalid Input", "Both name and date are required.");
      return;
    }
    setBirthdays([...birthdays, { id: Date.now().toString(), name: newName.trim(), date: newDate.trim() }]);
    setNewName("");
    setNewDate("");
    setIsAdding(false); // Hide the input fields after adding
  };

  const resetBirthdays = () => {
    setBirthdays([
      { id: "1", name: "Mom", date: "19/10/1946" },
      { id: "2", name: "Dad", date: "05/04/1945" },
    ]);
    Alert.alert("Reset", "Birthday list has been reset.");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>List of birthdays</Text>
        <TouchableOpacity onPress={resetBirthdays}>
          <Text style={styles.reset}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Birthday List */}
      <FlatList
        data={birthdays}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.birthdayItem}>
            • {item.name} - {item.date}
          </Text>
        )}
        style={styles.list}
        scrollEnabled={false}
      />

      {/* Toggle to Show Add Birthday Inputs */}
      {isAdding ? (
        <View style={styles.addContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newName}
            onChangeText={setNewName}
          />
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            value={newDate}
            onChangeText={setNewDate}
          />
          <TouchableOpacity style={styles.addButton} onPress={addBirthday}>
            <Text style={styles.addButtonText}>Save Birthday</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setIsAdding(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={() => setIsAdding(true)}>
          <Text style={styles.addButtonText}>Add a birthday</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8A56AC",
  },
  reset: {
    fontSize: 12,
    color: "#8A56AC",
    textDecorationLine: "underline",
  },
  list: {
    marginBottom: 16,
  },
  birthdayItem: {
    fontSize: 14,
    color: "#4A4A4A",
    marginBottom: 5,
  },
  addContainer: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
    color: "#4A4A4A",
    fontSize: 14,
  },
  addButton: {
    backgroundColor: "#8A56AC",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#E5E5E5",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#4A4A4A",
    fontSize: 14,
  },
});

export default BirthdayList;