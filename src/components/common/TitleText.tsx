import React from "react";
import { Text, StyleSheet } from "react-native";

interface TitleTextProps {
  children: React.ReactNode;
  style?: any;
}

const TitleText: React.FC<TitleTextProps> = ({ children, style }) => {
  return <Text style={[styles.title, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    color: "#FF8C00",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default TitleText;
