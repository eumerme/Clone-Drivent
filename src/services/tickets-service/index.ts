import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getWithTicketType(userId: number) {
  const ticket = (await ticketRepository.findWithTicketType(userId))[0];
  if (!ticket) throw notFoundError();

  return ticket;
}

async function getTicketType() {
  return ticketRepository.findTicketType();
}

async function createTicket(ticketTypeId: number, userId: number) {
  const enrollment = await enrollmentRepository.findEnrollment(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.create({ ticketTypeId, enrollmentId: enrollment.id, status: "RESERVED" });
  return ticket;
}

const ticketsService = {
  getWithTicketType,
  getTicketType,
  createTicket,
};

export default ticketsService;
