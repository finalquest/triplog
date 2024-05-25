// PopoverModal.tsx
import React from 'react';
import { StyleSheet, Modal, TouchableOpacity, LayoutRectangle, Dimensions } from 'react-native';
import RoughView from '../components/RoughView';
import RoughButton from '../components/RoughButton';
import strings from '../utils/strings';

interface AddModalProps {
  visible: boolean;
  position: LayoutRectangle | null;
  onRequestClose: () => void;
  onImage: () => void;
}

const PLUS_BUTTON_SIZE = 80;
const { width } = Dimensions.get('window');

const AddModal: React.FC<AddModalProps> = ({ visible, position, onRequestClose, onImage }) => {
  if (!position) {
    return null;
  }

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onRequestClose}>
      <TouchableOpacity style={styles.overlay} onPress={onRequestClose}>
        <RoughView
          fillWeight={3}
          strokeWidth={3}
          roughness={3}
          style={[styles.popover, { width: width / 2, left: position.x - width / 3 - PLUS_BUTTON_SIZE / 3, top: position.y - PLUS_BUTTON_SIZE / 3 }]}>
          <RoughButton
            onPress={onImage}
            style={styles.button}
            fillWeight={3}
            strokeWidth={5}
            fill="gray"
            hachureAngle={50}
            hachureGap={5}
            roughness={2}
            fillStyle={'zigzag'}
            text={{ color: 'white', size: 30 }}>
            {strings.home_action_add_image}
          </RoughButton>
          <RoughButton
            style={styles.button}
            fillWeight={3}
            strokeWidth={5}
            fill="gray"
            hachureAngle={50}
            hachureGap={5}
            roughness={2}
            fillStyle={'zigzag'}
            text={{ color: 'white', size: 30 }}>
            {strings.home_action_add_text}
          </RoughButton>
        </RoughView>
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
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 10,
    position: 'absolute',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  plusButton: { position: 'absolute', bottom: 20, right: 20, backgroundColor: 'transparent' },
  headerView: { alignSelf: 'stretch', height: 100, justifyContent: 'center' },
  content: { alignSelf: 'stretch', flex: 1 },
  contentContainer: { height: '100%', justifyContent: 'center', alignSelf: 'stretch' },
  button: { alignSelf: 'stretch', height: 80 },
});

export default AddModal;
