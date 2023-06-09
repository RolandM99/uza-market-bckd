import express from 'express';
const userController = require('../Controllers/userController')
const productController = require('../Controllers/productController')

const { signup, login, update, forgotPassword, resetPassword } = userController
const { createProduct, getAllProducts, updateProduct, deleteProduct } = productController
const userAuth = require('../Middleware/userAuth')

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup)

//login route
router.post('/login', login )

 // Update a user with id
 router.put("/:id", update);

 // Forget and Reset Password
 router.post("/forget-password", forgotPassword);

 router.post("/reset-password/:token", resetPassword);

 // Create a new product
    router.post("/:id/products", userAuth.isVendor, createProduct);
    // Retrieve all products
    router.get("/:id/products/all", userAuth.isVendor,  getAllProducts);
    // Update a product with id
    router.put("/:id/products/:id", userAuth.isVendor,  updateProduct);
    // Delete a product with id
    router.delete("/:id/products/:id", userAuth.isVendor,  deleteProduct);

module.exports = router