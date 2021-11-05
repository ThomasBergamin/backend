import express from "express";
import { db } from "./models";
import { gifRoutes } from "./routes/gif";
import { userRoutes } from "./routes/user";

const app = express();

db.authenticate()
  .then(() =>
    db
      .sync()
      .then(() =>
        console.log(`Connection to database has been established successfully.`)
      )
      .catch((error) => console.error("Unable to sync with database:", error))
  )
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

app.use("/api/auth", userRoutes);
app.use("/api/gifs", gifRoutes);

export default app;
