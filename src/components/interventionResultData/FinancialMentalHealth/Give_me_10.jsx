import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function

const FinancialMentalHealth_GIVEME10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.giveMe10.intro")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("financialMentalHealthSection.giveMe10.financialWorries")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("financialMentalHealthSection.giveMe10.financialWorriesQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("financialMentalHealthSection.giveMe10.financialWorriesScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("financialMentalHealthSection.giveMe10.financialControl")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("financialMentalHealthSection.giveMe10.financialControlQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("financialMentalHealthSection.giveMe10.financialControlScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("financialMentalHealthSection.giveMe10.financialSecurity")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("financialMentalHealthSection.giveMe10.financialSecurityQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("financialMentalHealthSection.giveMe10.financialSecurityScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("financialMentalHealthSection.giveMe10.stressDueToFinances")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t("financialMentalHealthSection.giveMe10.stressDueToFinancesQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("financialMentalHealthSection.giveMe10.stressDueToFinancesScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("financialMentalHealthSection.giveMe10.financialPreparedness")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "financialMentalHealthSection.giveMe10.financialPreparednessQuestion",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        {t("financialMentalHealthSection.giveMe10.financialPreparednessScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "financialMentalHealthSection.giveMe10.financialWellbeingMentalHealth",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "financialMentalHealthSection.giveMe10.financialWellbeingMentalHealthQuestion",
        )}
      </Text>
      <Text style={styles.paragraph}></Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Financial Empowerment:</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - To what extent do you feel empowered to make decisions that improve
        your financial situation?
      </Text>
      <Text style={styles.paragraph}>
        - (1) Not at all, (2) A little, (3) Moderately, (4) Very much, (5)
        Completely
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Financial Satisfaction:</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - How satisfied are you with your current financial situation?
      </Text>
      <Text style={styles.paragraph}>
        - (1) Very dissatisfied, (2) Dissatisfied, (3) Neutral, (4) Satisfied,
        (5) Very satisfied
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Financial Goals:</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - How confident are you in achieving your financial goals?
      </Text>
      <Text style={styles.paragraph}>
        - (1) Not at all confident, (2) Slightly confident, (3) Moderately
        confident, (4) Very confident, (5) Extremely confident
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Financial Planning:</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - How often do you actively plan and manage your finances?
      </Text>
      <Text style={styles.paragraph}>
        - (1) Never, (2) Rarely, (3) Sometimes, (4) Often, (5) Always
      </Text>
      <Text style={styles.paragraph}>
        These questions aim to capture various dimensions of financial mental
        health, including control, security, stress, empowerment, and
        satisfaction. They can help in assessing how financial well-being is
        influencing an individual's overall mental health.
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

export default FinancialMentalHealth_GIVEME10Screen;
