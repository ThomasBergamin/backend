import { Model, STRING, UUID, UUIDV4 } from "sequelize";
import { Comment } from "./Comment";
import { Gif } from "./Gif";
import { db } from "./index";

export interface IUser extends Model {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const User = db.define<IUser>("user", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
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

User.hasMany(Gif);
Gif.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);
Gif.hasMany(Comment);
Comment.belongsTo(Gif);
