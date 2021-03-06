import { NextFunction, Request, Response } from "express";
import { db } from "../models";
import { Gif } from "../models/Gif";
import jwt from "jsonwebtoken";
import { Comment } from "../models/Comment";
import fs from "fs";

export const getGifs = (req: Request, res: Response, next: NextFunction) => {
  Gif.findAll({ order: [["createdAt", "DESC"]] })
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
  console.log(req.body);
  if (req.file) {
    Gif.create({
      userId,
      title: req.body.title,
      url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      isAFile: true,
    })
      .then(() => res.status(200).json({ message: "Gif successfully created" }))
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Error while creating Gif", error });
      });
  } else {
    console.log("ok");
    Gif.create({
      userId: userId,
      title: req.body.title,
      url: req.body.url ? req.body.url : "",
      isAFile: false,
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
  Gif.findOne({ where: { id: req.params.id } })
    .then((gif) => {
      if (gif) {
        const filename = gif.url.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Gif.destroy({
            where: {
              id: req.params.id,
            },
          })
            .then(() => {
              res.status(200).json({ message: "Gif successfully deleted" });
            })
            .catch((error) => {
              res
                .status(400)
                .json({ message: "Error while deleting Gif", error });
            });
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

export const updateOneGif = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let updatedGif;

  if (req.file) {
    updatedGif = {
      userId: req.body.userId,
      title: req.body.title,
      url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      isAFile: true,
    };
  } else {
    updatedGif = {
      userId: req.body.userId,
      title: req.body.title,
      url: req.body.url,
      isAFile: false,
    };
  }
  Gif.findOne({ where: { id: req.params.id } }).then((gif) => {
    if (gif && (req.file || req.body.url)) {
      const filename = gif.url.split("/images/")[1];
      if (filename) {
        fs.unlink(`images/${filename}`, (err) => {
          if (err) console.log(err);
          console.log(`${filename} was deleted`);
        });
      }
    }
  });

  Gif.update(updatedGif, {
    where: {
      id: req.params.id,
    },
  })
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
