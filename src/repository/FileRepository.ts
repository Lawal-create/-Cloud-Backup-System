import { FileInstance, FileCreationAttributes } from "../models/File";
import Repository, { IRepository } from "./Repository";

export interface IFileRepository<FileInstance>
  extends IRepository<FileInstance> {
  create(data: FileInstance): Promise<any>;
  bulkCreate(data: FileInstance[]): Promise<any>;
}

class FileRepository extends Repository<FileInstance> {
  create = async (data: FileInstance): Promise<any> => {
    const { location, key, filename, userId } = data;
    const file = await this.model.create({
      location: location,
      key: key,
      filename: filename,
      userId: userId
    });
    return file;
  };

  bulkCreate = async (data: FileInstance[]): Promise<any> => {
    const file = await this.model.bulkCreate(data as FileCreationAttributes[]);
    return file;
  };
}

export default FileRepository;
