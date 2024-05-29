import React, { useCallback, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Camera, Point, getCameraDevice, getCameraFormat } from 'react-native-vision-camera'; // Assuming you are using react-native-vision-camera
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import RoughCircularButton from '../RoughCircularButton';
import BottomButtons from './BottomButtons';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const CameraPreview = ({ onClose }: { onClose: () => void }) => {
  const [photoURI, setPhotoURI] = useState<string | null>(null);
  const cameraRef = useRef<Camera>(null);
  const devices = Camera.getAvailableCameraDevices();
  const device = getCameraDevice(devices, 'back', {
    physicalDevices: ['ultra-wide-angle-camera', 'wide-angle-camera', 'telephoto-camera'],
  });

  const format = getCameraFormat(device!, [{ photoResolution: 'max' }, { videoResolution: 'max' }, { photoHdr: true }]);

  const focus = useCallback((point: Point) => {
    const c = cameraRef.current;
    if (c != null) {
      c.focus(point);
    }
  }, []);

  const gesture = Gesture.Tap().onEnd(({ x, y }) => {
    focus({ x, y });
  });

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

  const onUpload = () => {
    CameraRoll.save(photoURI)
      .then(() => {
        console.log('Photo saved to camera roll');
      })
      .catch(error => {
        console.log('Error saving photo to camera roll:', error);
      });
  };

  const onDelete = () => {
    setPhotoURI(null);
  };

  return (
    <View style={styles.container}>
      {photoURI && <Image source={{ uri: photoURI }} style={StyleSheet.absoluteFill} />}
      {device ? (
        <GestureDetector gesture={gesture}>
          <Camera
            style={StyleSheet.absoluteFill}
            enableZoomGesture={true}
            photoQualityBalance="quality"
            device={device}
            isActive={!photoURI}
            photo={true}
            ref={cameraRef}
            format={format}
          />
        </GestureDetector>
      ) : (
        <View style={styles.noDeviceContainer}>
          <Text style={styles.noDeviceText}>No Camera Device Found</Text>
        </View>
      )}
      {photoURI ? (
        <BottomButtons onUpload={onUpload} onDelete={onDelete} style={styles.bottom} />
      ) : (
        <RoughCircularButton size={80} style={styles.captureButton} onPress={takeSnapshot} />
      )}
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
    backgroundColor: 'pink',
  },
  captureButton: {
    position: 'absolute',
    bottom: 30,
  },
  bottom: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    zIndex: 1,
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
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  noDeviceText: {
    fontSize: 18,
    color: 'black',
  },
});

export default CameraPreview;
