import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";

async function getWithTicketType(enrollmentId: number) {
  const ticket = (await ticketRepository.findWithTicketType(enrollmentId))[0];

  if (!ticket) throw notFoundError();

  return ticket;
}

async function getTicketsType() {
  const ticketsType = await ticketRepository.findTicketsType();
  return ticketsType;
}

const ticketsService = {
  getWithTicketType,
  getTicketsType,
};

export default ticketsService;
