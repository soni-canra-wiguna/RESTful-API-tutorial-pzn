import { Contact } from "@prisma/client"
import { string } from "zod"

export type ContactResponse = {
  id: number
  first_name: string
  last_name?: string | null
  email?: string | null
  phone?: string | null
}

// omit menghapus property yang kita tambahkan, disini aku remove property id
export type CreateContactRequest = Omit<ContactResponse, "id">

export type UpdateContactRequest = ContactResponse

export type SearchContactRequest = {
  name?: string
  phone?: string
  email?: string
  page: number
  size: number
}

export function toContactResponse(contact: Contact): ContactResponse {
  return {
    id: contact.id,
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    phone: contact.phone,
  }
}
