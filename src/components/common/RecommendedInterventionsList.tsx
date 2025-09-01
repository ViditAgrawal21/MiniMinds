import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import {
  Cigarette,
  Angry,
  PillBottle,
  Clock3,
  Handshake,
  IndianRupee,
  BicepsFlexed,
  MessageCircleMore,
  HeartCrack,
  Facebook,
} from "lucide-react-native";
import { t } from "@/i18n/locales/i18n"; // Import translation function
export interface ScanItem {
  id: string;
  scan_title: string;
}

const icons: { [key: string]: React.ReactElement } = {
  Addictions: <Cigarette color="red" size={38} />,
  "Anger Management": <Angry color="red" size={38} />,
  "Common Psychological Issues": <PillBottle color="red" size={38} />,
  "Environment Issues Affecting Mental Wellbeing": (
    <Clock3 color="red" size={48} />
  ),
  "Family and Relationship": <Handshake color="red" size={38} />,
  "Financial Mental Health": <IndianRupee color="red" size={38} />,
  "General Physical Fitness": <BicepsFlexed color="red" size={38} />,
  "Internet Dependence": <MessageCircleMore color="red" size={38} />,
  Stress: <HeartCrack color="red" size={38} />,
  "Internet and Social Media Issue": <Facebook color="red" size={38} />,
  "Sleep": <Clock3 color="red" size={38} />,
  "Suicidal Behaviour": <HeartCrack color="red" size={38} />,
  "Sex Life": <HeartCrack color="red" size={38} />,
  "Professional Mental Health": <PillBottle color="red" size={38} />,
  "Social Mental Health": <Handshake color="red" size={38} />,
  "Youngster Issues": <Angry color="red" size={38} />,
};

export type RecommendedInterventionsListProps = {
  /**
   * The list of scans you want to show.
   * e.g. [{ id: "scan1", title: "Addiction Scan" }, …]
   */
  scans: ScanItem[];
  /**
   * Optional: Called whenever a scan is expanded.
   * Should return the content (your existing "condition name + interventions" block).
   */
  renderScanContent?: (scanId: string) => React.ReactNode;
  /** Section header – defaults to translated "Recommended Interventions" */
  heading?: string;
  /** New callback fired when a scan button is tapped */
  onScanSelect?: (scanId: string) => void;
};

const MAX_INTERVENTIONS = 10;

export default function RecommendedInterventionsList({
  scans,
  heading = t("homeTab.recommendedInterventions"),
  onScanSelect,
}: RecommendedInterventionsListProps) {
  const [selectedScan, setSelectedScan] = useState<string | null>(null);
  const [displayedScans, setDisplayedScans] = useState<ScanItem[]>([]);

  // Function to get translated scan title
  const getTranslatedScanTitle = (scanTitle: string) => {
    try {
      const translationKey = `insights.scanTypes.${scanTitle}`;
      const translatedTitle = t(translationKey);
      
      // If the translation key is returned as-is, it means the translation doesn't exist
      // In that case, return the original scan title
      return translatedTitle === translationKey ? scanTitle : translatedTitle;
    } catch (error) {
      // Fallback to original title if translation fails
      console.warn(`Translation failed for scan title: ${scanTitle}`, error);
      return scanTitle;
    }
  };

  // Update displayed scans whenever the input scans change
  useEffect(() => {
    // If we have more than MAX_INTERVENTIONS, only show the most recent ones
    if (scans.length > MAX_INTERVENTIONS) {
      // Get the most recent MAX_INTERVENTIONS items
      const recentScans = scans.slice(-MAX_INTERVENTIONS);
      setDisplayedScans(recentScans);
    } else {
      setDisplayedScans(scans);
    }
  }, [scans]);

  return (
    <View style={styles.container}>
      {/* Section Title */}
      <Text style={styles.heading}>{heading}</Text>

      {/* Scrollable list of scan buttons */}
      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {displayedScans.map((scan) => (
          <Pressable
            key={scan.id}
            style={[
              styles.scanButton,
              selectedScan === scan.id && styles.activeScanButton,
            ]}
            onPress={() => {
              setSelectedScan((prev) => (prev === scan.id ? null : scan.id));
              if (onScanSelect) onScanSelect(scan.id);
            }}
          >
            {icons[scan.scan_title] || <PillBottle color="red" size={38} />}
            <Text
              style={[
                styles.scanTitle,
                selectedScan === scan.id && styles.activeScanTitle,
              ]}
            >
              {getTranslatedScanTitle(scan.scan_title)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#4A4A4A",
  },
  listContainer: {
    width: "100%", // Use full width
    marginBottom: 12,
  },
  listContent: {
    flexDirection: "column",
  },
  scanButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  activeScanButton: {
    borderColor: "#D27AD5",
    backgroundColor: "#F7E7F9",
  },
  scanTitle: {
    paddingLeft: 16,
    fontSize: 16,
    color: "#333",
  },
  activeScanTitle: {
    color: "#D27AD5",
    fontWeight: "600",
  },
  contentContainer: {
    marginTop: 8,
    width: "100%",
  },
});
