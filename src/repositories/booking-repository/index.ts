import { prisma } from "@/config";
import { Booking, Room } from "@prisma/client";

async function findBooking(userId: number): Promise<BookingData> {
  return prisma.booking.findFirst({
    where: { userId },
    select: { id: true, Room: true },
  });
}

async function createBooking(userId: number, roomId: number): Promise<Booking> {
  return prisma.booking.create({
    data: { userId, roomId },
  });
}

async function findRoomWithBooking(roomId: number): Promise<RoomWithBooking> {
  return prisma.room.findUnique({
    where: { id: roomId },
    include: { Booking: true },
  });
}

type BookingData = { id: number; Room: Room };
type RoomWithBooking = Room & { Booking: Booking[] };

const bookingRepository = { findBooking, createBooking, findRoomWithBooking };

export default bookingRepository;
