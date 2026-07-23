# Timetable ingestion

`npm run timetable:ingest` fetches the official page with a bounded timeout and one retry, archives the raw HTML and metadata, extracts evidence rows, interprets sessions, validates them, and writes review-candidate JSON. It never automatically publishes a candidate with blocking issues. `timetable:publish` only writes `data/snapshots/published/current.json` when the candidate is not blocked; approved review overlays are a separate input and raw snapshots remain immutable.

The current source is free-form page text, not a dependable table. The parser first follows weekday headings and nearby text, then recognises time ranges and pools. It detects `del`, `s`, inline line-through, cancellation classes, and cancellation language. Unrecognised timetable-like text is reported for review.
