import { MarketTransaction } from "../transaction/market-transaction";
import { Good } from "./good";
import { TradeGood } from "./tradegood";

export class Marketplace {
    symbol: string = '';
    imports: any[] = [];
    exports: any[] = [];
    exchange: Good[] = [];
    transactions: MarketTransaction[] = [];
    tradeGoods: TradeGood[] = [];
}