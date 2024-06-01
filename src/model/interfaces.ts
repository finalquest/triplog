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

export interface StorageUploadData {
  url?: string;
  publicUrl: string;
}

export type EntityType = 'photo' | 'video' | 'audio' | 'document';

export interface EntityResponse<T> {
  type: EntityType;
  data?: T;
  error: string | null;
  ok: boolean;
}
