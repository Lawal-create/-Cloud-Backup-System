import { FileInstance } from "../models/File";
import Repository, { IRepository } from "./Repository";
import { FileQuery } from "../models/File";

export interface IAdminRepository<FileInstance>
  extends IRepository<FileInstance> {
  update(data: FileQuery): Promise<any>;
}

class AdminRepository extends Repository<FileInstance> {
  update = async (data: FileQuery): Promise<any> => {
    const { keys } = data;
    const file = await this.model.update(
      { status: "unsafe" },
      { where: { key: keys as string[] } }
    );
    return file;
  };
}

export default AdminRepository;
