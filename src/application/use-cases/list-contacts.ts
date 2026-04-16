import { type ContactRepository } from '../../domain/repositories/contact-repository'

export class ListContactsUseCase {
  constructor(private repository: ContactRepository) {}

  async execute() {
    return this.repository.findAllActive()
  }
}