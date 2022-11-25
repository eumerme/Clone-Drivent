import { prisma } from "@/config";

async function findMany() {
  return prisma.hotel.findMany();
}

async function findHotelRooms(hotelId: number) {
  return prisma.hotel.findUnique({
    where: { id: hotelId },
    include: { Rooms: true },
  });
}

const hotelRepository = { findMany, findHotelRooms };

export default hotelRepository;
