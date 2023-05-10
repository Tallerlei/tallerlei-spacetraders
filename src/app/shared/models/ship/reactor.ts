import { Requirements } from "./requirement";

export class Reactor {
    condition: number = 0;
    description: string = '';
    name: string = '';
    powerOutput: number = 0;
    requirements: Requirements = new Requirements();
    symbol: string = '';
}