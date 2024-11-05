import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useFetch(url, query = "") {
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}?${query}`);
        setAllData(data);
        console.log(data);
      } catch (err) {
        setAllData([]);
        toast.error(err?.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url, query]);

  return { isLoading, allData };
}

export default useFetch;
