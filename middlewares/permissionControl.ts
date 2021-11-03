import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Gif } from "../models/Gif";

export const permissionControl = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    Gif.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((gif) => {
        if (gif && parseInt(gif.authorId) === userId) {
          next();
        } else {
          throw res.status(403).json({
            message: "User ID non autorisé à modifier ce gif",
          });
        }
      })
      .catch((error) => {
        res.status(404);
      });
  } catch (error: any) {
    res.status(401).json({ error: error });
  }
};
