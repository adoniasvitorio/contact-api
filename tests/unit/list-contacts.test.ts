import { ListContactsUseCase } from '../../src/application/use-cases/list-contacts'

describe('ListContactsUseCase', () => {
  let mockRepository: any
  let useCase: ListContactsUseCase

  beforeEach(() => {
    mockRepository = {
      findAllActive: jest.fn(),
    }
    useCase = new ListContactsUseCase(mockRepository)
  })

  it('should list all active contacts', async () => {
    const contacts = [
      {
        id: '1',
        name: 'John Doe',
        birthDate: new Date('1990-01-01'),
        sex: 'M',
        active: true,
        age: 36,
      },
      {
        id: '2',
        name: 'Jane Doe',
        birthDate: new Date('1985-05-15'),
        sex: 'F',
        active: true,
        age: 41,
      },
    ]

    mockRepository.findAllActive.mockResolvedValue(contacts)

    const result = await useCase.execute()

    expect(mockRepository.findAllActive).toHaveBeenCalled()
    expect(result).toEqual(contacts)
    expect(result).toHaveLength(2)
  })

  it('should return empty array when no contacts exist', async () => {
    mockRepository.findAllActive.mockResolvedValue([])

    const result = await useCase.execute()

    expect(mockRepository.findAllActive).toHaveBeenCalled()
    expect(result).toEqual([])
    expect(result).toHaveLength(0)
  })

  it('should return only active contacts', async () => {
    const contacts = [
      {
        id: '1',
        name: 'Active Contact',
        birthDate: new Date('1990-01-01'),
        sex: 'M',
        active: true,
        age: 36,
      },
    ]

    mockRepository.findAllActive.mockResolvedValue(contacts)

    const result = await useCase.execute()

    expect(result).toEqual(contacts)
    expect(result.every((contact: any) => contact.active)).toBe(true)
  })
})
