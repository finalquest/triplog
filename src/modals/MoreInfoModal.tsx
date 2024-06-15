import React from 'react';
import { StyleSheet, Modal, TouchableOpacity, Dimensions, LayoutChangeEvent, LayoutRectangle, View } from 'react-native';
import RoughView from '../components/RoughView';
import MapView, { Marker } from 'react-native-maps';
import { EntityResponse } from '../model/interfaces';
import Label from '../components/Label';
import strings from '../utils/strings';
import { Timestamp } from '@react-native-firebase/firestore';

interface MoreInfoModalProps {
  onRequestClose: () => void;
  visible: boolean;
  entity?: EntityResponse<unknown>;
}

const { width, height } = Dimensions.get('window');
const MARGIN = 20;

const MoreInfoModal: React.FC<MoreInfoModalProps> = ({ onRequestClose, visible, entity }) => {
  if (!entity) return null;
  const [position, setPosition] = React.useState<LayoutRectangle | null>(null);
  const handleLayout = (event: LayoutChangeEvent) => {
    setPosition(event.nativeEvent.layout);
  };
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onRequestClose}>
      <TouchableOpacity style={styles.overlay} onPress={onRequestClose}></TouchableOpacity>
      <RoughView
        onLayout={handleLayout}
        fillWeight={3}
        strokeWidth={3}
        roughness={3}
        style={[styles.popover, { top: height / 2 - (position?.height || 0) / 2, left: MARGIN, width: width - MARGIN * 2 }]}>
        <MapView
          onPress={() => {}}
          style={{ height: 200, zIndex: 1000 }}
          region={{
            latitude: entity.geoLocation?.lat!,
            longitude: entity.geoLocation?.long!,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker coordinate={{ latitude: entity.geoLocation?.lat!, longitude: entity.geoLocation?.long! }} />
        </MapView>
        <View style={{ alignSelf: 'stretch' }}>
          {entity.geoLocation?.humanReadable && (
            <Label style={{ fontSize: 25, textAlign: 'left' }}>
              {strings.label_location}
              <Label style={{ fontSize: 20, color: 'dimgrey' }}>
                {entity.geoLocation?.humanReadable.city} - {entity.geoLocation.humanReadable.region} - {entity.geoLocation.humanReadable.country} -{' '}
                {entity.geoLocation.humanReadable.district}
              </Label>
            </Label>
          )}
          <Label style={{ fontSize: 25, textAlign: 'left' }}>
            {strings.label_date}
            <Label style={{ fontSize: 20, color: 'dimgrey' }}>{(entity.createdAt as Timestamp).toDate().toLocaleString()}</Label>
          </Label>
        </View>
      </RoughView>
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
    position: 'absolute',
    overflow: 'hidden',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

export default MoreInfoModal;
