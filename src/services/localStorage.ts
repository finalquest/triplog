import AsyncStorage from '@react-native-async-storage/async-storage';
import { EntityResponse } from '../model/interfaces';

const LOCAL_ENTITY_STORAGE = 'localEntityStorage';

export const saveEntitiy = async (entity: EntityResponse<unknown>): Promise<void> => {
  AsyncStorage.setItem(LOCAL_ENTITY_STORAGE, JSON.stringify(entity));
};
