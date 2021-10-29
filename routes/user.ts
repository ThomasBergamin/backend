import express from "express";
import { login, signup } from "../controllers/user";

export const userRoutes = express.Router();

userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
