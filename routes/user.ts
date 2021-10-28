import express from "express";
import { createUser } from "../controllers/user";
import { db } from "../models";

export const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    await db.authenticate();
    console.log(`Connection to database has been established successfully.`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  res
    .status(200)
    .json({ hello: `Nice to meet you ${process.env.DB_USERNAME}` });
});
router.post("/login", (req, res, next) => {
  res.status(200).json({ test: "Nice to meet you again" });
});
router.get("/test", (req, res, next) => {
  res.status(200).json({ test: "Should work" });
});

router.get("/create", createUser);
