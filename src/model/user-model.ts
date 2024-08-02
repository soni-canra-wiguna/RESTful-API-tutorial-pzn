import { User } from "@prisma/client"

export type UserResponse = {
  username: string
  name: string
  token?: string
}

export type CreateUserRequest = {
  username: string
  name: string
  password: string
}

export type LoginUserRequest = Pick<CreateUserRequest, "password" | "username">

export type UpdateUserRequest = Pick<
  Partial<CreateUserRequest>,
  "name" | "password"
>

export function toUserResponse(user: User): UserResponse {
  return {
    name: user.name,
    username: user.username,
  }
}
