import { api } from '@/redux/api/apiSlice';
import { IUserState, setUser } from './userSlice';
import config from '@/config';

type ILoginData = {
  email: string;
  password: string;
};

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ data: IUserState }, ILoginData>({
      query: (body) => ({
        url: config.endPoints.auth.login,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          dispatch(setUser(response.data.data));
        } catch (error: any) {
          console.error('Login error:', error.data.message);
        }
      },
    }),
    signUp: builder.mutation<{ data: IUserState }, ILoginData>({
      query: (body) => ({
        url: config.endPoints.auth.signUp,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          dispatch(setUser(response.data.data));
        } catch (error: any) {
          console.error('Signup error:', error.data.message);
        }
      },
      // invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    addToWishlist: builder.mutation<IUserState, { id: string, data: {bookId: string} }>({
      query: ({ id, data }) => ({
        url: config.endPoints.user.wishlist(id),
        method: 'POST',
        body: data,
      }),
      // invalidatesTags: ['books'],
    }),
    addToPlanned: builder.mutation<IUserState, { id: string, data: {bookId: string} }>({
      query: ({ id, data }) => ({
        url: config.endPoints.user.plannedToRead(id),
        method: 'POST',
        body: data,
      }),
      // invalidatesTags: ['books'],
    }),
    updatePlannedList: builder.mutation<IUserState, { id: string, data: {bookId: string} }>({
      query: ({ id, data }) => ({
        url: config.endPoints.user.plannedToRead(id),
        method: 'PATCH',
        body: data,
      }),
      // invalidatesTags: ['books'],
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useAddToWishlistMutation, useAddToPlannedMutation, useUpdatePlannedListMutation } = userApi;
