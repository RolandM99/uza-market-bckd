import express from 'express';
const userController = require('../Controllers/userController')
const { signup, login, update, forgotPassword, resetPassword } = userController
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

module.exports = router