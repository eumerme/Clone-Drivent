import { ApplicationError } from "@/protocols";

export function unauthorizedError(message = "You must be signed in to continue"): ApplicationError {
  return {
    name: "UnauthorizedError",
    message,
  };
}
