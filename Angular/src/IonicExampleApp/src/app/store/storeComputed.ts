import { themeSliceComputed } from './slices/themeSlice';

export function getStoreComputed(slices: any) {
  return { ...themeSliceComputed(slices) };
}
