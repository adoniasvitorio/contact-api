import { MongoContactRepository } from '../infra/repositories/mongo-contact-repositry'

import { GetContactUseCase } from '../application/use-cases/get-contacts'
import { ListContactsUseCase } from '../application/use-cases/list-contacts'
import { CreateContactUseCase } from '../application/use-cases/create-contact'
import { DeleteContactUseCase } from '../application/use-cases/delete-contacts'
import { DeactivateContactUseCase } from '../application/use-cases/deactivate-contacts'

export function makeContainer() {
    const repository = new MongoContactRepository()

    return {
        getContact: new GetContactUseCase(repository),
        listContact: new ListContactsUseCase(repository),
        createContact: new CreateContactUseCase(repository),
        deleteContact: new DeleteContactUseCase(repository),
        deactivateContact: new DeactivateContactUseCase(repository)
    }
}