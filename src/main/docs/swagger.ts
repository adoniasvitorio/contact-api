import swaggerJSDoc from 'swagger-jsdoc'

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API de Lista de Contatos',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['src/main/docs/*.ts', 'src/main/routes/*.ts'],
});