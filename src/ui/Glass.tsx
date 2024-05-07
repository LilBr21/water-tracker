import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

interface IProps {
  drankAmount: number;
  dailyGoal: number;
}

export const GlassFillAnimation = ({ drankAmount, dailyGoal }: IProps) => {
  const [fillPercentage, setFillPercentage] = useState(0);

  useEffect(() => {
    const percentage = (drankAmount / dailyGoal) * 100;
    setFillPercentage(percentage);
    console.log(drankAmount, dailyGoal, percentage, fillPercentage);
  }, [drankAmount, dailyGoal]);

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => /* Update drankAmount > */}
      <Svg height="250" width="250" viewBox="0 0 100 100">
        {/* SVG path for glass */}
        <Path fill="#D3D3D3" d="M10 5 L90 5 L70 95 L30 95 Z" />

        {/* SVG path for water level, adjust y coordinates based on fillPercentage */}
        <Path
          fill="#0095ff"
          d={`M10 ${95 - fillPercentage} L90 ${
            95 - fillPercentage
          } L70 95 L30 95 Z`}
        />
      </Svg>
      {/* </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
