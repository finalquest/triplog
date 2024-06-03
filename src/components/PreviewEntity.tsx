import React from 'react';
import { Image, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getEntity as getLocalEntity } from '../services/localStorage';
import { EntityResponse, StorageUploadData } from '../model/interfaces';
import { getLastEntity } from '../services/firestore';

const PreviewEntity = () => {
  const [lastEntity, setLastEntity] = useState<{ local: boolean; entity: EntityResponse<unknown> } | null>(null);
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

      console.log('lastEntityStorage', entity);
    };
    get();
  }, []);

  let Component = <View style={{ flex: 1, backgroundColor: 'red' }} />;
  const entity = lastEntity?.entity.entity;
  if (entity && entity.type === 'photo') {
    const uri = lastEntity.local ? (entity.data as StorageUploadData).url : (entity.data as StorageUploadData).publicUrl;
    Component = <Image style={{ backgroundColor: 'brown', flex: 1, alignSelf: 'stretch' }} source={{ uri: uri }} />;
  }

  return <View style={{ flex: 1, alignSelf: 'stretch', backgroundColor: 'blue' }}>{Component}</View>;
};

export default PreviewEntity;
