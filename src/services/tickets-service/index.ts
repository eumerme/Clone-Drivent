import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";

async function getOneWithTicketTypeByUserId(enrollmentId: number) {
  const userTicket = (await ticketRepository.findWithTicketTypeByUserId(enrollmentId))[0];

  if (!userTicket) throw notFoundError();

  return userTicket;
}

const ticketsService = {
  getOneWithTicketTypeByUserId,
};

export default ticketsService;
