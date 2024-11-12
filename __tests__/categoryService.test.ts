import { CategoryService } from '../src/services/categoryService';

describe('CategoryService Tests', () => {
  let categoryService: CategoryService;

  beforeEach(() => {
    categoryService = new CategoryService();
  });

  it('should add a new category', () => {
    const categoryName = 'Electronics';
    const result = categoryService.createCategory(categoryName, undefined);  // Alterado para createCategory
    expect(result.name).toBe(categoryName);
    expect(result.isActive).toBe(true); // alterado para `isActive`
  });

  it('should not add a category with the same name under the same parent', () => {
    const categoryName = 'Books';
    categoryService.createCategory(categoryName, undefined);  // Alterado para createCategory
    expect(() => categoryService.createCategory(categoryName, undefined)).toThrow(  // Alterado para createCategory
      "Não é permitido ter categorias com o mesmo nome para o mesmo pai."
    );
  });

  it('should find a category by ID', () => {
    const categoryName = 'Clothing';
    const category = categoryService.createCategory(categoryName, undefined);  // Alterado para createCategory
    const foundCategory = categoryService.findCategoryById(category.id);
    expect(foundCategory?.name).toBe(categoryName);
  });

  it('should delete a category by ID', () => {
    const categoryName = 'Toys';
    const category = categoryService.createCategory(categoryName, undefined);  // Alterado para createCategory
    categoryService.deleteCategory(category.id);
    const foundCategory = categoryService.findCategoryById(category.id);
    expect(foundCategory).toBeUndefined();
  });

  it('should return children categories for a parent category', () => {
    const parentCategoryName = 'Music';
    const parentCategory = categoryService.createCategory(parentCategoryName, undefined);  // Alterado para createCategory
    const childCategoryName = 'Instruments';
    const childCategory = categoryService.createCategory(childCategoryName, parentCategory.id);  // Alterado para createCategory
    const children = categoryService.getCategoriesByParentId(parentCategory.id);
    expect(children).toContainEqual(expect.objectContaining({ name: childCategoryName }));
  });
});
