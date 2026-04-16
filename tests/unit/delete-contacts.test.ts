import { DeleteContactUseCase } from '../../src/application/use-cases/delete-contacts'
import { NotFoundError } from '../../src/domain/errors/not-found-error'

describe('DeleteContactUseCase', () => {
  let mockRepository: any
  let useCase: DeleteContactUseCase

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    }
    useCase = new DeleteContactUseCase(mockRepository)
  })

  it('should delete a contact successfully', async () => {
    const contact = {
      id: '123',
      name: 'John Doe',
      birthDate: new Date('1990-01-01'),
      sex: 'M',
      active: true,
      age: 36,
    }

    mockRepository.findById.mockResolvedValue(contact)
    mockRepository.delete.mockResolvedValue(undefined)

    await useCase.execute('123')

    expect(mockRepository.findById).toHaveBeenCalledWith('123')
    expect(mockRepository.delete).toHaveBeenCalledWith('123')
  })

  it('should throw NotFoundError when contact does not exist', async () => {
    mockRepository.findById.mockResolvedValue(null)

    await expect(useCase.execute('invalid-id')).rejects.toThrow(NotFoundError)
    await expect(useCase.execute('invalid-id')).rejects.toThrow('Contato não encontrado')
  })

  it('should not call delete when contact is not found', async () => {
    mockRepository.findById.mockResolvedValue(null)

    await expect(useCase.execute('invalid-id')).rejects.toThrow()

    expect(mockRepository.delete).not.toHaveBeenCalled()
  })

  it('should call repository.findById before calling delete', async () => {
    const contact = {
      id: '456',
      name: 'Jane Doe',
      birthDate: new Date('1985-05-15'),
      sex: 'F',
      active: true,
      age: 41,
    }

    mockRepository.findById.mockResolvedValue(contact)
    mockRepository.delete.mockResolvedValue(undefined)

    await useCase.execute('456')

    expect(mockRepository.findById).toHaveBeenCalled()
    expect(mockRepository.delete).toHaveBeenCalled()
  })

  it('should delete an inactive contact', async () => {
    const inactiveContact = {
      id: '789',
      name: 'Old Contact',
      birthDate: new Date('1980-01-01'),
      sex: 'M',
      active: false,
      age: 46,
    }

    mockRepository.findById.mockResolvedValue(inactiveContact)
    mockRepository.delete.mockResolvedValue(undefined)

    await useCase.execute('789')

    expect(mockRepository.delete).toHaveBeenCalledWith('789')
  })

  it('should delete the correct contact by id', async () => {
    const contact = {
      id: 'specific-id',
      name: 'Test Contact',
      birthDate: new Date('1995-12-25'),
      sex: 'O',
      active: true,
      age: 30,
    }

    mockRepository.findById.mockResolvedValue(contact)
    mockRepository.delete.mockResolvedValue(undefined)

    await useCase.execute('specific-id')

    expect(mockRepository.findById).toHaveBeenCalledWith('specific-id')
    expect(mockRepository.delete).toHaveBeenCalledWith('specific-id')
  })
})
