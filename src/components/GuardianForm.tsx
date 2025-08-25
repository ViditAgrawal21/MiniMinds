import * as React from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";

export default function ContactForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [relation, setRelation] = React.useState("");

  const handleCancel = () => {
    // Reset or navigate back
    setName("");
    setEmail("");
    setPhoneNumber("");
    setRelation("");
  };

  const handleSave = () => {
    // Handle form data submission
    const formData = {
      name,
      email,
      phoneNumber,
      relation,
    };
    // Add your saving logic (e.g., API call, local storage, etc.)
  };

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={(text: string) => setName(text)}
          style={styles.input}
          placeholder="Enter name"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          style={styles.input}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={(text: string) => setPhoneNumber(text)}
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Relation with User</Text>
        <TextInput
          value={relation}
          onChangeText={(text: string) => setRelation(text)}
          style={styles.input}
          placeholder="Enter relation"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.outlinedButton]}>
          <Text style={styles.outlinedButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={[styles.button, styles.containedButton]}>
          <Text style={styles.containedButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 50,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: '#8A56AC',
    backgroundColor: 'transparent',
  },
  outlinedButtonText: {
    color: '#8A56AC',
    fontSize: 16,
    fontWeight: '600',
  },
  containedButton: {
    backgroundColor: '#8A56AC',
  },
  containedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
