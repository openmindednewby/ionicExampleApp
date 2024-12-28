import { computed } from '@angular/core';
import { patchState } from '@ngrx/signals';
import { Slices, Store } from '../appSignalStore';

export interface ThemeSlice {
  titleColor: string;
}

function setTitleColor(store: Store, titleColor: string) {
  patchState(store as any, {
    themeSlice: {
      ...store.themeSlice(),
      titleColor,
    },
  });
}

export function themeSliceMethods(store: Store) {
  return {
    updateTitleColor: (titleColor: string) => setTitleColor(store, titleColor),
  };
}

export function themeSliceComputed(slices: Slices) {
  return {
    titleColor: computed(() => slices.themeSlice().titleColor),
  };
}


