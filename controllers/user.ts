import { NextFunction, Request, Response } from "express";
import { db } from "../models";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    .then((hash) => async () => {
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
          res.status(500).json({ message: "Error while creating user", error })
        );
    })

    .catch((error) => res.status(500).json({ error }));
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
        res.status(200).json({
          userId: user.id,
          token: jwt.sign(
            { userId: user.id },
            process.env.SECRET_TOKEN
              ? process.env.SECRET_TOKEN
              : "63dfb00a-82f0-4125-a009-d6e745ba149f",
            {
              expiresIn: "24h",
            }
          ),
        });
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
