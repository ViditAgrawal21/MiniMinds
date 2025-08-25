import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

const ListOfPeople = () => {
  const [people, setPeople] = useState(["Mom", "Dad"]);
  const [newPerson, setNewPerson] = useState("");

  const handleAddPerson = () => {
    if (newPerson.trim()) {
      setPeople([...people, newPerson]);
      setNewPerson("");
    }
  };

  const handleReset = () => {
    setPeople(["Mom", "Dad"]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>List of people</Text>
        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.reset}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <View style={styles.listContainer}>
        {people.map((person, index) => (
          <TextInput
            key={index}
            value={person}
            style={styles.input}
            editable={false} // Disable editing for existing entries
          />
        ))}
      </View>

      {/* Add Person */}
      <View style={styles.addPersonContainer}>
        <TextInput
          value={newPerson}
          onChangeText={setNewPerson}
          placeholder="Add"
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddPerson}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
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
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  listContainer: {
    marginTop: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  addPersonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#D27AD5",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default ListOfPeople;