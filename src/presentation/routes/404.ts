import { Router } from "express";

const notFound = Router();

notFound.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

export default notFound;
