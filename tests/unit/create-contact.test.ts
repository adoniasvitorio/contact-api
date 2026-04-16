import { CreateContactUseCase } from '../../src/application/use-cases/create-contact'
import { ValidationError } from '../../src/domain/errors/validation-error'

describe('CreateContactUseCase', () => {
  let mockRepository: any
  let useCase: CreateContactUseCase

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
    }
    useCase = new CreateContactUseCase(mockRepository)
  })

  it('should create a contact successfully', async () => {
    const input = {
      name: 'John Doe',
      birthDate: '1990-01-01',
      sex: 'M' as const,
    }

    const createdContact = {
      id: '123',
      name: 'John Doe',
      birthDate: new Date('1990-01-01'),
      sex: 'M',
      active: true,
      age: 36,
    }

    mockRepository.create.mockResolvedValue(createdContact)

    const result = await useCase.execute(input)

    expect(mockRepository.create).toHaveBeenCalled()
    expect(result).toEqual(createdContact)
  })

  it('should throw ValidationError when name is empty', async () => {
    const input = {
      name: '',
      birthDate: '1990-01-01',
      sex: 'M' as const,
    }

    await expect(useCase.execute(input)).rejects.toThrow(ValidationError)
  })

  it('should throw ValidationError when birth date is in the future', async () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const input = {
      name: 'John Doe',
      birthDate: tomorrow.toISOString().split('T')[0],
      sex: 'M' as const,
    }

    await expect(useCase.execute(input)).rejects.toThrow(ValidationError)
  })

  it('should throw ValidationError when contact is under 18 years old', async () => {
    const today = new Date()
    const birthDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate())

    const input = {
      name: 'Young Person',
      birthDate: birthDate.toISOString().split('T')[0],
      sex: 'F' as const,
    }

    await expect(useCase.execute(input)).rejects.toThrow(ValidationError)
  })

  it('should throw ValidationError when contact has negative age', async () => {
    const futureDate = new Date()
    futureDate.setFullYear(futureDate.getFullYear() + 1)

    const input = {
      name: 'Future Person',
      birthDate: futureDate.toISOString().split('T')[0],
      sex: 'O' as const,
    }

    await expect(useCase.execute(input)).rejects.toThrow(ValidationError)
  })

  it('should call repository.create with Contact instance', async () => {
    const input = {
      name: 'Jane Doe',
      birthDate: '1985-05-15',
      sex: 'F' as const,
    }

    mockRepository.create.mockResolvedValue({
      id: '456',
      ...input,
      active: true,
    })

    await useCase.execute(input)

    expect(mockRepository.create).toHaveBeenCalledWith(expect.objectContaining({
      props: expect.objectContaining({
        name: input.name,
        sex: input.sex,
        active: true,
      }),
    }))
  })
})
