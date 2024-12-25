import { DeepSignal } from '@ngrx/signals';
import { ThemeSlice, themeSliceMethods } from './slices/themeSlice';
import { WritableSignal } from '@angular/core';
import { STATE_SOURCE } from '@ngrx/signals/src/state-source';


export interface Store {
    themeSlice: DeepSignal<ThemeSlice>;
    [STATE_SOURCE]: WritableSignal<{
        themeSlice: ThemeSlice;
    }>
}

export function getStoreMethods(store: Store) {
  return { ...themeSliceMethods(store) };
}
