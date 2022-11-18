import { getTicket, getTicketType, postTicket } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createTicketWithTicketType } from "@/schemas";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTicket)
  .get("/types", getTicketType)
  .post("/", validateBody(createTicketWithTicketType), postTicket);

export { ticketsRouter };
