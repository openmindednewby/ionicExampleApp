import { patchState } from '@ngrx/signals';
import { Store } from '../storeMethods';

export interface ThemeSlice {
  isInvertedColor: boolean;
}

function setIsInvertedColor(store: Store, isInvertedColor: boolean) {
  patchState(store, {
    themeSlice: {
      ...store.themeSlice(),
      isInvertedColor,
    },
  });
}

export function themeSliceMethods(store: Store) {
  return {
    setIsInvertedColor: (isInvertedColor: boolean) => setIsInvertedColor(store, isInvertedColor),
  };
}
