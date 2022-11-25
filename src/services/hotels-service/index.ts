import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Hotel, Room } from "@prisma/client";

async function findHotels(userId: number): Promise<Hotel[]> {
  const ticket = await ticketRepository.findTicketsWithHotel(userId);
  if (!ticket) throw notFoundError();

  const hotels = await hotelRepository.findMany();
  return hotels;
}

async function findHotelWithRooms(hotelId: number): Promise<HotelRooms> {
  const hotelRooms = await hotelRepository.findHotelRooms(hotelId);
  if (!hotelRooms) throw notFoundError();

  return hotelRooms;
}

type HotelRooms = Hotel & { Rooms: Room[] };

const hotelsService = { findHotels, findHotelWithRooms };

export default hotelsService;
