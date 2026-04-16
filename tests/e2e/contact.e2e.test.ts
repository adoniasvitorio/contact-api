import request from 'supertest'
import { setupDatabase, teardownDatabase } from './setup'
import { MongoConnection } from '../../src/infra/db/mongo-client'
import { makeApp } from '../app-factory'

let app: any

beforeAll(async () => {
  await setupDatabase()
  await MongoConnection.connect()
  app = makeApp()
})

afterAll(async () => {
  await teardownDatabase()
  await MongoConnection.close()
})

describe('Contacts E2E', () => {
  let contactId: string

  it('should create a contact', async () => {
    const res = await request(app)
      .post('/contacts')
      .send({
        name: 'João Silva',
        birthDate: '1990-01-01',
        sex: 'M',
      })

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()

    contactId = res.body.id
  })

  it('should list contacts', async () => {
    const res = await request(app).get('/contacts')

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('should get contact by id', async () => {
    const res = await request(app).get(`/contacts/${contactId}`)

    expect(res.status).toBe(200)
  })

  it('should deactivate contact', async () => {
    const res = await request(app).patch(
      `/contacts/${contactId}/deactivate`
    )

    expect(res.status).toBe(204)
  })

  it('should delete contact', async () => {
    const res = await request(app).delete(`/contacts/${contactId}`)

    expect(res.status).toBe(204)
  })

  describe('Validation handling', () => {
    it('should not create a contact under 18 years old', async () => {
      const today = new Date()
      const birthDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate())
      
      const res = await request(app)
        .post('/contacts')
        .send({
          name: 'Minor Contact',
          birthDate: birthDate.toISOString().split('T')[0],
          sex: 'M',
        })
  
      expect(res.status).toBe(400)
      expect(res.body.error).toContain('maior de idade')
    })
  
    it('should not create a contact with negative age (future birth date)', async () => {
      const futureDate = new Date()
      futureDate.setFullYear(futureDate.getFullYear() + 1)
      
      const res = await request(app)
        .post('/contacts')
        .send({
          name: 'Negative Age Contact',
          birthDate: futureDate.toISOString().split('T')[0],
          sex: 'F',
        })
  
      expect(res.status).toBe(400)
      expect(res.body.error).toContain('futura')
    })
  
    it('should not create a contact with future birth date', async () => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      
      const res = await request(app)
        .post('/contacts')
        .send({
          name: 'Future Birth Date Contact',
          birthDate: tomorrow.toISOString().split('T')[0],
          sex: 'O',
        })
  
      expect(res.status).toBe(400)
      expect(res.body.error).toContain('futura')
    })

  })

  describe('Error handling', () => {
    it('should return 404 when getting a non-existent contact', async () => {
      const invalidId = '507f1f77bcf86cd799439011'
      
      const res = await request(app).get(`/contacts/${invalidId}`)

      expect(res.status).toBe(404)
      expect(res.body.error).toContain('não encontrado')
    })

    it('should return 404 when deactivating a non-existent contact', async () => {
      const invalidId = '507f1f77bcf86cd799439011'
      
      const res = await request(app).patch(`/contacts/${invalidId}/deactivate`)

      expect(res.status).toBe(404)
      expect(res.body.error).toContain('não encontrado')
    })

    it('should return 404 when deleting a non-existent contact', async () => {
      const invalidId = '507f1f77bcf86cd799439011'
      
      const res = await request(app).delete(`/contacts/${invalidId}`)

      expect(res.status).toBe(404)
      expect(res.body.error).toContain('não encontrado')
    })

    it('should return 404 when getting an inactive contact', async () => {
      const createRes = await request(app)
        .post('/contacts')
        .send({
          name: 'Contact to Deactivate',
          birthDate: '1990-01-01',
          sex: 'M',
        })

      const contactId = createRes.body.id

      await request(app).patch(`/contacts/${contactId}/deactivate`)

      const getRes = await request(app).get(`/contacts/${contactId}`)

      expect(getRes.status).toBe(404)
      expect(getRes.body.error).toContain('não encontrado ou inativo')
    })
  })
})