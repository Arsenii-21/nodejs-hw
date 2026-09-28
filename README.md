# nodejs-hw

A minimal Express API for the notes assignment.

## Run locally

```sh
npm install
npm run dev
```

The server uses `PORT` from `.env` and defaults to port `3000`.

## Routes

- `GET /notes` returns `{ "message": "Retrieved all notes" }`.
- `GET /notes/:noteId` returns the requested note ID in the message.
- `GET /test-error` returns a simulated `500` error.
- Unknown routes return `{ "message": "Route not found" }` with status `404`.

Run `npm test` to verify the route responses and `npm run lint` to lint the project.

## Render

The `render.yaml` Blueprint configures a Node web service from branch `01-express`.
