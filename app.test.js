const request = require('supertest')
const app = require('./app');


describe("POST /api/jobs/create", () => {
    it("POST - Create job", async () => {
        const response = await request(app).post("/api/jobs/create").send({
            JobTitle: "Software Engineer",
            JobLocation: "Klang",
            JobDescription: "Some Description"
        })
        expect(200)

        return response;
    })
})

describe("POST /api/jobs/create", () => {
    it("POST - Create job with invalid body", async () => {
        const response = await request(app).post("/api/jobs/create").send({
            JobTitle: null,
            JobLocation: null,
            JobDescription: null
        })
        expect(422);
        return response;
    })
})

describe("GET /api/jobs/list", () => {
    it("GET - Get all active job list without token", async () => {
        const response = await request(app).get("/api/jobs/list").expect(403)
        return response;
    })
})

describe("GET /api/token", () => {
    it("GET - Get all active job list", async () => {
        const response = await request(app).get("/api/token").expect(200)
        return response;
    })
})