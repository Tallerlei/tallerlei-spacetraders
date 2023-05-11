import { Transaction } from "./transaction";

export class MarketTransaction extends Transaction {
    tradeSymbol: string = '';
    type: string = '';
    units: number = 0;
    pricePerUnit: number = 0;
    totalPrice: number = 0;
}