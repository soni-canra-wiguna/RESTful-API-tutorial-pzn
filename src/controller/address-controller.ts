import { NextFunction, Response } from "express"
import { UserRequest } from "../type/user-request"
import {
  CreateAddressRequest,
  GetAddressRequest,
  RemoveAddressRequest,
} from "../model/address-model"
import { AddressServices } from "../service/address-service"
import { UpdateAddressRequest } from "./../model/address-model"

export class AddressController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateAddressRequest = req.body as CreateAddressRequest
      request.contact_id = Number(req.params.contactId)

      const response = await AddressServices.create(req.user!, request)

      res.status(200).json({
        data: response,
      })
    } catch (error) {
      next(error)
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: GetAddressRequest = {
        id: Number(req.params.addressId),
        contact_id: Number(req.params.contactId),
      }
      request.contact_id = Number(req.params.contactId)

      const response = await AddressServices.get(req.user!, request)
      res.status(200).json({
        data: response,
      })
    } catch (error) {
      next(error)
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateAddressRequest = req.body as UpdateAddressRequest
      request.contact_id = Number(req.params.contactId)
      request.id = Number(req.params.addressId)

      const response = await AddressServices.update(req.user!, request)

      res.status(200).json({
        data: response,
      })
    } catch (error) {
      next(error)
    }
  }

  static async remove(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: RemoveAddressRequest = {
        id: Number(req.params.addressId),
        contact_id: Number(req.params.contactId),
      }
      request.contact_id = Number(req.params.contactId)

      await AddressServices.remove(req.user!, request)
      res.status(200).json({
        data: "OK",
      })
    } catch (error) {
      next(error)
    }
  }
}
