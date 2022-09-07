import express from "express";
import router from "./routes/index.js";
import middleware from "./middleware/index.js";
import { port } from "./config/config.js";

const app = express();

middleware(app, express);
app.use("/", router);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});