import React, { useState } from 'react';
import { View, StyleSheet, Text, LayoutRectangle } from 'react-native';
import RoughView from '../components/RoughView';
import strings from '../utils/strings';
import RoughPlusButton from '../components/RoughAddButton';
import AddModal from '../modals/AddModal';
import CameraPreview from '../components/camera/Camera';
import PreviewEntity from '../components/PreviewEntity';
import Label from '../components/Label';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'white',
  },
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

const PLUS_BUTTON_SIZE = 80;

const Home = () => {
  const [buttonPosition, setButtonPosition] = useState<LayoutRectangle | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleButtonPress = (position: LayoutRectangle) => {
    setButtonPosition(position);
  };

  const closeModal = () => {
    setButtonPosition(null);
  };

  return (
    <View style={styles.flex}>
      <RoughView fillWeight={3} strokeWidth={3} roughness={3} style={styles.headerView}>
        <Label numberOfLines={4}>{strings.home_box_title}</Label>
      </RoughView>

      <RoughView fillWeight={3} strokeWidth={3} roughness={3} style={styles.content}>
        <View style={styles.contentContainer}>
          {showCamera ? (
            <CameraPreview
              onClose={() => {
                setShowCamera(false);
              }}
            />
          ) : (
            <PreviewEntity />
          )}
        </View>
        {!showCamera && <RoughPlusButton onPress={handleButtonPress} size={PLUS_BUTTON_SIZE} style={styles.plusButton} />}
      </RoughView>
      <AddModal
        visible={!!buttonPosition}
        position={buttonPosition}
        onRequestClose={closeModal}
        onImage={() => {
          setShowCamera(true);
          closeModal();
        }}
      />
    </View>
  );
};

export default Home;
