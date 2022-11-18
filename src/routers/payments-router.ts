import { getPayment, postPayment } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { postPaymentBody } from "@/schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayment)
  .post("/process", validateBody(postPaymentBody), postPayment);

export { paymentsRouter };
