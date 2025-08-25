import React from "react";
import { View, Text, StyleSheet } from "react-native";

type SectionHeaderProps = {
  title: string;
};

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    top: 15,
  },
  title: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#5F6368",
  },
});
