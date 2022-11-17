import { getTicket, getTicketType /* postTicket */ } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken).get("/", getTicket).get("/types", getTicketType);
// .post("/", postTicket);

export { ticketsRouter };
