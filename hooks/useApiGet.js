/**
 * Custom hook for making GET requests.
 * @returns {object} - An object containing the response data, loading state, error, and a function to make the GET request.
 */

import { useState } from "react";
import apiClient from "../api/apiClient";

const useApiGet = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async (url) => {
    try {
      setLoading(true);
      const response = await apiClient.get(url);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getData };
};

export default useApiGet;
