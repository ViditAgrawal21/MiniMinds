import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelectIntervention: (item: any) => void;
  selectedTest: any;
};

export default function InterventionsSheet({
  visible,
  onClose,
  onSelectIntervention,
  selectedTest,
}: Props) {
  // Early return - don't render anything if not visible
  if (!visible) {
    return null;
  }

  // Validate data structure completely
  const isValid = 
    selectedTest &&
    typeof selectedTest === 'object' &&
    selectedTest.interventionData &&
    typeof selectedTest.interventionData === 'object' &&
    selectedTest.interventionData.interventions &&
    Array.isArray(selectedTest.interventionData.interventions) &&
    selectedTest.interventionData.interventions.length > 0;

  // If data is invalid, show error UI
  if (!isValid) {
    console.log("InterventionsSheet: Invalid data structure");
    return (
      <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
        <View style={styles.overlay}>
          <Pressable style={styles.overlayTouchable} onPress={onClose}>
            <View style={styles.sheet}>
              <View style={styles.header}>
                <Text style={styles.headerText}>{"No Data"}</Text>
                <Pressable onPress={onClose}>
                  <Text style={styles.close}>{"✕"}</Text>
                </Pressable>
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.errorText}>{"No interventions available"}</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </Modal>
    );
  }

  // Filter and validate interventions
  const validInterventions = selectedTest.interventionData.interventions.filter((item: any) => {
    return item && typeof item === 'object' && item.name;
  });

  if (validInterventions.length === 0) {
    return (
      <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
        <View style={styles.overlay}>
          <Pressable style={styles.overlayTouchable} onPress={onClose}>
            <View style={styles.sheet}>
              <View style={styles.header}>
                <Text style={styles.headerText}>{"No Interventions"}</Text>
                <Pressable onPress={onClose}>
                  <Text style={styles.close}>{"✕"}</Text>
                </Pressable>
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.errorText}>{"No valid interventions found"}</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </Modal>
    );
  }

  // Safe extraction of scan title
  const scanTitle = selectedTest.scan_title 
    ? String(selectedTest.scan_title) 
    : "Unknown Category";

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.overlayTouchable} onPress={onClose}>
          <View style={styles.sheet}>
            <View style={styles.header}>
              <Text style={styles.headerText}>{"Recommended Interventions"}</Text>
              <Pressable onPress={onClose}>
                <Text style={styles.close}>{"✕"}</Text>
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.listContainer}>
              {validInterventions.map((item: any, index: number) => {
                const itemName = item.name ? String(item.name) : "Unnamed";
                
                return (
                  <Pressable
                    key={`int-${index}`}
                    style={styles.row}
                    onPress={() => onSelectIntervention(item)}
                    android_ripple={{ color: "#DDD" }}
                  >
                    <View style={styles.textArea}>
                      <Text style={styles.condition}>{scanTitle}</Text>
                      <Text style={styles.subtitle}>{itemName}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayTouchable: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  sheet: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#AB47BC",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  close: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  listContainer: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#808080",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    flex: 1,
    justifyContent: "center",
  },
  condition: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#F44336",
    textAlign: "center",
    padding: 20,
  },
});