import { Request, Response } from 'express';
import { CategoryService } from '../services/categoryService';

const categoryService = new CategoryService();

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     description: Cria uma categoria com o nome especificado e um possível ID de categoria pai.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da categoria.
 *               parentId:
 *                 type: string
 *                 description: ID da categoria pai (opcional).
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 parentId:
 *                   type: string
 *       400:
 *         description: Erro ao criar a categoria.
 */
export const createCategory = (req: Request, res: Response) => {
  try {
    const { name, parentId } = req.body;
    const category = categoryService.createCategory(name, parentId);
    if (category) {
      res.status(201).json(category);
    } else {
      res.status(400).json({ message: "Erro ao criar a categoria." });
    }
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Erro desconhecido' });
  }
};

/**
 * @swagger
 * /api/categories/list:
 *   get:
 *     summary: Retorna todas as categorias
 *     description: Retorna uma lista de categorias. Se o parâmetro "parentId" for fornecido, retornará as categorias filhas dessa categoria pai.
 *     parameters:
 *       - name: parentId
 *         in: query
 *         description: ID da categoria pai para listar suas categorias filhas.
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de categorias.
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
 *                   parentId:
 *                     type: string
 *       404:
 *         description: Nenhuma categoria encontrada.
 */
export const getCategories = (req: Request, res: Response) => {
  const parentId = req.query.parentId as string | undefined;
  try {
    const categories = parentId 
      ? categoryService.getCategoriesByParentId(parentId) 
      : categoryService.getCategories();

    if (categories.length > 0) {
      res.status(200).json(categories);
    } else {
      res.status(404).json({ message: "Categorias não encontradas." });
    }
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Erro desconhecido' });
  }
};

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Deleta uma categoria
 *     description: Exclui a categoria com o ID especificado e todas as suas categorias filhas.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da categoria a ser excluída.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Categoria deletada com sucesso.
 *       400:
 *         description: ID da categoria inválido ou não fornecido.
 *       404:
 *         description: Categoria não encontrada.
 */
export const deleteCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID da categoria é obrigatório." });
  }
  try {
    // Alteração aqui para usar o método correto
    const category = categoryService.findCategoryById(id);  // Chama o método correto da service
    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada." });
    }

    categoryService.deleteCategory(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Erro desconhecido' });
  }
};
