# Recommendation engine

The rules-based engine scores each timetable block from 0–100. It rewards public lane capacity, lower expected pressure, sufficient session length, goal/format fit, and verified sources. It penalises short windows, high-severity restrictions, no public access, and estimated timetable rows. It returns score, colour, experience label, confidence, compact reason codes, and a concise explanation.

Pressure is an editorial estimate from the fictional seed fixture, not live Google or venue busyness data. Source confidence is reduced to Low when a row lacks an update date.
