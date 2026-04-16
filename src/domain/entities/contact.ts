import { ValidationError } from '../errors/validation-error'

type Sex = 'M' | 'F' | 'O'

export interface ContactProps {
  name: string
  birthDate: Date
  sex: Sex
  active: boolean
}

export class Contact {
  private props: ContactProps

  constructor(props: ContactProps) {
    this.props = props
    this.validate()
  }

  get age(): number {
    const today = new Date()
    const birth = new Date(this.props.birthDate)

    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--
    }

    return age
  }

  deactivate() {
    this.props.active = false
  }

  isActive() {
    return this.props.active
  }

  private validate() {
    const today = new Date()

    if (!this.props.name) {
      throw new ValidationError('Nome é obrigatório')
    }

    if (this.props.birthDate > today) {
      throw new ValidationError('Data de nascimento não pode ser futura')
    }

    if (this.age < 0) {
      throw new ValidationError('Idade inválida')
    }

    if (this.age < 18) {
      throw new ValidationError('Contato deve ser maior de idade')
    }
  }

  get data() {
    return {
      ...this.props,
      age: this.age,
    }
  }
}