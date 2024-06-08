// RoughView.tsx
import React, { useState } from 'react';
import { View, StyleSheet, LayoutChangeEvent, ViewStyle, ViewProps } from 'react-native';
import Rough from 'react-native-rough';
import Svg from 'react-native-svg';

interface RoughViewProps extends ViewProps {
  fillWeight?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  roughness?: number;
  hachureAngle?: number;
  hachureGap?: number;
  fillStyle?: 'hachure' | 'solid' | 'zigzag' | 'cross-hatch' | 'dots' | 'sunburst' | 'dashed' | 'zigzag-line';
}

const RoughView: React.FC<RoughViewProps> = ({ onLayout, style, children, ...rest }) => {
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
    if (onLayout) {
      onLayout(event);
    }
  };

  return (
    <View style={style} onLayout={handleLayout}>
      <Svg pointerEvents="none" width={size.width} height={size.height} style={styles.container}>
        <Rough.Rectangle
          x={styles.view.padding / 2}
          y={styles.view.padding / 2}
          width={size.width - styles.view.padding}
          height={size.height - styles.view.padding}
          {...rest}
        />
      </Svg>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    padding: 15,
    zIndex: 1, // Ensure the content overlays the SVG
  },
});

export default RoughView;
