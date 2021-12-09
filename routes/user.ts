import express from "express";
import { getOneUser } from "../controllers/user";

export const userRoutes = express.Router();

userRoutes.get("/:id", getOneUser);
