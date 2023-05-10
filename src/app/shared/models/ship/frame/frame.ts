import { Requirements } from "../requirement";

export class Frame {
    condition: number = 0;
    description: string = '';
    fuelCapacity: number = 0;
    moduleSlots: number = 0;
    mountingPoints: number = 0;
    name: string = '';
    requirements: Requirements = new Requirements();
    symbol: string = '';
}