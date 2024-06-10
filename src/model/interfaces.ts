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

export interface HumanReadableLocation {
  city: string | null;
  country: string | null;
  name: string | null;
  region: string | null;
  street: string | null;
  district: string | null;
}

export interface GeoLocation {
  lat: number;
  long: number;
  humanReadable: HumanReadableLocation | null;
}

export interface EntityMap<T> {
  entity?: Entity<T>;
  createdAt?: FieldValue;
  id?: string;
  geoLocation?: GeoLocation;
  [secretFlagVisibility]?: true;
}

export interface EntityResponse<T> extends EntityMap<T> {
  error: string | null;
  ok: boolean;
}
