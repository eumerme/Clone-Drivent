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

export async function createRoom(hotelId: number): Promise<Room> {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number({ min: 1 }),
      hotelId,
    },
  });
}

export async function createRoomWithNoVacancy(hotelId: number): Promise<Room> {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: 0,
      hotelId,
    },
  });
}
