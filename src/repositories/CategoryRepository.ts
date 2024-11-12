import AWS from 'aws-sdk';

// Inicializando o DynamoDB DocumentClient
const dynamoDb = new AWS.DynamoDB.DocumentClient();

class CategoryRepository {
  // Nome da tabela no DynamoDB
  private tableName = 'Categories';

  // Criação de uma nova categoria
  async createCategory(id: string, name: string, parentId?: string) {
    const params = {
      TableName: this.tableName,
      Item: {
        id,
        name,
        parentId,
        createdAt: new Date().toISOString(),  // Data de criação
      },
    };

    try {
      await dynamoDb.put(params).promise();
      return { id, name, parentId };
    } catch (error) {
      console.error('Erro ao criar a categoria:', error);
      throw new Error('Erro ao criar a categoria');
    }
  }

  // Obter uma categoria por ID
  async getCategoryById(id: string) {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };

    try {
      const result = await dynamoDb.get(params).promise();
      return result.Item;
    } catch (error) {
      console.error('Erro ao obter a categoria:', error);
      throw new Error('Erro ao obter a categoria');
    }
  }

  // Obter todas as categorias (opcional com filtro por parentId)
  async getCategories(parentId?: string) {
    const params: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName,
    };

    if (parentId) {
      params.FilterExpression = 'parentId = :parentId';
      params.ExpressionAttributeValues = {
        ':parentId': parentId,
      };
    }

    try {
      const result = await dynamoDb.scan(params).promise();
      return result.Items;
    } catch (error) {
      console.error('Erro ao obter categorias:', error);
      throw new Error('Erro ao obter categorias');
    }
  }

  // Deletar uma categoria
  async deleteCategory(id: string) {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };

    try {
      await dynamoDb.delete(params).promise();
      return { message: 'Categoria deletada com sucesso' };
    } catch (error) {
      console.error('Erro ao deletar a categoria:', error);
      throw new Error('Erro ao deletar a categoria');
    }
  }
}

export default CategoryRepository;
