//TODO: Use axios
export const BASE_URL = "http://localhost:3000";

export const fetchWithBaseUrl = async <T>(
  endpoint: string,
  params?: Record<string, string>,
  options?: RequestInit
) => {
  const queryString = params
    ? `?${new URLSearchParams(params).toString()}`
    : "";

  return fetch(`${BASE_URL}${endpoint}${queryString}`, options).then(
    (res) => res.json() as Promise<T>
  );
};

export const postWithBaseUrl = async <T>(
  endpoint: string,
  body?: { [key: string]: any },
  options?: RequestInit
) => {
  return fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  }).then((res) => res.json() as Promise<T>);
};
