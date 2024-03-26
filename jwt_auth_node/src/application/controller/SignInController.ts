import { ZodError, z } from "zod";
import { IController, IResponse, IRequest } from "../interfaces/IController";
import { SignInUseCase } from "../useCases/SignInUseCase";
import InvalidCredentialError from "../errors/InvalidCredentials";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(body);
      const { accessToken } = await this.signInUseCase.execute({
        email,
        password,
      });
      return { statusCode: 200, body: { accessToken } };
    } catch (error) {
      if (error instanceof ZodError) {
        return { statusCode: 400, body: error.issues };
      }

      if (error instanceof InvalidCredentialError) {
        return { statusCode: 401, body: { error: error.name } };
      }

      throw error;
    }
  }
}
