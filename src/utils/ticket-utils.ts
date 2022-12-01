import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";

async function isValidTicket(userId: number): Promise<void> {
  const ticket = await ticketRepository.findTicketsWithHotel(userId);
  if (!ticket) throw notFoundError();
}
export { isValidTicket };
