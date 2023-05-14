import { Trait } from "../trait/trait";
import { FactionSymbol } from "./faction-symbol.enum";

export class Faction {
    symbol = FactionSymbol.COSMIC;
    description: string = '';
    headquarters: string = '';
    name: string = '';
    traits: Trait[] = [];
}