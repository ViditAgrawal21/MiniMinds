import React from "react";
import { View, StyleSheet, Image, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import CustomIcon from "./CustomIcon";
import PrimaryButton from "./common/PrimaryButton";
import SecondaryButton from "./common/SecondaryButton";

export default function EditGuardian() {
  const [name, setName] = React.useState("Anny Jones");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [relation, setRelation] = React.useState("Mother");

  const handleCancel = () => {
    // Reset or navigate back
    setName("");
    setEmail("");
    setPhoneNumber("");
    setRelation("");
  };

  const handleSave = () => {
    // Handle form submission or saving
    const formData = {
      name,
      email,
      phoneNumber,
      relation,
    };
    // Add your saving logic here (API call, local storage, etc.)
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Top Appbar with a Back Arrow */}
        <View style={styles.appbar}>
          <TouchableOpacity onPress={() => {}} style={styles.backButton}>
            <CustomIcon type="IO" name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.appbarTitle}></Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileCard}>
          <View style={styles.profileContent}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarContainer}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: "https://via.placeholder.com/100",
                  }}
                />
                <Image
                  source={require("../assets/images/EditIcon.png")}
                  style={styles.editIcon}
                />
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileRelation}>{relation}</Text>
            </View>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formCard}>
          <Text style={styles.lable}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter the Name of the Guardian"
            style={styles.input}
          />

          <Text style={styles.lable}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter the E-mail of the Guardian"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.lable}>Phone Number</Text>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter the Phone Number of the Guardian"
            style={styles.input}
            keyboardType="phone-pad"
          />

          <Text style={styles.lable}>Relation with User</Text>
          <TextInput
            value={relation}
            onChangeText={setRelation}
            placeholder="Enter the Relation with the User"
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.secondaryButtonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={handleSave}>
                <Text style={styles.addButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  appbar: {
    backgroundColor: "#FFF",
    elevation: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 16,
  },
  appbarTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  profileContent: {
    width: "100%",
    alignItems: "center",
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  profileCard: {
    backgroundColor: "#FFF",
    marginTop: 16,
    marginHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: -20,
    right: 50,
    backgroundColor: "#FFF",
    elevation: 2,
    borderRadius: 20,
  },
  textContainer: {
    alignItems: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 12,
  },
  profileRelation: {
    fontSize: 16,
    color: "#888",
  },
  formCard: {
    backgroundColor: "#FFF",
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    backgroundColor: "#FFF",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#B0B0B0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "column",
    marginTop: 16,
    justifyContent: "space-between",
  },
  lable: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  secondaryButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#D27AD5",
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  cancelButtonText: {
    color: "#D27AD5",
    fontSize: 16,
    fontWeight: "600",
  },
  addButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 5,
    backgroundColor: "#D27AD5",
    paddingVertical: 12,
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
