import React from 'react';
import { StyleSheet, Modal, TouchableOpacity } from 'react-native';
import RoughView from '../components/RoughView';

interface MoreInfoModalProps {
  onRequestClose: () => void;
  visible: boolean;
}

const MoreInfoModal: React.FC<MoreInfoModalProps> = ({ onRequestClose, visible }) => {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onRequestClose}>
      <TouchableOpacity style={styles.overlay} onPress={onRequestClose}>
        <RoughView fillWeight={3} strokeWidth={3} roughness={3} style={[styles.popover]}></RoughView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popover: {
    backgroundColor: 'white',
    margin: 20,
    overflow: 'hidden',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

export default MoreInfoModal;
