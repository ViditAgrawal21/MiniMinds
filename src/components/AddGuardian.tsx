import React from "react";
import { View, StyleSheet, Image, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";

export default function AddGuardian() {
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
        {/* Top Header with a Back Arrow */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {}} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileCard}>
          <View style={styles.profileContent}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarContainer}>
                <Image
                  style={styles.avatarImage}
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                  }}
                />
                <Image
                  source={require("../assets/images/Edit Icon.png")}
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
            placeholder="Enter the Name of the Guardian"
            onChangeText={setName}
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
            style={styles.input}
            placeholder="Enter the Relation with the User"
          />
          <View style={styles.buttonContainer}>
            <View style={styles.secondaryButtonContainer}>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
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
  header: {
    backgroundColor: "#FFF",
    elevation: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: "#333",
  },
  profileCard: {
    backgroundColor: "#FFF",
    marginTop: 16,
    marginHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  avatarContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: -8,
    right: -8,
    backgroundColor: "#FFF",
    elevation: 2,
    borderRadius: 20,
    zIndex: 1,
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 12,
    textAlign: "center",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    fontWeight: '600',
    color: "#333",
  },
  secondaryButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D27AD5",
    backgroundColor: "transparent",
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: "#D27AD5",
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: "#D27AD5",
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: '600',
  },
});
