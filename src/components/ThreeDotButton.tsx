import React, { useState } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import RoughButton from './RoughButton';
import Icon from '../../assets/imgs/lists-bullets.svg';
import { PositionRectangle } from '../model/interfaces';

interface ThreeDotsButtonProps {
  size: number;
  onPress?: (layout: PositionRectangle) => void;
  style?: ViewStyle;
}

const ThreeDotsButton: React.FC<ThreeDotsButtonProps> = ({ size, onPress, style }) => {
  const [buttonLayout, setButtonLayout] = useState<PositionRectangle | null>(null);

  const handleLayout = (event: PositionRectangle) => {
    setButtonLayout(event);
  };

  const handlePress = () => {
    if (onPress && buttonLayout) {
      onPress(buttonLayout);
    }
  };

  return (
    <RoughButton
      onLayout={handleLayout}
      onPress={handlePress}
      style={[styles.button, { height: size * 2, width: size * 2 }, style]}
      fillWeight={3}
      stroke="black"
      strokeWidth={5}
      fill="gray"
      hachureAngle={50}
      hachureGap={10}
      roughness={2}
      fillStyle={'zigzag'}>
      <Icon width={size} height={size} strokeWidth={2} stroke={'black'} />
    </RoughButton>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default ThreeDotsButton;
