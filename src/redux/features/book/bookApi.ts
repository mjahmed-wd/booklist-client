import { api } from '@/redux/api/apiSlice';
import config from '@/config';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews: {
    user: string;
    comment: string;
  }[];
  id: string;
};

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation<{ data: IBook }, {}>({
      query: (body) => ({
        url: config.endPoints.book.index,
        method: 'POST',
        body,
      }),
    }),
    getAllBooks: builder.query({
      query: () => config.endPoints.book.index,
      transformResponse(baseQueryReturnValue: { data: IBook[] }, _meta, _arg) {
        return baseQueryReturnValue.data;
      },
    }),
    getSingleBook: builder.query({
      query: (id) => `${config.endPoints.book.index}/${id}`,
      transformResponse(baseQueryReturnValue: { data: IBook }, _meta, _arg) {
        return baseQueryReturnValue.data;
      },
    }),
  }),
});

export const { useAddBookMutation, useGetAllBooksQuery, useGetSingleBookQuery } = bookApi;
