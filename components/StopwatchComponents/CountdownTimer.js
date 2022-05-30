import React, { useState } from "react";
import {
  Vibration,
  StatusBar,
  Easing,
  TextInput,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import {
  BottomTabBarHeightContext,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getStatusBarHeight } from "react-native-status-bar-height";

const { width, height } = Dimensions.get("window");

const timers = [...Array(31).keys()].map((i) => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

export default function Timer() {
  const bottomTabHeight = useBottomTabBarHeight();
  const edges = useSafeAreaInsets();
  const statusBarHeight = getStatusBarHeight(true);
  const extraHeight = 30 + edges.top + 50 + statusBarHeight; //from main screen banners and tabs
  const newHeight = height / (height - extraHeight);

  const scroll = React.useRef(new Animated.Value(0)).current;
  const [duration, setDuration] = useState(1);
  const textInputAnimation = React.useRef(
    new Animated.Value(timers[0])
  ).current;
  const timerAnimation = React.useRef(new Animated.Value(height)).current; // start from "height", not visible
  const buttonAnimation = React.useRef(new Animated.Value(0)).current;
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    const listener = textInputAnimation.addListener(({ value }) => {
      inputRef?.current?.setNativeProps({
        text: Math.ceil(value).toString(),
      });
    });
    return () => {
      textInputAnimation.removeListener(listener);
      textInputAnimation.removeAllListeners();
    };
  });

  const animation = React.useCallback(() => {
    //number counts down from 'duration'
    textInputAnimation.setValue(duration);

    Animated.sequence([
      //button disappears to the bottom
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),

      //background cover fills the screen quickly
      Animated.timing(timerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.parallel([
        //Countdown number display animation
        Animated.timing(textInputAnimation, {
          toValue: 0,
          duration: duration * 1000,
          useNativeDriver: true,
        }),

        //background cover goes down as timer counts down to zero
        Animated.timing(timerAnimation, {
          toValue: height,
          duration: duration * 1000 * newHeight,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(400),
    ]).start(() => {
      Vibration.cancel();
      Vibration.vibrate();
      //button comes back to its original position with the reversed animation
      Animated.timing(buttonAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [duration]);

  //opacity decreases
  const opacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  //height decreases
  const translateY = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const textOpacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            height,
            width,
            backgroundColor: "#CC0000",
            opacity: 0.7,
            transform: [
              {
                translateY: timerAnimation,
              },
            ],
          },
        ]}
      />

      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 100,
            opacity,
            transform: [
              {
                translateY,
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={animation}>
          <View style={styles.roundButton} />
        </TouchableOpacity>
      </Animated.View>
      <View
        style={{
          position: "absolute",
          top: height / 10,
          left: 0,
          right: 0,
          flex: 1,
        }}
      >
        <Animated.View
          style={{
            width: ITEM_SIZE,
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
            opacity: textOpacity,
          }}
        >
          <TextInput
            ref={inputRef}
            style={styles.text}
            defaultValue={duration.toString()}
          />
        </Animated.View>
        <Animated.FlatList
          data={timers}
          keyExtractor={(item) => item.toString()}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0, opacity }}
          decelerationRate="fast"
          snapToInterval={ITEM_SIZE}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / ITEM_SIZE);
            setDuration(timers[index]);
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { x: scroll } },
              },
            ],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{
            paddingHorizontal: ITEM_SPACING,
          }}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ];

            const opacity = scroll.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.5],
            });

            const scale = scroll.interpolate({
              inputRange,
              outputRange: [0.7, 1.3, 0.7],
            });
            return (
              <Animated.View
                style={{
                  width: ITEM_SIZE,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Animated.Text
                  style={[
                    styles.text,
                    {
                      opacity,
                      transform: [
                        {
                          scale,
                        },
                      ],
                    },
                  ]}
                >
                  {item}
                </Animated.Text>
              </Animated.View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  roundButton: {
    width: 100,
    height: 100,
    borderRadius: 80,
    backgroundColor: "#CC0000",
  },
  text: {
    fontSize: ITEM_SIZE * 0.45,
    fontWeight: "500",
  },
});
