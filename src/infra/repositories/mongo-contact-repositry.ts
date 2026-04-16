import { type ContactRepository } from '../../domain/repositories/contact-repository'
import { MongoConnection } from '../db/mongo-client'
import { ObjectId, Db } from 'mongodb'

export class MongoContactRepository implements ContactRepository {
  private collection = 'contacts'
  private db?: Db

  constructor(db?: Db) {
    this.db = db
  }

  private getDb(): Db {
    if (this.db) return this.db
    return MongoConnection.getDb()
  }

  async create(contact: any): Promise<any> {
    const db = this.getDb()

    const result = await db.collection(this.collection).insertOne({
      name: contact.data.name,
      birthDate: contact.data.birthDate,
      sex: contact.data.sex,
      active: contact.data.active,
    })

    return {
      id: result.insertedId.toString(),
      ...contact.data,
    }
  }

  async findAllActive(): Promise<any[]> {
    const db = this.getDb()

    const docs = await db
      .collection(this.collection)
      .find({ active: true })
      .toArray()

    return docs.map(this.map)
  }

  async findById(id: string): Promise<any | null> {
    const db = this.getDb()

    const doc = await db.collection(this.collection).findOne({
      _id: new ObjectId(id),
    })

    return doc ? this.map(doc) : null
  }

  async deactivate(id: string): Promise<void> {
    const db = this.getDb()

    await db.collection(this.collection).updateOne(
      { _id: new ObjectId(id) },
      { $set: { active: false } }
    )
  }

  async delete(id: string): Promise<void> {
    const db = this.getDb()

    await db.collection(this.collection).deleteOne({
      _id: new ObjectId(id),
    })
  }

  private map(doc: any) {
    return {
      id: doc._id.toString(),
      name: doc.name,
      birthDate: doc.birthDate,
      sex: doc.sex,
      active: doc.active,
    }
  }
}