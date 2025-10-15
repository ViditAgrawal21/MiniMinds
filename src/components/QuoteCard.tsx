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
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 25,
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 12,
    fontFamily: "Poppins-Bold",
    color: "#2B395E",
    marginBottom: 5,
  },
  quote: {
    fontSize: 12,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: "Poppins-Regular",
    color: "#2B395E",
    textAlign: "center",
  },
});

export default QuoteCard;
