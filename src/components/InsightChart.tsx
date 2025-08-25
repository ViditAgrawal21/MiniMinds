import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";

interface InsightChartProps {
  data: {
    value: number;
    label: string;
    frontColor: string;
  }[];
}

const InsightChart: React.FC<InsightChartProps> = ({ data }) => {
  // Helper function to format labels for multi-line text
  const formatLabel = (label: string) => {
    if (label.length > 8) {
      return label.split(" ").join("\n"); // Break label into multiple lines
    }
    return label; // Return single-line label for shorter text
  };

  return (
    <View style={styles.container}>
      <BarChart
        data={data.map((item) => ({
          ...item,
          label: formatLabel(item.label), // Format labels dynamically
        }))}
        barWidth={18}
        spacing={35}
        roundedTop={false}
        hideRules
        xAxisThickness={1}
        yAxisThickness={1}
        yAxisTextStyle={styles.axisText}
        xAxisLabelTextStyle={styles.axisText}
        maxValue={20}
        noOfSections={5}
        showLine={false}
        xAxisTextNumberOfLines={2} // Enable multi-line labels
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    height: Dimensions.get("window").height * 0.4,
    backgroundColor: "white",
    width: Dimensions.get("window").width,
  },
  axisText: {
    fontSize: 9,
    color: "#666",
    textAlign: "center", // Ensure labels are aligned
  },
});

export default InsightChart;
