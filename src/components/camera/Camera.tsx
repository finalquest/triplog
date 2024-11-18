import React, { useCallback, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { Camera, Point, getCameraDevice, getCameraFormat } from 'react-native-vision-camera'; // Assuming you are using react-native-vision-camera
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import RoughCircularButton from '../RoughCircularButton';
import BottomButtons from './BottomButtons';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import * as Location from 'expo-location';
import { saveNewImage } from '../../services/firestore';
import { saveEntitiy } from '../../services/localStorage';
import UploadFeedback from './UploadFeedback';
import { HumanReadableLocation } from '../../model/interfaces';
import Label from '../Label';

const CameraPreview = ({ onClose }: { onClose: () => void }) => {
  const progressValue = useRef(new Animated.Value(0)).current;
  const [uploading, setUploading] = useState(false);
  const [photoURI, setPhotoURI] = useState<string | null>(null);
  const cameraRef = useRef<Camera>(null);
  const devices = Camera.getAvailableCameraDevices();
  const device = getCameraDevice(devices, 'back', {
    physicalDevices: ['wide-angle-camera'],
  });

  const format = getCameraFormat(device!, [
    { photoResolution: { width: 6048, height: 8064 } },
    { videoResolution: 'max' },
    { photoHdr: false, videoHdr: false },
  ]);
  console.log('format', JSON.stringify(format));
  const onUpadte = useCallback((progress: number) => {
    console.log('Progress:', progress);
    Animated.timing(progressValue, {
      toValue: progress,
      duration: 500, // Adjust duration as needed
      useNativeDriver: true,
    }).start();
  }, []);

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

  const onUpload = async () => {
    if (!photoURI) {
      return;
    }
    setUploading(true);
    let location = await Location.getCurrentPositionAsync({});

    let geoCode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    let humanReadableLocation: HumanReadableLocation | null = null;
    if (geoCode.length > 0) {
      humanReadableLocation = {
        city: geoCode[0].city,
        country: geoCode[0].country,
        name: geoCode[0].name,
        region: geoCode[0].region,
        street: geoCode[0].street,
        district: geoCode[0].district,
      };
    }
    const result = await saveNewImage(
      photoURI,
      { lat: location.coords.latitude, long: location.coords.longitude, humanReadable: humanReadableLocation },
      onUpadte
    );

    if (!result.ok) {
      return;
    }

    saveEntitiy(result);

    CameraRoll.save(photoURI)
      .then(() => {
        console.log('Photo saved to camera roll');
      })
      .catch(error => {
        console.log('Error saving photo to camera roll:', error);
      });
    photoURI && setPhotoURI(null);
    progressValue.setValue(0);
    setUploading(false);
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
            photoQualityBalance="speed"
            device={device}
            isActive={!photoURI}
            photo={true}
            ref={cameraRef}
            format={format}
            videoHdr={false}
            photoHdr={true}
            videoStabilizationMode="off"
            enableLocation={true}
            zoom={device.neutralZoom}
            fps={30}
          />
        </GestureDetector>
      ) : (
        <View style={styles.noDeviceContainer}>
          <Label style={styles.noDeviceText}>No Camera Device Found</Label>
        </View>
      )}
      <UploadFeedback progress={progressValue} />
      {photoURI ? (
        !uploading && <BottomButtons onUpload={onUpload} onDelete={onDelete} style={styles.bottom} />
      ) : (
        <RoughCircularButton size={80} style={styles.captureButton} onPress={takeSnapshot} />
      )}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Label style={styles.closeButtonText}>X</Label>
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
  },
});

export default CameraPreview;
