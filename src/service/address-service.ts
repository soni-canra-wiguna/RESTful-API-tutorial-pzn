import { User } from "@prisma/client"
import {
  AddressResponse,
  CreateAddressRequest,
  toAddressResponse,
} from "../model/address-model"
import { Validation } from "../validation/validation"
import { AddressValidation } from "../validation/address-validation"
import { ContactService } from "./contact-service"
import { prisma } from "../application/database"

export class AddressServices {
  static async create(
    user: User,
    request: CreateAddressRequest
  ): Promise<AddressResponse> {
    const createRequest = Validation.validate(AddressValidation.CREATE, request)
    await ContactService.checkContactMustExist(
      user.username,
      request.contact_id
    )

    const address = await prisma.address.create({
      data: createRequest,
    })

    return toAddressResponse(address)
  }
}
