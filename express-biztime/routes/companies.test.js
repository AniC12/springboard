process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');

let testCompany;
beforeEach(async () => {
    const result = await db.query(
        `INSERT INTO companies (code, name, description) 
        VALUES ('mic', 'Microsoft', 'Technology company') 
        RETURNING  code, name, description`);
    testCompany = result.rows[0];
});

afterEach(async () => {
    await db.query(`DELETE FROM companies`);
});

afterAll(async () => {
    await db.end();
});

describe("GET /companies", () => {
    test("Get a list of companies", async () => {
        const res = await request(app).get('/companies');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ companies: [testCompany] });
    });
});

describe("GET /companies/:code", () => {
    test("Gets a single company", async () => {
        const res = await request(app).get(`/companies/${testCompany.code}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ company: testCompany });
    });
    test("Responds with 404 for invalid code", async () => {
        const res = await request(app).get(`/companies/gg`);
        expect(res.statusCode).toBe(404);
    });
});

describe("POST /companies", () => {
    test("Creates a single company", async () => {
        const res = await request(app).post('/companies').send({ code: 'go', name: 'Google', description: 'search' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            company: { code: 'go', name: 'Google', description: 'search' }
        });
    });
});

describe("PUT /companies/:code", () => {
    test("Updates a single company", async () => {
        const res = await request(app).put(`/companies/${testCompany.code}`).send({ name: 'Google', description: 'Tech comp' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            company: { code: 'mic', name: 'Google', description: 'Tech comp' }
        });
    });
    test("Responds with 404 for invalid code", async () => {
        const res = await request(app).put(`/companies/gg`).send({ code: 'google', name: 'Google', description: 'Tech comp' });
        expect(res.statusCode).toBe(404);
    });
});

describe("DELETE /companies/:code", () => {
    test("Deletes a single company", async () => {
        let res;
        try {
            res = await request(app).delete(`/companies/${testCompany.code}`);
            console.log(res.body); // Log the response body to see what you got
        } catch (error) {
            console.error(error); // This will log any errors that occurred during the request
        }
        //const res = await request(app).delete(`/companies/${testCompany.code}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ status: 'DELETED!' });
    });
});