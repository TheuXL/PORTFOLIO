import CategoryModel from '../models/category';

export class CategoryService {
  private categories: CategoryModel[] = [];

  /**
   * Criação de categoria com validação de nome duplicado e limite de 20 filhos.
   * @param name - Nome da categoria a ser criada.
   * @param parentId - ID da categoria pai (opcional).
   * @returns A nova categoria criada.
   * @throws Error - Se o nome da categoria já existir ou se o pai já tiver 20 filhos.
   */
  createCategory(name: string, parentId: string | undefined): CategoryModel {
    const parentCategory = parentId ? this.findCategoryById(parentId) : undefined;

    // Verifica se o nome da categoria já existe entre as categorias filhas do mesmo pai
    if (parentCategory && parentCategory.children?.some((child) => child.name === name)) {
      throw new Error("Não é permitido ter categorias com o mesmo nome para o mesmo pai.");
    }

    // Verifica se o pai tem mais de 20 filhos
    if (parentCategory && (parentCategory.children?.length ?? 0) >= 20) {
      throw new Error("Uma categoria pai não pode ter mais de 20 filhas.");
    }

    // Cria a nova categoria com um ID gerado aleatoriamente
    const category = new CategoryModel(
      Math.random().toString(36).substr(2, 9), // Gera um ID aleatório para a categoria
      name,
      true
    );

    // Se for uma categoria pai, adiciona a categoria criada à lista de filhos
    if (parentCategory) {
      parentCategory.children = parentCategory.children || []; // Garante que o array de filhos não seja undefined
      parentCategory.children.push(category);
    }

    // Adiciona a nova categoria à lista geral de categorias
    this.categories.push(category);
    return category;
  }

  /**
   * Retorna uma categoria pelo ID.
   * @param id - ID da categoria.
   * @returns A categoria correspondente ao ID fornecido ou undefined se não encontrada.
   */
  findCategoryById(id: string): CategoryModel | undefined {
    return this.categories.find(category => category.id === id);
  }

  /**
   * Retorna as categorias filhas de uma categoria pai.
   * @param parentId - ID da categoria pai.
   * @returns Lista de categorias filhas da categoria pai.
   */
  getCategoriesByParentId(parentId: string): CategoryModel[] {
    const parentCategory = this.findCategoryById(parentId);
    return parentCategory ? parentCategory.children || [] : [];
  }

  /**
   * Retorna todas as categorias.
   * @returns Lista de todas as categorias.
   */
  getCategories(): CategoryModel[] {
    return this.categories;
  }

  /**
   * Deleta uma categoria e todas as suas categorias filhas.
   * @param id - ID da categoria a ser deletada.
   */
  deleteCategory(id: string): void {
    const category = this.findCategoryById(id);
    if (!category) {
      throw new Error("Categoria não encontrada");
    }

    // Filtra a categoria e todas as suas filhas
    this.categories = this.categories.filter(cat => !this.isDescendant(id, cat));

    // Se a categoria a ser deletada for um pai, remova-a da lista de filhos do pai
    const parentCategory = category.parentId ? this.findCategoryById(category.parentId) : undefined;
    if (parentCategory) {
      parentCategory.children = parentCategory.children?.filter(child => child.id !== id);
    }
  }

  /**
   * Verifica se uma categoria é filha de outra.
   * @param parentId - ID da categoria pai.
   * @param category - Categoria que será verificada.
   * @returns true se a categoria for filha da categoria pai, caso contrário false.
   */
  private isDescendant(parentId: string, category: CategoryModel): boolean {
    // Verifica se a categoria tem o mesmo parentId ou se é filha de alguma categoria
    return (
      category.parentId === parentId ||
      (category.children && category.children.some((child) => this.isDescendant(parentId, child)))
    );
  }
}