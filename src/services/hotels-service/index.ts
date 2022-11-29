import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Hotel, Room } from "@prisma/client";

async function findHotels(userId: number): Promise<Hotel[]> {
  await ticketExists(userId);

  const hotels = await hotelRepository.findMany();
  return hotels;
}

async function findHotelWithRooms(hotelId: number, userId: number): Promise<HotelRooms> {
  await ticketExists(userId);

  const hotelRooms = await hotelRepository.findHotelRooms(hotelId);
  if (!hotelRooms) throw notFoundError();

  return hotelRooms;
}

async function ticketExists(userId: number): Promise<void> {
  const ticket = await ticketRepository.findTicketsWithHotel(userId);
  if (!ticket) throw notFoundError();
}

type HotelRooms = Hotel & { Rooms: Room[] };

const hotelsService = { findHotels, findHotelWithRooms };

export default hotelsService;
