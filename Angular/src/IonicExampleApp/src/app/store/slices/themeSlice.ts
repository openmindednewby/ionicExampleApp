import { patchState } from '@ngrx/signals';

export interface ThemeSlice {
  isInvertedColor: boolean;
}

function setIsInvertedColor(store: any, isInvertedColor: boolean) {
  patchState(store, {
    themeSlice: {
      ...store.themeSlice(),
      isInvertedColor,
    },
  });
}

export function themeSliceMethods(store: any) {
  return {
    setIsInvertedColor: (isInvertedColor: boolean) => setIsInvertedColor(store, isInvertedColor),
  };
}
