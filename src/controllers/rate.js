import * as service from "../services/rate.js";

export async function getRate(req, res) {
  const price = await service.getRate("UAH");
  if (price.ok) {
    res.status(200).send(price.value);
  } else {
    console.error("ERROR", price?.error);
    res.status(400).send("Invalid status value");
  }
}
