import React from 'react';
import { StyleSheet, View } from 'react-native';
import RoughView from '../components/RoughView';
import Label from '../components/Label';
import RoughButton from '../components/RoughButton';
import strings from '../utils/strings';

interface ConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  body?: string;
  warningColors?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ title, body, onCancel, onConfirm, warningColors }) => {
  return (
    <RoughView fillWeight={3} strokeWidth={3} roughness={3} style={[styles.popover]}>
      {title && <Label style={{ fontSize: 45, marginTop: -20 }}>{title}</Label>}
      {body && <Label>{body}</Label>}
      <View style={{ flexDirection: 'row', marginHorizontal: -20, marginTop: 20 }}>
        <RoughButton
          onPress={onConfirm}
          style={styles.button}
          fillWeight={3}
          strokeWidth={5}
          fill={warningColors ? 'orangered' : 'gray'}
          hachureAngle={50}
          hachureGap={5}
          roughness={2}
          fillStyle={'zigzag'}
          text={{ color: 'white', size: 30 }}>
          {strings.button_yes}
        </RoughButton>
        <RoughButton
          onPress={onCancel}
          style={styles.button}
          fillWeight={3}
          strokeWidth={5}
          fill={warningColors ? 'skyblue' : 'gray'}
          hachureAngle={50}
          hachureGap={5}
          roughness={2}
          fillStyle={'zigzag'}
          text={{ color: 'white', size: 30 }}>
          {strings.button_no}
        </RoughButton>
      </View>
    </RoughView>
  );
};

const styles = StyleSheet.create({
  popover: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 10,
    alignSelf: 'stretch',
    marginHorizontal: 20,
    backgroundColor: 'white',
    padding: 20,
  },
  button: { alignSelf: 'stretch', height: 80, flex: 1 },
});

export default ConfirmDialog;
