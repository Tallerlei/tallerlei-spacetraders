import { Transaction } from "./transaction";

export class ShipyardTransaction extends Transaction {
    agentSymbol: string = '';
    price: number = 0;
}