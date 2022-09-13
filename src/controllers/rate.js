import { CURRENCY } from "../config/consts.js";
import * as service from "../services/rate.js";

export async function getRate(req, res) {
  const price = await service.getRate(CURRENCY);
  if (price.ok) {
    res.status(200).json(price.value);
  } else {
    console.error("ERROR", price?.error);
    res.status(400).json("Invalid status value");
  }
}
