import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Comment } from "../models/Comment";
import { Gif } from "../models/Gif";
import { User } from "../models/User";

export const permissionControl = (model: "gif" | "comment") => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("Checking permissions for user");
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : null;
      if (!token) {
        throw "Error with headers in request";
      }
      const decodedToken: any = jwt.verify(
        token,
        process.env.SECRET_TOKEN
          ? process.env.SECRET_TOKEN
          : "63dfb00a-82f0-4125-a009-d6e745ba149f"
      );
      const userId = decodedToken.userId;

      User.findOne({
        where: {
          id: userId,
        },
      }).then((user) => {
        if (user && user.isSuperAdmin) {
          next();
        } else {
          if (model === "gif") {
            Gif.findOne({
              where: {
                id: req.params.id,
              },
            })
              .then((gif) => {
                if (gif && gif.userId === userId) {
                  next();
                } else {
                  throw res.status(403).json({
                    message: "User ID non autorisé à modifier cet objet",
                  });
                }
              })
              .catch(() => {
                res.status(404);
              });
          }
          if (model === "comment") {
            Comment.findOne({
              where: {
                id: req.params.id,
              },
            })
              .then((comment) => {
                if (comment && comment.userId === userId) {
                  next();
                } else {
                  throw res.status(403).json({
                    message: "User ID non autorisé à modifier cet objet",
                  });
                }
              })
              .catch(() => {
                res.status(404);
              });
          }
        }
      });
    } catch (error: any) {
      res.status(401).json({ error: error });
    }
  };
};
