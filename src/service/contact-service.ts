import { prisma } from "../application/database"
import { ResponseError } from "../error/response-error"
import {
  ContactResponse,
  CreateContactRequest,
  toContactResponse,
} from "../model/contact-model"
import { ContactValidation } from "../validation/contact-validation"
import { Validation } from "../validation/validation"
import { Contact, User } from "@prisma/client"

export class ContactService {
  static async create(
    user: User,
    request: CreateContactRequest
  ): Promise<ContactResponse> {
    const createRequest = Validation.validate(ContactValidation.CREATE, request)

    const record = {
      ...createRequest,
      ...{ username: user.username },
    }

    const contact = await prisma.contact.create({
      data: record,
    })

    return toContactResponse(contact)
  }

  static async get(user: User, id: number): Promise<ContactResponse> {
    const contact = await prisma.contact.findUnique({
      where: {
        id: id,
        username: user.username,
      },
    })

    if (!contact) {
      throw new ResponseError(404, "contact not found")
    }

    return toContactResponse(contact)
  }
}
