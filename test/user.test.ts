import supertest from "supertest"
import { web } from "./../src/application/web"
import { logger } from "../src/application/logger"
import { UserTest } from "./test-util"

describe("POST /api/users", () => {
  afterEach(async () => {
    await UserTest.delete()
  })

  it("should reject register new user if req is invalid", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    })
    logger.debug(response.body)

    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
  })

  it("should register new user", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test",
      name: "test",
    })
    logger.debug(response.body)

    expect(response.status).toBe(200)
    expect(response.body.data.username).toBe("test")
    expect(response.body.data.name).toBe("test")
  })
})

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await UserTest.create()
  })

  afterEach(async () => {
    await UserTest.delete()
  })

  it("should be able to login", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test",
    })
    logger.debug(response.body)

    expect(response.status).toBe(200)
    expect(response.body.data.username).toBe("test")
    expect(response.body.data.name).toBe("test")
    expect(response.body.data.token).toBeDefined() // pake toBeDefined untuk memastikan aja tokennya itu ada apa ngga
  })

  it("should reject login user when username is wrong", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "wrong username",
      password: "test",
    })
    logger.debug(response.body)

    expect(response.status).toBe(401)
    expect(response.body.errors).toBeDefined()
  })

  it("should reject login user when password is wrong", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "wrong password",
    })
    logger.debug(response.body)

    expect(response.status).toBe(401)
    expect(response.body.errors).toBeDefined()
  })
})
