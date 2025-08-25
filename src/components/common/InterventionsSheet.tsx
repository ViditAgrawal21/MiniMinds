import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
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
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Recommended Interventions</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.close}>X</Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.listContainer}>
            {selectedTest.interventionData.interventions.map(
              (item: any, index: number) => (
                <Pressable
                  key={index}
                  style={styles.row}
                  onPress={() => onSelectIntervention(item)}
                  android_ripple={{ color: "#DDD" }}
                >
                  {/* <View style={styles.leftBox}>
                    <Image source={item.image} style={styles.icon} />
                  </View> */}
                  <View style={styles.textArea}>
                    <Text style={styles.condition}>
                      {selectedTest.scan_title}
                    </Text>
                    <Text style={styles.subtitle}>{item.name}</Text>
                  </View>
                </Pressable>
              ),
            )}
          </ScrollView>
        </View>
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
  leftBox: {
    width: 60,
    height: 60,
    backgroundColor: "#FFD668",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
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
});
