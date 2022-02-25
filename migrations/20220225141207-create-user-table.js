"use strict";
import { DataTypes, DATE } from "sequelize";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("users", {
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
      createdAt: DATE,
      updatedAt: DATE
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("users");
  }
};
