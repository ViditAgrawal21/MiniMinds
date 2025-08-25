import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function QuestionCard({ question }: { question: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
