import express from "express";
import { connectToDatabase } from "./database/database";
import { router } from "./routes/router";

const app = express();
const port = 8080;

connectToDatabase()
  .then(() => {
    app.use(express.json());
    router(app);

    app.listen(port, () =>
      console.log(`Server started at http://localhost:${port}`)
    );
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
