const Joi = require("joi");

exports.productValidate = Joi.object({
    name: Joi.string().min(3).required(),
    brand: Joi.string().optional(),
    category: Joi.string().required(),
    description: Joi.string().optional(),
    price:Joi.number().min(0).required(),
    minRating: Joi.number().min(0).max(5).optional(),
    inStock:Joi.boolean().optional()
})