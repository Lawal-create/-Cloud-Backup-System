import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database/connect";

interface UserAttributes {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const UserModel = sequelize.define<UserInstance>("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM,
    values: ["user", "admin"],
    defaultValue: "user"
  }
});

export default UserModel;
