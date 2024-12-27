import { computed } from '@angular/core';
import { patchState } from '@ngrx/signals';

export interface ThemeSlice {
  titleColor: string;
}

function setTitleColor(store: any, titleColor: string) {
  patchState(store, {
    themeSlice: {
      ...store.themeSlice(),
      titleColor,
    },
  });
}

export function themeSliceMethods(store: any) {
  return {
    updateTitleColor: (titleColor: string) => setTitleColor(store, titleColor),
  };
}

export function themeSliceComputed(slices: any) {
  return {
    titleColor: computed(() => slices.themeSlice().titleColor),
  };
}


