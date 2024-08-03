import supertest from "supertest"
import { AddressTest, ContactTest, UserTest } from "./test-util"
import { web } from "./../src/application/web"
import { logger } from "../src/application/logger"

describe("POST /api/contacts/:contactId/addresses", () => {
  beforeEach(async () => {
    await UserTest.create()
    await ContactTest.create()
  })

  afterEach(async () => {
    await AddressTest.deleteAll()
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it("should be able to create address", async () => {
    const contact = await ContactTest.get()
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "jalan menuju langit",
        city: "atlantis",
        province: "atlanta",
        country: "tuvalu",
        postal_code: "99999",
      })
    logger.debug(response.body)

    expect(response.status).toBe(200)
    expect(response.body.data.id).toBeDefined()
    expect(response.body.data.street).toBe("jalan menuju langit")
    expect(response.body.data.city).toBe("atlantis")
    expect(response.body.data.province).toBe("atlanta")
    expect(response.body.data.country).toBe("tuvalu")
    expect(response.body.data.postal_code).toBe("99999")
  })

  it("should reject create new address if contact is not found", async () => {
    const contact = await ContactTest.get()
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id + 1}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "jalan menuju langit",
        city: "atlantis",
        province: "atlanta",
        country: "tuvalu",
        postal_code: "99999",
      })
    logger.debug(response.body)

    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
})
