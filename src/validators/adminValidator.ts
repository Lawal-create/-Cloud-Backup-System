import Joi from "joi";

const keys = Joi.array().items(Joi.string()).required().messages({
  "any.required": "keys are required"
});

export const adminValidator = Joi.object({ keys });
