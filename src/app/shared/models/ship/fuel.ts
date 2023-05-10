import { Consumed } from "./consumed";

export class Fuel {
    capacity: number = 0;
    consumed: Consumed = new Consumed();
    current: number = 0;
}