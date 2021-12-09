import { NextFunction, Request, Response } from "express";
import { db } from "../models";
import { Gif } from "../models/Gif";
import jwt from "jsonwebtoken";
import { Comment } from "../models/Comment";

export const getGifs = (req: Request, res: Response, next: NextFunction) => {
  Gif.findAll()
    .then((gifs) => {
      res.status(200).json(gifs);
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

export const createGif = (req: Request, res: Response, next: NextFunction) => {
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

  if (req.file) {
    Gif.create({
      userId,
      title: req.body.title,
      url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    })
      .then(() => res.status(200).json({ message: "Gif successfully created" }))
      .catch((error) =>
        res.status(500).json({ message: "Error while creating Gif", error })
      );
  } else {
    Gif.create({
      userId: userId,
      title: req.body.title,
      url: req.body.url,
    })
      .then(() => res.status(200).json({ message: "Gif successfully created" }))
      .catch((error) =>
        res.status(500).json({ message: "Error while creating Gif", error })
      );
  }
};

export const getOneGif = (req: Request, res: Response, next: NextFunction) => {
  Gif.findOne({
    where: {
      id: req.params.id,
    },
    include: Comment,
  })
    .then((gif) => {
      res.status(200).json(gif);
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

export const deleteOneGif = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Gif.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Gif successfully deleted" });
    })
    .catch((error) => {
      res.status(400).json({ message: "Error while deleting Gif", error });
    });
};

export const updateOneGif = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Gif.update(
    { authorId: req.body.authorId, title: req.body.title, url: req.body.url },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(() => {
      res.status(200).json({ message: "Gif successfully updated" });
    })
    .catch((error) => {
      res.status(400).json({ message: "Error while updating Gif", error });
    });
};

export const getGifComments = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Comment.findAll({ where: { gifId: req.params.id } })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};
