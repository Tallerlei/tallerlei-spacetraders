import { Delivery } from "./delivery";
import { Payment } from "./payment";

export class Terms {
    deadline: Date = new Date();
    payment: Payment = new Payment();
    deliver: Delivery[] = [];
}