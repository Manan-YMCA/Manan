import { API_URL } from "@/lib/api";

const networkError = () => {
  throw new Error("Network error");
};
const parseError = (res: Response) => () => {
  throw new Error(`Request failed with status ${res.status}`);
};

export async function apiFetch<T>(path: string): Promise<T> {
  return fetch(`${API_URL}${path}`, { credentials: "include" })
    .catch(networkError)
    .then((res) =>
      res
        .json()
        .catch(parseError(res))
        .then((json) => {
          if (!res.ok) throw new Error(json.message ?? "Request failed");
          return json.data as T;
        }),
    );
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  return fetch(`${API_URL}${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .catch(networkError)
    .then((res) =>
      res
        .json()
        .catch(parseError(res))
        .then((json) => {
          if (!res.ok) throw new Error(json.message ?? "Request failed");
          return json.data as T;
        }),
    );
}

export async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  return fetch(`${API_URL}${path}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .catch(networkError)
    .then((res) =>
      res
        .json()
        .catch(parseError(res))
        .then((json) => {
          if (!res.ok) throw new Error(json.message ?? "Request failed");
          return json.data as T;
        }),
    );
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  return fetch(`${API_URL}${path}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .catch(networkError)
    .then((res) =>
      res
        .json()
        .catch(parseError(res))
        .then((json) => {
          if (!res.ok) throw new Error(json.message ?? "Request failed");
          return json.data as T;
        }),
    );
}

export async function apiDelete(path: string): Promise<void> {
  return fetch(`${API_URL}${path}`, {
    method: "DELETE",
    credentials: "include",
  })
    .catch(networkError)
    .then((res) =>
      res
        .json()
        .catch(parseError(res))
        .then((json) => {
          if (!res.ok) throw new Error(json.message ?? "Request failed");
        }),
    );
}
