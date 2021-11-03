import { ARRAY, Model, STRING, UUID, UUIDV4 } from "sequelize";
import { db } from "./index";

export interface IComment extends Model {
  id: string;
  authorId: string;
  gifId: string;
  content: string;
  upvotes: string[];
  downvotes: string[];
}

export const Comment = db.define<IComment>("comment", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  authorId: {
    field: "author_id",
    type: STRING,
    allowNull: false,
  },
  gifId: {
    field: "gif_id",
    type: STRING,
    allowNull: false,
  },
  content: {
    type: STRING,
    allowNull: false,
  },
  upvotes: {
    type: ARRAY,
    allowNull: true,
  },
  downvotes: {
    type: ARRAY,
    allowNull: true,
  },
});
