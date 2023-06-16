import express from 'express';
const userAuth = require('../Middleware/userAuth')
const userController = require('../Controllers/userController')
const productController = require('../Controllers/productController')
const orderController = require('../Controllers/orderController')

const { signup, login, update, forgotPassword, resetPassword } = userController
const { createProduct, getAllProducts, updateProduct, deleteProduct } = productController
const { placeOrder, getUsersOrders } = orderController

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
    router.get("/:id/products/all", userAuth.isLoggedin, getAllProducts);
    // Update a product with id
    router.put("/:id/products/:id", userAuth.isVendor,  updateProduct);
    // Delete a product with id
    router.delete("/:id/products/:id", userAuth.isVendor,  deleteProduct);

// routes for orders
router.post("/:id/orders", userAuth.isLoggedin, placeOrder);
router.get("/:id/orders/all", getUsersOrders);

module.exports = router