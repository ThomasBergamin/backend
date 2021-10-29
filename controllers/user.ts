import { NextFunction, Request, Response } from "express";
import { db } from "../models";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export const signup = (
  req: {
    body: {
      lastName: string;
      email: string;
      firstName: string;
      password: string;
    };
  },
  res: Response,
  next: NextFunction
) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      db.sync().then(async () => {
        await User.create({
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          password: hash,
          email: req.body.email,
        })
          .then(() =>
            res.status(200).json({ message: "User successfully created" })
          )
          .catch((error) =>
            res
              .status(500)
              .json({ message: "Error while creating user", error })
          );
      })
    )
    .catch((error) => res.status(500).json({ error }));
};

export const login = (req: Request, res: Response, next: NextFunction) => {};
