import express from "express";
import { makeSignInController } from "../factories/makeSignInController";
import { makeSignUpController } from "../factories/makeSignUpController";
import { routeAdapter } from "./adapters/routeAdapter";
import { makeLeadsController } from "../factories/makeLeadsController";
import { middlewareAdapter } from "./adapters/middlewareAdapter";
import { makeAuthenticationMiddleware } from "../factories/makeAuthenticationMiddleware";

const app = express();

app.use(express.json());

app.post("/sign-up", routeAdapter(makeSignUpController()));

app.post("/sign-in", routeAdapter(makeSignInController()));

app.get(
  "/leads",
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeLeadsController()),
);

app.listen(3003, () => {
  console.log("server listening at http://localhost:3003");
});
