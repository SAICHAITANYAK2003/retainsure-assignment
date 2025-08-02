const request = require('supertest');
const express = require('express');
const app = require('../backend/server');

describe('URL Shortener API', () => {
  let shortCode;
  const testUrl = 'https://www.example.com';

  it('should return 400 for invalid URL', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({ url: 'not_a_url' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid URL');
  });

  it('should shorten a valid URL', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({ url: testUrl });
    expect(res.status).toBe(201);
    expect(res.body.shortCode).toHaveLength(6);
    shortCode = res.body.shortCode;
  });

  it('should redirect to the original URL', async () => {
    const res = await request(app)
      .get(`/${shortCode}`)
      .redirects(0);
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe(testUrl);
  });

  it('should return stats for a short code', async () => {
    const res = await request(app)
      .get(`/api/stats/${shortCode}`);
    expect(res.status).toBe(200);
    expect(res.body.originalUrl).toBe(testUrl);
    expect(typeof res.body.clickCount).toBe('number');
    expect(res.body.clickCount).toBeGreaterThanOrEqual(1);
  });

  it('should return 404 for unknown short code', async () => {
    const res = await request(app)
      .get('/api/stats/xxxxxx');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Short code not found');
  });
});
