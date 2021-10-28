import { STRING } from "sequelize";
import { db } from "./index";

export const User = db.define("user", {
  username: STRING,
});
