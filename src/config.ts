const BASE_URL = import.meta.env.VITE_API_URL

const config = {
  baseUrl: BASE_URL as string,
  endPoints: {
    auth: {
      signUp: "/auth/signup",
      login: `/auth/login`,
    }
  },
};

export default config;
