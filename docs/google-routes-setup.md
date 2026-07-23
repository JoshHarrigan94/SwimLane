# Google Routes setup

Enable Google Routes API in a Google Cloud project, create a server-side API key restricted to Routes API, add budget/quota alerts, and set `GOOGLE_ROUTES_API_KEY` only in the serverless host environment. Never use a `VITE_` key. The serverless proxy validates the request, looks up the destination internally, requests a minimal field mask, and returns a safe typed estimate instead of raw provider payloads.
