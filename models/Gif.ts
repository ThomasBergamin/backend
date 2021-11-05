import { ARRAY, UUID, UUIDV4, Model, STRING } from "sequelize";
import { db } from "./index";
import { User } from "./User";

export interface IGif extends Model {
  id: string;
  authorId: string;
  title: string;
  url: string;
  comments?: string[];
}

export const Gif = db.define<IGif>("gif", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
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
