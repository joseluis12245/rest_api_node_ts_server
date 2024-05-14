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

router.patch("/:id", 
param("id").isInt().withMessage("Id not valid"),
handleInputErrors,
updateAvailability);

router.delete("/:id", param("id").isInt().withMessage("Id not valid"),
handleInputErrors,
deleteProduct);

export default router;
