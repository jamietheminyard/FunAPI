const request = require("supertest");
const app = require("../app");
const {validate} = require('uuid');

describe("Test the API", () => {
    test("The API should respond with a 200 for the GET method", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });

    test("The API should respond with a 403 (forbidden) when deleting an order", async () => {
        const response = await request(app).delete("/1");
        expect(response.statusCode).toBe(403);
    });

    test("The API should respond with a UUID order number when an order is submitted.", async () => {
        const json = {
            firstname: "Domino"
        }
        const response = await request(app).post("/submit_order").send(json);
        expect(response.statusCode).toBe(200);
        expect(validate(response.text, 4)).toEqual(true);
    });
});