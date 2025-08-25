import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ProfileMenuItemProps {
  label: string;
  subLabel?: string; // Optional for additional description
  progress?: number; // Optional for showing progress
  onPress: () => void;
  customStyle?: object; // New: Allows passing custom styles
  textStyle?: object;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  label,
  subLabel,
  progress,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
      </View>
      {progress !== undefined ? (
        <Text style={styles.progress}>{`${progress}%`}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    color: "#333333",
  },
  subLabel: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    color: "#888888",
    marginTop: 2,
  },
  progress: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#FF6F00", // Orange color for progress
    marginRight: 15,
  },
});

export default ProfileMenuItem;
