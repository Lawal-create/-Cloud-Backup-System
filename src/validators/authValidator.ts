import Joi from "joi";
import { email, role, firstName, lastName, password } from "./globalSchemas";

export const signupValidator = Joi.object({
  email,
  firstName,
  lastName,
  password,
  role
});

export const loginValidator = Joi.object({
  email,
  password
});
