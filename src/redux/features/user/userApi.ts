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
      // invalidatesTags: [{ type: 'Post', id: 'LIST' }],
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
  }),
});

export const { useLoginMutation, useSignUpMutation } = userApi;
