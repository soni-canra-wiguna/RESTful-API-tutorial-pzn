import { prisma } from "../application/database"
import {
  ContactResponse,
  CreateContactRequest,
  toContactResponse,
} from "../model/contact-model"
import { ContactValidation } from "../validation/contact-validation"
import { Validation } from "../validation/validation"
import { User } from "@prisma/client"

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
}
