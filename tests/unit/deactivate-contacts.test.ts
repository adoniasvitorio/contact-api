import { DeactivateContactUseCase } from '../../src/application/use-cases/deactivate-contacts'
import { NotFoundError } from '../../src/domain/errors/not-found-error'

describe('DeactivateContactUseCase', () => {
  let mockRepository: any
  let useCase: DeactivateContactUseCase

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      deactivate: jest.fn(),
    }
    useCase = new DeactivateContactUseCase(mockRepository)
  })

  it('should deactivate a contact successfully', async () => {
    const contact = {
      id: '123',
      name: 'John Doe',
      birthDate: new Date('1990-01-01'),
      sex: 'M',
      active: true,
      age: 36,
    }

    mockRepository.findById.mockResolvedValue(contact)
    mockRepository.deactivate.mockResolvedValue(undefined)

    await useCase.execute('123')

    expect(mockRepository.findById).toHaveBeenCalledWith('123')
    expect(mockRepository.deactivate).toHaveBeenCalledWith('123')
  })

  it('should throw NotFoundError when contact does not exist', async () => {
    mockRepository.findById.mockResolvedValue(null)

    await expect(useCase.execute('invalid-id')).rejects.toThrow(NotFoundError)
    await expect(useCase.execute('invalid-id')).rejects.toThrow('Contato não encontrado')
  })

  it('should not call deactivate when contact is not found', async () => {
    mockRepository.findById.mockResolvedValue(null)

    await expect(useCase.execute('invalid-id')).rejects.toThrow()

    expect(mockRepository.deactivate).not.toHaveBeenCalled()
  })

  it('should call repository.findById before calling deactivate', async () => {
    const contact = {
      id: '456',
      name: 'Jane Doe',
      birthDate: new Date('1985-05-15'),
      sex: 'F',
      active: true,
      age: 41,
    }

    mockRepository.findById.mockResolvedValue(contact)
    mockRepository.deactivate.mockResolvedValue(undefined)

    await useCase.execute('456')

    expect(mockRepository.findById).toHaveBeenCalled()
    expect(mockRepository.deactivate).toHaveBeenCalled()
  })

  it('should deactivate an already inactive contact', async () => {
    const inactiveContact = {
      id: '789',
      name: 'Old Contact',
      birthDate: new Date('1980-01-01'),
      sex: 'M',
      active: false,
      age: 46,
    }

    mockRepository.findById.mockResolvedValue(inactiveContact)
    mockRepository.deactivate.mockResolvedValue(undefined)

    await useCase.execute('789')

    expect(mockRepository.deactivate).toHaveBeenCalledWith('789')
  })
})
