import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const OathText = () => {
  const handleTakeOath = () => {
    console.log("Oath taken!");
  };

  const resetOath = () => {
    console.log("Oath reset!");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Oath Text</Text>
        <TouchableOpacity onPress={resetOath}>
          <Text style={styles.reset}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Oath Text */}
      <Text style={styles.oathText}>
        "I solemnly swear to pause before I buy,
        {"\n"}To think twice and let impulse fly,
        {"\n"}To value what I truly need,
        {"\n"}And let thoughtful choices take the lead.
        {"\n"}I pledge to shop with care and grace,
        {"\n"}Avoiding clutter and wasted space,
        {"\n"}For every mindful step I take today,
        {"\n"}Brings peace and balance along the way."
      </Text>

      {/* Take Oath Button */}
      <TouchableOpacity style={styles.takeOathButton} onPress={handleTakeOath}>
        <Text style={styles.takeOathText}>Take Oath</Text>
      </TouchableOpacity>
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
  oathText: {
    marginVertical: 16,
    fontSize: 14,
    lineHeight: 20,
    color: "#6A6A6A",
    textAlign: "center",
  },
  takeOathButton: {
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#D27AD5",
    borderRadius: 20,
  },
  takeOathText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default OathText;
