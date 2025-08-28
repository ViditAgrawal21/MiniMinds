import React from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomIcon from "@Components/CustomIcon";
// import CustomIcon from "../../../components/CustomIcon";

export default function GeneralSettings() {
  const [notifications, setNotifications] = React.useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CustomIcon type="MI" name="arrow-back" size={24} color={"#000000"}/>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Notifications</Text>
      <View style={styles.settingRow}>
        <Text style={styles.settingRowText}>Would you like the notifications to be</Text>
        <Switch
          value={notifications}
          onValueChange={(value) => setNotifications(value)}
        />
      </View>

      <Text style={styles.sectionTitle}>Account Settings</Text>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Delete account</Text>
        <Text style={styles.optionSubText}>Permanently delete your account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Deactivate account</Text>
        <Text style={styles.optionSubText}>
          Permanently deactivate your account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Log out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
      <Text style={styles.sectionTitle}>Support</Text>
      <Text style={styles.optionSubText}>Help</Text>
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
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    marginTop: 10,
    marginBottom: 5,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: -15,
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
    marginTop: -12,
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
    marginTop: -5,
  },
});
