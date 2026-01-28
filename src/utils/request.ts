import { resetAuthState } from '@/stores/authStore'
import Cookies from 'js-cookie'

const API_URL = import.meta.env.VITE_API_URL

const mockUrls = import.meta.glob<{ default: string }>("../mock/*.json", {
  query: "url",
  eager: true,
});

function getAccessTokenFromCookie(): string | undefined {
  if (typeof document === 'undefined') return undefined

  const token = Cookies.get('access_token')

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log('[Request] Token from js-cookie:', token ? `length: ${token.length}` : 'not found')
    // eslint-disable-next-line no-console
    console.log('[Request] All cookies:', document.cookie.substring(0, 100) + '...')
  }

  return token
}

export async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = API_URL
    ? `${API_URL}${path}`
    : mockUrls[`../mock${path}.json`]?.default;

  if (!API_URL) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // Attach X-Access-Token header from cookie when present
  const token = getAccessTokenFromCookie()
  const headers = new Headers(options?.headers as HeadersInit)
  if (token) {
    headers.set('X-Access-Token', token)
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('[Request] Token found, length:', token.length)
    }
  } else {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('[Request] No token found in cookie')
    }
  }

  const response = await fetch(url, { ...(options ?? {}), headers });

  // Handle 401 Unauthorized - clear auth state and let app redirect to login
  if (response.status === 401) {
    resetAuthState()
    throw new Error('Unauthorized')
  }

  // Handle other errors
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }))
    throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`)
  }

  return response.json() as T;
}

export async function requestWithFallback<T>(
  path: string,
  fallbackValue: T,
  options?: RequestInit
): Promise<T> {
  try {
    return await request<T>(path, options);
  } catch {
    return fallbackValue;
  }
}

export async function requestWithPost<P, T>(
  path: string,
  payload: P,
  options?: RequestInit
): Promise<T> {
  const opts: RequestInit = {
    ...(options ?? {}),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    body: JSON.stringify(payload),
  }

  return await request<T>(path, opts)
}

export async function requestWithPatch<P, T>(
  path: string,
  payload: P,
  options?: RequestInit
): Promise<T> {
  const opts: RequestInit = {
    ...(options ?? {}),
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    body: JSON.stringify(payload),
  }

  return await request<T>(path, opts)
}

export async function requestWithDelete<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const opts: RequestInit = {
    ...(options ?? {}),
    method: 'DELETE',
  }

  return await request<T>(path, opts)
}
