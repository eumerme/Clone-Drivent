import faker from "@faker-js/faker";
import { prisma } from "@/config";
import { Hotel, Room } from "@prisma/client";

export async function createHotel(): Promise<Hotel> {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createRooms(hotelId: number): Promise<HotelRooms> {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number(),
      hotelId,
    },
    include: { Hotel: true },
  });
}

type HotelRooms = Room & { Hotel: Hotel };
