const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GreenWorm API Documentation',
      version: '1.0.0',
      description: 'API documentation for GreenWorm e-commerce application',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password', 'role'],
          properties: {
            id: { type: 'string', description: 'The auto-generated id of the user' },
            name: { type: 'string', description: 'The name of the user' },
            email: { type: 'string', format: 'email', description: 'The email of the user' },
            password: { type: 'string', description: 'The password of the user' },
            role: { type: 'string', description: 'The role of the user (user/admin)' },
            cart: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: { type: 'string' },
                  quantity: { type: 'number' }
                }
              }
            }
          }
        },
        Product: {
          type: 'object',
          required: ['name', 'description', 'price', 'category', 'stock'],
          properties: {
            id: { type: 'string', description: 'The auto-generated id of the product' },
            name: { type: 'string', description: 'The name of the product' },
            description: { type: 'string', description: 'The description of the product' },
            price: { type: 'number', description: 'The price of the product' },
            images: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  data: { type: 'string', format: 'binary' },
                  contentType: { type: 'string' },
                  filename: { type: 'string' }
                }
              },
              description: 'Array of product images'
            },
            dftImage: {
              type: 'object',
              description: 'Default image for the product',
              properties: {
                data: { type: 'string', format: 'binary' },
                contentType: { type: 'string' },
                filename: { type: 'string' }
              }
            },
            category: { 
              type: 'string', 
              enum: ['men', 'women', 'kids', 'accessories'],
              description: 'Product category'
            },
            stock: { type: 'number', description: 'Available stock quantity' },
            size: { type: 'string', description: 'Product size' },
            color: { type: 'string', description: 'Product color' },
            brand: { type: 'string', description: 'Product brand' },
            material: { type: 'string', description: 'Product material' },
            tags: { 
              type: 'array',
              items: { type: 'string' },
              description: 'Product tags'
            }
          }
        },
        CartItem: {
          type: 'object',
          properties: {
            product: { $ref: '#/components/schemas/Product' },
            quantity: { 
              type: 'number',
              description: 'Quantity of the product'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);
module.exports = specs;