import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", (req, res) => {
    res.send("ok");
  })
  .post("/process", (req, res) => {
    res.send("ok");
  });

export { paymentsRouter };
