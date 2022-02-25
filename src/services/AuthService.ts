import { NextFunction, Request, Response } from "express";
import { UserInstance } from "../models/User";
import { IUserRepository } from "../repository/UserRepository";
import { successResponse } from "../utils/responses";
import { checkValidity, createAccessToken } from "../utils/helpers/auth";
import ApiError from "../errorHandler/ApiError";

class AuthService {
  userRepository: IUserRepository<UserInstance>;

  constructor(userRepository: IUserRepository<UserInstance>) {
    this.userRepository = userRepository;
  }

  signup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
      const prevUsers = await this.userRepository.findAll({
        where: {
          email
        }
      });

      if (prevUsers.length > 0)
        return next(new ApiError(422, "User with email already exists"));
      await this.userRepository.create({
        email,
        password,
        firstName,
        lastName,
        role
      } as UserInstance);

      return successResponse(res, 201, "User signup successful", {
        email,
        firstName,
        lastName,
        role
      });
    } catch (error) {
      return next(error);
    }
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email, password } = req.body;

    try {
      const user: UserInstance | null = await this.userRepository.findOne({
        attributes: ["id", "email", "password"],
        where: {
          email
        }
      });

      if (user === null) return next(new ApiError(422, "User not found"));

      if (!checkValidity(password, user.password))
        return next(new ApiError(401, "Invalid email or password"));

      const accessToken = createAccessToken(user.id);
      return successResponse(res, 200, "User login successful", {
        accessToken
      });
    } catch (error) {
      return next(error);
    }
  };
}

export default AuthService;
