const request = require("supertest");
const app = require("../app");
const {validate} = require('uuid');

describe("Test the API", () => {
    test("The API should respond with a 200 for the GET method", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });

    test("The API should respond with a 403 (forbidden) to the DELETE method", async () => {
        const response = await request(app).delete("/1");
        expect(response.statusCode).toBe(403);
    });

    test("The API should respond with a UUID order number when an order is submitted by POST method to /submit_order", async () => {
        const json = {
            firstname: "Jenny",
            lastname: "Gump"
        }
        const response = await request(app).post("/submit_order").send(json);
        expect(response.statusCode).toBe(200);
        expect(validate(response.text, 4)).toEqual(true);
    });

    test("The API should respond with a JSON list of orders for a GET request to /listOrders", async () => {
        const response = await request(app).get("/listOrders");
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json')
    });

    test("The API should respond with a JSON object representing an order for 'Jamie Minyard' for a GET request to /c08793db-c377-470d-9fa8-f48ad45c541b", async () => {
        const response = await request(app).get("/c08793db-c377-470d-9fa8-f48ad45c541b");
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        expect(response.text).toContain("Jamie");
        expect(response.text).toContain("Minyard");
    });
});