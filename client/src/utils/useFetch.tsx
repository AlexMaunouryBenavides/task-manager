import { useEffect, useState } from "react";

const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    async function getData() {
      setLoading(true);
      setError(undefined);
      try {
        const res = await fetch(url, {
          signal: controller.signal,
          credentials: "include",
        });
        const json = await res.json();
        setData(json ?? []);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Erreur inconnue";
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    getData();
    return () => controller.abort();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
