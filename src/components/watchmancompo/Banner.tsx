import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

type Props = {
  title: string;
  subtitle: string;
  description: string;
  gradientColors?: string[];
};

const Banner = ({ 
  title, 
  subtitle, 
  description, 
  gradientColors = ["#C4A7E7", "#F7E6FF"] 
}: Props) => {
  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={gradientColors} 
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </LinearGradient>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  gradient: {
    paddingVertical: 24,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6A6A6A",
    textAlign: "center",
    marginTop: 16,
    paddingHorizontal: 16,
  },
});

export default Banner;