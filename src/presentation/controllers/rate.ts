import { Request, Response } from "express";
import { CURRENCY } from "../../logic/config/config";
import RateService from "../../logic/services/rate";

export async function getRate(req: Request, res: Response) {
  const service = new RateService();
  const price = await service.getRate(CURRENCY);
  if (price.ok) {
    res.status(200).json(price.value);
  } else {
    console.error("ERROR", price?.error);
    res.status(400).json("Invalid status value");
  }
}
