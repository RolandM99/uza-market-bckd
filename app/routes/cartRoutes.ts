import express from 'express';
const userAuth = require('../Middleware/userAuth')
const cartController = require('../Controllers/cartController')

const { addToCart, removeFromCart, getCart } = cartController

const router = express.Router()

// Add a product to the cart
router.post('/cart/add/:userId/:productId', userAuth.isLoggedin, addToCart);
router.post('/cart/remove',  removeFromCart);
router.get('/cart', getCart);

module.exports = router