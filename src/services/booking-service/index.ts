import { notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import { isValidTicket } from "@/utils/ticket-utils";

async function getBooking(userId: number) {
  await isValidTicket(userId);

  const booking = await bookingRepository.findBooking(userId);
  if (!booking) throw notFoundError();

  return booking;
}

const bookingService = { getBooking };

export default bookingService;
