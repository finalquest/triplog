import React, { useCallback } from 'react';
import { Image, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getEntity as getLocalEntity } from '../services/localStorage';
import { EntityResponse, PositionRectangle, StorageUploadData } from '../model/interfaces';
import { deleteEntity, getLastEntity } from '../services/firestore';
import ThreeDotsButton from './ThreeDotButton';
import CircularLoading from './CircularAnimation';
import OptionsModal from '../modals/OptionsModal';
import strings from '../utils/strings';

const PreviewEntity = () => {
  const [lastEntity, setLastEntity] = useState<{ local: boolean; entity: EntityResponse<unknown> } | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<PositionRectangle | null>(null);
  const [loading, setLoading] = useState(true);

  const handleButtonPress = (position: PositionRectangle) => {
    setButtonPosition(position);
  };

  useEffect(() => {
    const get = async () => {
      const localEntity = await getLocalEntity();
      const remoteEntity = await getLastEntity();
      let entity = localEntity;
      if (localEntity?.id != remoteEntity?.id) {
        entity = remoteEntity;
      }
      if (!entity) {
        setLoading(false);
        setLastEntity(null);
        return;
      }
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
  }, [refresh]);

  const handleOnLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const closeModal = () => {
    setButtonPosition(null);
  };

  const handleOnDelete = async () => {
    // Delete the entity
    setLoading(true);
    const res = await deleteEntity(lastEntity?.entity.id!);
    if (res.ok) {
      setRefresh(!refresh);
    } else {
      setLoading(false);
    }

    closeModal();
  };

  let Component = <View style={{ flex: 1 }} />;
  const entity = lastEntity?.entity.entity;
  if (entity && entity.type === 'photo') {
    const uri = lastEntity.local ? (entity.data as StorageUploadData).url : (entity.data as StorageUploadData).publicUrl;
    Component = <Image onLoad={handleOnLoad} style={{ flex: 1, alignSelf: 'stretch' }} source={{ uri: uri }} />;
  } else {
    Component = (
      <Text
        style={{
          fontFamily: 'GochiHand-Regular',
          fontSize: 50,
          color: 'black',
          alignSelf: 'stretch',
          textAlign: 'center',
          marginHorizontal: 10,
        }}
        numberOfLines={4}>
        {strings.preview_no_entities}
      </Text>
    );
  }

  return (
    <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
      {Component}
      {loading && <CircularLoading size={150} strokeWidth={10} color="black" duration={1000} arcLength={270} />}
      {lastEntity && <ThreeDotsButton size={35} onPress={handleButtonPress} />}
      <OptionsModal visible={!!buttonPosition} position={buttonPosition} onRequestClose={closeModal} onDelete={handleOnDelete} />
    </View>
  );
};

export default PreviewEntity;
