import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Ticket, TicketStatus, TicketType } from "@prisma/client";

async function getWithTicketType(userId: number): Promise<TicketWithType> {
  const ticket = await ticketRepository.findWithTicketType(userId);
  if (!ticket) throw notFoundError();

  return ticket;
}

async function getTicketType(): Promise<TicketType[]> {
  return ticketRepository.findTicketType();
}

async function createTicket(ticketTypeId: number, userId: number): Promise<TicketWithType> {
  const enrollment = await enrollmentRepository.findEnrollment(userId);
  if (!enrollment) throw notFoundError();

  const data = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };

  const ticket = await ticketRepository.create(data);
  return ticket;
}

type TicketWithType = Ticket & {
  TicketType: TicketType;
};

const ticketsService = {
  getWithTicketType,
  getTicketType,
  createTicket,
};

export default ticketsService;
