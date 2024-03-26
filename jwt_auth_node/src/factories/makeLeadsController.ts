import { LeadsController } from "../application/controller/LeadsController";

export function makeLeadsController() {
  return new LeadsController()
}
