import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getBooking, postBooking } from "@/controllers";
import { postRoomId } from "@/schemas";

const bookingRouter = Router();

bookingRouter.all("/*", authenticateToken).get("/", getBooking).post("/", validateBody(postRoomId), postBooking);

export { bookingRouter };
