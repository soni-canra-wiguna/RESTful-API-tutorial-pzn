import {
  CreateUserRequest,
  toUserResponse,
  UserResponse,
} from "../model/user-model"
import { Validation } from "../validation/validation"
import { UserValidation } from "../validation/user-validation"
import { prisma } from "../application/database"
import { ResponseError } from "../error/response-error"
import bcrypt from "bcrypt"

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    )

    //check apakah usernamenya sudah ada
    const totalUserWithSameUsername = await prisma.user.count({
      where: {
        username: registerRequest.username,
      },
    })

    if (totalUserWithSameUsername != 0) {
      // simplenya apakah usernamenya itu ada di db
      throw new ResponseError(400, "username already exists")
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

    const user = await prisma.user.create({
      data: registerRequest,
    })

    return toUserResponse(user)
  }
}
