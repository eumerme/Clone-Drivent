import { RoomId } from "@/controllers";
import Joi from "joi";

export const postRoomId = Joi.object<RoomId>({
  roomId: Joi.number().positive().required(),
});
