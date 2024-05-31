import { firebase } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { PHOTOS_COLLECTION } from '../model/constants';
import { FirestorePhoto, Result, StorageUploadResponse } from '../model/interfaces';
import { secretFlagVisibility } from '../model/dbSecrets';

export const saveNewImage = async (path: string, location: { long: number; lat: number }): Promise<Result<StorageUploadResponse>> => {
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
    return { error: null, ok: true, data: { publicUrl: uploadImage.data!.publicUrl, url: path } };
  } catch (error) {
    console.log('Error saving firestore document:', error);
    return { error: 'Error Saving firestore document', ok: false };
  }
};

const uploadImageToStorage = async (path: string): Promise<Result<StorageUploadResponse>> => {
  try {
    const fileName = path.split('/').pop();
    const reference = storage().ref(fileName);
    await reference.putFile(path);
    const publicUrl = await reference.getDownloadURL();
    console.log('File successfully uploaded!');
    return { error: null, ok: true, data: { publicUrl: publicUrl } };
  } catch (error) {
    console.error('Error uploading file: ', error);
    return { error: 'Error uploading file', ok: false };
  }
};
