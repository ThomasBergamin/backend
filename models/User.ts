import { STRING } from "sequelize";
import { db } from "./index";

export interface IUser {
  username: string;
  email: string;
}

export const User = db.define("user", {
  firstName: {
    field: "first_name",
    type: STRING,
    allowNull: false,
  },
  lastName: {
    field: "last_name",
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    validate: {
      isEmail: true,
      min: 4,
    },
    unique: true,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      min: 6,
    },
  },
});
