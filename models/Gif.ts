import { ARRAY, UUID, UUIDV4, Model, STRING } from "sequelize";
import { Comment, IComment } from "./Comment";
import { db } from "./index";

export interface IGif extends Model {
  id: string;
  userId: string;
  title: string;
  url: string;
  comments?: IComment[];
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
});
