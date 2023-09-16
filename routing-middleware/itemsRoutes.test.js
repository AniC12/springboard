process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app");
let items = require("./fakeDB");
const { beforeEach, afterEach, describe } = require("node:test");
let item = { name: "milk", price: 6.99};

beforeEach(function() {
    items.push(item);
});

afterEach(function() {
    items = [];
});

describe("Get /items", function() {
    test("Gets a list of items", async function() {
        const response = await request(app).get(`/items`);
        expect(response.statusCode).toBe(200);
    })
});


describe("GET /items/:name", function () {
    test("Gets a single item", async function () {
      const response = await request(app).get(`/items/${item.name}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.item).toEqual(item);
    });
  
    test("Responds with 404 if can't find item", async function () {
      const response = await request(app).get(`/items/abc`);
      expect(response.statusCode).toBe(404);
    });
});


describe("POST /items", function () {
    test("Creates a new item", async function () {
      const response = await request(app)
        .post(`/items`)
        .send({
          name: "apple",
          price: 3.99
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.item).toHaveProperty("name");
      expect(response.body.item).toHaveProperty("price");
      expect(response.body.item.name).toEqual("apple");
      expect(response.body.item.price).toEqual(3.99);
    });
});

describe("PATCH /items/:name", async function () {
    test("Updates a single item", async function () {
      const response = await request(app)
        .patch(`/items/${item.name}`)
        .send({
          name: "oatmilk"
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.item).toEqual({
        name: "oatmilk",
        price: 6.99,
      });
    });
  
    test("Responds with 404 if can't find item", async function () {
      const response = await request(app).patch(`/items/abc`);
      expect(response.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", function () {
    test("Deletes a single a item", async function () {
      const response = await request(app)
        .delete(`/items/${item.name}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: "Deleted" });
    });
});