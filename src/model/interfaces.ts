import { secretFlagVisibility } from './dbSecrets';
export interface FirestorePhoto {
  url: string;
  createdAt: Date;
  lat?: number;
  long?: number;
  location?: string;
  [secretFlagVisibility]: true;
}

export interface Result<T = undefined> {
  error: string | null;
  ok: boolean;
  data?: T;
}

export interface StorageUploadResponse {
  url?: string;
  publicUrl: string;
}
