import Joi from "joi";

const comments = Joi.object({
    text: Joi.string()
        .required()
        .min(1)
        .max(255)
        .messages({
            'string.base': 'The field must be a text string',
            'string.empty': 'The field cannot be empty',
            'string.min': 'The field must have at least 1 character',
            'string.max': 'The field cannot be longer than 255 characters',
            'any.required': 'The field is required'
        })

})

export default comments