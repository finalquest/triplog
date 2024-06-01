import React from 'react';
import { Image, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getEntity } from '../services/localStorage';
import { EntityResponse, StorageUploadData } from '../model/interfaces';

const PreviewEntity = () => {
  const [lastEntity, setLastEntity] = useState<EntityResponse<unknown> | null>(null);
  useEffect(() => {
    const get = async () => {
      const entity = await getEntity();
      console.log('entity', entity);
      setLastEntity(entity);
    };
    get();
  }, []);

  let Component = <View style={{ flex: 1, backgroundColor: 'red' }} />;
  if (lastEntity && lastEntity.type === 'photo') {
    Component = (
      <Image style={{ backgroundColor: 'brown', flex: 1, alignSelf: 'stretch' }} source={{ uri: (lastEntity.data as StorageUploadData).url }} />
    );
  }

  return <View style={{ flex: 1, alignSelf: 'stretch', backgroundColor: 'blue' }}>{Component}</View>;
};

export default PreviewEntity;
