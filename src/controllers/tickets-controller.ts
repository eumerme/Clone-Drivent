import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  //const userId = 2;
  try {
    const enrollmentId = await enrollmentsService.getEnrollmentIdByUserId(userId);
    const userTicket = await ticketsService.getWithTicketType(enrollmentId);

    return res.status(httpStatus.OK).send(userTicket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTicketType(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketType = await ticketsService.getTicketsType();
    return res.status(httpStatus.OK).send(ticketType);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
