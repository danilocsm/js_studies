import { IController, IRequest, IResponse } from "../interfaces/IController";

export class LeadsController implements IController {
  async handle(request: IRequest): Promise<IResponse> {
    return {
      statusCode: 200,
      body: {
        data: [1, 2, 3, 4, 45],
      },
    };
  }
}
