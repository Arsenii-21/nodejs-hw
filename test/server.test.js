const assert = require('node:assert/strict');
const http = require('node:http');
const { after, before, test } = require('node:test');

const app = require('../src/server');

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
});

async function getJson(path) {
  return new Promise((resolve, reject) => {
    http
      .get(`${baseUrl}${path}`, (response) => {
        let body = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
          body += chunk;
        });
        response.on('end', () => {
          resolve({ status: response.statusCode, body: JSON.parse(body) });
        });
      })
      .on('error', reject);
  });
}

test('GET /notes returns all notes message', async () => {
  assert.deepEqual(await getJson('/notes'), {
    status: 200,
    body: { message: 'Retrieved all notes' },
  });
});

test('GET /notes/:noteId includes the requested ID', async () => {
  assert.deepEqual(await getJson('/notes/abc123'), {
    status: 200,
    body: { message: 'Retrieved note with ID: abc123' },
  });
});

test('GET /test-error returns a 500 JSON error', async () => {
  assert.deepEqual(await getJson('/test-error'), {
    status: 500,
    body: { message: 'Simulated server error' },
  });
});

test('unknown routes return a 404 JSON response', async () => {
  assert.deepEqual(await getJson('/unknown'), {
    status: 404,
    body: { message: 'Route not found' },
  });
});