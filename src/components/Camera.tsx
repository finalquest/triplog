import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera'; // Assuming you are using react-native-vision-camera
import RoughCircularButton from './RoughCircularButton';

const CameraPreview = ({ onClose }: { onClose: () => void }) => {
  const [photoURI, setPhotoURI] = useState<string | null>(null);
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice('back');

  const takeSnapshot = async () => {
    if (cameraRef.current != null) {
      try {
        const photo = await cameraRef.current.takePhoto();
        setPhotoURI(photo.path);
      } catch (error) {
        console.log('Error taking photo:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {photoURI ? (
        <Image source={{ uri: photoURI }} style={StyleSheet.absoluteFill} />
      ) : device ? (
        <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} photo={true} ref={cameraRef} />
      ) : (
        <View style={styles.noDeviceContainer}>
          <Text style={styles.noDeviceText}>No Camera Device Found</Text>
        </View>
      )}
      <RoughCircularButton size={80} style={styles.captureButton} onPress={takeSnapshot} />
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    position: 'absolute',
    bottom: 30,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  imagePreviewContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 30,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  noDeviceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDeviceText: {
    fontSize: 18,
    color: 'black',
  },
});

export default CameraPreview;
