import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import CustomIcon from "@/components/CustomIcon";

const SelectGuardianDropdown = () => {
  const [visible, setVisible] = useState(false);
  const [selectedGuardian, setSelectedGuardian] = useState<string | null>(null);

  const guardians = ["Guardian 1", "Guardian 2", "Guardian 3", "Guardian 4"];

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (guardian: string) => {
    setSelectedGuardian(guardian);
    closeMenu();
  };

  const resetSelection = () => {
    setSelectedGuardian(null);
    closeMenu();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Select a Guardian</Text>
        <TouchableOpacity onPress={resetSelection}>
          <Text style={styles.reset}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown */}
      <TouchableOpacity style={styles.dropdown} onPress={openMenu}>
        <Text style={styles.dropdownText}>
          {selectedGuardian || "Select Guardian"}
        </Text>
        <CustomIcon 
          type="IO" 
          name={visible ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#666"
        />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closeMenu}>
          <View style={styles.dropdownMenu}>
            <FlatList
              data={guardians}
              keyExtractor={(item, index) => `guardian-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.menuItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  dropdown: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#8A56AC",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 14,
    color: "#6A6A6A",
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownMenu: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 8,
    maxHeight: 200,
    minWidth: 200,
    borderWidth: 1,
    borderColor: "#8A56AC",
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  menuItemText: {
    fontSize: 14,
    color: "#333",
  },
});

export default SelectGuardianDropdown;