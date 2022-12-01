import { RoomId } from "@/controllers";
import Joi from "joi";

export const roomIdBody = Joi.object<RoomId>({
  roomId: Joi.number().positive().required(),
});

export const bookingIdParams = Joi.object<BookingId>({
  bookingId: Joi.number().positive().required(),
});

type BookingId = { bookingId: number };
