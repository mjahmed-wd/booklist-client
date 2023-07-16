import { FormikValues } from "formik";
import http from "../utils/http";

import config from "../config";

const signUp = async (values: FormikValues) => {
  const url = `${config.baseUrl}${config.endPoints.auth.signUp}`;
  return http.post(url, values);
};

const login = async (values: FormikValues) => {
  const url = `${config.baseUrl}${config.endPoints.auth.login}`;
  return http.post(url, values);
};

const authService = {
  signUp,
  login
};

export default authService;
