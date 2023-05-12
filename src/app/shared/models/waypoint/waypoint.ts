import { Faction } from "../faction/faction";
import { Orbital } from "../orbital/orbital";
import { Trait } from "../trait/trait";
import { Chart } from "./chart";

export class Waypoint {
    chart: Chart = new Chart();
    faction: Faction = new Faction();
    orbitals: Orbital[] = [];
    symbol: string = '';
    systemSymbol: string = '';
    traits: Trait[] = [];
    type: string = '';
    x: number = 0;
    y: number = 0;
}