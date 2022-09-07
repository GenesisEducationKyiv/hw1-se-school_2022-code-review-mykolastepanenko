import { Router } from "express";
import fs from "fs/promises"

const home = Router();

home.get("/", async (req, res) => {
  const html = await fs.readFile("./src/static/index.html", "utf-8")
  res.send(html);
});

export default home;