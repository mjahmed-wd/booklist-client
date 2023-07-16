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
      // invalidatesTags: ['books'],
      invalidatesTags: ['books'],
    }),
    editBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
      query: ({ id, data }) => ({
        url: `${config.endPoints.book.index}/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        // { type: 'books', id }, // Invalidate the specific book being edited
        'books', // Invalidate the 'books' tag for the book list
      ],
    }),
    getAllBooks: builder.query({
      query: () => config.endPoints.book.index,
      transformResponse(baseQueryReturnValue: { data: IBook[] }, _meta, _arg) {
        return baseQueryReturnValue.data;
      },
      // providesTags: ['books'],
      providesTags: (result, error, arg) =>
        // result
        //   ? [
        //       ...result.map(({ id }) => ({ type: 'books' as const, id })),
        //       'books',
        //     ]: 
            ['books'],
    }),
    getSingleBook: builder.query({
      query: (id) => `${config.endPoints.book.index}/${id}`,
      transformResponse(baseQueryReturnValue: { data: IBook }, _meta, _arg) {
        return baseQueryReturnValue.data;
      },
      providesTags: (_result, _error, { id }) => [ 'books' ],
      // providesTags: (_result, _error, { id }) => [{ type: 'books', id }],
    }),
  }),
});

export const {
  useAddBookMutation,
  useEditBookMutation,
  useGetAllBooksQuery,
  useGetSingleBookQuery,
} = bookApi;
