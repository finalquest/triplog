// RoughButton.tsx
import React, { useRef, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, TouchableOpacityProps } from 'react-native';
import Rough from 'react-native-rough';
import Svg from 'react-native-svg';
import { PositionRectangle } from '../model/interfaces';
import Label from './Label';

interface RoughButtonProps extends Omit<TouchableOpacityProps, 'onLayout'> {
  fillWeight?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  roughness?: number;
  hachureAngle?: number;
  hachureGap?: number;
  text?: {
    color: string;
    size: number;
  };
  fillStyle?: 'hachure' | 'solid' | 'zigzag' | 'cross-hatch' | 'dots' | 'sunburst' | 'dashed' | 'zigzag-line';
  onLayout?: (event: PositionRectangle) => void;
}

const RoughButton: React.FC<RoughButtonProps> = ({ onLayout, onPress, style, children, text, ...rest }) => {
  const elementRef = useRef<TouchableOpacity>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const handleOnLayout = () => {
    if (elementRef.current) {
      elementRef.current.measure((x, y, width, height, pageX, pageY) => {
        setSize({ width, height });
        if (onLayout) {
          onLayout({ x, y, width, height, pageX, pageY });
        }
      });
    }
  };

  //is a child string
  const isText = typeof children === 'string';
  return (
    <TouchableOpacity ref={elementRef} onPress={onPress} style={[styles.button, style]} onLayout={handleOnLayout}>
      <Svg pointerEvents="none" width={size.width} height={size.height} style={styles.container}>
        <Rough.Rectangle
          x={styles.button.padding / 2}
          y={styles.button.padding / 2}
          width={size.width - styles.button.padding}
          height={size.height - styles.button.padding}
          {...rest}
        />
        {children && (
          <View style={[styles.content, { height: size.height - styles.content.margin * 2 }]}>
            {(isText && <Label style={[styles.font, { color: text?.color, fontSize: text?.size }]}>{children}</Label>) || children}
          </View>
        )}
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
  font: {
    fontSize: 25,
    textAlignVertical: 'center',
  },
  content: {
    justifyContent: 'center',
    margin: 15,
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
