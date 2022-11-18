import { badRequestError, notFoundError, unauthorizedError } from "@/errors";
import { PaymentBody } from "@/protocols";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Payment } from "@prisma/client";

async function getPaymentByTicketId(ticketId: number, userId: number): Promise<Payment> {
  if (!ticketId) throw badRequestError();

  await validateTicketData(ticketId, userId);

  const payment = await paymentRepository.findPayment(ticketId);
  return payment;
}

async function createPayment(params: PaymentParams): Promise<Payment> {
  const ticket = await validateTicketData(params.ticketId, params.userId);

  const data = {
    ticketId: params.ticketId,
    value: ticket.TicketType.price,
    cardIssuer: params.cardData.issuer,
    cardLastDigits: String(params.cardData.number).slice(-4),
  };

  const payment = await paymentRepository.create(data);
  await ticketRepository.updateTicketStatus(params.ticketId);
  return payment;
}

type PaymentParams = PaymentBody & { userId: number };

async function validateTicketData(ticketId: number, userId: number): Promise<ValidateTicketData> {
  const ticket = await ticketRepository.findOneByTicketId(ticketId);
  if (!ticket) throw notFoundError();
  if (ticket.Enrollment.userId !== userId) throw unauthorizedError("Content not owned by user");

  return ticket;
}

type ValidateTicketData = {
  TicketType: { price: number };
  Enrollment: { userId: number };
};

const paymentsService = {
  getPaymentByTicketId,
  createPayment,
};

export default paymentsService;
