import { ThemeSlice } from './slices/themeSlice';
import { signalStore, withMethods, withState } from '@ngrx/signals';
import { getStoreMethods } from './storeMethods';
import { STATE_SOURCE } from '@ngrx/signals/src/state-source';

interface AppState {
  themeSlice: ThemeSlice;
}

const initialState: AppState = {
  themeSlice: {
    isInvertedColor: false,
  },
}


export const appSignalStore = signalStore(
  { providedIn: 'root' },
  withState<AppState>(initialState),
  withMethods((store) => ({
    getThemeSlice: () => store[STATE_SOURCE]().themeSlice, // Correct access to the state
    ...getStoreMethods(store) }))
);


export default appSignalStore;
