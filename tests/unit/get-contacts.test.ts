import { GetContactUseCase } from '../../src/application/use-cases/get-contacts'
import { NotFoundError } from '../../src/domain/errors/not-found-error'

describe('GetContactUseCase', () => {
  let mockRepository: any
  let useCase: GetContactUseCase

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
    }
    useCase = new GetContactUseCase(mockRepository)
  })

  it('should get a contact by id', async () => {
    const contact = {
      id: '123',
      name: 'John Doe',
      birthDate: new Date('1990-01-01'),
      sex: 'M',
      active: true,
      age: 36,
    }

    mockRepository.findById.mockResolvedValue(contact)

    const result = await useCase.execute('123')

    expect(mockRepository.findById).toHaveBeenCalledWith('123')
    expect(result).toEqual(contact)
  })

  it('should throw NotFoundError when contact does not exist', async () => {
    mockRepository.findById.mockResolvedValue(null)

    await expect(useCase.execute('invalid-id')).rejects.toThrow(NotFoundError)
    await expect(useCase.execute('invalid-id')).rejects.toThrow('Contato não encontrado ou inativo')
  })

  it('should throw NotFoundError when contact is inactive', async () => {
    const inactiveContact = {
      id: '123',
      name: 'John Doe',
      birthDate: new Date('1990-01-01'),
      sex: 'M',
      active: false,
      age: 36,
    }

    mockRepository.findById.mockResolvedValue(inactiveContact)

    await expect(useCase.execute('123')).rejects.toThrow(NotFoundError)
    await expect(useCase.execute('123')).rejects.toThrow('Contato não encontrado ou inativo')
  })

  it('should call repository.findById with correct id', async () => {
    const contact = {
      id: '456',
      name: 'Jane Doe',
      birthDate: new Date('1985-05-15'),
      sex: 'F',
      active: true,
      age: 41,
    }

    mockRepository.findById.mockResolvedValue(contact)

    await useCase.execute('456')

    expect(mockRepository.findById).toHaveBeenCalledWith('456')
    expect(mockRepository.findById).toHaveBeenCalledTimes(1)
  })
})
