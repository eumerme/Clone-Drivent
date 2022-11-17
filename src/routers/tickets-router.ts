import { getTicket, getTicketType } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken).get("/", getTicket).get("/types", getTicketType);
// .post("/", () => {});

export { ticketsRouter };
