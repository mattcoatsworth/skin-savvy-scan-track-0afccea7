
/**
 * Platform-agnostic networking utilities
 */

// Default request timeout in milliseconds
const DEFAULT_TIMEOUT = 30000;

// Request headers configuration
export interface RequestHeaders {
  [key: string]: string;
}

// Request options configuration
export interface RequestOptions {
  headers?: RequestHeaders;
  timeout?: number;
}

/**
 * Create an AbortController with timeout
 */
const createAbortController = (timeout: number) => {
  const controller = new AbortController();
  
  if (timeout) {
    setTimeout(() => controller.abort(), timeout);
  }
  
  return controller;
};

/**
 * Make a GET request
 */
export const get = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
  const { headers = {}, timeout = DEFAULT_TIMEOUT } = options;
  const controller = createAbortController(timeout);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    signal: controller.signal
  });
  
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP error ${response.status}: ${errorBody}`);
  }
  
  return await response.json();
};

/**
 * Make a POST request
 */
export const post = async <T>(url: string, data: any, options: RequestOptions = {}): Promise<T> => {
  const { headers = {}, timeout = DEFAULT_TIMEOUT } = options;
  const controller = createAbortController(timeout);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
    signal: controller.signal
  });
  
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP error ${response.status}: ${errorBody}`);
  }
  
  return await response.json();
};

/**
 * Make a PUT request
 */
export const put = async <T>(url: string, data: any, options: RequestOptions = {}): Promise<T> => {
  const { headers = {}, timeout = DEFAULT_TIMEOUT } = options;
  const controller = createAbortController(timeout);
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
    signal: controller.signal
  });
  
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP error ${response.status}: ${errorBody}`);
  }
  
  return await response.json();
};

/**
 * Make a DELETE request
 */
export const del = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
  const { headers = {}, timeout = DEFAULT_TIMEOUT } = options;
  const controller = createAbortController(timeout);
  
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    signal: controller.signal
  });
  
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP error ${response.status}: ${errorBody}`);
  }
  
  return await response.json();
};
