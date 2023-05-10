import { Requirements } from "./requirement";

export class Mount {
    description: string = '';
    name: string = '';
    requirements: Requirements = new Requirements();
    strength: number = 0;
    symbol: string = '';
}