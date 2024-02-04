// useApiDelete.js

/**
 * Custom hook for making DELETE requests.
 * @returns {object} - An object containing the response data, loading state, error, and a function to make the DELETE request.
 */

import { useState } from "react";
import apiClient from "../api/apiClient";

const useApiDelete = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteData = async (url) => {
    setLoading(true);
    try {
      const res = await apiClient.delete(url);
      setResponse(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, deleteData };
};

export default useApiDelete;
