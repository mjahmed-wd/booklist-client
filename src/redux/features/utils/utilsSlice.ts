import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface IUtilsState {
  isLoading: boolean;
}

const initialState: IUtilsState = {
  isLoading: false,
};

const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = utilsSlice.actions;

export default utilsSlice.reducer;
