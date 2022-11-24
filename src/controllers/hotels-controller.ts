import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await hotelsService.findHotels(userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
