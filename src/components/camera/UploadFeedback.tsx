import React from 'react';
import { Animated, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import RoughView from '../RoughView';

interface UploadFeedbackProps {
  progress: any;
}

const UploadFeedback: React.FC<UploadFeedbackProps> = ({ progress }) => {
  console.log('UploadFeedback', progress);
  const [height, setHeight] = React.useState(0);
  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };
  return (
    <Animated.View
      onLayout={handleLayout}
      style={[
        StyleSheet.absoluteFill,
        {
          transform: [{ translateY: height / 2 }, { scaleY: progress }, { translateY: -height / 2 }],
        },
      ]}>
      <RoughView
        fill="gray"
        fillStyle="zigzag"
        hachureAngle={90}
        fillWeight={1}
        hachureGap={3}
        roughness={3}
        style={StyleSheet.absoluteFill}></RoughView>
    </Animated.View>
  );
};

export default UploadFeedback;
