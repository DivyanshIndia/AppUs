// useApiPost.js

/**
 * Custom hook for making POST requests.
 * @returns {object} - An object containing the response data, loading state, error, and a function to make the POST request.
 */

import { useState } from "react";
import apiClient from "../api/apiClient";

const useApiPost = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = async (url, data) => {
    setLoading(true);
    try {
      const res = await apiClient.post(url, data);
      setResponse(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, postData };
};

export default useApiPost;
