import { User } from "@prisma/client"
import { prisma } from "../src/application/database"
import bcrypt from "bcrypt"

export class UserTest {
  static async delete() {
    // otomatis delete user setelah testing selesai
    await prisma.user.deleteMany({
      where: {
        username: "test",
      },
    })
  }

  static async create() {
    await prisma.user.create({
      data: {
        username: "test",
        password: await bcrypt.hash("test", 10),
        name: "test",
        token: "test",
      },
    })
  }

  static async get(): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        username: "test",
      },
    })

    if (!user) {
      throw new Error("user is not found")
    }

    return user
  }
}

export class ContactTest {
  static async deleteAll() {
    await prisma.contact.deleteMany({
      where: {
        username: "test",
      },
    })
  }
}
