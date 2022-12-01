import { prisma } from "@/config";
import { Booking, Room } from "@prisma/client";

async function findBooking(userId: number): Promise<BookingData> {
  return prisma.booking.findFirst({
    where: { userId },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function createBooking(userId: number, roomId: number): Promise<Booking> {
  return prisma.booking.create({
    data: { userId, roomId },
  });
}

async function findRoomWithBooking(id: number): Promise<RoomWithBooking> {
  return prisma.room.findUnique({
    where: { id },
    include: { Booking: true },
  });
}

async function updateBooking(id: number, roomId: number): Promise<{ id: number }> {
  return prisma.booking.update({
    where: { id },
    data: { roomId },
    select: { id: true },
  });
}

async function findBookingById(id: number): Promise<Booking> {
  return prisma.booking.findUnique({
    where: { id },
  });
}

type BookingData = {
  id: number;
  Room: Room;
};

type RoomWithBooking = Room & { Booking: Booking[] };

const bookingRepository = {
  findBooking,
  createBooking,
  findRoomWithBooking,
  updateBooking,
  findBookingById,
};

export default bookingRepository;
