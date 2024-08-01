import { prisma } from "../src/application/database"

export class UserTest {
  static async delete() {
    // otomatis delete user setelah testing selesai
    await prisma.user.deleteMany({
      where: {
        username: "test",
      },
    })
  }
}
