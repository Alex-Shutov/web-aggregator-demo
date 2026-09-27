import { atom } from 'recoil';

export const zipFileState = atom<File | null>({
  key: 'zipFileState',
  default: null,
});

export const imagesFileState = atom<File[]>({
  key: 'imagesFileState',
  default: [],
});

export const mainImageFileState = atom<File | null>({
  key: 'mainImageFileState',
  default: null,
});

export const videoFileState = atom<File | null>({
  key: 'videoFileState',
  default: null,
});
