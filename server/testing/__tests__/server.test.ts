const request = require("supertest")
const server = require("../")
import client from "../database/"

describe("Questions Test Suite", () => {
  test("GET Test", async () => {
    // const response = await
    await request(server)
      .get("/qa/questions")
      .query({
        product_id: 1,
      })
      .expect(200)
    return;
  })

  test("POST Test", async () => {
    // const response = await
    await request(server)
      .post("/qa/questions")
      .query({
        product_id: 1,
      })
      .send({
        body: "Test question?",
        name: "test user",
        email: "first.last@email.com",
        product_id: 1,
      })
      .expect(201)
    return;
  })

  test("Helpful Test", async () => {
    // const response = await
    await request(server)
      .put("/qa/questions/1/helpful")
      .expect(200)
    return;
  })

  test("Reported Test", async () => {
    // const response = await
    await request(server)
      .put("/qa/questions/1/report")
      .expect(200)
    return;
  })

  afterAll(async () => {
    await server.close()
    // await client.end()
  })
})

describe("Answers Test Suite", () => {
  test("GET Test", async () => {
    // const response = await
    await request(server)
      .get("/qa/questions/1/answers")
      .expect(200)
    return;
  })

  test("POST Test", async () => {
    // const response = await
    await request(server)
      .post("/qa/questions/1/answers")
      .send({
        body: "Test answer?",
        name: "test user",
        email: "first.last@email.com",
        question_id: 1,
      })
      .expect(201)
    return;
  })

  test("Helpful Test", async () => {
    // const response = await
    await request(server)
      .put("/qa/answers/1/helpful")
      .expect(200)
    return;
  })

  test("Reported Test", async () => {
    // const response = await
    await request(server)
      .put("/qa/answers/1/report")
      .expect(200)
    return;
  })

  afterAll(async () => {
    await server.close()
    // await client.end()
  })
})
