// useApiPatch.js

/**
 * Custom hook for making PATCH requests.
 * @returns {object} - An object containing the response data, loading state, error, and a function to make the PATCH request.
 */

import { useState } from "react";
import apiClient from "../api/apiClient";

const useApiPatch = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const patchData = async (url, data) => {
    setLoading(true);
    try {
      const res = await apiClient.patch(url, data);
      setResponse(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, patchData };
};

export default useApiPatch;
