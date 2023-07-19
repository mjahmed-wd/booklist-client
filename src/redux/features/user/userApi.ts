import { api } from '@/redux/api/apiSlice';
import { IUserState, setUser } from './userSlice';
import config from '@/config';
import { toast } from 'react-toastify';

type ILoginData = {
  email: string;
  password: string;
};

const setUserData = async ({dispatch, queryFulfilled}:any)=>{
  try {
    const response = await queryFulfilled;
    dispatch(setUser(response.data.data));
    toast.success(response.data.message);
  } catch (error: any) {
    console.error('Login error:', error);
    toast.error(error?.error?.data?.message || 'Network error');
  }
}

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: ({id }) =>
        `${config.endPoints.user.index}/${id}`,
      transformResponse(baseQueryReturnValue: { data: IUserState }, _meta, _arg) {
        return baseQueryReturnValue.data;
      },
      providesTags: ['user'],
    }),
    login: builder.mutation<{ data: IUserState }, ILoginData>({
      query: (body) => ({
        url: config.endPoints.auth.login,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, promise) {
        await setUserData(promise);
      },
    }),
    signUp: builder.mutation<{ data: IUserState }, ILoginData>({
      query: (body) => ({
        url: config.endPoints.auth.signUp,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, promise) {
        await setUserData(promise);
      },
      // invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    addToWishlist: builder.mutation<IUserState, { id: string, data: {bookId: string} }>({
      query: ({ id, data }) => ({
        url: config.endPoints.user.wishlist(id),
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_arg, promise) {
          await setUserData(promise);
      },
      invalidatesTags: ['user'],
    }),
    addToPlanned: builder.mutation<IUserState, { id: string, data: {bookId: string} }>({
      query: ({ id, data }) => ({
        url: config.endPoints.user.plannedToRead(id),
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_arg, promise) {
        await setUserData(promise);
      },
      invalidatesTags: ['user'],
    }),
    updatePlannedList: builder.mutation<IUserState, { id: string, data: {bookId: string} }>({
      query: ({ id, data }) => ({
        url: config.endPoints.user.plannedToRead(id),
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(_arg, promise) {
        await setUserData(promise);
      },
      invalidatesTags: ['user'],
    }),
  }),
});

export const { useGetUserInfoQuery, useLoginMutation, useSignUpMutation, useAddToWishlistMutation, useAddToPlannedMutation, useUpdatePlannedListMutation } = userApi;
