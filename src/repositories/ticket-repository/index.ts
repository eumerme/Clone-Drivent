import { prisma } from "@/config";

async function findWithTicketType(userId: number) {
  return prisma.ticket.findMany({
    where: { Enrollment: { User: { id: userId } } },
    include: {
      TicketType: true,
    },
  });
}

async function findTicketType() {
  return prisma.ticketType.findMany();
}

const ticketRepository = {
  findWithTicketType,
  findTicketType,
};

export default ticketRepository;
