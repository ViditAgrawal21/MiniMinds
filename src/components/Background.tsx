import React from "react";
import { View, StyleSheet } from "react-native";

export const Background: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundDesign} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundDesign: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    opacity: 0.3,
  },
});
