import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getEntity as getLocalEntity } from '../services/localStorage';
import { EntityResponse, PositionRectangle, StorageUploadData } from '../model/interfaces';
import { deleteEntity, getLastEntity } from '../services/firestore';
import ThreeDotsButton from './ThreeDotButton';
import CircularLoading from './CircularAnimation';
import OptionsModal from '../modals/OptionsModal';
import strings from '../utils/strings';
import Label from './Label';
import MoreInfoModal from '../modals/MoreInfoModal';

const PreviewEntity = () => {
  const [lastEntity, setLastEntity] = useState<{ local: boolean; entity: EntityResponse<unknown> } | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<PositionRectangle | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

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

  const closeOptionsModal = () => {
    setButtonPosition(null);
  };

  const handleMoreInfo = () => {
    setShowMoreInfo(true);
    closeOptionsModal();
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

    closeOptionsModal();
  };

  let Component = <View style={{ flex: 1 }} />;
  const entity = lastEntity?.entity.entity;
  if (entity && entity.type === 'photo') {
    const uri = lastEntity.local ? (entity.data as StorageUploadData).url : (entity.data as StorageUploadData).publicUrl;
    Component = <Image onLoad={handleOnLoad} style={{ flex: 1, alignSelf: 'stretch' }} source={{ uri: uri }} />;
  } else {
    Component = (
      <Label
        style={{
          fontSize: 50,
        }}
        numberOfLines={4}>
        {strings.preview_no_entities}
      </Label>
    );
  }

  const shouldShowIcons = lastEntity && !loading && !showMoreInfo;

  return (
    <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center' }}>
      {Component}
      {loading && <CircularLoading size={150} strokeWidth={10} color="black" duration={1000} arcLength={270} />}
      {shouldShowIcons && <ThreeDotsButton size={35} onPress={handleButtonPress} />}
      <OptionsModal
        visible={!!buttonPosition}
        position={buttonPosition}
        onRequestClose={closeOptionsModal}
        onDelete={handleOnDelete}
        onMoreInfo={handleMoreInfo}
      />
      <MoreInfoModal
        visible={showMoreInfo}
        onRequestClose={() => {
          setShowMoreInfo(false);
        }}
      />
    </View>
  );
};

export default PreviewEntity;
