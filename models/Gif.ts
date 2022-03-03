import { ARRAY, UUID, UUIDV4, Model, STRING, BOOLEAN } from "sequelize";
import { Comment, IComment } from "./Comment";
import { db } from "./index";

export interface IGif extends Model {
  id: string;
  userId: string;
  title: string;
  url: string;
  isAFile: boolean;
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
  isAFile: {
    type: BOOLEAN,
    allowNull: false,
  },
});
