import { ThemeSlice } from './slices/themeSlice';
import { signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { getStoreMethods } from './storeMethods';
import { STATE_SOURCE } from '@ngrx/signals/src/state-source';
import { computed } from '@angular/core';
import { getStoreComputed } from './storeComputed';

interface AppState {
  themeSlice: ThemeSlice;
}

const initialState: AppState = {
  themeSlice: {
    isInvertedColor: false,
  },
}


const appSignalStore = signalStore(
  { providedIn: 'root' },
  withState<AppState>(initialState),
  withMethods((store) => ({ ...getStoreMethods(store) })),
  withComputed((slices) => ({ ...getStoreComputed(slices) }))
);


export default appSignalStore;
