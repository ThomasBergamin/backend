import { ARRAY, Model, STRING } from "sequelize";
import { db } from "./index";

export interface IGif extends Model {
  id: string;
  authorId: string;
  title: string;
  url: string;
  comments?: string[];
}

export const Gif = db.define<IGif>("gif", {
  authorId: {
    field: "author_id",
    type: STRING,
    allowNull: false,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  url: {
    type: STRING,
    allowNull: false,
  },
  comment: {
    type: ARRAY(STRING),
    allowNull: true,
  },
});
