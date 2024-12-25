import { ThemeSlice } from './slices/themeSlice';
import { signalStore, withMethods, withState } from '@ngrx/signals';
import { getStoreMethods } from './storeMethods';

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
  withMethods((store) => ({ ...getStoreMethods(store) }))
);

export default appSignalStore;
