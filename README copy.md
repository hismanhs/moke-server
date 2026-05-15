# Mock Server

A simple mock server for Graphite Service built with Express and TypeScript.

## Setup

Install dependencies:

```bash
npm install
```

## Running the server

### Development mode

```bash
npm run dev
```

This runs the server with `ts-node-dev` and reloads on file changes.

### Build and production mode

```bash
npm run build
npm start
```

## Configuration

The server supports these environment variables:

- `HOST` - server host (default: `localhost`)
- `PORT` - server port (default: `3000`)
- `MOCK_DELAY_MS` - mock response delay in milliseconds (default: `150`)

### Run on a different port

```bash
PORT=4000 npm run dev
```

### Disable the mock delay

```bash
MOCK_DELAY_MS=0 npm run dev
```

## API routes

The mock server exposes these routes under `/api`:

- `GET /api/health`
- `GET /api/users`
- `POST /api/users`
- `GET /api/users/:id`
- `DELETE /api/users/:id`
- `GET /api/items` (optional `status` query parameter)
- `POST /api/items`
- `GET /api/items/:id`
- `PATCH /api/items/:id`
- `DELETE /api/items/:id`

## Default URL

With default settings, the server runs at:

```text
http://localhost:3000
```
