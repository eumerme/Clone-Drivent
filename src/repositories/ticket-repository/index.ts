import { prisma } from "@/config";
import { Prisma, TicketStatus } from "@prisma/client";

async function findWithTicketType(userId: number) {
  return prisma.ticket.findFirst({
    where: { Enrollment: { User: { id: userId } } },
    include: { TicketType: true },
  });
}

async function findTicketType() {
  return prisma.ticketType.findMany();
}

async function create(data: Prisma.TicketUncheckedCreateInput) {
  return prisma.ticket.create({
    data,
    include: { TicketType: true },
  });
}

async function findOneByTicketId(id: number) {
  return prisma.ticket.findUnique({
    where: { id },
    select: {
      TicketType: { select: { price: true } },
      Enrollment: { select: { userId: true } },
    },
  });
}

async function updateTicketStatus(id: number) {
  return prisma.ticket.update({
    where: { id },
    data: { status: TicketStatus.PAID },
  });
}

const ticketRepository = {
  findWithTicketType,
  findTicketType,
  create,
  findOneByTicketId,
  updateTicketStatus,
};

export default ticketRepository;
