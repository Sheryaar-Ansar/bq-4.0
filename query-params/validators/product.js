const Joi = require('joi')

exports.validateProduct = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().optional(),
    category: Joi.string().required(),
    brand: Joi.string().optional(),
    price: Joi.number().min(0).required(),
    inStock: Joi.boolean().optional(),
    rating: Joi.number().min(0).max(5).optional()
})