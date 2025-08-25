import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const wordCloudData = [
  { text: "Shah Rukh Khan", fontSize: 24, color: "#AB47BC" },
  { text: "Newton's law", fontSize: 18, color: "#2196F3" },
  { text: "Big Boss", fontSize: 20, color: "#2196F3" },
  { text: "Physics Wallah", fontSize: 16, color: "#2196F3" },
  { text: "Coldplay Concert", fontSize: 16, color: "#FF7043" },
  { text: "Ragging", fontSize: 14, color: "#FF7043" },
  { text: "Algebra", fontSize: 14, color: "#2196F3" },
  { text: "Dubai", fontSize: 14, color: "#FF7043" },
  { text: "Dhoni", fontSize: 14, color: "#333" },
  { text: "Indian Politics", fontSize: 12, color: "#333" },
  { text: "Thailand", fontSize: 12, color: "#333" },
];

const WordCloud = () => {
  const cloudWidth = Dimensions.get("window").width - 60; // Container width
  const cloudHeight = 250; // Container height
  const usedPositions: { top: number; left: number; size: number }[] = []; // Track used positions

  // Helper function to generate non-overlapping random positions
  const generatePosition = (fontSize: number) => {
    let top = 0; // Initialize top
    let left = 0; // Initialize left
    let collision = true;
    let attempts = 0;

    while (collision && attempts < 100) {
      top = Math.random() * (cloudHeight - fontSize); // Randomize top
      left = Math.random() * (cloudWidth - fontSize * 5); // Randomize left

      // Check if the position collides with existing ones
      collision = usedPositions.some(
        (pos) =>
          Math.abs(pos.top - top) < fontSize * 2 &&
          Math.abs(pos.left - left) < fontSize * 5,
      );

      attempts++;
    }

    if (attempts < 100) {
      usedPositions.push({ top, left, size: fontSize });
    }

    return { top, left };
  };

  return (
    <View
      style={[
        styles.wordCloudContainer,
        { width: cloudWidth, height: cloudHeight },
      ]}
    >
      {wordCloudData.map((item, index) => {
        const { top, left } = generatePosition(item.fontSize);
        return (
          <Text
            key={index}
            style={[
              styles.word,
              {
                fontSize: item.fontSize,
                color: item.color,
                position: "absolute",
                top,
                left,
              },
            ]}
          >
            {item.text}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wordCloudContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    position: "relative",
    alignSelf: "center",
    marginBottom: 110,
  },
  word: {
    fontWeight: "600",
  },
});

export default WordCloud;
