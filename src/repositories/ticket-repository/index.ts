import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

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

async function create(data: Prisma.TicketUncheckedCreateInput) {
  return prisma.ticket.create({
    data,
    include: {
      TicketType: true,
    },
  });
}

const ticketRepository = {
  findWithTicketType,
  findTicketType,
  create,
};

export default ticketRepository;
