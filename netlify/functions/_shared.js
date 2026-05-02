// ============================================================
// Shared helpers for all NTAS98 Netlify functions
// ============================================================

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

function ok(body, status = 200) {
  return { statusCode: status, headers: HEADERS, body: JSON.stringify(body) };
}

function fail(message, status = 400) {
  return { statusCode: status, headers: HEADERS, body: JSON.stringify({ error: message }) };
}

function handlePreflight(event) {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: HEADERS, body: '' };
  if (event.httpMethod !== 'POST') return fail('Method not allowed', 405);
  return null;
}

function parseBody(event) {
  try { return JSON.parse(event.body || '{}'); }
  catch { return null; }
}

module.exports = { HEADERS, ok, fail, handlePreflight, parseBody };
