import express from 'express'
import routes from './routes'
import { errorHandler } from './middlewares/error-handler'
import { swaggerDocs, swaggerSetup } from './docs/swagger-ui'

export function createApp() {
    const app = express()

    app.use(express.json())
    app.use("/docs", swaggerDocs, swaggerSetup);
    app.use(routes)
    app.use(errorHandler)

    return app
}