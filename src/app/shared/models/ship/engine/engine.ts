import { Requirements } from "../requirement";

export class Engine {
    condition: number = 0;
    description: string = '';
    name: string = '';
    requirements: Requirements = new Requirements();
    speed: number = 0;
    symbol: string = '';
}