import supertest from "supertest"
import { web } from "./../src/application/web"
import { logger } from "../src/application/logger"
import { UserTest } from "./test-util"
import bcrypt from "bcrypt"

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

describe("GET /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create()
  })

  afterEach(async () => {
    await UserTest.delete()
  })

  it("should be able to get user", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "test")
    logger.debug(response.body)

    expect(response.status).toBe(200)
    expect(response.body.data.username).toBe("test")
  })

  it("should reject get user if token is invalid", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "wrong")
    logger.debug(response.body)

    expect(response.status).toBe(401)
    expect(response.body.errors).toBeDefined()
  })
})

describe("PATCH /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create()
  })

  afterEach(async () => {
    await UserTest.delete()
  })

  it("should reject update user if request is invalid", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        name: "",
        password: "",
      })
    logger.debug(response.body)

    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
  })

  it("should reject update user if token is invalid", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "wrong-token")
      .send({
        name: "corrent",
        password: "corrent",
      })
    logger.debug(response.body)

    expect(response.status).toBe(401)
    expect(response.body.errors).toBeDefined()
  })

  it("should be able to update username", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        name: "updated name",
      })
    logger.debug(response.body)

    expect(response.status).toBe(200)
    expect(response.body.data.name).toBe("updated name")
  })

  it("should be able to update password", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        password: "updated password",
      })
    logger.debug(response.body)

    expect(response.status).toBe(200)

    const user = await UserTest.get()
    expect(await bcrypt.compare("updated password", user.password)).toBe(true)
  })
})
