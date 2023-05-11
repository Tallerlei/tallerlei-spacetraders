import { Terms } from "./terms";

export class Contract {
    id: string = '';
    factionSymbol: string = '';
    type: string = '';
    terms: Terms = new Terms();
    accepted: boolean = false;
    fulfilled: boolean = false;
    expiration: string = '';
}