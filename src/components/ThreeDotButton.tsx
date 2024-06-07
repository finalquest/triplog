import React from 'react';
import { StyleSheet, TouchableOpacityProps, ViewStyle } from 'react-native';
import { Svg } from 'react-native-svg';
import RoughButton from './RoughButton';
import Icon from '../../assets/imgs/lists-bullets.svg';

interface ThreeDotsButtonProps {
  size: number;
  onPress: () => void;
  style?: ViewStyle;
}

const ThreeDotsButton: React.FC<ThreeDotsButtonProps> = ({ size, onPress, style }) => {
  return (
    <RoughButton
      onPress={onPress}
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
