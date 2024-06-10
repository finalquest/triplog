import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { PHOTOS_COLLECTION } from '../model/constants';
import { EntityMap, EntityResponse, EntityType, GeoLocation, Result, StorageUploadData } from '../model/interfaces';
import { secretFlagVisibility } from '../model/dbSecrets';

export const saveNewImage = async (
  path: string,
  location: GeoLocation,
  uploadFeedbackCallback: (progress: number) => void
): Promise<EntityResponse<StorageUploadData>> => {
  try {
    const uploadImage = await uploadImageToStorage(path, uploadFeedbackCallback);
    if (!uploadImage.ok || !uploadImage.data) {
      return { error: uploadImage.error, ok: false };
    }
    const db = firestore();
    const entity = { type: 'photo' as EntityType, data: { publicUrl: uploadImage.data.publicUrl, url: path } };
    const response = { error: null, ok: true, entity: entity };
    const imageToAdd: EntityMap<StorageUploadData> = {
      entity: entity,
      createdAt: firestore.FieldValue.serverTimestamp(),
      geoLocation: location,
      [secretFlagVisibility]: true,
    };

    const imagesCollection = db.collection(PHOTOS_COLLECTION);
    const saveRes = await imagesCollection.add(imageToAdd);
    return { ...response, id: saveRes.id };
  } catch (error) {
    console.log('Error saving firestore document:', error);
    return { error: 'Error Saving firestore document', ok: false };
  }
};

const uploadImageToStorage = async (path: string, uploadFeeedbackCallback: (progress: number) => void): Promise<Result<StorageUploadData>> => {
  try {
    const fileName = path.split('/').pop();
    const reference = storage().ref(fileName);
    const task = reference.putFile(path);
    task.on('state_changed', taskSnapshot => {
      const progress = taskSnapshot.bytesTransferred / taskSnapshot.totalBytes;
      console.log(`Uploading image: ${progress}`);
      uploadFeeedbackCallback(progress); // Call the callback with the progress
    });

    await task;
    const publicUrl = await reference.getDownloadURL();
    return { error: null, ok: true, data: { publicUrl: publicUrl, url: '' } };
  } catch (error) {
    console.error('Error uploading file: ', error);
    return { error: 'Error uploading file', ok: false };
  }
};

export const deleteEntity = async (entityId: string): Promise<Result<null>> => {
  try {
    await firestore().collection(PHOTOS_COLLECTION).doc(entityId).delete();
    return { error: null, ok: true };
  } catch (error) {
    console.log('Error deleting entity:', error);
    return { error: 'Error deleting entity', ok: false };
  }
};

export const getLastEntity = async (): Promise<EntityResponse<unknown> | null> => {
  try {
    const entitiesCollection = firestore()
      .collection(PHOTOS_COLLECTION)
      .where(secretFlagVisibility, '==', true)
      .orderBy('createdAt', 'desc')
      .limit(1);
    const res = await entitiesCollection.get();
    if (res.empty) {
      return null;
    }
    const lastEntity = res.docs[0];
    const ret = { ...(lastEntity.data() as EntityResponse<unknown>), id: lastEntity.id };
    return ret;
  } catch (error) {
    console.log('Error getting last entity:', error);
    return { error: 'Error getting last entity', ok: false };
  }
};
