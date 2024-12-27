import { Store } from './appSignalStore';
import { themeSliceMethods } from './slices/themeSlice';

export function getStoreMethods(store: Store) {
  return { ...themeSliceMethods(store) };
}
