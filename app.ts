import express from "express";
import { router } from "./routes/user";

const app = express();

app.use("/api/auth", router);

export default app;
