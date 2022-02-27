import { FileInstance } from "../models/File";
import Repository, { IRepository } from "./Repository";
import { UpdateOptions } from "sequelize";

export interface IAdminRepository<FileInstance>
  extends IRepository<FileInstance> {
  update(data: FileInstance, updates: UpdateOptions): Promise<any>;
}

class AdminRepository extends Repository<FileInstance> {
  //Update Files
  update = async (data: FileInstance, updates: UpdateOptions): Promise<any> => {
    const file = await this.model.update(data, updates);
    return file;
  };
}

export default AdminRepository;
