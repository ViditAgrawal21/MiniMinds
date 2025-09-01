import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getDailyThought } from "../utils/dailyThoughts";

interface QuoteCardProps {
  title: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ title }) => {
  // Get the daily thought based on current date
  const dailyThought = getDailyThought();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.quote}>{dailyThought}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    marginTop: -45,
    backgroundColor: "#F3E5F5",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 25,
    alignItems: "center",
  },
  title: {
    fontSize: 12,
    fontFamily: "Poppins-Bold",
    color: "#9C27B0",
    marginBottom: 5,
  },
  quote: {
    fontSize: 12,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: "Poppins-Regular",
    color: "#000000",
    textAlign: "center",
  },
});

export default QuoteCard;
