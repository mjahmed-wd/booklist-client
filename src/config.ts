const BASE_URL = import.meta.env.VITE_API_URL;

const config = {
  baseUrl: BASE_URL as string,
  endPoints: {
    auth: {
      signUp: '/auth/signup',
      login: `/auth/login`,
    },
    book: {
      index: '/books',
    },
    user: {
      index: '/user',
      wishlist: (id: string) => `/user/${id}/wishlist`,
      plannedToRead: (id: string) => `/user/${id}/plannedToRead`,
    },
  },
  routes: {
    index: '/',
    auth: {
      login: '/login',
      signup: '/signup',
    },
    books: {
      index: '/books',
      addBook: '/books/addBook',
    },
  },
};

export default config;
