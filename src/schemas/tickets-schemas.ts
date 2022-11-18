import { TicketTypeId } from "@/controllers";
import Joi from "joi";

export const createTicketWithTicketType = Joi.object<TicketTypeId>({
  ticketTypeId: Joi.number().positive().required(),
});
