import { ThemeSlice } from './slices/themeSlice';
import { signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { getStoreMethods } from './storeMethods';
import { getStoreComputed } from './storeComputed';

interface AppState {
  themeSlice: ThemeSlice;
}

const initialState: AppState = {
  themeSlice: {
    titleColor: 'color: black'
  },
}


const appSignalStore = signalStore(
  { providedIn: 'root' },
  withState<AppState>(initialState),
  withMethods((store) => ({ ...getStoreMethods(store) })),
  withComputed((slices) => ({ ...getStoreComputed(slices) }))
);


export default appSignalStore;
