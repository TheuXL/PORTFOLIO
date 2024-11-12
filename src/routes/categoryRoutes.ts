import { Router, Request, Response } from 'express';
import { createCategory, getCategories, deleteCategory } from '../controllers/categoryController';

const router = Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Lista todas as categorias
 *     description: Retorna uma lista de todas as categorias disponíveis na plataforma.
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Listagem de categorias"
 */
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Listagem de categorias' });
});

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     description: Cria uma nova categoria, fornecendo o nome e outras informações necessárias.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da categoria
 *                 example: "Categoria Exemplo"
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *       400:
 *         description: Solicitação inválida, dados não fornecidos corretamente.
 */
router.post('/', (req: Request, res: Response) => {
  createCategory(req, res);
});

/**
 * @swagger
 * /api/categories/list:
 *   get:
 *     summary: Retorna uma lista de todas as categorias
 *     description: Recupera a lista completa de categorias cadastradas no sistema.
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *       404:
 *         description: Nenhuma categoria encontrada
 */
router.get('/list', (req: Request, res: Response) => {
  getCategories(req, res);
});

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Deleta uma categoria
 *     description: Remove uma categoria pelo ID, incluindo suas categorias filhas.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria a ser deletada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoria deletada com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
router.delete('/:id', (req: Request, res: Response) => {
  deleteCategory(req, res);
});

export default router;
