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
    const booking = await bookingService.postBooking(userId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch (error) {
    if (error.name === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function putBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body as RoomId;
  const { bookingId } = req.params as Record<string, string>;
  try {
    const updatedBooking = await bookingService.putBooking(userId, roomId, Number(bookingId));
    return res.status(httpStatus.OK).send({ bookingId: updatedBooking.id });
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export type RoomId = Pick<Booking, "roomId">;
