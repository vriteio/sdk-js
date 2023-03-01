type SendRequestFunction = <O extends Record<string, any> | void = void>(
  method: "GET" | "PUT" | "DELETE",
  path: string,
  options?: {
    params?: Record<string, string | number | undefined>;
    body?: Record<string, any>;
  }
) => Promise<O>;
type PaginationParams = {
  perPage?: number;
  page?: number;
};

const createSendRequestFunction = (
  baseURL: string,
  token: string
): SendRequestFunction => {
  return async (method, path, options) => {
    const response = await fetch(
      `${baseURL}${path}/?${encodeURI(
        Object.entries(options?.params || {})
          .filter(([, value]) => value)
          .map(([key, value]) => {
            return `${key}=${value}`;
          })
          .join("&")
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          ...(options?.body ? { "Content-Type": "application/json" } : {}),
        },
        body: options?.body ? JSON.stringify(options.body) : null,
        method,
      }
    );
    const json = await response.json();

    if (!response.ok) {
      throw json;
    }

    return json;
  };
};

export { createSendRequestFunction };
export type { SendRequestFunction, PaginationParams };
