import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getEntity as getLocalEntity } from '../services/localStorage';
import { EntityResponse, StorageUploadData } from '../model/interfaces';
import { getLastEntity } from '../services/firestore';
import ThreeDotsButton from './ThreeDotButton';
import CircularLoading from './CircularAnimation';

const PreviewEntity = () => {
  const [lastEntity, setLastEntity] = useState<{ local: boolean; entity: EntityResponse<unknown> } | null>(null);
  const [loading, setLoading] = useState(true);
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

  const handleOnLoad = useCallback(a => {
    setLoading(false);
  }, []);

  let Component = <View style={{ flex: 1 }} />;
  const entity = lastEntity?.entity.entity;
  if (entity && entity.type === 'photo') {
    const uri = lastEntity.local ? (entity.data as StorageUploadData).url : (entity.data as StorageUploadData).publicUrl;
    Component = <Image onLoad={handleOnLoad} style={{ flex: 1, alignSelf: 'stretch' }} source={{ uri: uri }} />;
  }

  return (
    <View style={{ flex: 1, alignSelf: 'stretch' }}>
      {<CircularLoading size={150} strokeWidth={10} color="black" duration={1000} arcLength={270} />}
      {Component}
      <ThreeDotsButton
        size={35}
        onPress={() => {
          console.log('AAAAA');
        }}
      />
    </View>
  );
};

export default PreviewEntity;
