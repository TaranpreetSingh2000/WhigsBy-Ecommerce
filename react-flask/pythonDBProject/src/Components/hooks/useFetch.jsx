import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetch = (url) => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchresponse = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setResponse(response);
        setLoading(false);
      } catch (error) {
        setError("Error while fetching the details");
        setLoading(false);
      }
    };

    fetchresponse();
  }, [url]);

  return { response, loading, error };
};

export default useFetch;
