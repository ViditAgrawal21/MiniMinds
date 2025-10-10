import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import CustomIcon from "./CustomIcon";

type SearchBarProps = {
  searchText: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  helperText?: string;
};

export default function SearchBar({
  searchText,
  onChangeText,
  placeholder = "Search Scans applicable to you",
  helperText = "Click on the scan below to proceed",
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <CustomIcon type="IO" name="search" size={20} color="#4A4A4A" style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor="#4A4A4A"
          value={searchText}
          onChangeText={onChangeText}
        />
      </View>

      {/* Helper Text */}
      <Text style={styles.helperText}>{helperText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#AB47BC",
    borderRadius: 35,
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 10,
    marginLeft: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  helperText: {
    marginTop: 15,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#5F6368",
    textAlign: "center",
  },
});
