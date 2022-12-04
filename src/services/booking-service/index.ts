import { conflictError, forbiddenError, notFoundError, unauthorizedError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import { isValidTicket } from "@/utils/ticket-utils";

async function bookingInfo(userId: number, type?: string) {
  const booking = await bookingRepository.findBooking(userId);
  if (booking && type === "post") throw conflictError("Conflict");
  if (!booking && !type) throw notFoundError();
  return booking;
}

async function roomInfo(roomId: number) {
  const room = await bookingRepository.findRoomWithBooking(roomId);
  if (!room) throw notFoundError();
  if (room.Booking.length > room.capacity) throw forbiddenError();
}

async function getBooking(userId: number) {
  await isValidTicket(userId);

  const booking = await bookingInfo(userId);
  return booking;
}

async function postBooking(userId: number, roomId: number) {
  await isValidTicket(userId);
  await roomInfo(roomId);
  await bookingInfo(userId, "post");

  const booking = await bookingRepository.createBooking(userId, roomId);
  return booking;
}

async function putBooking(userId: number, roomId: number, bookingId: number) {
  await bookingInfo(userId);

  const bookingExists = await bookingRepository.findBookingById(bookingId);
  if (!bookingExists) throw notFoundError();
  if (bookingExists.userId !== userId) throw unauthorizedError();

  await roomInfo(roomId);

  const updatedBooking = await bookingRepository.updateBooking(bookingId, roomId);
  return updatedBooking;
}

const bookingService = { getBooking, postBooking, putBooking };

export default bookingService;
