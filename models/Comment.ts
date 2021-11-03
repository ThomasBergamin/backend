import { ARRAY, STRING } from "sequelize";
import { db } from "./index";

export interface IComment {
  id: string;
  authorId: string;
  gifId: string;
  content: string;
  upvotes: string[];
  downvotes: string[];
}

export const Comment = db.define("comment", {
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
