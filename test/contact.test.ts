import supertest from "supertest"
import { ContactTest, UserTest } from "./test-util"
import { web } from "../src/application/web"
import { logger } from "../src/application/logger"

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.create()
  })

  afterEach(async () => {
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it("should create new contact", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "soni canra",
        last_name: "wiguna",
        email: "sonicanrawiguna@gmail.com",
        phone: "03847323432",
      })
    logger.debug(response.body)

    expect(response.status).toBe(200)
    expect(response.body.data.id).toBeDefined()
    expect(response.body.data.first_name).toBe("soni canra")
    expect(response.body.data.last_name).toBe("wiguna")
    expect(response.body.data.email).toBe("sonicanrawiguna@gmail.com")
    expect(response.body.data.phone).toBe("03847323432")
  })

  it("should reject create new contact if data is invalid", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "wrongemail",
        phone: "9094435893455985348345879534835478934",
      })
    logger.debug(response.body)

    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
  })
})
