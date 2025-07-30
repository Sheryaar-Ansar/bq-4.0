const Joi = require('joi')
exports.validateProducts = Joi.object({
    name: Joi.string().min(3).required(),
    category: Joi.string().required(),
    brand: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().min(0).required(),
    rating: Joi.number().min(0).max(5).optional(),
    inStock: Joi.boolean().default(true).optional()
})