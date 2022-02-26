import UserModel, { UserInstance } from "../models/User";
import UserRepository from "../repository/UserRepository";
import AuthService from "../services/AuthService";
import FileModel, { FileInstance } from "../models/File";
import FileService from "../services/FileServices";
import FileRepository from "../repository/FileRepository";
import { ModelStatic } from "../repository/Repository";

const userRepository = new UserRepository(
  UserModel as ModelStatic<UserInstance>
);
const fileRepository = new FileRepository(
  FileModel as ModelStatic<FileInstance>
);

const authService = new AuthService(userRepository);
const fileService = new FileService(fileRepository);

export { authService, fileService };
