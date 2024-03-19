import 'dotenv/config';

import { sign } from "./jwt/sign";
import { verify } from "./jwt/verify";

const secret = process.env.JWT_SECRET as string;

const token = sign({
  exp: Date.now() + (24 * 60 * 60 * 1000),
  data: {
    sub: '@danilo.medeiros',
    role: 'SuperAdmin'
  },
  secret,
});

const decoded = verify({
  token,
  secret: secret,
})

console.log({decoded})
