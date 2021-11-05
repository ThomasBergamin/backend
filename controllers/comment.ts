import { NextFunction, Request, Response } from "express";
import { Comment } from "../models/Comment";
import jwt from "jsonwebtoken";

export const createComment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  Comment.create({
    userId: userId,
    gifId: req.body.gifId,
    content: req.body.content,
  })
    .then(() =>
      res.status(200).json({ message: "Comment successfully created" })
    )
    .catch((error) =>
      res.status(500).json({ message: "Error while creating Comment", error })
    );
};

export const deleteOneComment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Comment successfully deleted" });
    })
    .catch((error) => {
      res.status(400).json({ message: "Error while deleting Comment", error });
    });
};

export const updateOneComment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Comment.update(
    { content: req.body.content },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(() => {
      res.status(200).json({ message: "Comment successfully updated" });
    })
    .catch((error) => {
      res.status(400).json({ message: "Error while updating Comment", error });
    });
};
