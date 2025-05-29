import { isResponseError } from "../error/isResponseError";

/**
 * Sends an HTTP request and parses the JSON response body.
 *
 * @template T - The expected shape of the parsed response body
 * @param url - The full API endpoint to request
 * @param options - Optional request options (method, headers, body, etc.)
 * @returns The parsed JSON response body if the server returns a 200 OK with JSON
 * @throws An array of ResponseError objects for known application errors
 */
export async function fetchData<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const error = await res.json();
      if (Array.isArray(error) && error.every((err) => isResponseError(err))) {
        throw error;
      } else if (isResponseError(error)) {
        throw [error];
      } else {
        throw [{ field: "unknown", message: "Unknown error" }];
      }
    }
    // Only parse the response body if the server explicitly returned a 200 OK with data
    if (res.status === 200) {
      return (await res.json()) as T;
    }

    return undefined as T;
  } catch (error) {
    if (error instanceof TypeError) {
      throw [{ field: "network", message: "Could not connect to service." }];
    } else if (error instanceof SyntaxError) {
      throw [
        {
          field: "internal",
          message:
            "Failed to parse the response body. The response may be empty or the route may not be returning JSON as expected.",
        },
      ];
    }
    throw error;
  }
}
