import { Requirements } from "./requirement";

export class Module {
    capacity: number = 0;
    description: string = '';
    name: string = '';
    requirements: Requirements = new Requirements();
    symbol: string = '';
}