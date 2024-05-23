// RoughButton.tsx
import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, LayoutChangeEvent, ViewStyle, TouchableOpacityProps } from 'react-native';
import Rough from 'react-native-rough';
import Svg from 'react-native-svg';

interface RoughButtonProps extends TouchableOpacityProps {
    fillWeight?: number;
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
    roughness?: number;
    hachureAngle?: number;
    hachureGap?: number;
    fillStyle?: 'hachure' | 'solid' | 'zigzag' | 
        'cross-hatch' | 'dots' | 'sunburst' | 'dashed' | 'zigzag-line';
}

const RoughButton: React.FC<RoughButtonProps> = ({ onPress, style, children, ...rest }) => {
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      onLayout={onLayout}
    >
        <Svg
            pointerEvents="none"
            width={size.width}
            height={size.height}
            style={styles.container}
          >
            <Rough.Rectangle
              x={styles.button.padding/2}
              y={styles.button.padding/2}
              width={size.width - styles.button.padding}
              height={size.height - styles.button.padding}
              {...rest}
            />
          <View style={[styles.content, {height: size.height}]}>
            {children}
        </View>
          </Svg>
          
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  content: {
    padding: 15,
    zIndex: 1, // Ensure the content overlays the SVG
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default RoughButton;