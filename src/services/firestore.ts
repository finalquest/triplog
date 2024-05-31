import { firebase } from '@react-native-firebase/firestore';
import { PHOTOS_COLLECTION } from '../model/constants';
import { FirestorePhoto, Result } from '../model/interfaces';
import { secretFlagVisibility } from '../model/dbSecrets';

export const saveNewImage = async (path: string, location: { long: number; lat: number }): Promise<Result> => {
  try {
    const db = firebase.firestore();
    const imageToAdd: FirestorePhoto = {
      url: path,
      createdAt: new Date(),
      lat: location.lat,
      long: location.long,
      [secretFlagVisibility]: true,
    };
    const imagesCollection = db.collection(PHOTOS_COLLECTION);
    await imagesCollection.add(imageToAdd);
  } catch (error) {
    console.log('Error saving firestore document:', error);
    return { error: 'Error Saving firestore document', ok: false };
  }
  return { error: null, ok: true };
};
