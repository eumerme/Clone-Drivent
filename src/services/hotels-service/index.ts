import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Hotel } from "@prisma/client";

async function findHotels(userId: number): Promise<Hotel[]> {
  const ticket = await ticketRepository.findTicketsWithHotel(userId);
  if (!ticket) throw notFoundError();

  const hotels = await hotelRepository.findMany();
  return hotels;
}

const hotelsService = {
  findHotels,
};

export default hotelsService;
