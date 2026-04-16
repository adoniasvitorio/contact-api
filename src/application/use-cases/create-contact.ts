import { type ContactRepository } from '../../domain/repositories/contact-repository'
import { Contact } from '../../domain/entities/contact'

interface CreateContactInput {
  name: string
  birthDate: string
  sex: 'M' | 'F' | 'O'
}

export class CreateContactUseCase {
  constructor(private repository: ContactRepository) {}

  async execute(input: CreateContactInput) {
    const contact = new Contact({
      name: input.name,
      birthDate: new Date(input.birthDate),
      sex: input.sex,
      active: true,
    })

    const created = await this.repository.create(contact)

    return created
  }
}