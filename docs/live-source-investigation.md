# Live source investigation — 23 July 2026

The official [Opening Hours page](https://www.swanseabaysportspark.wales/opening-hours/) presents the WNPS lane timetable as free-form content headed “WNPS Lane Swimming”, followed by an explicit `Updated 23/07/2026 13:30` line. Rows are visually arranged under weekday headings, but time, pool, activity, and restrictions can be split across lines rather than held in stable table cells.

The page uses text such as `50m Pool`, `25m Split`, `23m Split`, and `Training Pool`, alongside quantities such as `2 Lanes`. It includes literal struck-through text for cancelled entries and cancellation/closure language, including an event closure. Extraction therefore uses weekday headings and nearby text first, then recognises time ranges, rather than relying on a single CSS selector. The parser does not infer missing exact lane capacity, pool lane numbering, current-week applicability from undated headings, or a source update time from HTTP headers.
