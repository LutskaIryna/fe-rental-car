import { API_BASE_URL } from "@/config";

interface RequestOptions<TRequest = any> {
  method?: string;
  headers?: Record<string, string>;
  body?: TRequest;
  token?: string;
  credentials?: RequestCredentials;
}

export async function httpRequest<TRequest, TResponse>(
  path: string,
  options: RequestOptions<TRequest> = {}
): Promise<TResponse> {
  const url = `${API_BASE_URL}${path}`;
  
  const {
    method = "GET",
    headers = {},
    body,
    token,
    credentials = "include",
  } = options;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    credentials,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed: ${res.status}`);
  }

  return res.json();
}
