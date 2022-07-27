import * as service from "../services/rate.js";

export async function getRate(req, res) {
  const price = await service.getRate("UAH");
  if (price.name === "AxiosError") {
    res.status(400).send("Invalid status value");
    return;
  }
  res.status(200).send(price);
}
