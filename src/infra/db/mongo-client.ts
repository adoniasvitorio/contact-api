import { MongoClient, Db } from 'mongodb'
import { env } from '../../config/env'

export class MongoConnection {
  private static client: MongoClient | null = null
  private static db: Db | null = null

  static async connect(uri?: string, dbName?: string): Promise<void> {
    if (this.client && this.db) return

    const mongoUri = uri ?? env.mongoUrl
    const database = dbName ?? env.dbName

    this.client = new MongoClient(mongoUri)

    await this.client.connect()

    this.db = this.client.db(database)

    console.log('Mongo conectado')
  }

  static getDb(): Db {
    if (!this.db) {
      throw new Error('Mongo não conectado')
    }

    return this.db
  }

  static async close(): Promise<void> {
    await this.client?.close()
    this.client = null
    this.db = null
  }

  static isConnected(): boolean {
    return !!this.client && !!this.db
  }
}