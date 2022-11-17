import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  //const userId = 2;
  try {
    const enrollmentId = await enrollmentsService.getEnrollmentIdByUserId(userId);

    const userTicket = await ticketsService.getOneWithTicketTypeByUserId(enrollmentId);

    return res.status(httpStatus.OK).send(userTicket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
