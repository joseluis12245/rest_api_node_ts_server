import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties: 
 *          id:
 *              type: integer
 *              description: The Product ID
 *              example: 1
 *          name:
 *              type: string
 *              description: The Product name
 *              example: Monitor 49 inch
 *          price:
 *              type: number
 *              description: The Product price
 *              example: 300
 *          availability:
 *              type: boolean
 *              description: The Product availability
 *              example: true
 */

/**
 * @swagger
 * /api/products:
 *        get:
 *            summary: Get a list of products
 *            tags:
 *                  - Products
 *            description: Return a list of products
 *            responses:       
 *                  200:
 *                      description: Successful response
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  type: array
 *                                  items: 
 *                                       $ref: '#/components/schemas/Product'
 */

router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get: 
 *      summary: Get a product by ID
 *      tags: 
 *           - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *          - int: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema:
 *                  type: integer
 *      responses:
 *            200: 
 *                description: Successful Response
 *                content:
 *                     application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Product'
 *            404:
 *                description: Not found
 *            400:
 *                description: Bad Request - Invalid ID
 * 
 */

router.get(
  "/:id",
  param("id").isInt().withMessage("Id not valid"),
  handleInputErrors,
  getProductById
);

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *           - Products
 *      description: Return a new record in the database
 *      requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                               type: string
 *                               example: Monitor Curved 49 inch
 *                          price:
 *                               type: number
 *                               example: 399
 *      responses:
 *                  201:
 *                    description: Successful response
 *                    content:
 *                        application/json:
 *                            schema:
 *                                $ref: '#/components/schemas/Product'
 *                  400:
 *                      description: Bad Request - invalid input data
 * 
 * 
 */

router.post(
  "/",

  //Validation
  body("name").notEmpty().withMessage("This name cant be empty"),
  body("price")
    .isNumeric()
    .withMessage("Value is not valid")
    .notEmpty()
    .withMessage("This name cant be empty")
    .custom((value) => value > 0)
    .withMessage("Price is not valid"),
  handleInputErrors,
  createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *           - Products
 *      description: Returns the updated product
 *      parameters:
 *          - int: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema:
 *                  type: integer
 *      requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                               type: string
 *                               example: Monitor Curved 49 inch
 *                          price:
 *                               type: number
 *                               example: 399
 *                          availability:
 *                               type: boolean
 *                               example: true
 *      responses:
 *            200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *            400:
 *              description: Bad Request - Invalid ID or Invalid input data
 *            404:
 *              description: Product not found
 * 
 */

router.put("/:id", 
param("id").isInt().withMessage("Id not valid"),
body("name").notEmpty().withMessage("This name cant be empty"),
body("price")
  .notEmpty()
  .isNumeric()
  .withMessage("Value is not valid")
  .notEmpty()
  .withMessage("This name cant be empty")
  .custom((value) => value > 0)
  .withMessage("Price is not valid"),
  body('availability').isBoolean().withMessage('Value for availability not valid'),
  handleInputErrors,
  updateProduct);

/**
  * @swagger
  * /api/products/{id}:
  *   patch:
  *       summary: Update Product availability
  *       tags:
  *           - Products
  *       description: Returns the updated availability
  *       parameters:
  *          - int: path
  *            name: id
  *            description: The ID of the product to retrieve
  *            required: true
  *            schema:
  *                  type: integer
  *       responses:
  *            200:
  *              description: Successful response
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Product'
  *            400:
  *              description: Bad Request - Invalid ID
  *            404:
  *              description: Product not found
  * 
  * 
*/

router.patch("/:id", 
param("id").isInt().withMessage("Id not valid"),
handleInputErrors,
updateAvailability);

/**
  * @swagger
  * /api/products/{id}:
  *   delete:
  *       summary: Deletes a product by a given ID
  *       tags:
  *           - Products
  *       description: Returns a confirmation message
  *       parameters:
  *          - int: path
  *            name: id
  *            description: The ID of the product to delete
  *            required: true
  *            schema:
  *                  type: integer
  *       responses:
  *            200:
  *              description: Successful response
  *              content:
  *                  application/json:
  *                      schema:
  *                          type: string
  *                          value: 'Product deleted'
  *            400:
  *              description: Bad Request - Invalid ID
  *            404:
  *              description: Product not found
  * 
  * 
*/
router.delete("/:id", param("id").isInt().withMessage("Id not valid"),
handleInputErrors,
deleteProduct);

export default router;
