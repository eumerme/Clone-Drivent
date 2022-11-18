import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findPayment(ticketId: number) {
  return prisma.payment.findUnique({
    where: { id: ticketId },
  });
}

async function create(data: Prisma.PaymentUncheckedCreateInput) {
  return prisma.payment.create({ data });
}

const paymentRepository = { findPayment, create };

export default paymentRepository;
