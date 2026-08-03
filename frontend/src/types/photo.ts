export interface Photo {
  id: string;
  file: File;
  image: string;
  isExisting?: boolean;
  existingUrl?: string;
}