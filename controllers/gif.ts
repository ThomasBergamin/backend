import { NextFunction, Request, Response } from "express";
import { db } from "../models";
import { Gif } from "../models/Gif";

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
  db.sync()
    .then(() =>
      Gif.create({
        authorId: req.body.authorId,
        title: req.body.title,
        url: req.body.url,
      })
        .then(() =>
          res.status(200).json({ message: "Gif successfully created" })
        )
        .catch((error) =>
          res.status(500).json({ message: "Error while creating Gif", error })
        )
    )
    .catch((error) => res.status(500).json({ error }));
};

export const getOneGif = (req: Request, res: Response, next: NextFunction) => {
  Gif.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((gifs) => {
      res.status(200).json(gifs);
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
