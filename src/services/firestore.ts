import { firebase } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { PHOTOS_COLLECTION } from '../model/constants';
import { FirestorePhoto, Result } from '../model/interfaces';
import { secretFlagVisibility } from '../model/dbSecrets';

export const saveNewImage = async (path: string, location: { long: number; lat: number }): Promise<Result> => {
  try {
    const uploadImage = await uploadImageToStorage(path);
    if (!uploadImage.ok) {
      return uploadImage;
    }
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

const uploadImageToStorage = async (path: string): Promise<Result> => {
  try {
    const fileName = path.split('/').pop();
    const reference = storage().ref(fileName);
    await reference.putFile(path);
    console.log('File successfully uploaded!');
    return { error: null, ok: true };
  } catch (error) {
    console.error('Error uploading file: ', error);
    return { error: 'Error uploading file', ok: false };
  }
};
