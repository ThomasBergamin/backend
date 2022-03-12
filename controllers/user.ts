import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";

export const getOneUser = (req: Request, res: Response, next: NextFunction) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["firstName", "lastName", "id", "isSuperAdmin", "createdAt"],
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};
