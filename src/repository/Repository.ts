import { FindOptions, Model, BuildOptions } from "sequelize";

export interface IRepository<T> {
  findAll(filter: FindOptions<T>): Promise<T[]>;
}

export type ModelStatic<DataType> = typeof Model &
  (new (values?: DataType, options?: BuildOptions) => Model);

class Repository<DataType> {
  model: ModelStatic<DataType>;
  constructor(model: ModelStatic<DataType>) {
    this.model = model;
  }

  findAll = async (filter: FindOptions<DataType>): Promise<any> => {
    const data = await this.model.findAll(filter);
    return data;
  };
}

export default Repository;
