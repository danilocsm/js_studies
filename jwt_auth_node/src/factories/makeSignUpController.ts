import { SignUpController } from "../application/controller/SignUpController";
import { makeSignUpUseCase } from "./makeSignUpUseCase";

export function makeSignUpController() {
  const signUpUseCase = makeSignUpUseCase();

  return new SignUpController(signUpUseCase);
}
