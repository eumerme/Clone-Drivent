import { prisma } from "@/config";

async function findWithTicketType(enrollmentId: number) {
  return prisma.ticket.findMany({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
}

async function findTicketsType() {
  return prisma.ticketType.findMany();
}

const ticketRepository = {
  findWithTicketType,
  findTicketsType,
};

export default ticketRepository;
