import { Router } from 'express'
import { body } from 'express-validator'
import { createProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

//Routing 
router.get('/', (req, res) => {
    res.send('From get')
})

router.post('/', 

 //Validation
 body("name")
 .notEmpty()
 .withMessage("This name cant be empty"),
 body("price")
 .notEmpty()
 .isNumeric()
 .withMessage('Value is not valid')
 .notEmpty()
 .withMessage("This name cant be empty")
 .custom(value => value > 0)
 .withMessage("Price is not valid"),
 handleInputErrors,
createProduct)

router.put('/', (req, res) => {
    res.send('From put')
})

router.patch('/', (req, res) => {
    res.send('From patch')
})

router.delete('/', (req, res) => {
    res.send('From delete')
})



export default router