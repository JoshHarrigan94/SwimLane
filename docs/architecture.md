# Architecture notes

The app is a static Vite SPA. `main.tsx` owns simple hash navigation and page composition; this keeps every route deployable to GitHub Pages without server rewrites. `data/seed.ts` is the intentionally fictional timetable fixture. `lib/models.ts` contains domain types and Zod feedback validation. The pure recommendation module has no browser dependencies and is tested directly. Browser persistence is isolated in `lib/storage.ts`.

The visual language distinguishes two separate ideas: lane allocation is represented by patterned pool lanes; session recommendation is represented by a textual green/amber/red status. No allocation is treated as a live occupancy signal.
