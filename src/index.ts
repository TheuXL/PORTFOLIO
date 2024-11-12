import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import categoryRoutes from './routes/categoryRoutes';

// Configuração do Express
const app = express();
const port = 3000;  // Defina a porta local

app.use(express.json());

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Category API',
      version: '1.0.0',
      description: 'API para gerenciar categorias de produtos',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configuração das rotas
app.use('/api/categories', categoryRoutes);

// Rodando o servidor localmente
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});