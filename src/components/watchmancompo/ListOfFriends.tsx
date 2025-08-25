import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

const ListOfFriends = () => {
  const [friends, setFriends] = useState(["Friend 1", "Friend 2"]);
  const [newFriend, setNewFriend] = useState("");

  const addFriend = () => {
    if (newFriend.trim() === "") {
      Alert.alert("Invalid Input", "Friend's name cannot be empty.");
      return;
    }
    setFriends([...friends, newFriend.trim()]);
    setNewFriend(""); // Clear the input
  };

  const resetFriends = () => {
    setFriends(["Friend 1", "Friend 2"]); // Reset to default friends
    Alert.alert("Reset", "List of friends has been reset.");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>List of friends</Text>
        <TouchableOpacity onPress={resetFriends}>
          <Text style={styles.reset}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Friends List */}
      {friends.map((friend, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={friend}
          editable={false} // Disable editing of default friends
        />
      ))}

      {/* Add New Friend */}
      <TextInput
        style={styles.input}
        placeholder="Add a Friend"
        value={newFriend}
        onChangeText={setNewFriend}
        onSubmitEditing={addFriend} // Add friend when "Enter" is pressed
      />
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
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
    color: "#4A4A4A",
    fontSize: 14,
  },
});

export default ListOfFriends;