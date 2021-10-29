import express from "express";
import { signup } from "../controllers/user";

export const userRoutes = express.Router();

userRoutes.post("/signup", signup);
