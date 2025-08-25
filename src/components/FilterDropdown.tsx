import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  View,
} from "react-native";

interface FilterDropdownProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
  type?: "month" | "year" | "insight";
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  onSelect,
  placeholder,
  type,
}) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      {type && (
        <Text style={styles.labelText}>
          {type === "insight"
            ? "Type of insight"
            : type === "month"
              ? "Month"
              : "Year"}
        </Text>
      )}
      <TouchableOpacity
        style={[styles.dropdown]}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.dropdownText}>{label}</Text>
        {/* <CustomIcon type="IO" name="chevron-down" size={20} color="#9c27b0" /> */}
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item === label && styles.selectedOptionText,
                    ]}
                  >
                    {item}
                  </Text>
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
  },
  labelText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D27AD5",
    marginVertical: 5,
    width: "100%", // Adjusted width
    alignSelf: "center", // Center dropdown
  },
  dropdownText: {
    fontSize: 16,
    color: "#4A4A4A",
    alignSelf: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    maxHeight: "70%",
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  selectedOptionText: {
    color: "#9C27B0",
    fontWeight: "500",
  },
});

export default FilterDropdown;
