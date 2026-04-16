import { Router } from 'express'
import { makeContainer } from '../container'
import { asyncHandler } from '../utils/async-handler'

const router = Router()
const container = makeContainer()

/**
 * @openapi
 * /contacts:
 *   post:
 *     tags:
 *       - Contacts
 *     summary: Criar contato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthDate
 *               - sex
 *             properties:
 *               name:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 example: 1990-01-01
 *               sex:
 *                 type: string
 *                 enum: [M, F, O]
 *     responses:
 *       200:
 *         description: Contato criado
 */

router.post('/', asyncHandler(async (req, res) => {
    const result = await container.createContact.execute(req.body)
    res.json(result)
}))

/**
 * @openapi
 * /contacts:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Listar contatos ativos
 *     responses:
 *       200:
 *         description: Lista de contatos
 */
router.get('/', asyncHandler(async (_, res) => {
    const result = await container.listContact.execute()
    res.json(result)
}))

/**
 * @openapi
 * /contacts/{id}:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Buscar contato por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contato encontrado
 */
router.get('/:id', asyncHandler(async (req, res) => {
    const result = await container.getContact.execute(req.params.id)
    res.json(result)
}))

/**
 * @openapi
 * /contacts/{id}/deactivate:
 *   patch:
 *     tags:
 *       - Contacts
 *     summary: Desativar um contato
 *     description: Marca o contato como inativo (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contato
 *     responses:
 *       204:
 *         description: Contato desativado com sucesso
 *       404:
 *         description: Contato não encontrado
 */
router.patch('/:id/deactivate', asyncHandler(async (req, res) => {
    await container.deactivateContact.execute(req.params.id)
    res.sendStatus(204)
}))

/**
 * @openapi
 * /contacts/{id}:
 *   delete:
 *     tags:
 *       - Contacts
 *     summary: Excluir contato
 *     description: Remove permanentemente o contato do banco de dados
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contato
 *     responses:
 *       204:
 *         description: Contato removido com sucesso
 *       404:
 *         description: Contato não encontrado
 */
router.delete('/:id', asyncHandler(async (req, res) => {
    await container.deleteContact.execute(req.params.id)
    res.sendStatus(204)
}))

export default router