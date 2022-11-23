import { ApplicationError } from "@/protocols";

export function badRequestError(message = "Missing data"): ApplicationError {
  return {
    name: "BadRequestError",
    message,
  };
}
