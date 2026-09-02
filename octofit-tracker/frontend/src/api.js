const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const apiUrl = apiBaseUrl;

export function responseItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

export async function fetchCollection(endpoint) {
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Could not load ${endpoint}.`);
  return responseItems(await response.json());
}