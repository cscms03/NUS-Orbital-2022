import React, { Component, useState } from "react";
import {
  Easing,
  View,
  StyleSheet,
  Text,
  Animated,
  TextInput,
} from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function DonutChart({
  percentage = 75,
  radius = 40,
  strokeWidth = 10,
  duration = 1000,
  textColor,
  max = 100,
}) {
  const ratio = percentage / max;

  const green = ratio <= 0.5 ? Math.floor(255 * ratio * 2) : 255;
  const red = ratio <= 0.5 ? 255 : Math.floor(255 * (1 - ratio));
  const color = `rgba(${red}, ${green}, 0, 1)`;

  const animated = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = (toValue) => {
    return Animated.timing(animated, {
      delay: 1000,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  React.useEffect(() => {
    animation(percentage);
    animated.addListener((v) => {
      const maxPerc = (100 * v.value) / max;
      const strokeDashoffset = circumference - (circumference * maxPerc) / 100; //percentage, length
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}`,
        });
      }
      if (circleRef?.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    }, []);

    return () => {
      animated.removeAllListeners();
    };
  });

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity=".1"
          />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          { fontSize: radius / 2.4, color: textColor ?? "#333333" },
          styles.text,
        ]}
      />
    </View>
  );
}

export default DonutChart;

const styles = StyleSheet.create({
  text: { fontWeight: "800", textAlign: "center", marginBottom: 10 },
});
