import React from "react";
import { View, StyleSheet, Button } from "react-native";

export const NavigationButtons: React.FC<{
  onNext: () => void;
  onBack?: () => void;
  onSkip?: () => void;
}> = ({ onNext, onBack, onSkip }) => {
  return (
    <View style={styles.buttonContainer}>
      {onBack && <Button title="Back" onPress={onBack} color="#6200ee" />}
      {onSkip && <Button title="Skip" onPress={onSkip} color="#6200ee" />}
      <Button title="Save & Proceed" onPress={onNext} color="#6200ee" />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
