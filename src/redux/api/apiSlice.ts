import config from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['books', 'user'],
  baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl }),
  endpoints: () => ({}),
});
