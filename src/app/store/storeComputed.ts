import { Slices } from './appSignalStore';
import { themeSliceComputed } from './slices/themeSlice';

export function getStoreComputed(slices: Slices) {
  return { ...themeSliceComputed(slices) };
}
