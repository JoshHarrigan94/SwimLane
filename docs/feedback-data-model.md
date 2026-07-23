# Feedback data model

Version 2 storage holds `SwimExperienceReport` records and attendance outcomes. Legacy `laneview-feedback` records are migrated into reports when compatible. Invalid stored content is quarantined rather than crashing the app. The local repository is the default; a Supabase adapter can implement the same interface later.
