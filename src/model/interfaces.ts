import { FieldValue } from '@react-native-firebase/firestore';
import { secretFlagVisibility } from './dbSecrets';

export interface PositionRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}
export interface Result<T = undefined> {
  error: string | null;
  ok: boolean;
  data?: T;
}

export interface StorageUploadData {
  url: string;
  publicUrl: string;
}

export type EntityType = 'photo' | 'video' | 'audio' | 'document';

export interface Entity<T> {
  type: EntityType;
  data: T;
}

export interface EntityMap<T> {
  entity?: Entity<T>;
  createdAt?: FieldValue;
  lat?: number;
  long?: number;
  [secretFlagVisibility]?: true;
}

export interface EntityResponse<T> extends EntityMap<T> {
  error: string | null;
  ok: boolean;
}
