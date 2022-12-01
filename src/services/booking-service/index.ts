import { forbiddenError, notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import { isValidTicket } from "@/utils/ticket-utils";

async function getBooking(userId: number) {
  await isValidTicket(userId);

  const booking = await bookingRepository.findBooking(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function postBooking(userId: number, roomId: number) {
  await isValidTicket(userId);

  const room = await bookingRepository.findRoomWithBooking(roomId);
  if (room.Booking.length > room.capacity) throw forbiddenError();

  const booking = await bookingRepository.createBooking(userId, roomId);
  if (!booking) throw notFoundError();

  return booking;
}

const bookingService = { getBooking, postBooking };

export default bookingService;
