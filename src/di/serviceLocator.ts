import UserModel, { UserInstance } from "../models/User";
import UserRepository from "../repository/UserRepository";
import AuthService from "../services/AuthService";
import { ModelStatic } from "../repository/Repository";

const userRepository = new UserRepository(
  UserModel as ModelStatic<UserInstance>
);

const authService = new AuthService(userRepository);

export { userRepository, authService };
