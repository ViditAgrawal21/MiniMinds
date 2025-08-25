import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import Slider from "@react-native-community/slider";

const AdjustBrightness = () => {
  const [brightness, setBrightness] = useState(50);
  const [animatedValue] = useState(new Animated.Value(50));

  const handleReset = () => {
    Animated.timing(animatedValue, {
      toValue: 50, // Reset animation to 50
      duration: 300, // Smooth transition duration
      useNativeDriver: false,
    }).start(() => setBrightness(50));
    Alert.alert("Brightness Reset", "Brightness has been reset to 50%.");
  };

  const handleValueChange = (value: number) => {
    setBrightness(Math.round(value));
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 300, // Smooth animation
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Adjust brightness</Text>
        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.reset}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Brightness Slider */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={brightness}
        onValueChange={handleValueChange}
        minimumTrackTintColor="#8A56AC"
        maximumTrackTintColor="#E5E5E5"
        thumbTintColor="#8A56AC"
      />

      {/* Animated Brightness Value */}
      <View style={styles.valueContainer}>
        <Animated.Text
          style={[
            styles.valueText,
            { opacity: animatedValue.interpolate({ inputRange: [0, 100], outputRange: [0.5, 1] }) }, // Dynamic opacity
          ]}
        >
          {`Brightness: ${brightness}%`}
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8A56AC",
  },
  reset: {
    fontSize: 12,
    color: "#8A56AC",
    textDecorationLine: "underline",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  valueContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  valueText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4A4A4A",
    textAlign: "center",
  },
});

export default AdjustBrightness;