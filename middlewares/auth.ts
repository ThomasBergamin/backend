import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
dotenv.config();

module.exports = (req: Request, res: Response, next: NextFunction) => {
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
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable";
    } else {
      next();
    }
  } catch (error: any) {
    res.status(401).json({ error: error || "Requête non authentifiée" });
  }
};
