import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const SelectGuardianSelector = () => {
  const [selectedGuardian, setSelectedGuardian] = useState<string | null>(null);

  const guardians = ["Guardian 1", "Guardian 2"];

  const resetSelection = () => setSelectedGuardian(null);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Select a Guardian</Text>
        <TouchableOpacity onPress={resetSelection}>
          <Text style={styles.reset}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Options */}
      <View style={styles.options}>
        {guardians.map((guardian, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionContainer}
            onPress={() => setSelectedGuardian(guardian)}
          >
            <View
              style={[
                styles.radioButton,
                selectedGuardian === guardian && styles.selectedRadioButton,
              ]}
            />
            <Text style={styles.optionText}>{guardian}</Text>
          </TouchableOpacity>
        ))}
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
  options: {
    marginTop: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#8A56AC",
    marginRight: 10,
  },
  selectedRadioButton: {
    backgroundColor: "#8A56AC",
  },
  optionText: {
    fontSize: 14,
    color: "#6A6A6A",
  },
});

export default SelectGuardianSelector;