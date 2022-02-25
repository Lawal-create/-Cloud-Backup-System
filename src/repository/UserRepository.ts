import { UserInstance } from "../models/User";
import Repository, { IRepository } from "./Repository";
import { generateHashedValue } from "../utils/helpers/auth";

export interface IUserRepository<UserInstance>
  extends IRepository<UserInstance> {
  create(data: UserInstance): Promise<any>;
}

class UserRepository extends Repository<UserInstance> {
  create = async (data: UserInstance): Promise<any> => {
    const { firstName, lastName, email, password, role } = data;

    const user = await this.model.create({
      firstName,
      lastName,
      password: generateHashedValue(password),
      email,
      role
    });
    return user;
  };
}

export default UserRepository;
