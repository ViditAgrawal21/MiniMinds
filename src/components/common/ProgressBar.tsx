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
    backgroundColor: "#E1BEE7", // Light purple
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 16, // Adds space below the bar
  },
  filler: {
    backgroundColor: "#AB47BC", // Purple
  },
  remaining: {
    backgroundColor: "rgba(171, 71, 188, 0.2)", // Faded purple
  },
});
