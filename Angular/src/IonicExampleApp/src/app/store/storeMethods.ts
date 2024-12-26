import { themeSliceMethods } from './slices/themeSlice';

export function getStoreMethods(store: any) {
  return { ...themeSliceMethods(store) };
}
