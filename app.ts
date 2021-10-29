import express from "express";
import { db } from "./models";
import { userRoutes } from "./routes/user";

const app = express();

db.authenticate()
  .then(() =>
    console.log(`Connection to database has been established successfully.`)
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

export default app;
