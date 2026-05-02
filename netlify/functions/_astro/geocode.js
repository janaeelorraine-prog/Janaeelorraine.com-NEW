// ============================================================
// Birth-location resolver
// ------------------------------------------------------------
// 1) Try a hand-curated list of common cities (the same list
//    the existing trinity HTML tools use). Instant, no network.
// 2) Fall back to Nominatim (free OpenStreetMap geocoder).
//    24h in-memory cache to be a good citizen and to keep the
//    dashboard fast on repeat visits.
// 3) Approximate timezone offset from longitude when the
//    geocoder doesn't return one (Math.round(lng / 15)).
//    This is rough — DST and non-standard offsets are not
//    handled. Good enough for v1; flag for follow-up.
// ============================================================

// Same list the trinity HTML tools use — preserves existing exact behavior.
const COMMON_CITIES = [
  { name: 'Columbus, OH',     lat: 39.9612, lng: -83.0007, tz: -5 },
  { name: 'Atlanta, GA',      lat: 33.7490, lng: -84.3880, tz: -5 },
  { name: 'New York, NY',     lat: 40.7128, lng: -74.0060, tz: -5 },
  { name: 'Chicago, IL',      lat: 41.8781, lng: -87.6298, tz: -6 },
  { name: 'Houston, TX',      lat: 29.7604, lng: -95.3698, tz: -6 },
  { name: 'Los Angeles, CA',  lat: 34.0522, lng: -118.2437, tz: -8 },
  { name: 'Jackson, MS',      lat: 32.2988, lng: -90.1848, tz: -6 },
  { name: 'Hattiesburg, MS',  lat: 31.3271, lng: -89.2903, tz: -6 },
  { name: 'New Orleans, LA',  lat: 29.9511, lng: -90.0715, tz: -6 },
  { name: 'Detroit, MI',      lat: 42.3314, lng: -83.0458, tz: -5 },
  { name: 'Miami, FL',        lat: 25.7617, lng: -80.1918, tz: -5 },
  { name: 'Washington, DC',   lat: 38.9072, lng: -77.0369, tz: -5 }
];

// Module-level cache survives across warm function invocations.
const cache = new Map();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

function normalize(s) { return String(s || '').trim().toLowerCase(); }

function findCommonCity(query) {
  const q = normalize(query);
  if (!q) return null;
  return COMMON_CITIES.find(c => normalize(c.name) === q) || null;
}

async function nominatimLookup(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'NTAS98/1.0 (https://janaeelorraine.com)' }
  });
  if (!res.ok) throw new Error(`Nominatim returned ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;
  const hit = data[0];
  return { lat: parseFloat(hit.lat), lng: parseFloat(hit.lon) };
}

// Public: resolve a free-text birth location string to { lat, lng, tz, source }.
// Returns null if nothing matched. Never throws on network errors — falls
// through to null so callers can degrade gracefully.
async function resolveLocation(query) {
  const q = normalize(query);
  if (!q) return null;

  const cached = cache.get(q);
  if (cached && (Date.now() - cached.at) < CACHE_TTL_MS) return cached.value;

  const common = findCommonCity(query);
  if (common) {
    const value = { lat: common.lat, lng: common.lng, tz: common.tz, source: 'common-city' };
    cache.set(q, { at: Date.now(), value });
    return value;
  }

  try {
    const coords = await nominatimLookup(query);
    if (!coords) {
      cache.set(q, { at: Date.now(), value: null });
      return null;
    }
    // Approximate tz from longitude. Off by 1-2h for DST / non-standard zones.
    const tz = Math.round(coords.lng / 15);
    const value = { lat: coords.lat, lng: coords.lng, tz, source: 'nominatim' };
    cache.set(q, { at: Date.now(), value });
    return value;
  } catch (err) {
    console.warn('[geocode] Nominatim error:', err.message);
    return null;
  }
}

module.exports = { COMMON_CITIES, findCommonCity, resolveLocation };
