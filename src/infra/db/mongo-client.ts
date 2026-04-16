import { MongoClient, Db } from 'mongodb'
import { env } from '../../config/env'

export class MongoConnection {
  private static client: MongoClient
  private static db: Db

  static async connect() {
    if (!this.client) {
      this.client = new MongoClient(env.mongoUrl)
      await this.client.connect()

      this.db = this.client.db(env.dbName)

      console.log('Mongo conectado')
    }
  }

  static getDb(): Db {
    if (!this.db) {
      throw new Error('Mongo não conectado')
    }

    return this.db
  }
}