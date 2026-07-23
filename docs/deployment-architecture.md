# Deployment architecture

GitHub Pages can continue to host the static frontend in mock mode, but cannot safely hold a Google Routes API key. Production should use Vercel or Netlify for the frontend and `/api/journey/estimate`, a scheduled serverless job for timetable ingestion, and the current JSON snapshot store until a database such as Supabase is needed.
