import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const TimePeriodSelector = () => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string | null>(null);

  const timePeriods = ["Weekly", "Bi-Weekly", "Monthly", "Quarterly"];

  const resetSelection = () => setSelectedTimePeriod(null);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Select the time period</Text>
        <TouchableOpacity onPress={resetSelection}>
          <Text style={styles.reset}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Options */}
      <View style={styles.options}>
        {timePeriods.map((period, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => setSelectedTimePeriod(period)}
          >
            <View
              style={[
                styles.radioButton,
                selectedTimePeriod === period && styles.selectedRadioButton,
              ]}
            />
            <Text style={styles.optionText}>{period}</Text>
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
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#8A56AC",
    marginRight: 10,
  },
  selectedRadioButton: {
    backgroundColor: "#8A56AC",
    borderWidth: 0,
  },
  optionText: {
    fontSize: 14,
    color: "#6A6A6A",
  },
});

export default TimePeriodSelector;