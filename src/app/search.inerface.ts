import { userInterface } from "./user.interface";

export interface searchResponseInterface {
  hits: userInterface[];
  total: number;
}
