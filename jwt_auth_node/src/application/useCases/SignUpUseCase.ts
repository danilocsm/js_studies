import { hash } from "bcryptjs";
import { AccountAlreadyExists } from "../errors/AccountAlreadyExists";
import { prismaClient } from "../lib/prismaClient";

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignUpUseCase {
  constructor(private readonly salt: number) {}

  async execute({ email, name, password }: IInput): Promise<IOutput> {
    const emailAlreadyExists = await prismaClient.account.findUnique({
      where: { email },
    });

    if (emailAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    // salts affect directly the time to encrpyt/decrypt the value
    // but, it alsos significantly improves the security
    const hashedPassword = await hash(password, this.salt);

    await prismaClient.account.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
