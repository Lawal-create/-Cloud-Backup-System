import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database/connect";
import UserModel from "./User";

interface FileAttributes {
  id: number;
  filename: string;
  key: string;
  location: string;
  status: "safe" | "unsafe";
  userId: number;
}

export interface FileCreationAttributes
  extends Optional<FileAttributes, "id"> {}

export interface FileInstance
  extends Model<FileAttributes, FileCreationAttributes>,
    FileAttributes {}

const FileModel = sequelize.define<FileInstance>("Files", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  filename: {
    type: DataTypes.STRING(64),
    allowNull: false,
    validate: {
      len: {
        args: [2, 64],
        msg: "File name length must be between 2 and 64 characters"
      }
    }
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  location: { type: DataTypes.STRING, allowNull: false },
  status: {
    type: DataTypes.ENUM,
    values: ["safe", "unsafe"],
    defaultValue: "safe"
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

//file and user association
UserModel.hasMany(FileModel, { foreignKey: "userId" });
FileModel.belongsTo(UserModel, { foreignKey: "userId" });
export default FileModel;
