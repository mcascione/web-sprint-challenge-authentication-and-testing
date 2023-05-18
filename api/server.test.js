const db = require("../data/dbConfig");
const request = require("supertest");
const server = require("./server");

// Write your tests here
test("sanity", () => {
  expect(true).toBe(true);
});

describe("[GET] /api/jokes", () => {
  const validUser = { username: "sally-bae", password: "1234" };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbGx5LWJhZSIsImlhdCI6MTY4NDM3NDYwNiwiZXhwIjoxNjg0NDYxMDA2fQ.fWGEm0ZRbK0NQ2Ia8MTY4Yb3cUYFRt4_SbcewmdRQxA";
  test("responds with status 200", async () => {
    const res = await request(server)
      .get("/api/jokes")
      .set("Authorization", token);
    expect(res.status).toBe(200);
  });
  test("responds with all the jokes", async () => {
    const res = await request(server)
      .get("/api/jokes")
      .set("Authorization", token);
    expect(res.body).toHaveLength(3);
  });
});
