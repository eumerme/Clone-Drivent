import { prisma } from "@/config";
//import { Ticket } from "@prisma/client";

async function findWithTicketTypeByUserId(enrollmentId: number) {
  return prisma.ticket.findMany({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
}

const ticketRepository = {
  findWithTicketTypeByUserId,
};

export default ticketRepository;
