import { prisma } from "@/config";
import { Hotel } from "@prisma/client";

async function findMany(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

const hotelRepository = {
  findMany,
};

export default hotelRepository;