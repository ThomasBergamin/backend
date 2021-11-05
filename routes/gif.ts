import express from "express";
import {
  getGifs,
  createGif,
  getOneGif,
  deleteOneGif,
  updateOneGif,
  getGifComments,
} from "../controllers/gif";
import { auth } from "../middlewares/auth";
import { permissionControl } from "../middlewares/permissionControl";

export const gifRoutes = express.Router();

gifRoutes.get("/", auth, getGifs);
gifRoutes.post("/", auth, createGif);
gifRoutes.get("/:id", auth, getOneGif);
gifRoutes.get("/:id/comments", auth, getGifComments);
gifRoutes.put("/:id", auth, permissionControl("gif"), updateOneGif);
gifRoutes.delete("/:id", auth, permissionControl("gif"), deleteOneGif);
