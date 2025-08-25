import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function

const FinancialMentalHealth_RGIVEME10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            {t("financialMentalHealthSection.rGiveMe10.item1")}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.rGiveMe10.reasoning1")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            {t("financialMentalHealthSection.rGiveMe10.item2")}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.rGiveMe10.reasoning2")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            {t("financialMentalHealthSection.rGiveMe10.item3")}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.rGiveMe10.reasoning3")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            {t("financialMentalHealthSection.rGiveMe10.item4")}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.rGiveMe10.reasoning4")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            {t("financialMentalHealthSection.rGiveMe10.item5")}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.rGiveMe10.reasoning5")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            {t("financialMentalHealthSection.rGiveMe10.item6")}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.rGiveMe10.reasoning6")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            {t("financialMentalHealthSection.rGiveMe10.item7")}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.rGiveMe10.reasoning7")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            {t("financialMentalHealthSection.rGiveMe10.item8")}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.rGiveMe10.reasoning8")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            {t("financialMentalHealthSection.rGiveMe10.item9")}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.rGiveMe10.reasoning9")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            {t("financialMentalHealthSection.rGiveMe10.item10")}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.rGiveMe10.reasoning10")}
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

export default FinancialMentalHealth_RGIVEME10Screen;
