// useApiPut.js

/**
 * Custom hook for making PUT requests.
 * @returns {object} - An object containing the response data, loading state, error, and a function to make the PUT request.
 */

import { useState } from "react";
import apiClient from "../api/apiClient";

const useApiPut = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const putData = async (url, data) => {
    setLoading(true);
    try {
      const res = await apiClient.put(url, data);
      setResponse(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, putData };
};

export default useApiPut;
