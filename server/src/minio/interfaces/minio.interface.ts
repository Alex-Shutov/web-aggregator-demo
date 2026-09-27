export interface UnityBundleUrls {
  bridgeUrl: string;
  iconUrl: string;
  htmlUrl: string;
  dataUrl: string;
  loaderUrl: string;
  frameworkUrl: string;
  wasmUrl: string;
  assetsUrl: string;
}

export interface UploadFilesResponse {
  images: Record<string, string> | string[];
  bundle: UnityBundleUrls | string[] | null;
  mainImage: Record<string, string> | string[] | null;
  video: string | string[] | null;
}

export interface BufferedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: AppMimeType | string;
  size: number;
  buffer: Buffer | string;
}

export type AppMimeType =
  | 'application/x-zip'
  | 'application/zip'
  | 'video/mp4'
  | 'image/png'
  | 'image/jpeg';

export interface StoredFile extends HasFile, StoredFileMetadata {}

export interface HasFile {
  file: Buffer | string;
}

export interface StoredFileMetadata {
  id: string;
  name: string;
  encoding: string;
  mimetype: AppMimeType;
  size: number;
  updatedAt: Date;
  fileSrc?: string;
}
