import { db } from "../models";
import { User } from "../models/User";

export const createUser = (req: any, res: any, next: any) => {
  db.sync().then(() =>
    User.create({ username: "janedoe" })
      .then(res.status(200).json({ message: "User created" }))
      .catch((error) => res.status(500).json({ error: "Error creating user" }))
  );
};
