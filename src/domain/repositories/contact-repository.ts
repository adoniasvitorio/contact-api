export interface ContactRepository {
  create(contact: any): Promise<any>
  findAllActive(): Promise<any[]>
  findById(id: string): Promise<any | null>
  deactivate(id: string): Promise<void>
  delete(id: string): Promise<void>
}