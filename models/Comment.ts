import { Model, STRING, UUID, UUIDV4 } from "sequelize";
import { db } from "./index";

export interface IComment extends Model {
  id: string;
  userId: string;
  gifId: string;
  content: string;
}

export const Comment = db.define<IComment>("comment", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  content: {
    type: STRING,
    allowNull: false,
  },
});
