import { Router } from 'express'
import contactRoutes from './contact-routes'
import healthRoutes from './health'

const router = Router()

router.use('/contacts', contactRoutes)
router.use('/health', healthRoutes)

export default router