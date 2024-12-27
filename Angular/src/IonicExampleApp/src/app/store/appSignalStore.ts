import { ThemeSlice } from './slices/themeSlice';
import { DeepSignal, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { getStoreMethods } from './storeMethods';
import { getStoreComputed } from './storeComputed';
import { WritableSignal } from '@angular/core';

interface AppState {
  themeSlice: ThemeSlice;
}

export interface Store extends Slices {
  state: WritableSignal<{//unable to defined [STATE_SOURCE] here due to compile time errors
      themeSlice: ThemeSlice;
  }>;
}

export interface Slices {
  themeSlice: DeepSignal<ThemeSlice>;
}

const initialState: AppState = {
  themeSlice: {
    titleColor: 'color: black'
  },
}


const appSignalStore = signalStore(
  { providedIn: 'root' },
  withState<AppState>(initialState),
  withMethods((store) => ({ ...getStoreMethods(store as unknown as Store) })),
  withComputed((slices) => ({ ...getStoreComputed(slices) }))
);


export default appSignalStore;
