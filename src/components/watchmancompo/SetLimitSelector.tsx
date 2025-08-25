import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const SetLimitSelector = () => {
  const [selectedLimit, setSelectedLimit] = useState<string | null>(null);

  const limitOptions = ["1 hr", "2 hr", "3 hr", "custom"];

  const resetSelection = () => setSelectedLimit(null);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Set your Limit</Text>
        <TouchableOpacity onPress={resetSelection}>
          <Text style={styles.reset}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Options */}
      <View style={styles.options}>
        {limitOptions.map((limit, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedLimit === limit && styles.selectedButton,
            ]}
            onPress={() => setSelectedLimit(limit)}
          >
            <Text
              style={[
                styles.optionText,
                selectedLimit === limit && styles.selectedText,
              ]}
            >
              {limit}
            </Text>
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
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#8A56AC",
    borderColor: "#8A56AC",
  },
  optionText: {
    fontSize: 14,
    color: "#6A6A6A",
  },
  selectedText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default SetLimitSelector;