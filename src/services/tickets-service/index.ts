import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";

async function getWithTicketType(userId: number) {
  const ticket = (await ticketRepository.findWithTicketType(userId))[0];

  if (!ticket) throw notFoundError();

  return ticket;
}

async function getTicketType() {
  return ticketRepository.findTicketType();
}

const ticketsService = {
  getWithTicketType,
  getTicketType,
};

export default ticketsService;
