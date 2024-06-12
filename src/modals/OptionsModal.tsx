import React, { Component, useMemo, useState } from 'react';
import { StyleSheet, Modal, TouchableOpacity, LayoutRectangle, Dimensions, LayoutChangeEvent } from 'react-native';
import RoughView from '../components/RoughView';
import RoughButton from '../components/RoughButton';
import strings from '../utils/strings';
import { PositionRectangle } from '../model/interfaces';
import ConfirmDialog from './ConfirmDialog';

interface OptionsModalProps {
  visible: boolean;
  position: PositionRectangle | null;
  onRequestClose: () => void;
  onDelete: () => void;
}

const PLUS_BUTTON_SIZE = 60;
const { width } = Dimensions.get('window');

const OptionsModal: React.FC<OptionsModalProps> = ({ visible, position, onRequestClose, onDelete }) => {
  if (!position) {
    return null;
  }

  const options = useMemo(() => {
    return (
      <>
        <RoughView
          fillWeight={3}
          strokeWidth={3}
          roughness={3}
          style={[
            styles.popover,
            {
              width: width / 2,
              left: position.x - width / 3 - PLUS_BUTTON_SIZE / 3,
              top: position.pageY + PLUS_BUTTON_SIZE,
            },
          ]}>
          <RoughButton
            onPress={() => {
              setShowConfirm(true);
            }}
            style={styles.button}
            fillWeight={3}
            strokeWidth={5}
            fill="gray"
            hachureAngle={50}
            hachureGap={5}
            roughness={2}
            fillStyle={'zigzag'}
            text={{ color: 'white', size: 30 }}>
            {strings.preview_action_delete_entity}
          </RoughButton>
        </RoughView>
      </>
    );
  }, []);

  const confirm = useMemo(() => {
    return (
      <ConfirmDialog
        title={strings.preview_action_delete_entity}
        body={strings.preview_action_delete_confirm_body}
        onConfirm={() => {
          onDelete();
          onRequestClose();
        }}
        onCancel={() => {
          setShowConfirm(false);
        }}
        warningColors
      />
    );
  }, []);

  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onRequestClose}>
      <TouchableOpacity style={styles.overlay} onPress={onRequestClose}>
        {showConfirm ? confirm : options}
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

export default OptionsModal;
