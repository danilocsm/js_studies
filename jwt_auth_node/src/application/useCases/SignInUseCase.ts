import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { prismaClient } from "../lib/prismaClient";
import InvalidCredentialError from "../errors/InvalidCredentials";
import { env } from "../config/env";

interface IInput {
  email: string;
  password: string;
}

interface IOutput {
  accessToken: string;
}

export class SignInUseCase {
  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: { email },
    });

    if (!account) {
      throw new InvalidCredentialError();
    }

    const isValidPassword = await compare(password, account.password);

    if (!isValidPassword) {
      throw new InvalidCredentialError();
    }
    const accessToken = sign({ sub: account.id }, env.jwtSecret, {
      expiresIn: "1d",
    });

    return { accessToken };
  }
}
