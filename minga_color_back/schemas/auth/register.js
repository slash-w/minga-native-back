import joi from 'joi';

const userRegister = joi.object({
  email: joi.string()
    .required()
    .email({ minDomainSegments: 2 })
    .messages({
      'any.required': 'Email is required',
      'string.empty': 'Email is required',
      'string.email': 'Invalid email',
    }),
  photo: joi.string()
    .required()
    .uri()
    .messages({
      'any.required': 'Photo is required',
      'string.empty': 'Photo is required',
      'string.uri': 'Invalid photo URL',
    }),
  password: joi.string()
    .required()
    .min(8)
    .max(35)
    .alphanum()
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is required',
      'string.min': 'Password is too short',
      'string.max': 'Password is too long',
    }),
});

export default userRegister;