import { Comment } from "./Comment";
import { Gif } from "./Gif";
import { User } from "./User";

export const defineRelationships = () => {
  User.hasMany(Gif);
  Gif.belongsTo(User);

  User.hasMany(Comment);
  Comment.belongsTo(User);

  Gif.hasMany(Comment);
  Comment.belongsTo(Gif);
};
