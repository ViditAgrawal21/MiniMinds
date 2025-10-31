import React from "react";
import { View, StyleSheet } from "react-native";

interface ProgressBarProps {
  progress: number; // Value between 0 and 1
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.filler, { flex: progress }]} />
      <View style={[styles.remaining, { flex: 1 - progress }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#FFE4CC", // Light orange
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 16, // Adds space below the bar
  },
  filler: {
    backgroundColor: "#FF8C00", // Orange
  },
  remaining: {
    backgroundColor: "rgba(255, 140, 0, 0.2)", // Faded orange
  },
});
