// src/models/category.ts
export default class CategoryModel {
  id: string;
  name: string;
  parentId?: string;  // O parentId é opcional
  isActive: boolean;
  children: CategoryModel[];

  // Corrigido: Garantindo que os parâmetros obrigatórios venham antes dos opcionais
  constructor(id: string, name: string, isActive: boolean, parentId?: string, children: CategoryModel[] = []) {
    if (!name || name.trim() === '') {
      throw new Error("O nome da categoria não pode ser vazio.");
    }

    this.id = id;
    this.name = name;
    this.isActive = isActive;
    this.parentId = parentId;
    this.children = children;
  }

  // Método para adicionar uma subcategoria (se necessário, dependendo da lógica do app)
  addChild(category: CategoryModel) {
    this.children.push(category);
  }

  // Método de utilidade para verificar se a categoria tem filhos
  hasChildren(): boolean {
    return this.children.length > 0;
  }
}
