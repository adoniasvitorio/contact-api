import { MongoConnection } from '../infra/db/mongo-client'
import { createApp } from './app'

async function bootstrap() {
    await MongoConnection.connect()

    const app = createApp()
    const port = process.env.PORT || 3000

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
}

bootstrap()