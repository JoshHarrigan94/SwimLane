# LaneView

LaneView is a mobile-first prototype that turns a complex pool timetable into clear swimming recommendations for Wales National Pool Swansea. All included timetable content is fictional demonstration data; it must be verified before travelling.

## Run locally

```bash
npm install
npm run dev
npm test
npm run build
```

## Product guardrails

- Lane patterns describe allocation (public, club, lessons, unavailable), never live lane occupancy.
- Traffic and journey messaging is explicitly an estimate placeholder.
- Green, amber and red rate the overall recommendation, with text labels alongside colour.
- Unconfirmed source rows always carry an estimated/low-confidence indicator.

## Deployment

The included GitHub Actions workflow builds and publishes the `dist` directory to GitHub Pages on pushes to `main`. In the repository’s Pages settings, select **GitHub Actions** as the source. The Vite base path switches to `/LaneView/` during Actions builds.

See [architecture notes](docs/architecture.md), [data model](docs/data-model.md), and [recommendation engine](docs/recommendation-engine.md).

## Official timetable ingestion

The browser never scrapes the venue. A server-side Node ingestion pipeline fetches, archives, extracts, normalises, interprets, validates, compares and prepares a review candidate from the official source. It is deliberately conservative: missing dates, stale coverage, malformed rows and structural failures block publication. The frontend uses a `TimetableRepository`; development defaults to a reviewed static fixture and production can set `VITE_TIMETABLE_MODE=live` to use `/api/timetable/current`.

```bash
npm run timetable:ingest     # fetch through to review candidate
npm run timetable:parse      # parse local fixture only
npm run timetable:publish    # write approved, non-blocking output
```

Open `/#admin/timetable-review` for the protected local review view. More detail: [ingestion](docs/timetable-ingestion.md), [validation](docs/source-validation.md), [manual review](docs/manual-review.md), and [adding a venue](docs/adding-a-venue.md).

## Journey intelligence

LaneView supports saved origins and configurable parking, changing, and uncertainty buffers. Static/GitHub Pages deployments use a deterministic mock journey provider. A production Routes API key stays server-side behind `POST /api/journey/estimate`; see [.env.example](.env.example), [journey intelligence](docs/journey-intelligence.md), [Google Routes setup](docs/google-routes-setup.md), [location privacy](docs/location-privacy.md), and [deployment architecture](docs/deployment-architecture.md).
