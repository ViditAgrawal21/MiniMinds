import React from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomIcon from "./CustomIcon";

export default function GuardianSettings() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = React.useState(false);

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CustomIcon type="MI" name="arrow-back" size={24} color={"#000000"} />
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Guardian Control</Text>
      <View style={styles.settingRow}>
        <Text style={styles.settingRowText}>
          Would you like the notifications to be
        </Text>
        <Switch
          value={notifications}
          onValueChange={(value) => setNotifications(value)}
        />
      </View>
      <Text style={styles.sectionTitle}>Guardian Settings</Text>
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("GuardianList" as never)}
      >
        <Text style={styles.optionText}>Add/Edit Guardian</Text>
        <Text style={styles.optionSubText}>
          Edit details of the existing guardian
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    marginTop: 5,
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: -20,
    borderBottomWidth: 1,
    borderBottomColor: "#908A9421",
  },
  settingRowText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#000000",
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#908A9421",
  },
  optionText: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
  },
  optionSubText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#666",
  },
});
