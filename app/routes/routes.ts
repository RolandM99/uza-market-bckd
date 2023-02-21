import express from 'express';
const userController = require('../Controllers/userController')
const { signup, login, update } = userController
const userAuth = require('../Middleware/userAuth')

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup)

//login route
router.post('/login', login )

 // Update a Tutorial with id
 router.put("/:id", update);

module.exports = router