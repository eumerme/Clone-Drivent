import { PaymentBody } from "@/protocols";
import Joi from "joi";

export const postPaymentBody = Joi.object<PaymentBody>({
  ticketId: Joi.number().positive().required(),
  cardData: Joi.object({
    issuer: Joi.string().valid("VISA", "MASTERCARD").required(),
    number: Joi.number().positive().required(),
    name: Joi.string().min(3).required(),
    expirationDate: Joi.string().isoDate().required(),
    cvv: Joi.number().positive().required(),
  }).required(),
});
