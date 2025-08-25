import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const { height: screenHeight } = Dimensions.get("window");

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: any;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: screenHeight * 0.03,
    marginTop: 20,
  },
});

export default ScreenContainer;
