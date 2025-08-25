import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const ConditionScoreGraph = () => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
          datasets: [
            {
              data: [70, 35, 20, 75, 40],
              color: () => `#E091FF`, // Line color
              strokeWidth: 2,
            },
          ],
        }}
        width={screenWidth - 40} // Make the chart responsive
        height={250} // Standardized height
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: () => `#E091FF`, // Line color
          labelColor: () => "#666", // X/Y axis labels
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#fff",
          },
          propsForBackgroundLines: {
            stroke: "#EDEDED", // Gridline color
          },
        }}
        bezier
        style={styles.chartStyle}
      />
    </View>
  );
};

export default ConditionScoreGraph;

const styles = StyleSheet.create({
  container: {
    height: 350, // Standardized height
    width: "100%", // Full width
    backgroundColor: "white",
    paddingHorizontal: 1,
    marginTop: 20,
  },
  chartStyle: {
    borderRadius: 8,
    marginVertical: 10,
  },
});
