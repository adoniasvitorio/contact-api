import { type ContactRepository } from '../../domain/repositories/contact-repository'
import { NotFoundError } from '../../domain/errors/not-found-error'

export class GetContactUseCase {
  constructor(private repository: ContactRepository) {}

  async execute(id: string) {
    const contact = await this.repository.findById(id)

    if (!contact || !contact.active) {
      throw new NotFoundError('Contato não encontrado ou inativo')
    }

    return contact
  }
}