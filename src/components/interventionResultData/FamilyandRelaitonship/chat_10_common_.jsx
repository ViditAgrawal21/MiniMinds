import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n";

const FamilyandRelaitonship_CHAT10COMMONScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("familyRelationshipSection.chat10Common.introduction")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("familyRelationshipSection.chat10Common.communicationTitle")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("familyRelationshipSection.chat10Common.communicationHow")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("familyRelationshipSection.chat10Common.communicationExample")}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("familyRelationshipSection.chat10Common.qualityTimeTitle")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("familyRelationshipSection.chat10Common.qualityTimeHow")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("familyRelationshipSection.chat10Common.qualityTimeExample")}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("familyRelationshipSection.chat10Common.activeListeningTitle")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("familyRelationshipSection.chat10Common.activeListeningHow")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("familyRelationshipSection.chat10Common.activeListeningExample")}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "familyRelationshipSection.chat10Common.respectBoundariesTitle",
              )}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("familyRelationshipSection.chat10Common.respectBoundariesHow")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("familyRelationshipSection.chat10Common.respectBoundariesExample")}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "familyRelationshipSection.chat10Common.sharedResponsibilitiesTitle",
              )}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t(
            "familyRelationshipSection.chat10Common.sharedResponsibilitiesHow",
          )}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t(
            "familyRelationshipSection.chat10Common.sharedResponsibilitiesExample",
          )}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("familyRelationshipSection.chat10Common.supportTitle")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("familyRelationshipSection.chat10Common.supportHow")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("familyRelationshipSection.chat10Common.supportExample")}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "familyRelationshipSection.chat10Common.conflictResolutionTitle",
              )}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("familyRelationshipSection.chat10Common.conflictResolutionHow")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t(
            "familyRelationshipSection.chat10Common.conflictResolutionExample",
          )}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("familyRelationshipSection.chat10Common.gratitudeTitle")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("familyRelationshipSection.chat10Common.gratitudeHow")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("familyRelationshipSection.chat10Common.gratitudeExample")}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("familyRelationshipSection.chat10Common.flexibilityTitle")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("familyRelationshipSection.chat10Common.flexibilityHow")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("familyRelationshipSection.chat10Common.flexibilityExample")}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("familyRelationshipSection.chat10Common.traditionsTitle")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("familyRelationshipSection.chat10Common.traditionsHow")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("familyRelationshipSection.chat10Common.traditionsExample")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        {t("familyRelationshipSection.chat10Common.conclusion")}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#222",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
    color: "#333",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: "#444",
  },
  listContainer: {
    marginBottom: 15,
    paddingLeft: 10,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bulletNumber: {
    fontSize: 16,
    marginRight: 8,
    width: 20,
    fontWeight: "bold",
    color: "#555",
  },
  listText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    color: "#444",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
});

export default FamilyandRelaitonship_CHAT10COMMONScreen;
