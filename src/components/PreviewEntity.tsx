import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getEntity as getLocalEntity } from '../services/localStorage';
import { EntityResponse, PositionRectangle, StorageUploadData } from '../model/interfaces';
import { getLastEntity } from '../services/firestore';
import ThreeDotsButton from './ThreeDotButton';
import CircularLoading from './CircularAnimation';
import OptionsModal from '../modals/OptionsModal';

const PreviewEntity = () => {
  const [lastEntity, setLastEntity] = useState<{ local: boolean; entity: EntityResponse<unknown> } | null>(null);
  const [buttonPosition, setButtonPosition] = useState<PositionRectangle | null>(null);
  const [loading, setLoading] = useState(true);

  const handleButtonPress = (position: PositionRectangle) => {
    setButtonPosition(position);
  };

  useEffect(() => {
    const get = async () => {
      let entity = await getLocalEntity();
      if (!entity) {
        entity = await getLastEntity();
      }
      if (!entity) return;
      if (entity.entity?.type === 'photo') {
        try {
          const data = entity.entity.data as StorageUploadData;
          await fetch(data.url);
          setLastEntity({ local: true, entity });
        } catch (error) {
          setLastEntity({ local: false, entity });
        }
      }
    };
    get();
  }, []);

  const handleOnLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const closeModal = () => {
    setButtonPosition(null);
  };

  let Component = <View style={{ flex: 1 }} />;
  const entity = lastEntity?.entity.entity;
  if (entity && entity.type === 'photo') {
    const uri = lastEntity.local ? (entity.data as StorageUploadData).url : (entity.data as StorageUploadData).publicUrl;
    Component = <Image onLoad={handleOnLoad} style={{ flex: 1, alignSelf: 'stretch' }} source={{ uri: uri }} />;
  }

  return (
    <View style={{ flex: 1, alignSelf: 'stretch' }}>
      {loading && <CircularLoading size={150} strokeWidth={10} color="black" duration={1000} arcLength={270} />}
      {Component}
      <ThreeDotsButton size={35} onPress={handleButtonPress} />
      <OptionsModal
        visible={!!buttonPosition}
        position={buttonPosition}
        onRequestClose={closeModal}
        onImage={() => {
          closeModal();
        }}
      />
    </View>
  );
};

export default PreviewEntity;
