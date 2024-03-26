import { Request, Response } from "express";
import { IController } from "../../application/interfaces/IController";

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response) => {
    const { statusCode, body } = await controller.handle({
      accountId: request.metadata.accountId,
      params:request.params,
      body: request.body,
    });
    return response.status(statusCode).json(body);
  };
}
