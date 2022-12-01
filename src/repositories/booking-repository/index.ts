import { prisma } from "@/config";
import { Room } from "@prisma/client";

async function findBooking(userId: number): Promise<Booking> {
  return prisma.booking.findFirst({
    where: { userId },
    select: { id: true, Room: true },
  });
}

type Booking = { id: number; Room: Room };

const bookingRepository = { findBooking };

export default bookingRepository;
