# Journey intelligence

Journey estimates are independent of pool pressure. The app combines a typed route estimate with configurable parking, changing and uncertainty buffers to calculate leave-by time, expected arrival, and usable swim duration. Journey friction can lower a recommendation only because attendance becomes impractical; it never changes the factual pressure or lane allocation shown for a session.

Mock mode is the default for local/static deployment. Set `VITE_JOURNEY_MOCK_SCENARIO` conceptually through the journey preferences development setting (clear, moderate, heavy, unavailable, timeout, quota). Estimates are cached in localStorage for ten minutes using rounded origin coordinates, mode, destination, and departure bucket.
