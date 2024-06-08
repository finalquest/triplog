import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface CircularLoadingProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  duration?: number;
  arcLength?: number; // In degrees
}

const CircularLoading: React.FC<CircularLoadingProps> = ({
  size = 100,
  strokeWidth = 5,
  color = 'blue',
  duration = 2000,
  arcLength = 90, // Default to 90 degrees
}) => {
  const radius = (size - strokeWidth) / 2; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const arcLengthFraction = arcLength / 360; // Convert arc length from degrees to fraction of the circumference

  const animatedValue = useRef(new Animated.Value(0)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateArc = () => {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();

      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    animateArc();
  }, [animatedValue, rotateValue, duration]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circumference * (1 - arcLengthFraction)],
  });

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, StyleSheet.absoluteFill]}>
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference * arcLengthFraction}, ${circumference}`}
            strokeDashoffset={strokeDashoffset as unknown as number}
            fill="none"
            strokeLinecap="round"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CircularLoading;
