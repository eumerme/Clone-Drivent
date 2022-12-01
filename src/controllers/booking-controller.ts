import { badRequestError } from "@/errors";
import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import { Booking } from "@prisma/client";
import { Response } from "express";
import httpStatus from "http-status";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const booking = await bookingService.getBooking(userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body as RoomId;
  try {
    if (roomId <= 0) throw badRequestError();

    const bookingId = await bookingService.postBooking(userId, roomId);
    return res.status(httpStatus.OK).send(bookingId);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export type RoomId = Pick<Booking, "roomId">;
