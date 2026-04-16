import { Router } from 'express'
import { makeContainer } from '../container'
import { asyncHandler } from '../utils/async-handler'

const router = Router()
const container = makeContainer()

router.post('/', asyncHandler(async (req, res) => {
    const result = await container.createContact.execute(req.body)
    res.json(result)
}))

router.get('/', asyncHandler(async (_, res) => {
    const result = await container.listContact.execute()
    res.json(result)
}))

router.get('/:id', asyncHandler(async (req, res) => {
    const result = await container.getContact.execute(req.params.id)
    res.json(result)
}))

router.patch('/:id/deactivate', asyncHandler(async (req, res) => {
    await container.deactivateContact.execute(req.params.id)
    res.sendStatus(204)
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    await container.deleteContact.execute(req.params.id)
    res.sendStatus(204)
}))

export default router