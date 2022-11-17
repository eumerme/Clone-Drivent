import { getTicketByUser } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken).get("/", getTicketByUser);
// .get("/types", () => {})
// .post("/", () => {});

export { ticketsRouter };
