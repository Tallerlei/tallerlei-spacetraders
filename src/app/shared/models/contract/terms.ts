import { Delivery } from "./delivery";
import { Payment } from "./payment";

export class Terms {
    deadline: string = '';
    payment: Payment = new Payment();
    deliver: Delivery[] = [];
}