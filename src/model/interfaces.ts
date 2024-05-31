import { secretFlagVisibility } from './dbSecrets';
export interface FirestorePhoto {
  url: string;
  createdAt: Date;
  lat?: number;
  long?: number;
  location?: string;
  [secretFlagVisibility]: true;
}

export interface Result {
  error: string | null;
  ok: boolean;
  data?: unknown;
}
