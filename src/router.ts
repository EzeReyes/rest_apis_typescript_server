import { Router } from 'express'
import { createProduct, getCategories, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from './handlers/product';
import {body, param} from 'express-validator'
import  {handleInputErrors} from './middleware/index';

const router = Router();

/**
 * @swagger
 * components:
 *        schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product Name
 *                      example: Monitor Curvo
 *                  img:
 *                      type: string
 *                      description: The Product Image
 *                      example: http://www.example.com
 *                  cost:
 *                      type: number
 *                      description: The Product Cost
 *                      example: 100
 *                  price:
 *                      type: number
 *                      description: The Product Price
 *                      example: 300
 *                  stock: 
 *                      type: number
 *                      description: The Product Stock
 *                      example: 10
 *                  availbility: 
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 *                  category: 
 *                      type: CategoryType
 *                      description: The Product Category
 *                      example: SMARTWATCH
 */


/**
 * @swagger
 * /api/products:
 *      get: 
 *          summary: Obtiene una lista de Productos - Get a list of products 
 *          tags: 
 *               - Products
 *          description: Return a list a products
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content: 
 *                      aplication/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 */

// Routing
router.get('/', getProducts)

router.get('/categories/list', getCategories)



/**
 * @swagger
 * /api/products/{id}:
 *      get: 
 *          summary: Obtiene un Producto especifico - Get a product by ID 
 *          tags: 
 *               - Products
 *          description: Return a product based on its unique ID
 *          parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content: 
 *                      aplication/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *               description: Bad Request - Invalid ID 
 */



router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductById)

/**
/**
 * @swagger 
 * /api/products:
 *   post: 
 *     summary: Crea un Producto - create a product 
 *     tags: 
 *       - Products
 *     description: Create a product 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string 
 *                 example: Monitor Curvo
 *                 description: The name of the product 
 *               price:
 *                 type: number
 *                 example: 100
 *                 description: The price of the product 
 *             required: 
 *               - name
 *               - price
 *     responses: 
 *       201:
 *           description: Successful response
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid input data 
 */

router.post('/', 
    
    // Validación
        body('name')
                .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
        body('price')
                .isNumeric().withMessage('Valor no valido')
                .notEmpty().withMessage('El precio del Producto no puede ir vacio')
                .custom( value => value > 0 ).withMessage('Precio no valido'),
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags: 
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema: 
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string 
 *                              example: Monitor Curvo
 *                              description: The name of the product 
 *                          price:
 *                              type: number
 *                              example: 100
 *                              description: The price of the product
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 *          404:
 *              description: Product Not Found    
 */

router.put('/:id', 
        param('id').isInt().withMessage('ID no válido'),
        body('name')
                .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
        body('price')
                .isNumeric().withMessage('Valor no valido')
                .notEmpty().withMessage('El precio del Producto no puede ir vacio')
                .custom( value => value > 0 ).withMessage('Precio no valido'),
        body('availability')
            .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema: 
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID 
 *          404:
 *              description: Product Not Found   
 */

router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability
)

// Reto 08
// Documentar el endpoint de Delete, para esto deberás actualizar el request a DELETE y la respuesta 200 para que sea un string en el Schema


/** 
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete a Product
 *      tags:
 *          - Products
 *      description: Delete a the updated
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema: 
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *                          $ref: 'Eliminado correctamente'
 *          400:
 *              description: Bad Request - Invalid ID 
 *          404:
 *              description: Product Not Found   
 */

router.delete('/:id',     
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
)



export default router