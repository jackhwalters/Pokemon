const request = require('supertest');
const { logger } = require('../logs');
const app = require('../app');
require('dotenv').config();

// Silence logs during non-production tests
if (process.env.NODE_ENV !== "prod") {
    logger.transports[2].silent = true;
}

// Tests for valid requests
describe("Given valid requests", () => {
    describe("Endpoint 1", () => {
        test("Should respond with 200", async () => {
            const response = await request(app)
                .get("/pokemon/mewtwo");
            expect(response.statusCode).toBe(200);
        });

        test("Should respond with correct content type header", async () => {
            const response = await request(app)
                .get("/pokemon/mewtwo");
            expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
        });

        test("Should respond with correct response payload", async () => {
            const response = await request(app)
                .get("/pokemon/mewtwo");
            expect(response.body.name).toBeDefined();
            expect(response.body.description).toBeDefined();
            expect(response.body.habitat).toBeDefined();
            expect(response.body.isLegendary).toBeDefined();
        });
    });

    describe("Endpoint 2", () => {
        test("Should respond with 200", async () => {
            const response = await request(app)
                .get("/pokemon/translated/mewtwo");
            expect(response.statusCode).toBe(200);
        });

        test("Should respond with correct content type header", async () => {
            const response = await request(app)
                .get("/pokemon/translated/mewtwo");
            expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
        });

        test("Should respond with correct response payload", async () => {
            const response = await request(app)
                .get("/pokemon/translated/mewtwo");
            expect(response.body.name).toBeDefined();
            expect(response.body.description).toBeDefined();
            expect(response.body.habitat).toBeDefined();
            expect(response.body.isLegendary).toBeDefined();
        });
    });
});

// Tests for invalid requests
describe("Given invalid requests", () => {
    describe("Endpoint 1", () => {
        describe("Invalid pokemon name", () => {
            test("Should respond with 404", async () => {
                const response = await request(app)
                    .get("/pokemon/mewtwo123");
                expect(response.statusCode).toBe(404);
            });

            test("Should respond with correct content type header", async () => {
                const response = await request(app)
                    .get("/pokemon/mewtwo123");
                expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
            });

            test("Should respond with correct response payload", async () => {
                const response = await request(app)
                    .get("/pokemon/mewtwo123");
                expect(response.body).toBeDefined();
            });
        });
        
        describe("Invalid URL", () => {
            test("Should respond with 404", async () => {
                const response = await request(app)
                    .get("/pokemon123/mewtwo");
                expect(response.statusCode).toBe(404);
            });

            test("Should respond with correct content type header", async () => {
                const response = await request(app)
                    .get("/pokemon123/mewtwo");
                expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
            });

            test("Should respond with correct response payload", async () => {
                const response = await request(app)
                    .get("/pokemon123/mewtwo");
                expect(response.body).toBeDefined();
            });
        });
    });

    describe("Endpoint 2", () => {
        describe("Invalid pokemon name", () => {
            test("Should respond with 404", async () => {
                const response = await request(app)
                    .get("/pokemon/translated/mewtwo123");
                expect(response.statusCode).toBe(404);
            });

            test("Should respond with correct content type header", async () => {
                const response = await request(app)
                    .get("/pokemon/translated/mewtwo123");
                expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
            });

            test("Should respond with correct response payload", async () => {
                const response = await request(app)
                    .get("/pokemon/translated/mewtwo123");
                expect(response.body).toBeDefined();
            });
        });

        describe("Invalid URL", () => {
            test("Should respond with 404", async () => {
                const response = await request(app)
                    .get("/pokemon123/translated/mewtwo");
                expect(response.statusCode).toBe(404);
            });

            test("Should respond with correct content type header", async () => {
                const response = await request(app)
                    .get("/pokemon123/translated/mewtwo");
                expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
            });

            test("Should respond with correct response payload", async () => {
                const response = await request(app)
                    .get("/pokemon123/translated/mewtwo");
                expect(response.body).toBeDefined();
            });
        });
    });
});