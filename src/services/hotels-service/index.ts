import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";
import { isValidTicket } from "@/utils/ticket-utils";
import { Hotel, Room } from "@prisma/client";

async function findHotels(userId: number): Promise<Hotel[]> {
  await isValidTicket(userId);

  const hotels = await hotelRepository.findMany();
  return hotels;
}

async function findHotelWithRooms(hotelId: number, userId: number): Promise<HotelRooms> {
  await isValidTicket(userId);

  const hotelRooms = await hotelRepository.findHotelRooms(hotelId);
  if (!hotelRooms) throw notFoundError();

  return hotelRooms;
}

type HotelRooms = Hotel & { Rooms: Room[] };

const hotelsService = { findHotels, findHotelWithRooms };

export default hotelsService;
