import express from "express";
import { auth } from "../middlewares/auth";
import {
  createComment,
  deleteOneComment,
  updateOneComment,
} from "../controllers/comment";
import { permissionControl } from "../middlewares/permissionControl";

export const commentRoutes = express.Router();

commentRoutes.post("/", auth, createComment);
commentRoutes.put("/:id", auth, permissionControl("comment"), updateOneComment);
commentRoutes.delete(
  "/:id",
  auth,
  permissionControl("comment"),
  deleteOneComment
);
