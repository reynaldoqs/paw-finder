import { useCallback, useEffect, useRef, useState } from "react";

type UsePostDataOptions<TResponse> = {
  url: string;
  headers?: Record<string, string>;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: Error) => void;
};

type UsePostDataReturn<TPayload, TResponse> = {
  data: TResponse | null;
  loading: boolean;
  error: Error | null;
  postData: (payload: TPayload) => Promise<TResponse | null>;
  reset: () => void;
};

export const usePostData = <TPayload = unknown, TResponse = unknown>({
  url,
  headers,
  onSuccess,
  onError,
}: UsePostDataOptions<TResponse>): UsePostDataReturn<TPayload, TResponse> => {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  const postData = useCallback(
    async (payload: TPayload): Promise<TResponse | null> => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setLoading(true);
      setError(null);

      const isFormData = payload instanceof FormData;
      const body = isFormData ? payload : JSON.stringify(payload);

      const fetchHeaders: Record<string, string> = {};

      if (!isFormData) {
        fetchHeaders["Content-Type"] = "application/json";
      }

      if (headers) {
        Object.assign(fetchHeaders, headers);
      }

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: fetchHeaders,
          body: body,
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message ||
              errorData.error ||
              `Request failed with status ${response.status}`
          );
        }

        const result = await response.json();
        setData(result);

        if (onSuccess) {
          onSuccess(result);
        }

        return result;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          return null;
        }

        const error =
          err instanceof Error ? err : new Error("An unknown error occurred");
        setError(error);

        if (onError) {
          onError(error);
        }

        console.error("Error submitting data:", error);
        return null;
      } finally {
        setLoading(false);
        abortControllerRef.current = null;
      }
    },
    [url, headers, onSuccess, onError]
  );

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { data, loading, error, postData, reset };
};
