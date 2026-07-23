# Data model

`Venue` identifies the location and source. `Pool` and `PoolLane` describe physical water and its lane layout. `PoolConfiguration` supports full 50m, split 25m, split 23m, training, mixed/restricted, and closed water.

`SwimBlock` is the schedule unit: it carries date/time, configuration, total/public lane counts, allocation, restrictions, original source wording, update timestamp, parsing confidence, verification state, expected pressure, and source validation. `CrowdEstimate`, `JourneyEstimate`, and `Recommendation` make decision assumptions explicit. `UserSwimPreference` stores local defaults and `PostSwimFeedback` records user-reported outcomes. Zod validates feedback at the persistence boundary.
