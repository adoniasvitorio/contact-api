import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient } from 'mongodb'

let mongo: MongoMemoryServer
let client: MongoClient

export let db: any

export async function setupE2E() {
  mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()

  client = new MongoClient(uri)
  await client.connect()

  db = client.db('test_db')

  const { MongoConnection } = require('../../src/infra/db/mongo-client')
  MongoConnection['db'] = db
}

export async function teardownE2E() {
  await client.close()
  await mongo.stop()
}