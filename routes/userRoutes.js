const { register, login, getAllUsers, getUserById, updateRoleStatus, deleteUserById } = require('../controllers/userController')
const express = require('express')
const validate = require('../middlewares/validate')
const { userValidation } = require('../validators/user')
const userAuthentication = require('../middlewares/authentication')
const authorize = require('../middlewares/authorize')
const router = express.Router()

router.post('/register', validate(userValidation), register)
router.post('/login', login)
router.get('/users', userAuthentication, authorize('admin', 'manager'), getAllUsers)
router.get('/users/:id', userAuthentication, authorize('admin', 'user'), getUserById)
router.patch('/users/:id/:role', userAuthentication, authorize('admin'), updateRoleStatus)
router.delete('/users/:id', userAuthentication, authorize('admin'), deleteUserById)


module.exports = router