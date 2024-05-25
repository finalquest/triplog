// RoughCaptureButton.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import Rough from 'react-native-rough';
import { Svg } from 'react-native-svg';

interface RoughCaptureButtonProps extends TouchableOpacityProps {
  size: number;
  onPress: () => void;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  fillStyle?: 'hachure' | 'solid' | 'zigzag' | 'cross-hatch' | 'dots' | 'sunburst' | 'dashed' | 'zigzag-line';
  fillWeight?: number;
  hachureAngle?: number;
  hachureGap?: number;
  roughness?: number;
}

const RoughCircularButton: React.FC<RoughCaptureButtonProps> = ({
  size,
  onPress,
  style,
  fill = 'transparent',
  strokeWidth = 3,
  stroke = 'red',
  fillStyle,
  roughness = 1,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Svg width={size} height={size}>
        <Rough.Circle
          x={size / 2}
          y={size / 2}
          diameter={size * 0.9}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
          fillStyle={fillStyle}
          roughness={roughness}
        />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoughCircularButton;
