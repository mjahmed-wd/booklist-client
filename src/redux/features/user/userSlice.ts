import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface IUserState {
  email: string;
  id: string;
  plannedToRead: Array<string>;
  wishlist: string[];
}

const initialState: IUserState = {
  email: '',
  id: '',
  plannedToRead: [],
  wishlist: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<IUserState>) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
