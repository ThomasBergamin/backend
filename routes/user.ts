import express from "express";
/* import userCtrl from "../controllers/user"; */

export const router = express.Router();

router.post("/signup", (req, res, next) => {
  res.status(200).json({ hello: "Nice to meet you" });
});
router.post("/login", (req, res, next) => {
  res.status(200).json({ test: "Nice to meet you again" });
});
router.get("/test", (req, res, next) => {
  res.status(200).json({ test: "Should work" });
});
