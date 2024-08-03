import { User } from "@prisma/client"
import {
  AddressResponse,
  CreateAddressRequest,
  GetAddressRequest,
  toAddressResponse,
} from "../model/address-model"
import { Validation } from "../validation/validation"
import { AddressValidation } from "../validation/address-validation"
import { ContactService } from "./contact-service"
import { prisma } from "../application/database"
import { ResponseError } from "../error/response-error"

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

  static async get(
    user: User,
    request: GetAddressRequest
  ): Promise<AddressResponse> {
    const getRequest = Validation.validate(AddressValidation.GET, request)
    await ContactService.checkContactMustExist(
      user.username,
      request.contact_id
    )
    const address = await prisma.address.findFirst({
      where: {
        id: getRequest.id,
        contact_id: getRequest.contact_id,
      },
    })

    if (!address) {
      throw new ResponseError(404, "address not found")
    }

    return toAddressResponse(address)
  }
}
