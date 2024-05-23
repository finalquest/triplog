// RoughPlusButton.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacityProps, TouchableOpacity, LayoutChangeEvent, LayoutRectangle } from 'react-native';
import Rough from 'react-native-rough';
import Svg from 'react-native-svg';

interface RoughPlusButtonProps extends Omit<TouchableOpacityProps, 'onPress'> {
  size: number; // Size of the button
  paddingRatio?: number; // Padding as a ratio of the size
  fillWeight?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  hachureAngle?: number;
  hachureGap?: number;
  backgroundColor?: string;
  onPress?: (layout: LayoutRectangle) => void;
}

const RoughPlusButton: React.FC<RoughPlusButtonProps> = ({
  size,
  paddingRatio = 0.2,
  fillWeight = 3,
  stroke = 'black',
  strokeWidth = 5,
  fill = 'gray',
  hachureAngle = 60,
  hachureGap = 5,
  backgroundColor = 'white',
  style,
  onPress,
  ...rest
}) => {
  const padding = size * paddingRatio;

  const [buttonLayout, setButtonLayout] = useState<LayoutRectangle | null>(null);

  const handleLayout = (event: LayoutChangeEvent) => {
    setButtonLayout(event.nativeEvent.layout);
  };

  const handlePress = () => {
    if (onPress && buttonLayout) {
      onPress(buttonLayout);
    }
  };

  return (
    <TouchableOpacity
      onLayout={handleLayout}
      onPress={handlePress}
      style={[styles.container, { width: size, height: size, backgroundColor }, style]}
      {...rest}>
      <Svg pointerEvents="none" width={size} height={size}>
        <Rough.Circle
          x={size / 2}
          y={size / 2}
          diameter={size - padding}
          hachureAngle={hachureAngle}
          hachureGap={hachureGap}
          fillWeight={fillWeight}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
        />
        <Rough.Line x1={padding} y1={size / 2} x2={size - padding} y2={size / 2} stroke={stroke} strokeWidth={strokeWidth} />
        <Rough.Line x1={size / 2} y1={padding} x2={size / 2} y2={size - padding} stroke={stroke} strokeWidth={strokeWidth} />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoughPlusButton;
