export const dbConfig = {
  HOST: "localhost",
  USER: process.env.DB_USERNAME || "postgres",
  PASSWORD: process.env.DB_PW,
  DB: "grouporama",
  dialect: "postgres" as "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
