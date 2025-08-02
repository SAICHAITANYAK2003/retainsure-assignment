require('dotenv').config();
const express = require('express');
const cors = require('cors');
// Custom short code generator (6-char alphanumeric)
function generateShortCode() {
  return Math.random().toString(36).substr(2, 6);
}
const validUrl = require('valid-url');

const app = express();
const PORT = process.env.PORT || 5002;

// In-memory store
const urlMap = new Map();
// Structure: shortCode -> { originalUrl, createdAt, clickCount }

app.use(cors());
app.use(express.json());

// POST /api/shorten — create short URL
app.post('/api/shorten', (req, res) => {
  const { url } = req.body;
  if (!url || !validUrl.isWebUri(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  // Check if URL already exists
  for (const [code, data] of urlMap.entries()) {
    if (data.originalUrl === url) {
      return res.json({ shortCode: code });
    }
  }
  const shortCode = generateShortCode();
  urlMap.set(shortCode, {
    originalUrl: url,
    createdAt: new Date(),
    clickCount: 0
  });
  res.status(201).json({ shortCode });
});

// GET /:short_code — redirect to original URL
app.get('/:shortCode', (req, res) => {
  const data = urlMap.get(req.params.shortCode);
  if (!data) return res.status(404).json({ error: 'Short code not found' });
  data.clickCount++;
  res.redirect(data.originalUrl);
});

// GET /api/stats/:short_code — stats
app.get('/api/stats/:shortCode', (req, res) => {
  const data = urlMap.get(req.params.shortCode);
  if (!data) return res.status(404).json({ error: 'Short code not found' });
  res.json({
    originalUrl: data.originalUrl,
    clickCount: data.clickCount,
    createdAt: data.createdAt
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`URL Shortener backend running on port ${PORT}`);
  });
}

module.exports = app;
