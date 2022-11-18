import { postPayment } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { postPaymentBody } from "@/schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", (req, res) => {
    res.send("ok");
  })
  .post("/process", validateBody(postPaymentBody), postPayment);

export { paymentsRouter };
