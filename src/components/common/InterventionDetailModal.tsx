import React, { useState } from "react";
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
  intervention: any | null;
  onClose: () => void;
};

export default function InterventionDetailModal({
  visible,
  intervention,
  onClose,
}: Props) {
  // const [currentSection, setCurrentSection] = useState<
  //   InterventionType["sections"][number] | null
  // >(null);

  // if (!intervention) return null;

  // Decide what to render inside the modal body
  // let bodyContent: React.ReactNode;
  // if (currentSection) {
  // bodyContent = (
  //   <>
  //     <Pressable
  //       style={styles.backButton}
  //       onPress={() => setCurrentSection(null)}
  //     >
  //       <Text style={styles.backButtonText}>Back to Sections</Text>
  //     </Pressable>
  //     {intervention.type[0].component}
  //   </>
  // );
  // } else if (intervention.sections.length === 1) {
  //   const section = intervention.sections[0];
  //   bodyContent = <>{section.renderContent()}</>;
  // } else {
  //   bodyContent = (
  //     <>
  //       <Text style={styles.sectionListTitle}>
  //         Sections for {intervention.title}
  //       </Text>
  //       {intervention.sections.map(
  //         (sec: InterventionType["sections"][number], idx: number) => (
  //           <Pressable
  //             key={idx}
  //             style={styles.sectionButton}
  //             onPress={() => setCurrentSection(sec)}
  //             android_ripple={{ color: "#DDD" }}
  //           >
  //             <Text style={styles.sectionButtonText}>{sec.title}</Text>
  //           </Pressable>
  //         ),
  //       )}
  //     </>
  //   );
  // }
  intervention;
  console.log("Intervention Detail Modal", intervention);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{intervention.name}</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.closeText}>X</Text>
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {intervention.type[0].component()}
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
  modalContainer: {
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
  closeText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  contentContainer: {
    padding: 15,
  },
  sectionListTitle: {
    fontSize: 16,
    fontWeight: "600",
    margin: 15,
    textAlign: "center",
    color: "#333",
  },
  sectionButton: {
    backgroundColor: "#E6E6E6",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  sectionButtonText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  backButton: {
    backgroundColor: "#333",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});
