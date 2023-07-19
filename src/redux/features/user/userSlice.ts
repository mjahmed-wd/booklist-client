import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface IUserState {
  email: string;
  id: string;
  plannedToRead: { book: string; isFinished: boolean }[];
  wishlist: string[];
}

export const userInitialState: IUserState = {
  email: '',
  id: '',
  plannedToRead: [],
  wishlist: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser: (_state, action: PayloadAction<IUserState>) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
