import express from "express";
import { getGifs, createGif } from "../controllers/gif";
import { auth } from "../middlewares/auth";

export const gifRoutes = express.Router();

gifRoutes.get("/", auth, getGifs);
gifRoutes.post("/", auth, createGif);
