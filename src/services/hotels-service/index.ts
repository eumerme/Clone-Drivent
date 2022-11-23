import { badRequestError, notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { TicketStatus } from "@prisma/client";

async function findHotels(userId: number) {
  const ticket = await ticketRepository.findWithTicketType(userId);

  if (!ticket) throw notFoundError();

  if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw badRequestError("User's ticket type doesn't include hotel");
  }
  if (ticket.status !== TicketStatus.PAID) throw badRequestError("Payment not confirmed");

  const hotels = await hotelRepository.findMany();
  return hotels;
}

const hotelsService = {
  findHotels,
};

export default hotelsService;
