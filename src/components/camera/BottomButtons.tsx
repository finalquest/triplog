import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import ArrowIcon from '../ArrowIcon';
import DeleteIcon from '../DeleteIcon';

interface BottomButtonsProps extends ViewProps {
  onUpload?: () => void;
  onDelete?: () => void;
}

const BottomButtons: React.FC<BottomButtonsProps> = ({ style, onUpload, onDelete }) => {
  return (
    <View style={[styles.container, style]}>
      <ArrowIcon size={80} stroke="gray" strokeWidth={2} fill="gray" roughness={2} onPress={onUpload} />
      <DeleteIcon size={80} stroke="gray" strokeWidth={3} fill="gray" roughness={2} fillStyle="zigzag" onPress={onDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  noDeviceText: {
    fontSize: 18,
    color: 'black',
  },
});

export default BottomButtons;
