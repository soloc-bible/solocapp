/*
* Onboarding screen wave animation logic
*/
import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useMemo } from "react";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useDerivedValue,
  SharedValue,
  withSpring,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { HEIGHT, MIN_LEDGE, Side, WIDTH } from "@/configs/constants";
import { Vector } from "react-native-redash";
import MaskedView from "@react-native-community/masked-view";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface WaveProps {
  side: Side;
  children: React.ReactElement;
  position: Vector<SharedValue<number>>;
  isTransitioning: SharedValue<boolean>;
}

export default function Wave({
  side,
  children,
  position,
  isTransitioning,
}: WaveProps) {
  const R = useDerivedValue(() => {
    const value = Math.min(position.x.value - MIN_LEDGE, WIDTH / 2.5);
    return value > 0 ? value : MIN_LEDGE;
  });
  const ledge = useDerivedValue(() => {
    const baseLedge = Math.max(0, position.x.value - MIN_LEDGE - R.value);
    return withSpring(isTransitioning.value ? position.x.value : baseLedge, {
      stiffness: 200,
    });
  });


const animatedProps = useAnimatedProps(() => {
  const stepY = Math.max(position.x.value - MIN_LEDGE, 0);
  const stepX = Math.min(stepY, WIDTH / 2.5) / 2;
  const C = stepY * 0.5522847498;

  // Simplified point calculations
  const points = [
    {x: ledge.value, y: position.y.value - 2 * stepY},          // P1
    {x: ledge.value + stepX, y: position.y.value - stepY},      // P2
    {x: ledge.value + stepX * 2, y: position.y.value},          // P3
    {x: ledge.value + stepX, y: position.y.value + stepY},      // P4
    {x: ledge.value, y: position.y.value + 2 * stepY},          // P5
  ];

  const d = [
    "M 0 0",
    `H ${points[0].x}`,
    `V ${points[0].y}`,
    `C ${points[0].x} ${points[0].y + C} ${points[1].x} ${points[1].y} ${points[1].x} ${points[1].y}`,
    `C ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y - C} ${points[2].x} ${points[2].y}`,
    `C ${points[2].x} ${points[2].y + C} ${points[3].x} ${points[3].y} ${points[3].x} ${points[3].y}`,
    `C ${points[3].x} ${points[3].y} ${points[4].x} ${points[4].y - C} ${points[4].x} ${points[4].y}`,
    `V ${HEIGHT}`,
    "H 0",
    "Z",
  ];

  return { d: d.join(" ") };
});
  const maskElement = useMemo(() => (
    <Svg
      style={[
        StyleSheet.absoluteFill,
        {
          transform: [{ rotateY: side === Side.RIGHT ? "180deg" : "0deg" }],
        },
      ]}
    >
      <AnimatedPath
        fill={
          Platform.OS === "android"
            ? children.props.slide.color
            : children.props.color
        }
        animatedProps={animatedProps}
      />
    </Svg>
  ), [side]);

  const androidStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: isTransitioning.value
            ? withTiming(0)
            : side === Side.RIGHT
            ? WIDTH - ledge.value
            : -WIDTH + ledge.value,
        },
      ],
    };
  });

  if (Platform.OS === "android") {
    return (
      <View style={StyleSheet.absoluteFill}>
        {maskElement}
        <Animated.View style={[StyleSheet.absoluteFill, androidStyle]}>
          {children}
        </Animated.View>
      </View>
    );
  }

  return (
    // @ts-ignore
    <MaskedView style={StyleSheet.absoluteFill} maskElement={maskElement}>
      {children}
    </MaskedView>
  );
}

