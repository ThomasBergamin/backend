import express from "express";
import {
  getGifs,
  createGif,
  getOneGif,
  deleteOneGif,
  updateOneGif,
} from "../controllers/gif";
import { auth } from "../middlewares/auth";

export const gifRoutes = express.Router();

gifRoutes.get("/", auth, getGifs);
gifRoutes.post("/", auth, createGif);
gifRoutes.get("/:id", auth, getOneGif);
gifRoutes.put("/:id", auth, updateOneGif);
gifRoutes.delete("/:id", auth, deleteOneGif);
