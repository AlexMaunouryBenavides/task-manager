import { useEffect, useState } from "react";

const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json.results ?? []);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Erreur inconnue";
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
