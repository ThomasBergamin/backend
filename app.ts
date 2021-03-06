import express from "express";
import { db } from "./models";
import { authRoutes, gifRoutes, commentRoutes, userRoutes } from "./routes";
import { defineRelationships } from "./models/Relations";
import path from "path";

const app = express();

db.authenticate()
  .then(() => {
    defineRelationships();
    db.sync()
      .then(() =>
        console.log(`Connection to database has been established successfully.`)
      )
      .catch((error) => console.error("Unable to sync with database:", error));
  })
  .catch((error) => console.error("Unable to connect to the database:", error));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/gifs", gifRoutes);
app.use("/api/comments", commentRoutes);

export default app;
