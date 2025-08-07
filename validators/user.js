const Joi = require('joi')
const allowedRoles = require('../constant/role') 

exports.userValidation = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid(...allowedRoles).optional()
})