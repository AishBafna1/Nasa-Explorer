const request = require('supertest');
const app = require('../index'); // Adjust the path to your index.js

describe('API Endpoints', () => {
    it('GET /api/apod should return APOD data', async () => {
        const response = await request(app).get('/api/apod');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title'); // Check if title exists
        expect(response.body).toHaveProperty('date'); // Check if date exists
    });

    it('GET /api/mars-photos should return Mars rover photos data', async () => {
        const response = await request(app).get('/api/mars-photos?sol=1000'); // Example sol value
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('photos'); // Check if photos array exists
        expect(Array.isArray(response.body.photos)).toBe(true); // Ensure photos is an array
    });

    it('GET /api/epic should return EPIC images data', async () => {
        const response = await request(app).get('/api/epic');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true); // Ensure response is an array
    });

    it('GET /api/neo should return Near Earth Objects data', async () => {
        const response = await request(app).get('/api/neo');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true); // Ensure response is an array
    
        // Since response.body is an array, you can iterate over it directly
        response.body.forEach((neo) => {
            expect(neo).toHaveProperty('id');
            expect(neo).toHaveProperty('name');
            expect(neo).toHaveProperty('diameter');
            expect(neo).toHaveProperty('closeApproachDate');
            expect(neo).toHaveProperty('missDistance');
        });
    });

})
