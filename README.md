# nodejs-hw

A minimal Express + MongoDB API for the notes assignment.

## Run locally

```sh
npm install
npm run dev
```

The server uses `PORT` and `MONGO_URL` from `.env`. `PORT` defaults to port `3000`.

## Routes

- `GET /notes` - returns a paginated, filterable list of notes:
  - Query params: `page` (default `1`), `perPage` (default `10`, min `5`, max `20`), `tag` (one of the values in [tags.js](./src/constants/tags.js)), `search` (text search over `title` and `content`).
  - Response: `{ page, perPage, totalNotes, totalPages, notes }`.
- `GET /notes/:noteId` - returns a single note by id.
- `POST /notes` - creates a note. Body: `title` (required), `content` (optional), `tag` (optional, one of [tags.js](./src/constants/tags.js)).
- `PATCH /notes/:noteId` - updates a note. Body: any of `title`, `content`, `tag` (at least one is required).
- `DELETE /notes/:noteId` - deletes a note.
- Unknown routes return `{ "message": "Route not found" }` with status `404`.

All request parameters and bodies are validated with [celebrate](https://www.npmjs.com/package/celebrate); validation errors are returned with status `400`.

Run `npm run lint` to lint the project.

## Render

The `render.yaml` Blueprint configures a Node web service from branch `03-validation`.
