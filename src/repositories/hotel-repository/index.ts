import { prisma } from "@/config";

async function findMany() {
  return prisma.hotel.findMany();
}

async function findHotelRooms(hotelId: number) {
  return prisma.room.findMany({
    where: { hotelId },
    include: { Hotel: true },
  });
}

const hotelRepository = { findMany, findHotelRooms };

export default hotelRepository;
