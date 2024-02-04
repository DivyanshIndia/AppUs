import axios from "axios";
import axiosRetry from "axios-retry";
import { apiBaseUrl } from "./apiUrls";
import getToken from "../utils/getToken";

const createApiClient = () => {
  const api = axios.create({
    baseURL: apiBaseUrl,
  });

  axiosRetry(api, { retries: 3 });

  api.interceptors.request.use(
    async (config) => {
      const token = await getToken("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.log("REQUEST", config);
      return config;
    },
    (error) => {
      console.log("REQUEST ERROR", error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      console.log("RESPONSE", response);
      return response;
    },
    (error) => {
      console.log("RESPONSE ERROR", error, error?.response);
      return Promise.reject(error?.response);
    }
  );

  return api;
};

const apiClient = createApiClient();

export default apiClient;
