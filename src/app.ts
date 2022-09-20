import express from "express";
import router from "./routes/index";
import middleware from "./middleware/index";
import { config } from "./config/config";

(async () => {
  const app = express();
  const { port } = await config;

  middleware(app, express);
  app.use("/", router);

  app.listen(port, () => {
    console.log("MODE:", process.env.NODE_ENV.toUpperCase());
    console.log(`http://localhost:${port}`);
  });
})();
