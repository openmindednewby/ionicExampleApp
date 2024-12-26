import { computed } from '@angular/core';
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
    updateIsInvertedColor: (isInvertedColor: boolean) => setIsInvertedColor(store, isInvertedColor),
  };
}

export function themeSliceComputed(slices: any) {
  return {
    isInvertedColor: computed(() => slices.themeSlice().isInvertedColor),
  };
}


