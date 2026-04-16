import { type ContactRepository } from '../../domain/repositories/contact-repository'
import { NotFoundError } from '../../domain/errors/not-found-error'

export class DeleteContactUseCase {
  constructor(private repository: ContactRepository) {}

  async execute(id: string) {
    const contact = await this.repository.findById(id)

    if (!contact) {
      throw new NotFoundError('Contato não encontrado')
    }

    await this.repository.delete(id)
  }
}