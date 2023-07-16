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
      invalidatesTags: ['books'],
    }),
    editBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
      query: ({ id, data }) => ({
        url: `${config.endPoints.book.index}/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    deleteBook: builder.mutation<IBook, { id: string }>({
      query: ({ id }) => ({
        url: `${config.endPoints.book.index}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['books'],
    }),
    getAllBooks: builder.query({
      query: ({ searchTerm, genre, year }) =>
        `${config.endPoints.book.index}?${
          searchTerm ? 'searchTerm=' + searchTerm + '&' : ''
        }${genre ? 'genre=' + genre + '&' : ''}${
          year ? 'year=' + year : ''
        }`,
      transformResponse(baseQueryReturnValue: { data: IBook[] }, _meta, _arg) {
        return baseQueryReturnValue.data;
      },
      providesTags: ['books'],
    }),
    getSingleBook: builder.query({
      query: (id) => `${config.endPoints.book.index}/${id}`,
      transformResponse(baseQueryReturnValue: { data: IBook }, _meta, _arg) {
        return baseQueryReturnValue.data;
      },
      providesTags: ['books'],
    }),
  }),
});

export const {
  useAddBookMutation,
  useEditBookMutation,
  useGetAllBooksQuery,
  useLazyGetAllBooksQuery,
  useDeleteBookMutation,
  useGetSingleBookQuery,
} = bookApi;
