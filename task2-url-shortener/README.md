# Task 2: URL Shortener (Backend)

## Features
- Node.js + Express backend
- In-memory storage (no database required)
- Shorten URLs, redirect, stats
- Jest/Supertest tests included (all pass)
- Centralized error handling

---

## 🚀 How to Run & Test

### 1. Install dependencies
```bash
npm install
```

### 2. (Optional) Set up environment
Copy `.env.example` to `.env` if you want to change the port (default is 5002).

### 3. Start the backend
```bash
npm run dev
```
- The server will run on the port from `.env` or 5002 by default.
- You should see: `URL Shortener backend running on port 5002`

### 4. Run all tests (major check)
```bash
npm test
```
- All 5 tests should pass. If you see failures, ensure the backend is **not running** during tests, as tests use the app directly.

---

## 🛠️ API Endpoints

| Method | Endpoint                | Description                        |
|--------|-------------------------|------------------------------------|
| POST   | /api/shorten            | Shorten a URL, returns shortCode   |
| GET    | /:shortCode             | Redirect to the original URL       |
| GET    | /api/stats/:shortCode   | Get stats for a short URL          |

### Example Requests

#### Shorten a URL
```bash
curl -X POST http://localhost:5002/api/shorten -H 'Content-Type: application/json' -d '{"url":"https://www.example.com"}'
```

#### Redirect
Open in browser:
`http://localhost:5002/abc123` (replace `abc123` with your shortCode)

#### Stats
```bash
curl http://localhost:5002/api/stats/abc123
```

---

## 🧪 Major Check/Validation
- **All code is CommonJS, no ESM issues.**
- **No port collision in tests:** tests use the app instance, not a running server.
- **All dependencies compatible and installed.**
- **All endpoints validated by tests.**
- **Centralized error handling and input validation.**

---

## 🗂️ Folder Structure
```
backend/
  |-- server.js
tests/
  |-- urlShortener.test.js
.env.example
package.json
README.md
```

---

## 🐞 Troubleshooting
- **Port in use?** Change `PORT` in `.env` to a free port.
- **Tests fail with EADDRINUSE?** Make sure the backend server is **not** running while you run tests.
- **No database required:** all data is in-memory and resets on restart.
- **Other errors?** Check your terminal for error messages.

---

**This backend is fully checked and ready for use. If you need a Postman collection or want to add a frontend, let me know!**
