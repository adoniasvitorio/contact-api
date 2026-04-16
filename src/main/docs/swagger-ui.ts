import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger'

export const swaggerDocs = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerSpec);