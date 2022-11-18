import { TicketTypeId } from "@/controllers";
import Joi from "joi";

export const postTicketTypeId = Joi.object<TicketTypeId>({
  ticketTypeId: Joi.number().positive().required(),
});
