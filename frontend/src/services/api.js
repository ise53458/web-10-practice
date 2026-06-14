// services/api.js
// -----------------------------------------------------------------------------
// Central API service layer -- all fetch calls go through here.
//
// Benefits of a service layer
//  - Base URL comes from .env (one place to change dev -> prod)
//  - Shared error handling: non-OK responses throw, callers don't repeat this
//  - Components stay clean -- they call api.getPosts(), not fetch('/api/...')
// -----------------------------------------------------------------------------

// Vite exposes .env variables via import.meta.env
// CRA (Create React App) uses process.env.REACT_APP_*
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Core request helper -- used by all API methods.
 * Throws an Error if the response status is not 2xx.
 */
async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    // Try to read a server-provided error message
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }

  return res.json();
}

// -- Public API surface --------------------------------------------------------

export const api = {
  /** GET /api/posts -> Post[] */
  getPosts: () =>
    request('/api/posts'),

  /** POST /api/posts -> Post (created) */
  createPost: (data) =>
    request('/api/posts', {
      method: 'POST',
      body:   JSON.stringify(data),
    }),

  /** DELETE /api/posts/:id -> { deleted: id } */
  deletePost: (id) =>
    request(`/api/posts/${id}`, { method: 'DELETE' }),
};
