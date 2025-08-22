import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axiosInstance.get(url, options);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useFetch;
