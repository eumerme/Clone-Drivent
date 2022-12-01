import { Router } from "express";
import { authenticateToken, validateBody, validateParams } from "@/middlewares";
import { getBooking, postBooking, putBooking } from "@/controllers";
import { bookingIdParams, roomIdBody } from "@/schemas";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", validateBody(roomIdBody), postBooking)
  .put("/:bookingId", validateParams(bookingIdParams), validateBody(roomIdBody), putBooking);

export { bookingRouter };
