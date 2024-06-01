import React from 'react';
import { Animated, LayoutChangeEvent, StyleSheet, View } from 'react-native';

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
          backgroundColor: 'blue',
          // Bind opacity to animated value

          transform: [{ translateY: height / 2 }, { scaleY: progress }, { translateY: -height / 2 }],
        },
      ]}
    />
  );
};

export default UploadFeedback;
